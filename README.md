# 🎮 Esports パーティーゲームコレクション

League of Legends、VALORANTをテーマにしたオンライン対戦型パーティーゲーム集です！
友達とリアルタイムで楽しめるマルチプレイヤー対応のゲームを3モード収録しています。

## 🎭 ゲーム選択フロー

1. **ゲームモード選択** - ワードウルフ🐺 / デマーシアに心を込めて💖 / ヴォイドに届くは光か闇か🌌
2. **ゲームタイプ選択** - LOL🎮 / VALORANT🔫 (/ TFT♟️ ※ワードウルフのみ)
3. **ルーム作成/参加** - 友達と一緒にプレイ開始！

## 🎭 収録ゲーム

### 1. ワードウルフ 🐺
参加者の中に隠れた「ウルフ（少数派）」を見つけ出すコミュニケーションゲーム。
多数派は同じお題を、ウルフは少し違うお題を受け取り、会話を通じて誰がウルフか推理します。

**対応ゲームタイプ:**
- **League of Legends** - チャンピオン、アイテム、スキル、マップ、スペルなど73ペア
- **VALORANT** - エージェント、武器、アビリティ、マップ、用語など77ペア
- **Teamfight Tactics (TFT)** - ユニット、特性、アイテム、用語など75ペア

### 2. デマーシアに心を込めて 💖
有名なセリフを、指定されたシチュエーションで演じ、他のプレイヤーに当ててもらうゲーム。
演技力と推理力が試される新感覚パーティーゲームです。

**対応ゲームタイプ:**
- **League of Legends** - 60種類のセリフ × 6シチュエーション = 360パターン
- **VALORANT** - 60種類のセリフ × 6シチュエーション = 360パターン

**特徴:**
- **60種類以上の有名セリフ** - ガレン、ヤスオ、ジンクス、Jett、Phoenix、Sageなど
- **多彩なシチュエーション** - ゲーム特有のシチュエーション（ペンタキル達成時、エースを取った時など）と感情表現
- **難易度別ポイントシステム** - Easy/Medium/Hardで獲得ポイントが変わる
- **3〜10人対応** - 少人数から大人数まで楽しめる

### 3. ヴォイドに届くは光か闇か 🌌 **NEW!**
連想ワードを伝えてテーマを当てる伝言ゲーム。
最初のプレイヤーからワードを3つずつ伝えていき、最後のプレイヤーが元のテーマを推測します。

**対応ゲームタイプ:**
- **League of Legends** - チャンピオン、アイテム、場所、概念など25テーマ
- **VALORANT** - エージェント、武器、マップ、概念など15テーマ

**特徴:**
- **回答順番選択** - プレイヤー自身が1〜N番目の順番を選択（重複不可）
- **修正機能** - 伝わりにくい言葉を途中で修正できる（修正のみ、新規入力なし）
- **視覚的フィードバック** - 修正された言葉が黄色でハイライト表示
- **テーマジャンル表示** - 全画面でジャンルを表示（難易度調整）
- **推移表示** - 結果画面で言葉がどう変化したか確認できる
- **待機画面** - 現在のターン表示と回答中プレイヤー名表示
- **2〜8人対応** - 少人数から大人数まで柔軟に対応
- **美しいUI** - ヴォイドをイメージした紫/青のグラデーション
- **多言語対応** - 日本語、英語、韓国語、中国語

## ✨ 特徴

### ワードウルフモード 🐺
- **🔥 リアルタイムマルチプレイヤー** - Firebase Realtime Databaseでデバイス間で同期
- **🌍 多言語対応** - 日本語、英語、韓国語、中国語（簡体字）に対応、お題も多言語対応
- **🎯 3つのゲームテーマ**
  - **League of Legends** - チャンピオン、アイテム、スキル、マップ、スペルなど73ペア
  - **VALORANT** - エージェント、武器、アビリティ、マップ、用語など77ペア
  - **Teamfight Tactics (TFT)** - ユニット、特性、アイテム、用語など75ペア
