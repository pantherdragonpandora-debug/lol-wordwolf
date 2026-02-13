// ========================================
// ゲームロジック
// ========================================
// Firebase Realtime Databaseを使用したマルチプレイヤーゲームロジック

class GameState {
  constructor(roomId) {
    this.roomId = roomId;
    this.roomRef = database.ref(`rooms/${roomId}`);
    this.listeners = [];
  }
  
  // ルーム作成
  async createRoom(hostName, settings) {
    try {
      await this.roomRef.set({
        host: hostName,
        settings: settings,
        players: {
          [hostName]: {
            name: hostName,
            ready: false,
            role: null,
            vote: null,
            joinedAt: Date.now()
          }
        },
        gameState: 'waiting', // waiting, playing, voting, finished
        createdAt: Date.now(),
        timer: null,
        chat: []
      });
      
      console.log('✅ ルーム作成成功:', this.roomId);
      return true;
    } catch (error) {
      console.error('❌ ルーム作成エラー:', error);
      return false;
    }
  }
  
  // ルーム参加
  async joinRoom(playerName) {
    try {
      const snapshot = await this.roomRef.once('value');
      
      if (!snapshot.exists()) {
        throw new Error('ルームが存在しません');
      }
      
      const roomData = snapshot.val();
      
      // プレイヤー数チェック
      const currentPlayers = Object.keys(roomData.players || {}).length;
      const maxPlayers = roomData.settings?.playerCount || 5;
      
      if (currentPlayers >= maxPlayers) {
        throw new Error('ルームが満員です');
      }
      
      // ゲーム進行中チェック
      if (roomData.gameState !== 'waiting') {
        throw new Error('ゲームが既に開始されています');
      }
      
      // プレイヤー追加
      await this.roomRef.child(`players/${playerName}`).set({
        name: playerName,
        ready: false,
        role: null,
        vote: null,
        joinedAt: Date.now()
      });
      
      console.log('✅ ルーム参加成功:', playerName);
      return true;
    } catch (error) {
      console.error('❌ ルーム参加エラー:', error);
      throw error;
    }
  }
  
  // ゲーム開始
  async startGame() {
    try {
      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();
      
      const players = Object.keys(roomData.players || {});
      const playerCount = players.length;
      
      if (playerCount < 3) {
        throw new Error('プレイヤーが足りません（最低3人）');
      }
      
      // お題選択
      const topic = getRandomTopic(roomData.settings.categories || ['all'], roomData.settings.gameType || 'lol');
      
      // ウルフをランダムに決定（1人）
      const wolfIndex = Math.floor(Math.random() * playerCount);
      const wolfPlayer = players[wolfIndex];
      
      // 各プレイヤーに役割とお題を割り当て
      const updates = {};
      players.forEach((playerName, index) => {
        const isWolf = index === wolfIndex;
        updates[`players/${playerName}/role`] = isWolf ? 'wolf' : 'citizen';
        updates[`players/${playerName}/topic`] = isWolf ? topic.minority : topic.majority;
      });
      
      // ゲーム状態更新
      updates['gameState'] = 'playing';
      updates['startedAt'] = Date.now();
      updates['timerDuration'] = roomData.settings.timer * 60 * 1000; // 分をミリ秒に変換
      
      await this.roomRef.update(updates);
      
      console.log('✅ ゲーム開始:', { wolfPlayer, topic });
      return true;
    } catch (error) {
      console.error('❌ ゲーム開始エラー:', error);
      throw error;
    }
  }
  
  // 投票
  async vote(voterName, targetName) {
    try {
      await this.roomRef.child(`players/${voterName}/vote`).set(targetName);
      console.log('✅ 投票完了:', voterName, '→', targetName);
      return true;
    } catch (error) {
      console.error('❌ 投票エラー:', error);
      return false;
    }
  }
  
