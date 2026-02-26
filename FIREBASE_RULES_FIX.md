# 🔧 Firebase Realtime Database ルール設定ガイド

## 問題：承認済みドメインを追加してもルーム作成に失敗する

この場合、**Firebaseのセキュリティルール**が厳しすぎる可能性があります。

---

## ✅ 解決方法：セキュリティルールを修正

### ステップ1: Realtime Databaseのルールを開く

1. [Firebase Console](https://console.firebase.google.com/)
2. **「lol-word-wolf」**プロジェクトをクリック
3. 左メニュー **「構築」** → **「Realtime Database」**
4. 上部タブの **「ルール」** をクリック

### ステップ2: 現在のルールを確認

現在のルールが以下のいずれかになっている可能性があります：

#### パターンA：完全にロック（これが原因）
```json
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```
**問題**: 誰も読み書きできない状態

#### パターンB：認証必須
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
**問題**: ログインしていないと使えない（このアプリは認証なし）

### ステップ3: テストモードのルールに変更

以下のルールに**完全に置き換えて**ください：

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### ステップ4: 公開

1. 右上の **「公開」** または **「Publish」** ボタンをクリック
2. 確認ダイアログが表示されたら **「公開」**

### ステップ5: サイトをテスト

1. [あなたのサイト](https://pantherdragonpandora-debug.github.io/lol-wordwolf/)
2. **Ctrl + Shift + R** でリロード
3. ルーム作成を試す

---

## 🔒 より詳細なルール（推奨）

テストモードで動作確認できたら、以下のより詳細なルールに変更することを推奨します：

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt", "gameState"]
      }
    }
  }
}
```

このルールは：
- ✅ `rooms` 配下のみ読み書き可能
- ✅ インデックスを設定してパフォーマンス向上
- ✅ 不要な場所へのアクセスを防ぐ

---

## 📊 ルール設定の完全ガイド

### 左メニューから「Realtime Database」が見つからない場合

```
🔨 構築 (Build)
  ├─ Authentication
  ├─ Firestore Database
  ├─ Realtime Database    ← ここをクリック
  ├─ Storage
  └─ Hosting
```

または、直接URLでアクセス：
```
https://console.firebase.google.com/project/lol-word-wolf/database/lol-word-wolf-default-rtdb/rules
```

### ルールタブの場所

Realtime Databaseページの上部：

```
┌─────────────────────────────────────┐
│ Realtime Database                    │
│ ┌─────────────────────────────────┐ │
│ │ データ  ルール  バックアップ  │ │  ← 「ルール」をクリック
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

英語表示の場合：
```
│ Data  Rules  Backups  Usage │
        ↑
      これをクリック
```

---

## 🧪 ルール変更後の確認

### 確認1: ルールが正しく反映されているか

1. Realtime Database → ルール タブ
2. 以下が表示されているか：
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### 確認2: 最終公開日時

ルールエディタの下に表示されます：
```
最終公開: 2025-02-11 22:30 JST
```

最近の日時になっていればOK

### 確認3: サイトで動作確認

1. サイトをリロード（Ctrl + Shift + R）
2. F12 → Console タブ
3. 以下が表示されるか確認：
```
✅ Firebase接続成功
```
4. ルーム作成を試す

---

## ⚠️ セキュリティに関する注意

### テストモードのルール（現在推奨中）
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**特徴**:
- ✅ 誰でも読み書き可能
- ✅ 開発・テストに最適
- ⚠️ 本番環境では非推奨（誰でもデータを削除できる）

**使用期限**: 
- 開発中、友達と遊ぶ程度ならOK
- 一般公開する場合は後で変更推奨

### より安全なルール（後で変更推奨）

動作確認後、以下に変更することを推奨：

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['host', 'players', 'settings', 'gameState'])",
        "players": {
          "$playerId": {
            ".validate": "newData.hasChildren(['name', 'joinedAt'])"
          }
        },
        "chat": {
          ".validate": "newData.hasChildren(['player', 'message', 'timestamp'])"
        }
      }
    }
  }
}
```

このルールは：
- ✅ データ構造を検証
- ✅ 必要なフィールドがあるか確認
- ✅ 不正なデータを防ぐ

---

## 🔍 エラー別対処法

### エラー1: "PERMISSION_DENIED"

```
❌ Error: PERMISSION_DENIED: Permission denied
```

**原因**: セキュリティルールが `.read: false` または `.write: false`

**解決策**: 上記の手順でルールを `.read: true, .write: true` に変更

### エラー2: "Database not found"

```
❌ Error: Database not found
```

**原因**: Realtime Databaseが有効化されていない

**解決策**:
1. Firebase Console → Realtime Database
2. **「データベースを作成」** をクリック
3. ロケーション: **asia-southeast1** 選択
4. セキュリティルール: **テストモードで開始**
5. **「有効にする」**

### エラー3: "Invalid authentication credentials"

```
❌ Error: Invalid authentication credentials
```

**原因**: 承認済みドメインが未設定

**解決策**:
1. Authentication → Settings → 承認済みドメイン
2. `pantherdragonpandora-debug.github.io` を追加

---

## 📞 トラブルシューティング手順

### 手順1: Firebase接続確認

サイトの右上に表示される接続状態：
- ✅ **緑色「接続中」** → Firebase接続OK
- ❌ **赤色「切断」** → Firebase接続失敗

### 手順2: Consoleでエラー確認

F12 → Console タブで以下を確認：
```
✅ Firebase接続成功         → OK
❌ Firebase接続失敗         → 設定ミス
❌ PERMISSION_DENIED        → ルール設定ミス
❌ Database not found       → DB未作成
```

### 手順3: データベースURLの確認

`js/firebase-config.js` の `databaseURL` が正しいか確認：
```javascript
databaseURL: "https://lol-word-wolf-default-rtdb.asia-southeast1.firebasedatabase.app"
```

Firebase Console → Realtime Database で表示されるURLと一致しているか

---

## 🎯 完全チェックリスト

- [ ] Realtime Databaseが有効化されている
- [ ] ルールが `.read: true, .write: true`
- [ ] ルールを「公開」した
- [ ] 承認済みドメインに `pantherdragonpandora-debug.github.io` 追加
- [ ] サイトをスーパーリロード（Ctrl + Shift + R）
- [ ] 接続状態が「✅ 接続中」
- [ ] Consoleにエラーなし

すべて✅になればルーム作成できるはずです！

---

## 🆘 まだ解決しない場合

以下の情報を教えてください：

1. **Realtime Database → ルール タブの内容**
   - 現在表示されているJSON全体

2. **ブラウザのConsole（F12）のエラーメッセージ**
   - 赤文字で表示されている内容すべて

3. **接続状態の表示**
   - ✅ 接続中 / ❌ 切断

4. **Realtime Databaseは作成済みですか？**
   - はい / いいえ

これらの情報があれば、確実に解決できます！🚀