- **🖼️ お題画像表示** - Riot Games公式CDNから画像を表示
- **💬 チャット機能** - ゲーム中に議論できるリアルタイムチャット
- **⏱️ カスタマイズ可能なタイマー** - 3〜15分の討論時間
- **🗳️ 投票システム** - 多数決でウルフを決定
- **👥 3〜6人対応** - 柔軟なプレイ人数設定

### デマーシアに心を込めてモード 💖
- **🎭 60種類の有名セリフ** - LOLの人気キャラクターのセリフ（各キャラ名表示）
- **🎬 多彩なシチュエーション** - LOL特有の状況から感情表現まで6パターン/セリフ
- **⭐ 難易度別ポイント** - Easy(1pt), Medium(2pt), Hard(3pt)
- **👤 1人演技制** - 各ラウンドで1人が演技、他全員が推理
- **🎯 演技者選択** - ランダムまたは手動で演技者を選択
- **🏆 スコアシステム** - 正解者数×難易度でポイント獲得
- **🎪 3〜10人対応** - パーティーゲームに最適
- **📱 モバイル対応** - スマホ・タブレット完全対応

### 共通機能
- **🌐 簡単招待** - ルームIDまたはURL共有で友達を招待
- **👥 リアルタイム人数表示** - 待機画面で現在の参加者数と最大人数をリアルタイム表示（例: 👥 3 / 6）
- **🏠 スタート画面に戻るボタン** - すべての画面から右上の「🏠」ボタンでモード選択画面に戻れる
- **👑 ホスト移譲機能** - ホストが退出しても、次に入室したプレイヤーが自動的にホストになり、ゲームを継続できる
- **⚖️ 法的情報完備** - プライバシーポリシー、利用規約、著作権ポリシー、FAQ、お問い合わせページ

## ⚠️ 重要な注意事項

**本サイトは、League of Legends、VALORANT、Teamfight Tactics（TFT）のファンによって作成された非公式のウェブページです。**

- Riot Games, Inc.、League of Legends、VALORANT、Teamfight Tactics とは**一切関係ありません**
- 純粋に娯楽目的の無料ファンサイトです
- Riot Games の "Legal Jibber Jabber" ポリシーに準拠しています
- 無料で提供されています（広告掲載により運営費をカバー）
- 広告収入はサーバー費用・ドメイン費用などの運営コストに充当されます

## 🌍 対応言語

- 🇯🇵 **日本語** (Japanese)
- 🇺🇸 **英語** (English)
- 🇰🇷 **韓国語** (한국어)
- 🇨🇳 **中国語** (中文簡体)

ヘッダーの言語ボタンでいつでも切り替え可能！

## 🎲 ゲームの流れ

### ワードウルフモード 🐺
1. **ゲーム選択** - League of Legends / VALORANT / Teamfight Tactics を選択
2. **ゲームモード選択** - ワードウルフを選択
3. **ルーム作成** - ホストがゲーム設定を行いルームを作成
4. **友達を招待** - ルームIDまたはURLを共有
5. **ゲーム開始** - お題が配られる（市民とウルフで異なる）
6. **討論** - チャットで話し合い（具体的な単語は言わない）
7. **投票** - 誰がウルフかを投票
8. **結果発表** - 勝敗と役割が明らかに！

### デマーシアに心を込めてモード 💖
1. **ゲーム選択** - League of Legends を選択（推奨）
2. **ゲームモード選択** - デマーシアに心を込めてを選択
3. **ルーム作成** - プレイ人数とラウンド数を設定
4. **友達を招待** - ルームIDまたはURLを共有
5. **演技者選択** - ランダムまたは手動で演技者を1人選ぶ
6. **演技フェーズ** - 演技者は割り当てられたシチュエーションでセリフを演技、他は観察
7. **投票フェーズ** - 全員が6つのシチュエーションから演技者のシチュエーションを推理して投票
8. **結果発表** - 正解者数に応じて演技者にポイント付与（正解者数 × 難易度）
9. **次のラウンドへ** - 設定したラウンド数まで繰り返し（毎回演技者を選択）
10. **最終結果** - 最も多くポイントを獲得したプレイヤーが優勝！

