# ヴォイドゲーム 大幅改善アップデート

## 📅 実装日: 2026-02-16

## 🎯 概要
「ヴォイドに届くは光か闇か」ゲームに4つの重要な改善を実装し、ゲーム体験を大幅に向上させました。

## ✨ 新機能

### 1. 回答順番選択機能 ✅
プレイヤーが自分の順番を自由に選択できるようになりました。

#### 機能詳細
- **順番選択フェーズ**: ゲーム開始前に全員が順番を選択
- **重複防止**: 既に選択された順番は選択不可
- **自動開始**: 全員の選択完了で自動的にゲーム開始
- **選択状況表示**: リアルタイムで他プレイヤーの選択状況を確認

#### UI/UX
```
待機画面 → 「ゲーム開始」 → 順番選択画面 → プレイ開始
                              ↓
                    各プレイヤーが1〜N番目を選択
                    ・1番目: テーマを見て3つのワード入力
                    ・最後: ワードを見てテーマを回答
```

#### データ構造
```javascript
{
  gameState: 'selecting_order',
  orderSelections: {
    'player1': 1,
    'player2': 3,
    'player3': 2
  },
  playOrder: ['player1', 'player3', 'player2'] // 確定後
}
```

### 2. 回答済みプレイヤーの修正禁止 ✅
一度回答を送信したプレイヤーは、再度入力できないようになりました。

#### 実装詳細
- **hasSubmittedフラグ**: 各プレイヤーに送信済みフラグを追加
- **入力画面非表示**: 送信済みの場合は待機画面を表示
- **誤操作防止**: 二重送信や誤編集を完全に防止

#### データ構造
```javascript
players: {
  'playerName': {
    joinOrder: 0,
    ready: true,
    isHost: true,
    hasSubmitted: false // 回答済みフラグ
  }
}
```

### 3. 現在のターン表示 ✅
待機中のプレイヤーに、現在何番目の人が回答しているかを表示。

#### 表示内容
- **大きなターン番号**: `3 / 4` のように視覚的に表示
- **回答中プレイヤー名**: 「○○ が回答中...」と表示
- **ローディングアニメーション**: 待機中を示すドット

#### UI例
```
     3 / 4
  太郎 が回答中...
  
  しばらくお待ちください
      ● ● ●
```

### 4. テーマジャンル表示 ✅
ゲーム中、全員がテーマのジャンルを確認できるようになりました。

#### 表示場所
- ✅ 順番選択画面
- ✅ 待機中画面
- ✅ 最初のプレイヤー画面
- ✅ 中間プレイヤー画面
- ✅ 最後のプレイヤー画面

#### 表示ジャンル
**League of Legends**:
- チャンピオン
- アイテム
- 地域
- ゲーム用語

**VALORANT**:
- エージェント
- 武器
- マップ
- ゲーム用語

#### デザイン
```
┌──────────────────┐
│   ジャンル      │
│  チャンピオン    │
└──────────────────┘
```

## 📝 変更ファイル

### 1. `js/void-game.js` (+120行)

#### データ構造の変更
```javascript
// Before
{
  playerOrder: ['player1', 'player2', 'player3'],
  players: {
    'player1': { order: 0, ready: true, isHost: true }
  }
}

// After
{
  playerOrder: ['player1', 'player2', 'player3'], // 参加順
  playOrder: ['player2', 'player1', 'player3'],   // プレイ順（選択後に確定）
  orderSelections: { 'player1': 2, 'player2': 1, 'player3': 3 },
  players: {
    'player1': { 
      joinOrder: 0, 
      ready: true, 
      isHost: true, 
      hasSubmitted: false 
    }
  }
}
```

#### 新規メソッド
```javascript
async startGame()             // 順番選択フェーズへ移行
async selectOrder(player, order)  // 順番を選択
async finalizePlayOrder()     // プレイ順を確定してゲーム開始
```

#### 既存メソッドの更新
```javascript
async submitFirstWords()      // hasSubmittedフラグを設定
async submitWords()           // hasSubmittedフラグを設定
async submitFinalAnswer()     // hasSubmittedフラグを設定
```

### 2. `js/void-main.js` (+180行)

#### 新規関数
```javascript
getThemeCategoryName(category)          // ジャンル名取得（多言語）
showVoidOrderSelectScreen(roomData)     // 順番選択画面表示
updateVoidOrderStatusList(roomData)     // 選択状況更新
updateVoidOrderSelectOptions(roomData)  // ドロップダウン更新
confirmVoidOrder()                      // 順番確定
showVoidWaitingTurnScreen(roomData)     // 待機中画面表示
```

