# 🚨 APIキー漏洩 - 緊急対応チェックリスト

## ⏰ 今すぐやるべきこと（10分以内）

### ステップ1: 古いAPIキーを無効化（2分）

1. **[Google Cloud Console](https://console.cloud.google.com/)** を開く
2. プロジェクト「lol-word-wolf」を選択
3. **APIとサービス** → **認証情報**
4. APIキー `AIzaSyCICMaHGGxE4KLZLldB7DbatX5eS-jbt3Q` を見つける
5. 右側の「︙」→ **無効にする** をクリック
   
   ✅ **これで古いキーは即座に使えなくなります**

### ステップ2: 新しいAPIキーを作成（1分）

1. 同じ画面で「**認証情報を作成**」→ **APIキー**
2. 新しいキーが表示される → **コピー**して保存

### ステップ3: 新しいキーに制限を設定（3分）

#### 3-1. HTTPリファラー制限
1. 作成したAPIキーの **編集** をクリック
2. **アプリケーションの制限** → 「HTTPリファラー（ウェブサイト）」を選択
3. 以下を追加:
   ```
   https://pantherdragonpandora-debug.github.io/*
   http://localhost:*
   http://127.0.0.1:*
   ```

#### 3-2. API制限
1. **API の制限** → 「キーを制限」を選択
2. 以下のみチェック:
   - Firebase Realtime Database API
   - Firebase Hosting API
   - Identity Toolkit API
3. **保存**

### ステップ4: コードを更新（2分）

**js/firebase-config.js** の 8行目を更新:
```javascript
apiKey: "新しいAPIキー",  // ← ここに貼り付け
```

### ステップ5: GitHubにプッシュ（2分）

```bash
git add js/firebase-config.js
git commit -m "🔒 Update Firebase API key with restrictions"
git push origin main
```

---

## ⏳ 30分以内にやるべきこと

### ステップ6: GitHub履歴からAPIキーを削除

**推奨**: リポジトリを削除して再作成

1. GitHubでリポジトリを削除
   - Settings → Delete this repository

2. 新しいリポジトリを作成（同じ名前）

3. クリーンな状態でプッシュ:
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "🎉 Initial commit with secure config"
   git remote add origin https://github.com/pantherdragonpandora-debug/lol-wordwolf.git
   git branch -M main
   git push -u origin main
   ```

---

## ✅ 完了確認

- [ ] 古いAPIキーを無効化した
- [ ] 新しいAPIキーを作成した
- [ ] HTTPリファラー制限を設定した
- [ ] API制限を設定した
- [ ] js/firebase-config.js を更新した
- [ ] GitHubにプッシュした
- [ ] サイトが正常に動作することを確認した
- [ ] GitHub履歴をクリーンにした

---

## 🛡️ 追加の安全対策（時間があれば）

### 課金アラートを設定

1. [Google Cloud Console](https://console.cloud.google.com/)
2. **課金** → **予算とアラート**
3. **予算を作成**
   - 金額: $10
   - アラート: 50%, 90%, 100%

### Firebase使用量制限を設定

1. [Firebase Console](https://console.firebase.google.com/)
2. **使用状況と請求**
3. Realtime Database → **使用量の上限を設定**

---

## 📊 現状確認

### Firebase APIキーは本当に危険？

**いいえ、適切に制限すれば安全です：**

✅ **既に実装済みの保護**:
- Firebase セキュリティルール（読み書き制限）
- 承認済みドメイン設定

✅ **今回追加する保護**:
- HTTPリファラー制限（指定ドメインのみ）
- API制限（必要なAPIのみ）

❌ **現在のリスク**:
- 制限なしのAPIキーが公開されている
- 悪意のある第三者が他のGoogle Cloud APIを使用できる可能性

### 実際の被害リスクは？

**低～中程度**:
- Firebase Realtime Databaseは保護されている
- ただし、他のGoogle Cloud サービス（Cloud Storage、Cloud Functionsなど）へのアクセスリスクあり
- 大量のAPIコールによる課金リスクあり

---

## 🆘 トラブルシューティング

### サイトが動かなくなった

**原因**: 新しいAPIキーがまだデプロイされていない

**解決策**:
1. GitHub Actions のデプロイ完了を待つ（1-2分）
2. ブラウザをスーパーリロード（Ctrl+Shift+R）
3. コンソール（F12）で接続状況を確認
   - `✅ Firebase接続成功` が表示されればOK

### 「Firebase接続失敗」と表示される

**原因1**: APIキーが間違っている
- js/firebase-config.js のAPIキーを再確認

**原因2**: HTTPリファラー制限が厳しすぎる
- Google Cloud Console で制限を確認
- `https://pantherdragonpandora-debug.github.io/*` が含まれているか確認

---

## 📞 困ったら

詳細なガイドは `SECURITY_API_KEY_LEAK.md` を参照してください。

**緊急時の連絡先**:
- Firebase サポート: https://firebase.google.com/support
- Google Cloud サポート: https://cloud.google.com/support

---

**最終更新**: 2026年2月14日
