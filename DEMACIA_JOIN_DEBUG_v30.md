# デマーシア入室エラーデバッグ強化 (v30)

## 📋 報告された問題
「デマーシアに心を込めて、で部屋を立ててルームIDを立てたのに、そのIDで友達が入室しようとしたら『ヴァロラントの部屋です』と出ては入れない。修正してください。」

## 🔍 現状分析

### 考えられる原因
1. **ルーム作成時の `gameType` が不正**
   - ルーム作成時に `settings.gameType` が正しく保存されていない可能性
   
2. **入室時の `selectedGameType` が不一致**
   - プレイヤーが選択した `selectedGameType` とルームの `gameType` が一致していない
   
3. **文字列比較の問題**
   - 空白文字や大文字小文字の違いによる比較エラー

### 既存のコード
`js/main.js` の698-703行目でゲームタイプをチェック：

```javascript
if (roomGameType && roomGameType !== selectedGameType) {
  throw new Error(
    `このルームは ${roomGameType.toUpperCase()} 用です。\n` +
    `現在 ${selectedGameType.toUpperCase()} を選択しています。\n` +
    `ゲーム選択画面に戻ってゲームタイプを変更してください。`
  );
}
```

## ✅ 実装内容

### 1. デバッグログの強化

#### デマーシアルーム参加時（693-712行）
```javascript
// デマーシアルームに参加
const roomGameType = demaciaData?.settings?.gameType;
console.log('🔍 デマーシア - ルームのゲームタイプ:', roomGameType, '(type:', typeof roomGameType, ')');
console.log('🔍 デマーシア - 選択中のゲームタイプ:', selectedGameType, '(type:', typeof selectedGameType, ')');
console.log('🔍 デマーシア - 完全なルームデータ:', demaciaData);
console.log('🔍 デマーシア - 比較結果:', roomGameType === selectedGameType);

// ゲームタイプが一致するかチェック
if (roomGameType && roomGameType !== selectedGameType) {
  const errorMsg = 
    `このルームは ${roomGameType.toUpperCase()} 用です。\n` +
    `現在 ${selectedGameType.toUpperCase()} を選択しています。\n` +
    `ゲーム選択画面に戻ってゲームタイプを変更してください。`;
  console.error('❌ ゲームタイプ不一致エラー:', errorMsg);
  console.error('  - roomGameType:', roomGameType, '(length:', roomGameType.length, ')');
  console.error('  - selectedGameType:', selectedGameType, '(length:', selectedGameType.length, ')');
  throw new Error(errorMsg);
}
```

#### ワードウルフルーム参加時（650-667行）
同様のデバッグログを追加

### 2. ログ出力内容
- ルームの `gameType` の値と型
- 選択中の `selectedGameType` の値と型
- 完全なルームデータ（`demaciaData` / `wordwolfData`）
- 文字列比較の結果（`===`）
- 文字列の長さ（空白文字検出用）

## 🧪 テスト手順

### A. ルーム作成側（ホスト）
1. **完全リロード**: Ctrl+Shift+R (Mac: Cmd+Shift+R)
2. **デマーシアモード選択**: 「デマーシアに心を込めて」をクリック
3. **ゲームタイプ選択**: LOL または VALORANT を選択
4. **ルーム作成**: プレイヤー名を入力して「作成」
5. **コンソール確認**: 
   ```
   ✅ デマーシアルーム作成成功: XXXXXX
   🔍 作成確認: 成功
   🔍 確認データ: { settings: { gameType: "lol" }, ... }
   ```
6. **ルームIDをコピー**: 6桁の数字をメモ

### B. ルーム参加側（ゲスト）
1. **完全リロード**: Ctrl+Shift+R (Mac: Cmd+Shift+R)
2. **デマーシアモード選択**: 「デマーシアに心を込めて」をクリック
3. **ゲームタイプ選択**: **ホストと同じ**ゲームタイプを選択
   - ホストがLOLなら、ゲストもLOL
   - ホストがVALORANTなら、ゲストもVALORANT
4. **ルーム参加**: ルームIDとプレイヤー名を入力して「参加」
5. **コンソール確認**: 
   ```
   🔍 デマーシア - ルームのゲームタイプ: lol (type: string)
   🔍 デマーシア - 選択中のゲームタイプ: lol (type: string)
   🔍 デマーシア - 比較結果: true
   ✅ デマーシアルーム参加成功
   ```

### C. エラーが出た場合
コンソールに以下の情報が表示されます：
```
❌ ゲームタイプ不一致エラー: このルームは VALORANT 用です。...
  - roomGameType: valorant (length: 8)
  - selectedGameType: lol (length: 3)
```

この情報をコピーして報告してください。

## 📊 期待される結果

### 正常ケース
| ホスト | ゲスト | 結果 |
|--------|--------|------|
| LOL | LOL | ✅ 参加成功 |
| VALORANT | VALORANT | ✅ 参加成功 |

### エラーケース
| ホスト | ゲスト | 結果 |
|--------|--------|------|
| LOL | VALORANT | ❌ エラー表示（正常） |
| VALORANT | LOL | ❌ エラー表示（正常） |

## 🔧 変更ファイル
- `js/main.js` (+24行、デバッグログ追加、v29→v30)
- `index.html` (バージョン更新)
- `DEMACIA_JOIN_DEBUG_v30.md` (このドキュメント)

## 🎯 次のステップ
1. プレビューで完全リロード (Ctrl+Shift+R)
2. 上記のテスト手順 A→B を実施
3. エラーが出た場合、コンソールログ全体をコピーして報告
4. 特に以下の情報が重要：
   - `🔍 デマーシア - ルームのゲームタイプ:`
   - `🔍 デマーシア - 選択中のゲームタイプ:`
   - `🔍 デマーシア - 比較結果:`
   - エラーメッセージ全文

## 📝 技術詳細

### ルーム作成時のデータ構造
```javascript
{
  host: "プレイヤー名",
  gameMode: "demacia",
  settings: {
    playerCount: 10,
    roundCount: 5,
    performerSelection: "random",
    gameType: "lol" // または "valorant"
  },
  players: {...},
  gameState: "waiting",
  currentRound: 0,
  createdAt: 1234567890
}
```

### ゲームタイプの値
- `"lol"` - League of Legends
- `"valorant"` - VALORANT

（すべて小文字で保存されます）

---
**修正日**: 2026-02-17  
**バージョン**: v30  
**関連ファイル**: `js/main.js`, `index.html`  
**ステータス**: デバッグ強化完了、実際のエラーログ待ち