## 🛠️ 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (Vanilla JS)
- **バックエンド**: Firebase Realtime Database
- **国際化**: カスタムi18nシステム
- **ホスティング**: GitHub Pages / Netlify / Vercel 対応

## 📦 ファイル構成

```
esports-wordwolf/
├── index.html              # メインHTML
├── privacy.html           # プライバシーポリシー
├── terms.html             # 利用規約
├── copyright.html         # 著作権ポリシー
├── faq.html               # よくある質問（FAQ）
├── contact.html           # お問い合わせページ
├── README.md              # このファイル
├── css/
│   └── style.css          # LOL・VALORANT・TFTテーマのスタイル
└── js/
    ├── firebase-config.js # Firebase設定
    ├── i18n.js           # 多言語翻訳データ（UI）
    ├── data.js           # LOL お題データ（73ペア・日本語のみ）
    ├── data-i18n.js      # 多言語お題データ（LoL+VALORANT+TFT・4言語対応）
    ├── data-valorant.js  # VALORANT お題データ（77ペア・日本語のみ）
    ├── data-tft.js       # TFT お題データ（75ペア・日本語のみ）
    ├── game.js           # ゲームロジック（Firebase連携）
    └── main.js           # UI制御とイベント処理
```

## 🚀 セットアップ手順

### 1. Firebase プロジェクトの設定

✅ **既に設定済みです！**

`js/firebase-config.js` に以下の設定が適用されています：

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  // ← あなたのAPIキー
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebasedatabase.app",
  projectId: "your-project-id",
  // ...
};
```

⚠️ **セキュリティ上の注意**:
- 実際のAPIキーは `js/firebase-config.js` で管理
- README.mdには例示用の値のみ記載
- APIキーには必ずHTTPリファラー制限を設定

### 2. Firebase セキュリティルール

Firebase Console → Realtime Database → ルール で以下を設定：

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### 3. Firebase 承認済みドメイン

Firebase Console → Authentication → Settings → 承認済みドメイン に追加：
```
pantherdragonpandora-debug.github.io
```

### 4. デプロイ

GitHub Pagesにデプロイ済み：
```
https://pantherdragonpandora-debug.github.io/lol-wordwolf/
```

### 5. 広告の実装（オプション）

サイト運営費用をカバーするため、Google AdSense 広告を実装できます：

1. **Google AdSense アカウントを作成**
2. **Publisher ID（`ca-pub-XXXXXXXXXX`）を取得**
3. **`index.html` を編集してコメントアウトを解除**
4. **詳細は `ADS.md` を参照**

**注意**: 広告実装は Riot Games の Legal Jibber Jabber ポリシーに準拠しています。

## 🎮 お題カテゴリー

### League of Legends（73ペア）

**チャンピオン（20ペア）**
ヤスオ vs ヨネ、ジンクス vs ケイトリン、リー・シン vs ブラインドモンクなど

**アイテム（15ペア）**
インフィニティエッジ vs ストームレイザー、トリニティフォース vs ディヴァインサンダラーなど

**スキル・能力（15ペア）**
ブリンク vs ダッシュ、スタン vs ルート、ノックアップ vs ノックバックなど

**マップ・レーン（15ペア）**
トップレーン vs ミッドレーン、ドラゴン vs バロン、レッドバフ vs ブルーバフなど

**スペル（8ペア）**
フラッシュ vs ゴースト、イグナイト vs テレポート、ヒール vs バリアなど

### VALORANT（77ペア）

**エージェント（20ペア）**
ジェット vs レイズ、セージ vs キルジョイ、フェニックス vs レイナなど

**武器（15ペア）**
ヴァンダル vs ファントム、オペレーター vs マーシャル、ゴースト vs シェリフなど

**アビリティ（15ペア）**
スモーク vs 壁、フラッシュ vs スタン、ダッシュ vs テレポートなど

**マップ・場所（15ペア）**
アセント vs ヘイヴン、バインド vs スプリット、Aサイト vs Bサイトなど

**その他（12ペア）**
スパイク vs デフューズ、アルティメット vs シグネチャー、エース vs クラッチなど

**合計: LOL 73ペア + VALORANT 77ペア = 150ペア**

## 🌍 多言語機能の使い方

### 言語の切り替え

1. ヘッダーの言語ボタンをクリック：
   - 🇯🇵 **日本語** - デフォルト
   - 🇺🇸 **EN** - English
   - 🇰🇷 **한국어** - Korean
   - 🇨🇳 **中文** - Chinese (Simplified)

2. 選択した言語は自動的に保存されます（LocalStorage）
3. 次回アクセス時も同じ言語で表示されます

### 新しい言語の追加方法

`js/i18n.js` に新しい言語オブジェクトを追加：

```javascript
const translations = {
  // 既存の言語...
  
  // 新しい言語（例：フランス語）
  fr: {
    'header.title': 'LOL Loup-Garou',
    'home.create': 'Créer une salle',
    // ... すべてのキーを翻訳
  }
};
```

HTMLに言語ボタンを追加：
```html
<button class="lang-btn" data-lang="fr" onclick="changeLanguage('fr')">FR</button>
```

## 🔧 カスタマイズ

### お題を追加する

**League of Legends のお題** - `js/data.js`

```javascript
const wordData = {
  champions: [
    { majority: '新チャンピオン1', minority: '新チャンピオン2' }
  ]
};
```

**VALORANT のお題** - `js/data-valorant.js`

```javascript
const valorantData = {
  agents: [
    { majority: '新エージェント1', minority: '新エージェント2' }
  ]
};
```

### スタイルを変更する

`css/style.css` のCSS変数を編集:

```css
:root {
  --lol-gold: #c89b3c;
  --lol-blue: #0bc6e3;
  /* ... */
}
```

### 翻訳を編集する

`js/i18n.js` の `translations` オブジェクトを編集:

```javascript
ja: {
  'home.title': 'あなたのタイトル'
}
```

## 🆘 トラブルシューティング

### 🔍 接続診断ツール **NEW!**

スマホやタブレットから接続できない、ルーム作成/参加ができない場合は、**接続診断ツール**をお試しください：

**アクセス方法:**
1. サイトフッター（画面下部）の「🔍 接続診断」をクリック
2. または直接アクセス: `https://your-domain.com/diagnosis.html`

