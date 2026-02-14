// ========================================
// UI制御とメイン処理
// ========================================

let selectedGameType = null; // 'lol' または 'valorant' または 'tft'
let selectedGameMode = 'wordwolf'; // 'wordwolf' または 'demacia'
let currentGame = null;
let currentDemaciaGame = null; // デマーシアゲーム用
let currentPlayer = null;
let currentRoomId = null;
let gameTimer = null;
let selectedVoteSituation = null; // デマーシア投票用

// ページ読み込み時
document.addEventListener('DOMContentLoaded', () => {
  // 多言語初期化
  initLanguage();
  
  // URL パラメータからルームIDを取得
  const urlParams = new URLSearchParams(window.location.search);
  const roomIdFromUrl = urlParams.get('room');
  
  if (roomIdFromUrl) {
    document.getElementById('join-room-id').value = roomIdFromUrl;
    showScreen('join-screen');
  } else {
    showScreen('mode-select-screen');
  }
  
  // イベントリスナー設定
  setupEventListeners();
  
  // Firebase接続状態表示
  updateConnectionStatus();
});

// ゲームモード選択関数
function selectGameMode(mode) {
  console.log('🎮 Game mode selected:', mode);
  selectedGameMode = mode;
  
  // デマーシアモードの場合、TFTボタンを非表示に＆説明文を空に
  const tftBtn = document.getElementById('select-tft-btn');
  const lolDesc = document.getElementById('lol-desc');
  const valorantDesc = document.getElementById('valorant-desc');
  const tftDesc = document.getElementById('tft-desc');
  
  if (mode === 'demacia') {
    tftBtn.style.display = 'none';
    // デマーシアモードでは説明文を空にする
    lolDesc.textContent = '';
    valorantDesc.textContent = '';
  } else {
    tftBtn.style.display = 'flex';
    // ワードウルフモードでは説明文を表示
    lolDesc.textContent = t('gameSelect.lolDesc');
    valorantDesc.textContent = t('gameSelect.valorantDesc');
    tftDesc.textContent = t('gameSelect.tftDesc');
  }
  
  showScreen('game-select-screen');
}

// ゲーム選択関数
function selectGame(gameType) {
  console.log('🎮 Game selected:', gameType);
  selectedGameType = gameType;
  
  // カテゴリー/ジャンルセクションの表示切り替え
  const wordwolfCategories = document.getElementById('wordwolf-categories');
  const demaciaGenres = document.getElementById('demacia-genres');
  const timerSection = document.querySelector('#timer').closest('.form-group');
  const playerCountSection = document.getElementById('player-count-section');
  
  if (selectedGameMode === 'wordwolf') {
    // ワードウルフモード：カテゴリー表示、検討時間表示、プレイ人数表示
    wordwolfCategories.style.display = 'block';
    demaciaGenres.style.display = 'none';
    timerSection.style.display = 'block';
    playerCountSection.style.display = 'block';
    
    // ゲームタイプ別カテゴリー表示
    const lolCategories = document.querySelectorAll('.lol-category');
    const valorantCategories = document.querySelectorAll('.valorant-category');
    const tftCategories = document.querySelectorAll('.tft-category');
    
    if (gameType === 'lol') {
      lolCategories.forEach(el => el.style.display = 'flex');
      valorantCategories.forEach(el => el.style.display = 'none');
      tftCategories.forEach(el => el.style.display = 'none');
    } else if (gameType === 'valorant') {
      lolCategories.forEach(el => el.style.display = 'none');
      valorantCategories.forEach(el => el.style.display = 'flex');
      tftCategories.forEach(el => el.style.display = 'none');
    } else if (gameType === 'tft') {
      lolCategories.forEach(el => el.style.display = 'none');
      valorantCategories.forEach(el => el.style.display = 'none');
      tftCategories.forEach(el => el.style.display = 'flex');
    }
  } else {
    // デマーシアモード：ジャンル表示、検討時間・プレイ人数非表示
    wordwolfCategories.style.display = 'none';
    demaciaGenres.style.display = 'block';
    timerSection.style.display = 'none';
    playerCountSection.style.display = 'none';
    
    // デマーシアモード：ゲームタイプ別ジャンル表示
    const lolGenres = document.querySelectorAll('.lol-genre');
    const valorantGenres = document.querySelectorAll('.valorant-genre');
    
    if (gameType === 'lol') {
      lolGenres.forEach(el => el.style.display = 'flex');
      valorantGenres.forEach(el => el.style.display = 'none');
    } else if (gameType === 'valorant') {
      lolGenres.forEach(el => el.style.display = 'none');
      valorantGenres.forEach(el => el.style.display = 'flex');
    }
  }
  
  // ホーム画面のタイトルを更新
  const titleKey = selectedGameMode === 'wordwolf' ? 
    `home.title${gameType.charAt(0).toUpperCase() + gameType.slice(1)}` : 
    `home.demaciaTitle${gameType.charAt(0).toUpperCase() + gameType.slice(1)}`;
  document.getElementById('home-game-mode-title').textContent = t(titleKey);
  
  // bodyにゲームタイプのクラスを追加（テーマカラー切り替え用）
  document.body.classList.remove('game-lol', 'game-valorant', 'game-tft');
  document.body.classList.add(`game-${gameType}`);
  
  console.log('🖥️ Showing home-screen...');
  showScreen('home-screen');
  console.log('✅ selectGame completed');
}

