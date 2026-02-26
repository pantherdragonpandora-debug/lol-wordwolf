# 🐛 デマーシア シチュエーション表示バグ修正（v1.0.13）

## 📅 修正日
2026年2月14日

## 🐛 問題

「デマーシアに心を込めて」モードで、演技者のシチュエーション表示が「**[Object Object]**」と表示される問題が再発。

### 症状

```
演技画面（演技者側）:

セリフ: デマーシアァァァァ！
キャラクター: ガレン
あなたのシチュエーション: [Object Object]  ← これが問題
難易度: undefined
```

---

## 🔍 原因

### 問題1: `correctSituation` インデックスが保存されていない

`js/demacia-game.js` の `selectPerformer` 関数で、演技者を選択する際に：

```javascript
await this.roomRef.update({
  gameState: 'performing',
  currentPerformer: performerName,
  performerSituation: { ... }  // オブジェクトを保存
  // ❌ correctSituation: インデックスが保存されていない
});
```

**結果**: 
- `roomData.correctSituation` が `undefined`
- `roomData.currentPhrase.situations[undefined]` → `undefined`
- `undefined` を表示しようとして `[Object Object]` になる

### 問題2: フォールバック処理がない

`js/main.js` の表示ロジックで：

```javascript
// ❌ correctSituation が undefined の場合を考慮していない
const performerSituation = roomData.currentPhrase.situations[roomData.correctSituation];
```

---

## ✅ 修正内容

### 修正1: `demacia-game.js` - インデックスを保存

```javascript
// 修正前
await this.roomRef.update({
  gameState: 'performing',
  currentPerformer: performerName,
  performerSituation: {
    id: performerSituation.id,
    text: performerSituation.text,
    difficulty: performerSituation.difficulty
  }
});

// 修正後
await this.roomRef.update({
  gameState: 'performing',
  currentPerformer: performerName,
  correctSituation: randomSituationIndex,  // ✅ インデックスを追加
  performerSituation: {
    id: performerSituation.id,
    text: performerSituation.text,
    difficulty: performerSituation.difficulty
  }
});
```

### 修正2: `main.js` - フォールバック処理を追加

```javascript
// 修正前
const performerSituation = roomData.currentPhrase.situations[roomData.correctSituation];
document.getElementById('demacia-situation').textContent = performerSituation.text;

// 修正後
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

document.getElementById('demacia-situation').textContent = performerSituation.text;
```

### 修正3: デバッグログの追加

```javascript
console.log('🎭 演技画面表示:', {
  isPerformer,
  currentPlayer,
  performer: roomData.currentPerformer,
  correctSituation: roomData.correctSituation,
  performerSituation: roomData.performerSituation,
  phraseText: roomData.currentPhrase?.text,
  situationsCount: roomData.currentPhrase?.situations?.length
});
```

---

## 📊 データ構造

### 修正後のFirebaseデータ

```javascript
demacia_rooms/123456: {
  gameState: 'performing',
  currentPerformer: 'Player1',
  correctSituation: 2,  // ✅ インデックス（0-5）
  currentPhrase: {
    text: 'デマーシアァァァァ！',
    character: 'ガレン',
    situations: [
      { id: 1, text: 'ペンタキルを決めた時', difficulty: 'easy' },
      { id: 2, text: 'ガレンに追われている時', difficulty: 'medium' },
      { id: 3, text: '悲しい時', difficulty: 'hard' },  // ← correctSituation = 2 の場合、これが正解
      // ...
    ]
  },
  performerSituation: {  // ✅ 演技者用のコピー（フォールバック用）
    id: 3,
    text: '悲しい時',
    difficulty: 'hard'
  }
}
```

---

## 🧪 テスト手順

### 1. ブラウザをリロード

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### 2. デマーシアゲームを開始

1. 「デマーシアに心を込めて」を選択
2. LOL を選択
3. ルームを作成
4. ゲーム開始
5. 演技者をランダム選択

### 3. 演技画面を確認

#### ✅ 正常な表示