**診断内容:**
- 📱 デバイス情報の確認（デバイスタイプ、ブラウザ、画面サイズ、オンライン状態）
- 🔥 Firebase接続テスト（接続状態、読み書きテスト）
- 📝 ルーム作成/参加テスト（実際の動作確認）
- 📊 詳細ログ（エラーの原因特定）

**よくある問題と解決策:**
- **Firebase接続エラー**: Wi-Fi/モバイルデータ接続を確認、ブラウザキャッシュをクリア、VPNを無効化
- **ルーム作成失敗**: Cookieとローカルストレージを有効化、プライベートモード/シークレットモードを無効化
- **ルーム参加失敗**: ルームIDが正しいか確認、ページを完全に再読み込み（Ctrl+Shift+R / Cmd+Shift+R）
- **モバイル固有の問題**: ブラウザキャッシュをクリア（設定から）、推奨ブラウザ使用（iOS: Safari、Android: Chrome）

**詳細ガイド**: `MOBILE_CONNECTION_TROUBLESHOOTING.md` を参照

### ❌ 🚨 「APIキーが一般公開されています」という通知を受け取った

**重要**: すぐに対応が必要です

**クイックガイド**: `QUICK_API_KEY_FIX.md` を開いて10分で対応  
**詳細ガイド**: `HOW_TO_REGENERATE_API_KEY.md` を参照  
**セキュリティ全般**: `SECURITY_API_KEY_LEAK.md` を参照

**概要**:
1. Google Cloud Console で古いAPIキーを無効化
2. 新しいAPIキーを作成
3. HTTPリファラー制限とAPI制限を設定
4. コードを更新してデプロイ

所要時間: 約10分

### ❌ 「ルーム作成に失敗しました」

**原因**: Firebase セキュリティルール

**解決策**:
1. Firebase Console → Realtime Database → ルール
2. `.read: true, .write: true` に変更
3. 「公開」をクリック

詳細は `FIREBASE_RULES_FIX.md` を参照

