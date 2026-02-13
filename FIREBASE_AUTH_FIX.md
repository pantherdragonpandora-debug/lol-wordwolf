# 🔧 Firebase 承認済みドメイン設定ガイド

## 問題: 「ルームの作成に失敗しました」

GitHub PagesでLOLワードウルフを開くと、ルームが作成できない場合、
**Firebase側でGitHub Pagesのドメインが承認されていない**のが原因です。

---

## ✅ 解決方法：承認済みドメインを追加

### ステップ1: Firebase Consoleを開く

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. **「lol-word-wolf」**プロジェクトをクリック

### ステップ2: Authenticationを開く

1. 左メニューの**「構築」**セクション
2. **「Authentication」**をクリック
3. まだ有効化していない場合：
   - **「始める」**をクリック
   - 何も設定せずOK（後でスキップできます）

### ステップ3: 承認済みドメインを追加

1. 上部タブの**「Settings」**（⚙️歯車アイコンの隣）をクリック
2. 下にスクロールして**「承認済みドメイン」**セクションを探す
3. 現在リストされているドメイン（デフォルト）:
   ```
   ✅ localhost
   ✅ lol-word-wolf.firebaseapp.com
   ```

4. **「ドメインを追加」**ボタンをクリック
5. あなたのGitHub Pagesのドメインを入力：
   ```
   あなたのユーザー名.github.io
   ```
   例：`taro123.github.io`

6. **「追加」**をクリック

### ステップ4: 完了確認

承認済みドメインリストに以下が表示されればOK：
```
✅ localhost
✅ lol-word-wolf.firebaseapp.com
✅ あなたのユーザー名.github.io  ← 新しく追加
```

### ステップ5: サイトをリロード

1. GitHub Pagesのタブに戻る
2. **Ctrl + Shift + R**（スーパーリロード）
3. ルームを作成してみる

---

## 🎯 正確なドメイン名の確認方法

GitHub Pagesのドメインがわからない場合：

### 方法1: GitHub Settingsで確認

1. GitHubリポジトリを開く
2. **「Settings」** → **「Pages」**
3. 上部に表示されているURL:
   ```
   Your site is live at https://username.github.io/lol-wordwolf/
   ```
4. この場合、追加するドメインは：
   ```
   username.github.io
   ```
   **注意**: `/lol-wordwolf/` は含めない

### 方法2: ブラウザのアドレスバーで確認

1. GitHub Pagesのサイトを開く
2. アドレスバーのURLを見る:
   ```
   https://taro123.github.io/lol-wordwolf/
   ```
3. 追加するドメイン:
   ```
   taro123.github.io
   ```

---

## 🔍 追加確認事項

### Firebase Realtime Database のルール

念のため、セキュリティルールも確認します。

1. Firebase Console → **「Realtime Database」**
2. **「ルール」**タブをクリック
3. 以下のルールになっているか確認:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

または

```json
{
  "rules": {
    "rooms": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. 違っている場合は上記に変更して**「公開」**

**⚠️ 注意**: これはテスト用のルールです。本番環境では後で厳格化してください。

---

## 🧪 テスト手順

### テスト1: Firebase接続確認

1. サイトを開く
2. 右上の接続状態を確認:
   - ✅ **緑色「接続中」** → Firebase接続OK
   - ❌ **赤色「切断」** → Firebase接続エラー

### テスト2: コンソールでエラー確認

1. **F12**を押す
2. **Console**タブ
3. 以下のメッセージを確認:
   ```
   ✅ Firebase接続成功  → OK
   ❌ Firebase接続失敗  → エラー
   ```

### テスト3: ルーム作成

1. プレイヤー名を入力
2. 設定を選択
3. **「作成」**をクリック
4. 成功すれば待機室に遷移

---

## 💡 それでもダメな場合

### 追加のドメインパターンを試す

GitHub Pagesのサブパスを使っている場合、以下も追加してみてください：

1. Firebase Console → Authentication → Settings → 承認済みドメイン
2. 以下のドメインを**すべて追加**:
   ```
   username.github.io
   username.github.io/lol-wordwolf
   ```

### ワイルドカードを試す（非推奨だが動作確認用）

```
*.github.io
```

**注意**: ワイルドカードは一時的な確認用です。動作確認後、正確なドメインに変更してください。

---

## 📊 エラー別対処法

### エラー1: "Permission denied"

**原因**: Firebase Realtime Databaseのセキュリティルール

**解決策**:
1. Firebase Console → Realtime Database → ルール
2. 以下に変更:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```

### エラー2: "CORS error" / "Access-Control-Allow-Origin"

**原因**: 承認済みドメインが未設定

**解決策**: 上記の「承認済みドメインを追加」を実行

### エラー3: "Failed to get document because the client is offline"

**原因**: Firebase接続失敗

**解決策**:
1. ブラウザがオフラインでないか確認
2. Firebaseプロジェクトが有効か確認
3. APIキーが正しいか確認（`js/firebase-config.js`）

---

## 🎯 完全な確認チェックリスト

- [ ] Firebase Console → Authentication → Settings → 承認済みドメイン
- [ ] `username.github.io` を追加済み
- [ ] Firebase Realtime Database → ルール → `.read: true, .write: true`
- [ ] サイトをスーパーリロード（Ctrl + Shift + R）
- [ ] 接続状態が「✅ 接続中」
- [ ] Consoleタブにエラーなし
- [ ] ルーム作成成功

---

## 🆘 まだ解決しない場合

以下の情報を教えてください：

1. **ブラウザのConsoleタブのエラーメッセージ**（赤文字）
2. **GitHub PagesのURL**（例: `https://taro123.github.io/lol-wordwolf/`）
3. **接続状態の表示**（✅ 接続中 / ❌ 切断）
4. **承認済みドメインに何を追加しましたか？**

これらの情報があれば、具体的な解決策を提案できます！🚀