// イベントリスナー設定
function setupEventListeners() {
  // ヘッダータイトルクリックでホームに戻る
  document.getElementById('site-title').addEventListener('click', () => {
    if (currentGame || currentDemaciaGame) {
      if (confirm(t('alert.confirmLeave'))) {
        backToHome();
      }
    } else {
      showScreen('mode-select-screen');
      selectedGameType = null;
      selectedGameMode = null;
      document.body.classList.remove('game-lol', 'game-valorant', 'game-tft');
    }
  });
  
  // モード選択画面
  document.getElementById('select-wordwolf-mode-btn').addEventListener('click', () => selectGameMode('wordwolf'));
  document.getElementById('select-demacia-mode-btn').addEventListener('click', () => selectGameMode('demacia'));
  
  // ゲームタイプ選択画面
  document.getElementById('select-lol-btn').addEventListener('click', () => selectGame('lol'));
  document.getElementById('select-valorant-btn').addEventListener('click', () => selectGame('valorant'));
  document.getElementById('select-tft-btn').addEventListener('click', () => selectGame('tft'));
  document.getElementById('back-to-mode-select-btn').addEventListener('click', () => {
    selectedGameType = null;
    selectedGameMode = null;
    document.body.classList.remove('game-lol', 'game-valorant', 'game-tft');
    showScreen('mode-select-screen');
  });
  
  // ホーム画面 - ゲームタイプ選択に戻る
  document.getElementById('back-to-game-type-btn').addEventListener('click', () => {
    selectedGameType = null;
    document.body.classList.remove('game-lol', 'game-valorant', 'game-tft');
    showScreen('game-select-screen');
  });
  
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
  document.getElementById('end-discussion-btn').addEventListener('click', moveToVoting);
  document.getElementById('send-message-btn').addEventListener('click', sendMessage);
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // 投票画面
  document.getElementById('confirm-vote-btn').addEventListener('click', confirmVote);
  
  // 結果画面
  document.getElementById('play-again-btn').addEventListener('click', resetGame);
  document.getElementById('back-to-home-btn').addEventListener('click', backToHome);
  
  // デマーシアゲーム - 演技者選択
  document.getElementById('random-performer-btn').addEventListener('click', selectRandomPerformer);
  
  // デマーシアゲーム - 演技・投票
  document.getElementById('demacia-start-voting-btn')?.addEventListener('click', showDemaciaVotingScreen);
  document.getElementById('demacia-submit-vote-btn')?.addEventListener('click', confirmDemaciaVote);
  document.getElementById('demacia-next-round-btn')?.addEventListener('click', startNextDemaciaRound);
  document.getElementById('demacia-show-results-btn')?.addEventListener('click', showDemaciaFinalResults);
  document.getElementById('demacia-play-again-btn')?.addEventListener('click', resetGame);
  document.getElementById('demacia-back-to-home-btn')?.addEventListener('click', backToHome);
}

// 画面切り替え
function showScreen(screenId) {
  console.log('🔄 showScreen called with:', screenId);
  const allScreens = document.querySelectorAll('.screen');
  console.log('📺 Total screens found:', allScreens.length);
  
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    console.log('✅ Screen activated:', screenId);
  } else {
    console.error('❌ Screen not found:', screenId);
  }
}

