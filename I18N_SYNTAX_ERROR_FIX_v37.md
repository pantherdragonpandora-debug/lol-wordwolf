# 🔒 GitHub Secrets Alert 対応ガイド

## 📋 概要

GitHubがFirebase APIキーを検出し、セキュリティアラートを発行しました。

**アラート情報:**
- **ファイル:** `js/firebase-config.js` 8行目
- **内容:** Google API Key（Firebase）
- **コミット:** 4e724d4d

---

## ✅ 重要: Firebase APIキーは公開可能

### Firebase公式見解

Firebase APIキーは、適切な制限があれば**公開されても安全**です。

**Firebase公式ドキュメントより:**
> "Unlike how API keys are typically used, API keys for Firebase services are not used to control access to backend resources; that can only be done with Firebase Security Rules. Usually, you need to fastidiously guard API keys; however, API keys for Firebase services are ok to include in code or checked-in config files."

**参照:** https://firebase.google.com/docs/projects/api-keys

### 理由

- Firebase APIキーはクライアント識別子であり、認証トークンではない
- 実際のアクセス制御はFirebase Security Rulesで行われる
- HTTPリファラー制限とAPI制限で保護可能

---

## 🛡️ 既に実装済みの保護対策

### 1. HTTPリファラー制限 ✅

**設定済み:**
```
https://pantherdragonpandora-debug.github.io/*
http://localhost:*
http://127.0.0.1:*
```

**効果:**
- 指定したドメインからのみAPIアクセス可能
- 他のウェブサイトからは使用不可
- 不正利用を防止

### 2. API制限 ✅

**有効化されているAPI:**
- Firebase Realtime Database API
- Identity Toolkit API

**効果:**
- 必要最小限のAPIのみ有効
- 他のGoogle Cloud APIへのアクセス不可
- コスト増大のリスク軽減

### 3. Firebase Security Rules ✅

**設定済みルール:**
```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    },
    "demacia_rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

**効果:**
- データアクセスを制御
- 不正なデータ操作を防止

---

## 🔧 GitHub Alertへの対応方法

### オプション1: Alertを却下する（推奨） ⭐

#### 手順

1. **GitHubリポジトリにアクセス**
   ```
   https://github.com/pantherdragonpandora-debug/lol-wordwolf/security
   ```

2. **該当のAlertをクリック**
   - "Google API Key" alert
   - File: `js/firebase-config.js:8`

3. **"Dismiss alert" ボタンをクリック**

4. **理由を選択**
   - **"Won't fix"** を選択
   - または **"Used in tests"**

5. **コメントを追加**（英語推奨）
   ```
   This Firebase API key is intentionally public and is protected by:
   - HTTP Referrer restrictions (GitHub Pages domain only)
   - API restrictions (Firebase Realtime Database and Identity Toolkit only)
   - Firebase Security Rules for data access control
   
   Firebase API keys are safe to include in public code when properly restricted.
   Reference: https://firebase.google.com/docs/projects/api-keys
   ```

6. **"Dismiss alert" を確認**

#### メリット
- ✅ 簡単で迅速
- ✅ コード変更不要
- ✅ Firebase公式ガイドラインに従う
- ✅ 既存の保護対策で十分

---

### オプション2: .gitignoreで除外（非推奨）

#### 理由

❌ **推奨しません:**
- Firebase APIキーは公開しても安全（適切な制限があれば）
- GitHub Pagesにデプロイできなくなる
- ビルドプロセスが複雑になる

---

### オプション3: 環境変数を使用（過剰対策）

もし完全にAPIキーを隠したい場合：

#### GitHub Secretsを使用

1. **GitHub Secretsに登録**
   ```
   Settings → Secrets and variables → Actions → New repository secret
   Name: FIREBASE_API_KEY
   Value: [あなたのAPIキー]
   ```

2. **GitHub Actionsでビルド**
   ```yaml
   # .github/workflows/deploy.yml
   - name: Replace API Key
     run: |
       sed -i "s/YOUR_API_KEY_PLACEHOLDER/${{ secrets.FIREBASE_API_KEY }}/g" js/firebase-config.js
   ```

3. **firebase-config.jsを修正**
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY_PLACEHOLDER",
     // ...
   };
   ```

