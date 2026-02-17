
// ========================================
// ヴォイドに届くは光か闇か - 追加コード
// ========================================

// グローバル変数
let currentVoidGame = null;
let currentVoidRoomId = null;
let currentVoidPlayer = null;

// ========================================
// VoidGameクラス取得ヘルパー
// ========================================
function getVoidGameClass() {
  // window.VoidGameを優先、フォールバックでグローバルVoidGameを確認
  if (typeof window.VoidGame !== 'undefined') {
    return window.VoidGame;
  }
  if (typeof VoidGame !== 'undefined') {
    return VoidGame;
  }
  return null;
}

// ========================================
// ヴォイドゲーム - イベントリスナー初期化
// ========================================
function initVoidGameListeners() {
  // ホーム画面
  document.getElementById('void-create-room-btn')?.addEventListener('click', showVoidCreateScreen);
  document.getElementById('void-join-room-btn')?.addEventListener('click', showVoidJoinScreen);
  document.getElementById('void-rules-btn')?.addEventListener('click', showVoidRules);
  document.getElementById('void-back-to-game-type-btn')?.addEventListener('click', () => {
    selectedGameType = null;
    document.body.classList.remove('game-lol', 'game-valorant', 'game-tft');
    // ヴォイドモードのゲーム選択画面に戻る
    if (selectedGameMode === 'void') {
      showScreen('game-select-screen');
      const tftBtn = document.getElementById('select-tft-btn');
      if (tftBtn) tftBtn.style.display = 'none';
    }
  });

  // ルーム作成画面
  document.getElementById('void-create-btn')?.addEventListener('click', createVoidRoom);
  document.getElementById('void-cancel-create-btn')?.addEventListener('click', () => showScreen('void-home-screen'));

  // ルーム参加画面
  document.getElementById('void-join-btn')?.addEventListener('click', joinVoidRoom);
  document.getElementById('void-cancel-join-btn')?.addEventListener('click', () => showScreen('void-home-screen'));

  // 待機画面
  document.getElementById('void-start-game-btn')?.addEventListener('click', startVoidGame);
  document.getElementById('void-leave-room-btn')?.addEventListener('click', leaveVoidRoom);
  
  // 順番選択画面
  document.getElementById('void-confirm-order-btn')?.addEventListener('click', confirmVoidOrder);

  // プレイ画面
  document.getElementById('void-submit-first-words-btn')?.addEventListener('click', submitVoidFirstWords);
  document.getElementById('void-submit-middle-words-btn')?.addEventListener('click', submitVoidMiddleWords);
  document.getElementById('void-submit-answer-btn')?.addEventListener('click', submitVoidFinalAnswer);

  // 結果画面
  document.getElementById('void-play-again-btn')?.addEventListener('click', () => showScreen('void-home-screen'));
  document.getElementById('void-back-to-home-btn')?.addEventListener('click', () => {
    showScreen('home-screen');
    selectedGameMode = null;
  });
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  initVoidGameListeners();
});

// ========================================
// バリデーション関数
// ========================================

// テーマ単語との一致チェック（大文字小文字、全角半角を無視）
function isMatchingTheme(word, themeName) {
  if (!word || !themeName) return false;
  
  // 正規化関数
  const normalize = (str) => {
    return str
      .toLowerCase() // 小文字化
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)) // 全角英数字を半角に
      .replace(/[\s　]/g, '') // スペースを除去
      .trim();
  };
  
  const normalizedWord = normalize(word);
  const normalizedTheme = normalize(themeName);
  
  // 完全一致チェック
  return normalizedWord === normalizedTheme;
}

// テーマ名を取得
function getCurrentThemeName() {
  if (!currentVoidGame || !currentVoidGame.roomData) return null;
  return currentVoidGame.roomData.theme?.name;
}

// テーマジャンルを取得（多言語対応）
function getThemeCategoryName(category) {
  const categoryMap = {
    'champion': 'void.category.champions',
    'item': 'void.category.items',
    'place': 'void.category.places',
    'concept': 'void.category.concepts',
    'agent': 'void.category.agents',
    'weapon': 'void.category.weapons',
    'map': 'void.category.maps'
  };
  
  return t(categoryMap[category] || 'void.category.concepts');
}

// ========================================
// 画面遷移関数
// ========================================
function showVoidCreateScreen() {
  showScreen('void-create-screen');
}

