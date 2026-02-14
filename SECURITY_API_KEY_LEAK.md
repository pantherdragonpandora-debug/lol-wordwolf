# 🔒 Firebase APIキー漏洩対応ガイド

## 🚨 緊急度: 高

Google Cloud Platformから「API キーが一般公開されています」という通知を受け取った場合は、**すぐに対応が必要**です。

## 📋 問題の概要

### 何が起きたか
- Firebase APIキーがGitHub上のコードに含まれて公開された
- 誰でもこのAPIキーを使ってFirebaseプロジェクトにアクセスできる状態
- 悪意のある第三者による不正利用のリスクあり

### 影響範囲
- ✅ **限定的**: Firebase Realtime Databaseは読み書き制限を設定済み
- ⚠️ **潜在的リスク**: APIキーに制限がない場合、他のGoogle Cloudサービスにアクセスされる可能性
- 💰 **課金リスク**: 不正利用により予期しない課金が発生する可能性

## ✅ 即座に実施すべき対応（優先順位順）

### 1. 【最優先】古いAPIキーを無効化・再生成

#### Google Cloud Console での操作（推奨）

1. **[Google Cloud Console](https://console.cloud.google.com/)** にログイン

2. プロジェクト「**lol-word-wolf**」を選択

3. 左メニュー → **APIとサービス** → **認証情報**

4. APIキー一覧から該当のキーを見つける
   ```
   AIzaSyCICMaHGGxE4KLZLldB7DbatX5eS-jbt3Q
   ```

5. **キーを無効化**（即座に）
   - キーの右側の「︙」メニュー → **無効にする**
   - これで古いキーは使用不可になります

6. **新しいAPIキーを作成**
   - 「認証情報を作成」→ **APIキー**
   - 新しいキーが生成されます
   - **すぐにコピーして安全な場所に保存**

### 2. 【重要】新しいAPIキーに制限を設定

新しいAPIキーを作成したら、**必ず制限を追加**してください。

#### アプリケーションの制限

1. 作成したAPIキーの **編集** をクリック

2. **アプリケーションの制限** セクション:
   - 「**HTTPリファラー（ウェブサイト）**」を選択

3. **ウェブサイトの制限** に以下を追加:
   ```
   https://pantherdragonpandora-debug.github.io/*
   http://localhost:*
   http://127.0.0.1:*
   ```
   
   これで指定したドメインからのみAPIキーが使用可能になります。

#### API の制限

1. **API の制限** セクション:
   - 「**キーを制限**」を選択

2. 必要なAPIのみを有効化:
   - ✅ Firebase Realtime Database API
   - ✅ Firebase Hosting API
   - ✅ Identity Toolkit API（Firebase Authentication）
   - ❌ その他のAPIは無効

3. **保存** をクリック

### 3. プロジェクト内のAPIキーを更新

#### js/firebase-config.js を更新

**⚠️ 重要**: 新しいAPIキーに置き換えてください。

```javascript
const firebaseConfig = {
  apiKey: "新しいAPIキー",  // ← ここを更新
  authDomain: "lol-word-wolf.firebaseapp.com",
  databaseURL: "https://lol-word-wolf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lol-word-wolf",
  storageBucket: "lol-word-wolf.firebasestorage.app",
  messagingSenderId: "535370778213",
  appId: "1:535370778213:web:440df2e808fda1eea7288c",
  measurementId: "G-KKNBV5DYM0"
};
```

#### 更新手順

```bash
# 1. firebase-config.js を編集
# 2. 変更をコミット（APIキーは含めない）
git add js/firebase-config.js
git commit -m "🔒 Update Firebase API key"
git push origin main
```

### 4. README.md から APIキーを削除

README.mdに実際のAPIキーを記載しないでください。

**修正済み**: v1.0.12で既に対応済み
- 実際のAPIキーは削除
- 例示用のプレースホルダーに変更

### 5. GitHub履歴からAPIキーを完全に削除

⚠️ **重要**: Gitのコミット履歴に古いAPIキーが残っています。

#### オプションA: リポジトリを削除して再作成（推奨・簡単）

1. **GitHubでリポジトリを削除**
   - https://github.com/pantherdragonpandora-debug/lol-wordwolf
   - Settings → Danger Zone → Delete this repository

2. **新しいリポジトリを作成**
   - 同じ名前で新規作成: `lol-wordwolf`

3. **クリーンな状態でプッシュ**
   ```bash
   # ローカルの .git フォルダを削除
   rm -rf .git
   
   # 新規Gitリポジトリとして初期化
   git init
   git add .
   git commit -m "🎉 Initial commit with secure API key"
   
   # 新しいリポジトリにプッシュ
   git remote add origin https://github.com/pantherdragonpandora-debug/lol-wordwolf.git
   git branch -M main
   git push -u origin main
   ```

#### オプションB: BFG Repo-Cleaner で履歴を書き換え（上級者向け）

```bash
# BFG Repo-Cleaner をダウンロード
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# リポジトリをミラークローン
git clone --mirror https://github.com/pantherdragonpandora-debug/lol-wordwolf.git

# passwords.txt に古いAPIキーを記載
echo "AIzaSyCICMaHGGxE4KLZLldB7DbatX5eS-jbt3Q" > passwords.txt

# APIキーを含むファイルを書き換え
java -jar bfg-1.14.0.jar --replace-text passwords.txt lol-wordwolf.git

cd lol-wordwolf.git

# ガベージコレクション
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 強制プッシュ
git push --force
```

### 6. Firebase セキュリティルールの確認

Firebase Realtime Databaseのセキュリティルールが適切に設定されているか確認してください。

#### 推奨設定

```json
{
  "rules": {
    "rooms": {
      ".read": true,
      ".write": true,
      "$roomId": {
        ".validate": "newData.hasChildren(['host', 'players', 'gameState'])"
      }
    },
    "demacia_rooms": {
      ".read": true,
      ".write": true,
      "$roomId": {
        ".validate": "newData.hasChildren(['host', 'players', 'gameState'])"
      }
    }
  }
}
```

#### 確認方法

1. [Firebase Console](https://console.firebase.google.com/)
2. プロジェクト選択 → Realtime Database → ルール
3. 上記のルールが設定されているか確認

## 📊 使用状況の確認

### Google Cloud Console で課金状況を確認

1. [Google Cloud Console](https://console.cloud.google.com/)
2. **課金** → **レポート**
3. 過去7日間の使用状況を確認
   - 異常な増加がないか
   - 不審なAPIコールがないか

### Firebase Console で使用状況を確認

1. [Firebase Console](https://console.firebase.google.com/)
2. プロジェクト選択 → **使用状況と請求**
3. Realtime Databaseの使用量を確認

## 🛡️ 今後の予防策

### 1. 環境変数を使用（将来的な改善案）

```javascript
// 環境変数から読み込む（GitHub Actionsなどで設定）
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  // ...
};
```

### 2. .gitignore に追加

```bash
# .gitignore
firebase-config.js
.env
*.key
```

### 3. APIキー制限を必ず設定

- HTTPリファラー制限
- API制限
- 使用量制限（Quota）

### 4. 定期的な監査

- 月1回: APIキーの使用状況を確認
- 四半期に1回: セキュリティルールの見直し

## ✅ 対応完了チェックリスト

- [ ] 古いAPIキーを無効化した
- [ ] 新しいAPIキーを作成した
- [ ] 新しいAPIキーにHTTPリファラー制限を設定した
- [ ] 新しいAPIキーにAPI制限を設定した
- [ ] `js/firebase-config.js` を新しいAPIキーで更新した
- [ ] README.mdから実際のAPIキーを削除した
- [ ] GitHubにプッシュした
- [ ] GitHub履歴からAPIキーを削除した（リポジトリ再作成 or BFG）
- [ ] Firebase セキュリティルールを確認した
- [ ] 課金状況を確認した（異常なし）
- [ ] サイトが正常に動作することを確認した

## 🆘 よくある質問

### Q1: APIキーが漏洩したら、必ず不正利用されますか？

**A**: いいえ、必ずしもそうではありません。
- Firebase Realtime Databaseはセキュリティルールで保護されています
- HTTPリファラー制限があれば、指定ドメイン外からは使用できません
- ただし、予防的に即座に対応することが重要です

### Q2: 古いAPIキーを無効化したら、サイトが動かなくなりませんか？

**A**: はい、一時的に動かなくなります。
1. 古いAPIキーを無効化
2. 新しいAPIキーを作成
3. コードを更新してプッシュ
4. GitHub Pagesがデプロイ完了（1-2分）

合計5分程度のダウンタイムが発生します。

### Q3: README.mdにAPIキーを書いても大丈夫ですか？

**A**: いいえ、絶対に避けてください。
- 例示用のプレースホルダーのみ記載
- 実際のAPIキーは `js/firebase-config.js` にのみ記載
- ただし、HTTPリファラー制限があれば、公開されてもリスクは低い

### Q4: Firebase APIキーは本当に公開しても大丈夫？

**A**: 条件付きで「はい」。
- **HTTPリファラー制限**があれば、指定ドメインからしか使用できない
- **Firebase セキュリティルール**が適切に設定されていれば、データは保護される
- ただし、ベストプラクティスとしては、できるだけ公開しない方が良い

Firebase公式ドキュメント:
> Firebase APIキーは公開されることを前提に設計されています。ただし、HTTPリファラー制限とセキュリティルールを適切に設定してください。

参考: https://firebase.google.com/docs/projects/api-keys

### Q5: 課金が発生する可能性は？

**A**: 非常に低いですが、ゼロではありません。
- Firebase Sparkプラン（無料）の範囲内であれば課金なし
- HTTPリファラー制限があれば、大量アクセスのリスクは低い
- 念のため、課金アラートを設定することを推奨

## 📞 サポート

問題が発生した場合:
1. [Firebase サポート](https://firebase.google.com/support)
2. [Google Cloud サポート](https://cloud.google.com/support)
3. このドキュメントの手順を再確認

---

**作成日**: 2026年2月14日  
**最終更新**: 2026年2月14日  
**バージョン**: 1.0

**重要**: このガイドに従って対応を完了したら、このファイルをプロジェクトに保存し、今後の参考にしてください。
