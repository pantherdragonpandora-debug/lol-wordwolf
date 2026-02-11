# 🎮 LOL ワードウルフゲーム

League of Legendsをテーマにしたオンライン対戦型ワードウルフゲームです！
友達とリアルタイムで楽しめるマルチプレイヤー対応のパーティーゲームです。

## ✨ 特徴

- **🔥 リアルタイムマルチプレイヤー** - Firebase Realtime Databaseでデバイス間で同期
- **🎯 LOL専用お題** - チャンピオン、アイテム、スキル、マップ、スペルなど73ペア
- **💬 チャット機能** - ゲーム中に議論できるリアルタイムチャット
- **⏱️ カスタマイズ可能なタイマー** - 3〜15分の討論時間
- **🗳️ 投票システム** - 誰がウルフかを投票
- **📱 モバイル対応** - スマホ・タブレット完全対応
- **🌐 簡単招待** - ルームIDまたはURL共有で友達を招待

## 🎲 ゲームの流れ

1. **ルーム作成** - ホストがゲーム設定を行いルームを作成
2. **友達を招待** - ルームIDまたはURLを共有
3. **ゲーム開始** - お題が配られる（市民とウルフで異なる）
4. **討論** - チャットで話し合い（具体的な単語は言わない）
5. **投票** - 誰がウルフかを投票
6. **結果発表** - 勝敗と役割が明らかに！

## 🛠️ 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (Vanilla JS)
- **バックエンド**: Firebase Realtime Database
- **ホスティング**: GitHub Pages / Netlify / Vercel 対応

## 📦 ファイル構成

```
lol-wordwolf/
├── index.html              # メインHTML
├── README.md              # このファイル
├── css/
│   └── style.css          # LOLテーマのスタイル
└── js/
    ├── firebase-config.js # Firebase設定
    ├── data.js           # お題データ（73ペア）
    ├── game.js           # ゲームロジック
    └── main.js           # UI制御
```

## 🚀 セットアップ手順

### 1. Firebase プロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 新しいプロジェクトを作成
3. **Realtime Database** を有効化
   - セキュリティルール: 「テストモードで開始」を選択
   - ロケーション: `asia-southeast1` (シンガポール) を推奨
4. Webアプリを登録して設定を取得

### 2. Firebase 設定の適用

`js/firebase-config.js` に設定が既に適用されています：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCICMaHGGxE4KLZLldB7DbatX5eS-jbt3Q",
  authDomain: "lol-word-wolf.firebaseapp.com",
  databaseURL: "https://lol-word-wolf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lol-word-wolf",
  storageBucket: "lol-word-wolf.firebasestorage.app",
  messagingSenderId: "535370778213",
  appId: "1:535370778213:web:440df2e808fda1eea7288c",
  measurementId: "G-KKNBV5DYM0"
};
```

✅ **既に設定済みなので、そのまま使えます！**

### 3. ローカルでテスト（オプション）

#### Pythonを使う場合:
```bash
cd lol-wordwolf
python -m http.server 8000
```

#### Node.jsを使う場合:
```bash
cd lol-wordwolf
npx http-server -p 8000
```

ブラウザで `http://localhost:8000` を開いてテストできます。

## 🌐 デプロイ方法

### GitHub Pages（推奨・無料）

1. GitHubにリポジトリを作成
2. ファイルをアップロード
3. Settings → Pages → Source: `main` ブランチ
4. 数分後に公開URL取得

### Netlify（ドラッグ&ドロップ）

1. [Netlify](https://www.netlify.com/) にログイン
2. フォルダをドラッグ&ドロップ
3. 即座にデプロイ完了

### Vercel（Git連携）

1. [Vercel](https://vercel.com/) にログイン
2. GitHubリポジトリを連携
3. 自動デプロイ

## 🎮 お題カテゴリー

### チャンピオン（20ペア）
ヤスオ vs ヨネ、ジンクス vs ケイトリン、リー・シン vs ブラインドモンクなど

### アイテム（15ペア）
インフィニティエッジ vs ストームレイザー、トリニティフォース vs ディヴァインサンダラーなど

### スキル・能力（15ペア）
ブリンク vs ダッシュ、スタン vs ルート、ノックアップ vs ノックバックなど

### マップ・レーン（15ペア）
トップレーン vs ミッドレーン、ドラゴン vs バロン、レッドバフ vs ブルーバフなど

### スペル（8ペア）
フラッシュ vs ゴースト、イグナイト vs テレポート、ヒール vs バリアなど

**合計: 73ペア**

## 🔧 カスタマイズ

### お題を追加する

`js/data.js` の `wordData` オブジェクトに追加:

```javascript
const wordData = {
  champions: [
    { majority: '新チャンピオン1', minority: '新チャンピオン2' }
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

## 🆘 トラブルシューティング

### ❌ 「接続失敗」と表示される

- Firebase設定が正しいか確認
- Realtime Databaseが有効になっているか確認
- セキュリティルールが正しく設定されているか確認

### ❌ 友達が参加できない

- ルームIDが正しいか確認
- 両方のデバイスがインターネットに接続されているか確認
- Firebaseコンソールでデータが正しく保存されているか確認

### ❌ チャットが送信できない

- ブラウザのコンソール（F12）でエラーを確認
- Firebase Realtime Databaseのセキュリティルールを確認

## 📄 ライセンス

MIT License

## 🤝 貢献

プルリクエストやイシューを歓迎します！

## 👥 作者

あなたのワードウルフゲームを楽しんでください！🎮✨

---

**🎯 すぐに遊べます！**

1. ファイルをデプロイ
2. ブラウザでアクセス
3. ルームを作成
4. 友達を招待
5. 楽しむ！

**League of Legends の知識を活かしてワードウルフを楽しもう！** ⚔️🛡️
