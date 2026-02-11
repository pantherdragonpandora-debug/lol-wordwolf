/**
 * LOLワードウルフ - UI制御
 * DOM操作とユーザーインタラクション
 */

// グローバル変数
let gameState;
let syncInterval;

/**
 * ページ読み込み時の初期化
 */
document.addEventListener('DOMContentLoaded', () => {
    // ゲーム状態を初期化
    gameState = new GameState();
    
    // イベントリスナーを設定
    setupEventListeners();
    
    // URLパラメータをチェック（ルームIDが含まれている場合）
    checkUrlParams();
    
    // ホーム画面を表示
    showScreen('homeScreen');
});

/**
 * イベントリスナーの設定
 */
function setupEventListeners() {
    // ホーム画面
    document.getElementById('createRoomBtn').addEventListener('click', showRoomSetup);
    document.getElementById('joinRoomForm').addEventListener('submit', handleJoinRoom);
    
    // ルーム設定画面
    document.getElementById('roomSetupForm').addEventListener('submit', handleCreateRoom);
    document.getElementById('cancelSetupBtn').addEventListener('click', () => showScreen('homeScreen'));
    
    // ルーム待機画面
    document.getElementById('copyRoomIdBtn').addEventListener('click', copyRoomId);
    document.getElementById('copyUrlBtn').addEventListener('click', copyShareUrl);
    document.getElementById('startGameBtn').addEventListener('click', handleStartGame);
    document.getElementById('leaveRoomBtn').addEventListener('click', handleLeaveRoom);
    
    // ゲーム画面
    document.getElementById('chatForm').addEventListener('submit', handleSendMessage);
    document.getElementById('startVoteBtn').addEventListener('click', handleStartVote);
    document.getElementById('toggleChatBtn')?.addEventListener('click', toggleChat);
    
    // 投票画面
    document.getElementById('cancelVoteBtn').addEventListener('click', () => {
        gameState.gameStatus = 'playing';
        showScreen('gameScreen');
    });
    document.getElementById('submitVoteBtn').addEventListener('click', handleSubmitVote);
    
    // 結果画面
    document.getElementById('backToHomeBtn').addEventListener('click', handleBackToHome);
    
    // ルール説明モーダル
    document.getElementById('rulesBtn').addEventListener('click', () => showModal('rulesModal'));
    document.getElementById('closeRulesBtn').addEventListener('click', () => hideModal('rulesModal'));
    document.getElementById('closeRulesBtn2').addEventListener('click', () => hideModal('rulesModal'));
    
    // モーダルの背景クリックで閉じる
    document.getElementById('rulesModal').addEventListener('click', (e) => {
        if (e.target.id === 'rulesModal') {
            hideModal('rulesModal');
        }
    });
}

/**
 * URLパラメータをチェック
 */
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    
    if (roomId && roomId.length === 6) {
        // ルームIDが指定されている場合、参加フォームに自動入力
        document.getElementById('roomIdInput').value = roomId;
    }
}

/**
 * 画面を切り替え
 */
function showScreen(screenId) {
    // 全画面を非表示
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 指定画面を表示
    document.getElementById(screenId).classList.add('active');
}

/**
 * モーダルを表示
 */
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

/**
 * モーダルを非表示
 */
function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

/**
 * トースト通知を表示
 */
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * ルーム設定画面を表示
 */
function showRoomSetup() {
    showScreen('roomSetupScreen');
}

/**
 * ルーム作成を処理
 */
function handleCreateRoom(e) {
    e.preventDefault();
    
    // プレイヤー名を入力
    const playerName = prompt('あなたの名前を入力してください:', 'プレイヤー1');
    if (!playerName) return;
    
    // 設定を取得
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const selectedCategories = Array.from(
        document.querySelectorAll('input[name="category"]:checked')
    ).map(cb => cb.value);
    const discussionTime = parseInt(document.getElementById('discussionTime').value);
    
    if (selectedCategories.length === 0) {
        showToast('少なくとも1つのカテゴリーを選択してください');
        return;
    }
    
    // ルームを作成
    try {
        const roomId = gameState.createRoom(playerName, {
            playerCount,
            categories: selectedCategories,
            discussionTime
        });
        
        showToast(`ルーム ${roomId} を作成しました！`);
        showWaitingRoom();
        startSync();
    } catch (error) {
        showToast('ルーム作成エラー: ' + error.message);
    }
}

/**
 * ルーム参加を処理
 */
function handleJoinRoom(e) {
    e.preventDefault();
    
    const roomId = document.getElementById('roomIdInput').value.trim();
    if (roomId.length !== 6) {
        showToast('ルームIDは6桁の数字です');
        return;
    }
    
    // プレイヤー名を入力
    const playerName = prompt('あなたの名前を入力してください:', 'プレイヤー');
    if (!playerName) return;
    
    // ルームに参加
    try {
        gameState.joinRoom(roomId, playerName);
        showToast(`ルーム ${roomId} に参加しました！`);
        showWaitingRoom();
        startSync();
    } catch (error) {
        showToast('参加エラー: ' + error.message);
    }
}

