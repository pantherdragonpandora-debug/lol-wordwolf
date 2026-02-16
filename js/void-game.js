// ========================================
// ヴォイドに届くは光か闇か - ゲームクラス
// ========================================

class VoidGame {
  constructor(roomId, gameType) {
    this.roomId = roomId;
    this.gameType = gameType; // 'lol' or 'valorant'
    this.roomRef = firebase.database().ref(`void_rooms/${roomId}`);
    this.roomData = null;
    this.watchers = [];
  }

  // ========================================
  // ルーム作成
  // ========================================
  async createRoom(hostName, maxPlayers, theme = null) {
    try {
      // テーマがnullの場合はランダム選択
      const selectedTheme = theme || getRandomVoidTheme(this.gameType);
      
      if (!selectedTheme) {
        throw new Error('テーマの取得に失敗しました');
      }

      const roomData = {
        roomId: this.roomId,
        gameType: this.gameType,
        hostName: hostName,
        maxPlayers: maxPlayers,
        theme: {
          id: selectedTheme.id,
          name: selectedTheme.name,
          category: selectedTheme.category
        },
        gameState: 'waiting', // waiting, playing, finished
        currentTurn: 0,
        players: {},
        playerOrder: [hostName],
        turns: {},
        finalAnswer: null,
        isCorrect: null,
        createdAt: Date.now()
      };

      // ホストを追加
      roomData.players[hostName] = {
        order: 0,
        ready: true,
        isHost: true
      };

      await this.roomRef.set(roomData);
      console.log('✅ ヴォイドルーム作成成功:', this.roomId);
      
      return true;
    } catch (error) {
      console.error('❌ ヴォイドルーム作成エラー:', error);
      throw error;
    }
  }

  // ========================================
  // ルーム参加
  // ========================================
  async joinRoom(playerName) {
    try {
      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();

      if (!roomData) {
        throw new Error('ルームが存在しません');
      }

      if (roomData.gameState !== 'waiting') {
        throw new Error('ゲームが既に開始されています');
      }

      const currentPlayers = Object.keys(roomData.players).length;
      if (currentPlayers >= roomData.maxPlayers) {
        throw new Error('ルームが満員です');
      }

      if (roomData.players[playerName]) {
        throw new Error('同じ名前のプレイヤーが既に参加しています');
      }

      // プレイヤーを追加
      const order = roomData.playerOrder.length;
      await this.roomRef.child(`players/${playerName}`).set({
        order: order,
        ready: true,
        isHost: false
      });

      await this.roomRef.child('playerOrder').set([...roomData.playerOrder, playerName]);

      console.log('✅ ルーム参加成功:', playerName);
      return true;
    } catch (error) {
      console.error('❌ ルーム参加エラー:', error);
      throw error;
    }
  }

  // ========================================
  // ゲーム開始
  // ========================================
  async startGame() {
    try {
      await this.roomRef.update({
        gameState: 'playing',
        currentTurn: 0
      });

      console.log('✅ ゲーム開始');
      return true;
    } catch (error) {
      console.error('❌ ゲーム開始エラー:', error);
      throw error;
    }
  }

  // ========================================
  // ワードを送信（最初のプレイヤー）
  // ========================================
  async submitFirstWords(playerName, words) {
    try {
      if (!words || words.length !== 3) {
        throw new Error('3つのワードを入力してください');
      }

      // 空のワードチェック
      if (words.some(w => !w || w.trim() === '')) {
        throw new Error('すべてのワードを入力してください');
      }

      const turnData = {
        playerName: playerName,
        words: words.map(w => w.trim()),
        modified: [], // 最初のプレイヤーは修正なし
        timestamp: Date.now()
      };

      await this.roomRef.child('turns/0').set(turnData);
      await this.roomRef.update({
        currentTurn: 1
      });

      console.log('✅ 最初のワード送信成功:', words);
      return true;
    } catch (error) {
      console.error('❌ ワード送信エラー:', error);
      throw error;
    }
  }