function showVoidJoinScreen() {
  showScreen('void-join-screen');
}

function showVoidRules() {
  const rules = `【ヴォイドに届くは光か闇か - ルール】

1. 最初のプレイヤーにテーマが表示されます

2. そのプレイヤーは、テーマから連想される言葉を3つ入力します

3. 次のプレイヤーは、前の3つの言葉を見て：
   - 伝わりにくい言葉を0〜3個修正できます
   - 新しい3つの言葉を入力します

4. これを繰り返します

5. 最後のプレイヤーは、3つの言葉から元のテーマを推測して回答します

6. 正解なら成功！

【ポイント】
- 参加人数: 2〜8人
- 修正は任意（しなくてもOK）
- ${selectedGameType === 'lol' ? 'League of Legends' : 'VALORANT'}のテーマが登場
- 連想ゲームとしての面白さを楽しもう！`;

  showRulesModal('ヴォイドに届くは光か闇か', rules);
}

// ========================================
// ルーム作成
// ========================================
async function createVoidRoom() {
  console.log('🚀 createVoidRoom 呼び出し');
  
  const VoidGameClass = getVoidGameClass();
  console.log('🔍 VoidGameClass:', VoidGameClass ? 'found' : 'not found');
  
  if (!VoidGameClass) {
    alert('エラー: VoidGameクラスが読み込まれていません。\nブラウザを完全リロード（Ctrl+Shift+R）してください。');
    console.error('❌ VoidGameが未定義です。void-game.jsが読み込まれていない可能性があります。');
    console.error('- typeof VoidGame:', typeof VoidGame);
    console.error('- typeof window.VoidGame:', typeof window.VoidGame);
    return;
  }
  
  if (!rateLimiter.check('createVoidRoom', 5000)) {
    alert('ルーム作成が早すぎます。5秒後にもう一度お試しください。');
    return;
  }

  const playerNameInput = document.getElementById('void-create-player-name').value.trim();
  const maxPlayersElement = document.getElementById('void-max-players');
  const themeModeElement = document.querySelector('input[name="void-theme-mode"]:checked');
  
  console.log('📋 入力値チェック:');
  console.log('- プレイヤー名入力:', playerNameInput);
  console.log('- 最大人数要素:', maxPlayersElement ? 'あり' : 'なし');
  console.log('- テーマモード要素:', themeModeElement ? 'あり' : 'なし');
  
  if (!maxPlayersElement) {
    alert('エラー: 人数選択要素が見つかりません');
    return;
  }
  
  if (!themeModeElement) {
    alert('エラー: テーマモード選択要素が見つかりません');
    return;
  }
  
  const maxPlayers = parseInt(maxPlayersElement.value);
  const themeMode = themeModeElement.value;

  // 入力検証
  const playerName = sanitizeInput(playerNameInput, 20);
  if (!validatePlayerName(playerName)) {
    alert('プレイヤー名は1〜20文字で入力してください');
    return;
  }

  // カテゴリー選択の取得（ランダムモード時）
  let selectedCategories = [];
  if (themeMode === 'random') {
    const categoryCheckboxes = document.querySelectorAll('input[name="void-category"]:checked');
    selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
    
    if (selectedCategories.length === 0) {
      alert('カテゴリーを1つ以上選択してください');
      return;
    }
  }

  try {
    console.log('🎮 ヴォイドルーム作成開始...');
    console.log('- プレイヤー名:', playerName);
    console.log('- 最大人数:', maxPlayers);
    console.log('- テーマモード:', themeMode);
    console.log('- ゲームタイプ:', selectedGameType);
    console.log('- 選択カテゴリー:', selectedCategories);
    
    // ルームID生成
    console.log('📝 ルームID生成中...');
    currentVoidRoomId = await generateRoomId();
    console.log('✅ ルームID生成完了:', currentVoidRoomId);
    
    currentVoidPlayer = playerName;

    // ゲーム作成
    console.log('🎲 VoidGameインスタンス作成中...');
    const VoidGameClass = getVoidGameClass();
    
    if (!VoidGameClass) {
      throw new Error('VoidGameクラスが見つかりません。ページをリロードしてください。');
    }
    
    console.log('🔍 使用するクラス:', VoidGameClass.name || 'VoidGame');
    currentVoidGame = new VoidGameClass(currentVoidRoomId, selectedGameType);
    console.log('✅ VoidGameインスタンス作成完了');

    // テーマ選択
    console.log('🎯 テーマ選択中...');
    let theme = null;
    if (themeMode === 'random') {
      theme = getRandomVoidThemeByCategories(selectedGameType, selectedCategories);
      console.log('✅ ランダムテーマ選択完了:', theme);
    }
    // 選択モードは未実装（将来的に実装予定）
    
    console.log('💾 Firebaseにルーム作成中...');
    await currentVoidGame.createRoom(playerName, maxPlayers, theme);
    console.log('✅ Firebase書き込み完了');

    console.log('✅ ヴォイドルーム作成成功:', currentVoidRoomId);

    // 待機画面へ
    console.log('📱 待機画面表示中...');
    showVoidWaitingScreen();
    
    // ルームデータ監視開始
    console.log('👀 ルームデータ監視開始...');
    currentVoidGame.watchRoom(onVoidRoomUpdate);
    console.log('✅ すべての処理完了');

  } catch (error) {
    console.error('❌ ヴォイドルーム作成エラー:', error);
    console.error('エラースタック:', error.stack);
    alert('ルーム作成に失敗しました: ' + error.message);
  }
}