### ❌ デマーシアでシチュエーションが「[Object Object]」と表示される

**原因**: データ構造の不一致

**解決策**:
1. Ctrl + Shift + R でスーパーリロード
2. バージョン 1.0.18 以降が読み込まれていることを確認
3. それでも解決しない場合は、ブラウザのキャッシュをすべてクリア

詳細は `DEMACIA_OBJECT_DISPLAY_FIX_v1.0.18.md` を参照

**修正履歴**:
- v1.0.18 (2026-02-15): 演技画面・投票画面・結果画面での `[Object Object]` 表示問題を完全修正
- v1.0.10: 初期修正

### ❌ 友達が参加できない

**原因**: 承認済みドメインが未設定

**解決策**:
1. Firebase Console → Authentication → Settings
2. 承認済みドメインに `pantherdragonpandora-debug.github.io` を追加

詳細は `FIREBASE_AUTH_FIX.md` を参照

### ❌ 言語が切り替わらない

**原因**: ブラウザキャッシュ

**解決策**:
1. Ctrl + Shift + R でスーパーリロード
2. ブラウザのキャッシュをクリア

## 📄 ドキュメント

### 🔒 セキュリティ関連（重要！）
- `SITE_TAKEOVER_PREVENTION.md` - サイト乗っ取り防止の完全ガイド（**最重要**）
- `SECURITY_CHECKLIST_v1.0.21.md` - セキュリティチェックリスト
- `SECURITY_SUMMARY.md` - セキュリティ概要と現状分析
- `GITHUB_SECRETS_ALERT_RESPONSE.md` - GitHub Alertへの対応ガイド
- `QUICK_API_KEY_FIX.md` - APIキー漏洩の10分対応ガイド（**最優先**）
- `HOW_TO_REGENERATE_API_KEY.md` - APIキー再生成の詳細手順
- `SECURITY_API_KEY_LEAK.md` - セキュリティ対応の完全ガイド

### 🆕 最新リリース
- `RELEASE_NOTES_v1.0.22.md` - v1.0.22リリースノート（**最新・セキュリティ強化**）
- `IMPLEMENTATION_SUMMARY_v1.0.22.md` - v1.0.22実装サマリー

### 📚 プロジェクトドキュメント
- `README.md` - プロジェクト全体の説明（このファイル）
- `VERSION_MANAGEMENT.md` - バージョン管理とキャッシュクリアガイド
- `UX_IMPROVEMENTS_HOME_BUTTON_HOST_TRANSFER.md` - スタート画面ボタン & ホスト移譲機能 **NEW!**
- `CROSS_DEVICE_JOIN_FIX.md` - クロスデバイス入室問題の修正
- `MOBILE_CONNECTION_TROUBLESHOOTING.md` - モバイル接続問題の診断と解決
- `VOID_GAME_IMPROVEMENTS_v3.md` - ヴォイドゲーム改善実装（v3.0）
- `DEMACIA_VOTING_SYSTEM.md` - デマーシア投票システムの完全ガイド
- `DEMACIA_DISPLAY_FIX.md` - デマーシアモード表示不具合の修正記録
- `DEMACIA_OBJECT_DISPLAY_FIX_v1.0.18.md` - デマーシア `[Object Object]` 表示修正（v1.0.18）
- `DEMACIA_PERFORMER_VOTING_FIX_v1.0.16.md` - デマーシア演技者投票画面修正（v1.0.16）
- `DEMACIA_VOTING_SCREEN_FIX_v1.0.15.md` - デマーシア投票画面修正（v1.0.15）
- `WORDWOLF_VOTING_FIX_v1.0.14.md` - ワードウルフ投票システム修正（v1.0.14）
- `RELEASE_NOTES_v1.0.21.md` - v1.0.21リリースノート（VALORANT修正）
- `RELEASE_NOTES_v1.0.20.md` - v1.0.20リリースノート
- `RELEASE_NOTES_v1.0.19.md` - v1.0.19リリースノート
- `RELEASE_NOTES_v1.0.15.md` - v1.0.15リリースノート
- `RELEASE_NOTES_v1.0.14.md` - v1.0.14リリースノート
- `RELEASE_NOTES_v1.0.12.md` - v1.0.12リリースノート
- `RELEASE_NOTES_v1.0.11.md` - v1.0.11リリースノート

