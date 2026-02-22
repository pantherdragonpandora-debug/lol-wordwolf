# X（Twitter）アカウント設定ガイド

## 📝 概要
このドキュメントでは、ブログページとお問い合わせページにあなたのX（Twitter）アカウントを設定する方法を説明します。

## 🔧 設定が必要なファイル

### 1. blog.html（開発者ブログページ）
### 2. contact.html（お問い合わせページ）

## 📍 設定手順

### ステップ1: XのユーザーハンドルIDを確認

あなたのXアカウントのURLを確認してください：
```
https://x.com/YOUR_TWITTER_HANDLE
```

例：
- アカウントURL: `https://x.com/lol_gamer123`
- ユーザーハンドル: `lol_gamer123`

### ステップ2: blog.htmlを編集

`blog.html` の **147行目** を編集します：

**変更前：**
```html
<a href="https://x.com/YOUR_TWITTER_HANDLE" target="_blank" class="social-link" rel="noopener noreferrer">
```

**変更後：**
```html
<a href="https://x.com/lol_gamer123" target="_blank" class="social-link" rel="noopener noreferrer">
```

### ステップ3: contact.htmlを編集

`contact.html` の **126行目** を編集します：

**変更前：**
```html
<a href="https://x.com/YOUR_TWITTER_HANDLE" class="contact-link" target="_blank" rel="noopener noreferrer">@YOUR_TWITTER_HANDLE</a>
```

**変更後：**
```html
<a href="https://x.com/lol_gamer123" class="contact-link" target="_blank" rel="noopener noreferrer">@lol_gamer123</a>
```

## 🔍 簡単な検索・置換方法

### 方法1: テキストエディタで一括置換

1. テキストエディタ（VS Code、Sublime Text など）でプロジェクトを開く
2. 検索（Ctrl+Shift+F または Cmd+Shift+F）を開く
3. **検索:** `YOUR_TWITTER_HANDLE`
4. **置換:** あなたのXユーザーハンドル（例: `lol_gamer123`）
5. 「すべて置換」をクリック

### 方法2: 手動で編集

1. `blog.html` を開く
2. `YOUR_TWITTER_HANDLE` を検索（Ctrl+F または Cmd+F）
3. あなたのXユーザーハンドルに置き換える
4. 保存
5. `contact.html` でも同じ手順を繰り返す

## ✅ 確認方法

### 1. ローカルでテスト
ブラウザで `blog.html` を開き、「Xでフォロー」ボタンをクリックして、あなたのXプロフィールページに正しく遷移するか確認してください。

### 2. デプロイ後の確認
サイトをデプロイした後、以下を確認：
- ブログページの「Xでフォロー」ボタン
- お問い合わせページのXリンク

両方とも、クリックすると正しいXプロフィールページが開くはずです。

## 🎯 設定後の動作

### ブログページ（blog.html）
- 「Xでフォロー」ボタンをクリック → あなたのXプロフィールページが開く
- 「お問い合わせはXのDMで」というメッセージがヘッダーに表示される

### お問い合わせページ（contact.html）
- 「@YOUR_HANDLE」リンクをクリック → あなたのXプロフィールページが開く
- ユーザーがDMを送信できるようになる

## 💡 ヒント

### DMを受け取れるようにする設定

Xの設定で、誰でもDMを送信できるようにする方法：

1. X（Twitter）にログイン
2. 設定 → プライバシーと安全
3. ダイレクトメッセージ → 「すべての人から受信する」をオン

これにより、フォロワー以外からもDMを受け取れます。

### プロフィールを充実させる

お問い合わせ先として機能させるため、以下を設定しておくと良いです：
- プロフィール画像
- カバー画像
- プロフィール説明文（「Esports ワードウルフの開発者」など）
- ピン固定ツイート（サイトへのリンクなど）

## 🚨 トラブルシューティング

### リンクをクリックしても自分のページに飛ばない

**原因1:** `YOUR_TWITTER_HANDLE` が置き換えられていない
- 解決策: ファイルを開いて `YOUR_TWITTER_HANDLE` が残っていないか確認

**原因2:** ブラウザキャッシュの問題
- 解決策: Ctrl+Shift+R（またはCmd+Shift+R）で強制リロード

**原因3:** ユーザーハンドルのスペルミス
- 解決策: Xのプロフィール画面で正しいハンドルをコピー＆ペースト

### DMボタンが表示されない

これはXの仕様です。DMを送るには：
1. プロフィールページに移動
2. 「メッセージ」ボタンをクリック
3. または、プロフィール右上の「...」→「@xxxにダイレクトメッセージを送る」

## 📝 まとめ

1. ✅ `YOUR_TWITTER_HANDLE` をあなたのXユーザーハンドルに置き換える
2. ✅ `blog.html` と `contact.html` の2ファイルを編集
3. ✅ ローカルでテストしてからデプロイ
4. ✅ Xの設定で「すべての人からDMを受信」をオン

これで、ユーザーがあなたに簡単に連絡できるようになります！

---

**最終更新日**: 2026年2月22日  
**バージョン**: 1.0
