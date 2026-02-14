# 🐛 デマーシア投票画面修正 (v1.0.15)

## 📋 概要
デマーシアモードの投票画面が誤ってワードウルフの画面（「誰がウルフですか？」）を表示していた問題を修正しました。

## 🐛 修正前の問題

### 主な問題点
1. **デマーシア投票画面がワードウルフになっていた**
   - デマーシアモードなのに「誰がウルフですか？」と表示
   - プレイヤー選択画面が表示される
   - シチュエーション選択ができない

2. **ゲームモード判定の問題**
   - `voting` 状態が両ゲームモードで共通
   - ゲームモード判定ロジックが不完全
   - FirebaseにゲームモードIDが保存されていない

3. **投票状況が分からない**
   - 何人が投票完了したか表示されない
   - 待機状態が不明瞭

## ✅ 修正内容

### 1. ゲームモード判定の改善 ✨

**Firebaseデータ構造に `gameMode` フィールドを追加：**

#### デマーシアゲーム (js/demacia-game.js)
```javascript
const roomData = {
  host: hostName,
  gameMode: 'demacia', // ゲームモードを明示的に保存
  settings: { ... },
  players: { ... },
  gameState: 'waiting',
  currentRound: 0,
  createdAt: Date.now()
};
```

#### ワードウルフゲーム (js/game.js)
```javascript
await this.roomRef.set({
  host: hostName,
  gameMode: 'wordwolf', // ゲームモードを明示的に保存
  settings: settings,
  players: { ... },
  gameState: 'waiting',
  createdAt: Date.now(),
  timer: null,
  chat: []
});
```

### 2. 画面遷移ロジックの修正 🔧

**Before（v1.0.14）：**
```javascript
// 問題: voting状態で両方のゲームモードが混在
if (roomData.gameState === 'voting') {
  showVotingScreen(roomData);        // ワードウルフ
  checkWordWolfVotingComplete(roomData);
}
else if (roomData.gameState === 'voting') {
  showDemaciaVotingScreen();         // デマーシア
  checkDemaciaVotingComplete();
}
```

**After（v1.0.15）：**
```javascript
// ゲームモードを判定
const isDemaciaMode = roomData.gameMode === 'demacia' || 
                      roomData.gameState === 'performer_selection' || 
                      roomData.gameState === 'performing' || 
                      roomData.gameState === 'round_result';

if (isDemaciaMode) {
  // デマーシアモードの画面遷移
  if (roomData.gameState === 'voting') {
    showDemaciaVotingScreen();
    checkDemaciaVotingComplete();
  }
} else {
  // ワードウルフモードの画面遷移
  if (roomData.gameState === 'voting') {
    showVotingScreen(roomData);
    checkWordWolfVotingComplete(roomData);
  }
}
```

### 3. 投票状況のリアルタイム表示 📊

**HTMLに投票状況表示を追加：**
```html
<!-- 投票状況表示 -->
<div id="demacia-vote-status" style="text-align: center; margin-bottom: 1rem; padding: 0.5rem; background: rgba(200,155,60,0.1); border-radius: 8px; font-size: 0.9rem;">
    <span id="demacia-vote-count">0</span> / <span id="demacia-total-voters">0</span> 人が投票完了
</div>
```

**JavaScript更新：**
```javascript
// 投票状況を更新
const players = Object.values(roomData.players || {});
const totalPlayers = players.length;
const performerCount = 1; // 演技者は投票しない
const expectedVoters = totalPlayers - performerCount;
const voteCount = Object.keys(roomData.currentVotes || {}).length;

document.getElementById('demacia-vote-count').textContent = voteCount;
document.getElementById('demacia-total-voters').textContent = expectedVoters;
```

### 4. 投票済みユーザーのUI制御 🔒

```javascript
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

if (hasVoted) {
  optionsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #c89b3c;">✅ 投票完了！<br>他のプレイヤーの投票を待っています...</p>';
}
```

### 5. 投票完了チェック機能の有効化 ✅

```javascript
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
```

## 📊 実装フロー

### デマーシアの投票から結果表示まで

