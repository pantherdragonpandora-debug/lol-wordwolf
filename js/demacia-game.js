// ========================================
// デマーシアに心を込めて - ゲームロジック（修正版）
// ========================================

class DemaciaGame {
  constructor(roomId) {
    this.roomRef = firebase.database().ref(`demacia_rooms/${roomId}`);
    this.roomId = roomId;
    this.roomData = null; // ルームデータを保持
  }

  // ルーム作成
  async createRoom(hostName, settings) {
    try {
      console.log('🔧 createRoom開始');
      console.log('- hostName:', hostName);
      console.log('- settings:', settings);
      console.log('- roomRef:', this.roomRef);
      console.log('- firebase:', typeof firebase);
      console.log('- firebase.database:', typeof firebase.database);
      
      const roomData = {
        host: hostName,
        settings: {
          playerCount: settings.playerCount || 10,
          roundCount: settings.roundCount || 5,
          performerSelection: settings.performerSelection || 'random',
          gameType: settings.gameType || 'lol'
        },
        players: {
          [hostName]: {
            name: hostName,
            score: 0,
            isHost: true,
            joinedAt: Date.now()
          }
        },
        gameState: 'waiting',
        currentRound: 0,
        createdAt: Date.now()
      };

      console.log('📝 作成するルームデータ:', roomData);
      
      await this.roomRef.set(roomData);
      
      console.log('✅ デマーシアルーム作成成功:', this.roomId);
      return true;
    } catch (error) {
      console.error('❌ ルーム作成エラー:', error);
      console.error('エラー詳細:', error.message);
      console.error('エラースタック:', error.stack);
      return false;
    }
  }

  // ルーム参加
  async joinRoom(playerName) {
    try {
      const snapshot = await this.roomRef.once('value');
      const room = snapshot.val();

      if (!room) {
        alert('ルームが存在しません');
        return false;
      }

      const playerCount = Object.keys(room.players || {}).length;
      const maxPlayers = room.settings.playerCount || 10;

      if (playerCount >= maxPlayers) {
        alert('ルームが満員です');
        return false;
      }

      if (room.gameState !== 'waiting') {
        alert('ゲームが既に開始されています');
        return false;
      }

      await this.roomRef.child(`players/${playerName}`).set({
        name: playerName,
        score: 0,
        isHost: false,
        joinedAt: Date.now()
      });

      console.log('✅ ルーム参加:', playerName);
      return true;
    } catch (error) {
      console.error('❌ ルーム参加エラー:', error);
      return false;
    }
  }

  // ゲーム開始（演技者選択フェーズへ）
  async startGame() {
    try {
      const snapshot = await this.roomRef.once('value');
      const room = snapshot.val();
      const playerCount = Object.keys(room.players || {}).length;

      if (playerCount < 3) {
        alert('最低3人必要です');
        return false;
      }

      // ゲームタイプに応じてランダムにお題を選択
      const gameType = room.settings.gameType || 'lol';
      const phrase = getRandomDemaciaPhrase(gameType);
      
      await this.roomRef.update({
        gameState: 'performer_selection',
        currentRound: 1,
        currentPhrase: phrase,
        correctSituation: Math.floor(Math.random() * phrase.situations.length),
        startedAt: Date.now()
      });

      console.log('✅ ゲーム開始 - 演技者選択フェーズ');
      return true;
    } catch (error) {
      console.error('❌ ゲーム開始エラー:', error);
      return false;
    }
  }

  // 演技者を選択（ランダムまたは手動）
  async selectPerformer(performerName = null) {
    try {
      const snapshot = await this.roomRef.once('value');
      const room = snapshot.val();
      const playerNames = Object.keys(room.players);

      // ランダム選択の場合
      if (!performerName) {
        const randomIndex = Math.floor(Math.random() * playerNames.length);
        performerName = playerNames[randomIndex];
      }

      // ランダムにシチュエーションを1つ選択（演技者用）
      const situations = room.currentPhrase.situations;
      const randomSituationIndex = Math.floor(Math.random() * situations.length);
      const performerSituation = situations[randomSituationIndex];

      await this.roomRef.update({
        gameState: 'performing',
        currentPerformer: performerName,
        performerSituation: {
          id: performerSituation.id,
          text: performerSituation.text,
          difficulty: performerSituation.difficulty
        }
      });

      console.log('✅ 演技者選択:', performerName);
      return true;
    } catch (error) {
      console.error('❌ 演技者選択エラー:', error);
      return false;
    }
  }

