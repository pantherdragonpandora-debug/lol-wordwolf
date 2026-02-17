# もう一度遊ぶボタン - 待機画面遷移修正 (v37/v34)

## 📋 報告された問題
「ホストがもう一度遊ぶボタンを押しても、待機画面に戻らないよ。」

## 🔍 原因
`onVoidRoomUpdate` および `updateWaitingRoom` 関数で、`gameState === 'waiting'` の時に **画面遷移処理（showScreen）が呼ばれていませんでした**。

### 問題のコード

#### ヴォイド（void-main.js）
```javascript
function onVoidRoomUpdate(roomData) {
  const gameState = roomData.gameState;

  if (gameState === 'waiting') {
    // ❌ showScreen('void-waiting-screen') が無い！
    updateVoidPlayerList(roomData);  // リストを更新するだけ
    // ...
  }
}
```

#### ワードウルフ・デマーシア（main.js）
```javascript
function updateWaitingRoom(roomData) {
  // ...
  
  // ゲーム状態による画面遷移
  if (isDemaciaMode) {
    // ❌ gameState === 'waiting' の処理が無い！
    if (roomData.gameState === 'performer_selection') {
      showDemaciaPerformerSelection();
    }
    // ...
  } else {
    // ❌ gameState === 'waiting' の処理が無い！
    if (roomData.gameState === 'playing') {
      showGameScreen(roomData);
    }
    // ...
  }
}
```

### エラーの流れ
```
1. ホスト: 「もう一度遊ぶ」クリック
   ↓
2. Firebase: gameState = 'waiting' に更新
   ↓
3. 全員のブラウザ: onVoidRoomUpdate() 実行
   ↓
4. プレイヤーリストは更新される ✅
   BUT
5. 画面は結果画面のまま ❌
```

## ✅ 修正内容

### 1. ヴォイド（void-main.js）
**showScreen('void-waiting-screen')** を追加：

**変更前:**
```javascript
function onVoidRoomUpdate(roomData) {
  const gameState = roomData.gameState;

  if (gameState === 'waiting') {
    updateVoidPlayerList(roomData);  // ❌ 画面遷移なし
    // ...
  }
}
```

**変更後:**
```javascript
function onVoidRoomUpdate(roomData) {
  const gameState = roomData.gameState;
  
  console.log('📊 ルームデータ更新:', { 
    gameState, 
    currentScreen: document.querySelector('.screen.active')?.id 
  });

  if (gameState === 'waiting') {
    showScreen('void-waiting-screen');  // ✅ 追加！
    updateVoidPlayerList(roomData);
    // ...
  }
}
```

### 2. ワードウルフ・デマーシア（main.js）
**gameState === 'waiting'** の分岐を追加：

**変更前:**
```javascript
// ゲーム状態による画面遷移
if (isDemaciaMode) {
  // ❌ 'waiting' 状態の処理なし
  if (roomData.gameState === 'performer_selection') {
    showDemaciaPerformerSelection();
  }
  // ...
} else {
  // ❌ 'waiting' 状態の処理なし
  if (roomData.gameState === 'playing') {
    showGameScreen(roomData);
  }
  // ...
}
```

**変更後:**
```javascript
// ゲーム状態による画面遷移
if (isDemaciaMode) {
  if (roomData.gameState === 'waiting') {
    showScreen('waiting-screen');  // ✅ 追加！
  } else if (roomData.gameState === 'performer_selection') {
    showDemaciaPerformerSelection();
  }
  // ...
} else {
  if (roomData.gameState === 'waiting') {
    showScreen('waiting-screen');  // ✅ 追加！
  } else if (roomData.gameState === 'playing') {
    showGameScreen(roomData);
  }
  // ...
}
```

## 📊 修正前後の動作比較

### 修正前
| アクション | Firebase | ブラウザ | 結果 |
|-----------|---------|---------|------|
| ホスト: もう一度遊ぶ | gameState = 'waiting' | updateVoidPlayerList() 実行 | ❌ 結果画面のまま |
| | | showScreen() 呼ばれない | |

