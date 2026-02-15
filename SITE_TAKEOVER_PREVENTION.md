# 🛡️ サイト乗っ取り防止対策ガイド

## 📋 概要

このガイドでは、サイトの乗っ取りを防ぐための具体的な対策を説明します。

---

## 🎯 主な脅威シナリオ

### 1. Firebase プロジェクトの乗っ取り 🔴 高リスク
**攻撃方法**: 
- Firebaseコンソールへの不正アクセス
- APIキーの悪用

**影響**:
- データベース全体の削除
- 設定の変更
- 課金の悪用

### 2. GitHub リポジトリの乗っ取り 🔴 高リスク
**攻撃方法**:
- GitHubアカウントの乗っ取り
- コードの改ざん

**影響**:
- 悪意のあるコードの挿入
- サイトの改ざん
- マルウェアの配布

### 3. ドメインハイジャック 🟡 中リスク
**攻撃方法**:
- GitHub Pagesドメインの乗っ取り
- DNSの改ざん

**影響**:
- サイトへのアクセス不能
- 偽サイトへの誘導

---

## ✅ 実装すべき対策（優先度順）

## 🔴 最優先: アカウントセキュリティ

### 1. Google アカウント（Firebase）の保護 ⭐⭐⭐

#### A. 二段階認証（2FA）の有効化 【必須】

**手順**:
```
1. Google アカウントにアクセス
   https://myaccount.google.com/

2. セキュリティ → 2段階認証プロセス

3. 設定方法を選択:
   推奨: 認証アプリ（Google Authenticator、Authy）
   代替: SMS、セキュリティキー

4. バックアップコードを保存
   → 印刷して安全な場所に保管
```

**効果**: 
- ✅ パスワード漏洩でもアカウント保護
- ✅ 不正ログインの99.9%を防止

#### B. パスワードの強化 【必須】

**推奨設定**:
```
長さ: 最低16文字以上
構成: 大文字・小文字・数字・記号を混在
例: kR9$mP2#vL8@nQ5!wX3

NG例:
- password123
- lol-wordwolf
- 誕生日や名前
```

**パスワード管理ツール推奨**:
- 1Password
- Bitwarden
- LastPass

#### C. セキュリティキーの使用 【推奨】

**物理キー**:
- YubiKey
- Google Titan Security Key

**メリット**:
- フィッシング攻撃に強い
- 最も安全な認証方法

#### D. 復旧用メールアドレスの設定 【必須】

```
Google アカウント → 個人情報 → 連絡先情報
→ 復旧用のメールアドレスを追加
```

#### E. ログインアラートの有効化 【推奨】

```
Google アカウント → セキュリティ → デバイスアクティビティと通知
→ 新しいデバイスからのログインを通知
```

---

### 2. GitHub アカウントの保護 ⭐⭐⭐

#### A. 二段階認証（2FA）の有効化 【必須】

**手順**:
```
1. GitHub → Settings → Password and authentication
   https://github.com/settings/security

2. Two-factor authentication → Enable

3. 設定方法:
   推奨: TOTP アプリ（Authy、Google Authenticator）
   代替: SMS、セキュリティキー

4. リカバリーコードをダウンロード
   → 安全な場所に保管
```

#### B. パスワードの強化 【必須】

Googleアカウントと同様の基準を適用

#### C. Personal Access Token（PAT）の管理 【重要】

**現在使用中のトークンを確認**:
```
GitHub → Settings → Developer settings → Personal access tokens
```

**推奨設定**:
- ✅ 最小限の権限のみ付与
- ✅ 有効期限を設定（90日推奨）
- ✅ 使用していないトークンは削除
- ✅ トークンを安全に保管（パスワード管理ツール）

#### D. SSH キーの管理 【推奨】

```
GitHub → Settings → SSH and GPG keys

推奨:
- 古いキーを削除
- パスフレーズ付きキーを使用
- 定期的にキーを更新（年1回）
```

#### E. セッション管理 【推奨】

```
GitHub → Settings → Sessions

定期的に確認:
- 不明なセッションは削除
- 使用していないデバイスからログアウト
```

---

## 🟡 高優先: Firebase プロジェクトの保護