### 🔧 技術ドキュメント
- `ROOM_JOIN_FIX.md` - ルーム参加問題の修正記録
- `MULTI_ROOM_SUPPORT.md` - 複数ルーム対応の実装記録
- `FIREBASE_AUTH_FIX.md` - 承認済みドメインの設定
- `FIREBASE_RULES_FIX.md` - セキュリティルールの設定
- `FIREBASE_PERMISSION_FIX.md` - ヴォイドゲームのFirebase権限エラー修正
- `VOID_ORDER_SYSTEM_IMPROVEMENT_v31.md` - ヴォイド順番選択システム改善（v31） **NEW!**
- `VOID_LEAVE_ROOM_FIX_v29.md` - ヴォイド退出バグ修正（人数カウント・ホスト移譲）v29
- `VOID_LEAVE_DEBUG_v30.md` - ヴォイド退出デバッグ（v30）
- `VOID_LEAVE_BUTTON_VERIFICATION.md` - ヴォイド退出ボタンの動作確認（v1.0.28）
- `VOID_FIX_V28.md` - VoidGameクラス再構築記録（v1.0.28）
- `PLAYER_COUNT_DISPLAY.md` - 残り人数表示の実装記録
- `PLAYER_COUNT_DISPLAY_FIX.md` - デマーシア人数表示非表示対応
- `VOID_ROOM_CREATION_FIX.md` - ヴォイドルーム作成エラー修正（VoidGameクラスエクスポート）
- `CROSS_DEVICE_JOIN_FIX.md` - クロスデバイス参加問題の修正記録
- `MOBILE_CONNECTION_TROUBLESHOOTING.md` - モバイル接続トラブルシューティング
- `UX_IMPROVEMENTS_HOME_BUTTON_HOST_TRANSFER.md` - UX改善（ホームボタン、ホスト移譲）

### 🚀 デプロイ・運用
- `QUICKSTART.md` - 5分で始められるガイド
- `DEPLOY.md` - デプロイ方法の詳細
- `TROUBLESHOOTING.md` - トラブルシューティング
- `ADS.md` - Google AdSense 広告実装ガイド

## 📢 Google AdSense 審査対策

### ✅ 実装済み機能
- プライバシーポリシーページ（privacy.html）
- 利用規約ページ（terms.html）
- 著作権ポリシーページ（copyright.html）
- FAQページ（faq.html） - **20の質問と回答**
- お問い合わせページ（contact.html）
- レスポンシブデザイン（モバイル対応）
- オリジナルコンテンツ（ワードウルフゲーム）

### 📈 審査通過率を上げるポイント
1. **コンテンツ量**: FAQ（20項目）+ ゲーム説明で十分なテキスト量
2. **ナビゲーション**: 全ページからアクセス可能なリンク構造
3. **ユーザビリティ**: お問い合わせフォームでユーザーとコミュニケーション
4. **法的情報**: プライバシーポリシー、利用規約、著作権ポリシー完備
5. **独自性**: オリジナルのゲームアプリケーション

### ⏱️ 審査期間
- **通常**: 数日〜2週間
- **最長**: 4週間程度

### 🚀 審査申請手順
1. サイトをデプロイ（GitHub Pages / Netlify / Vercel）
2. Google AdSenseアカウント作成
3. サイトURLを登録
4. AdSenseコードを`<head>`に追加
5. 審査結果を待つ

詳細は `ADS.md` を参照してください。

## 📊 プロジェクト統計

