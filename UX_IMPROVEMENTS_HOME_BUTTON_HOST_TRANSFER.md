# UX改善: スタート画面ボタン & ホスト移譲機能

## 🚀 実装日: 2026年2月16日

## 📋 実装内容

### 1. スタート画面に戻るボタン 🏠

#### 機能概要
すべての画面に固定位置の「スタート画面に戻る」ボタンを追加。いつでもモード選択画面（最初の画面）に戻れるようになりました。

#### UI仕様
- **位置**: 画面右上に固定表示
- **デザイン**: 紫色の半透明ボタン、ブラー効果
- **アイコン**: 🏠 ホームアイコン
- **表示制御**: スタート画面では非表示、それ以外の画面では表示

#### 動作
1. ボタンをクリック
2. 確認ダイアログ表示:
   ```
   スタート画面に戻りますか？
   進行中のゲームがある場合は退出されます。
   ```
3. 「OK」をクリック:
   - 現在のゲームから自動退出
   - すべての変数をリセット
   - モード選択画面に戻る

#### 技術実装

**CSS** (`css/style.css`):
```css
.btn-home-fixed {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  background: rgba(99, 102, 241, 0.9);
  color: white;
  border: 2px solid rgba(99, 102, 241, 1);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  backdrop-filter: blur(10px);
}
```

**HTML** (`index.html`):
```html
<button id="btn-home-fixed" class="btn-home-fixed" style="display: none;" onclick="goToStart()">
    🏠 スタート画面に戻る
</button>
```

**JavaScript** (`js/main.js`):
```javascript
function goToStart() {
  const confirmMsg = 'スタート画面に戻りますか？\n進行中のゲームがある場合は退出されます。';
  if (!confirm(confirmMsg)) return;
  
  // 現在のゲームから退出
  // 変数をリセット
  // モード選択画面に戻る
  showScreen('mode-select-screen');
}
```

---

### 2. ホスト移譲機能 👑

#### 機能概要
ホストが部屋から退出した場合、次に入室していたプレイヤーが自動的に新しいホストになる機能。

#### 動作フロー

**Before（修正前）**:
```
ホストが退出 → 部屋は存在するがホストがいない → 誰もゲームを開始できない
```

**After（修正後）**:
```
ホストが退出 → 次の人が自動的にホストに昇格 → 新しいホストがゲームを開始できる
```

#### 全モード対応

##### 1. ワードウルフモード (`js/game.js`)

```javascript
async leaveRoom(playerName) {
  // ルームデータを取得
  const snapshot = await this.roomRef.once('value');
  const roomData = snapshot.val();
  
  const isHost = roomData.host === playerName;
  
  // プレイヤーを削除
  await this.roomRef.child(`players/${playerName}`).remove();
  
  // 残りのプレイヤーを確認
  const playersSnapshot = await this.roomRef.child('players').once('value');
  const remainingPlayers = playersSnapshot.val();
  
  if (!remainingPlayers || Object.keys(remainingPlayers).length === 0) {
    // 全員退出したらルーム削除
    await this.roomRef.remove();
    return true;
  }
  
  // ホストが退出した場合、次の人をホストに昇格
  if (isHost) {
    const newHostName = Object.keys(remainingPlayers)[0];
    await this.roomRef.update({ host: newHostName });
    console.log(`✅ ホスト移譲: ${playerName} → ${newHostName}`);
  }
}
```

##### 2. デマーシアモード (`js/demacia-game.js`)

```javascript
async leaveRoom(playerName) {
  // ... 同様の処理 ...
  
  // ホストが退出した場合
  if (isHost) {
    const newHostName = Object.keys(remainingPlayers)[0];
    await this.roomRef.update({ host: newHostName });
    await this.roomRef.child(`players/${newHostName}/isHost`).set(true);
    console.log(`✅ デマーシアホスト移譲: ${playerName} → ${newHostName}`);
  }
}
```

##### 3. ヴォイドモード (`js/void-game.js`)

```javascript
async leaveRoom(playerName) {
  // ... プレイヤー削除処理 ...
  
  // ホストが退出した場合
  if (isHost && newOrder.length > 0) {
    const newHostName = newOrder[0];
    await this.roomRef.update({ hostName: newHostName });
    await this.roomRef.child(`players/${newHostName}/isHost`).set(true);
    console.log(`✅ ヴォイドホスト移譲: ${playerName} → ${newHostName}`);
  }
}
```

---

## 🎯 ユーザーシナリオ

### シナリオ1: スタート画面に戻る

**状況**: ワードウルフの待機画面でやっぱりデマーシアをやりたくなった

**手順**:
1. 画面右上の「🏠 スタート画面に戻る」をクリック
2. 確認ダイアログで「OK」
3. モード選択画面に戻る
4. デマーシアを選択
5. ゲームタイプを選択
6. ルームを作成

**効果**: 簡単にモード変更が可能

---

### シナリオ2: ホストが退出

**状況**: 4人でワードウルフをプレイ中、ホストが急用で退出

**Before（修正前）**:
```
プレイヤーA (ホスト) 退出
↓
プレイヤーB, C, D が残る
↓
誰も「ゲーム開始」ボタンを押せない
↓
全員が退出してやり直し
```

**After（修正後）**:
```
プレイヤーA (ホスト) 退出
↓
プレイヤーB が自動的にホストに昇格 👑
↓
プレイヤーB が「ゲーム開始」ボタンを押せる
↓
残りのメンバーでゲーム続行
```

**効果**: ホスト退出時もスムーズにゲーム続行可能

---

## 📁 変更ファイル一覧

