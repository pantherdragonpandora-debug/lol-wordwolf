# ヴォイド最終回答＆もう一度遊ぶボタン修正 (v34/v36/v20/v33)

## 📋 報告された問題

### 1. ヴォイド最終回答エラー
「ヴォイドに届くは光か闇か、で最終回答者が回答ボタンを押しても機能しておらず、結果発表の画面になりません。修正して。」

### 2. もう一度遊ぶボタンの要望
「すべてのモードにおいて、1ゲームが終了（結果発表画面になった）した場合に、続けてゲームができるよう、ルーム画面に戻ることのできるボタンを作って機能させてください。」

## 🔍 原因

### 1. ヴォイド最終回答エラー
`void-main.js` の `onVoidRoomUpdate` 関数で、`gameState === 'finished'` をチェックしていましたが、`void-game.js` の `submitFinalAnswer` メソッドでは `gameState = 'result'` を設定していました。

```javascript
// void-game.js (306行)
updates['gameState'] = 'result';

// void-main.js (417行)
} else if (gameState === 'finished') {  // ❌ 'result' ではない！
  showVoidResultScreen(roomData);
}
```

### 2. もう一度遊ぶボタン
- **ワードウルフ**: `resetRoom` メソッドは実装済み
- **デマーシア**: `resetRoom` メソッドが未実装
- **ヴォイド**: `resetRoom` メソッドが未実装、ボタンがホーム画面に戻るだけ

## ✅ 修正内容

### 1. ヴォイド最終回答エラー修正（void-main.js）
gameState のチェックを修正：

**変更前:**
```javascript
} else if (gameState === 'finished') {
  showVoidResultScreen(roomData);
}
```

**変更後:**
```javascript
} else if (gameState === 'result' || gameState === 'finished') {
  showVoidResultScreen(roomData);
}
```

### 2. ヴォイド resetRoom メソッド追加（void-game.js）
ゲームをリセットして再プレイできるように：

```javascript
async resetRoom() {
  const snapshot = await this.roomRef.once('value');
  const roomData = snapshot.val();
  
  if (!roomData) {
    throw new Error('ルームが見つかりません');
  }

  // 新しいテーマを選択
  const newTheme = getRandomVoidTheme(this.gameType);

  const updates = {
    gameState: 'waiting',
    currentTurn: 0,
    playOrder: [],
    orderSelections: {},
    turns: {},
    finalAnswer: null,
    isCorrect: null,
    theme: {
      id: newTheme.id,
      name: newTheme.name,
      category: newTheme.category
    }
  };

  // 各プレイヤーの状態をリセット
  const playerOrder = roomData.playerOrder || [];
  playerOrder.forEach(playerName => {
    updates[`players/${playerName}/hasSubmitted`] = false;
  });

  await this.roomRef.update(updates);
}
```

### 3. ヴォイド playVoidAgain 関数追加（void-main.js）
「もう一度遊ぶ」ボタンのイベントハンドラ：

```javascript
async function playVoidAgain() {
  if (!currentVoidGame) {
    console.error('❌ currentVoidGameが存在しません');
    return;
  }

  const isHost = currentVoidGame.roomData?.hostName === currentVoidPlayer;
  
  if (!isHost) {
    alert('ホストのみがゲームをリセットできます');
    return;
  }

  try {
    await currentVoidGame.resetRoom();
    // onVoidRoomUpdate が自動的に呼ばれて待機画面に戻る
  } catch (error) {
    console.error('❌ ゲームリセットエラー:', error);
    alert('リセットに失敗しました: ' + error.message);
  }
}
```

### 4. デマーシア resetRoom メソッド追加（demacia-game.js）
デマーシアゲームをリセット：

```javascript
async resetRoom() {
  const snapshot = await this.roomRef.once('value');
  const room = snapshot.val();

  if (!room) {
    throw new Error('ルームが存在しません');
  }

  // 新しいセリフを選択
  const phrases = this.gameType === 'lol' 
    ? window.demaciaPhrases 
    : window.demaciaPhrasesValorant;
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];

  const updates = {};
  
  // ゲーム状態をリセット
  updates['gameState'] = 'waiting';
  updates['currentRound'] = 0;
  updates['currentPhrase'] = {
    id: phrase.id,
    text: phrase.text,
    character: phrase.character,
    situations: phrase.situations
  };
  updates['currentPerformer'] = null;
  updates['performerSituation'] = null;
  updates['votes'] = null;
  updates['roundResults'] = null;

  // 各プレイヤーのスコアと投票をリセット
  const players = room.players || {};
  Object.keys(players).forEach(playerName => {
    updates[`players/${playerName}/score`] = 0;
    updates[`players/${playerName}/vote`] = null;
  });

  await this.roomRef.update(updates);
}
```

### 5. main.js の resetGame 関数修正
ワードウルフとデマーシアの両方に対応：

**変更前:**
```javascript
async function resetGame() {
  await currentGame.resetRoom();
  showWaitingRoom();
}
```