```
1. 演技フェーズ
   - 演技者がシチュエーションを見て演技
   - 他のプレイヤーは演技を見る
   ↓
2. 投票開始
   - 演技者が「投票を開始」ボタンを押す
   - gameState が 'voting' に変更
   ↓
3. 投票画面表示（修正点！）
   - ✅ ゲームモード判定により正しい画面へ
   - ✅ デマーシア投票画面（シチュエーション選択）が表示
   - ✅ 投票状況表示「0 / 4 人が投票完了」
   ↓
4. 各プレイヤーが投票
   - プレイヤーA: シチュエーション選択 → 投票
   - 投票状況更新「1 / 4 人が投票完了」
   - プレイヤーB: 投票
   - 投票状況更新「2 / 4 人が投票完了」
   - ...
   ↓
5. 全員投票完了
   - 投票状況「4 / 4 人が投票完了」
   - checkDemaciaVotingComplete() が検知
   - demacia-game.js の calculateResults() が自動実行
   - gameState が 'round_result' に変更
   ↓
6. 結果画面表示
   - ✅ 正解のシチュエーションが表示
   - ✅ 各プレイヤーの投票結果（正解/不正解）
   - ✅ 演技者の獲得ポイント
   - ✅ 正解者数 / 総投票者数
```

## 📁 修正ファイル一覧

| ファイル | 変更内容 | 行数 |
|---------|---------|------|
| `js/main.js` | ゲームモード判定ロジック修正 | +40, -30 |
| `js/main.js` | 投票画面表示機能強化 | +50, -30 |
| `js/main.js` | 投票完了チェック有効化 | +15 |
| `js/demacia-game.js` | gameMode追加 | +1 |
| `js/game.js` | gameMode追加 | +1 |
| `index.html` | 投票状況UI追加 | +5 |
| `js/version.js` | v1.0.15に更新 | +1, -1 |
| **合計** | **7ファイル** | **+113, -61** |

## 🧪 テスト方法

### 基本的な動作確認（3人以上推奨）

#### 1. ゲーム開始
```
- プレイヤー1: デマーシア → League of Legends → 部屋作成
- プレイヤー2, 3, 4: ルームコード入力 → 参加
- プレイヤー1: ゲーム開始
```

#### 2. 演技フェーズ
```
- ランダムで演技者が選択される（例: Player2）
- Player2: セリフとシチュエーションを確認
  例: 「デマーシアァァァァ！」- ペンタキルを決めた時（難易度: easy）
- Player2: 演技を行う
- Player2: 「投票を開始」ボタンを押す
```

#### 3. 投票画面（ここが修正点！）
```
✅ デマーシア投票画面が表示される
✅ 「演技者はどのシチュエーションを演じていましたか？」と表示
✅ 6つのシチュエーション選択肢が表示される:
   1. ペンタキルを決めた時
   2. 味方が全滅した時
   3. バロンを奪われた時
   4. 試合に勝った時
   5. 試合に負けた時
   6. ゲームが始まる前
✅ 投票状況が表示される「0 / 3 人が投票完了」
✅ 演技者（Player2）は「他のプレイヤーの投票を待っています...」と表示

❌ 「誰がウルフですか？」は表示されない
❌ プレイヤー選択画面は表示されない
```

#### 4. 投票実行
```
- Player1がシチュエーション選択 → 投票
  ✅ ボタンが「投票完了」に変わる
  ✅ 投票状況「1 / 3 人が投票完了」

- Player3が投票
  ✅ 投票状況「2 / 3 人が投票完了」

- Player4が投票
  ✅ 投票状況「3 / 3 人が投票完了」
  ✅ 自動的に結果画面に遷移
```

#### 5. 結果画面
```
✅ セリフが表示される: 「デマーシアァァァァ！」
✅ 正解のシチュエーションが表示される: 「正解: ペンタキルを決めた時（難易度: easy）」
✅ 正解者数が表示される: 「✅ 正解者: 2 / 3人」
✅ 演技者の獲得ポイント: 「🎭 Player2さんの獲得ポイント: +2」
✅ 各プレイヤーの投票結果:
   Player1 → ペンタキルを決めた時 ✅ 正解
   Player3 → バロンを奪われた時 ❌ 不正解
   Player4 → ペンタキルを決めた時 ✅ 正解
```

### コンソールログの確認