### 3. Firebase コンソールのセキュリティ ⭐⭐

#### A. プロジェクトメンバーの管理 【必須】

**手順**:
```
Firebase Console → Project Settings → Users and permissions
https://console.firebase.google.com/project/lol-word-wolf/settings/iam

確認事項:
- 不要なメンバーを削除
- 各メンバーの権限を最小限に
- 定期的にメンバーリストを確認（月1回推奨）
```

**推奨権限設定**:
```
所有者: 自分のみ
編集者: 信頼できる開発者のみ
閲覧者: その他のメンバー
```

#### B. Firebase Security Rules の強化 【重要】

**現在のルール**:
```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

**推奨: 改善版ルール**:
```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        // 読み取りは誰でも可能
        ".read": true,
        
        // 書き込みは制限
        ".write": "!data.exists() || data.child('createdAt').val() > (now - 86400000)",
        
        // データ検証
        ".validate": "newData.hasChildren(['players', 'gameState', 'createdAt'])",
        
        "players": {
          "$playerId": {
            "name": {
              ".validate": "newData.isString() && newData.val().length >= 1 && newData.val().length <= 20"
            },
            "vote": {
              ".validate": "newData.isString() || newData.val() === null"
            }
          }
        },
        
        "chat": {
          "$messageId": {
            ".validate": "newData.hasChildren(['sender', 'message', 'timestamp']) && newData.child('message').val().length <= 500 && newData.child('timestamp').val() <= now"
          }
        }
      }
    },
    
    "demacia_rooms": {
      "$roomId": {
        ".read": true,
        ".write": "!data.exists() || data.child('createdAt').val() > (now - 86400000)",
        ".validate": "newData.hasChildren(['players', 'gameState', 'createdAt'])"
      }
    }
  }
}
```

**改善点**:
- ✅ 24時間以上経過したルームは書き込み不可
- ✅ データ構造の検証
- ✅ 文字列長の制限
- ✅ タイムスタンプの検証

**適用方法**:
```
Firebase Console → Realtime Database → Rules → 上記をコピペ → 公開
```

#### C. 使用量アラートの設定 【重要】

**手順**:
```
Firebase Console → Project Settings → Usage and billing
→ Set budget & alerts

推奨アラート設定:
- データベース読み取り: 50,000回/日
- データベース書き込み: 10,000回/日
- ストレージ: 100MB
- 帯域幅: 1GB/月

アラート: 80%, 100%, 120%
```

**効果**:
- 異常な使用量を即座に検知
- 攻撃や悪用を早期発見
- 予期せぬ課金を防止

#### D. Cloud Functions の Monitoring（将来的） 【推奨】

```javascript
// 古いルームを自動削除
exports.cleanupOldRooms = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);
    const snapshot = await admin.database()
      .ref('rooms')
      .orderByChild('createdAt')
      .endAt(cutoff)
      .once('value');
    
    const updates = {};
    snapshot.forEach(child => {
      updates[child.key] = null;
    });
    
    await admin.database().ref('rooms').update(updates);
  });
```

---

## 🟢 中優先: GitHub リポジトリの保護

### 4. リポジトリセキュリティ ⭐

#### A. Branch Protection Rules 【推奨】

**手順**:
```
GitHub Repository → Settings → Branches → Add rule

推奨設定:
Branch name pattern: main または gh-pages

✓ Require pull request reviews before merging
  - Required approvals: 1（複数人チームの場合）
  
✓ Require status checks to pass
  
✓ Require conversation resolution before merging

✓ Include administrators
```

**効果**:
- 直接のコミットを防止
- レビュープロセスの強制
- 事故による破壊的変更を防止

#### B. Dependabot Alerts 【推奨】

**有効化**:
```
GitHub Repository → Settings → Security & analysis

✓ Dependency graph
✓ Dependabot alerts
✓ Dependabot security updates
```

**効果**:
- 脆弱性のある依存関係を検知
- 自動的にセキュリティアップデートを提案

#### C. Code Scanning 【推奨】

```
GitHub Repository → Security → Code scanning

