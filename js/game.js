/**
 * LOLワードウルフ - ゲームロジック
 * ゲームの状態管理とビジネスロジック
 */

/**
 * ゲーム状態管理クラス
 */
class GameState {
    constructor() {
        this.roomId = null;
        this.isHost = false;
        this.playerName = null;
        this.players = [];
        this.settings = {
            playerCount: 4,
            categories: ['champion', 'item', 'skill', 'map', 'spell'],
            discussionTime: 180 // 秒
        };
        this.gameStatus = 'idle'; // idle, waiting, playing, voting, result
        this.currentTopic = null;
        this.wolfIndex = null;
        this.myTopic = null;
        this.isWolf = false;
        this.timer = null;
        this.timeRemaining = 0;
        this.votes = {};
        this.chatMessages = [];
    }

    /**
     * ルームIDを生成（6桁の数字）
     */
    generateRoomId() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    /**
     * プレイヤーIDを生成
     */
    generatePlayerId() {
        return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * ルームを作成
     */
    createRoom(playerName, settings) {
        this.roomId = this.generateRoomId();
        this.isHost = true;
        this.playerName = playerName;
        this.settings = { ...this.settings, ...settings };
        
        const playerId = this.generatePlayerId();
        this.players = [{
            id: playerId,
            name: playerName,
            isHost: true,
            joinedAt: Date.now()
        }];
        
        this.gameStatus = 'waiting';
        this.saveToStorage();
        
        return this.roomId;
    }

    /**
     * ルームに参加
     */
    joinRoom(roomId, playerName) {
        const roomData = this.loadRoomFromStorage(roomId);
        if (!roomData) {
            throw new Error('ルームが見つかりません');
        }

        this.roomId = roomId;
        this.isHost = false;
        this.playerName = playerName;
        this.settings = roomData.settings;
        this.gameStatus = roomData.gameStatus;
        
        const playerId = this.generatePlayerId();
        const newPlayer = {
            id: playerId,
            name: playerName,
            isHost: false,
            joinedAt: Date.now()
        };
        
        this.players = [...roomData.players, newPlayer];
        
        if (this.players.length > this.settings.playerCount) {
            throw new Error('ルームが満員です');
        }
        
        this.saveToStorage();
        return playerId;
    }

    /**
     * ルームから退出
     */
    leaveRoom() {
        if (this.roomId) {
            // ルームデータを削除
            localStorage.removeItem(`room_${this.roomId}`);
            localStorage.removeItem(`game_${this.roomId}`);
            localStorage.removeItem(`chat_${this.roomId}`);
        }
        this.reset();
    }

    /**
     * ゲームを開始
     */
    startGame() {
        if (!this.isHost) {
            throw new Error('ホストのみがゲームを開始できます');
        }

        if (this.players.length < 3) {
            throw new Error('最低3人のプレイヤーが必要です');
        }

        // ウルフをランダムに選択
        this.wolfIndex = Math.floor(Math.random() * this.players.length);
        
        // お題ペアを選択
        const topicPair = getRandomTopicPair(this.settings.categories);
        this.currentTopic = topicPair;
        
        // 各プレイヤーにお題を割り当て
        this.players.forEach((player, index) => {
            if (index === this.wolfIndex) {
                player.topic = topicPair.wolf;
                player.role = 'wolf';
            } else {
                player.topic = topicPair.citizen;
                player.role = 'citizen';
            }
        });
        
        // 自分のお題を設定
        const myPlayerIndex = this.players.findIndex(p => p.name === this.playerName);
        if (myPlayerIndex !== -1) {
            this.myTopic = this.players[myPlayerIndex].topic;
            this.isWolf = this.players[myPlayerIndex].role === 'wolf';
        }
        
        this.gameStatus = 'playing';
        this.timeRemaining = this.settings.discussionTime;
        this.votes = {};
        
        this.saveToStorage();
        this.startTimer();
    }

    /**
     * タイマーを開始
     */
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            
            if (this.timeRemaining <= 0) {
                this.stopTimer();
                // タイマー終了時の処理はUIで行う
            }
            
            // タイマー更新をストレージに保存
            this.saveTimerToStorage();
        }, 1000);
    }

    /**
     * タイマーを停止
     */
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    /**
     * 投票を開始
     */
    startVoting() {
        this.gameStatus = 'voting';
        this.stopTimer();
        this.saveToStorage();
    }

    /**
     * 投票する
     */
    vote(votedPlayerId) {
        const myPlayer = this.players.find(p => p.name === this.playerName);
        if (!myPlayer) {
            throw new Error('プレイヤーが見つかりません');
        }
        
        this.votes[myPlayer.id] = votedPlayerId;
        this.saveToStorage();
    }

    /**
     * 投票結果を集計
     */
    calculateVoteResults() {
        const voteCounts = {};
        
        // 投票数をカウント
        Object.values(this.votes).forEach(votedId => {
            voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
        });
        
        // 最多票のプレイヤーを特定
        let maxVotes = 0;
        let executedPlayers = [];
        
        Object.entries(voteCounts).forEach(([playerId, count]) => {
            if (count > maxVotes) {
                maxVotes = count;
                executedPlayers = [playerId];
            } else if (count === maxVotes) {
                executedPlayers.push(playerId);
            }
        });
        
        return {
            voteCounts,
            executedPlayers,
            maxVotes
        };
    }

    /**
     * ゲーム結果を判定
     */
    judgeGameResult() {
        const { executedPlayers } = this.calculateVoteResults();
        const wolfPlayer = this.players[this.wolfIndex];
        
        // ウルフが処刑されたかチェック
        const wolfExecuted = executedPlayers.includes(wolfPlayer.id);
        
        return {
            citizenWin: wolfExecuted,
            wolfWin: !wolfExecuted,
            wolfPlayer: wolfPlayer,
            executedPlayers: executedPlayers.map(id => 
                this.players.find(p => p.id === id)
            )
        };
    }

    /**
     * 結果画面に移行
     */
    showResult() {
        this.gameStatus = 'result';
        this.saveToStorage();
        return this.judgeGameResult();
    }

    /**
     * チャットメッセージを追加
     */
    addChatMessage(message) {
        const chatMessage = {
            id: Date.now(),
            sender: this.playerName,
            text: message,
            timestamp: Date.now()
        };
        
        this.chatMessages.push(chatMessage);
        this.saveChatToStorage();
        
        return chatMessage;
    }

    /**
     * LocalStorageに保存
     */
    saveToStorage() {
        if (!this.roomId) return;
        
        const roomData = {
            roomId: this.roomId,
            players: this.players,
            settings: this.settings,
            gameStatus: this.gameStatus,
            currentTopic: this.currentTopic,
            wolfIndex: this.wolfIndex,
            votes: this.votes,
            updatedAt: Date.now()
        };
        
        localStorage.setItem(`room_${this.roomId}`, JSON.stringify(roomData));
        
        // 個人データも保存
        const myData = {
            playerName: this.playerName,
            isHost: this.isHost,
            myTopic: this.myTopic,
            isWolf: this.isWolf
        };
        
        localStorage.setItem(`game_${this.roomId}_${this.playerName}`, JSON.stringify(myData));
    }

    /**
     * タイマーをLocalStorageに保存
     */
    saveTimerToStorage() {
        if (!this.roomId) return;
        
        localStorage.setItem(`timer_${this.roomId}`, JSON.stringify({
            timeRemaining: this.timeRemaining,
            updatedAt: Date.now()
        }));
    }

    /**
     * チャットをLocalStorageに保存
     */
    saveChatToStorage() {
        if (!this.roomId) return;
        
        localStorage.setItem(`chat_${this.roomId}`, JSON.stringify({
            messages: this.chatMessages,
            updatedAt: Date.now()
        }));
    }

    /**
     * LocalStorageから読み込み
     */
    loadRoomFromStorage(roomId) {
        const data = localStorage.getItem(`room_${roomId}`);
        return data ? JSON.parse(data) : null;
    }

    /**
     * タイマーをLocalStorageから読み込み
     */
    loadTimerFromStorage() {
        if (!this.roomId) return;
        
        const data = localStorage.getItem(`timer_${this.roomId}`);
        if (data) {
            const timerData = JSON.parse(data);
            this.timeRemaining = timerData.timeRemaining;
        }
    }

    /**
     * チャットをLocalStorageから読み込み
     */
    loadChatFromStorage() {
        if (!this.roomId) return;
        
        const data = localStorage.getItem(`chat_${this.roomId}`);
        if (data) {
            const chatData = JSON.parse(data);
            this.chatMessages = chatData.messages || [];
        }
    }

    /**
     * ルームデータを同期（他のプレイヤーの変更を取得）
     */
    syncRoomData() {
        if (!this.roomId) return false;
        
        const roomData = this.loadRoomFromStorage(this.roomId);
        if (!roomData) return false;
        
        // ルームデータを更新
        this.players = roomData.players;
        this.gameStatus = roomData.gameStatus;
        this.currentTopic = roomData.currentTopic;
        this.wolfIndex = roomData.wolfIndex;
        this.votes = roomData.votes;
        
        // 自分のお題を再取得
        const myPlayer = this.players.find(p => p.name === this.playerName);
        if (myPlayer) {
            this.myTopic = myPlayer.topic;
            this.isWolf = myPlayer.role === 'wolf';
        }
        
        // タイマーを同期
        this.loadTimerFromStorage();
        
        // チャットを同期
        this.loadChatFromStorage();
        
        return true;
    }

    /**
     * ゲーム状態をリセット
     */
    reset() {
        this.stopTimer();
        this.roomId = null;
        this.isHost = false;
        this.playerName = null;
        this.players = [];
        this.gameStatus = 'idle';
        this.currentTopic = null;
        this.wolfIndex = null;
        this.myTopic = null;
        this.isWolf = false;
        this.timeRemaining = 0;
        this.votes = {};
        this.chatMessages = [];
    }

    /**
     * 現在のゲーム状態を取得
     */
    getState() {
        return {
            roomId: this.roomId,
            isHost: this.isHost,
            playerName: this.playerName,
            players: this.players,
            settings: this.settings,
            gameStatus: this.gameStatus,
            myTopic: this.myTopic,
            isWolf: this.isWolf,
            timeRemaining: this.timeRemaining,
            votes: this.votes,
            chatMessages: this.chatMessages
        };
    }
}

// グローバルに公開
if (typeof window !== 'undefined') {
    window.GameState = GameState;
}

// モジュールとしてエクスポート（必要に応じて）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameState };
}