**変更後:**
```javascript
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
```

## 📊 機能一覧

### すべてのモードの結果画面

| モード | ボタン | 機能 |
|--------|--------|------|
| **ワードウルフ** | もう一度 | ルームをリセットして待機画面へ |
| | ホームへ | ルーム退出してホーム画面へ |
| **デマーシア** | もう一度 | ルームをリセットして待機画面へ |
| | ホームへ | ルーム退出してホーム画面へ |
| **ヴォイド** | もう一度遊ぶ | ルームをリセットして待機画面へ |
| | ホームに戻る | ルーム退出してヴォイドホーム画面へ |

### リセット時の動作

#### ワードウルフ
- 新しいお題ペアを選択
- プレイヤーの役割・投票をリセット
- gameState を 'waiting' に変更

#### デマーシア
- 新しいセリフを選択
- プレイヤーのスコア・投票をリセット
- currentRound を 0 に変更
- gameState を 'waiting' に変更

#### ヴォイド
- 新しいテーマを選択
- プレイヤーの送信状態をリセット
- 順番選択・ターン・回答をクリア
- gameState を 'waiting' に変更

## 🔧 変更ファイル
- `js/void-game.js` (+47行、resetRoom メソッド追加、v33→v34)
- `js/void-main.js` (+23行、playVoidAgain 関数追加、v35→v36)
- `js/demacia-game.js` (+48行、resetRoom メソッド追加、v19→v20)
- `js/main.js` (resetGame 関数修正、v32→v33)
- `index.html` (バージョン更新)
- `VOID_PLAY_AGAIN_FIX_v34.md` (このドキュメント)

## 🧪 テスト手順

### 1. 完全リロード
Ctrl+Shift+R (Mac: Cmd+Shift+R)

### 2. ヴォイド最終回答テスト
1. ヴォイドモードでルーム作成（3人以上推奨）
2. 順番選択 → ゲーム開始
3. 各プレイヤーが順番にワードを送信
4. 最後のプレイヤーが回答を入力 → 「回答」をクリック
5. **期待される結果**:
   ```
   📝 submitFinalAnswer呼び出し: プレイヤー3 回答
   📤 Firebase更新を送信: { gameState: 'result', ... }
   ✅ 最終回答送信完了
   ✅ 最終回答送信成功
   ```
6. 結果画面が表示される（正解/不正解、言葉の推移）

### 3. もう一度遊ぶテスト（ワードウルフ）
1. ワードウルフでゲームプレイ → 結果画面
2. **ホスト側**: 「もう一度」をクリック
3. **期待される結果**:
   - 待機画面に戻る
   - 新しいお題が選択される
   - プレイヤーリストはそのまま
   - 「ゲーム開始」ボタンが表示される

### 4. もう一度遊ぶテスト（デマーシア）
1. デマーシアでゲームプレイ → 最終結果画面
2. **ホスト側**: 「もう一度」をクリック
3. **期待される結果**:
   - 待機画面に戻る
   - 新しいセリフが選択される
   - プレイヤーのスコアが 0 にリセット
   - 「ゲーム開始」ボタンが表示される

### 5. もう一度遊ぶテスト（ヴォイド）
1. ヴォイドでゲームプレイ → 結果画面
2. **ホスト側**: 「もう一度遊ぶ」をクリック
3. **期待される結果**:
   ```
   🔄 ゲームリセット開始
   🔄 resetRoom呼び出し
   📤 Firebase更新を送信: { gameState: 'waiting', ... }
   ✅ ルームリセット完了
   ✅ ゲームリセット完了
   ```
   - 待機画面に戻る
   - 新しいテーマが選択される
   - プレイヤーリストはそのまま
   - 「ゲーム開始」ボタンが表示される

### 6. 非ホスト側の動作
1. 非ホスト（ゲスト）側で「もう一度遊ぶ」をクリック
2. **期待される結果**:
   ```
   alert('ホストのみがゲームをリセットできます')
   ```
3. ホストがリセットすると、自動的に待機画面に戻る

## 🎯 修正効果

### Before
- ❌ ヴォイド: 最終回答後に結果画面が表示されない
- ❌ すべてのモード: もう一度遊ぶにはルーム退出→再作成が必要

### After
- ✅ ヴォイド: 最終回答後に正しく結果画面が表示される
- ✅ すべてのモード: 「もう一度遊ぶ」ボタンで同じメンバーで即座に再プレイ可能
- ✅ ホストのみがリセット可能（権限管理）
- ✅ 新しいお題/セリフ/テーマが自動選択される

---
**修正日**: 2026-02-17  
**バージョン**: void-game.js v34, void-main.js v36, demacia-game.js v20, main.js v33  
**関連ファイル**: `js/void-game.js`, `js/void-main.js`, `js/demacia-game.js`, `js/main.js`, `index.html`  
**ステータス**: ✅ 修正完了
