# ========================================
# LOL ワードウルフ .gitignore
# ========================================

# macOS
.DS_Store
.AppleDouble
.LSOverride
._*

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/

# Linux
*~
.directory

# エディタ
.vscode/
.idea/
*.swp
*.swo
*~
.project
.settings/

# ログファイル
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 依存関係（このプロジェクトでは使用しないが一般的な設定）
node_modules/
bower_components/

# ビルドファイル
dist/
build/
*.min.js
*.min.css

# 環境変数（このプロジェクトでは使用しないが一般的な設定）
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# キャッシュ
.cache/
.parcel-cache/

# Firebase（ローカル設定のみ）
.firebase/
firebase-debug.log
firestore-debug.log
ui-debug.log

# テスト
coverage/
.nyc_output/

# その他
*.bak
*.tmp
*.temp
