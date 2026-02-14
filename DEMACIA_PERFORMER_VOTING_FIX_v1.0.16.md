# 🐛 デマーシア演技者投票画面修正 (v1.0.16)

## 📋 概要
デマーシアモードの投票画面で、演技者側に誤ってワードウルフの投票画面が表示されていた問題を修正しました。

## 🐛 修正前の問題

### 主な問題点
1. **演技者側にワードウルフの投票画面が表示**
   - 演技者がデマーシア投票画面ではなく、ワードウルフの「誰がウルフですか？」画面を見る
   - プレイヤー選択画面が表示される
   - 混乱を招く

2. **ゲームモード判定の不完全性**
   - 古いルーム（`gameMode`フィールドなし）で判定が失敗
   - `currentDemaciaGame`の存在確認が不足

3. **演技者用メッセージが不明瞭**
   - シンプルすぎる待機メッセージ
   - 投票状況が見えない

## ✅ 修正内容

### 1. ゲームモード判定の強化 ✨

**currentDemaciaGameの存在確認を追加：**

```javascript
// Before (v1.0.15)
const isDemaciaMode = roomData.gameMode === 'demacia' || 
                      roomData.gameState === 'performer_selection' || 
                      roomData.gameState === 'performing' || 
                      roomData.gameState === 'round_result';

// After (v1.0.16)
const isDemaciaMode = (currentDemaciaGame !== null) ||  // 追加！
                      roomData.gameMode === 'demacia' || 
                      roomData.gameState === 'performer_selection' || 
                      roomData.gameState === 'performing' || 
                      roomData.gameState === 'round_result';
```

**効果：**
- デマーシアゲームインスタンスが存在すればデマーシアモードと判定
- 古いルームでも確実にデマーシア画面を表示
- フォールバック判定が確実に動作

### 2. 演技者用画面の改善 🎭

**Before（v1.0.15）：**
```javascript
optionsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #c89b3c;">👀 他のプレイヤーの投票を待っています...</p>';
```

**After（v1.0.16）：**
```javascript
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
```

**改善点：**
- 📊 投票状況をリアルタイム表示
- 🎨 視覚的に分かりやすいデザイン
- 💬 明確なメッセージ「あなたは演技者です」
- 🌈 グラデーション背景で待機画面を強調

### 3. デバッグログの追加 🔍

```javascript
function showDemaciaVotingScreen() {
  console.log('🎭 デマーシア投票画面を表示します');
  
  const isPerformer = roomData.currentPerformer === currentPlayer;
  
  console.log('🎭 演技者判定:', {
    currentPerformer: roomData.currentPerformer,
    currentPlayer: currentPlayer,
    isPerformer: isPerformer
  });
  
  if (isPerformer) {
    console.log('🎭 演技者用の画面を表示します');
    // ...
  } else {
    console.log('🗳️ 投票者用の画面を表示します');
    // ...
  }
}
```

**効果：**
- トラブルシューティングが容易
- どの画面が表示されているか一目で分かる
- 問題の早期発見

## 📊 実装フロー

### デマーシア投票画面の表示フロー

```
1. 演技フェーズ終了
   - 演技者が「投票を開始」ボタンを押す
   - gameState が 'voting' に変更
   ↓
2. ゲームモード判定
   - currentDemaciaGame !== null → デマーシアモード確定
   - または gameMode === 'demacia' → デマーシアモード
   - または gameState === 'performer_selection' など → デマーシアモード
   ↓
3. showDemaciaVotingScreen() 実行
   - コンソール: '🎭 デマーシア投票画面を表示します'
   ↓
4. 演技者判定
   - roomData.currentPerformer === currentPlayer ?
   ↓
5a. 演技者の場合
   - コンソール: '🎭 演技者用の画面を表示します'
   - セリフを表示
   - 待機画面を表示:
     * 大きな👀アイコン
     * 「投票をお待ちください」
     * 「あなたは演技者です」
     * 投票状況: X / Y 人が投票完了
   - 投票ボタンを非表示
   ↓
5b. 投票者の場合
   - コンソール: '🗳️ 投票者用の画面を表示します'
   - セリフを表示
   - 6つのシチュエーション選択肢を表示
   - 投票ボタンを表示
   ↓
6. デマーシア投票画面（demacia-voting-screen）を表示
   - コンソール: '✅ Screen activated: demacia-voting-screen'
```

## 📁 修正ファイル一覧

| ファイル | 変更内容 | 行数 |
|---------|---------|------|
| `js/main.js` | ゲームモード判定強化 | +1 |
| `js/main.js` | 演技者画面改善 | +15, -2 |
| `js/main.js` | デバッグログ追加 | +13 |
| `js/version.js` | v1.0.16に更新 | +1, -1 |
| **合計** | **2ファイル** | **+30, -3** |

## 🧪 テスト方法

### 基本的な動作確認（3人以上推奨）

#### 1. ゲーム開始
```
- プレイヤー1: デマーシア → League of Legends → 部屋作成
- プレイヤー2, 3: ルームコード入力 → 参加
- プレイヤー1: ゲーム開始
```

#### 2. 演技フェーズ
```
- ランダムで演技者が選択される（例: Player2）
- Player2: セリフとシチュエーションを確認
- Player2: 演技を行う
- Player2: 「投票を開始」ボタンを押す
```

#### 3. 投票画面（ここが修正点！）

