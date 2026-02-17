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
    // URL経由でアクセスされた場合、まずモード選択画面へ
    console.log('🔗 URL経由でアクセス。ルームID:', roomIdFromUrl);
    document.getElementById('join-room-id').value = roomIdFromUrl;
    // モード選択画面を表示
    showScreen('mode-select-screen');
    // 注意メッセージを表示（オプション）
    setTimeout(() => {
      alert('招待されたルームに参加するには、まずゲームモードとゲームタイプを選択してください。');
    }, 500);
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
  
  // モードごとにbodyクラスを変更（テーマカラー切り替え）
  document.body.classList.remove('mode-wordwolf', 'mode-demacia', 'mode-void');
  document.body.classList.add(`mode-${mode}`);
  
  // ヴォイドモードの場合は直接ゲーム選択画面へ
  if (mode === 'void') {
    showScreen('game-select-screen');
    // TFTボタンを非表示
    const tftBtn = document.getElementById('select-tft-btn');
    if (tftBtn) tftBtn.style.display = 'none';
    return;
  }
  
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
  console.log('🎮 Current mode:', selectedGameMode);
  selectedGameType = gameType;
  console.log('✅ selectedGameType set to:', selectedGameType);
  
  // ヴォイドモードの場合
  if (selectedGameMode === 'void') {
    // ヴォイド用カテゴリー表示切り替え
    const voidLolCategories = document.querySelectorAll('.void-lol-category');
    const voidValorantCategories = document.querySelectorAll('.void-valorant-category');
    
    if (gameType === 'lol') {
      voidLolCategories.forEach(el => el.style.display = 'flex');
      voidValorantCategories.forEach(el => el.style.display = 'none');
    } else if (gameType === 'valorant') {
      voidLolCategories.forEach(el => el.style.display = 'none');
      voidValorantCategories.forEach(el => el.style.display = 'flex');
    }
    
    showScreen('void-home-screen');
    return;
  }
  
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
  
  // ホーム画面のソロプレイボタン表示制御
  const soloPlayBtn = document.getElementById('solo-play-btn');
  if (soloPlayBtn) {
    if (selectedGameMode === 'demacia') {
      soloPlayBtn.style.display = 'block';
    } else {
      soloPlayBtn.style.display = 'none';
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
      document.body.classList.remove('game-lol', 'game-valorant', 'game-tft', 'mode-wordwolf', 'mode-demacia', 'mode-void');
    }
  });
  
  // モード選択画面
  document.getElementById('select-wordwolf-mode-btn').addEventListener('click', () => selectGameMode('wordwolf'));
  document.getElementById('select-demacia-mode-btn').addEventListener('click', () => selectGameMode('demacia'));
  document.getElementById('select-void-mode-btn').addEventListener('click', () => selectGameMode('void'));
  
  // ゲームタイプ選択画面
  document.getElementById('select-lol-btn').addEventListener('click', () => selectGame('lol'));
  document.getElementById('select-valorant-btn').addEventListener('click', () => selectGame('valorant'));
  document.getElementById('select-tft-btn').addEventListener('click', () => selectGame('tft'));
  document.getElementById('back-to-mode-select-btn').addEventListener('click', () => {
    selectedGameType = null;
    selectedGameMode = null;
    document.body.classList.remove('game-lol', 'game-valorant', 'game-tft', 'mode-wordwolf', 'mode-demacia', 'mode-void');
    showScreen('mode-select-screen');
  });
  
  // ホーム画面 - ゲームタイプ選択に戻る
  document.getElementById('back-to-game-type-btn').addEventListener('click', () => {
    selectedGameType = null;
    document.body.classList.remove('game-lol', 'game-valorant', 'game-tft');
    // 現在のモードに応じてゲーム選択画面を表示
    if (selectedGameMode === 'void') {
      showScreen('game-select-screen');
      const tftBtn = document.getElementById('select-tft-btn');
      if (tftBtn) tftBtn.style.display = 'none';
    } else if (selectedGameMode === 'demacia') {
      selectGameMode('demacia'); // デマーシアのゲーム選択画面
    } else {
      selectGameMode('wordwolf'); // ワードウルフのゲーム選択画面
    }
  });
  
  // ソロプレイボタン（デマーシア専用）
  document.getElementById('solo-play-btn')?.addEventListener('click', () => {
    console.log('🎭 ソロプレイモード開始');
    startDemaciaSoloPlay();
  });
  
  // ホーム画面
  document.getElementById('create-room-btn').addEventListener('click', () => showScreen('create-screen'));
  document.getElementById('join-room-btn').addEventListener('click', () => {
    updateJoinScreenInfo();
    showScreen('join-screen');
  });
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
  document.getElementById('demacia-start-voting-btn')?.addEventListener('click', startDemaciaVoting);
  document.getElementById('demacia-submit-vote-btn')?.addEventListener('click', confirmDemaciaVote);
  document.getElementById('demacia-next-round-btn')?.addEventListener('click', startNextDemaciaRound);
  document.getElementById('demacia-show-results-btn')?.addEventListener('click', showDemaciaFinalResults);
  document.getElementById('demacia-play-again-btn')?.addEventListener('click', resetGame);
  document.getElementById('demacia-back-to-home-btn')?.addEventListener('click', backToHome);
  
  // デマーシアゲーム - ソロプレイモード
  document.getElementById('demacia-solo-show-situation-btn')?.addEventListener('click', showDemaciaSoloSituation);
  document.getElementById('demacia-solo-start-perform-btn')?.addEventListener('click', startDemaciaSoloPerform);
  document.getElementById('demacia-solo-end-perform-btn')?.addEventListener('click', endDemaciaSoloPerform);
  document.getElementById('demacia-solo-reveal-answer-btn')?.addEventListener('click', revealDemaciaSoloAnswer);
  document.getElementById('demacia-solo-next-btn')?.addEventListener('click', startDemaciaSoloNext);
  document.getElementById('demacia-solo-home-btn')?.addEventListener('click', backToHome);
}

