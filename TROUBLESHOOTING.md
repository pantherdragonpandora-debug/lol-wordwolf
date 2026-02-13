# 🔧 GitHub Pages 更新されない問題の解決ガイド

## 📋 チェックリスト

### ステップ1: デプロイ状態を確認

1. GitHubリポジトリページを開く
2. 上部の **「Actions」** タブをクリック
3. 最新のワークフローを確認:
   - ✅ **緑のチェックマーク** → デプロイ成功
   - ⏳ **オレンジの円** → デプロイ中（待機）
   - ❌ **赤いバツマーク** → デプロイ失敗

### ステップ2: Pages設定を確認

1. リポジトリの **「Settings」** → **「Pages」**
2. 以下を確認:
   ```
   Source: Deploy from a branch
   Branch: main  /  (root)
   ```
3. 上部に表示されるURL:
   ```
   ✅ Your site is live at https://username.github.io/lol-wordwolf/
   ```

---

## 🛠️ 解決方法

### 方法1: 強制リビルド（最も効果的）

#### A. Settings から再デプロイ

1. **Settings** → **Pages**
2. **Source** を一度 **「None」** に変更
3. **「Save」** をクリック
4. 再度 **「Deploy from a branch」** に変更
5. Branch: **`main`** / **`/ (root)`** を選択
6. **「Save」** をクリック
7. 2〜3分待つ

#### B. 空コミットで強制更新

```bash
# ローカルリポジトリで実行
cd lol-wordwolf

# 空コミットを作成
git commit --allow-empty -m "Trigger Pages rebuild"

# プッシュ
git push origin main
```

---

### 方法2: ブラウザキャッシュのクリア

GitHub Pagesは更新されていても、**ブラウザキャッシュ**が古いバージョンを表示している可能性があります。

#### キャッシュクリア方法（OS別）

**Windows/Linux (Chrome, Edge, Firefox):**
```
Ctrl + Shift + Delete
→ キャッシュをクリア
→ ページをリロード: Ctrl + F5
```

**Mac (Chrome, Safari):**
```
Cmd + Shift + Delete
→ キャッシュをクリア
→ ページをリロード: Cmd + Shift + R
```

#### スーパーリロード（最も強力）

**Chrome/Edge:**
1. DevToolsを開く（F12）
2. リロードボタンを **右クリック**
3. **「キャッシュの消去とハード再読み込み」** を選択

**Firefox:**
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

---

### 方法3: index.html の確認

ファイルが正しい場所にあるか確認します。

#### 正しいファイル構造:

```
lol-wordwolf/
├── index.html          ← ルートに必須！
├── README.md
├── css/
│   └── style.css
└── js/
    ├── firebase-config.js
    ├── data.js
    ├── game.js
    └── main.js
```

#### ❌ 間違った構造:

```
lol-wordwolf/
└── lol-wordwolf/       ← フォルダが二重になっている
    ├── index.html
    └── ...
```

**解決策**: ファイルを1階層上に移動する

---

### 方法4: ファイル名の大文字小文字を確認

GitHub Pagesは**大文字小文字を区別**します。

#### 確認事項:

```html
<!-- index.html の確認 -->
<link rel="stylesheet" href="./css/style.css">  ← 小文字
<script src="./js/firebase-config.js"></script>  ← 小文字
```

**実際のファイル名**:
- ✅ `css/style.css`（小文字）
- ❌ `CSS/Style.css`（大文字）

---

### 方法5: GitHub Actions を使用（推奨）

より確実なデプロイのために、GitHub Actionsを設定します。

#### ステップ1: ワークフローファイルを作成

リポジトリに以下のファイルを追加:

**`.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### ステップ2: Pages設定を変更

1. **Settings** → **Pages**
2. **Source**: **「GitHub Actions」** を選択
3. 保存

これで、`main`ブランチにプッシュするたびに自動デプロイされます！

---

## ⏱️ 更新にかかる時間

| 状況 | 所要時間 |
|------|---------|
| 初回デプロイ | 5〜10分 |
| 通常の更新 | 1〜3分 |
| GitHub Actions使用 | 30秒〜2分 |
| 大規模変更 | 5〜10分 |

**💡 ヒント**: GitHub Actionsタブで進行状況をリアルタイム確認できます

---

## 🧪 更新確認方法

### 方法1: タイムスタンプを追加

`index.html` に以下を追加して確認:

```html
<!-- ヘッダーに追加 -->
<header>
    <div class="header-content">
        <h1>🎮 LOL ワードウルフ</h1>
        <small style="color: #888;">Version: 2025-02-11-22:00</small>
    </div>