**演技者側（Player2）：**
```
✅ デマーシア投票画面が表示される
✅ セリフが表示される: 「デマーシアァァァァ！」
✅ 待機画面が表示される:
   - 👀 大きなアイコン
   - 「投票をお待ちください」
   - 「あなたは演技者です。他のプレイヤーが投票を完了するまでお待ちください。」
   - 「投票状況: 0 / 2 人が投票完了」
✅ 投票ボタンは表示されない

❌ ワードウルフの「誰がウルフですか？」は表示されない
❌ プレイヤー選択画面は表示されない
```

**投票者側（Player1, Player3）：**
```
✅ デマーシア投票画面が表示される
✅ 「演技者はどのシチュエーションを演じていましたか？」と表示
✅ 6つのシチュエーション選択肢が表示される
✅ 投票状況「0 / 2 人が投票完了」表示
```

#### 4. 投票実行
```
- Player1が投票
  ✅ 演技者側の投票状況「1 / 2 人が投票完了」に更新
  
- Player3が投票
  ✅ 演技者側の投票状況「2 / 2 人が投票完了」に更新
  ✅ 自動的に結果画面に遷移
```

### コンソールログの確認

**演技者側（Player2）：**
```
🎭 デマーシア投票画面を表示します
🎭 演技者判定: {currentPerformer: "Player2", currentPlayer: "Player2", isPerformer: true}
🎭 演技者用の画面を表示します
✅ Screen activated: demacia-voting-screen

🗳️ デマーシア投票状況: 0/2
🗳️ デマーシア投票状況: 1/2
🗳️ デマーシア投票状況: 2/2
🎉 デマーシア全員の投票が完了！
```

**投票者側（Player1）：**
```
🎭 デマーシア投票画面を表示します
🎭 演技者判定: {currentPerformer: "Player2", currentPlayer: "Player1", isPerformer: false}
🗳️ 投票者用の画面を表示します
✅ Screen activated: demacia-voting-screen

📤 投票送信中: Player1 → 0
✅ 投票完了: Player1 → ペンタキルを決めた時 (正解)
```

## 🔍 トラブルシューティング

### 問題1: 演技者側にワードウルフの投票画面が表示される

**原因：**
- ブラウザキャッシュが古いバージョン
- ゲームモード判定が失敗している

**対処法：**
1. スーパーリロード（Ctrl/Cmd + Shift + R）
2. `getAppVersion()` で "1.0.16" を確認
3. コンソールで `🎭 デマーシア投票画面を表示します` が表示されるか確認
4. コンソールで `🎭 演技者用の画面を表示します` が表示されるか確認
5. `currentDemaciaGame` が null でないか確認

### 問題2: 演技者側の投票状況が更新されない

**原因：**
- 演技者画面が再レンダリングされていない
- Firebaseのリアルタイム監視が動作していない

**対処法：**
1. コンソールで `🗳️ デマーシア投票状況: X/Y` が表示されるか確認
2. `checkDemaciaVotingComplete()` が実行されているか確認
3. ページをリロード

### 問題3: 「投票をお待ちください」画面が表示されない

**原因：**
- `isPerformer` 判定が正しくない
- `currentPlayer` と `roomData.currentPerformer` が一致していない

**対処法：**
1. コンソールで演技者判定ログを確認:
   ```
   🎭 演技者判定: {
     currentPerformer: "Player2",
     currentPlayer: "Player2",
     isPerformer: true
   }
   ```
2. `currentPlayer` 変数が正しく設定されているか確認
3. `roomData.currentPerformer` が正しく保存されているか確認

## 📊 動作確認項目チェックリスト

### 演技者側
- [ ] デマーシア投票画面が表示される（ワードウルフではない）
- [ ] セリフが表示される
- [ ] 「投票をお待ちください」と表示される
- [ ] 「あなたは演技者です」メッセージが表示される
- [ ] 投票状況「X / Y 人が投票完了」が表示される
- [ ] 投票ボタンが表示されない
- [ ] 投票状況がリアルタイム更新される

### 投票者側
- [ ] デマーシア投票画面が表示される
- [ ] 「演技者はどのシチュエーションを演じていましたか？」と表示
- [ ] 6つのシチュエーション選択肢が表示される
- [ ] 投票状況「X / Y 人が投票完了」が表示される
- [ ] 投票ボタンが表示される

### コンソールログ
- [ ] `🎭 デマーシア投票画面を表示します` 表示
- [ ] `🎭 演技者判定: {...}` 表示
- [ ] 演技者は `🎭 演技者用の画面を表示します` 表示
- [ ] 投票者は `🗳️ 投票者用の画面を表示します` 表示
- [ ] `✅ Screen activated: demacia-voting-screen` 表示

## 🎯 改善効果

### Before (v1.0.15以前)
- ❌ 演技者側にワードウルフの投票画面
- ❌ 「誰がウルフですか？」と表示
- ❌ プレイヤー選択画面が表示
- ❌ 混乱を招く
- ❌ 投票状況が見えない

### After (v1.0.16)
- ✅ 演技者側にデマーシア投票画面
- ✅ 「投票をお待ちください」と表示
- ✅ 明確な待機画面
- ✅ 視覚的に分かりやすいデザイン
- ✅ 投票状況がリアルタイム表示

## 📚 関連ドキュメント

- `DEMACIA_VOTING_SCREEN_FIX_v1.0.15.md` - デマーシア投票画面修正（v1.0.15）
- `DEMACIA_VOTING_SYSTEM.md` - デマーシア投票システムの完全ガイド
- `README.md` - プロジェクト全体のドキュメント

---

**バージョン:** v1.0.16  
**更新日:** 2026-02-14  
**作成者:** AI Assistant