/**
 * ルーム待機画面を表示
 */
function showWaitingRoom() {
    showScreen('roomWaitingScreen');
    
    // ルームIDを表示
    document.getElementById('displayRoomId').textContent = gameState.roomId;
    
    // 共有URLを生成
    const shareUrl = `${window.location.origin}${window.location.pathname}?room=${gameState.roomId}`;
    document.getElementById('shareUrl').value = shareUrl;
    
    // プレイヤーリストを更新
    updatePlayersList();
    
    // ホストの場合のみゲーム開始ボタンを有効化
    updateStartButton();
}

/**
 * プレイヤーリストを更新
 */
function updatePlayersList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    
    gameState.players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item';
        playerItem.innerHTML = `
            <div class="player-info">
                <span class="player-icon">👤</span>
                <span class="player-name">${escapeHtml(player.name)}</span>
            </div>
            ${player.isHost ? '<span class="player-badge">ホスト</span>' : ''}
        `;
        playersList.appendChild(playerItem);
    });
    
    // プレイヤー数を更新
    document.getElementById('playerCountDisplay').textContent = 
        `${gameState.players.length}/${gameState.settings.playerCount}`;
}

/**
 * ゲーム開始ボタンの状態を更新
 */
function updateStartButton() {
    const startBtn = document.getElementById('startGameBtn');
    const canStart = gameState.isHost && 
                     gameState.players.length >= 3 && 
                     gameState.players.length <= gameState.settings.playerCount;
    
    startBtn.disabled = !canStart;
}

/**
 * ルームIDをコピー
 */
function copyRoomId() {
    const roomId = gameState.roomId;
    copyToClipboard(roomId);
    showToast('ルームIDをコピーしました！');
}

/**
 * 共有URLをコピー
 */
function copyShareUrl() {
    const shareUrl = document.getElementById('shareUrl').value;
    copyToClipboard(shareUrl);
    showToast('URLをコピーしました！');
}

/**
 * クリップボードにコピー
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        // フォールバック
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

/**
 * ゲーム開始を処理
 */
function handleStartGame() {
    try {
        gameState.startGame();
        showGameScreen();
        showToast('ゲーム開始！');
    } catch (error) {
        showToast('ゲーム開始エラー: ' + error.message);
    }
}

/**
 * ゲーム画面を表示
 */
function showGameScreen() {
    showScreen('gameScreen');
    
    // お題を表示
    document.getElementById('topicDisplay').textContent = gameState.myTopic;
    
    // タイマーを開始
    updateTimer();
    
    // チャットをクリア
    document.getElementById('chatMessages').innerHTML = '';
}

/**
 * タイマーを更新
 */
function updateTimer() {
    const minutes = Math.floor(gameState.timeRemaining / 60);
    const seconds = gameState.timeRemaining % 60;
    const timeText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('timerDisplay').textContent = timeText;
    
    // プログレスバーを更新
    const progress = (gameState.timeRemaining / gameState.settings.discussionTime) * 100;
    document.getElementById('timerBar').style.width = `${progress}%`;
    
    // 時間切れ
    if (gameState.timeRemaining <= 0) {
        showToast('時間切れ！投票を開始してください');
    }
}

/**
 * チャットメッセージを送信
 */
function handleSendMessage(e) {
    e.preventDefault();
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        gameState.addChatMessage(message);
        input.value = '';
        updateChatMessages();
    }
}

/**
 * チャットメッセージを更新
 */
function updateChatMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    gameState.chatMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        
        const time = new Date(msg.timestamp);
        const timeStr = `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
        
        messageDiv.innerHTML = `
            <div class="chat-message-header">
                <span class="chat-message-sender">${escapeHtml(msg.sender)}</span>
                <span class="chat-message-time">${timeStr}</span>
            </div>
            <div class="chat-message-text">${escapeHtml(msg.text)}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
    });
    
    // 最新メッセージまでスクロール
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * チャットの表示/非表示を切り替え（モバイル用）
 */
function toggleChat() {
    const chatPanel = document.getElementById('chatPanel');
    chatPanel.classList.toggle('collapsed');
}

/**
 * 投票開始を処理
 */
function handleStartVote() {
    gameState.startVoting();
    showVoteScreen();
}

/**
 * 投票画面を表示
 */
function showVoteScreen() {
    showScreen('voteScreen');
    
    const votePlayers = document.getElementById('votePlayers');
    votePlayers.innerHTML = '';
    
    gameState.players.forEach(player => {
        const voteDiv = document.createElement('div');
        voteDiv.className = 'vote-player';
        voteDiv.dataset.playerId = player.id;
        voteDiv.innerHTML = `
            <span class="player-icon">👤</span>
            <span class="player-name">${escapeHtml(player.name)}</span>
        `;
        
        voteDiv.addEventListener('click', () => selectVotePlayer(player.id));
        votePlayers.appendChild(voteDiv);
    });
}

/**
 * 投票プレイヤーを選択
 */
