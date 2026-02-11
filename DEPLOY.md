# 🚀 デプロイガイド

LOL ワードウルフゲームをオンラインで公開する方法を説明します。

## 🎯 推奨デプロイ方法

このプロジェクトは完全な静的サイトなので、以下のサービスで**無料**でホスティングできます：

1. **GitHub Pages** ⭐ 最も簡単
2. **Netlify** ⭐ ドラッグ&ドロップで即デプロイ
3. **Vercel** ⭐ Git連携で自動デプロイ
4. **Firebase Hosting** ⭐ Firebase使用中なので相性抜群

---

## 📘 方法1: GitHub Pages（推奨）

### ステップ1: GitHubリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 右上の **「+」** → **「New repository」**
3. リポジトリ名: `lol-wordwolf`
4. Public を選択
5. **「Create repository」**

### ステップ2: ファイルをアップロード

#### A. Webから直接アップロード（簡単）

1. リポジトリページで **「Add file」** → **「Upload files」**
2. すべてのファイルをドラッグ&ドロップ:
   - `index.html`
   - `README.md`
   - `css/` フォルダ
   - `js/` フォルダ
3. **「Commit changes」**

#### B. Git コマンドライン（上級者向け）

```bash
cd lol-wordwolf
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/lol-wordwolf.git
git push -u origin main
```

### ステップ3: GitHub Pagesを有効化

1. リポジトリの **「Settings」**タブ
2. 左メニュー **「Pages」**
3. Source: **`main`** ブランチ、**`/ (root)`** フォルダ
4. **「Save」**
5. 数分後、URLが表示されます:
   ```
   https://YOUR_USERNAME.github.io/lol-wordwolf/
   ```

### ステップ4: Firebaseに承認済みドメインを追加

1. [Firebase Console](https://console.firebase.google.com/)
2. あなたのプロジェクトを開く
3. **Authentication** → **Settings** → **承認済みドメイン**
4. **「ドメインを追加」**
5. `YOUR_USERNAME.github.io` を追加
6. 保存

✅ **完了！** URLを友達と共有して遊べます！

---

## 📗 方法2: Netlify

### ステップ1: Netlifyにログイン

1. [Netlify](https://www.netlify.com/) にアクセス
2. GitHubアカウントでログイン

### ステップ2: ドラッグ&ドロップでデプロイ

1. ダッシュボードの **「Sites」** タブ
2. ページ下部の **「Want to deploy a new site without connecting to Git? Drag and drop your site output folder here」** エリア
3. `lol-wordwolf` フォルダ全体をドラッグ&ドロップ
4. 自動的にデプロイが開始
5. 数秒後にURLが表示されます:
   ```
   https://random-name-12345.netlify.app
   ```

### ステップ3: カスタムドメイン設定（オプション）

1. **「Domain settings」**
2. **「Custom domain」** → ドメイン名を入力
3. HTTPS自動対応

### ステップ4: Firebaseに承認済みドメインを追加

NetlifyのドメインをFirebaseに追加（GitHub Pagesと同じ手順）

✅ **完了！** 超高速CDNで配信されます！

---

## 📙 方法3: Vercel

### ステップ1: Vercelにログイン

1. [Vercel](https://vercel.com/) にアクセス
2. GitHubアカウントでログイン

### ステップ2: リポジトリをインポート

1. **「New Project」**
2. **「Import Git Repository」**
3. GitHubリポジトリ `lol-wordwolf` を選択
4. **「Import」**
5. 設定はデフォルトのまま **「Deploy」**

### ステップ3: デプロイ完了

数秒後にURLが表示されます:
```
https://lol-wordwolf.vercel.app
```

### 自動デプロイ

Gitにプッシュするたびに自動でデプロイされます！

✅ **完了！** 最新のVercel Edgeで超高速配信！

---

## 📕 方法4: Firebase Hosting

Firebase使用中なので、Hostingも使うと統合管理できます。

### ステップ1: Firebase CLIインストール

```bash
npm install -g firebase-tools
```

### ステップ2: ログインと初期化

```bash
# Firebaseにログイン
firebase login

# プロジェクトディレクトリで初期化
cd lol-wordwolf
firebase init hosting
```

初期化の質問に答える:
```
? What do you want to use as your public directory? .
? Configure as a single-page app? No
? Set up automatic builds and deploys with GitHub? No
```

### ステップ3: デプロイ

```bash
firebase deploy
```

URLが表示されます:
```
https://lol-word-wolf.web.app
```

✅ **完了！** Firebaseと完全統合！

---

## 🔧 カスタムドメイン設定

独自ドメイン（例: `wordwolf.yourdomain.com`）を使いたい場合：

### GitHub Pages

1. リポジトリの **Settings** → **Pages**
2. **Custom domain** に `wordwolf.yourdomain.com` を入力
3. DNSに**CNAMEレコード**を追加:
   ```
   wordwolf.yourdomain.com → YOUR_USERNAME.github.io
   ```

### Netlify

1. **Domain settings** → **Add custom domain**
2. Netlifyの指示に従ってDNS設定

### Vercel

1. **Settings** → **Domains** → **Add**
2. Vercelの指示に従ってDNS設定

### Firebase Hosting

```bash
firebase hosting:channel:deploy production --domain wordwolf.yourdomain.com
```

---

## 🔒 セキュリティ設定

### Firebase セキュリティルール

デフォルトの「テストモード」は30日間有効です。
本番環境では以下のルールを設定してください：

1. Firebase Console → **Realtime Database** → **ルール**
2. 以下のルールを設定:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

または、より厳格なルール:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": "data.exists()",
        ".write": "!data.exists() || data.child('players').child(auth.uid).exists()",
        "players": {
          "$playerId": {
            ".validate": "newData.hasChildren(['name', 'joinedAt'])"
          }
        }
      }
    }
  }
}
```

---

## 📊 コスト比較

| サービス | 月額コスト | 特徴 |
|---------|----------|------|
| **GitHub Pages** | 無料 | 100GB/月帯域、簡単 |
| **Netlify** | 無料 | 100GB/月帯域、CDN、自動HTTPS |
| **Vercel** | 無料 | 100GB/月帯域、Edge配信 |
| **Firebase Hosting** | 無料 | 10GB/月帯域、Firebase統合 |

すべて**無料プラン**で十分です！🎉

---

## 🧪 デプロイ後の確認

### チェックリスト

- [ ] サイトが正常に表示される
- [ ] Firebase接続状態が「✅ 接続中」
- [ ] ルームを作成できる
- [ ] 別のデバイスから参加できる
- [ ] チャットが送信できる
- [ ] 投票が機能する
- [ ] スマホで正常に表示される

### デバッグ

問題がある場合、ブラウザの開発者ツール（F12）で:
1. **Console** タブでエラーを確認
2. **Network** タブでFirebase接続を確認
3. **Application** タブでLocalStorageを確認

---

## 🎉 完了！

あなたのLOLワードウルフゲームがオンラインで公開されました！

友達に URL を共有して、一緒に楽しんでください！🎮✨

---

**💡 ヒント**: 
- URLを短縮サービス（bit.ly等）で短くすると共有しやすい
- QRコードを生成してスマホからすぐアクセス可能に
- Discordなどで常設URLをピン留めして友達といつでも遊べる

**楽しいゲームを！** ⚔️🛡️