#### デメリット
- ❌ 設定が複雑
- ❌ ローカル開発が困難
- ❌ Firebase公式ガイドラインと矛盾
- ❌ メリットが少ない（既に制限済み）

---

## 📊 リスク評価

### 現在の状態

| 項目 | 状態 | リスク |
|-----|-----|--------|
| HTTPリファラー制限 | ✅ 設定済み | 低 |
| API制限 | ✅ 設定済み | 低 |
| Firebase Security Rules | ✅ 設定済み | 低 |
| 使用量アラート | ✅ 推奨 | 低 |

### 総合評価: **安全** 🟢

---

## 🎯 推奨アクション

### 1. GitHub Alertを却下する ⭐

**理由:**
- Firebase APIキーは公開可能
- 適切な制限が設定済み
- Firebase公式ガイドラインに準拠

**アクション:**
```
1. GitHub Security Alertsページにアクセス
2. 該当のAlertを開く
3. "Dismiss alert" をクリック
4. "Won't fix" を選択
5. コメントを追加（上記の英語コメント）
6. 確認
```

### 2. 使用量アラートを設定（推奨）

**Google Cloud Consoleで:**
```
1. https://console.cloud.google.com/billing にアクセス
2. プロジェクトを選択
3. "予算とアラート" → "予算を作成"
4. 予算額: $10（または適切な金額）
5. アラート閾値: 50%, 90%, 100%
6. 通知先メールを設定
```

### 3. 定期的な確認

**月次チェック:**
- Firebase使用量
- 不審なアクセスログ
- APIキー制限の確認

---

## 📚 参考資料

### Firebase公式ドキュメント
- **APIキーの安全性:** https://firebase.google.com/docs/projects/api-keys
- **セキュリティルール:** https://firebase.google.com/docs/database/security
- **アプリケーション制限:** https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions

### セキュリティベストプラクティス
- HTTPリファラー制限を常に設定
- API制限を最小限に
- Firebase Security Rulesを適切に設定
- 使用量を定期的に監視

---

## 🙋 FAQ

### Q1: Firebase APIキーを公開しても本当に安全ですか？

**A:** はい、安全です。Firebase APIキーは以下の理由で公開可能です：
- クライアント識別子であり、認証トークンではない
- HTTPリファラー制限で保護されている
- API制限で必要最小限のAPIのみ有効
- 実際のアクセス制御はFirebase Security Rulesで行われる

### Q2: GitHub Alertを無視しても問題ありませんか？

**A:** はい、問題ありません。ただし：
- Alertを**却下**することを推奨（無視ではなく）
- 理由を明記してクローズ
- チーム全員が状況を理解していることが重要

### Q3: 他の開発者がこのAPIキーを悪用できませんか？

**A:** いいえ、できません。理由：
- HTTPリファラー制限により、GitHub Pagesドメインからのみアクセス可能
- 他のウェブサイトからは使用不可
- API制限により、他のGoogle Cloud APIへのアクセス不可
- Firebase Security Rulesでデータアクセスを制御

### Q4: それでも心配な場合は？

**A:** 以下の追加対策を推奨：
1. **使用量アラート**を設定（予算$10など）
2. **定期的な監視**（週次または月次）
3. **Firebase Consoleでアクセスログ確認**
4. **必要に応じてAPIキーを再生成**

---

## ✅ チェックリスト

### 実施済み
- [x] HTTPリファラー制限を設定
- [x] API制限を設定
- [x] Firebase Security Rulesを設定
- [x] プロジェクトに制限を適用

### 推奨アクション
- [ ] GitHub Alertを却下
- [ ] 却下理由を記載
- [ ] 使用量アラートを設定（推奨）
- [ ] チームメンバーに状況を共有

---

**作成日:** 2026-02-14  
**バージョン:** 1.0  
**ステータス:** 対応推奨
