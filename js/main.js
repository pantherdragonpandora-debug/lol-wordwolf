// ========================================
// UI制御とメイン処理
// ========================================

let currentGame = null;
let currentPlayer = null;
let currentRoomId = null;
let gameTimer = null;

// ページ読み込み時
document.addEventListener('DOMContentLoaded', () => {
  // URL パラメータからルームIDを取得
  const urlParams = new URLSearchParams(window.location.search);
  const roomIdFromUrl = urlParams.get('room');
  
  if (roomIdFromUrl) {
    document.getElementById('join-room-id').value = roomIdFromUrl;
    showScreen('join-screen');
  } else {
    showScreen('home-screen');
  }
  
  // イベントリスナー設定
  setupEventListeners();
  
  // Firebase接続状態表示
  updateConnectionStatus();
});

// イベントリスナー設定
function setupEventListeners() {
  // ホーム画面
  document.getElementById('create-room-btn').addEventListener('click', () => showScreen('create-screen'));
  document.getElementById('join-room-btn').addEventListener('click', () => showScreen('join-screen'));
  document.getElementById('rules-btn').addEventListener('click', showRules);
  
  // ルーム作成
  document.getElementById('start-create-btn').addEventListener('click', createRoom);
  document.getElementById('back-from-create-btn').addEventListener('click', () => showScreen('home-screen'));
  
  // ルーム参加
  document.getElementById('start-join-btn').addEventListener('click', joinRoom);
  document.getElementById('back-from-join-btn').addEventListener('click', () => showScreen('home-screen'));
  
  // 待機室
  document.getElementById('start-game-btn').addEventListener('click', startGame);
  document.getElementById('leave-room-btn').addEventListener('click', leaveRoom);
  document.getElementById('copy-room-url-btn').addEventListener('click', copyRoomUrl);
  
  // ゲーム画面
  document.getElementById('end-discussion-btn').addEventListener('click', () => showScreen('voting-screen'));
  document.getElementById('send-message-btn').addEventListener('click', sendMessage);
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // 投票画面
  document.getElementById('confirm-vote-btn').addEventListener('click', confirmVote);
  
  // 結果画面
  document.getElementById('play-again-btn').addEventListener('click', resetGame);
  document.getElementById('back-to-home-btn').addEventListener('click', backToHome);
}

// 画面切り替え
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// ルーム作成
async function createRoom() {
  const playerName = document.getElementById('create-player-name').value.trim();
  const playerCount = parseInt(document.getElementById('player-count').value);
  const timer = parseInt(document.getElementById('timer').value);
  
  // カテゴリー選択
  const categories = [];
  document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
    categories.push(checkbox.value);
  });
  
  if (!playerName) {
    alert('プレイヤー名を入力してください');
    return;
  }
  
  if (categories.length === 0) {
    alert('カテゴリーを1つ以上選択してください');
    return;
  }
  
  // ルームID生成
  currentRoomId = generateRoomId();
  currentPlayer = playerName;
  
  // ゲーム作成
  currentGame = new GameState(currentRoomId);
  const success = await currentGame.createRoom(playerName, {
    playerCount,
    timer,
    categories
  });
  
  if (success) {
    // 待機室へ
    showWaitingRoom();
    currentGame.watch(updateWaitingRoom);
  } else {
    alert('ルーム作成に失敗しました');
  }
}

// ルーム参加
async function joinRoom() {
  const roomId = document.getElementById('join-room-id').value.trim();
  const playerName = document.getElementById('join-player-name').value.trim();
  
  if (!roomId || !playerName) {
    alert('ルームIDとプレイヤー名を入力してください');
    return;
  }
  
  currentRoomId = roomId;
  currentPlayer = playerName;
  currentGame = new GameState(roomId);
  
  try {
    await currentGame.joinRoom(playerName);
    showWaitingRoom();
    currentGame.watch(updateWaitingRoom);
  } catch (error) {
    alert(error.message);
  }
}

// 待機室表示
function showWaitingRoom() {
  document.getElementById('room-id-display').textContent = currentRoomId;
  document.getElementById('room-url-display').textContent = 
    `${window.location.origin}${window.location.pathname}?room=${currentRoomId}`;
  
  showScreen('waiting-screen');
}

// 待機室更新
function updateWaitingRoom(roomData) {
  if (!roomData) return;
  
  const playersList = document.getElementById('players-list');
  playersList.innerHTML = '';
  
  const players = Object.values(roomData.players || {});
  players.forEach(player => {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-item';
    playerDiv.innerHTML = `
      <span>${player.name}</span>
      ${player.name === roomData.host ? '<span class="host-badge">ホスト</span>' : ''}
    `;
    playersList.appendChild(playerDiv);
  });
  
  // ホストのみゲーム開始ボタンを表示
  const isHost = currentPlayer === roomData.host;
  document.getElementById('start-game-btn').style.display = isHost ? 'block' : 'none';
  
  // ゲーム開始後の画面遷移
  if (roomData.gameState === 'playing') {
    showGameScreen(roomData);
  } else if (roomData.gameState === 'voting') {
    showVotingScreen(roomData);
  } else if (roomData.gameState === 'finished') {
    showResultScreen(roomData);
  }
}

// ゲーム開始
async function startGame() {
  const success = await currentGame.startGame();
  if (!success) {
    alert('ゲーム開始に失敗しました');
  }
}