function selectVotePlayer(playerId) {
    // 既存の選択を解除
    document.querySelectorAll('.vote-player').forEach(div => {
        div.classList.remove('selected');
    });
    
    // 新しい選択
    const selectedDiv = document.querySelector(`[data-player-id="${playerId}"]`);
    if (selectedDiv) {
        selectedDiv.classList.add('selected');
        document.getElementById('submitVoteBtn').disabled = false;
    }
}

/**
 * 投票を送信
 */
function handleSubmitVote() {
    const selectedDiv = document.querySelector('.vote-player.selected');
    if (!selectedDiv) return;
    
    const votedPlayerId = selectedDiv.dataset.playerId;
    gameState.vote(votedPlayerId);
    
    showToast('投票しました！');
    
    // 全員が投票したかチェック
    if (Object.keys(gameState.votes).length === gameState.players.length) {
        showResultScreen();
    } else {
        // 待機画面に戻る
        showScreen('gameScreen');
        showToast('他のプレイヤーの投票を待っています...');
    }
}

/**
 * 結果画面を表示
 */
function showResultScreen() {
    const result = gameState.showResult();
    showScreen('resultScreen');
    
    // 勝敗を表示
    const resultTitle = document.getElementById('resultTitle');
    const resultEmoji = document.getElementById('resultEmoji');
    
    if (result.citizenWin) {
        resultTitle.textContent = '市民の勝利！';
        resultEmoji.textContent = '🎉';
    } else {
        resultTitle.textContent = 'ウルフの勝利！';
        resultEmoji.textContent = '🐺';
    }
    
    // 役割を表示
    const rolesReveal = document.getElementById('rolesReveal');
    rolesReveal.innerHTML = '';
    
    gameState.players.forEach(player => {
        const roleDiv = document.createElement('div');
        roleDiv.className = `role-item ${player.role === 'wolf' ? 'wolf' : ''}`;
        roleDiv.innerHTML = `
            <div class="player-info">
                <span class="player-icon">${player.role === 'wolf' ? '🐺' : '👤'}</span>
                <span class="player-name">${escapeHtml(player.name)}</span>
            </div>
            <span class="role-badge ${player.role}">${player.role === 'wolf' ? 'ウルフ' : '市民'}</span>
        `;
        rolesReveal.appendChild(roleDiv);
    });
    
    // お題を表示
    const topicsReveal = document.getElementById('topicsReveal');
    topicsReveal.innerHTML = `
        <div class="topic-item">
            <div class="topic-label">市民のお題</div>
            <div class="topic-value">${escapeHtml(gameState.currentTopic.citizen)}</div>
        </div>
        <div class="topic-item">
            <div class="topic-label">ウルフのお題</div>
            <div class="topic-value">${escapeHtml(gameState.currentTopic.wolf)}</div>
        </div>
    `;
    
    // 投票結果を表示
    const voteResults = document.getElementById('voteResults');
    voteResults.innerHTML = '';
    
    const { voteCounts } = gameState.calculateVoteResults();
    
    gameState.players.forEach(player => {
        const voteCount = voteCounts[player.id] || 0;
        const voteDiv = document.createElement('div');
        voteDiv.className = 'vote-result-item';
        voteDiv.innerHTML = `
            <span class="player-name">${escapeHtml(player.name)}</span>
            <span class="vote-count">${voteCount}票</span>
        `;
        voteResults.appendChild(voteDiv);
    });
}

/**
 * ルーム退出を処理
 */
function handleLeaveRoom() {
    if (confirm('ルームから退出しますか？')) {
        stopSync();
        gameState.leaveRoom();
        showScreen('homeScreen');
        showToast('ルームから退出しました');
    }
}

/**
 * ホームに戻る
 */
function handleBackToHome() {
    stopSync();
    gameState.reset();
    showScreen('homeScreen');
}

/**
 * 同期を開始（2秒間隔でデータを更新）
 */
function startSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
    }
    
    syncInterval = setInterval(() => {
        const synced = gameState.syncRoomData();
        
        if (!synced) {
            showToast('ルームが削除されました');
            stopSync();
            gameState.reset();
            showScreen('homeScreen');
            return;
        }
        
        // 画面の状態に応じて更新
        const currentScreen = document.querySelector('.screen.active');
        
        if (currentScreen && currentScreen.id === 'roomWaitingScreen') {
            updatePlayersList();
            updateStartButton();
            
            // ゲームが開始されたら画面を切り替え
            if (gameState.gameStatus === 'playing') {
                showGameScreen();
                showToast('ホストがゲームを開始しました！');
            }
        } else if (currentScreen && currentScreen.id === 'gameScreen') {
            updateTimer();
            updateChatMessages();
            
            // 投票画面に移行
            if (gameState.gameStatus === 'voting') {
                showVoteScreen();
            }
        } else if (currentScreen && currentScreen.id === 'voteScreen') {
            // 全員が投票したかチェック
            if (Object.keys(gameState.votes).length === gameState.players.length) {
                showResultScreen();
            }
        }
    }, 2000);
}

/**
 * 同期を停止
 */
function stopSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
    }
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ページを離れる前にタイマーを停止
window.addEventListener('beforeunload', () => {
    if (gameState) {
        gameState.stopTimer();
    }
    stopSync();
});