// ルーム作成
async function createRoom() {
  const playerName = document.getElementById('create-player-name').value.trim();
  
  if (!playerName) {
    alert(t('alert.enterPlayerName'));
    return;
  }
  
  if (!selectedGameType) {
    alert(t('alert.selectGame'));
    return;
  }
  
  // ワードウルフの場合のみカテゴリーとプレイ人数を取得
  let playerCount = 10; // デマーシアのデフォルト
  let timer = 5;
  const categories = [];
  
  if (selectedGameMode === 'wordwolf') {
    playerCount = parseInt(document.getElementById('player-count').value);
    timer = parseInt(document.getElementById('timer').value);
    
    document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
      categories.push(checkbox.value);
    });
    
    if (categories.length === 0) {
      alert(t('alert.selectCategory'));
      return;
    }
  }
  
  // ルームID生成
  currentRoomId = generateRoomId();
  currentPlayer = playerName;
  
  // ゲームモードに応じたゲーム作成
  if (selectedGameMode === 'demacia') {
    console.log('🎭 デマーシアゲーム作成開始');
    console.log('- ルームID:', currentRoomId);
    console.log('- プレイヤー名:', playerName);
    console.log('- ゲームタイプ:', selectedGameType);
    console.log('- DemaciaGameクラス:', typeof DemaciaGame);
    console.log('- window.DemaciaGame:', typeof window.DemaciaGame);
    
    // DemaciaGameクラスが存在しない場合のエラーチェック
    if (typeof DemaciaGame === 'undefined') {
      console.error('❌ DemaciaGameクラスが未定義です！');
      alert('エラー: デマーシアゲームのスクリプトが読み込まれていません');
      return;
    }
    
    // デマーシアゲーム作成
    try {
      currentDemaciaGame = new DemaciaGame(currentRoomId);
      console.log('✅ DemaciaGameインスタンス作成成功');
    } catch (error) {
      console.error('❌ DemaciaGameインスタンス作成エラー:', error);
      alert('エラー: ' + error.message);
      return;
    }
    
    const success = await currentDemaciaGame.createRoom(playerName, {
      playerCount: 10,
      roundCount: 5,
      gameType: selectedGameType
    });
    
    console.log('デマーシアゲーム作成結果:', success);
    
    if (success) {
      showWaitingRoom();
      currentDemaciaGame.watch(updateWaitingRoom);
    } else {
      alert(t('alert.createFailed'));
    }
  } else {
    // ワードウルフゲーム作成
    currentGame = new GameState(currentRoomId);
    const success = await currentGame.createRoom(playerName, {
      playerCount,
      timer,
      categories,
      gameType: selectedGameType
    });
    
    if (success) {
      showWaitingRoom();
      currentGame.watch(updateWaitingRoom);
    } else {
      alert(t('alert.createFailed'));
    }
  }
}