#### 更新された関数
```javascript
onVoidRoomUpdate(roomData)
  // 'selecting_order' ステートに対応

showVoidPlayScreen(roomData)
  // playOrder使用、hasSubmittedチェック追加

showVoidFirstPlayerScreen(roomData)
  // ジャンル表示追加

showVoidMiddlePlayerScreen(roomData)
  // ジャンル表示追加、playOrder使用

showVoidLastPlayerScreen(roomData)
  // ジャンル表示追加
```

### 3. `index.html` (+90行)

#### 新規画面
```html
<!-- 順番選択画面 -->
<div id="void-order-select-screen" class="screen">
  - テーマジャンル表示
  - 選択状況リスト
  - 順番選択ドロップダウン
  - 決定ボタン
</div>

<!-- 待機中画面（他のプレイヤーのターン） -->
<div id="void-waiting-turn-screen" class="screen">
  - テーマジャンル表示
  - 現在のターン表示（3 / 4）
  - 回答中プレイヤー名
  - ローディングアニメーション
</div>
```

#### 既存画面の更新
```html
<!-- 各プレイ画面にジャンル表示を追加 -->
<div style="background: rgba(139, 92, 246, 0.15); ...">
  <div>ジャンル</div>
  <div id="void-first-theme-category">チャンピオン</div>
</div>
```

### 4. `js/i18n.js` (+80行)

#### 新規翻訳キー（4言語対応）
```javascript
// 日本語
'void.alert.selectOrder': '順番を選択してください',
'void.alert.alreadySubmitted': '既に回答済みです',
'void.orderSelect.title': '回答順番を選択',
'void.orderSelect.themeGenre': 'テーマジャンル',
'void.orderSelect.description': '全員が順番を選んでください。',
'void.orderSelect.firstInfo': '1番目：テーマを見て3つのワードを入力',
'void.orderSelect.lastInfo': '最後：ワードを見てテーマを回答',
'void.orderSelect.selectionStatus': '選択状況',
'void.orderSelect.yourOrder': 'あなたの順番',
'void.orderSelect.selectPlaceholder': '選択してください',
'void.orderSelect.confirm': '決定',
'void.orderSelect.selected': '選択済み',
'void.orderSelect.autoStart': '全員が選択するとゲームが自動的に開始されます',
'void.orderSelect.orderSuffix': '番目',
'void.orderSelect.selecting': '選択中...',
'void.waiting.otherTurn': '他のプレイヤーの番です',
'void.waiting.genre': 'ジャンル',
'void.waiting.answering': 'が回答中...',
'void.waiting.pleaseWait': 'しばらくお待ちください',

// 英語、韓国語、中国語も同様に追加
```

## 🎮 ゲームフロー

### Before（改善前）
```
待機画面 → プレイ開始
           ↓
    参加順にプレイ（変更不可）
```

### After（改善後）
```
待機画面 → 順番選択画面 → プレイ開始
           ↓             ↓
    全員が順番を選択   選択した順番でプレイ
                       ↓
              自分の番 → 入力
              他人の番 → 待機画面表示
                       （何番目が回答中か表示）
```

## 🎯 改善効果

### 1. 戦略性の向上
- ✅ 得意な順番を選択可能
- ✅ 1番目：テーマを見たい人
- ✅ 最後：推理が得意な人
- ✅ 中間：伝言役が得意な人

### 2. 公平性の向上
- ✅ 誰でも好きな順番を選べる
- ✅ 早押しではなく、全員が平等に選択

### 3. UX改善
- ✅ 待機中に何が起きているか分かる
- ✅ ジャンルが分かることで難易度調整
- ✅ 誤送信・誤編集の防止

### 4. 多言語対応
- ✅ 日本語、英語、韓国語、中国語に完全対応

## 🔧 技術詳細

### ゲームステート管理
```javascript
gameState: 'waiting'          // 待機中
         ↓
gameState: 'selecting_order'  // 順番選択中
         ↓
gameState: 'playing'          // プレイ中
         ↓
gameState: 'finished'         // 終了
```

### 順番選択アルゴリズム
```javascript
// 1. 各プレイヤーが順番を選択
orderSelections: {
  'player1': 2,
  'player2': 1,
  'player3': 3
}

// 2. 全員選択完了で playOrder を生成
playOrder = []
for (i = 1; i <= playerCount; i++) {
  player = findPlayerByOrder(i)
  playOrder.push(player)
}
// → ['player2', 'player1', 'player3']

// 3. ゲーム開始
gameState = 'playing'
currentTurn = 0  // playOrder[0] の番
```

