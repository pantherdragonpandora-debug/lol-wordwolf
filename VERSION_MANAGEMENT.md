# 🔄 バージョン管理とキャッシュクリアガイド

## 📋 概要

このプロジェクトには自動キャッシュクリア機能が実装されており、ユーザーが常に最新版のWebアプリを利用できるようになっています。

## ✨ 機能

### 1. **自動バージョン検出**
- ユーザーがサイトにアクセスすると、保存されているバージョンと現在のバージョンを比較
- 新しいバージョンが検出されると自動的にキャッシュをクリア

### 2. **キャッシュクリア**
- **Service Workerキャッシュ**: ブラウザのService Workerキャッシュを削除
- **LocalStorage**: 言語設定を除いてクリア
- **IndexedDB**: Firebaseなどのデータベースキャッシュを削除

### 3. **ユーザー体験**
- 🎉 更新完了の通知表示
- 🆕 新バージョン利用可能バナー（version.jsonを使用する場合）
- 🔍 定期的なバージョンチェック（1時間ごと）

### 4. **言語設定の保持**
- キャッシュクリア時も選択した言語設定は保持される

## 🚀 使い方

### 開発者向け：バージョンの更新方法

#### ステップ1: バージョン番号を更新

**`js/version.js`** を開き、`APP_VERSION`を変更：

```javascript
// バージョン設定（更新時にここを変更）
const APP_VERSION = '1.0.11';  // ← ここを変更
```

#### ステップ2: version.jsonを更新（オプション）

**`version.json`** を開き、バージョン情報を更新：

```json
{
  "version": "1.0.11",
  "releaseDate": "2025-02-15",
  "features": [
    "新機能の説明"
  ],
  "changes": [
    "変更内容の説明"
  ]
}
```

#### ステップ3: index.htmlのクエリパラメータを更新

**`index.html`** 内のすべての`?v=10`を`?v=11`に変更：

```html
<!-- CSS -->
<link rel="stylesheet" href="css/style.css?v=11">

<!-- JavaScript -->
<script src="js/version.js?v=11"></script>
<script src="js/main.js?v=11"></script>
```

#### ステップ4: デプロイ

```bash
git add .
git commit -m "v1.0.11: 新機能追加"
git push
```

## 📊 バージョン番号の付け方

セマンティックバージョニング（Semantic Versioning）を推奨：

```
メジャー.マイナー.パッチ
  1    .  0   .  11
```

- **メジャー（1）**: 互換性のない大きな変更
- **マイナー（0）**: 後方互換性のある機能追加
- **パッチ（11）**: 後方互換性のあるバグ修正

### 例：
- `1.0.11` → `1.0.12`: バグ修正
- `1.0.11` → `1.1.0`: 新機能追加
- `1.0.11` → `2.0.0`: 大規模なリニューアル

## 🛠️ 高度な使い方

### デバッグ用コマンド

ブラウザのコンソールで以下のコマンドが使用可能：

```javascript
// 現在のバージョンを確認
getAppVersion();
// 出力: "1.0.10"

// 手動でキャッシュをクリア
clearAppCache();
// 出力: Promise<void>
```

### version.jsonによる動的バージョンチェック

サーバーに`version.json`を配置すると、アプリが自動的にサーバーの最新バージョンをチェックします。

#### version.jsonの配置場所
```
project/
├── index.html
├── version.json  ← ここ
├── js/
│   └── version.js
└── css/
```

#### 新バージョン通知バナー
`version.json`の`version`が現在のバージョンと異なる場合、画面下部にバナーが表示されます：

```
🆕 新しいバージョン (1.0.11) が利用可能です  [更新] [×]
```

## 🔍 トラブルシューティング

### キャッシュがクリアされない

#### 原因1: バージョン番号が同じ
- `js/version.js`の`APP_VERSION`を確認
- 正しく更新されているか確認

#### 原因2: ブラウザのハードキャッシュ
ユーザーに以下の操作を依頼：
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

#### 原因3: Service Workerの問題
1. Chrome DevTools を開く（F12）
2. `Application` タブ → `Service Workers`
3. `Unregister` をクリック
4. ページをリロード

### 言語設定がリセットされる

`js/version.js`の以下の部分を確認：

```javascript
// 言語設定を保持
const lang = localStorage.getItem('selectedLanguage');
localStorage.clear();
if (lang) {
  localStorage.setItem('selectedLanguage', lang);
}
```

## 📈 ベストプラクティス

### 1. 定期的なバージョン更新
- バグ修正や新機能追加のたびにバージョンを更新
- ユーザーに最新版を届ける

### 2. 変更履歴の記録
`version.json`に変更内容を記録：

```json
{
  "version": "1.0.11",
  "changes": [
    "デマーシアモードのバグ修正",
    "翻訳の改善",
    "パフォーマンス向上"
  ]
}
```

### 3. 段階的ロールアウト
大きな変更の場合：
1. テスト環境でバージョンアップ
2. 問題がないことを確認
3. 本番環境にデプロイ

### 4. ユーザー通知
大きな機能追加の場合、README.mdや通知機能で告知する

## 🎯 チェックリスト

新バージョンをリリースする前に：

- [ ] `js/version.js`の`APP_VERSION`を更新
- [ ] `version.json`の`version`と`changes`を更新
- [ ] `index.html`のすべての`?v=X`を更新
- [ ] ローカルでテスト（キャッシュクリアが動作するか）
- [ ] コンソールログを確認（エラーがないか）
- [ ] デプロイ
- [ ] 本番環境で動作確認

## 📞 サポート

問題が発生した場合：

1. ブラウザのコンソール（F12）でエラーを確認
2. `getAppVersion()`でバージョンを確認
3. `clearAppCache()`で手動キャッシュクリアを試行

---

**🎮 Happy Coding!**