// ルーム参加
async function joinRoom() {
  const roomId = document.getElementById('join-room-id').value.trim();
  const playerName = document.getElementById('join-player-name').value.trim();
  
  if (!roomId || !playerName) {
    alert(t('alert.enterRoomIdAndName'));
    return;
  }
  
  console.log('🔍 ルーム参加試行:', roomId, 'プレイヤー:', playerName);
  
  currentRoomId = roomId;
  currentPlayer = playerName;
  
  // まず、どちらのゲームタイプのルームか確認
  try {
    // ワードウルフルームを確認
    const wordwolfRef = firebase.database().ref(`rooms/${roomId}`);
    const wordwolfSnapshot = await wordwolfRef.once('value');
    
    // デマーシアルームを確認
    const demaciaRef = firebase.database().ref(`demacia_rooms/${roomId}`);
    const demaciaSnapshot = await demaciaRef.once('value');
    
    console.log('ワードウルフルーム存在:', wordwolfSnapshot.exists());
    console.log('デマーシアルーム存在:', demaciaSnapshot.exists());
    
    if (wordwolfSnapshot.exists()) {
      // ワードウルフルーム
      console.log('✅ ワードウルフルームに参加');
      currentGame = new GameState(roomId);
      await currentGame.joinRoom(playerName);
      showWaitingRoom();
      currentGame.watch(updateWaitingRoom);
    } else if (demaciaSnapshot.exists()) {
      // デマーシアルーム
      console.log('✅ デマーシアルームに参加');
      currentDemaciaGame = new DemaciaGame(roomId);
      const success = await currentDemaciaGame.joinRoom(playerName);
      if (success) {
        showWaitingRoom();
        currentDemaciaGame.watch(updateWaitingRoom);
      } else {
        throw new Error('ルームへの参加に失敗しました');
      }
    } else {
      // どちらも存在しない
      console.error('❌ ルームが見つかりません:', roomId);
      throw new Error('ルームが存在しません。ルームIDを確認してください。');
    }
  } catch (error) {
    console.error('❌ ルーム参加エラー:', error);
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
      ${player.name === roomData.host ? `<span class="host-badge">${t('waiting.host')}</span>` : ''}
    `;
    playersList.appendChild(playerDiv);
  });
  
  // ホストのみゲーム開始ボタンを表示
  const isHost = currentPlayer === roomData.host;
  document.getElementById('start-game-btn').style.display = isHost ? 'block' : 'none';
  
  // ゲーム状態による画面遷移
  // ワードウルフの場合
  if (roomData.gameState === 'playing') {
    showGameScreen(roomData);
  } else if (roomData.gameState === 'voting') {
    showVotingScreen(roomData);
  } else if (roomData.gameState === 'finished') {
    showResultScreen(roomData);
  }
  // デマーシアの場合
  else if (roomData.gameState === 'performer_selection') {
    showDemaciaPerformerSelection();
  } else if (roomData.gameState === 'performing') {
    showDemaciaPerformScreen();
  } else if (roomData.gameState === 'voting') {
    showDemaciaVotingScreen();
  } else if (roomData.gameState === 'results') {
    showDemaciaRoundResult();
  }
}

// ゲーム開始
async function startGame() {
  // デマーシアゲームの場合
  if (selectedGameMode === 'demacia') {
    const success = await currentDemaciaGame.startGame();
    if (success) {
      // 演技者選択画面に遷移
      showDemaciaPerformerSelection();
    } else {
      alert(t('alert.createFailed'));
    }
  } else {
    // ワードウルフゲームの場合
    const success = await currentGame.startGame();
    if (!success) {
      alert(t('alert.createFailed'));
    }
  }
}

// ゲーム画面表示
function showGameScreen(roomData) {
  const player = roomData.players[currentPlayer];
  
  // お題表示
  document.getElementById('your-topic').textContent = player.topic;
  
  // お題画像表示
  const topicImage = document.getElementById('topic-image');
  if (player.topicImage) {
    topicImage.src = player.topicImage;
    topicImage.alt = player.topic;
    topicImage.style.display = 'block';
  } else {
    topicImage.style.display = 'none';
  }
  
  // チャット更新（リアルタイム）
  updateChat(roomData.chat || {});
  
  // タイマー開始（初回のみ）
  if (!gameTimer && roomData.timerDuration) {
    gameTimer = new GameTimer(roomData.timerDuration, (status, remaining) => {
      if (status === 'tick') {
        const timer = new GameTimer(remaining, () => {});
        document.getElementById('timer-display').textContent = timer.getFormattedTime();
      } else if (status === 'finished') {
        document.getElementById('timer-display').textContent = '00:00';
        alert(t('alert.discussionEnd'));
      }
    });
    gameTimer.start();
  }
  
  showScreen('game-screen');
}

// チャット更新
function updateChat(messages) {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';
  
  // messagesがオブジェクトの場合は配列に変換
  const messageArray = messages ? Object.values(messages) : [];
  
  messageArray.forEach(msg => {
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

// 投票フェーズへ移行
async function moveToVoting() {
  await currentGame.roomRef.update({
    gameState: 'voting'
  });
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
    alert(t('alert.selectVote'));
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
    alert(t('alert.votingComplete'));
  }
}

// 結果画面表示
function showResultScreen(roomData) {
  const result = roomData.result;
  
  document.getElementById('result-title').textContent = 
    result.citizensWin ? t('result.citizensWin') : t('result.wolfWin');
  document.getElementById('result-title').className = 
    result.citizensWin ? 'result-citizens-win' : 'result-wolf-win';
  
  document.getElementById('wolf-reveal').textContent = 
    t('result.wolfWas', { wolf: result.wolf });
  
  document.getElementById('voted-out').textContent = 
    t('result.votedOut', { player: result.votedOut });
  
  // お題表示
  document.getElementById('wolf-topic').textContent = 
    `${t('result.wolfWord')}: ${result.wolfTopic || '-'}`;
  document.getElementById('citizen-topic').textContent = 
    `${t('result.citizenWord')}: ${result.citizenTopic || '-'}`;
  
  // 投票結果
  const voteResults = document.getElementById('vote-results');
  voteResults.innerHTML = '';
  Object.entries(result.voteCount).forEach(([name, count]) => {
    const resultDiv = document.createElement('div');
    resultDiv.textContent = `${name}: ${count} ${t('result.votes')}`;
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
  // ワードウルフゲームの終了処理
  if (currentGame) {
    await currentGame.leaveRoom(currentPlayer);
    currentGame.unwatch();
  }
  
  // デマーシアゲームの終了処理
  if (currentDemaciaGame) {
    await currentDemaciaGame.leaveRoom(currentPlayer);
    currentDemaciaGame.unwatch();
  }
  
  currentGame = null;
  currentDemaciaGame = null;
  currentPlayer = null;
  currentRoomId = null;
  selectedGameType = null;
  selectedGameMode = null;
  
  if (gameTimer) {
    gameTimer.stop();
    gameTimer = null;
  }
  
  // モード選択画面に戻る
  document.body.classList.remove('game-lol', 'game-valorant', 'game-tft');
  showScreen('mode-select-screen');
  
  // URLパラメータをクリア
  window.history.replaceState({}, document.title, window.location.pathname);
}

// ルーム退出
async function leaveRoom() {
  if (confirm(t('alert.confirmLeave'))) {
    await backToHome();
  }
}

// ルームURL コピー
function copyRoomUrl() {
  const url = document.getElementById('room-url-display').textContent;
  navigator.clipboard.writeText(url).then(() => {
    alert(t('alert.urlCopied'));
  }).catch(() => {
    alert(t('alert.urlCopyFailed'));
  });
}

// ルール表示
function showRules() {
  alert(`
【ワードウルフのルール】

1. プレイヤーは「市民」と「ウルフ」に分かれます
2. 市民には多数派のお題が、ウルフには少数派のお題が与えられます
3. 全員でお題について話し合います（ただし具体的な単語は言わない）
4. 検討時間終了後、誰がウルフか投票します
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
      statusEl.textContent = '✅ ' + t('header.connection.connected');
      statusEl.className = 'status-connected';
    } else {
      statusEl.textContent = '❌ ' + t('header.connection.disconnected');
      statusEl.className = 'status-disconnected';
    }
  });
}

