# ワードウルフ投票システム改善 (v1.0.14)

## 📋 概要
ワードウルフゲームの投票システムを改善し、全員の投票完了を待ってから結果を表示するようにしました。

## 🐛 修正前の問題

### 主な問題点
1. **誰か一人が投票した瞬間に結果が出てしまう**
   - 全員の投票を集計せずに結果画面に遷移
   - 他のプレイヤーが投票する機会を失う
   
2. **投票状況が分からない**
   - 何人が投票完了したか表示されない
   - 自分が投票した後の状態が不明

3. **投票の重複が可能**
   - 投票後もボタンが有効なまま
   - 複数回投票できてしまう可能性

## ✅ 修正内容

### 1. 投票完了の自動検知システム
```javascript
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
```

**特徴：**
- Firebaseのリアルタイム監視により自動検知
- 全員の投票完了時のみ`endVoting()`を実行
- デマーシアモードと同じ仕組みを採用

### 2. 投票状況のリアルタイム表示

**HTML追加：**
```html
<div id="wordwolf-vote-status" style="text-align: center; margin-bottom: 1rem; padding: 0.5rem; background: rgba(255,215,0,0.1); border-radius: 8px; font-size: 0.9rem;">
    <span id="wordwolf-vote-count">0</span> / <span id="wordwolf-total-players">0</span> 人が投票完了
</div>
```

**JavaScript更新：**
```javascript
// 投票状況を更新
const players = Object.values(roomData.players || {});
const totalPlayers = players.length;
const votedPlayers = players.filter(p => p.vote !== null && p.vote !== undefined).length;

document.getElementById('wordwolf-vote-count').textContent = votedPlayers;
document.getElementById('wordwolf-total-players').textContent = totalPlayers;
```

**表示例：**
- 投票前: `0 / 5 人が投票完了`
- 投票中: `3 / 5 人が投票完了`
- 全員完了: `5 / 5 人が投票完了` → 自動で結果画面へ

### 3. 投票済みプレイヤーのUI制御

```javascript
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

// ラジオボタンも無効化
optionDiv.innerHTML = `
  <input type="radio" name="vote" value="${player.name}" id="vote-${player.name}" ${hasVoted ? 'disabled' : ''}>
  <label for="vote-${player.name}">${player.name}</label>
`;
```

**動作：**
- 投票前: ボタン有効「投票確定」
- 投票後: ボタン無効「投票完了」
- 選択肢もすべて無効化され、再投票不可

### 4. 詳細な投票結果の表示

**各プレイヤーの投票先を表示：**
```javascript
players.forEach(player => {
  const voteDetail = document.createElement('div');
  voteDetail.style.padding = '0.3rem 0';
  voteDetail.style.color = player.name === result.wolf ? 'var(--wolf-color)' : 'var(--citizen-color)';
  voteDetail.textContent = `${player.name} → ${player.vote || '投票なし'}`;
  voteDetailsDiv.appendChild(voteDetail);
});
```

**表示例：**
```
各プレイヤーの投票:
  Player1 → Player3  (市民カラー)
  Player2 → Player3  (市民カラー)
  Player3 → Player1  (ウルフカラー)
  Player4 → Player3  (市民カラー)
  Player5 → Player3  (市民カラー)

投票数:
  Player3: 4 票
  Player1: 1 票
```

## 🔄 実装フロー

### 投票から結果表示までの流れ

```
1. 投票画面表示
   ↓
2. プレイヤーA が投票
   → Firebase更新
   → ボタン無効化「投票完了」
   → アラート「他のプレイヤーの投票を待っています...」
   ↓
3. Firebaseリアルタイム監視が検知
   → checkWordWolfVotingComplete() 実行
   → 投票状況更新「1 / 5 人が投票完了」
   ↓
4. プレイヤーB, C, D, E も投票
   → 各投票ごとに状況更新
   ↓
5. 全員投票完了 (5 / 5)
   → checkWordWolfVotingComplete() が検知
   → currentGame.endVoting() 自動実行
   ↓
6. 結果画面に自動遷移
   → 各プレイヤーの投票先表示
   → 投票数集計表示
   → 勝敗判定表示
```

## 📝 技術的改善点

### 1. Firebaseリアルタイム監視の活用
```javascript
// updateWaitingRoom() 内で投票状態を監視
} else if (roomData.gameState === 'voting') {
  showVotingScreen(roomData);
  // 投票完了チェック
  checkWordWolfVotingComplete(roomData);
}
```

- ルームデータが更新されるたびに自動チェック
- 誰かが投票するとすべてのクライアントで状況更新
- 全員完了時に自動で結果集計開始

### 2. 投票確定処理の改善
```javascript
async function confirmVote() {
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
```

**変更点：**
- ❌ 削除: 投票直後の`endVoting()`呼び出し
- ✅ 追加: ボタンの無効化処理
- ✅ 追加: 投票完了メッセージ
- ✅ 追加: コンソールログ

## 🧪 テスト方法

### 基本的な動作確認（3人以上推奨）

1. **部屋作成とゲーム開始**
   ```
   - プレイヤー1: ワードウルフ → League of Legends → 部屋作成
   - プレイヤー2, 3, 4: ルームコード入力 → 参加
   - プレイヤー1: ゲーム開始
   ```

2. **投票画面での確認**
   ```
   ✅ 投票状況が表示される（0 / 4 人が投票完了）
   ✅ 各プレイヤーが他のプレイヤーを選択できる
   ✅ 自分自身は選択肢に表示されない
   ```