### 修正後
| アクション | Firebase | ブラウザ | 結果 |
|-----------|---------|---------|------|
| ホスト: もう一度遊ぶ | gameState = 'waiting' | showScreen('void-waiting-screen') | ✅ 待機画面に遷移 |
| | | updateVoidPlayerList() 実行 | ✅ プレイヤーリスト更新 |

## 🔧 変更ファイル
- `js/void-main.js` (showScreen追加、デバッグログ追加、v36→v37)
- `js/main.js` (waiting状態の分岐追加、v33→v34)
- `index.html` (バージョン更新)
- `PLAY_AGAIN_SCREEN_FIX_v37.md` (このドキュメント)

## 🧪 テスト手順

### 1. 完全リロード
Ctrl+Shift+R (Mac: Cmd+Shift+R)

### 2. ヴォイドテスト
1. ヴォイドモードでルーム作成（3人推奨）
2. ゲームプレイ → 結果画面
3. コンソールを開く（F12）
4. **ホスト側**: 「もう一度遊ぶ」をクリック
5. **期待されるコンソールログ（全員）**:
   ```
   🔄 ゲームリセット開始
   📤 Firebase更新を送信: { gameState: 'waiting', ... }
   ✅ ルームリセット完了
   ✅ ゲームリセット完了
   📊 ルームデータ更新: { gameState: 'waiting', currentScreen: 'void-result-screen' }
   ```
6. **期待される動作**:
   - ✅ 全員が待機画面（void-waiting-screen）に戻る
   - ✅ プレイヤーリストが表示される
   - ✅ ホストに「ゲーム開始」ボタンが表示される

### 3. ワードウルフテスト
1. ワードウルフでゲームプレイ → 結果画面
2. **ホスト側**: 「もう一度」をクリック
3. **期待される動作**:
   - ✅ 全員が待機画面（waiting-screen）に戻る
   - ✅ プレイヤーリストが表示される
   - ✅ ホストに「ゲーム開始」ボタンが表示される

### 4. デマーシアテスト
1. デマーシアでゲームプレイ → 最終結果画面
2. **ホスト側**: 「もう一度」をクリック
3. **期待される動作**:
   - ✅ 全員が待機画面（waiting-screen）に戻る
   - ✅ プレイヤーリストが表示される
   - ✅ ホストに「ゲーム開始」ボタンが表示される

### 5. 非ホスト側の動作確認
1. 2つのブラウザで参加（ホスト・ゲスト）
2. 結果画面まで進む
3. **ホスト側**: 「もう一度遊ぶ」をクリック
4. **ゲスト側の画面も自動的に待機画面に戻る** ✅

## 🎯 修正効果

### Before（v36/v33）
- ❌ ホスト: もう一度遊ぶ → 結果画面のまま
- ❌ ゲスト: 結果画面のまま
- ❌ プレイヤーリストだけ更新される（画面は変わらない）

### After（v37/v34）
- ✅ ホスト: もう一度遊ぶ → 待機画面に遷移
- ✅ ゲスト: 自動的に待機画面に遷移
- ✅ プレイヤーリスト + 画面遷移が正しく動作
- ✅ ホストに「ゲーム開始」ボタン表示

## 📝 技術詳細

### showScreen() の重要性
```javascript
// CSSで画面を切り替える
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');  // すべて非表示
  });
  
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');  // 指定画面だけ表示
  }
}
```

### Firebase リアルタイム更新の流れ
```
1. ホスト: resetRoom() 実行
   ↓
2. Firebase: { gameState: 'waiting' } に更新
   ↓
3. 全員のブラウザ: on('value', callback) で自動検知
   ↓
4. callback: onVoidRoomUpdate() 実行
   ↓
5. showScreen('void-waiting-screen') で画面遷移 ✅
```

---
**修正日**: 2026-02-17  
**バージョン**: void-main.js v37, main.js v34  
**関連ファイル**: `js/void-main.js`, `js/main.js`, `index.html`  
**ステータス**: ✅ 修正完了