// ========================================
// デマーシアゲーム関連UI制御
// ========================================

// 演技者選択画面表示
function showDemaciaPerformerSelection() {
  const roomData = currentDemaciaGame.roomData;
  
  // セリフ表示
  document.getElementById('demacia-phrase-preview').textContent = roomData.currentPhrase.phrase;
  document.getElementById('demacia-character-preview').textContent = roomData.currentPhrase.character;
  
  // プレイヤーリスト作成
  const listContainer = document.getElementById('manual-performer-list');
  listContainer.innerHTML = '';
  
  Object.keys(roomData.players).forEach(playerName => {
    const btn = document.createElement('button');
    btn.className = 'performer-select-btn';
    btn.textContent = playerName;
    btn.onclick = () => selectManualPerformer(playerName);
    listContainer.appendChild(btn);
  });
  
  showScreen('demacia-performer-selection-screen');
}

// ランダムに演技者を選択
async function selectRandomPerformer() {
  const roomData = currentDemaciaGame.roomData;
  const playerNames = Object.keys(roomData.players);
  const randomPlayer = playerNames[Math.floor(Math.random() * playerNames.length)];
  
  await currentDemaciaGame.selectPerformer(randomPlayer);
  showDemaciaPerformScreen();
}

// 手動で演技者を選択
async function selectManualPerformer(playerName) {
  await currentDemaciaGame.selectPerformer(playerName);
  showDemaciaPerformScreen();
}

// 演技画面表示
function showDemaciaPerformScreen() {
  const roomData = currentDemaciaGame.roomData;
  const isPerformer = roomData.currentPerformer === currentPlayer;
  
  // 共通のセリフ・キャラ表示
  document.getElementById('demacia-phrase').textContent = roomData.currentPhrase.phrase;
  document.getElementById('demacia-character').textContent = roomData.currentPhrase.character;
  
  if (isPerformer) {
    // 演技者側の表示
    document.getElementById('demacia-situation').textContent = 
      roomData.currentPhrase.situations[roomData.correctSituation];
    document.getElementById('demacia-difficulty').textContent = 
      `難易度: ${roomData.currentPhrase.difficulty}`;
    
    // 演技者情報を表示
    document.getElementById('current-performer-name').textContent = currentPlayer;
    document.querySelector('.situation-display').style.display = 'block';
  } else {
    // 投票者側は正解シチュエーションを隠す
    document.querySelector('.situation-display').style.display = 'none';
    document.getElementById('current-performer-name').textContent = roomData.currentPerformer;
  }
  
  showScreen('demacia-perform-screen');
  
  // 演技時間タイマー（90秒）
  startPerformTimer(90);
}