</header>
```

この日時が更新されていれば、デプロイ成功です。

### 方法2: DevTools で確認

1. **F12** でDevToolsを開く
2. **Network** タブ
3. ページをリロード
4. `index.html` をクリック
5. **Response** タブで最新のコードが表示されるか確認

### 方法3: シークレットモードで確認

```
Chrome: Ctrl + Shift + N (Windows/Linux) / Cmd + Shift + N (Mac)
Firefox: Ctrl + Shift + P (Windows/Linux) / Cmd + Shift + P (Mac)
Edge: Ctrl + Shift + N (Windows/Linux) / Cmd + Shift + N (Mac)
Safari: Cmd + Shift + N (Mac)
```

キャッシュなしで最新バージョンを表示します。

---

## 🚨 よくあるエラーと解決策

### エラー1: 「404 - File not found」

**原因**: `index.html` がルートディレクトリにない

**解決策**:
1. GitHubリポジトリで `index.html` の場所を確認
2. ルートに配置されていない場合は移動
3. 再度プッシュ

### エラー2: 「Site not found」

**原因**: Pages設定が有効になっていない

**解決策**:
1. **Settings** → **Pages**
2. **Source** が正しく設定されているか確認
3. リポジトリが **Public** であることを確認（Privateの場合はProプラン必要）

### エラー3: スタイルが適用されない

**原因**: CSSやJSのパスが間違っている

**解決策**:
```html
<!-- ❌ 絶対パス（動かない） -->
<link rel="stylesheet" href="/css/style.css">

<!-- ✅ 相対パス（正しい） -->
<link rel="stylesheet" href="./css/style.css">
```

### エラー4: Firebase接続エラー

**原因**: 承認済みドメインにGitHub Pagesが追加されていない

**解決策**:
1. [Firebase Console](https://console.firebase.google.com/)
2. **Authentication** → **Settings** → **承認済みドメイン**
3. `username.github.io` を追加
4. 保存

---

## 🎯 確実に更新する完全手順

### ステップ1: ローカルで変更

```bash
# ファイルを編集
nano index.html  # またはお好みのエディタ

# 変更を確認
git status
```

### ステップ2: コミット＆プッシュ

```bash
# 変更をステージング
git add .

# コミット（わかりやすいメッセージ）
git commit -m "Update: Firebase設定を適用"

# プッシュ
git push origin main
```

### ステップ3: GitHub Actionsで確認

1. GitHubリポジトリの **「Actions」** タブ
2. 最新のワークフローが **緑のチェック** になるまで待つ
3. 通常30秒〜2分

### ステップ4: ブラウザで確認

```
1. Ctrl + Shift + Delete でキャッシュクリア
2. Ctrl + Shift + R でスーパーリロード
3. シークレットモードでも確認
```

### ステップ5: 完了確認

- [ ] GitHub Actions が成功（緑のチェック）
- [ ] Settings → Pages に緑のボックス表示
- [ ] URLにアクセスして最新版が表示される
- [ ] Firebase接続状態が「✅ 接続中」

---

## 💡 プロのヒント

### 1. .nojekyll ファイルを追加

GitHub Pagesは Jekyll を使用しますが、静的サイトの場合は無効化できます。

```bash
# リポジトリのルートに空ファイルを作成
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll"
git push
```

### 2. カスタムドメインを使用

カスタムドメインを使うとキャッシュ問題が減ります。

```
Settings → Pages → Custom domain
→ wordwolf.yourdomain.com を入力
```

### 3. CDNキャッシュの無効化

HTMLヘッダーに追加:

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

---

## 📞 さらにサポートが必要な場合

現在の状況を教えてください：

1. **どのファイルを更新しましたか？**
2. **GitHub Actions のステータスは？**（緑/黄色/赤）
3. **Settings → Pages に何が表示されていますか？**
4. **エラーメッセージはありますか？**

具体的な状況に応じて、さらに詳しくサポートします！🚀