Setup CodeQL analysis（無料）
```

**効果**:
- セキュリティ脆弱性を自動検出
- SQLインジェクション、XSSなどを検知

#### D. Webhook Secret の設定 【推奨】

もしGitHub Actionsや外部サービスを使用している場合:

```
GitHub Repository → Settings → Webhooks
→ 各WebhookにSecret を設定
```

---

## 🟢 低優先（but 重要）: クライアントサイドの保護

### 5. コードレベルのセキュリティ強化 ⭐

#### A. Content Security Policy (CSP) の実装 【推奨】

**index.html に追加**:
```html
<head>
  <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self'; 
                 script-src 'self' 'unsafe-inline' 
                   https://www.gstatic.com 
                   https://www.googleapis.com 
                   https://cdn.jsdelivr.net; 
                 style-src 'self' 'unsafe-inline' 
                   https://fonts.googleapis.com; 
                 font-src 'self' 
                   https://fonts.gstatic.com; 
                 img-src 'self' data: 
                   https://ddragon.leagueoflegends.com 
                   https://raw.communitydragon.org;
                 connect-src 'self' 
                   https://*.firebaseio.com 
                   https://*.googleapis.com 
                   wss://*.firebaseio.com;">
</head>
```

**効果**:
- XSS攻撃を防止
- 不正なスクリプトの実行を阻止
- 外部リソースの読み込みを制限

#### B. Subresource Integrity (SRI) 【推奨】

**CDN スクリプトに追加**:
```html
<!-- Before -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- After -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0" 
        integrity="sha384-xyz123..." 
        crossorigin="anonymous"></script>
```

**効果**:
- CDNの改ざんを検知
- 信頼できるバージョンのみ実行

**SRI ハッシュの生成**:
```bash
# オンラインツール
https://www.srihash.org/

# または
curl https://cdn.jsdelivr.net/npm/chart.js@4.4.0 | openssl dgst -sha384 -binary | openssl base64 -A
```

#### C. レート制限の実装 【推奨】

**js/security.js を新規作成**:
```javascript
// レート制限クラス
class RateLimiter {
  constructor() {
    this.limits = new Map();
  }
  
  check(action, cooldown = 1000) {
    const now = Date.now();
    const lastAction = this.limits.get(action) || 0;
    
    if (now - lastAction < cooldown) {
      console.warn(`⚠️ レート制限: ${action} はクールダウン中`);
      return false;
    }
    
    this.limits.set(action, now);
    return true;
  }
  
  reset(action) {
    this.limits.delete(action);
  }
}

// グローバルインスタンス
window.rateLimiter = new RateLimiter();
```

**使用例（js/main.js で）**:
```javascript
// ルーム作成
async function createRoom() {
  if (!rateLimiter.check('createRoom', 5000)) {
    alert('ルーム作成が早すぎます。5秒後にもう一度お試しください。');
    return;
  }
  // ... 既存のコード
}

// チャット送信
function sendMessage(message) {
  if (!rateLimiter.check('sendMessage', 1000)) {
    return; // 無言で無視
  }
  // ... 既存のコード
}

