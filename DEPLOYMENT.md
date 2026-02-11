# GitHub Pagesへのデプロイ手順 🚀

このガイドでは、LOLワードウルフをGitHub Pagesで公開する方法を、初心者にも分かりやすく説明します。

## 📋 必要なもの

- GitHubアカウント（無料）
- ウェブブラウザ
- このプロジェクトのファイル一式

## 🎯 デプロイ方法（3つの選択肢）

### 方法1: GitHubウェブサイトから直接アップロード（最も簡単）⭐
### 方法2: GitHub Desktop（デスクトップアプリ）を使用
### 方法3: Git コマンドライン（上級者向け）

---

## 方法1: GitHubウェブサイトから直接アップロード（推奨）

この方法はGitの知識が不要で、最も簡単です！

### ステップ1: GitHubアカウントを作成

1. [GitHub.com](https://github.com/) にアクセス
2. 「Sign up」をクリックして無料アカウントを作成
3. メールアドレスを認証

### ステップ2: 新しいリポジトリを作成

1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. 以下のように設定：

```
Repository name: lol-wordwolf
Description: League of Legendsをテーマにしたワードウルフゲーム
Public: ✅ チェック（公開）
Initialize with README: ❌ チェックしない
```

4. 「Create repository」をクリック

### ステップ3: ファイルをアップロード

1. 作成したリポジトリのページで「uploading an existing file」をクリック
2. 以下のファイルをドラッグ&ドロップ：

```
✅ index.html
✅ README.md
✅ DEPLOYMENT.md
✅ .gitignore
✅ css/ フォルダ（style.cssを含む）
✅ js/ フォルダ（data.js, game.js, main.jsを含む）
```

3. 一番下の「Commit changes」をクリック

**注意**: フォルダごとアップロードする場合は、一度に全てのファイルを選択してください。

### ステップ4: GitHub Pagesを有効化

1. リポジトリのページで「Settings」タブをクリック
2. 左サイドバーから「Pages」をクリック
3. 「Source」セクションで以下を設定：

```
Branch: main（または master）
Folder: / (root)
```

4. 「Save」をクリック

### ステップ5: サイトにアクセス

1. 数分待つと、緑色のボックスが表示されます：

```
✅ Your site is live at https://yourusername.github.io/lol-wordwolf/
```

2. このURLをクリックしてサイトにアクセス！

🎉 **完成！友達とURLを共有して遊びましょう！**

---

## 方法2: GitHub Desktopを使用

デスクトップアプリを使って、より効率的に管理できます。

### ステップ1: GitHub Desktopをインストール

1. [GitHub Desktop](https://desktop.github.com/) をダウンロード
2. インストールしてGitHubアカウントでログイン

### ステップ2: リポジトリをクローン

1. GitHub Desktopを開く
2. 「File」→「New repository」をクリック
3. 以下を入力：

```
Name: lol-wordwolf
Local path: プロジェクトを保存したい場所を選択
```

4. 「Create repository」をクリック

### ステップ3: ファイルをコピー

1. エクスプローラー（Windows）またはFinder（Mac）でリポジトリフォルダを開く
2. LOLワードウルフのファイルを全てコピー

```
lol-wordwolf/
├── index.html
├── README.md
├── DEPLOYMENT.md
├── .gitignore
├── css/
│   └── style.css
└── js/
    ├── data.js
    ├── game.js
    └── main.js
```

### ステップ4: コミットとプッシュ

1. GitHub Desktopに戻る
2. 左側に変更されたファイルが表示されます
3. 下部の「Summary」に「Initial commit」と入力
4. 「Commit to main」をクリック
5. 上部の「Publish repository」をクリック
6. 「Public」にチェックを入れて「Publish Repository」をクリック

### ステップ5: GitHub Pagesを有効化

方法1のステップ4と同じ手順で、GitHub.comのリポジトリ設定からPagesを有効化します。

---

## 方法3: Git コマンドライン（上級者向け）

ターミナルやコマンドプロンプトを使用します。

### 前提条件

- Gitがインストール済み（`git --version`で確認）
- GitHubアカウントとSSHキーまたはPersonal Access Token

### ステップ1: ローカルリポジトリを初期化

```bash
# プロジェクトディレクトリに移動
cd /path/to/lol-wordwolf

# Gitリポジトリを初期化
git init

# ファイルをステージング
git add .

# 最初のコミット
git commit -m "Initial commit: LOL Wordwolf game"
```

### ステップ2: GitHubリポジトリに接続

```bash
# GitHubのリモートリポジトリを追加
git remote add origin https://github.com/yourusername/lol-wordwolf.git

# または SSH
git remote add origin git@github.com:yourusername/lol-wordwolf.git
```

### ステップ3: プッシュ

```bash
# mainブランチにプッシュ
git branch -M main
git push -u origin main
```

### ステップ4: GitHub Pagesを有効化

方法1のステップ4と同じ手順で設定します。

---

## 🔧 カスタムドメインの設定（オプション）

独自ドメインを使いたい場合：

### ステップ1: ドメインを取得

- [Google Domains](https://domains.google/)
- [Namecheap](https://www.namecheap.com/)
- [お名前.com](https://www.onamae.com/) など

### ステップ2: DNSレコードを設定

ドメイン管理画面で以下のレコードを追加：

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

### ステップ3: GitHubでカスタムドメインを設定

1. リポジトリの「Settings」→「Pages」
2. 「Custom domain」にドメイン名を入力（例: `lol-wordwolf.com`）
3. 「Save」をクリック
4. 「Enforce HTTPS」にチェック（DNSが反映されてから）

---

## 📝 更新方法

### GitHub Desktopを使用している場合

1. ファイルを編集
2. GitHub Desktopで変更を確認
3. コミットメッセージを入力して「Commit」
4. 「Push origin」をクリック
5. 数分後に自動で反映されます

### Gitコマンドラインを使用している場合

```bash
# 変更をステージング
git add .

# コミット
git commit -m "Update: description of changes"

# プッシュ
git push origin main
```

### GitHubウェブサイトから直接編集

1. リポジトリのページで編集したいファイルをクリック
2. 鉛筆アイコン（Edit）をクリック
3. 編集後、下部の「Commit changes」をクリック
4. 数分後に自動で反映されます

---

## 🐛 トラブルシューティング

### サイトが表示されない（404エラー）

**原因1**: GitHub Pagesの設定が有効になっていない
- **解決策**: Settings → Pages で設定を確認

**原因2**: `index.html`がルートディレクトリにない
- **解決策**: リポジトリのルートに`index.html`があることを確認

**原因3**: リポジトリが非公開（Private）になっている
- **解決策**: Settings → General で「Public」に変更

### CSSやJavaScriptが読み込まれない

**原因**: パスが間違っている
- **解決策**: 相対パスを使用していることを確認

```html
<!-- ✅ 正しい -->
<link rel="stylesheet" href="./css/style.css">
<script src="./js/main.js"></script>

<!-- ❌ 間違い -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/main.js"></script>
```

### LocalStorageが動作しない

**原因**: `file://`プロトコルで開いている
- **解決策**: 必ずHTTP/HTTPSでアクセス（GitHub Pagesを使用）

### デプロイ後も古いバージョンが表示される

**原因**: ブラウザのキャッシュ
- **解決策**: 
  - Ctrl + Shift + R（Windows）
  - Cmd + Shift + R（Mac）
  - またはシークレットモードで確認

---

## 📊 GitHub Pagesの制限

- **ファイルサイズ**: 1ファイル最大100MB
- **リポジトリサイズ**: 推奨1GB以下
- **帯域幅**: 月100GB（通常は十分）
- **ビルド時間**: 1時間に10回まで

このプロジェクトは全て静的ファイルなので、制限内で問題なく動作します。

---

## 🎉 次のステップ

### サイトを共有する

1. **直接リンク**: `https://yourusername.github.io/lol-wordwolf/`
2. **ルーム参加リンク**: `https://yourusername.github.io/lol-wordwolf/?room=123456`
3. **QRコード**: [QR Code Generator](https://www.qr-code-generator.com/)でURLからQRコード生成

### SEO対策（検索エンジン最適化）

`index.html`の`<head>`に以下を追加：

```html
<!-- Open Graph (SNS共有用) -->
<meta property="og:title" content="LOL ワードウルフ">
<meta property="og:description" content="League of Legendsをテーマにしたワードウルフゲーム">
<meta property="og:image" content="https://yourusername.github.io/lol-wordwolf/images/og-image.png">
<meta property="og:url" content="https://yourusername.github.io/lol-wordwolf/">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="LOL ワードウルフ">
<meta name="twitter:description" content="League of Legendsをテーマにしたワードウルフゲーム">
```

### アナリティクスの設定

Google Analyticsを追加して訪問者数を追跡：

1. [Google Analytics](https://analytics.google.com/)でプロパティを作成
2. トラッキングコードを`index.html`の`</head>`の前に追加

---

## 💡 おすすめの改善

- [ ] **PWA化** - オフラインでも動作するようにする
- [ ] **OGP画像** - SNS共有時の画像を追加
- [ ] **カスタムドメイン** - 独自ドメインを設定
- [ ] **Google Analytics** - アクセス解析を追加
- [ ] **GitHub Actions** - 自動デプロイとテストを設定

---

## 📞 サポート

問題が発生した場合：

1. **GitHub Issues**: リポジトリのIssuesで質問
2. **GitHub Discussions**: コミュニティで相談
3. **ドキュメント**: [GitHub Pages公式ドキュメント](https://docs.github.com/ja/pages)

---

**デプロイ成功を祈ります！** 🚀✨

何か問題があれば、GitHubのIssuesで気軽に質問してください！