  // 投票終了・結果判定
  async endVoting() {
    try {
      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();
      const players = roomData.players;
      
      // 投票集計
      const voteCount = {};
      Object.values(players).forEach(player => {
        if (player.vote) {
          voteCount[player.vote] = (voteCount[player.vote] || 0) + 1;
        }
      });
      
      // 最多得票者
      let maxVotes = 0;
      let votedOut = null;
      Object.entries(voteCount).forEach(([name, count]) => {
        if (count > maxVotes) {
          maxVotes = count;
          votedOut = name;
        }
      });
      
      // ウルフを探す
      const wolf = Object.values(players).find(p => p.role === 'wolf');
      
      // 勝敗判定
      const citizensWin = votedOut === wolf.name;
      
      // 結果保存
      await this.roomRef.update({
        gameState: 'finished',
        result: {
          votedOut: votedOut,
          voteCount: voteCount,
          wolf: wolf.name,
          citizensWin: citizensWin,
          finishedAt: Date.now()
        }
      });
      
      console.log('✅ 投票終了:', { votedOut, citizensWin });
      return true;
    } catch (error) {
      console.error('❌ 投票終了エラー:', error);
      return false;
    }
  }
  
  // チャットメッセージ送信
  async sendMessage(playerName, message) {
    try {
      await this.roomRef.child('chat').push({
        player: playerName,
        message: message,
        timestamp: Date.now()
      });
      return true;
    } catch (error) {
      console.error('❌ メッセージ送信エラー:', error);
      return false;
    }
  }
  
  // リアルタイム監視開始
  watch(callback) {
    const listener = this.roomRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });
    this.listeners.push({ ref: this.roomRef, listener });
  }
  
  // 監視停止
  unwatch() {
    this.listeners.forEach(({ ref, listener }) => {
      ref.off('value', listener);
    });
    this.listeners = [];
  }
  
  // ルーム退出
  async leaveRoom(playerName) {
    try {
      await this.roomRef.child(`players/${playerName}`).remove();
      
      // プレイヤーが0人になったらルーム削除
      const snapshot = await this.roomRef.child('players').once('value');
      if (!snapshot.exists() || Object.keys(snapshot.val()).length === 0) {
        await this.roomRef.remove();
        console.log('✅ ルーム削除（全員退出）');
      }
      
      return true;
    } catch (error) {
      console.error('❌ ルーム退出エラー:', error);
      return false;
    }
  }
  
  // ルームリセット
  async resetRoom() {
    try {
      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();
      
      // プレイヤー情報をリセット
      const updates = {};
      Object.keys(roomData.players).forEach(playerName => {
        updates[`players/${playerName}/ready`] = false;
        updates[`players/${playerName}/role`] = null;
        updates[`players/${playerName}/topic`] = null;
        updates[`players/${playerName}/vote`] = null;
      });
      
      updates['gameState'] = 'waiting';
      updates['result'] = null;
      updates['startedAt'] = null;
      updates['chat'] = [];
      
      await this.roomRef.update(updates);
      
      console.log('✅ ルームリセット完了');
      return true;
    } catch (error) {
      console.error('❌ ルームリセットエラー:', error);
      return false;
    }
  }
}

// ルームID生成
function generateRoomId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// タイマー管理
class GameTimer {
  constructor(duration, callback) {
    this.duration = duration; // ミリ秒
    this.callback = callback;
    this.startTime = null;
    this.interval = null;
    this.remaining = duration;
  }
  
  start() {
    this.startTime = Date.now();
    this.interval = setInterval(() => {
      this.remaining = this.duration - (Date.now() - this.startTime);
      
      if (this.remaining <= 0) {
        this.stop();
        this.callback('finished');
      } else {
        this.callback('tick', this.remaining);
      }
    }, 1000);
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  
  getRemainingTime() {
    return Math.max(0, this.remaining);
  }
  
  getFormattedTime() {
    const seconds = Math.floor(this.getRemainingTime() / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