// ルーム参加画面の情報を更新
function updateJoinScreenInfo() {
  const joinGameInfo = document.getElementById('join-game-info');
  if (!joinGameInfo) return;
  
  let gameText = '';
  let modeText = '';
  
  // ゲームタイプ
  if (selectedGameType === 'lol') {
    gameText = 'League of Legends';
  } else if (selectedGameType === 'valorant') {
    gameText = 'VALORANT';
  } else if (selectedGameType === 'tft') {
    gameText = 'Teamfight Tactics';
  } else {
    gameText = '未選択';
  }
  
  // ゲームモード
  if (selectedGameMode === 'wordwolf') {
    modeText = 'ワードウルフ';
  } else if (selectedGameMode === 'demacia') {
    modeText = 'デマーシアに心を込めて';
  } else {
    modeText = '未選択';
  }
  
  joinGameInfo.innerHTML = `
    <div style="font-size: 1.3rem; margin-bottom: 0.3rem;">🎮 ${gameText}</div>
    <div style="font-size: 1rem; opacity: 0.8;">🎭 ${modeText}</div>
  `;
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
  
  // スタート画面に戻るボタンの表示制御
  updateHomeButton(screenId);
}

// スタート画面に戻るボタンの表示制御
function updateHomeButton(screenId) {
  const homeButton = document.getElementById('btn-home-fixed');
  if (!homeButton) return;
  
  // スタート画面（モード選択画面）では非表示
  if (screenId === 'mode-select-screen') {
    homeButton.style.display = 'none';
  } else {
    homeButton.style.display = 'block';
  }
}

// スタート画面に戻る
function goToStart() {
  const confirmMsg = 'スタート画面に戻りますか？\n進行中のゲームがある場合は退出されます。';
  if (!confirm(confirmMsg)) {
    return;
  }
  
  // 現在のゲームから退出
  if (currentGame && currentPlayer && currentRoomId) {
    try {
      currentGame.stopWatching();
      currentGame = null;
    } catch (error) {
      console.error('ゲーム退出エラー:', error);
    }
  }
  
  if (currentDemaciaGame && currentPlayer && currentRoomId) {
    try {
      currentDemaciaGame.stopWatching();
      currentDemaciaGame = null;
    } catch (error) {
      console.error('デマーシアゲーム退出エラー:', error);
    }
  }
  
  if (currentVoidGame && currentVoidPlayer && currentVoidRoomId) {
    try {
      currentVoidGame.stopWatching();
      currentVoidGame = null;
    } catch (error) {
      console.error('ヴォイドゲーム退出エラー:', error);
    }
  }
  
  // 変数をリセット
  selectedGameType = null;
  selectedGameMode = 'wordwolf';
  currentPlayer = null;
  currentRoomId = null;
  currentVoidPlayer = null;
  currentVoidRoomId = null;
  
  // タイマーをクリア
  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }
  
  // body classをリセット
  document.body.className = '';
  
  // モード選択画面に戻る
  showScreen('mode-select-screen');
  
  console.log('🏠 スタート画面に戻りました');
}

// ルーム作成
async function createRoom() {
  // レート制限チェック（5秒に1回まで）
  if (!rateLimiter.check('createRoom', 5000, 3, 60000)) {
    alert(t('alert.tooManyRequests') || 'ルーム作成が早すぎます。5秒後にもう一度お試しください。');
    return;
  }
  
  const playerNameInput = document.getElementById('create-player-name').value.trim();
  
  // 入力検証
  if (!playerNameInput) {
    alert(t('alert.enterPlayerName'));
    return;
  }
  
  // プレイヤー名のサニタイズと検証
  const playerName = sanitizeInput(playerNameInput, 20);
  if (!validatePlayerName(playerName)) {
    alert(t('alert.invalidPlayerName') || 'プレイヤー名は1〜20文字で入力してください');
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
  
  // ルームID生成（重複チェック付き）
  console.log('🔑 ユニークなルームIDを生成中...');
  currentRoomId = await generateRoomId();
  currentPlayer = playerName;
  console.log('✅ ルームID生成完了:', currentRoomId);
  
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
      currentDemaciaGame = new DemaciaGame(currentRoomId, selectedGameType);
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
    console.log('📊 作成したルームの設定:');
    console.log('  - gameType:', selectedGameType);
    console.log('  - playerCount: 10');
    console.log('  - roundCount: 5');
    
    if (success) {
      console.log('🎉 ルーム作成成功！');
      console.log('📍 ルームID:', currentRoomId);
      console.log('📍 ルームパス: demacia_rooms/' + currentRoomId);
      console.log('👤 ホスト:', playerName);
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
      console.log('🎉 ルーム作成成功！');
      console.log('📍 ルームID:', currentRoomId);
      console.log('📍 ルームパス: rooms/' + currentRoomId);
      console.log('👤 ホスト:', playerName);
      showWaitingRoom();
      currentGame.watch(updateWaitingRoom);
    } else {
      alert(t('alert.createFailed'));
    }
  }
}

