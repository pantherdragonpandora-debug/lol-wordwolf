# 🎮 Esports ワードウルフゲーム

League of Legends と VALORANT をテーマにしたオンライン対戦型ワードウルフゲームです！
友達とリアルタイムで楽しめるマルチプレイヤー対応のパーティーゲームです。

## ✨ 特徴

- **🔥 リアルタイムマルチプレイヤー** - Firebase Realtime Databaseでデバイス間で同期
- **🌍 多言語対応** - 日本語、英語、韓国語、中国語（簡体字）に対応
- **🎯 2つのゲームモード**
  - **League of Legends** - チャンピオン、アイテム、スキル、マップ、スペルなど73ペア
  - **VALORANT** - エージェント、武器、アビリティ、マップ、用語など77ペア
- **💬 チャット機能** - ゲーム中に議論できるリアルタイムチャット
- **⏱️ カスタマイズ可能なタイマー** - 3〜15分の討論時間
- **🗳️ 投票システム** - 誰がウルフかを投票
- **📱 モバイル対応** - スマホ・タブレット完全対応
- **🌐 簡単招待** - ルームIDまたはURL共有で友達を招待
- **⚖️ 法的情報完備** - プライバシーポリシー、利用規約、著作権ポリシー

## ⚠️ 重要な注意事項

**本サイトは、League of Legends と VALORANT のファンによって作成された非公式のウェブページです。**

- Riot Games, Inc.、League of Legends、VALORANT とは**一切関係ありません**
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

1. **ゲーム選択** - League of Legends または VALORANT を選択
2. **ルーム作成** - ホストがゲーム設定を行いルームを作成
3. **友達を招待** - ルームIDまたはURLを共有
4. **ゲーム開始** - お題が配られる（市民とウルフで異なる）
5. **討論** - チャットで話し合い（具体的な単語は言わない）
6. **投票** - 誰がウルフかを投票
7. **結果発表** - 勝敗と役割が明らかに！

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
├── README.md              # このファイル
├── css/
│   └── style.css          # LOL・VALORANTテーマのスタイル
└── js/
    ├── firebase-config.js # Firebase設定
    ├── i18n.js           # 多言語翻訳データ
    ├── data.js           # LOL お題データ（73ペア）
    ├── data-valorant.js  # VALORANT お題データ（77ペア）
    ├── game.js           # ゲームロジック
    └── main.js           # UI制御
```

## 🚀 セットアップ手順

### 1. Firebase プロジェクトの設定

✅ **既に設定済みです！**

`js/firebase-config.js` に以下の設定が適用されています：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCICMaHGGxE4KLZLldB7DbatX5eS-jbt3Q",
  authDomain: "lol-word-wolf.firebaseapp.com",
  databaseURL: "https://lol-word-wolf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lol-word-wolf",
  // ...
};
```

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

### ❌ 「ルーム作成に失敗しました」

**原因**: Firebase セキュリティルール

**解決策**:
1. Firebase Console → Realtime Database → ルール
2. `.read: true, .write: true` に変更
3. 「公開」をクリック

詳細は `FIREBASE_RULES_FIX.md` を参照

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

- `README.md` - プロジェクト全体の説明（このファイル）
- `ADS.md` - Google AdSense 広告実装ガイド（**NEW!**）
- `QUICKSTART.md` - 5分で始められるガイド
- `DEPLOY.md` - デプロイ方法の詳細
- `TROUBLESHOOTING.md` - トラブルシューティング
- `FIREBASE_AUTH_FIX.md` - 承認済みドメインの設定
- `FIREBASE_RULES_FIX.md` - セキュリティルールの設定

## 📊 プロジェクト統計

- **サポート言語**: 4言語（日本語、英語、韓国語、中国語）
- **翻訳キー数**: 60+
- **お題ペア数**: 150（LOL: 73 + VALORANT: 77）
- **ファイル数**: 11
- **コード行数**: 2,000+
- **ゲームモード**: 2（League of Legends、VALORANT）

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
