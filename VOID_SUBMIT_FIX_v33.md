# ヴォイドワード送信エラー修正 (v33)

## 📋 報告された問題
「ヴォイドに届くは光か闇か、三つのワードを入力したあと送信に失敗しました、と出てしまう。修正してください。」

## 🔍 原因
`js/void-game.js` に必要なメソッドが実装されていませんでした：

### 欠けていたメソッド
1. **submitFirstWords** - 最初のプレイヤーが3つのワードを送信
2. **submitMiddleWords** - 中間プレイヤーが修正したワードを送信
3. **submitFinalAnswer** - 最後のプレイヤーが答えを送信
4. **submitOrder** - 順番選択を送信
5. **confirmOrder** - 順番を確定してゲーム開始

### エラーの流れ
```
void-main.js の submitVoidFirstWords()
  ↓
currentVoidGame.submitFirstWords(playerName, words) 呼び出し
  ↓
❌ void-game.js に submitFirstWords メソッドが存在しない
  ↓
"送信に失敗しました: submitFirstWords is not a function"
```

## ✅ 実装内容

### 1. submitOrder メソッド追加
順番選択をFirebaseに保存：

```javascript
async submitOrder(playerName, order) {
  const updates = {};
  updates[`orderSelections/${playerName}`] = order;
  await this.roomRef.update(updates);
}
```

### 2. confirmOrder メソッド追加
順番を確定してゲーム開始：

```javascript
async confirmOrder(playOrder) {
  const updates = {
    playOrder: playOrder,
    gameState: 'playing',
    currentTurn: 0
  };
  await this.roomRef.update(updates);
}
```

### 3. submitFirstWords メソッド追加
最初のプレイヤーが3つのワードを送信：

```javascript
async submitFirstWords(playerName, words) {
  console.log('📝 submitFirstWords呼び出し:', playerName, words);
  
  if (!words || words.length !== 3) {
    throw new Error('3つの言葉を入力してください');
  }

  const snapshot = await this.roomRef.once('value');
  const roomData = snapshot.val();
  
  if (!roomData) {
    throw new Error('ルームが見つかりません');
  }

  const playOrder = roomData.playOrder || [];
  const currentTurn = roomData.currentTurn || 0;

  if (playOrder[currentTurn] !== playerName) {
    throw new Error('あなたの順番ではありません');
  }

  const updates = {};
  updates[`turns/${currentTurn}`] = {
    playerName: playerName,
    words: words,
    modified: [false, false, false],
    submittedAt: Date.now()
  };
  updates[`players/${playerName}/hasSubmitted`] = true;
  updates['currentTurn'] = currentTurn + 1;

  await this.roomRef.update(updates);
}
```

### 4. submitMiddleWords メソッド追加
中間プレイヤーが修正したワードを送信：

```javascript
async submitMiddleWords(playerName, words, modified) {
  console.log('📝 submitMiddleWords呼び出し:', playerName, words, modified);
  
  if (!words || words.length !== 3) {
    throw new Error('3つの言葉を入力してください');
  }

  const snapshot = await this.roomRef.once('value');
  const roomData = snapshot.val();
  
  if (!roomData) {
    throw new Error('ルームが見つかりません');
  }

  const playOrder = roomData.playOrder || [];
  const currentTurn = roomData.currentTurn || 0;

  if (playOrder[currentTurn] !== playerName) {
    throw new Error('あなたの順番ではありません');
  }

  const updates = {};
  updates[`turns/${currentTurn}`] = {
    playerName: playerName,
    words: words,
    modified: modified || [false, false, false],
    submittedAt: Date.now()
  };
  updates[`players/${playerName}/hasSubmitted`] = true;
  updates['currentTurn'] = currentTurn + 1;

  await this.roomRef.update(updates);
}
```

### 5. submitFinalAnswer メソッド追加
最後のプレイヤーが答えを送信：

```javascript
async submitFinalAnswer(playerName, answer) {
  console.log('📝 submitFinalAnswer呼び出し:', playerName, answer);
  
  if (!answer || answer.trim().length === 0) {
    throw new Error('回答を入力してください');
  }

  const snapshot = await this.roomRef.once('value');
  const roomData = snapshot.val();
  
  if (!roomData) {
    throw new Error('ルームが見つかりません');
  }

  const playOrder = roomData.playOrder || [];
  const currentTurn = roomData.currentTurn || 0;

  if (playOrder[currentTurn] !== playerName) {
    throw new Error('あなたの順番ではありません');
  }

  // 正解判定
  const themeName = roomData.theme?.name || '';
  const isCorrect = answer.trim() === themeName.trim();

  const updates = {};
  updates[`turns/${currentTurn}`] = {
    playerName: playerName,
    answer: answer,
    submittedAt: Date.now()
  };
  updates[`players/${playerName}/hasSubmitted`] = true;
  updates['finalAnswer'] = answer;
  updates['isCorrect'] = isCorrect;
  updates['gameState'] = 'result';

  await this.roomRef.update(updates);
}
```

