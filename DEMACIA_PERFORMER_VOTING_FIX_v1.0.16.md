# デマーシア入室エラー詳細デバッグ (v31)

## 📋 報告された問題（再発）
「デマーシアに心を込めて、でLOLの部屋を立ててルームIDを立てたのに、そのIDで友達が入室しようとしたら『ヴァロラントの部屋です』と出ては入れない。」

## 🔍 現状

### v30で追加したデバッグログ
以下の情報がコンソールに表示されるはずです：

#### ホスト側（ルーム作成）
```
🎮 Game selected: lol
🎮 Current mode: demacia
✅ selectedGameType set to: lol
🎭 デマーシアゲーム作成開始
- ルームID: XXXXXX
- プレイヤー名: ホスト名
- ゲームタイプ: lol
デマーシアゲーム作成結果: true
📊 作成したルームの設定:
  - gameType: lol
  - playerCount: 10
  - roundCount: 5
```

#### ゲスト側（ルーム参加）
```
🎮 Game selected: ??? (ここが重要！)
🎮 Current mode: demacia
✅ selectedGameType set to: ???
🔍 ルーム参加試行: XXXXXX プレイヤー: ゲスト名
🎮 選択中のゲームタイプ: ???
🎭 選択中のゲームモード: demacia
🔍 デマーシアルームを確認: demacia_rooms/XXXXXX
✅ デマーシアルームが存在します
🔍 デマーシア - ルームのゲームタイプ: lol (type: string)
🔍 デマーシア - 選択中のゲームタイプ: ??? (type: string)
🔍 デマーシア - 比較結果: false
❌ ゲームタイプ不一致エラー: このルームは LOL 用です。
現在 VALORANT を選択しています。
  - roomGameType: lol (length: 3)
  - selectedGameType: valorant (length: 8)
```

## ✅ v31で追加したデバッグ強化

### 1. ゲームタイプ選択時のログ強化
`selectGame()` 関数でより詳細なログを出力：

```javascript
function selectGame(gameType) {
  console.log('🎮 Game selected:', gameType);
  console.log('🎮 Current mode:', selectedGameMode);
  selectedGameType = gameType;
  console.log('✅ selectedGameType set to:', selectedGameType);
  // ...
}
```

### 2. ルーム作成時のログ強化
デマーシアルーム作成時に設定値を明確に表示：

```javascript
console.log('📊 作成したルームの設定:');
console.log('  - gameType:', selectedGameType);
console.log('  - playerCount: 10');
console.log('  - roundCount: 5');
```

## 🧪 テスト手順

### 重要：両方の画面でコンソールを開いてください！

#### A. ホスト側（ルーム作成）
1. **完全リロード**: Ctrl+Shift+R (Mac: Cmd+Shift+R)
2. **コンソールを開く**: F12キー → Console タブ
3. **デマーシアモード選択**: 「デマーシアに心を込めて」をクリック
4. **LOL選択**: 「LOL」ボタンをクリック
5. **コンソール確認**:
   ```
   🎮 Game selected: lol
   🎮 Current mode: demacia
   ✅ selectedGameType set to: lol
   ```
6. **ルーム作成**: プレイヤー名入力 → 「作成」
7. **コンソール確認**:
   ```
   🎭 デマーシアゲーム作成開始
   - ゲームタイプ: lol
   📊 作成したルームの設定:
     - gameType: lol
   ```
8. **ルームIDをコピー**: 画面に表示される6桁の数字

#### B. ゲスト側（ルーム参加）
1. **完全リロード**: Ctrl+Shift+R (Mac: Cmd+Shift+R)
2. **コンソールを開く**: F12キー → Console タブ
3. **デマーシアモード選択**: 「デマーシアに心を込めて」をクリック
4. **LOL選択**: 「LOL」ボタンをクリック（**ホストと同じ**）
5. **コンソール確認**:
   ```
   🎮 Game selected: lol
   🎮 Current mode: demacia
   ✅ selectedGameType set to: lol
   ```
6. **ルーム参加**: ホストからもらったルームIDとプレイヤー名を入力 → 「参加」
7. **コンソール確認**:
   ```
   🔍 ルーム参加試行: XXXXXX
   🎮 選択中のゲームタイプ: lol
   🔍 デマーシア - ルームのゲームタイプ: lol (type: string)
   🔍 デマーシア - 選択中のゲームタイプ: lol (type: string)
   🔍 デマーシア - 比較結果: true
   ✅ デマーシアルーム参加成功
   ```

### C. エラーが出た場合

#### エラーメッセージが出た場合、以下の情報をすべてコピーしてください：

**ホスト側のコンソール（ルーム作成時）:**
```
🎮 Game selected: ???
🎮 Current mode: ???
✅ selectedGameType set to: ???
🎭 デマーシアゲーム作成開始
- ゲームタイプ: ???
📊 作成したルームの設定:
  - gameType: ???
```

**ゲスト側のコンソール（ルーム参加時）:**
```
🎮 Game selected: ???
🎮 Current mode: ???
✅ selectedGameType set to: ???
🔍 デマーシア - ルームのゲームタイプ: ??? (type: string)
🔍 デマーシア - 選択中のゲームタイプ: ??? (type: string)
🔍 デマーシア - 比較結果: false
❌ ゲームタイプ不一致エラー: このルームは ??? 用です。
現在 ??? を選択しています。
  - roomGameType: ??? (length: ?)
  - selectedGameType: ??? (length: ?)
```

## 🔍 考えられる原因

### 1. ゲスト側が間違ったゲームタイプを選択
- ホストが「LOL」を選択
- ゲストが「VALORANT」を選択してしまった

### 2. ゲスト側がゲームタイプ選択をスキップ
- `selectedGameType` が `null` または `undefined`
- エラーチェックが不十分

### 3. ブラウザキャッシュ問題
- 古いバージョンのスクリプトが残っている
- 完全リロードで解決する可能性

### 4. 複数タブで操作
- タブAでLOL選択、タブBでVALORANT選択
- グローバル変数が上書きされている

## 🔧 変更ファイル
- `js/main.js` (+8行、デバッグログ追加、v30→v31)
- `index.html` (バージョン更新)
- `DEMACIA_JOIN_DEBUG_v31.md` (このドキュメント、v30から更新)

## 📝 次のアクション

### もしエラーが再発したら：
1. **両方の画面でコンソールログを完全にコピー**
2. **スクリーンショットを撮影**（エラーメッセージとコンソール）
3. **以下の情報を報告**:
   - ホスト側のログ全体
   - ゲスト側のログ全体
   - どちらの画面で、どのボタンを押したか
   - エラーメッセージの全文

### もしエラーが出なかったら：
- v30のデバッグログで原因が特定できたことになります
- 正常に参加できるようになったことを確認してください

---
**修正日**: 2026-02-17  
**バージョン**: v31  
**関連ファイル**: `js/main.js`, `index.html`  
**前バージョン**: `DEMACIA_JOIN_DEBUG_v30.md`  
**ステータス**: デバッグログ強化完了、実際のログ待ち