// 演技タイマー開始
function startPerformTimer(seconds) {
  let remaining = seconds;
  const timerEl = document.getElementById('demacia-timer');
  
  const interval = setInterval(() => {
    const minutes = Math.floor(remaining / 60);
    const secs = remaining % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    remaining--;
    
    if (remaining < 0) {
      clearInterval(interval);
      // 自動的に投票画面へ
      showDemaciaVotingScreen();
    }
  }, 1000);
}

// 投票画面表示
function showDemaciaVotingScreen() {
  const roomData = currentDemaciaGame.roomData;
  const isPerformer = roomData.currentPerformer === currentPlayer;
  
  if (isPerformer) {
    // 演技者は投票しない
    document.getElementById('demacia-voting-message').textContent = t('demacia.performerWait');
    document.getElementById('demacia-situation-options').style.display = 'none';
  } else {
    // 投票者の表示
    document.getElementById('demacia-voting-phrase').textContent = roomData.currentPhrase.phrase;
    
    const optionsContainer = document.getElementById('demacia-situation-options');
    optionsContainer.innerHTML = '';
    
    roomData.currentPhrase.situations.forEach((situation, index) => {
      const btn = document.createElement('button');
      btn.className = 'situation-option-btn';
      btn.textContent = `${index + 1}. ${situation}`;
      btn.onclick = () => {
        document.querySelectorAll('.situation-option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedVoteSituation = index;
      };
      optionsContainer.appendChild(btn);
    });
    
    document.getElementById('demacia-situation-options').style.display = 'block';
  }
  
  showScreen('demacia-voting-screen');
}

// デマーシア投票確定
async function confirmDemaciaVote() {
  if (selectedVoteSituation === null || selectedVoteSituation === undefined) {
    alert(t('alert.selectSituation'));
    return;
  }
  
  await currentDemaciaGame.submitVote(currentPlayer, selectedVoteSituation);
  selectedVoteSituation = null;
  
  // 全員の投票が完了したらラウンド結果表示
  checkDemaciaVotingComplete();
}

// 投票完了チェック
function checkDemaciaVotingComplete() {
  const roomData = currentDemaciaGame.roomData;
  const playerCount = Object.keys(roomData.players).length;
  const voteCount = Object.keys(roomData.currentVotes || {}).length;
  
  // 演技者を除いた人数が投票したか
  if (voteCount >= playerCount - 1) {
    showDemaciaRoundResult();
  }
}

// ラウンド結果表示
function showDemaciaRoundResult() {
  const roomData = currentDemaciaGame.roomData;
  const result = currentDemaciaGame.calculateRoundResult();
  
  document.getElementById('demacia-round-result-phrase').textContent = roomData.currentPhrase.phrase;
  document.getElementById('demacia-correct-situation').textContent = 
    roomData.currentPhrase.situations[roomData.correctSituation];
  document.getElementById('demacia-correct-count').textContent = 
    t('demacia.correctCount').replace('{count}', result.correctCount);
  document.getElementById('demacia-performer-score').textContent = 
    t('demacia.performerScore')
      .replace('{performer}', roomData.currentPerformer)
      .replace('{score}', result.score);
  
  // 次のラウンドまたは最終結果ボタン
  if (roomData.currentRound < roomData.totalRounds) {
    document.getElementById('demacia-next-round-btn').style.display = 'block';
    document.getElementById('demacia-show-results-btn').style.display = 'none';
  } else {
    document.getElementById('demacia-next-round-btn').style.display = 'none';
    document.getElementById('demacia-show-results-btn').style.display = 'block';
  }
  
  showScreen('demacia-round-result-screen');
}

// 次のラウンド開始
async function startNextDemaciaRound() {
  await currentDemaciaGame.nextRound();
  showDemaciaPerformerSelection();
}

// 最終結果表示
function showDemaciaFinalResults() {
  const roomData = currentDemaciaGame.roomData;
  const rankings = currentDemaciaGame.calculateFinalRankings();
  
  const rankingsContainer = document.getElementById('demacia-final-rankings');
  rankingsContainer.innerHTML = '';
  
  rankings.forEach((player, index) => {
    const div = document.createElement('div');
    div.className = 'ranking-item';
    div.innerHTML = `
      <span class="rank">${index + 1}位</span>
      <span class="player-name">${player.name}</span>
      <span class="score">${player.score}点</span>
    `;
    rankingsContainer.appendChild(div);
  });
  
  showScreen('demacia-final-result-screen');
}