- **ゲームモード**: 3種類（ワードウルフ、デマーシアに心を込めて、ヴォイドに届くは光か闇か）
- **サポート言語**: 4言語（日本語、英語、韓国語、中国語）
- **翻訳キー数**: 150+
- **ワードウルフお題**: 225ペア（LOL: 73 + VALORANT: 77 + TFT: 75）
- **デマーシアセリフ**: 120種類（LOL: 60 + VALORANT: 60）× 6シチュエーション = 合計720パターン
- **ヴォイドテーマ**: 40種類（LOL: 25 + VALORANT: 15）
- **ファイル数**: 25+
- **コード行数**: 8,000+
- **対応ゲームタイトル**: 3（League of Legends、VALORANT、Teamfight Tactics）
- **ゲームタイプ対応**: ワードウルフ（LOL/VALORANT/TFT）、デマーシア（LOL/VALORANT）、ヴォイド（LOL/VALORANT）

## 💡 プロのヒント

### 言語設定

- **自動検出**: ブラウザの言語設定に基づいて初期言語を決定可能
- **URL パラメータ**: `?lang=en` でデフォルト言語を指定可能
- **複数言語同時プレイ**: 各プレイヤーが異なる言語で同じゲームに参加可能

### パフォーマンス

- **翻訳データ**: すべての言語データを一度に読み込み（約15KB）
- **言語切り替え**: 即座に反映（ページリロード不要）
- **LocalStorage**: 言語設定を永続化

## 🎉 機能一覧

### ゲーム機能
- ✅ ゲーム選択（LOL / VALORANT）
- ✅ ルーム作成・参加
- ✅ リアルタイムマルチプレイヤー（3〜5人）
- ✅ LOL専用お題（73ペア）
- ✅ VALORANT専用お題（77ペア）
- ✅ カスタマイズ可能なタイマー
- ✅ リアルタイムチャット
- ✅ 投票システム
- ✅ 結果表示

### UI/UX機能
- ✅ 多言語対応（4言語）
- ✅ LOL & VALORANT 公式風デザイン
- ✅ テーマカラー切り替え（ゲームごと）
- ✅ レスポンシブ対応
- ✅ アニメーション効果
- ✅ タッチ最適化

### 技術機能
- ✅ Firebase Realtime Database
- ✅ リアルタイム同期
- ✅ LocalStorage活用
- ✅ エラーハンドリング
- ✅ 接続状態表示

### 収益化機能（NEW!）
- ✅ Google AdSense 統合対応
- ✅ Legal Jibber Jabber ポリシー準拠
- ✅ プライバシーポリシー（広告・Cookie対応）
- ✅ 利用規約（広告条項追加）
- ✅ 詳細な実装ガイド（ADS.md）

## 📞 サポート

問題が発生した場合：

1. `TROUBLESHOOTING.md` を確認
2. ブラウザのConsole（F12）でエラーを確認
3. Firebase Consoleで設定を確認

## ⚖️ 法的情報

### プライバシーポリシー
個人情報の取り扱いについては [privacy.html](./privacy.html) をご確認ください。

### 利用規約
本サービスの利用条件については [terms.html](./terms.html) をご確認ください。

### 著作権ポリシー
知的財産権については [copyright.html](./copyright.html) をご確認ください。

### 免責事項
- 本サービスは娯楽目的の非公式ファンサイトです
- Riot Games, Inc. および League of Legends とは一切関係ありません
- 本サービスの利用により発生したいかなる損害についても、運営者は責任を負いません
- すべての League of Legends 関連の商標、ロゴ、キャラクター名は Riot Games, Inc. の財産です

## 📄 ライセンス

### オリジナルコード
本サービスのオリジナル部分（HTML, CSS, JavaScript）は MIT License の下で公開されています。

### League of Legends コンテンツ
League of Legends 関連のすべてのコンテンツ（チャンピオン名、アイテム名、用語など）は、
Riot Games, Inc. の知的財産であり、同社の "Legal Jibber Jabber" ポリシーに準拠して使用されています。

## 🤝 貢献

プルリクエストやイシューを歓迎します！

ただし、以下の点にご注意ください：
- League of Legends の知的財産を尊重してください
- Riot Games のポリシーに準拠してください
- 本サービスが非公式のファンサイトであることを明記してください

---

**🎮 今すぐプレイ！**

[https://pantherdragonpandora-debug.github.io/lol-wordwolf/](https://pantherdragonpandora-debug.github.io/lol-wordwolf/)

**League of Legends の世界でワードウルフを楽しもう！** ⚔️🛡️✨