// ゲーム画面表示
function showGameScreen(roomData) {
  const player = roomData.players[currentPlayer];
  
  // お題表示
  document.getElementById('your-topic').textContent = player.topic;
  document.getElementById('your-role').textContent = 
    player.role === 'wolf' ? 'あなたはウルフです！' : 'あなたは市民です';
  document.getElementById('your-role').className = 
    player.role === 'wolf' ? 'role-wolf' : 'role-citizen';
  
  // タイマー開始
  if (!gameTimer && roomData.timerDuration) {
    gameTimer = new GameTimer(roomData.timerDuration, (status, remaining) => {
      if (status === 'tick') {
        const timer = new GameTimer(remaining, () => {});
        document.getElementById('timer-display').textContent = timer.getFormattedTime();
      } else if (status === 'finished') {
        document.getElementById('timer-display').textContent = '00:00';
        alert('討論時間が終了しました！');
      }
    });
    gameTimer.start();
  }
  
  // チャット表示
  updateChat(roomData.chat || []);
  
  showScreen('game-screen');
}

// チャット更新
function updateChat(messages) {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';
  
  messages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `
      <span class="chat-player">${msg.player}:</span>
      <span class="chat-text">${msg.message}</span>
    `;
    chatMessages.appendChild(messageDiv);
  });
  
  // 最新メッセージにスクロール
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// メッセージ送信
async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (message) {
    await currentGame.sendMessage(currentPlayer, message);
    input.value = '';
  }
}

// 投票画面表示
function showVotingScreen(roomData) {
  const voteOptions = document.getElementById('vote-options');
  voteOptions.innerHTML = '';
  
  Object.values(roomData.players).forEach(player => {
    if (player.name !== currentPlayer) {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'vote-option';
      optionDiv.innerHTML = `
        <input type="radio" name="vote" value="${player.name}" id="vote-${player.name}">
        <label for="vote-${player.name}">${player.name}</label>
      `;
      voteOptions.appendChild(optionDiv);
    }
  });
  
  showScreen('voting-screen');
}

// 投票確定
async function confirmVote() {
  const selectedVote = document.querySelector('input[name="vote"]:checked');
  
  if (!selectedVote) {
    alert('投票先を選択してください');
    return;
  }
  
  await currentGame.vote(currentPlayer, selectedVote.value);
  
  // 全員が投票完了したか確認
  const snapshot = await currentGame.roomRef.once('value');
  const roomData = snapshot.val();
  const players = Object.values(roomData.players);
  const allVoted = players.every(p => p.vote !== null);
  
  if (allVoted) {
    await currentGame.endVoting();
  } else {
    alert('投票完了！他のプレイヤーの投票を待っています...');
  }
}

// 結果画面表示
function showResultScreen(roomData) {
  const result = roomData.result;
  
  document.getElementById('result-title').textContent = 
    result.citizensWin ? '市民の勝利！' : 'ウルフの勝利！';
  document.getElementById('result-title').className = 
    result.citizensWin ? 'result-citizens-win' : 'result-wolf-win';
  
  document.getElementById('wolf-reveal').textContent = 
    `ウルフは ${result.wolf} でした`;
  
  document.getElementById('voted-out').textContent = 
    `追放されたのは ${result.votedOut} です`;
  
  // 投票結果
  const voteResults = document.getElementById('vote-results');
  voteResults.innerHTML = '';
  Object.entries(result.voteCount).forEach(([name, count]) => {
    const resultDiv = document.createElement('div');
    resultDiv.textContent = `${name}: ${count}票`;
    voteResults.appendChild(resultDiv);
  });
  
  // タイマー停止
  if (gameTimer) {
    gameTimer.stop();
    gameTimer = null;
  }
  
  showScreen('result-screen');
}

// もう一度プレイ
async function resetGame() {
  await currentGame.resetRoom();
  showWaitingRoom();
}

// ホームに戻る
async function backToHome() {
  if (currentGame) {
    await currentGame.leaveRoom(currentPlayer);
    currentGame.unwatch();
  }
  
  currentGame = null;
  currentPlayer = null;
  currentRoomId = null;
  
  if (gameTimer) {
    gameTimer.stop();
    gameTimer = null;
  }
  
  showScreen('home-screen');
  
  // URLパラメータをクリア
  window.history.replaceState({}, document.title, window.location.pathname);
}

// ルーム退出
async function leaveRoom() {
  if (confirm('ルームを退出しますか？')) {
    await backToHome();
  }
}

// ルームURL コピー
function copyRoomUrl() {
  const url = document.getElementById('room-url-display').textContent;
  navigator.clipboard.writeText(url).then(() => {
    alert('URLをコピーしました！');
  }).catch(() => {
    alert('URLのコピーに失敗しました');
  });
}

// ルール表示
function showRules() {
  alert(`
【ワードウルフのルール】

1. プレイヤーは「市民」と「ウルフ」に分かれます
2. 市民には多数派のお題が、ウルフには少数派のお題が与えられます
3. 全員でお題について話し合います（ただし具体的な単語は言わない）
4. 討論時間終了後、誰がウルフか投票します
5. ウルフを当てられれば市民の勝ち、外れればウルフの勝ちです

【LOLテーマ】
このゲームはLeague of Legendsをテーマにしたお題が登場します！
- チャンピオン
- アイテム
- スキル・能力
- マップ・レーン
- スペル

LOLの知識を活かして楽しんでください！
  `);
}

// 接続状態更新
function updateConnectionStatus() {
  const connectedRef = database.ref('.info/connected');
  connectedRef.on('value', (snap) => {
    const statusEl = document.getElementById('connection-status');
    if (snap.val() === true) {
      statusEl.textContent = '✅ 接続中';
      statusEl.className = 'status-connected';
    } else {
      statusEl.textContent = '❌ 切断';
      statusEl.className = 'status-disconnected';
    }
  });
}