投票フロー中のコンソールログ：
```
🗳️ デマーシア投票状況: 0/3
📤 投票送信中: Player1 → 0
✅ 投票完了: Player1 → ペンタキルを決めた時 (正解)
📊 投票状況: 1/3
🗳️ デマーシア投票状況: 1/3

📤 投票送信中: Player3 → 2
✅ 投票完了: Player3 → バロンを奪われた時 (不正解)
📊 投票状況: 2/3
🗳️ デマーシア投票状況: 2/3

📤 投票送信中: Player4 → 0
✅ 投票完了: Player4 → ペンタキルを決めた時 (正解)
📊 投票状況: 3/3
🎉 全員の投票が完了！結果を集計します
🗳️ デマーシア投票状況: 3/3
🎉 デマーシア全員の投票が完了！
✅ 結果集計完了
```

## 🔍 トラブルシューティング

### 問題1: デマーシアなのにワードウルフの投票画面が表示される

**原因：**
- `gameMode` が保存されていない古いルーム
- ブラウザキャッシュが古いバージョン

**対処法：**
1. ブラウザをスーパーリロード（Ctrl/Cmd + Shift + R）
2. バージョンを確認（`getAppVersion()` で "1.0.15" 確認）
3. 新しいルームを作成（古いルームは `gameMode` なし）

### 問題2: 投票状況が更新されない

**原因：**
- Firebaseのリアルタイム監視が動作していない
- `currentVotes` データが保存されていない

**対処法：**
1. コンソールで `🗳️ デマーシア投票状況: X/Y` が表示されるか確認
2. Firebase Consoleで `demacia_rooms/{roomId}/currentVotes` を確認
3. ページをリロード

### 問題3: 投票しても結果画面に進まない

**原因：**
- `checkVotingComplete()` が実行されていない
- 演技者が投票している（演技者は投票不要）

**対処法：**
1. コンソールで `🎉 全員の投票が完了！` が表示されるか確認
2. 演技者を除いた人数分の投票があるか確認
3. `demacia-game.js` の `calculateResults()` が実行されているか確認

## 📊 動作確認項目チェックリスト

### ゲームモード判定
- [ ] デマーシアモードでデマーシア投票画面が表示される
- [ ] ワードウルフモードでワードウルフ投票画面が表示される
- [ ] `gameMode` がFirebaseに保存されている

### デマーシア投票画面
- [ ] 「演技者はどのシチュエーションを演じていましたか？」と表示
- [ ] 6つのシチュエーション選択肢が表示される
- [ ] 投票状況「X / Y 人が投票完了」が表示される
- [ ] 演技者は「他のプレイヤーの投票を待っています...」と表示

### 投票実行
- [ ] シチュエーション選択後に「投票する」ボタンを押せる
- [ ] 投票後にボタンが「投票完了」に変わる
- [ ] 投票後にシチュエーション選択が無効化される
- [ ] 投票状況がリアルタイム更新される

### 全員投票完了
- [ ] 投票状況が「Y / Y 人が投票完了」になる
- [ ] 自動的に結果画面に遷移する
- [ ] コンソールに `🎉 デマーシア全員の投票が完了！` 表示

### 結果画面
- [ ] 正解のシチュエーションが表示される
- [ ] 各プレイヤーの投票結果が表示される（正解/不正解）
- [ ] 演技者の獲得ポイントが表示される
- [ ] 正解者数が表示される

## 🎯 改善効果

### Before (v1.0.14以前)
- ❌ デマーシアなのにワードウルフの投票画面
- ❌ 「誰がウルフですか？」と表示
- ❌ プレイヤー選択画面が表示
- ❌ シチュエーション選択ができない
- ❌ 投票状況が分からない

### After (v1.0.15)
- ✅ デマーシアで正しい投票画面が表示
- ✅ 「演技者はどのシチュエーションを演じていましたか？」と表示
- ✅ シチュエーション選択画面が表示
- ✅ 投票状況がリアルタイム表示
- ✅ 全員投票完了で自動的に結果表示
- ✅ 結果画面で詳細な投票結果を表示

## 📚 関連ドキュメント

- `DEMACIA_VOTING_SYSTEM.md` - デマーシア投票システムの完全ガイド
- `WORDWOLF_VOTING_FIX_v1.0.14.md` - ワードウルフ投票システム修正
- `README.md` - プロジェクト全体のドキュメント

---

**バージョン:** v1.0.15  
**更新日:** 2026-02-14  
**作成者:** AI Assistant
