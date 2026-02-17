// ========================================
// ヴォイドに届くは光か闇か - ゲームクラス
// ========================================

console.log('🔥🔥🔥 void-game.js 読み込み開始 v28 🔥🔥🔥');

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
    await this.roomRef.child(`players/${playerName}`).remove();
    return true;
  }
}

console.log('✅ VoidGameクラス定義完了 v28');
console.log('✅ typeof VoidGame:', typeof VoidGame);

// グローバルエクスポート
window.VoidGame = VoidGame;
console.log('✅ window.VoidGame エクスポート完了 v28');
console.log('✅ typeof window.VoidGame:', typeof window.VoidGame);