// ルーム参加
async function joinRoom() {
  // レート制限チェック（3秒に1回まで）
  if (!rateLimiter.check('joinRoom', 3000, 5, 60000)) {
    alert(t('alert.tooManyRequests') || 'ルーム参加の試行が早すぎます。3秒後にもう一度お試しください。');
    return;
  }
  
  const roomIdInput = document.getElementById('join-room-id').value.trim();
  const playerNameInput = document.getElementById('join-player-name').value.trim();
  
  if (!roomIdInput || !playerNameInput) {
    alert(t('alert.enterRoomIdAndName'));
    return;
  }
  
  // ルームIDの検証
  const roomId = sanitizeInput(roomIdInput, 6);
  if (!validateRoomId(roomId)) {
    alert(t('alert.invalidRoomId') || 'ルームIDは6桁の数字で入力してください');
    return;
  }
  
  // プレイヤー名のサニタイズと検証
  const playerName = sanitizeInput(playerNameInput, 20);
  if (!validatePlayerName(playerName)) {
    alert(t('alert.invalidPlayerName') || 'プレイヤー名は1〜20文字で入力してください');
    return;
  }
  
  console.log('🔍 ルーム参加試行:', roomId, 'プレイヤー:', playerName);
  console.log('🎮 選択中のゲームタイプ:', selectedGameType);
  console.log('🎭 選択中のゲームモード:', selectedGameMode);
  
  // ゲームモードが正しく選択されているか厳密にチェック
  if (!selectedGameMode || (selectedGameMode !== 'wordwolf' && selectedGameMode !== 'demacia')) {
    alert('エラー: ゲームモードが正しく選択されていません。\n最初からやり直してください。');
    console.error('❌ 不正なゲームモード:', selectedGameMode);
    backToHome();
    return;
  }
  
  currentRoomId = roomId;
  currentPlayer = playerName;
  
  // まず、どちらのゲームタイプのルームか確認
  try {
    console.log('🔍 Firebase接続状態を確認中...');
    
    // Firebase接続を確認
    const connectedRef = firebase.database().ref('.info/connected');
    const connectedSnap = await connectedRef.once('value');
    console.log('Firebase接続:', connectedSnap.val() ? '✅ 接続済み' : '❌ 切断');
    
    if (!connectedSnap.val()) {
      throw new Error('Firebaseに接続できません。インターネット接続を確認してください。');
    }
    
    // ワードウルフルームを確認
    console.log('🔍 ワードウルフルームを確認:', `rooms/${roomId}`);
    const wordwolfRef = firebase.database().ref(`rooms/${roomId}`);
    const wordwolfSnapshot = await wordwolfRef.once('value');
    const wordwolfData = wordwolfSnapshot.val();
    
    // デマーシアルームを確認
    console.log('🔍 デマーシアルームを確認:', `demacia_rooms/${roomId}`);
    const demaciaRef = firebase.database().ref(`demacia_rooms/${roomId}`);
    const demaciaSnapshot = await demaciaRef.once('value');
    const demaciaData = demaciaSnapshot.val();
    
    console.log('📊 ワードウルフルーム:');
    console.log('  - 存在:', wordwolfSnapshot.exists());
    console.log('  - データ:', wordwolfData);
    if (wordwolfData?.settings) {
      console.log('  - ゲームタイプ:', wordwolfData.settings.gameType);
    }
    
    console.log('📊 デマーシアルーム:');
    console.log('  - 存在:', demaciaSnapshot.exists());
    console.log('  - データ:', demaciaData);
    if (demaciaData?.settings) {
      console.log('  - ゲームタイプ:', demaciaData.settings.gameType);
    }
    
    // ゲームモードが選択されていない場合はエラー
    if (!selectedGameMode) {
      throw new Error('先にゲームモード（ワードウルフ/デマーシア）を選択してください。');
    }
    
    // ゲームタイプが選択されていない場合はエラー
    if (!selectedGameType) {
      throw new Error('先にゲームタイプ（LOL/VALORANT/TFT）を選択してください。');
    }
    
    // 選択中のゲームモードに応じて適切なルームをチェック
    if (selectedGameMode === 'wordwolf') {
      // ワードウルフモード選択中
      if (!wordwolfSnapshot.exists()) {
        // デマーシアルームしか存在しない
        if (demaciaSnapshot.exists()) {
          throw new Error(
            'このルームは「デマーシアに心を込めて」用です。\n' +
            '現在「ワードウルフ」モードを選択しています。\n' +
            'モード選択画面に戻ってデマーシアモードを選択してください。'
          );
        } else {
          throw new Error('ルームが存在しません。ルームIDを確認してください。');
        }
      }
      
      // ワードウルフルームに参加
      const roomGameType = wordwolfData?.settings?.gameType;
      console.log('🔍 ワードウルフ - ルームのゲームタイプ:', roomGameType, '(type:', typeof roomGameType, ')');
      console.log('🔍 ワードウルフ - 選択中のゲームタイプ:', selectedGameType, '(type:', typeof selectedGameType, ')');
      console.log('🔍 ワードウルフ - 完全なルームデータ:', wordwolfData);
      console.log('🔍 ワードウルフ - 比較結果:', roomGameType === selectedGameType);
      
      // ゲームタイプが一致するかチェック
      if (roomGameType && roomGameType !== selectedGameType) {
        const errorMsg =
          `このルームは ${roomGameType.toUpperCase()} 用です。\n` +
          `現在 ${selectedGameType.toUpperCase()} を選択しています。\n` +
          `ゲーム選択画面に戻ってゲームタイプを変更してください。`;
        console.error('❌ ゲームタイプ不一致エラー:', errorMsg);
        console.error('  - roomGameType:', roomGameType, '(length:', roomGameType.length, ')');
        console.error('  - selectedGameType:', selectedGameType, '(length:', selectedGameType.length, ')');
        throw new Error(errorMsg);
      }
      
      console.log('✅ ワードウルフルームに参加');
      currentGame = new GameState(roomId);
      await currentGame.joinRoom(playerName);
      showWaitingRoom();
      currentGame.watch(updateWaitingRoom);
      
    } else if (selectedGameMode === 'demacia') {
      // デマーシアモード選択中
      console.log('🎭 デマーシアモード: demacia_rooms/' + roomId + ' をチェック');
      
      if (!demaciaSnapshot.exists()) {
        // デマーシアルームが存在しない
        console.log('❌ デマーシアルームが存在しません');
        
        // ワードウルフルームしか存在しない
        if (wordwolfSnapshot.exists()) {
          console.log('⚠️ ワードウルフルームが存在します（モード不一致）');
          throw new Error(
            'このルームは「ワードウルフ」用です。\n' +
            '現在「デマーシアに心を込めて」モードを選択しています。\n' +
            'モード選択画面に戻ってワードウルフモードを選択してください。'
          );
        } else {
          console.log('❌ どちらのルームも存在しません');
          throw new Error('ルームが存在しません。ルームIDを確認してください。');
        }
      }
      
      console.log('✅ デマーシアルームが存在します');
      
      // デマーシアルームに参加
      const roomGameType = demaciaData?.settings?.gameType;
      console.log('🔍 デマーシア - ルームのゲームタイプ:', roomGameType, '(type:', typeof roomGameType, ')');
      console.log('🔍 デマーシア - 選択中のゲームタイプ:', selectedGameType, '(type:', typeof selectedGameType, ')');
      console.log('🔍 デマーシア - 完全なルームデータ:', demaciaData);
      console.log('🔍 デマーシア - 比較結果:', roomGameType === selectedGameType);
      
      // ゲームタイプが一致するかチェック
      if (roomGameType && roomGameType !== selectedGameType) {
        const errorMsg = 
          `このルームは ${roomGameType.toUpperCase()} 用です。\n` +
          `現在 ${selectedGameType.toUpperCase()} を選択しています。\n` +
          `ゲーム選択画面に戻ってゲームタイプを変更してください。`;
        console.error('❌ ゲームタイプ不一致エラー:', errorMsg);
        console.error('  - roomGameType:', roomGameType, '(length:', roomGameType.length, ')');
        console.error('  - selectedGameType:', selectedGameType, '(length:', selectedGameType.length, ')');
        throw new Error(errorMsg);
      }
      
      console.log('✅ デマーシアルームに参加処理を開始');
      currentDemaciaGame = new DemaciaGame(roomId, selectedGameType);
      const success = await currentDemaciaGame.joinRoom(playerName);
      if (success) {
        console.log('✅ デマーシアルーム参加成功');
        showWaitingRoom();
        currentDemaciaGame.watch(updateWaitingRoom);
      } else {
        throw new Error('ルームへの参加に失敗しました');
      }
    } else {
      // 選択されたモードが不明
      throw new Error('ゲームモードが正しく選択されていません。最初からやり直してください。');
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
  
  // ゲーム情報を表示
  updateWaitingGameInfo();
  
  showScreen('waiting-screen');
}

// 待機室のゲーム情報を更新
function updateWaitingGameInfo() {
  const waitingGameInfo = document.getElementById('waiting-game-info');
  if (!waitingGameInfo) return;
  
  let gameText = '';
  let modeText = '';
  let modeIcon = '';
  
  // ゲームタイプ
  if (selectedGameType === 'lol') {
    gameText = 'League of Legends';
  } else if (selectedGameType === 'valorant') {
    gameText = 'VALORANT';
  } else if (selectedGameType === 'tft') {
    gameText = 'Teamfight Tactics';
  } else {
    gameText = '不明';
  }
  
  // ゲームモード
  if (selectedGameMode === 'wordwolf') {
    modeText = 'ワードウルフ';
    modeIcon = '🐺';
  } else if (selectedGameMode === 'demacia') {
    modeText = 'デマーシアに心を込めて';
    modeIcon = '💖';
  } else {
    modeText = '不明';
    modeIcon = '❓';
  }
  
  waitingGameInfo.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 0.3rem;">
      <div style="font-size: 1.3rem;">${modeIcon} ${modeText}</div>
      <div style="font-size: 1rem; opacity: 0.8;">🎮 ${gameText}</div>
    </div>
  `;
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
  
  // 人数表示を更新
  const currentCount = players.length;
  const maxCount = roomData.settings?.playerCount || 5;
  
  // ゲームモードを判定
  const isDemaciaMode = (currentDemaciaGame !== null) || 
                        roomData.gameMode === 'demacia' || 
                        roomData.gameState === 'performer_selection' || 
                        roomData.gameState === 'performing' || 
                        roomData.gameState === 'round_result';
  
  // デマーシアモードの場合は人数表示を非表示にする
  const playerCountDisplay = document.getElementById('waiting-player-count-display');
  if (playerCountDisplay) {
    playerCountDisplay.style.display = isDemaciaMode ? 'none' : 'block';
  }
  
  // ワードウルフモードのみ人数表示を更新
  if (!isDemaciaMode) {
    document.getElementById('current-player-count').textContent = currentCount;
    document.getElementById('max-player-count').textContent = maxCount;
  }
  
  // ホストのみゲーム開始ボタンを表示
  const isHost = currentPlayer === roomData.host;
  document.getElementById('start-game-btn').style.display = isHost ? 'block' : 'none';
  
  // ゲーム状態による画面遷移
  if (isDemaciaMode) {
    // デマーシアモードの画面遷移
    if (roomData.gameState === 'performer_selection') {
      showDemaciaPerformerSelection();
    } else if (roomData.gameState === 'performing') {
      showDemaciaPerformScreen();
    } else if (roomData.gameState === 'voting') {
      showDemaciaVotingScreen();
      // デマーシア投票完了チェック
      checkDemaciaVotingComplete();
    } else if (roomData.gameState === 'round_result') {
      showDemaciaRoundResult();
    } else if (roomData.gameState === 'finished') {
      showDemaciaFinalResults();
    }
  } else {
    // ワードウルフモードの画面遷移
    if (roomData.gameState === 'playing') {
      showGameScreen(roomData);
    } else if (roomData.gameState === 'voting') {
      showVotingScreen(roomData);
      // 投票完了チェック
      checkWordWolfVotingComplete(roomData);
    } else if (roomData.gameState === 'finished') {
      showResultScreen(roomData);
    }
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
  // レート制限チェック（1秒に1回まで、連続5回で60秒ブロック）
  if (!rateLimiter.check('sendMessage', 1000, 5, 60000)) {
    // 無言で無視（スパム防止）
    return;
  }
  
  const input = document.getElementById('chat-input');
  const messageInput = input.value.trim();
  
  // メッセージの検証
  if (!messageInput) {
    return;
  }
  
  // メッセージのサニタイズと検証
  const message = sanitizeInput(messageInput, 500);
  if (!validateChatMessage(message)) {
    alert(t('alert.invalidMessage') || 'メッセージは1〜500文字で入力してください');
    return;
  }
  
  await currentGame.sendMessage(currentPlayer, message);
  input.value = '';
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
  
  // 投票状況を更新
  const players = Object.values(roomData.players || {});
  const totalPlayers = players.length;
  const votedPlayers = players.filter(p => p.vote !== null && p.vote !== undefined).length;
  
  document.getElementById('wordwolf-vote-count').textContent = votedPlayers;
  document.getElementById('wordwolf-total-players').textContent = totalPlayers;
  
  // 自分が既に投票済みの場合、ボタンを無効化
  const currentPlayerData = players.find(p => p.name === currentPlayer);
  const hasVoted = currentPlayerData && currentPlayerData.vote !== null && currentPlayerData.vote !== undefined;
  
  const voteBtn = document.getElementById('confirm-vote-btn');
  if (voteBtn) {
    if (hasVoted) {
      voteBtn.disabled = true;
      voteBtn.textContent = '投票完了';
    } else {
      voteBtn.disabled = false;
      voteBtn.textContent = '投票確定';
    }
  }
  
  Object.values(roomData.players).forEach(player => {
    if (player.name !== currentPlayer) {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'vote-option';
      optionDiv.innerHTML = `
        <input type="radio" name="vote" value="${player.name}" id="vote-${player.name}" ${hasVoted ? 'disabled' : ''}>
        <label for="vote-${player.name}">${player.name}</label>
      `;
      voteOptions.appendChild(optionDiv);
    }
  });
  
  showScreen('voting-screen');
}

// 投票確定
async function confirmVote() {
  // レート制限チェック（2秒に1回まで）
  if (!rateLimiter.check('confirmVote', 2000)) {
    alert(t('alert.votingTooFast') || '投票が早すぎます。2秒後にもう一度お試しください。');
    return;
  }
  
  const selectedVote = document.querySelector('input[name="vote"]:checked');
  
  if (!selectedVote) {
    alert(t('alert.selectVote'));
    return;
  }
  
  const voteBtn = document.getElementById('confirm-vote-btn');
  if (voteBtn) {
    voteBtn.disabled = true;
    voteBtn.textContent = '投票完了';
  }
  
  console.log(`📤 投票送信中: ${currentPlayer} → ${selectedVote.value}`);
  
  // Firebaseに投票を送信
  await currentGame.vote(currentPlayer, selectedVote.value);
  
  console.log(`✅ 投票完了: ${currentPlayer}`);
  
  // 投票完了メッセージを表示
  alert('投票が完了しました。他のプレイヤーの投票を待っています...');
  
  // 全員の投票完了チェックはwatcherで自動的に行われる
}

// ワードウルフの投票完了チェック
async function checkWordWolfVotingComplete(roomData) {
  if (!roomData || !roomData.players) return;
  
  const players = Object.values(roomData.players);
  const totalPlayers = players.length;
  const votedPlayers = players.filter(p => p.vote !== null && p.vote !== undefined).length;
  
  console.log(`🗳️ 投票状況: ${votedPlayers}/${totalPlayers}`);
  
  // 全員が投票完了したら結果集計
  if (votedPlayers === totalPlayers && totalPlayers > 0) {
    console.log('🎉 全員の投票が完了！結果を集計します');
    await currentGame.endVoting();
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
  
  // 各プレイヤーの投票先を表示
  const players = Object.values(roomData.players || {});
  const voteDetailsDiv = document.createElement('div');
  voteDetailsDiv.style.marginBottom = '1rem';
  voteDetailsDiv.style.padding = '0.5rem';
  voteDetailsDiv.style.background = 'rgba(255,255,255,0.05)';
  voteDetailsDiv.style.borderRadius = '8px';
  
  players.forEach(player => {
    const voteDetail = document.createElement('div');
    voteDetail.style.padding = '0.3rem 0';
    voteDetail.style.color = player.name === result.wolf ? 'var(--wolf-color)' : 'var(--citizen-color)';
    voteDetail.textContent = `${player.name} → ${player.vote || '投票なし'}`;
    voteDetailsDiv.appendChild(voteDetail);
  });
  voteResults.appendChild(voteDetailsDiv);
  
  // 投票数の集計結果を表示
  const voteSummaryDiv = document.createElement('div');
  voteSummaryDiv.innerHTML = '<strong>投票数:</strong>';
  voteSummaryDiv.style.marginTop = '1rem';
  
  Object.entries(result.voteCount).forEach(([name, count]) => {
    const resultDiv = document.createElement('div');
    resultDiv.style.padding = '0.3rem 0';
    resultDiv.textContent = `${name}: ${count} ${t('result.votes')}`;
    voteSummaryDiv.appendChild(resultDiv);
  });
  voteResults.appendChild(voteSummaryDiv);
  
  // タイマー停止
  if (gameTimer) {
    gameTimer.stop();
    gameTimer = null;
  }
  
  showScreen('result-screen');
}

// もう一度プレイ
async function resetGame() {
  // ワードウルフゲームの場合
  if (currentGame) {
    try {
      await currentGame.resetRoom();
      showWaitingRoom();
    } catch (error) {
      console.error('❌ ワードウルフゲームリセットエラー:', error);
      alert('ゲームのリセットに失敗しました: ' + error.message);
    }
  }
  
  // デマーシアゲームの場合
  if (currentDemaciaGame) {
    try {
      await currentDemaciaGame.resetRoom();
      showWaitingRoom();
    } catch (error) {
      console.error('❌ デマーシアゲームリセットエラー:', error);
      alert('ゲームのリセットに失敗しました: ' + error.message);
    }
  }
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
  const mode = selectedGameMode || 'wordwolf';
  const gameType = selectedGameType || 'lol';
  
  let rules = '';
  
  if (mode === 'demacia') {
    // デマーシアのルール
    const gameName = gameType === 'lol' ? 'League of Legends' : 'VALORANT';
    const examples = gameType === 'lol' 
      ? '「デマーシアァァァァ！」「僕が悪いんだ」「ハサキ！」など'
      : '「Sage、復活！」「オーディン買え！」「タップ撃ちだ！」など';
    
    rules = `【デマーシアに心を込めて - ルール】

1. 有名なセリフが1つ選ばれます
   例：${examples}

2. ランダムで1人が「演技者」になります

3. 演技者だけに「シチュエーション」が示されます
   例：ペンタキルを決めた時、味方が全滅した時など

4. 演技者がそのシチュエーションで演技します

5. 他のプレイヤーは6つの選択肢から、どのシチュエーションだったか投票します

6. 正解者が多いほど良い演技です！

【ポイント】
- 難易度: Easy / Medium / Hard
- 3〜10人でプレイ可能
- 演技力と推理力が試されます
- ${gameName}の知識があるとより楽しめます！`;
  } else {
    // ワードウルフのルール
    const gameName = gameType === 'lol' ? 'League of Legends' : 
                     gameType === 'valorant' ? 'VALORANT' : 'Teamfight Tactics';
    
    let categoryList = '';
    if (gameType === 'tft') {
      categoryList = `- ユニット（チャンピオン）
- 特性（トレイト）
- アイテム
- ゲーム用語
- 戦略・構成`;
    } else if (gameType === 'valorant') {
      categoryList = `- エージェント
- 武器
- アビリティ
- マップ
- 用語`;
    } else {
      categoryList = `- チャンピオン
- アイテム
- スキル
- マップ・レーン
- スペル`;
    }
    
    rules = `【ワードウルフのルール】

1. プレイヤーは「市民」と「ウルフ」に分かれます
2. 市民には多数派のお題が、ウルフには少数派のお題が与えられます
3. 全員でお題について話し合います（ただし具体的な単語は言わない）
4. 検討時間終了後、誰がウルフか投票します
5. ウルフを当てられれば市民の勝ち、外れればウルフの勝ちです

【${gameName}テーマ】
このゲームは${gameName}をテーマにしたお題が登場します！
${categoryList}

${gameName}の知識を活かして楽しんでください！`;
  }
  
  // モーダルで表示（スマホ対応）
  showRulesModal(mode === 'demacia' ? 'デマーシアに心を込めて - ルール' : 'ワードウルフのルール', rules);
}

// ルール説明用モーダル表示
function showRulesModal(title, content) {
  // 既存のモーダルがあれば削除
  const existingModal = document.getElementById('rules-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // モーダル作成
  const modal = document.createElement('div');
  modal.id = 'rules-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    overflow-y: auto;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: var(--card-bg);
    border-radius: 12px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    padding: 2rem;
    position: relative;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    margin: auto;
  `;
  
  modalContent.innerHTML = `
    <h2 style="color: var(--primary-color); margin-bottom: 1.5rem; font-size: 1.5rem;">${title}</h2>
    <div style="color: var(--text-color); line-height: 1.8; white-space: pre-wrap; font-size: 0.95rem;">
      ${content}
    </div>
    <button id="close-rules-btn" class="btn-primary" style="width: 100%; margin-top: 1.5rem; padding: 0.75rem;">
      閉じる
    </button>
  `;
  
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // 閉じるボタン
  document.getElementById('close-rules-btn').addEventListener('click', () => {
    modal.remove();
  });
  
  // 背景クリックで閉じる
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
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
  document.getElementById('demacia-phrase-preview').textContent = roomData.currentPhrase.text;
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
  
  console.log('🎭 演技画面表示:', {
    isPerformer,
    currentPlayer,
    performer: roomData.currentPerformer,
    correctSituation: roomData.correctSituation,
    performerSituation: roomData.performerSituation,
    phraseText: roomData.currentPhrase?.text,
    situationsCount: roomData.currentPhrase?.situations?.length
  });
  
  // 共通のセリフ・キャラ表示
  document.getElementById('demacia-phrase').textContent = roomData.currentPhrase.text;
  document.getElementById('demacia-character').textContent = roomData.currentPhrase.character;
  
  if (isPerformer) {
    // 演技者側の表示
    let performerSituation;
    
    // correctSituation インデックスから取得
    if (typeof roomData.correctSituation === 'number') {
      performerSituation = roomData.currentPhrase.situations[roomData.correctSituation];
    }
    // フォールバック: performerSituation オブジェクトから取得
    else if (roomData.performerSituation) {
      performerSituation = roomData.performerSituation;
    }
    // エラーハンドリング
    else {
      console.error('❌ シチュエーション情報が見つかりません', roomData);
      performerSituation = { text: 'エラー: シチュエーション情報なし', difficulty: 'unknown' };
    }
    
    console.log('🔍 デバッグ - performerSituation:', performerSituation);
    console.log('🔍 デバッグ - typeof performerSituation:', typeof performerSituation);
    
    // performerSituationからテキストと難易度を確実に取得
    let situationText, situationDifficulty;
    if (typeof performerSituation === 'string') {
      situationText = performerSituation;
      situationDifficulty = 'unknown';
    } else if (performerSituation && typeof performerSituation === 'object') {
      situationText = performerSituation.text || JSON.stringify(performerSituation);
      situationDifficulty = performerSituation.difficulty || 'unknown';
    } else {
      situationText = 'エラー: シチュエーションが見つかりません';
      situationDifficulty = 'unknown';
    }
    
    document.getElementById('demacia-situation').textContent = situationText;
    document.getElementById('demacia-difficulty').textContent = 
      `難易度: ${situationDifficulty}`;
    
    // 演技者情報を表示
    document.getElementById('current-performer-name').textContent = currentPlayer;
    document.querySelector('.situation-display').style.display = 'block';
    
    console.log('🎭 演技者表示:', {
      performer: currentPlayer,
      situation: situationText,
      difficulty: situationDifficulty
    });
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

// 投票フェーズ開始（演技終了ボタン押下時）
async function startDemaciaVoting() {
  console.log('🗳️ 投票フェーズを開始します');
  
  const isPerformer = currentDemaciaGame.roomData.currentPerformer === currentPlayer;
  
  if (!isPerformer) {
    alert('演技者のみが投票を開始できます');
    return;
  }
  
  // Firebaseに投票状態を保存
  await currentDemaciaGame.startVoting();
  
  // 投票画面に遷移（watcherが自動で反映）
  console.log('✅ 投票フェーズ開始完了');
}

// 投票画面表示
function showDemaciaVotingScreen() {
  console.log('🎭 デマーシア投票画面を表示します');
  
  const roomData = currentDemaciaGame.roomData;
  const isPerformer = roomData.currentPerformer === currentPlayer;
  
  console.log('🎭 演技者判定:', {
    currentPerformer: roomData.currentPerformer,
    currentPlayer: currentPlayer,
    isPerformer: isPerformer
  });
  
  // 投票状況を更新
  const players = Object.values(roomData.players || {});
  const totalPlayers = players.length;
  const performerCount = 1; // 演技者は投票しない
  const expectedVoters = totalPlayers - performerCount;
  const voteCount = Object.keys(roomData.currentVotes || {}).length;
  
  const voteCountEl = document.getElementById('demacia-vote-count');
  const totalVotersEl = document.getElementById('demacia-total-voters');
  
  if (voteCountEl) voteCountEl.textContent = voteCount;
  if (totalVotersEl) totalVotersEl.textContent = expectedVoters;
  
  // 投票ボタンをリセット
  const voteBtn = document.getElementById('demacia-submit-vote-btn');
  
  // 自分が既に投票済みか確認
  const hasVoted = roomData.currentVotes && roomData.currentVotes[currentPlayer];
  
  if (voteBtn) {
    if (hasVoted) {
      voteBtn.disabled = true;
      voteBtn.textContent = '投票完了';
    } else if (isPerformer) {
      voteBtn.disabled = true;
      voteBtn.style.display = 'none';
    } else {
      voteBtn.disabled = false;
      voteBtn.textContent = '投票する';
      voteBtn.style.display = 'block';
    }
  }
  
  if (isPerformer) {
    console.log('🎭 演技者用の画面を表示します');
    // 演技者は投票しない
    // セリフを表示
    document.getElementById('demacia-voting-phrase').textContent = roomData.currentPhrase.text;
    
    const optionsContainer = document.getElementById('demacia-situation-options');
    if (optionsContainer) {
      optionsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; background: linear-gradient(135deg, rgba(200,155,60,0.1) 0%, rgba(200,155,60,0.05) 100%); border-radius: 12px; margin: 2rem 0;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">👀</div>
          <h3 style="color: #c89b3c; margin-bottom: 1rem; font-size: 1.2rem;">投票をお待ちください</h3>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
            あなたは演技者です。<br>
            他のプレイヤーが投票を完了するまでお待ちください。
          </p>
          <div style="margin-top: 1.5rem; font-size: 0.9rem; color: #c89b3c;">
            投票状況: <span id="performer-vote-count">${voteCount}</span> / <span id="performer-total-voters">${expectedVoters}</span> 人が投票完了
          </div>
        </div>
      `;
    }
  } else {
    console.log('🗳️ 投票者用の画面を表示します');
    // 投票者の表示
    document.getElementById('demacia-voting-phrase').textContent = roomData.currentPhrase.text;
    
    const optionsContainer = document.getElementById('demacia-situation-options');
    
    if (hasVoted) {
      // 既に投票済みの場合
      optionsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #c89b3c;">✅ 投票完了！<br>他のプレイヤーの投票を待っています...</p>';
    } else {
      // まだ投票していない場合
      optionsContainer.innerHTML = '';
      
      roomData.currentPhrase.situations.forEach((situation, index) => {
        const btn = document.createElement('button');
        btn.className = 'situation-option-btn';
        
        // situationからテキストを確実に取得
        let situationText;
        if (typeof situation === 'string') {
          situationText = situation;
        } else if (situation && typeof situation === 'object') {
          situationText = situation.text || JSON.stringify(situation);
        } else {
          situationText = 'シチュエーション情報なし';
        }
        
        btn.textContent = `${index + 1}. ${situationText}`;
        btn.onclick = () => {
          document.querySelectorAll('.situation-option-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedVoteSituation = index;
        };
        optionsContainer.appendChild(btn);
      });
    }
    
    document.getElementById('demacia-situation-options').style.display = 'block';
  }
  
  showScreen('demacia-voting-screen');
}

// デマーシア投票確定
async function confirmDemaciaVote() {
  // レート制限チェック（2秒に1回まで）
  if (!rateLimiter.check('confirmDemaciaVote', 2000)) {
    alert(t('alert.votingTooFast') || '投票が早すぎます。2秒後にもう一度お試しください。');
    return;
  }
  
  if (selectedVoteSituation === null || selectedVoteSituation === undefined) {
    alert('シチュエーションを選択してください');
    return;
  }
  
  console.log('📤 投票送信中:', currentPlayer, '→', selectedVoteSituation);
  
  // 投票ボタンを無効化
  const voteBtn = document.getElementById('demacia-vote-btn');
  if (voteBtn) {
    voteBtn.disabled = true;
    voteBtn.textContent = '投票済み...';
  }
  
  try {
    await currentDemaciaGame.submitVote(currentPlayer, selectedVoteSituation);
    console.log('✅ 投票送信完了');
    
    // 投票後の表示
    const optionsContainer = document.getElementById('demacia-situation-options');
    if (optionsContainer) {
      optionsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #c89b3c;">✅ 投票完了！<br>他のプレイヤーの投票を待っています...</p>';
    }
    
    selectedVoteSituation = null;
  } catch (error) {
    console.error('❌ 投票エラー:', error);
    alert('投票に失敗しました');
    
    // エラー時はボタンを再有効化
    if (voteBtn) {
      voteBtn.disabled = false;
      voteBtn.textContent = '投票';
    }
  }
}

// デマーシア投票完了チェック
async function checkDemaciaVotingComplete() {
  if (!currentDemaciaGame || !currentDemaciaGame.roomData) {
    return;
  }
  
  const roomData = currentDemaciaGame.roomData;
  const playerCount = Object.keys(roomData.players || {}).length;
  const voteCount = Object.keys(roomData.currentVotes || {}).length;
  const expectedVotes = playerCount - 1; // 演技者を除く
  
  console.log(`🗳️ デマーシア投票状況: ${voteCount}/${expectedVotes}`);
  
  // 全員が投票完了したら結果画面へ遷移
  if (voteCount >= expectedVotes && expectedVotes > 0) {
    console.log('🎉 デマーシア全員の投票が完了！');
    // calculateResults は demacia-game.js 内で自動実行される
  }
}

// ラウンド結果表示
function showDemaciaRoundResult() {
  const roomData = currentDemaciaGame.roomData;
  const roundResults = roomData.roundResults;
  
  if (!roundResults) {
    console.error('❌ roundResults が存在しません');
    return;
  }
  
  console.log('📊 結果表示:', roundResults);
  
  // セリフと正解シチュエーション
  document.getElementById('demacia-round-result-phrase').textContent = roomData.currentPhrase.text;
  const correctSituation = roomData.currentPhrase.situations[roundResults.correctSituationIndex];
  document.getElementById('demacia-correct-situation').textContent = 
    `正解: ${correctSituation.text} (難易度: ${roundResults.difficulty})`;
  
  // 正解者数
  document.getElementById('demacia-correct-count').textContent = 
    `✅ 正解者: ${roundResults.correctVotes} / ${roundResults.totalVoters}人`;
  
  // 投票者の結果を表示
  const voterResultsContainer = document.getElementById('demacia-voter-results');
  if (voterResultsContainer && roundResults.voterResults) {
    voterResultsContainer.innerHTML = '<h3 style="margin: 1rem 0;">🗳️ 投票結果</h3>';
    
    roundResults.voterResults.forEach(voter => {
      const resultDiv = document.createElement('div');
      resultDiv.className = 'voter-result-item';
      resultDiv.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
        margin: 0.5rem 0;
        background: ${voter.isCorrect ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
        border-left: 4px solid ${voter.isCorrect ? '#4caf50' : '#f44336'};
        border-radius: 4px;
      `;
      
      const nameSpan = document.createElement('span');
      nameSpan.style.fontWeight = '600';
      nameSpan.textContent = voter.name;
      
      const choiceSpan = document.createElement('span');
      choiceSpan.style.cssText = 'font-size: 0.9rem; color: rgba(255,255,255,0.8);';
      choiceSpan.textContent = `${voter.guessedText}`;
      
      const statusSpan = document.createElement('span');
      statusSpan.style.cssText = `
        font-weight: 600;
        color: ${voter.isCorrect ? '#4caf50' : '#f44336'};
      `;
      statusSpan.textContent = voter.isCorrect ? '✅ 正解' : '❌ 不正解';
      
      resultDiv.appendChild(nameSpan);
      resultDiv.appendChild(choiceSpan);
      resultDiv.appendChild(statusSpan);
      
      voterResultsContainer.appendChild(resultDiv);
    });
  }
  
  // 次のラウンドまたは最終結果ボタン
  if (roomData.currentRound < (roomData.settings?.roundCount || 5)) {
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