### 6. void-main.js の修正
中間ワード送信の呼び出しを修正：

**変更前:**
```javascript
await currentVoidGame.submitWords(currentVoidPlayer, myOrder, newWords, modifiedWords);
```

**変更後:**
```javascript
const modifiedFlags = [false, false, false];
modifiedWords.forEach(index => {
  modifiedFlags[index] = true;
});
await currentVoidGame.submitMiddleWords(currentVoidPlayer, newWords, modifiedFlags);
```

## 📊 データ構造

### turns オブジェクト
```javascript
{
  "0": {
    "playerName": "プレイヤー1",
    "words": ["ワード1", "ワード2", "ワード3"],
    "modified": [false, false, false],
    "submittedAt": 1234567890
  },
  "1": {
    "playerName": "プレイヤー2",
    "words": ["ワード1", "修正ワード2", "ワード3"],
    "modified": [false, true, false],
    "submittedAt": 1234567891
  },
  "2": {
    "playerName": "プレイヤー3",
    "answer": "回答",
    "submittedAt": 1234567892
  }
}
```

## 🔧 変更ファイル
- `js/void-game.js` (+140行、5つのメソッド追加、v32→v33)
- `js/void-main.js` (中間ワード送信修正、v34→v35)
- `index.html` (バージョン更新)
- `VOID_SUBMIT_FIX_v33.md` (このドキュメント)

## 🧪 テスト手順

### 1. 完全リロード
Ctrl+Shift+R (Mac: Cmd+Shift+R)

### 2. コンソール確認
```
✅ VoidGameクラス定義完了 v33
✅ window.VoidGame エクスポート完了 v33
```

### 3. ゲーム開始
1. **ルーム作成**: デマーシアモード → LOL/VALORANT → ルーム作成
2. **順番選択**: ホストがプレイヤーの順番を選択
3. **ゲーム開始**: 「この順番で開始」をクリック

### 4. ワード送信テスト

#### A. 最初のプレイヤー
1. 3つのワードを入力
2. 「送信」をクリック
3. **期待される結果**:
   ```
   📝 submitFirstWords呼び出し: プレイヤー1 ["ワード1", "ワード2", "ワード3"]
   🔍 現在のルームデータ: {...}
   📤 Firebase更新を送信: {...}
   ✅ ワード送信完了
   ✅ 最初のワード送信成功
   ```

#### B. 中間プレイヤー
1. 前のワードが表示される
2. 修正したいワードにチェック
3. 修正後のワードを入力
4. 「送信」をクリック
5. **期待される結果**:
   ```
   📝 submitMiddleWords呼び出し: プレイヤー2 ["ワード1", "修正ワード2", "ワード3"] [false, true, false]
   📤 Firebase更新を送信: {...}
   ✅ ワード送信完了
   ✅ 中間ワード送信成功
   ```

#### C. 最後のプレイヤー
1. 前のワードが表示される
2. 回答を入力
3. 「回答」をクリック
4. **期待される結果**:
   ```
   📝 submitFinalAnswer呼び出し: プレイヤー3 回答
   📤 Firebase更新を送信: {...}
   ✅ 最終回答送信完了
   ✅ 最終回答送信成功
   ```

### 5. エラーケース
以下の場合は適切なエラーメッセージが表示されます：

| ケース | エラーメッセージ |
|--------|-----------------|
| ワードが3つ未満 | 3つの言葉を入力してください |
| ルームが存在しない | ルームが見つかりません |
| 順番が違う | あなたの順番ではありません |
| 回答が空 | 回答を入力してください |

## 🎯 次のステップ
1. プレビューで完全リロード (Ctrl+Shift+R)
2. 3人以上でルームを作成
3. 順番選択 → ゲーム開始
4. 各プレイヤーがワードを送信
5. 問題があればコンソールログを報告

---
**修正日**: 2026-02-17  
**バージョン**: v33 (void-game.js), v35 (void-main.js)  
**関連ファイル**: `js/void-game.js`, `js/void-main.js`, `index.html`  
**ステータス**: ✅ 修正完了