// ========================================
// ルーム参加
// ========================================
async function joinVoidRoom() {
  if (!rateLimiter.check('joinVoidRoom', 3000)) {
    alert('ルーム参加の試行が早すぎます。3秒後にもう一度お試しください。');
    return;
  }

  const roomIdInput = document.getElementById('void-join-room-id').value.trim();
  const playerNameInput = document.getElementById('void-join-player-name').value.trim();

  // 入力検証
  const roomId = sanitizeInput(roomIdInput, 6);
  if (!validateRoomId(roomId)) {
    alert('ルームIDは6桁の数字で入力してください');
    return;
  }

  const playerName = sanitizeInput(playerNameInput, 20);
  if (!validatePlayerName(playerName)) {
    alert('プレイヤー名は1〜20文字で入力してください');
    return;
  }

  try {
    currentVoidRoomId = roomId;
    currentVoidPlayer = playerName;

    // ゲーム参加
    const VoidGameClass = getVoidGameClass();
    
    if (!VoidGameClass) {
      throw new Error('VoidGameクラスが見つかりません。ページをリロードしてください。');
    }
    
    currentVoidGame = new VoidGameClass(currentVoidRoomId, selectedGameType);
    await currentVoidGame.joinRoom(playerName);

    console.log('✅ ヴォイドルーム参加成功:', currentVoidRoomId);

    // 待機画面へ
    showVoidWaitingScreen();
    
    // ルームデータ監視開始
    currentVoidGame.watchRoom(onVoidRoomUpdate);

  } catch (error) {
    console.error('❌ ヴォイドルーム参加エラー:', error);
    alert('ルーム参加に失敗しました: ' + error.message);
  }
}

// ========================================
// 待機画面表示
// ========================================
function showVoidWaitingScreen() {
  showScreen('void-waiting-screen');
  
  // ルームID表示
  document.getElementById('void-room-id-display').textContent = currentVoidRoomId;
  
  // ゲーム情報表示
  const gameInfo = document.getElementById('void-waiting-game-info');
  if (gameInfo) {
    const gameTypeName = selectedGameType === 'lol' ? 'League of Legends' : 'VALORANT';
    gameInfo.textContent = `ヴォイドに届くは光か闇か (${gameTypeName})`;
  }
  
  // ルームURL表示
  const roomUrl = `${window.location.origin}${window.location.pathname}?room=${currentVoidRoomId}&mode=void&game=${selectedGameType}`;
  const roomUrlDisplay = document.getElementById('void-room-url-display');
  if (roomUrlDisplay) {
    roomUrlDisplay.textContent = roomUrl;
  }
  
  // URLコピーボタン
  const copyBtn = document.getElementById('void-copy-room-url-btn');
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(roomUrl).then(() => {
        alert('URLをコピーしました！');
      }).catch(() => {
        alert('URLのコピーに失敗しました');
      });
    };
  }
}