  // ========================================
  // ワードを送信（中間プレイヤー）
  // ========================================
  async submitWords(playerName, turnIndex, words, modified = []) {
    try {
      if (!words || words.length !== 3) {
        throw new Error('3つのワードを入力してください');
      }

      if (words.some(w => !w || w.trim() === '')) {
        throw new Error('すべてのワードを入力してください');
      }

      const turnData = {
        playerName: playerName,
        words: words.map(w => w.trim()),
        modified: modified, // 修正したワードのインデックス [0, 2] など
        timestamp: Date.now()
      };

      await this.roomRef.child(`turns/${turnIndex}`).set(turnData);
      await this.roomRef.update({
        currentTurn: turnIndex + 1
      });

      console.log('✅ ワード送信成功:', words);
      return true;
    } catch (error) {
      console.error('❌ ワード送信エラー:', error);
      throw error;
    }
  }

  // ========================================
  // 最終回答を送信
  // ========================================
  async submitFinalAnswer(playerName, answer) {
    try {
      if (!answer || answer.trim() === '') {
        throw new Error('回答を入力してください');
      }

      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();

      // 正解判定（大文字小文字、空白を無視）
      const correctAnswer = roomData.theme.name.toLowerCase().replace(/\s/g, '');
      const userAnswer = answer.trim().toLowerCase().replace(/\s/g, '');
      const isCorrect = correctAnswer === userAnswer;

      await this.roomRef.update({
        finalAnswer: answer.trim(),
        isCorrect: isCorrect,
        gameState: 'finished'
      });

      console.log('✅ 最終回答送信:', answer, '正解:', isCorrect);
      return isCorrect;
    } catch (error) {
      console.error('❌ 最終回答エラー:', error);
      throw error;
    }
  }

  // ========================================
  // ルームデータを監視
  // ========================================
  watchRoom(callback) {
    const watcher = this.roomRef.on('value', (snapshot) => {
      this.roomData = snapshot.val();
      if (this.roomData) {
        callback(this.roomData);
      }
    });

    this.watchers.push({ ref: this.roomRef, event: 'value', callback: watcher });
    console.log('✅ ルーム監視開始');
  }

  // ========================================
  // 監視を停止
  // ========================================
  stopWatching() {
    this.watchers.forEach(({ ref, event, callback }) => {
      ref.off(event, callback);
    });
    this.watchers = [];
    console.log('✅ ルーム監視停止');
  }

  // ========================================
  // ルームを削除（退出）
  // ========================================
  async leaveRoom(playerName) {
    try {
      await this.roomRef.child(`players/${playerName}`).remove();
      
      // プレイヤー順序からも削除
      const snapshot = await this.roomRef.child('playerOrder').once('value');
      const playerOrder = snapshot.val() || [];
      const newOrder = playerOrder.filter(p => p !== playerName);
      await this.roomRef.child('playerOrder').set(newOrder);

      console.log('✅ ルーム退出:', playerName);
      return true;
    } catch (error) {
      console.error('❌ ルーム退出エラー:', error);
      throw error;
    }
  }

  // ========================================
  // チャット送信
  // ========================================
  async sendMessage(playerName, message) {
    try {
      const messageData = {
        sender: playerName,
        message: sanitizeInput(message, 500), // セキュリティ対策
        timestamp: Date.now()
      };

      await this.roomRef.child('chat').push(messageData);
      console.log('✅ メッセージ送信:', message);
      return true;
    } catch (error) {
      console.error('❌ メッセージ送信エラー:', error);
      throw error;
    }
  }

  // ========================================
  // チャットを監視
  // ========================================
  watchChat(callback) {
    const chatRef = this.roomRef.child('chat');
    const watcher = chatRef.on('child_added', (snapshot) => {
      const message = snapshot.val();
      if (message) {
        callback(message);
      }
    });

    this.watchers.push({ ref: chatRef, event: 'child_added', callback: watcher });
    console.log('✅ チャット監視開始');
  }
}