  // 投票フェーズへ
  async startVoting() {
    try {
      await this.roomRef.update({
        gameState: 'voting',
        votes: {}
      });

      console.log('✅ 投票フェーズ開始');
      return true;
    } catch (error) {
      console.error('❌ 投票フェーズエラー:', error);
      return false;
    }
  }

  // 投票（投票者が演技者のシチュエーションを推測）
  async vote(voterName, guessedSituationId) {
    try {
      await this.roomRef.child(`votes/${voterName}`).set({
        guessedSituation: guessedSituationId,
        timestamp: Date.now()
      });

      console.log(`✅ 投票: ${voterName} → Situation ${guessedSituationId}`);
      return true;
    } catch (error) {
      console.error('❌ 投票エラー:', error);
      return false;
    }
  }

  // 投票結果の集計
  async calculateResults() {
    try {
      const snapshot = await this.roomRef.once('value');
      const room = snapshot.val();
      const votes = room.votes || {};
      const correctSituationId = room.performerSituation.id;
      const difficulty = room.performerSituation.difficulty;
      const performerName = room.currentPerformer;
      
      // 正解した投票者の数をカウント
      let correctVotes = 0;
      const voterResults = {};

      Object.entries(votes).forEach(([voterName, vote]) => {
        const isCorrect = vote.guessedSituation === correctSituationId;
        voterResults[voterName] = {
          guessed: vote.guessedSituation,
          correct: isCorrect
        };
        if (isCorrect) {
          correctVotes++;
        }
      });

      // 演技者にポイント付与（正解者数 × 難易度ポイント）
      const performerPoints = correctVotes * demaciaData.points[difficulty];
      const currentPerformerScore = room.players[performerName].score || 0;

      const updates = {};
      updates[`players/${performerName}/score`] = currentPerformerScore + performerPoints;
      updates['gameState'] = 'results';
      updates['roundResults'] = {
        performer: performerName,
        correctSituationId: correctSituationId,
        correctSituationText: room.performerSituation.text,
        correctVotes: correctVotes,
        totalVoters: Object.keys(votes).length,
        pointsEarned: performerPoints,
        difficulty: difficulty,
        voterResults: voterResults
      };

      await this.roomRef.update(updates);
      
      console.log('✅ 結果集計完了');
      return true;
    } catch (error) {
      console.error('❌ 結果集計エラー:', error);
      return false;
    }
  }

  // 次のラウンドへ
  async nextRound() {
    try {
      const snapshot = await this.roomRef.once('value');
      const room = snapshot.val();
      const maxRounds = room.settings.roundCount || 5;

      if (room.currentRound >= maxRounds) {
        // ゲーム終了
        await this.roomRef.update({
          gameState: 'finished'
        });
        console.log('✅ ゲーム終了');
        return true;
      }

      // 新しいラウンドを開始
      const phrase = getRandomDemaciaPhrase();

      await this.roomRef.update({
        gameState: 'performer_selection',
        currentRound: room.currentRound + 1,
        currentPhrase: {
          id: phrase.id,
          text: phrase.text,
          character: phrase.character,
          situations: phrase.situations
        },
        currentPerformer: null,
        performerSituation: null,
        votes: null,
        roundResults: null
      });

      console.log('✅ 次のラウンドへ');
      return true;
    } catch (error) {
      console.error('❌ 次ラウンドエラー:', error);
      return false;
    }
  }

  // リアルタイム監視
  watch(callback) {
    this.roomRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.roomData = data; // ルームデータを保存
        callback(data);
      }
    });
  }

  // 監視解除
  unwatch() {
    this.roomRef.off();
  }

  // ルーム退出
  async leaveRoom(playerName) {
    try {
      await this.roomRef.child(`players/${playerName}`).remove();
      return true;
    } catch (error) {
      console.error('❌ 退出エラー:', error);
      return false;
    }
  }
}

// グローバルにエクスポート
if (typeof window !== 'undefined') {
  window.DemaciaGame = DemaciaGame;
}
