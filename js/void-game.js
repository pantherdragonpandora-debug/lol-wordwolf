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
        gameState: 'waiting', // waiting, selecting_order, playing, finished
        currentTurn: 0,
        players: {},
        playerOrder: [], // ゲーム開始後に順番選択で確定
        playOrder: [], // 実際のプレイ順番（選択後に確定）
        orderSelections: {}, // プレイヤーごとの順番選択 {playerName: selectedOrder}
        turns: {},
        finalAnswer: null,
        isCorrect: null,
        createdAt: Date.now()
      };

      // ホストを追加
      roomData.players[hostName] = {
        joinOrder: 0, // 参加順
        ready: true,
        isHost: true,
        hasSubmitted: false // 回答済みフラグ
      };
      
      // 参加順のプレイヤーリスト
      roomData.playerOrder = [hostName];

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
        const errorMsg = 'ルームが存在しません。\n\nルームIDが正しいか確認してください。\n接続に問題がある場合は、画面下部の「🔍 接続診断」をクリックして診断ツールをお試しください。';
        throw new Error(errorMsg);
      }

      // ゲームタイプが一致するかチェック
      if (roomData.gameType && roomData.gameType !== this.gameType) {
        const roomGameTypeName = roomData.gameType === 'lol' ? 'League of Legends' : 'VALORANT';
        const currentGameTypeName = this.gameType === 'lol' ? 'League of Legends' : 'VALORANT';
        throw new Error(
          `このルームは ${roomGameTypeName} 用です。\n` +
          `現在 ${currentGameTypeName} を選択しています。\n` +
          `ゲーム選択画面に戻って正しいゲームタイプを選択してください。`
        );
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
      const joinOrder = roomData.playerOrder.length;
      await this.roomRef.child(`players/${playerName}`).set({
        joinOrder: joinOrder, // 参加順
        ready: true,
        isHost: false,
        hasSubmitted: false // 回答済みフラグ
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
  // ゲーム開始（順番選択フェーズへ）
  // ========================================
  async startGame() {
    try {
      await this.roomRef.update({
        gameState: 'selecting_order',
        orderSelections: {}
      });
      
      console.log('✅ 順番選択フェーズ開始');
      return true;
    } catch (error) {
      console.error('❌ ゲーム開始エラー:', error);
      throw error;
    }
  }

  // ========================================
  // 順番を選択
  // ========================================
  async selectOrder(playerName, selectedOrder) {
    try {
      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();
      
      if (roomData.gameState !== 'selecting_order') {
        throw new Error('順番選択フェーズではありません');
      }
      
      // 既に他のプレイヤーが選択済みかチェック
      const selections = roomData.orderSelections || {};
      const selectedOrders = Object.values(selections);
      
      if (selectedOrders.includes(selectedOrder)) {
        throw new Error('その順番は既に選択されています');
      }
      
      // 順番を保存
      await this.roomRef.child(`orderSelections/${playerName}`).set(selectedOrder);
      
      // 全員が選択したかチェック
      const allSelected = Object.keys(selections).length + 1 === roomData.playerOrder.length;
      
      if (allSelected) {
        // 全員選択完了 → プレイ順を確定してゲーム開始
        await this.finalizePlayOrder();
      }
      
      console.log('✅ 順番選択成功:', playerName, selectedOrder);
      return true;
    } catch (error) {
      console.error('❌ 順番選択エラー:', error);
      throw error;
    }
  }

  // ========================================
  // プレイ順を確定してゲーム開始
  // ========================================
  async finalizePlayOrder() {
    try {
      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();
      
      const selections = roomData.orderSelections || {};
      const playerOrder = roomData.playerOrder || [];
      
      // 選択された順番でプレイヤーを並べ替え
      const playOrder = [];
      for (let i = 1; i <= playerOrder.length; i++) {
        const player = Object.keys(selections).find(p => selections[p] === i);
        if (player) {
          playOrder.push(player);
        }
      }
      
      await this.roomRef.update({
        gameState: 'playing',
        playOrder: playOrder,
        currentTurn: 0
      });
      
      console.log('✅ プレイ順確定:', playOrder);
      return true;
    } catch (error) {
      console.error('❌ プレイ順確定エラー:', error);
      throw error;
    }
  }

  // ========================================
  // 最初のワードを送信
  // ========================================

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
      await this.roomRef.child(`players/${playerName}/hasSubmitted`).set(true);
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
      await this.roomRef.child(`players/${playerName}/hasSubmitted`).set(true);
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
      
      await this.roomRef.child(`players/${playerName}/hasSubmitted`).set(true);

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
      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();
      
      if (!roomData) {
        console.log('ルームが存在しません');
        return true;
      }
      
      const isHost = roomData.hostName === playerName;
      
      // プレイヤーを削除
      await this.roomRef.child(`players/${playerName}`).remove();
      
      // プレイヤー順序からも削除
      const playerOrder = roomData.playerOrder || [];
      const newOrder = playerOrder.filter(p => p !== playerName);
      await this.roomRef.child('playerOrder').set(newOrder);
      
      // 残りのプレイヤーを確認
      const playersSnapshot = await this.roomRef.child('players').once('value');
      const remainingPlayers = playersSnapshot.val();
      
      if (!remainingPlayers || Object.keys(remainingPlayers).length === 0) {
        // 全員退出したらルーム削除
        await this.roomRef.remove();
        console.log('✅ ヴォイドルーム削除（全員退出）');
        return true;
      }
      
      // ホストが退出した場合、次の人をホストに昇格
      if (isHost && newOrder.length > 0) {
        const newHostName = newOrder[0];
        await this.roomRef.update({
          hostName: newHostName
        });
        // 新しいホストのisHostフラグを更新
        await this.roomRef.child(`players/${newHostName}/isHost`).set(true);
        console.log(`✅ ヴォイドホスト移譲: ${playerName} → ${newHostName}`);
      }

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