// ========================================
// ルームデータ更新時の処理
// ========================================
function onVoidRoomUpdate(roomData) {
  if (!roomData) return;

  const gameState = roomData.gameState;

  if (gameState === 'waiting') {
    // 待機画面を更新
    updateVoidPlayerList(roomData);
    
    // ホストのみゲーム開始ボタンを表示
    const isHost = roomData.players[currentVoidPlayer]?.isHost;
    const currentPlayers = Object.keys(roomData.players).length;
    const canStart = currentPlayers >= 2;
    
    const startBtn = document.getElementById('void-start-game-btn');
    if (startBtn) {
      startBtn.style.display = (isHost && canStart) ? 'block' : 'none';
    }
    
  } else if (gameState === 'selecting_order') {
    // 順番選択画面を表示
    showVoidOrderSelectScreen(roomData);
    
  } else if (gameState === 'playing') {
    // プレイ画面を表示
    showVoidPlayScreen(roomData);
    
  } else if (gameState === 'finished') {
    // 結果画面を表示
    showVoidResultScreen(roomData);
  }
}

// ========================================
// プレイヤーリスト更新
// ========================================
function updateVoidPlayerList(roomData) {
  console.log('📋 プレイヤーリスト更新開始');
  console.log('- roomData.playerOrder:', roomData.playerOrder);
  console.log('- roomData.players:', Object.keys(roomData.players || {}));
  
  const playerList = document.getElementById('void-player-list');
  if (!playerList) return;

  playerList.innerHTML = '';

  const playerOrder = roomData.playerOrder || [];
  playerOrder.forEach((playerName, index) => {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-item';
    
    const isHost = roomData.players[playerName]?.isHost;
    const hostBadge = isHost ? ' 👑' : '';
    
    playerDiv.innerHTML = `
      <span class="player-number">${index + 1}</span>
      <span class="player-name">${playerName}${hostBadge}</span>
      <span class="player-ready">✓ 準備完了</span>
    `;
    
    playerList.appendChild(playerDiv);
  });

  // 人数表示を更新
  document.getElementById('void-current-players').textContent = playerOrder.length;
  document.getElementById('void-max-players-display').textContent = roomData.maxPlayers;
}

// ========================================
// ゲーム開始
// ========================================
async function startVoidGame() {
  try {
    await currentVoidGame.startGame();
    console.log('✅ ヴォイドゲーム開始（順番選択フェーズ）');
  } catch (error) {
    console.error('❌ ゲーム開始エラー:', error);
    alert('ゲーム開始に失敗しました');
  }
}

// ========================================
// 順番選択画面表示
// ========================================
function showVoidOrderSelectScreen(roomData) {
  showScreen('void-order-select-screen');
  
  // テーマジャンル表示
  const categoryDisplay = document.getElementById('void-theme-category-display');
  if (categoryDisplay && roomData.theme) {
    categoryDisplay.textContent = getThemeCategoryName(roomData.theme.category);
  }
  
  // 選択状況リスト更新
  updateVoidOrderStatusList(roomData);
  
  // 順番選択ドロップダウン更新
  updateVoidOrderSelectOptions(roomData);
}

// 選択状況リストの更新
function updateVoidOrderStatusList(roomData) {
  const statusList = document.getElementById('void-order-status-list');
  if (!statusList) return;
  
  statusList.innerHTML = '';
  
  const playerOrder = roomData.playerOrder || [];
  const selections = roomData.orderSelections || {};
  
  playerOrder.forEach((playerName) => {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-item';
    
    const selectedOrder = selections[playerName];
    const statusText = selectedOrder ? `${selectedOrder}${t('void.orderSelect.orderSuffix')}` : t('void.orderSelect.selecting');
    const statusColor = selectedOrder ? 'var(--void-glow)' : '#94a3b8';
    
    playerDiv.innerHTML = `
      <span class="player-name">${playerName}</span>
      <span style="color: ${statusColor}; font-weight: 600;">${statusText}</span>
    `;
    
    statusList.appendChild(playerDiv);
  });
}

