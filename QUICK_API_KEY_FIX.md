# ⚡ APIキー再生成 - 超シンプル版

## 🎯 最短5ステップ（10分）

### ステップ1: Google Cloud Console を開く

**直接リンク**: https://console.cloud.google.com/apis/credentials?project=lol-word-wolf

↑ このリンクをクリックするだけで正しいページに移動します

---

### ステップ2: 古いAPIキーを無効化

1. ページ下部の「**APIキー**」セクションを探す
2. `AIzaSyCICMaHGGxE...` の右側の **︙** をクリック
3. **無効にする** を選択

✅ 古いキーが即座に使えなくなります

---

### ステップ3: 新しいAPIキーを作成

1. ページ上部の **＋ 認証情報を作成** をクリック
2. **APIキー** を選択
3. 表示されたキーを **コピー** して保存

---

### ステップ4: 制限を設定

ポップアップで **キーを制限** をクリック

#### ① HTTPリファラー制限
- **HTTPリファラー（ウェブサイト）** を選択
- 「項目を追加」で以下を入力:
  ```
  https://pantherdragonpandora-debug.github.io/*
  ```

#### ② API制限
- **キーを制限** を選択
- 以下の2つのみチェック:
  - Firebase Realtime Database API
  - Identity Toolkit API

#### ③ 保存
- 下部の **保存** をクリック

---

### ステップ5: コードを更新

**js/firebase-config.js** の8行目:

```javascript
apiKey: "新しいAPIキーをここに貼り付け",
```

```bash
git add js/firebase-config.js
git commit -m "🔒 Update API key"
git push origin main
```

---

## ✅ 確認

サイトにアクセス → F12 → コンソールで確認:

```
✅ Firebase接続成功
```

---

## 🆘 困ったら

- 詳細版: `HOW_TO_REGENERATE_API_KEY.md`
- 直接URLが開けない場合:
  1. https://console.cloud.google.com/
  2. プロジェクト「lol-word-wolf」を選択
  3. 左メニュー → APIとサービス → 認証情報

---

**所要時間**: 10分  
**難易度**: ⭐⭐☆☆☆（簡単）
