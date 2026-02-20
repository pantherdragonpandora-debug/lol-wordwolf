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
      console.log('🔧 ワードウルフルーム作成開始');
      console.log('- roomId:', this.roomId);
      console.log('- hostName:', hostName);
      console.log('- settings:', settings);
      
      await this.roomRef.set({
        host: hostName,
        gameMode: 'wordwolf', // ゲームモードを明示的に保存
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
      
      // 作成直後に確認
      const verifySnapshot = await this.roomRef.once('value');
      const verifyData = verifySnapshot.val();
      console.log('🔍 作成確認:', verifyData ? '成功' : '失敗');
      console.log('🔍 確認データ:', verifyData);
      
      if (!verifyData) {
        console.error('⚠️ ルームが作成されていません！Firebaseルールを確認してください');
        const errorMsg = 'ルーム作成の確認に失敗しました。\n\n接続に問題がある場合は、画面下部の「🔍 接続診断」をクリックして診断ツールをお試しください。';
        throw new Error(errorMsg);
      }
      
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
        const errorMsg = 'ルームが存在しません。\n\nルームIDが正しいか確認してください。\n接続に問題がある場合は、画面下部の「🔍 接続診断」をクリックして診断ツールをお試しください。';
        throw new Error(errorMsg);
      }
      
      const roomData = snapshot.val();
      
      // ゲームタイプが一致するかチェック
      const roomGameType = roomData.settings?.gameType;
      if (roomGameType) {
        // selectedGameTypeはglobalに定義されている（main.jsより）
        const currentGameType = typeof selectedGameType !== 'undefined' ? selectedGameType : null;
        if (currentGameType && roomGameType !== currentGameType) {
          const roomGameTypeName = roomGameType.toUpperCase();
          const currentGameTypeName = currentGameType.toUpperCase();
          throw new Error(
            `このルームは ${roomGameTypeName} 用です。\n` +
            `現在 ${currentGameTypeName} を選択しています。\n` +
            `ゲーム選択画面に戻って正しいゲームタイプを選択してください。`
          );
        }
      }
      
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
      
      // 現在の言語を取得（i18n.jsのcurrentLanguageを使用）
      const currentLang = typeof currentLanguage !== 'undefined' ? currentLanguage : 'ja';
      
      // お題選択
      const topic = getRandomTopic(
        roomData.settings.categories || ['all'], 
        roomData.settings.gameType || 'lol',
        currentLang
      );
      
      // ウルフをランダムに決定（1人）
      const wolfIndex = Math.floor(Math.random() * playerCount);
      const wolfPlayer = players[wolfIndex];
      
      // 各プレイヤーに役割とお題を割り当て
      const updates = {};
      players.forEach((playerName, index) => {
        const isWolf = index === wolfIndex;
        updates[`players/${playerName}/role`] = isWolf ? 'wolf' : 'citizen';
        updates[`players/${playerName}/topic`] = isWolf ? topic.minority : topic.majority;
        
        // 画像URLがあれば保存
        if (topic.images) {
          updates[`players/${playerName}/topicImage`] = isWolf ? topic.images.minority : topic.images.majority;
        }
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
      const citizen = Object.values(players).find(p => p.role === 'citizen');
      
      // 勝敗判定
      const citizensWin = votedOut === wolf.name;
      
      // 結果保存
      await this.roomRef.update({
        gameState: 'finished',
        result: {
          votedOut: votedOut,
          voteCount: voteCount,
          wolf: wolf.name,
          wolfTopic: wolf.topic,
          citizenTopic: citizen.topic,
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
      const snapshot = await this.roomRef.once('value');
      const roomData = snapshot.val();
      
      if (!roomData) {
        console.log('ルームが存在しません');
        return true;
      }
      
      const isHost = roomData.host === playerName;
      
      // プレイヤーを削除
      await this.roomRef.child(`players/${playerName}`).remove();
      
      // 残りのプレイヤーを確認
      const playersSnapshot = await this.roomRef.child('players').once('value');
      const remainingPlayers = playersSnapshot.val();
      
      if (!remainingPlayers || Object.keys(remainingPlayers).length === 0) {
        // 全員退出したらルーム削除
        await this.roomRef.remove();
        console.log('✅ ルーム削除（全員退出）');
        return true;
      }
      
      // ホストが退出した場合、次の人をホストに昇格
      if (isHost) {
        const newHostName = Object.keys(remainingPlayers)[0];
        await this.roomRef.update({
          host: newHostName
        });
        console.log(`✅ ホスト移譲: ${playerName} → ${newHostName}`);
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
// ルームID生成（重複チェック付き）
async function generateRoomId() {
  const maxAttempts = 10; // 最大試行回数
  
  for (let i = 0; i < maxAttempts; i++) {
    // 6桁のランダムなIDを生成
    const roomId = Math.floor(100000 + Math.random() * 900000).toString();
    
    // ワードウルフとデマーシアの両方で重複チェック
    const wordwolfRef = firebase.database().ref(`rooms/${roomId}`);
    const demaciaRef = firebase.database().ref(`demacia_rooms/${roomId}`);
    
    const [wordwolfSnapshot, demaciaSnapshot] = await Promise.all([
      wordwolfRef.once('value'),
      demaciaRef.once('value')
    ]);
    
    // 両方とも存在しない場合は使用可能
    if (!wordwolfSnapshot.exists() && !demaciaSnapshot.exists()) {
      console.log('✅ ユニークなルームID生成:', roomId);
      return roomId;
    }
    
    console.log('⚠️ ルームID重複:', roomId, '再試行中...', i + 1, '/', maxAttempts);
  }
  
  // 最大試行回数を超えた場合はタイムスタンプベースのIDを生成
  const fallbackId = (Date.now() % 1000000).toString().padStart(6, '0');
  console.log('⚠️ タイムスタンプベースのIDを使用:', fallbackId);
  return fallbackId;
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
