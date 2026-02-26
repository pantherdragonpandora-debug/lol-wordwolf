# デマーシア入室エラー修正 (v32/v19)

## 📋 報告されたエラーログ
```
🔍 ルームのゲームタイプ: lol 選択中: lol
✅ デマーシアルームに参加処理を開始
❌ ルーム参加エラー: Error: ルームへの参加に失敗しました
```

## 🔍 原因
`DemaciaGame` クラスのコンストラクタに `gameType` パラメータが定義されていなかったため、`this.gameType` が `undefined` になっていました。

### エラーの流れ
```
main.js (725行):
  currentDemaciaGame = new DemaciaGame(roomId);
  // gameType が渡されていない！

demacia-game.js (6行):
  constructor(roomId) {
    this.gameType = undefined;  // 設定されていない
  }

demacia-game.js (84-93行):
  joinRoom(playerName) {
    const roomGameType = room.settings?.gameType;  // "lol"
    if (roomGameType && roomGameType !== this.gameType) {
      // "lol" !== undefined → true
      // エラー表示（本来は不一致ではない）
      return false;
    }
  }

main.js (726行):
  const success = await currentDemaciaGame.joinRoom(playerName);
  if (success) {
    // success が false なので実行されない
  } else {
    throw new Error('ルームへの参加に失敗しました');  // ここでエラー！
  }
```

## ✅ 修正内容

### 1. DemaciaGame コンストラクタの修正
`gameType` パラメータを追加し、インスタンス変数に保存：

**変更前:**
```javascript
class DemaciaGame {
  constructor(roomId) {
    this.roomRef = firebase.database().ref(`demacia_rooms/${roomId}`);
    this.roomId = roomId;
    this.roomData = null;
  }
}
```

**変更後:**
```javascript
class DemaciaGame {
  constructor(roomId, gameType = 'lol') {
    this.roomRef = firebase.database().ref(`demacia_rooms/${roomId}`);
    this.roomId = roomId;
    this.gameType = gameType;
    this.roomData = null;
    console.log('🎭 DemaciaGame constructor:', { roomId, gameType });
  }
}
```

### 2. ルーム作成時の修正（main.js 491行）
**変更前:**
```javascript
currentDemaciaGame = new DemaciaGame(currentRoomId);
```

**変更後:**
```javascript
currentDemaciaGame = new DemaciaGame(currentRoomId, selectedGameType);
```

### 3. ルーム参加時の修正（main.js 725行）
**変更前:**
```javascript
currentDemaciaGame = new DemaciaGame(roomId);
```

**変更後:**
```javascript
currentDemaciaGame = new DemaciaGame(roomId, selectedGameType);
```

## 📊 修正前後の比較

### 修正前
| 処理 | this.gameType | room.settings.gameType | 比較結果 | 動作 |
|------|--------------|----------------------|---------|------|
| ルーム作成 | undefined | lol | undefined !== lol | ❌ エラー |
| ルーム参加 | undefined | lol | undefined !== lol | ❌ エラー |

### 修正後
| 処理 | this.gameType | room.settings.gameType | 比較結果 | 動作 |
|------|--------------|----------------------|---------|------|
| ルーム作成 | lol | lol | lol === lol | ✅ 成功 |
| ルーム参加 | lol | lol | lol === lol | ✅ 成功 |

## 🔧 変更ファイル
- `js/demacia-game.js` (コンストラクタ修正、v18→v19)
- `js/main.js` (インスタンス作成時に gameType 追加、v31→v32)
- `index.html` (バージョン更新)
- `DEMACIA_JOIN_FIX_v32.md` (このドキュメント)

## 🧪 テスト手順

### 1. 完全リロード
Ctrl+Shift+R (Mac: Cmd+Shift+R)

### 2. コンソール確認
```
🎭 DemaciaGame constructor: { roomId: "XXXXXX", gameType: "lol" }
```

### 3. ルーム作成テスト（ホスト）
1. デマーシアモード選択
2. LOL選択
3. プレイヤー名入力 → 「作成」
4. **期待される結果**:
   ```
   🎭 DemaciaGame constructor: { roomId: "123456", gameType: "lol" }
   ✅ DemaciaGameインスタンス作成成功
   🔧 createRoom開始
   - ゲームタイプ: lol
   ✅ デマーシアルーム作成成功: 123456
   ```

### 4. ルーム参加テスト（ゲスト）
1. デマーシアモード選択
2. LOL選択（**ホストと同じ**）
3. ルームIDとプレイヤー名入力 → 「参加」
4. **期待される結果**:
   ```
   🔍 ルーム参加試行: 123456 プレイヤー: ゲスト名
   🎮 選択中のゲームタイプ: lol
   🔍 デマーシアルームを確認: demacia_rooms/123456
   ✅ デマーシアルームが存在します
   🔍 デマーシア - ルームのゲームタイプ: lol (type: string)
   🔍 デマーシア - 選択中のゲームタイプ: lol (type: string)
   🔍 デマーシア - 比較結果: true
   🎭 DemaciaGame constructor: { roomId: "123456", gameType: "lol" }
   ✅ デマーシアルームに参加処理を開始
   ✅ ルーム参加: ゲスト名
   ✅ デマーシアルーム参加成功
   ```

### 5. クロスゲームタイプテスト（エラーケース）
1. ホスト: LOLで部屋作成
2. ゲスト: VALORANTを選択して参加試行
3. **期待される結果**:
   ```
   🔍 デマーシア - ルームのゲームタイプ: lol
   🔍 デマーシア - 選択中のゲームタイプ: valorant
   🔍 デマーシア - 比較結果: false
   ❌ ゲームタイプ不一致エラー: このルームは LOL 用です。
   現在 VALORANT を選択しています。
   ゲーム選択画面に戻ってゲームタイプを変更してください。
   ```

## 📝 技術詳細

### デフォルト引数の追加
```javascript
constructor(roomId, gameType = 'lol')
```

- `gameType` が渡されない場合は `'lol'` をデフォルト値として使用
- 下位互換性を保つための措置（古いコードでも動作する）

### コンストラクタのログ出力
```javascript
console.log('🎭 DemaciaGame constructor:', { roomId, gameType });
```

- インスタンス作成時に `roomId` と `gameType` を確認できる
- デバッグが容易になる

## 🎯 修正効果

### Before（v18/v31）
- ❌ LOL部屋にLOLで参加 → エラー
- ❌ VALORANT部屋にVALORANTで参加 → エラー
- ❌ すべてのデマーシアルーム参加が失敗

### After（v19/v32）
- ✅ LOL部屋にLOLで参加 → 成功
- ✅ VALORANT部屋にVALORANTで参加 → 成功
- ✅ ゲームタイプ不一致時のみエラー（正常）

---
**修正日**: 2026-02-17  
**バージョン**: demacia-game.js v19, main.js v32  
**関連ファイル**: `js/demacia-game.js`, `js/main.js`, `index.html`  
**ステータス**: ✅ 修正完了