### 重複防止ロジック
```javascript
async selectOrder(playerName, selectedOrder) {
  const selections = roomData.orderSelections || {};
  const selectedOrders = Object.values(selections);
  
  // 既に選択されていないかチェック
  if (selectedOrders.includes(selectedOrder)) {
    throw new Error('その順番は既に選択されています');
  }
  
  // 保存
  await this.roomRef.child(`orderSelections/${playerName}`).set(selectedOrder);
}
```

### ジャンル表示ロジック
```javascript
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
```

## ✅ テスト項目

### 順番選択
- [x] 全員が異なる順番を選択できる
- [x] 重複選択時にエラー表示
- [x] 全員選択完了で自動開始
- [x] 選択状況がリアルタイム更新
- [x] 選択後は変更不可

### 回答済みフラグ
- [x] 回答送信後にhasSubmittedがtrue
- [x] 回答済みプレイヤーは入力画面非表示
- [x] 待機画面が正しく表示

### ターン表示
- [x] 現在のターン番号が正しく表示
- [x] 回答中プレイヤー名が正しく表示
- [x] ローディングアニメーション動作

### ジャンル表示
- [x] 全画面で正しく表示
- [x] 多言語対応が正常動作
- [x] LOL/VALORANTで正しいジャンル

## 🐛 既知の問題

なし

## 🔮 今後の拡張案

### 1. 順番ランダム選択ボタン
```javascript
// 「ランダム選択」ボタンで自動選択
function randomSelectOrder() {
  const availableOrders = getAvailableOrders();
  const randomOrder = availableOrders[Math.floor(Math.random() * availableOrders.length)];
  selectOrder(currentVoidPlayer, randomOrder);
}
```

### 2. 順番交換機能
```javascript
// プレイヤー間で順番を交換
async swapOrder(player1, player2) {
  const order1 = orderSelections[player1];
  const order2 = orderSelections[player2];
  
  orderSelections[player1] = order2;
  orderSelections[player2] = order1;
}
```

### 3. 順番選択タイムリミット
```javascript
// 30秒以内に選択しないと自動割り当て
setTimeout(() => {
  if (!orderSelections[playerName]) {
    autoAssignOrder(playerName);
  }
}, 30000);
```

## 📊 統計

### コード変更統計
| ファイル | 追加行 | 削除行 | 合計変更 |
|---------|--------|--------|----------|
| js/void-game.js | 120 | 15 | 135 |
| js/void-main.js | 180 | 30 | 210 |
| index.html | 90 | 10 | 100 |
| js/i18n.js | 80 | 0 | 80 |
| **合計** | **470** | **55** | **525** |

### 画面追加
- 順番選択画面（新規）
- 待機中画面（新規）
- 既存画面5つにジャンル表示追加

### 翻訳追加
- 新規キー: 18個
- 対応言語: 4言語（日/英/韓/中）
- 合計翻訳: 72個

## 💡 設計思想

### なぜ順番選択を実装？
1. **プレイヤーの自由度向上**: 戦略的に順番を選べる
2. **公平性の確保**: 全員が平等に選択できる
3. **ゲーム性の向上**: 役割分担が明確になる

### なぜジャンル表示を追加？
1. **難易度調整**: ジャンルが分かることでヒントになる
2. **ゲームバランス**: 完全に分からない→少しヒントあり
3. **プレイヤー要望**: 「難易度が高すぎる」の解決

### なぜ待機画面を追加？
1. **待ち時間の退屈さ解消**: 何が起きているか分かる
2. **進行状況の可視化**: 「いつ自分の番か」が分かる
3. **UX改善**: 画面が変わらないストレスを解消

## 📚 関連ドキュメント

- `VOID_CATEGORY_SELECTION.md` - カテゴリー選択機能
- `VOID_THEME_WORD_VALIDATION.md` - テーマ単語禁止機能
- `VOID_FIREBASE_RULES.md` - Firebaseルール設定
- `RELEASE_NOTES_v1.0.23_patch1.md` - 多言語対応パッチ

## 🎉 まとめ

この大幅アップデートにより：
- ✅ **順番選択**: プレイヤーの戦略性と自由度が大幅向上
- ✅ **回答禁止**: 誤操作防止でゲーム進行がスムーズに
- ✅ **ターン表示**: 待ち時間のストレスを大幅軽減
- ✅ **ジャンル表示**: 難易度調整で誰でも楽しめる

「ヴォイドに届くは光か闇か」が、より戦略的で、公平で、楽しいゲームになりました！

---

**実装者**: AI Assistant  
**レビュー**: Pending  
**ステータス**: ✅ 完了