3. **投票実行の確認**
   ```
   - プレイヤー1が投票
     ✅ ボタンが「投票完了」に変わる
     ✅ ボタンが無効化される
     ✅ ラジオボタンが無効化される
     ✅ アラート表示「投票が完了しました。他のプレイヤーの投票を待っています...」
     ✅ 投票状況が「1 / 4 人が投票完了」に更新
   
   - プレイヤー2が投票
     ✅ 投票状況が「2 / 4 人が投票完了」に更新
   
   - プレイヤー3が投票
     ✅ 投票状況が「3 / 4 人が投票完了」に更新
   
   - プレイヤー4が投票
     ✅ 投票状況が「4 / 4 人が投票完了」に更新
     ✅ 自動的に結果画面に遷移
   ```

4. **結果画面での確認**
   ```
   ✅ 各プレイヤーの投票先が表示される
   ✅ ウルフは赤色、市民は青色で表示
   ✅ 投票数の集計が表示される
   ✅ 勝敗判定が正しく表示される
   ✅ ウルフと市民のお題が表示される
   ```

### コンソールログの確認

投票フロー中のコンソールログ：
```
📤 投票送信中: Player1 → Player3
✅ 投票完了: Player1
🗳️ 投票状況: 1/4

📤 投票送信中: Player2 → Player3
✅ 投票完了: Player2
🗳️ 投票状況: 2/4

📤 投票送信中: Player3 → Player1
✅ 投票完了: Player3
🗳️ 投票状況: 3/4

📤 投票送信中: Player4 → Player3
✅ 投票完了: Player4
🗳️ 投票状況: 4/4
🎉 全員の投票が完了！結果を集計します
✅ 結果集計完了
```

## 🔍 トラブルシューティング

### 問題1: 投票ボタンを押しても反応しない

**原因：**
- JavaScriptエラーが発生している
- Firebaseへの接続が失敗している

**対処法：**
1. ブラウザのコンソールでエラーを確認
2. `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac) でリロード
3. Firebase接続状況を確認 (`✅ Firebase接続成功` が表示されるか)

### 問題2: 投票状況が更新されない

**原因：**
- Firebaseのリアルタイム監視が動作していない
- ルームデータの同期に問題がある

**対処法：**
1. コンソールで `🗳️ 投票状況: X/Y` が表示されるか確認
2. 他のプレイヤーが投票した際に状況が更新されるか確認
3. ページをリロードして再接続

### 問題3: 全員投票しても結果画面に遷移しない

**原因：**
- `checkWordWolfVotingComplete()` が実行されていない
- 投票データがFirebaseに正しく保存されていない

**対処法：**
1. コンソールで `🎉 全員の投票が完了！結果を集計します` が表示されるか確認
2. Firebase Consoleで `players` データの `vote` プロパティを確認
3. すべてのプレイヤーの `vote` が `null` でないことを確認

### 問題4: 結果画面で投票先が表示されない

**原因：**
- `roomData.players` にデータがない
- `player.vote` が保存されていない

**対処法：**
1. コンソールで `roomData` を確認
2. `roomData.players` に全プレイヤーのデータがあるか確認
3. 各プレイヤーに `vote` プロパティがあるか確認

## 📊 動作確認項目チェックリスト

### 投票フェーズ
- [ ] 投票画面が正しく表示される
- [ ] 投票状況が「0 / N 人が投票完了」と表示される
- [ ] 自分以外のプレイヤーがラジオボタンで選択できる
- [ ] 投票確定ボタンを押すと投票が送信される
- [ ] 投票後にボタンが「投票完了」に変わる
- [ ] 投票後にボタンが無効化される
- [ ] 投票後にラジオボタンが無効化される
- [ ] アラート「投票が完了しました。他のプレイヤーの投票を待っています...」が表示される
- [ ] 投票状況が更新される（1 / N、2 / N、...）

### 全員投票完了時
- [ ] 投票状況が「N / N 人が投票完了」になる
- [ ] 自動的に結果画面に遷移する
- [ ] コンソールに `🎉 全員の投票が完了！結果を集計します` が表示される

### 結果画面
- [ ] 勝敗判定が正しく表示される（市民勝利 or ウルフ勝利）
- [ ] ウルフが誰だったか表示される
- [ ] 追放されたプレイヤーが表示される
- [ ] 各プレイヤーの投票先が表示される
- [ ] ウルフは赤色、市民は青色で表示される
- [ ] 投票数の集計が表示される
- [ ] ウルフと市民のお題が表示される

## 📁 修正ファイル一覧

| ファイル | 変更内容 | 行数 |
|---------|---------|------|
| `js/main.js` | 投票完了チェック関数追加 | +28 |
| `js/main.js` | 投票画面表示機能強化 | +25 |
| `js/main.js` | 結果画面表示機能強化 | +20 |
| `js/main.js` | ルーム監視に投票チェック追加 | +2 |
| `index.html` | 投票状況表示UI追加 | +5 |
| `js/version.js` | バージョン更新 (1.0.13 → 1.0.14) | 1 |

**合計変更：** 6ファイル、約81行

## 🎯 改善効果

### Before (v1.0.13以前)
- ❌ 誰か一人の投票で即座に結果表示
- ❌ 他のプレイヤーが投票できない
- ❌ 投票状況が分からない
- ❌ 投票の重複が可能

### After (v1.0.14)
- ✅ 全員の投票完了を待ってから結果表示
- ✅ すべてのプレイヤーが投票できる
- ✅ 投票状況がリアルタイム表示
- ✅ 投票後は再投票不可
- ✅ 各プレイヤーの投票先が可視化
- ✅ 公平で透明性の高いゲーム進行

## 📚 関連ドキュメント

- `DEMACIA_VOTING_SYSTEM.md` - デマーシアモードの投票システム（同様の仕組み）
- `README.md` - プロジェクト全体のドキュメント
- `js/game.js` - ワードウルフゲームロジック

---

**バージョン:** v1.0.14  
**更新日:** 2026-02-14  
**作成者:** AI Assistant