// 投票
function vote(target) {
  if (!rateLimiter.check('vote', 2000)) {
    alert('投票が早すぎます');
    return;
  }
  // ... 既存のコード
}
```

#### D. 入力サニタイゼーション 【推奨】

**js/security.js に追加**:
```javascript
// 入力サニタイゼーション
function sanitizeInput(input, maxLength = 100) {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()                           // 前後の空白を削除
    .replace(/[<>'"]/g, '')          // 危険な文字を削除
    .replace(/javascript:/gi, '')    // javascript: を削除
    .replace(/on\w+=/gi, '')         // イベントハンドラを削除
    .substring(0, maxLength);        // 最大長を制限
}

// グローバルに公開
window.sanitizeInput = sanitizeInput;
```

**使用例**:
```javascript
// プレイヤー名
const playerName = sanitizeInput(
  document.getElementById('player-name').value, 
  20
);

// チャットメッセージ
const message = sanitizeInput(
  document.getElementById('chat-input').value, 
  500
);
```

---

## 📊 セキュリティチェックリスト

### 🔴 最優先（今すぐ実施）

- [ ] **Google アカウントの2FA有効化**
- [ ] **GitHub アカウントの2FA有効化**
- [ ] **強力なパスワードに変更**
- [ ] **リカバリーコードの保存**

### 🟡 高優先（今週中に実施）

- [ ] **Firebase 使用量アラート設定**
- [ ] **Firebase Security Rules 強化**
- [ ] **Firebase プロジェクトメンバー確認**
- [ ] **GitHub Personal Access Token 確認**

### 🟢 中優先（今月中に実施）

- [ ] **CSP ヘッダー実装**
- [ ] **レート制限実装**
- [ ] **入力サニタイゼーション実装**
- [ ] **GitHub Branch Protection 設定**

### 💡 低優先（余裕があれば）

- [ ] **セキュリティキーの購入**
- [ ] **SRI ハッシュ追加**
- [ ] **Dependabot 有効化**
- [ ] **Code Scanning 有効化**

---

## 🚨 インシデント対応プラン

### もし乗っ取られたら...

#### 1. 即座に実施（5分以内）

**A. アカウントのセキュリティ確保**
```
1. すべてのデバイスからログアウト
2. パスワードを変更
3. 2FAをリセット・再設定
```

**B. Firebase プロジェクトの保護**
```
1. Firebase Console → Project Settings → Users
   → 不審なメンバーを削除

2. Realtime Database → Rules
   → 一時的に ".write": false に変更

3. API キーを再生成
   Google Cloud Console → APIs & Services → Credentials
```

**C. GitHub リポジトリの保護**
```
1. 不審なコミットを確認
   git log --all --oneline

2. リポジトリを一時的にプライベートに

3. 最後の安全なコミットにロールバック
   git reset --hard <safe-commit-hash>
   git push -f origin main
```

#### 2. 調査（30分以内）

**A. アクセスログの確認**
```
Google: https://myaccount.google.com/device-activity
GitHub: https://github.com/settings/security-log
Firebase: Firebase Console → Authentication → Users
```

**B. 変更内容の確認**
```
GitHub: Compare → Branches
Firebase: データベースのスナップショット確認
```

**C. 影響範囲の特定**
```
- コードの改ざん有無
- データの削除・改変有無
- 設定の変更有無
- 料金への影響
```

#### 3. 復旧（1時間以内）

**A. クリーンなコードにリストア**
```bash
git revert <malicious-commits>
git push origin main
```

**B. データベースの復旧**
```
Firebase Console → Realtime Database → Backups
→ 最後の安全なバックアップから復元
```

**C. セキュリティ設定の再確認**
```
- Security Rules の確認
- API制限の確認
- メンバー権限の確認
```

#### 4. 事後対応

**A. セキュリティ強化**
```
- 2FAの再設定
- 新しいパスワード
- セキュリティキーの追加
```

**B. モニタリング強化**
```
- アラート設定の見直し
- ログの定期確認
```

**C. ドキュメント更新**
```
- インシデントレポート作成
- 対策の文書化
```

---

## 📞 緊急連絡先

### Firebase サポート
```
Firebase Console → Help → Contact Support
https://firebase.google.com/support
```

### GitHub サポート
```
https://support.github.com/
```

### Google アカウント復旧
```
https://accounts.google.com/signin/recovery
```

---

## 📚 参考資料

- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/basics)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Google Account Security](https://support.google.com/accounts/answer/46526)

---

## ✅ まとめ

### 今すぐやるべきこと（所要時間: 15分）

1. ✅ **Google 2FA 有効化**（5分）
2. ✅ **GitHub 2FA 有効化**（5分）
3. ✅ **リカバリーコード保存**（5分）

### 今週やるべきこと（所要時間: 30分）

1. ✅ **Firebase 使用量アラート**（10分）
2. ✅ **Firebase Security Rules 強化**（10分）
3. ✅ **パスワード強化**（10分）

### 今月やるべきこと（所要時間: 2時間）

1. ✅ **レート制限実装**（30分）
2. ✅ **CSP ヘッダー実装**（30分）
3. ✅ **入力サニタイゼーション**（30分）
4. ✅ **GitHub Branch Protection**（30分）

---

**最終更新**: 2026-02-15  
**次回見直し**: 2026-03-15