### 1. CSS
- **`css/style.css`** (+40行)
  - `.btn-home-fixed` スタイル追加
  - ホバー効果・シャドウ・ブラー効果
  - モバイル対応のレスポンシブデザイン

### 2. HTML
- **`index.html`** (+3行)
  - 固定ボタンの追加

### 3. JavaScript

#### `js/main.js` (+85行)
- `updateHomeButton()` - ボタンの表示制御
- `goToStart()` - スタート画面に戻る処理
- `showScreen()` - 画面切り替え時のボタン制御を追加

#### `js/game.js` (+25行)
- `leaveRoom()` - ホスト移譲処理を追加

#### `js/demacia-game.js` (+30行)
- `leaveRoom()` - ホスト移譲処理を追加

#### `js/void-game.js` (+30行)
- `leaveRoom()` - ホスト移譲処理を追加

---

## 🧪 テストケース

### スタート画面に戻るボタン

| 画面 | ボタン表示 | 動作 |
|------|-----------|------|
| モード選択画面 | ❌ 非表示 | - |
| ゲームタイプ選択 | ✅ 表示 | モード選択に戻る |
| ルーム作成画面 | ✅ 表示 | モード選択に戻る |
| 待機画面 | ✅ 表示 | モード選択に戻る（退出） |
| プレイ画面 | ✅ 表示 | モード選択に戻る（退出） |
| 結果画面 | ✅ 表示 | モード選択に戻る |

### ホスト移譲

| シナリオ | 参加者 | ホスト退出後 | 結果 |
|---------|-------|------------|------|
| 2人部屋 | A(ホスト), B | A退出 | B がホストに昇格 ✅ |
| 3人部屋 | A(ホスト), B, C | A退出 | B がホストに昇格 ✅ |
| 4人部屋 | A(ホスト), B, C, D | A退出 | B がホストに昇格 ✅ |
| 1人部屋 | A(ホスト) | A退出 | ルーム削除 ✅ |
| 2人部屋 | A(ホスト), B | B退出 | A はホストのまま ✅ |

---

## 💡 ユーザーへの影響

### メリット

1. **柔軟な操作**
   - いつでもモード変更が可能
   - ゲーム途中でも安心して戻れる

2. **ゲームの継続性**
   - ホスト退出時も他のプレイヤーでゲーム続行
   - 全員でやり直す必要がない

3. **明確なフィードバック**
   - ホスト移譲がコンソールログで確認できる
   - 新しいホストに王冠👑アイコンが表示される

4. **安定性の向上**
   - ホスト不在による進行不能を防止
   - 部屋の解散を自動化

### デメリット

- なし（既存の正常動作には影響なし）

---

## 🔍 動作確認方法

### 1. スタート画面に戻るボタンのテスト

1. モード選択画面を開く
   - ✅ 確認: ボタンが非表示

2. ゲームタイプ選択画面に進む
   - ✅ 確認: ボタンが表示される

3. ボタンをクリック
   - ✅ 確認: 確認ダイアログが表示される

4. 「OK」をクリック
   - ✅ 確認: モード選択画面に戻る

5. ルームを作成して待機画面に進む
6. ボタンをクリック → 確認
   - ✅ 確認: ルームから退出してモード選択画面に戻る

---

### 2. ホスト移譲のテスト

#### 手順A: 2人部屋でホスト退出

1. **デバイスA（ホスト）**: ルームを作成
   - プレイヤー名: `プレイヤーA`
   - ルームID: `ABC123`

2. **デバイスB**: ルームに参加
   - プレイヤー名: `プレイヤーB`
   - ルームID: `ABC123`

3. **デバイスB**: 待機画面を確認
   - ✅ 確認: `プレイヤーA` に王冠👑アイコン
   - ✅ 確認: 「ゲーム開始」ボタンが表示されない

4. **デバイスA（ホスト）**: 「退出」ボタンをクリック

5. **デバイスB**: 画面を確認
   - ✅ 確認: `プレイヤーB` に王冠👑アイコンが移動
   - ✅ 確認: 「ゲーム開始」ボタンが表示される

6. **デバイスB**: 「ゲーム開始」をクリック
   - ✅ 確認: ゲームが正常に開始される

---

#### 手順B: 3人部屋でホスト退出

1. **デバイスA（ホスト）**: ルームを作成
2. **デバイスB, C**: ルームに参加
3. **デバイスA（ホスト）**: 退出
4. **デバイスB, C**: 確認
   - ✅ 確認: `プレイヤーB` がホストに昇格
   - ✅ 確認: ゲームを開始できる

---

## 📚 関連ドキュメント

- `README.md` - プロジェクト全体の説明
- `CROSS_DEVICE_JOIN_FIX.md` - クロスデバイス入室問題の修正
- `MOBILE_CONNECTION_TROUBLESHOOTING.md` - モバイル接続問題の診断

---

## 🎉 まとめ

この実装により、ユーザー体験が大幅に向上しました：

**1. スタート画面に戻るボタン**:
- ✅ すべての画面からモード選択に戻れる
- ✅ 固定位置で常にアクセス可能
- ✅ 美しいデザインとアニメーション

**2. ホスト移譲機能**:
- ✅ ホスト退出時も自動的に次の人がホストに
- ✅ 全モード（ワードウルフ、デマーシア、ヴォイド）対応
- ✅ 部屋の解散を自動化

**これらの改善により、ユーザーは安心してゲームを楽しめるようになりました！**

---

**実装日**: 2026年2月16日  
**対象モード**: すべてのゲームモード  
**影響範囲**: すべてのデバイス（PC、スマホ、タブレット）