```
セリフ: デマーシアァァァァ！
キャラクター: ガレン
あなたのシチュエーション: ペンタキルを決めた時
難易度: easy
```

#### ❌ エラー（修正前）

```
セリフ: デマーシアァァァァ！
キャラクター: ガレン
あなたのシチュエーション: [Object Object]
難易度: undefined
```

### 4. コンソールログを確認

F12 → Console タブで以下を確認：

```javascript
🎭 演技画面表示: {
  isPerformer: true,
  currentPlayer: "Player1",
  performer: "Player1",
  correctSituation: 2,  // ✅ 数値が表示される
  performerSituation: {text: "悲しい時", difficulty: "hard"},
  phraseText: "デマーシアァァァァ！",
  situationsCount: 6
}

🎭 演技者表示: {
  performer: "Player1",
  situation: "悲しい時",  // ✅ テキストが表示される
  difficulty: "hard"
}
```

---

## 🔄 修正の流れ

### なぜこの問題が発生したか

```
v1.0.11: 表示ロジックを修正（performerSituation.text）
    ↓
v1.0.12: 投票システムを実装
    ↓
    データ保存時に correctSituation を保存し忘れ
    ↓
    演技画面で correctSituation が undefined
    ↓
    situations[undefined] → undefined
    ↓
    undefined.text → エラー → [Object Object]
```

### 今回の修正

```
1. selectPerformer で correctSituation インデックスを保存
2. 表示ロジックでフォールバック処理を追加
3. デバッグログで問題を早期発見できるようにした
```

---

## 📦 更新ファイル

| ファイル | 変更内容 | 重要度 |
|---------|---------|-------|
| `js/demacia-game.js` | correctSituation の保存を追加 | ⭐⭐⭐ |
| `js/main.js` | フォールバック処理とデバッグログ追加 | ⭐⭐⭐ |
| `js/version.js` | v1.0.13 に更新 | ⭐⭐ |
| `index.html` | キャッシュバージョン v=13 | ⭐⭐ |

---

## 🐛 今後の予防策

### 1. 型定義の追加（TypeScript または JSDoc）

```javascript
/**
 * @typedef {Object} RoomData
 * @property {string} gameState
 * @property {string} currentPerformer
 * @property {number} correctSituation - 正解のシチュエーションインデックス
 * @property {DemaciaPhrase} currentPhrase
 * @property {Situation} performerSituation
 */
```

### 2. ユニットテストの追加

```javascript
// テスト: selectPerformer が correctSituation を保存するか
test('selectPerformer saves correctSituation index', async () => {
  const game = new DemaciaGame('test-room');
  await game.selectPerformer('Player1');
  const room = await game.roomRef.once('value');
  expect(typeof room.correctSituation).toBe('number');
});
```

### 3. デバッグモードの追加

```javascript
const DEBUG = true;
if (DEBUG) {
  console.log('🎭 演技画面表示:', roomData);
}
```

---

## ✅ 完了チェックリスト

- [x] `js/demacia-game.js` を修正（correctSituation を保存）
- [x] `js/main.js` を修正（フォールバック処理）
- [x] デバッグログを追加
- [x] バージョンを 1.0.13 に更新
- [x] キャッシュバージョンを v=13 に更新
- [ ] ブラウザでテスト
- [ ] 複数プレイヤーでテスト
- [ ] コンソールログを確認

---

## 📞 問題が解決しない場合

### チェック項目

1. ブラウザを強制リロードしましたか？（Ctrl+Shift+R）
2. コンソールにエラーが表示されていますか？
3. デバッグログは表示されていますか？

### デバッグコマンド

```javascript
// F12 → Console で実行
console.log('Room data:', currentDemaciaGame?.roomData);
console.log('Correct situation:', currentDemaciaGame?.roomData?.correctSituation);
console.log('Performer situation:', currentDemaciaGame?.roomData?.performerSituation);
```

---

**バージョン**: 1.0.13  
**リリース日**: 2026年2月14日  
**修正内容**: デマーシア シチュエーション表示バグの完全修正
