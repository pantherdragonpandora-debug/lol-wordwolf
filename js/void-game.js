// ========================================
// ヴォイドに届くは光か闇か - ゲームクラス
// ========================================

console.log('🔥🔥🔥 void-game.js 読み込み開始 v30 🔥🔥🔥');

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
}

console.log('✅ VoidGameクラス定義完了 v30');
console.log('✅ typeof VoidGame:', typeof VoidGame);

// グローバルエクスポート
window.VoidGame = VoidGame;
console.log('✅ window.VoidGame エクスポート完了 v30');
console.log('✅ typeof window.VoidGame:', typeof window.VoidGame);