// 順番選択ドロップダウンの更新
function updateVoidOrderSelectOptions(roomData) {
  const selectElement = document.getElementById('void-select-order');
  if (!selectElement) return;
  
  const playerOrder = roomData.playerOrder || [];
  const selections = roomData.orderSelections || {};
  const selectedOrders = Object.values(selections);
  const mySelection = selections[currentVoidPlayer];
  
  // ドロップダウンをクリア
  selectElement.innerHTML = `<option value="">${t('void.orderSelect.selectPlaceholder')}</option>`;
  
  // 既に自分が選択済みの場合
  if (mySelection) {
    selectElement.innerHTML = `<option value="${mySelection}" selected>${mySelection}${t('void.orderSelect.orderSuffix')}（${t('void.orderSelect.selected')}）</option>`;
    selectElement.disabled = true;
    document.getElementById('void-confirm-order-btn').disabled = true;
    document.getElementById('void-confirm-order-btn').textContent = t('void.orderSelect.selected');
    return;
  }
  
  // 利用可能な順番をドロップダウンに追加
  for (let i = 1; i <= playerOrder.length; i++) {
    if (!selectedOrders.includes(i)) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${i}${t('void.orderSelect.orderSuffix')}`;
      selectElement.appendChild(option);
    }
  }
}

// 順番確定
async function confirmVoidOrder() {
  const selectElement = document.getElementById('void-select-order');
  const selectedOrder = parseInt(selectElement.value);
  
  if (!selectedOrder) {
    alert(t('void.alert.selectOrder'));
    return;
  }
  
  try {
    await currentVoidGame.selectOrder(currentVoidPlayer, selectedOrder);
    console.log('✅ 順番選択成功:', selectedOrder);
  } catch (error) {
    console.error('❌ 順番選択エラー:', error);
    alert('順番選択に失敗しました: ' + error.message);
  }
}

// ========================================
// プレイ画面表示
// ========================================
function showVoidPlayScreen(roomData) {
  const playOrder = roomData.playOrder || [];
  const myOrder = playOrder.indexOf(currentVoidPlayer);
  const currentTurn = roomData.currentTurn;
  const totalPlayers = playOrder.length;
  
  // 回答済みかチェック
  const hasSubmitted = roomData.players[currentVoidPlayer]?.hasSubmitted;
  
  // 自分の番かチェック
  if (myOrder !== currentTurn) {
    // 他のプレイヤーの番 → 待機画面表示
    showVoidWaitingTurnScreen(roomData);
    return;
  }
  
  // 既に回答済みの場合は入力を無効化
  if (hasSubmitted) {
    alert(t('void.alert.alreadySubmitted'));
    showVoidWaitingTurnScreen(roomData);
    return;
  }

  if (myOrder === 0) {
    // 最初のプレイヤー
    showVoidFirstPlayerScreen(roomData);
  } else if (myOrder === totalPlayers - 1) {
    // 最後のプレイヤー
    showVoidLastPlayerScreen(roomData);
  } else {
    // 中間のプレイヤー
    showVoidMiddlePlayerScreen(roomData);
  }
}

// ========================================
// 待機中画面表示（他のプレイヤーのターン）
// ========================================
function showVoidWaitingTurnScreen(roomData) {
  showScreen('void-waiting-turn-screen');
  
  const playOrder = roomData.playOrder || [];
  const currentTurn = roomData.currentTurn;
  const currentPlayer = playOrder[currentTurn] || 'プレイヤー';
  
  // テーマジャンル表示
  const categoryDisplay = document.getElementById('void-waiting-theme-category');
  if (categoryDisplay && roomData.theme) {
    categoryDisplay.textContent = getThemeCategoryName(roomData.theme.category);
  }
  
  // 現在のターン表示
  document.getElementById('void-waiting-current-turn').textContent = currentTurn + 1;
  document.getElementById('void-waiting-total-turns').textContent = playOrder.length;
  document.getElementById('void-waiting-current-player').textContent = currentPlayer;
}

// ========================================
// 最初のプレイヤー画面
// ========================================
function showVoidFirstPlayerScreen(roomData) {
  showScreen('void-play-first-screen');
  
  const playOrder = roomData.playOrder || [];
  const totalPlayers = playOrder.length;
  document.getElementById('void-total-players-first').textContent = totalPlayers;
  document.getElementById('void-theme-name-display').textContent = roomData.theme.name;
  
  // テーマジャンル表示
  const categoryDisplay = document.getElementById('void-first-theme-category');
  if (categoryDisplay && roomData.theme) {
    categoryDisplay.textContent = getThemeCategoryName(roomData.theme.category);
  }
  
  // 入力欄をクリア
  document.getElementById('void-first-word-1').value = '';
  document.getElementById('void-first-word-2').value = '';
  document.getElementById('void-first-word-3').value = '';
}

// ========================================
// 中間プレイヤー画面
// ========================================
function showVoidMiddlePlayerScreen(roomData) {
  showScreen('void-play-middle-screen');
  
  const playOrder = roomData.playOrder || [];
  const myOrder = playOrder.indexOf(currentVoidPlayer);
  const totalPlayers = playOrder.length;
  const previousTurn = roomData.turns[myOrder - 1];

  document.getElementById('void-current-turn-middle').textContent = myOrder + 1;
  document.getElementById('void-total-players-middle').textContent = totalPlayers;
  
  // テーマジャンル表示
  const categoryDisplay = document.getElementById('void-middle-theme-category');
  if (categoryDisplay && roomData.theme) {
    categoryDisplay.textContent = getThemeCategoryName(roomData.theme.category);
  }

  // 前のワードを表示（修正されたものを視覚的に示す）
  const previousWordList = document.getElementById('void-previous-word-list');
  previousWordList.innerHTML = '';
  
  if (previousTurn && previousTurn.words) {
    previousTurn.words.forEach((word, index) => {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'void-word-item';
      
      // このワードが修正されたものかチェック
      const wasModified = previousTurn.modified && previousTurn.modified.includes(index);
      
      if (wasModified) {
        // 修正された言葉には特別なスタイルとアイコンを追加
        wordDiv.innerHTML = `<span class="void-word-icon">${getWordIcon(index)}</span> <span style="color: #fbbf24; font-weight: 600;">${word}</span> <span style="font-size: 0.8rem; color: #fbbf24;">${t('void.word.modified')}</span>`;
      } else {
        wordDiv.innerHTML = `<span class="void-word-icon">${getWordIcon(index)}</span> ${word}`;
      }
      
      previousWordList.appendChild(wordDiv);
    });

    // 修正オプションを生成
    const modifyOptions = document.getElementById('void-modify-options');
    modifyOptions.innerHTML = '';
    
    previousTurn.words.forEach((word, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'void-modify-option';
      
      // このワードが前のプレイヤーによって修正されたものかチェック
      const wasModified = previousTurn.modified && previousTurn.modified.includes(index);
      const modifiedLabel = wasModified ? ' <span style="font-size: 0.8rem; color: #fbbf24;">✏️</span>' : '';
      
      optionDiv.innerHTML = `
        <input type="checkbox" class="void-modify-checkbox" id="void-modify-${index}" data-index="${index}">
        <span class="void-modify-original">${word}${modifiedLabel}</span>
        <span class="void-modify-arrow">→</span>
        <input type="text" class="void-modify-input void-word-input" id="void-modify-input-${index}" placeholder="修正後の言葉" maxlength="30" disabled>
      `;
      
      modifyOptions.appendChild(optionDiv);
      
      // チェックボックスのイベント
      const checkbox = optionDiv.querySelector('.void-modify-checkbox');
      const input = optionDiv.querySelector('.void-modify-input');
      
      checkbox.addEventListener('change', () => {
        input.disabled = !checkbox.checked;
        if (checkbox.checked) {
          input.focus();
        } else {
          input.value = '';
        }
      });
    });
  }
}

// ========================================
// 最後のプレイヤー画面
// ========================================
function showVoidLastPlayerScreen(roomData) {
  showScreen('void-play-last-screen');
  
  const playOrder = roomData.playOrder || [];
  const totalPlayers = playOrder.length;
  document.getElementById('void-total-players-last').textContent = totalPlayers;
  document.getElementById('void-total-players-last-2').textContent = totalPlayers;
  
  // テーマジャンル表示
  const categoryDisplay = document.getElementById('void-last-theme-category');
  if (categoryDisplay && roomData.theme) {
    categoryDisplay.textContent = getThemeCategoryName(roomData.theme.category);
  }

  // 前のワードを表示（修正されたものを視覚的に示す）
  const previousTurn = roomData.turns[totalPlayers - 2];
  const previousWordList = document.getElementById('void-last-previous-word-list');
  previousWordList.innerHTML = '';
  
  if (previousTurn && previousTurn.words) {
    previousTurn.words.forEach((word, index) => {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'void-word-item';
      
      // このワードが修正されたものかチェック
      const wasModified = previousTurn.modified && previousTurn.modified.includes(index);
      
      if (wasModified) {
        // 修正された言葉には特別なスタイルとアイコンを追加
        wordDiv.innerHTML = `<span class="void-word-icon">${getWordIcon(index)}</span> <span style="color: #fbbf24; font-weight: 600;">${word}</span> <span style="font-size: 0.8rem; color: #fbbf24;">${t('void.word.modified')}</span>`;
      } else {
        wordDiv.innerHTML = `<span class="void-word-icon">${getWordIcon(index)}</span> ${word}`;
      }
      
      previousWordList.appendChild(wordDiv);
    });
  }
  
  // 入力欄をクリア
  document.getElementById('void-final-answer').value = '';
}

// ワードアイコン取得
function getWordIcon(index) {
  const icons = ['💎', '⭐', '✨'];
  return icons[index] || '💫';
}

// ========================================
// 最初のワード送信
// ========================================
async function submitVoidFirstWords() {
  const word1 = document.getElementById('void-first-word-1').value.trim();
  const word2 = document.getElementById('void-first-word-2').value.trim();
  const word3 = document.getElementById('void-first-word-3').value.trim();

  const words = [word1, word2, word3].map(w => sanitizeInput(w, 30));

  if (words.some(w => !w || w.length === 0)) {
    alert(t('void.alert.enterAllWords'));
    return;
  }

  // テーマ名との一致チェック
  const themeName = getCurrentThemeName();
  if (themeName) {
    const matchingWords = words.filter(w => isMatchingTheme(w, themeName));
    if (matchingWords.length > 0) {
      alert(t('void.alert.themeWordNotAllowed', { theme: themeName }));
      return;
    }
  }

  try {
    await currentVoidGame.submitFirstWords(currentVoidPlayer, words);
    console.log('✅ 最初のワード送信成功');
    // 送信後は待機画面を表示
    // onVoidRoomUpdateが自動的に呼ばれて画面が更新される
  } catch (error) {
    console.error('❌ ワード送信エラー:', error);
    alert('送信に失敗しました: ' + error.message);
  }
}

// ========================================
// 中間ワード送信
// ========================================
async function submitVoidMiddleWords() {
  // 前のワードを取得
  const playOrder = currentVoidGame.roomData.playOrder;
  const myOrder = playOrder.indexOf(currentVoidPlayer);
  const previousTurn = currentVoidGame.roomData.turns[myOrder - 1];
  
  if (!previousTurn || !previousTurn.words) {
    alert('前のワードが見つかりません');
    return;
  }
  
  // 修正されたワードを収集
  const modifiedWords = [];
  const newWords = [...previousTurn.words]; // 元のワードをコピー
  
  for (let i = 0; i < 3; i++) {
    const checkbox = document.getElementById(`void-modify-${i}`);
    const input = document.getElementById(`void-modify-input-${i}`);
    
    if (checkbox && checkbox.checked) {
      const modifiedWord = sanitizeInput(input.value.trim(), 30);
      
      if (!modifiedWord || modifiedWord.length === 0) {
        alert(`修正後の言葉を入力してください（${i + 1}つ目）`);
        return;
      }
      
      // テーマ名との一致チェック
      const themeName = getCurrentThemeName();
      if (themeName && isMatchingTheme(modifiedWord, themeName)) {
        alert(t('void.alert.themeWordNotAllowed', { theme: themeName }));
        return;
      }
      
      modifiedWords.push(i);
      newWords[i] = modifiedWord;
    }
  }

  try {
    await currentVoidGame.submitWords(currentVoidPlayer, myOrder, newWords, modifiedWords);
    console.log('✅ 中間ワード送信成功');
    // 送信後は待機画面を表示
    // onVoidRoomUpdateが自動的に呼ばれて画面が更新される
  } catch (error) {
    console.error('❌ ワード送信エラー:', error);
    alert('送信に失敗しました: ' + error.message);
  }
}

// ========================================
// 最終回答送信
// ========================================
async function submitVoidFinalAnswer() {
  const answer = document.getElementById('void-final-answer').value.trim();
  const sanitizedAnswer = sanitizeInput(answer, 30);

  if (!sanitizedAnswer || sanitizedAnswer.length === 0) {
    alert(t('void.alert.enterAnswer'));
    return;
  }

  try {
    await currentVoidGame.submitFinalAnswer(currentVoidPlayer, sanitizedAnswer);
    console.log('✅ 最終回答送信成功');
    // 結果画面は自動的に表示される（gameState='finished'）
  } catch (error) {
    console.error('❌ 回答送信エラー:', error);
    alert('送信に失敗しました: ' + error.message);
  }
}

// ========================================
// 結果画面表示
// ========================================
function showVoidResultScreen(roomData) {
  showScreen('void-result-screen');

  // 正解・不正解表示
  const isCorrect = roomData.isCorrect;
  const resultIcon = document.getElementById('void-result-icon');
  const resultTitle = document.getElementById('void-result-title');

  if (isCorrect) {
    resultIcon.textContent = '🎉';
    resultIcon.className = 'void-result-correct';
    resultTitle.textContent = '正解！';
    resultTitle.style.color = '#10b981';
  } else {
    resultIcon.textContent = '😢';
    resultIcon.className = 'void-result-wrong';
    resultTitle.textContent = '不正解...';
    resultTitle.style.color = '#ef4444';
  }

  // 回答表示
  document.getElementById('void-correct-answer').textContent = roomData.theme.name;
  document.getElementById('void-your-answer').textContent = roomData.finalAnswer;

  // ワードの推移を表示
  const historyContainer = document.getElementById('void-word-history');
  historyContainer.innerHTML = '';

  const playerOrder = roomData.playerOrder || [];
  const turns = roomData.turns || {};

  playerOrder.forEach((playerName, index) => {
    const turn = turns[index];
    if (!turn) return;

    const historyDiv = document.createElement('div');
    historyDiv.className = 'void-history-item';

    const wordsHtml = turn.words.map((word, wordIndex) => {
      const isModified = turn.modified && turn.modified.includes(wordIndex);
      const className = isModified ? 'void-history-word void-history-modified' : 'void-history-word';
      return `<span class="${className}">${word}</span>`;
    }).join('');

    const modifiedInfo = turn.modified && turn.modified.length > 0 
      ? `<div style="color: var(--void-glow); font-size: 0.9rem; margin-top: 0.5rem;">修正: ${turn.modified.length}個</div>`
      : '';

    historyDiv.innerHTML = `
      <div class="void-history-player">${playerName} (${index + 1}/${playerOrder.length})</div>
      <div class="void-history-words">${wordsHtml}</div>
      ${modifiedInfo}
    `;

    historyContainer.appendChild(historyDiv);

    // 矢印を追加（最後以外）
    if (index < playerOrder.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'void-history-arrow';
      arrow.textContent = '↓';
      historyContainer.appendChild(arrow);
    }
  });

  // 最終回答を追加
  const finalDiv = document.createElement('div');
  finalDiv.className = 'void-history-item';
  finalDiv.style.border = isCorrect ? '2px solid #10b981' : '2px solid #ef4444';
  finalDiv.innerHTML = `
    <div class="void-history-player">最終回答</div>
    <div class="void-history-words">
      <span class="void-history-word" style="font-size: 1.2rem; font-weight: 700;">${roomData.finalAnswer}</span>
    </div>
  `;
  historyContainer.appendChild(finalDiv);
}

// ========================================
// ルーム退出
// ========================================
async function leaveVoidRoom() {
  if (!currentVoidGame || !currentVoidPlayer) {
    console.warn('⚠️ ゲームまたはプレイヤーが未設定です');
    showScreen('void-home-screen');
    return;
  }

  try {
    console.log('🚪 ルーム退出処理開始...');
    console.log('- プレイヤー名:', currentVoidPlayer);
    console.log('- ルームID:', currentVoidRoomId);
    
    // ルームから退出
    await currentVoidGame.leaveRoom(currentVoidPlayer);
    console.log('✅ Firebaseから退出完了');
    
    // 監視を停止
    currentVoidGame.unwatchRoom();
    console.log('✅ 監視停止完了');
    
    // 変数をクリア
    currentVoidGame = null;
    currentVoidRoomId = null;
    currentVoidPlayer = null;

    // ホーム画面に戻る
    showScreen('void-home-screen');
    console.log('✅ ルーム退出成功');
  } catch (error) {
    console.error('❌ ルーム退出エラー:', error);
    alert('退出に失敗しました: ' + error.message);
  }
}
