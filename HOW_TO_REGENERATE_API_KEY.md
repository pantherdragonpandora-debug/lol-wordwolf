# 🔑 Firebase APIキーの再生成手順（詳細版）

## ❗ 重要な注意

**Firebase Console** には APIキーを再生成する機能がありません。  
**Google Cloud Console** から操作する必要があります。

---

## 📋 手順1: Google Cloud Console にアクセス

### 1-1. ログイン

1. **[Google Cloud Console](https://console.cloud.google.com/)** を開く
2. Firebaseで使用しているGoogleアカウントでログイン

### 1-2. プロジェクトを選択

画面上部のプロジェクト選択ドロップダウンをクリック:
- プロジェクト名: **LOL WORD WOLF**
- プロジェクトID: **lol-word-wolf**

---

## 📋 手順2: 現在のAPIキーを確認・無効化

### 2-1. 認証情報ページへ移動

1. 左側のハンバーガーメニュー（≡）をクリック
2. **APIとサービス** → **認証情報** を選択

または、検索バー（上部）に「認証情報」と入力して移動

### 2-2. APIキーを見つける

「認証情報」ページで以下のセクションを探す:
- **APIキー** セクション（下の方にあります）

現在のAPIキー:
```
名前: Browser key (auto created by Firebase)
キー: AIzaSyCICMaHGGxE4KLZLldB7DbatX5eS-jbt3Q
```

### 2-3. APIキーを無効化（即座に）

1. APIキーの右側にある **︙（縦3点）** メニューをクリック
2. **無効にする** を選択
3. 確認ダイアログで **無効にする** をクリック

✅ **これで古いキーは即座に使えなくなります**

---

## 📋 手順3: 新しいAPIキーを作成

### 3-1. 新しいAPIキーを作成

1. 同じ「認証情報」ページの上部
2. **＋ 認証情報を作成** ボタンをクリック
3. **APIキー** を選択

### 3-2. APIキーをコピー

ポップアップが表示され、新しいAPIキーが生成されます:

```
API キーを作成しました
YOUR-NEW-API-KEY-HERE
```

**重要**: このキーを必ずコピーして、安全な場所（メモ帳など）に保存してください。

### 3-3. すぐに制限を設定

⚠️ **ここで「完了」を押さないでください！**

1. ポップアップ内の **キーを制限** ボタンをクリック

---

## 📋 手順4: APIキーに制限を設定

### 4-1. HTTPリファラー制限を設定

「API キーを編集」画面が開きます:

#### ① アプリケーションの制限

1. **アプリケーションの制限** セクションを探す
2. **HTTPリファラー（ウェブサイト）** を選択

#### ② ウェブサイトの制限を追加

「項目を追加」ボタンをクリックして、以下を1つずつ追加:

```
https://pantherdragonpandora-debug.github.io/*
```

```
http://localhost:*
```

```
http://127.0.0.1:*
```

**説明**:
- 1つ目: GitHub Pages の本番環境
- 2つ目: ローカル開発環境（localhost）
- 3つ目: ローカル開発環境（127.0.0.1）

### 4-2. API制限を設定

#### ① API の制限

同じページを下にスクロール:
1. **API の制限** セクションを探す
2. **キーを制限** を選択

#### ② 必要なAPIのみを有効化

「APIを選択」ドロップダウンから以下を追加:

1. **Firebase Realtime Database API**
   - 検索: "Firebase Realtime"
   - 選択してチェック

2. **Identity Toolkit API**
   - 検索: "Identity Toolkit"
   - 選択してチェック

3. **Token Service API** （自動で有効化される場合あり）

**注意**: 
- 「Firebase Hosting API」は通常不要（クライアント側では使用しない）
- 必要最小限のAPIのみを選択

### 4-3. 保存

1. ページ下部の **保存** ボタンをクリック
2. 「API キーが更新されました」というメッセージを確認

---

## 📋 手順5: 新しいAPIキーをプロジェクトに適用

### 5-1. firebase-config.js を更新

**js/firebase-config.js** ファイルを開き、8行目を更新:

```javascript
const firebaseConfig = {
  // 🔑 APIキー
  apiKey: "YOUR-NEW-API-KEY-HERE",  // ← ここに新しいキーを貼り付け
  
  // 🌐 認証ドメイン
  authDomain: "lol-word-wolf.firebaseapp.com",
  
  // 📊 データベースURL（重要！）
  databaseURL: "https://lol-word-wolf-default-rtdb.asia-southeast1.firebasedatabase.app",
  
  // 🆔 プロジェクトID
  projectId: "lol-word-wolf",
  
  // 💾 ストレージバケット
  storageBucket: "lol-word-wolf.firebasestorage.app",
  
  // 📧 メッセージ送信ID
  messagingSenderId: "535370778213",
  
  // 📱 アプリID
  appId: "1:535370778213:web:440df2e808fda1eea7288c",
  
  // 📈 測定ID
  measurementId: "G-KKNBV5DYM0"
};
```

### 5-2. 変更をコミット

```bash
# 変更を確認
git status

# firebase-config.js を追加
git add js/firebase-config.js

# コミット
git commit -m "🔒 Update Firebase API key with restrictions"

# GitHubにプッシュ
git push origin main
```

### 5-3. デプロイ完了を待つ

GitHub Actions が自動でデプロイします（1-2分）:
1. GitHubリポジトリページを開く
2. **Actions** タブをクリック
3. 最新のワークフローが完了するまで待つ

---

## 📋 手順6: 動作確認

### 6-1. サイトにアクセス

```
https://pantherdragonpandora-debug.github.io/lol-wordwolf/
```

### 6-2. ブラウザをリロード

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### 6-3. コンソールで確認

1. **F12** キーを押して開発者ツールを開く
2. **Console** タブを選択
3. 以下のメッセージが表示されればOK:

```
✅ Firebase接続成功
```

❌ エラーが表示される場合:
```
❌ Firebase接続失敗
Firebase: Error: Requests from referer <empty> are blocked.
```

→ HTTPリファラー制限の設定を再確認してください

---

## 🐛 トラブルシューティング

### エラー1: 「Requests from referer are blocked」

**原因**: HTTPリファラー制限が厳しすぎる

**解決策**:
1. Google Cloud Console → APIとサービス → 認証情報
2. 作成したAPIキーを編集
3. ウェブサイトの制限に以下が含まれているか確認:
   ```
   https://pantherdragonpandora-debug.github.io/*
   ```
4. ワイルドカード `/*` が正しく入力されているか確認

### エラー2: 「API keys with referer restrictions cannot be used」

**原因**: 選択したAPIがHTTPリファラー制限に対応していない

**解決策**:
1. Google Cloud Console → APIとサービス → 認証情報
2. APIキーを編集
3. **API の制限** で以下のみを有効化:
   - Firebase Realtime Database API
   - Identity Toolkit API

Firebase Hosting API などは削除

### エラー3: APIキーが見つからない

**原因**: プロジェクトを間違えている

**解決策**:
1. Google Cloud Console の上部でプロジェクト名を確認
2. **LOL WORD WOLF** (lol-word-wolf) が選択されているか確認
3. 違う場合は、プロジェクトを切り替え

### エラー4: 「認証情報」メニューが見つからない

**手順**:
1. Google Cloud Console の左上のハンバーガーメニュー（≡）をクリック
2. リストをスクロールして **APIとサービス** を探す
3. **APIとサービス** をクリック → **認証情報** を選択

または:
1. 画面上部の検索バー（🔍）をクリック
2. 「認証情報」と入力
3. 検索結果から **認証情報** を選択

---

## 📸 画面キャプチャで確認

### 「認証情報」ページの見方

```
┌─────────────────────────────────────────┐
│ Google Cloud Console                    │
├─────────────────────────────────────────┤
│ [≡] lol-word-wolf ▼   🔍              │
├─────────────────────────────────────────┤
│ APIとサービス > 認証情報                │
│                                         │
│ ＋ 認証情報を作成 ▼                     │
│                                         │
│ ━━━ APIキー ━━━                        │
│                                         │
│ 📌 Browser key (auto created...)   ︙   │
│    AIzaSyCICMaHG...                     │
│                                         │
│ 📌 新しいAPIキー                    ︙   │
│    AIzaXXXXXXXXXX...                    │
│                                         │
└─────────────────────────────────────────┘
```

### API制限設定画面

```
┌─────────────────────────────────────────┐
│ API キーを編集                           │
├─────────────────────────────────────────┤
│ 名前: 新しいAPIキー                      │
│                                         │
│ ▼ アプリケーションの制限                 │
│   ⚪ なし                               │
│   ⚪ HTTP リファラー（ウェブサイト）     │ ← 選択
│   ⚪ IPアドレス                         │
│   ⚪ Android アプリ                     │
│   ⚪ iOS アプリ                         │
│                                         │
│   ウェブサイトの制限                     │
│   項目を追加 [+]                        │
│   ┌───────────────────────────────┐    │
│   │ https://pantherdragonpandora- │    │
│   │ debug.github.io/*             │    │
│   └───────────────────────────────┘    │
│                                         │
│ ▼ API の制限                            │
│   ⚪ 制限なし                           │
│   ⚪ キーを制限                         │ ← 選択
│                                         │
│   API を選択                            │
│   ┌───────────────────────────────┐    │
│   │ Firebase Realtime Database API│ ✓  │
│   │ Identity Toolkit API          │ ✓  │
│   └───────────────────────────────┘    │
│                                         │
│              [保存]  [キャンセル]        │
└─────────────────────────────────────────┘
```

---

## ✅ 完了チェックリスト

- [ ] Google Cloud Console にログインした
- [ ] プロジェクト「lol-word-wolf」を選択した
- [ ] 「認証情報」ページに移動した
- [ ] 古いAPIキーを無効化した
- [ ] 新しいAPIキーを作成した
- [ ] 新しいAPIキーをコピーして保存した
- [ ] HTTPリファラー制限を設定した（3つ）
- [ ] API制限を設定した（2つのAPIのみ）
- [ ] 保存ボタンをクリックした
- [ ] js/firebase-config.js を更新した
- [ ] GitHubにプッシュした
- [ ] サイトにアクセスして動作確認した
- [ ] コンソールで「✅ Firebase接続成功」を確認した

---

## 📞 それでも見つからない場合

### 方法1: 直接URLでアクセス

```
https://console.cloud.google.com/apis/credentials?project=lol-word-wolf
```

このURLをブラウザで開くと、直接「認証情報」ページに移動します。

### 方法2: Firebase Consoleから移動

1. [Firebase Console](https://console.firebase.google.com/)
2. プロジェクト「LOL WORD WOLF」を選択
3. 左メニューの **⚙️（歯車）** → **プロジェクトの設定**
4. 「全般」タブ → 下にスクロール
5. 「Google Cloud Platform（GCP）リソースのロケーション」セクション
6. **Google Cloud Console を開く** リンクをクリック

---

**最終更新**: 2026年2月14日

このガイドに従って作業してもうまくいかない場合は、スクリーンショットを撮って質問してください。
