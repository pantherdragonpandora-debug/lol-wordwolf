// ========================================
// ヴォイドに届くは光か闇か - ゲームクラス
// ========================================

console.log('🔥🔥🔥 void-game.js 読み込み開始 v32 🔥🔥🔥');

class VoidGame {
  constructor(roomId, gameType) {
    this.roomId = roomId;
    this.gameType = gameType;
    this.roomRef = firebase.database().ref(`void_rooms/${roomId}`);
    this.roomData = null;
    this.watchers = [];
  }

  async createRoom(hostName, maxPlayers, theme = null) {
    const selectedTheme = theme || getRandomVoidTheme(this.gameType);
    
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
      gameState: 'waiting',
      currentTurn: 0,
      players: {},
      playerOrder: [],
      playOrder: [],
      orderSelections: {},
      turns: {},
      finalAnswer: null,
      isCorrect: null,
      createdAt: Date.now()
    };

    roomData.players[hostName] = {
      joinOrder: 0,
      ready: true,
      isHost: true,
      hasSubmitted: false
    };
    
    roomData.playerOrder = [hostName];

    await this.roomRef.set(roomData);
    return true;
  }

  async joinRoom(playerName) {
    const snapshot = await this.roomRef.once('value');
    const roomData = snapshot.val();
    
    if (!roomData) {
      throw new Error('ルームが見つかりません');
    }

    if (roomData.gameType !== this.gameType) {
      throw new Error(`このルームは ${roomData.gameType} 用です。現在 ${this.gameType} を選択しています。`);
    }

    const playerOrder = roomData.playerOrder || [];
    
    if (playerOrder.length >= roomData.maxPlayers) {
      throw new Error('ルームが満員です');
    }

    if (playerOrder.includes(playerName)) {
      throw new Error('この名前は既に使用されています');
    }

    const updates = {};
    updates[`players/${playerName}`] = {
      joinOrder: playerOrder.length,
      ready: true,
      isHost: false,
      hasSubmitted: false
    };
    updates['playerOrder'] = [...playerOrder, playerName];

    await this.roomRef.update(updates);
    return true;
  }

  async startGame() {
    await this.roomRef.update({
      gameState: 'selecting_order',
      orderSelections: {}
    });
  }

  watchRoom(callback) {
    const watcher = this.roomRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.roomData = data;
        callback(data);
      }
    });
    this.watchers.push({ ref: this.roomRef, event: 'value', callback: watcher });
  }

  unwatchRoom() {
    this.watchers.forEach(({ ref, event, callback }) => {
      ref.off(event, callback);
    });
    this.watchers = [];
  }

  async leaveRoom(playerName) {
    console.log('🚪 leaveRoom呼び出し:', playerName);
    
    // 現在のルームデータを取得
    const snapshot = await this.roomRef.once('value');
    const roomData = snapshot.val();
    
    if (!roomData) {
      console.log('⚠️ ルームが存在しません');
      return true;
    }
    
    console.log('現在のplayerOrder:', roomData.playerOrder);
    console.log('現在のplayers:', Object.keys(roomData.players || {}));
    
    // playerOrderから削除
    const newPlayerOrder = (roomData.playerOrder || []).filter(name => name !== playerName);
    console.log('新しいplayerOrder:', newPlayerOrder);
    
    // 退出するプレイヤーがホストかどうか確認
    const isHost = roomData.players[playerName]?.isHost === true;
    console.log('退出プレイヤーはホスト:', isHost);
    
    const updates = {};
    
    // プレイヤーを削除
    updates[`players/${playerName}`] = null;
    
    // playerOrderを更新
    updates['playerOrder'] = newPlayerOrder;
    
    // 全員が退出した場合はルームを削除
    if (newPlayerOrder.length === 0) {
      console.log('✅ 全員退出 - ルームを削除');
      await this.roomRef.remove();
      return true;
    }
    
    // ホストが退出した場合、次のプレイヤーにホスト権を移譲
    if (isHost && newPlayerOrder.length > 0) {
      const newHost = newPlayerOrder[0];
      console.log('🔄 ホスト移譲:', playerName, '→', newHost);
      updates[`players/${newHost}/isHost`] = true;
      updates['hostName'] = newHost;
    }
    
    // 更新を適用
    console.log('📤 Firebase更新を送信:', updates);
    await this.roomRef.update(updates);
    console.log('✅ ルーム退出処理完了');
    
    // 更新後のデータを確認
    const afterSnapshot = await this.roomRef.once('value');
    const afterData = afterSnapshot.val();
    if (afterData) {
      console.log('✅ 更新後のplayerOrder:', afterData.playerOrder);
      console.log('✅ 更新後のplayers:', Object.keys(afterData.players || {}));
    }
    
    return true;
  }

  // 順番選択を送信
  async submitOrder(playerName, order) {
    const updates = {};
    updates[`orderSelections/${playerName}`] = order;
    await this.roomRef.update(updates);
  }

  // 順番を確定してゲーム開始
  async confirmOrder(playOrder) {
    const updates = {
      playOrder: playOrder,
      gameState: 'playing',
      currentTurn: 0
    };
    await this.roomRef.update(updates);
  }

  // 最初のプレイヤーが3つのワードを送信
  async submitFirstWords(playerName, words) {
    console.log('📝 submitFirstWords呼び出し:', playerName, words);
    
    if (!words || words.length !== 3) {
      throw new Error('3つの言葉を入力してください');
    }

    const snapshot = await this.roomRef.once('value');
    const roomData = snapshot.val();
    
    if (!roomData) {
      throw new Error('ルームが見つかりません');
    }

    console.log('🔍 現在のルームデータ:', roomData);
    console.log('🔍 playOrder:', roomData.playOrder);
    console.log('🔍 現在のターン:', roomData.currentTurn);

    const playOrder = roomData.playOrder || [];
    const currentTurn = roomData.currentTurn || 0;

    if (playOrder[currentTurn] !== playerName) {
      throw new Error('あなたの順番ではありません');
    }

    const updates = {};
    updates[`turns/${currentTurn}`] = {
      playerName: playerName,
      words: words,
      modified: [false, false, false],
      submittedAt: Date.now()
    };
    updates[`players/${playerName}/hasSubmitted`] = true;
    updates['currentTurn'] = currentTurn + 1;

    console.log('📤 Firebase更新を送信:', updates);
    await this.roomRef.update(updates);
    console.log('✅ ワード送信完了');
  }

  // 中間プレイヤーが修正したワードを送信
  async submitMiddleWords(playerName, words, modified) {
    console.log('📝 submitMiddleWords呼び出し:', playerName, words, modified);
    
    if (!words || words.length !== 3) {
      throw new Error('3つの言葉を入力してください');
    }

    const snapshot = await this.roomRef.once('value');
    const roomData = snapshot.val();
    
    if (!roomData) {
      throw new Error('ルームが見つかりません');
    }

    const playOrder = roomData.playOrder || [];
    const currentTurn = roomData.currentTurn || 0;

    if (playOrder[currentTurn] !== playerName) {
      throw new Error('あなたの順番ではありません');
    }

    const updates = {};
    updates[`turns/${currentTurn}`] = {
      playerName: playerName,
      words: words,
      modified: modified || [false, false, false],
      submittedAt: Date.now()
    };
    updates[`players/${playerName}/hasSubmitted`] = true;
    updates['currentTurn'] = currentTurn + 1;

    console.log('📤 Firebase更新を送信:', updates);
    await this.roomRef.update(updates);
    console.log('✅ ワード送信完了');
  }

  // 最後のプレイヤーが答えを送信
  async submitFinalAnswer(playerName, answer) {
    console.log('📝 submitFinalAnswer呼び出し:', playerName, answer);
    
    if (!answer || answer.trim().length === 0) {
      throw new Error('回答を入力してください');
    }

    const snapshot = await this.roomRef.once('value');
    const roomData = snapshot.val();
    
    if (!roomData) {
      throw new Error('ルームが見つかりません');
    }

    const playOrder = roomData.playOrder || [];
    const currentTurn = roomData.currentTurn || 0;

    if (playOrder[currentTurn] !== playerName) {
      throw new Error('あなたの順番ではありません');
    }

    // 正解判定
    const themeName = roomData.theme?.name || '';
    const isCorrect = answer.trim() === themeName.trim();

    const updates = {};
    updates[`turns/${currentTurn}`] = {
      playerName: playerName,
      answer: answer,
      submittedAt: Date.now()
    };
    updates[`players/${playerName}/hasSubmitted`] = true;
    updates['finalAnswer'] = answer;
    updates['isCorrect'] = isCorrect;
    updates['gameState'] = 'result';

    console.log('📤 Firebase更新を送信:', updates);
    await this.roomRef.update(updates);
    console.log('✅ 最終回答送信完了');
  }

  // ゲームをリセットして再プレイ
  async resetRoom() {
    console.log('🔄 resetRoom呼び出し');
    
    const snapshot = await this.roomRef.once('value');
    const roomData = snapshot.val();
    
    if (!roomData) {
      throw new Error('ルームが見つかりません');
    }

    // 新しいテーマを選択
    const newTheme = getRandomVoidTheme(this.gameType);

    const updates = {
      gameState: 'waiting',
      currentTurn: 0,
      playOrder: [],
      orderSelections: {},
      turns: {},
      finalAnswer: null,
      isCorrect: null,
      theme: {
        id: newTheme.id,
        name: newTheme.name,
        category: newTheme.category
      }
    };

    // 各プレイヤーの状態をリセット
    const playerOrder = roomData.playerOrder || [];
    playerOrder.forEach(playerName => {
      updates[`players/${playerName}/hasSubmitted`] = false;
    });

    console.log('📤 Firebase更新を送信:', updates);
    await this.roomRef.update(updates);
    console.log('✅ ルームリセット完了');
  }
}

console.log('✅ VoidGameクラス定義完了 v34');
console.log('✅ typeof VoidGame:', typeof VoidGame);

// グローバルエクスポート
window.VoidGame = VoidGame;
console.log('✅ window.VoidGame エクスポート完了 v34');
console.log('✅ typeof window.VoidGame:', typeof window.VoidGame);
