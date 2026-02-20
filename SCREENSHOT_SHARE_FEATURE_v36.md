# スクリーンショット & SNSシェア機能実装 (v36)

## 📅 実装日
2026-02-20

## 🎯 実装内容

### 1. スクリーンショット用スタイリング強化
プロモーション・SNS投稿向けに視覚効果を大幅強化しました。

#### 追加したスタイル機能

**視覚効果の強化**
- グラデーション背景（カード、トピック表示）
- キラキラエフェクト（shimmer アニメーション）
- ホバーエフェクト（プレイヤーカード、ボタン）
- 勝利時のグローエフェクト
- フェードインアニメーション（結果画面）

**スクリーンショット最適化**
- 高コントラストなカラースキーム
- 境界線・影の強調
- テキストシャドウによる視認性向上
- レスポンシブ対応

**主要コンポーネント**
```css
.topic-display {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.player-item:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.15);
}
```

---

### 2. SNSシェアボタン機能

#### 対応プラットフォーム
1. **X (Twitter)** - ツイートインテント API
2. **Discord** - クリップボードコピー
3. **LINE** - LINE URL スキーム
4. **クリップボード** - 汎用テキストコピー

#### シェアテキスト自動生成
```javascript
// モード別のシェアテキスト
const MODE_SHARE_TEXT = {
  wordwolf: '🎮 ワードウルフで遊んでます！誰が人狼か見抜けるかな？',
  demacia: '🎭 デマーシアに心を込めて！名セリフで演技対決中！',
  void: '🌌 ヴォイドに届くは光か闇か！連想ゲームで協力プレイ！'
};
```

#### 機能詳細

**X (Twitter) シェア**
```javascript
function shareOnTwitter() {
  const text = generateShareText();
  const hashtags = ['EsportsWordWolf', 'ワードウルフ', 'LeagueOfLegends', 'VALORANT'];
  // Twitter Intent API を使用
}
```

**Discord シェア**
```javascript
function shareOnDiscord() {
  // クリップボードにテキストをコピー
  copyToClipboard(text, 'Discord用のテキストをコピーしました！');
}
```

**LINE シェア**
```javascript
function shareOnLine() {
  // LINE URL スキームで共有画面を開く
  window.open(`https://line.me/R/msg/text/?${encodeURIComponent(text)}`);
}
```

#### UI コンポーネント
```html
<div class="share-section">
  <h3 class="share-section-title">🎮 友達にシェア</h3>
  <div class="share-buttons-container">
    <button class="share-button twitter" onclick="shareOnTwitter()">
      <!-- SVG アイコン + テキスト -->
    </button>
    <!-- Discord, LINE, Copy ボタン -->
  </div>
  <p class="screenshot-hint">💡 スクリーンショットを撮ってSNSに投稿しよう！</p>
</div>
```

---

### 3. 多言語対応

全ての言語（日本語、英語、韓国語、中国語）でシェアボタンのテキストに対応：

**追加した翻訳キー**
```javascript
'share.title': '🎮 友達にシェア',      // ja
'share.twitter': 'Xでシェア',          // ja
'share.discord': 'Discordでシェア',    // ja
'share.line': 'LINEでシェア',          // ja
'share.copy': 'テキストをコピー',       // ja
'share.hint': '💡 スクリーンショットを撮ってSNSに投稿しよう！' // ja

'share.title': '🎮 Share with Friends',  // en
'share.twitter': 'Share on X',            // en
// ... (en, ko, zh 対応済み)
```

---

## 📁 変更ファイル

### 新規作成
- `css/screenshot-style.css` (v1) - 7KB
- `js/share.js` (v1) - 12KB
- `SCREENSHOT_SHARE_FEATURE_v36.md` (このファイル)

### 変更
- `index.html` - CSS/JSリンク追加、バージョン更新
- `js/i18n.js` (v35 → v36) - 4言語にシェア用翻訳追加

---

## 🧪 テスト手順

### 1. 完全リロード
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### 2. スタイリングの確認
1. 任意のモードでゲームをプレイ
2. 結果画面まで進める
3. 以下の視覚効果を確認：
   - カードのグラデーション背景
   - トピック表示のキラキラエフェクト
   - ボタンのホバーエフェクト
   - スコア表示のアニメーション

### 3. シェアボタンの動作確認

**X (Twitter) シェア**
1. 結果画面で「Xでシェア」をクリック
2. Twitter インテント画面が開く
3. 投稿テキストとハッシュタグが正しく設定されている

**Discord シェア**
1. 「Discordでシェア」をクリック
2. 「Discord用のテキストをコピーしました！」の通知が表示される
3. Discord に貼り付けてテキストが正しいことを確認

**LINE シェア**
1. 「LINEでシェア」をクリック
2. LINE の共有画面が開く（モバイル）/ LINE Web が開く（PC）

**テキストコピー**
1. 「テキストをコピー」をクリック
2. ボタンが「✅ コピー完了！」に変わる
3. 2秒後に元に戻る
4. クリップボードにテキストがコピーされている

### 4. 多言語確認
1. 右上の言語切替で各言語に変更（🇯🇵 🇺🇸 🇰🇷 🇨🇳）
2. シェアボタンのテキストが正しく翻訳されている
3. シェアヒントも翻訳されている

### 5. レスポンシブ確認
1. ブラウザ幅を変更
2. 768px以下でボタンが縦並びになる
3. モバイルデバイスで表示確認

---

## 🎨 スタイルのカスタマイズ

### 色の変更
```css
/* css/screenshot-style.css */
.share-button.twitter {
  background: linear-gradient(135deg, #1da1f2, #0d8bd9);
}
```

### アニメーションの調整
```css
@keyframes shimmer {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}
```

---

## 📊 シェアテキストの構成

### 基本フォーマット
```
[モード別メッセージ]

[ゲームタイプ名]のテーマで遊べる無料オンラインパーティゲーム！

Esports Word Wolf - eスポーツで遊ぶパーティゲーム

[URL]
```

### 例：ワードウルフ（LOL）
```
🎮 ワードウルフで遊んでます！誰が人狼か見抜けるかな？

League of Legendsのテーマで遊べる無料オンラインパーティゲーム！

Esports Word Wolf - eスポーツで遊ぶパーティゲーム

https://your-domain.com/
```

---

## 🔧 将来の拡張機能

### アナリティクス統合
```javascript
function logShareEvent(platform) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'share', {
      method: platform,
      content_type: 'game',
      item_id: getCurrentGameMode()
    });
  }
}
```

### その他のSNS追加
- Facebook
- Instagram Stories
- TikTok
- Bluesky
- Threads

### プレビュー画像生成
- Canvas API を使用してゲーム結果のサムネイル画像を自動生成
- OGP メタタグに設定

---

## 📝 技術仕様

### クリップボードAPI
```javascript
// モダンブラウザ
navigator.clipboard.writeText(text)

// フォールバック（古いブラウザ）
document.execCommand('copy')
```

### 通知システム
```javascript
function showCopyNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #28a745, #218838);
    ...
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 3000);
}
```

---

## ✅ 実装完了チェックリスト

- [x] スクリーンショット用CSS作成
- [x] SNSシェアJS作成
- [x] 4言語対応（ja, en, ko, zh）
- [x] index.html に統合
- [x] 結果画面への自動挿入
- [x] クリップボードコピー機能
- [x] 通知システム
- [x] レスポンシブ対応
- [x] アクセシビリティ対応（aria-label）
- [x] ドキュメント作成

---

## 🚀 効果

### Before（実装前）
- ❌ スクリーンショットが地味
- ❌ シェア機能なし
- ❌ URL手動コピーが必要
- ❌ プロモーション素材が不足

### After（実装後）
- ✅ 見栄えの良いスクリーンショット
- ✅ ワンクリックでSNSシェア
- ✅ 自動生成されたシェアテキスト
- ✅ プロモーションがしやすい
- ✅ 拡散性の向上

---

## 📸 スクリーンショット撮影のコツ

### PC
1. **Windows**: `Win + Shift + S` (スニッピングツール)
2. **Mac**: `Cmd + Shift + 4` (スクリーンショット)
3. **ブラウザ拡張**: Awesome Screenshot, Nimbus などを使用

### モバイル
1. **iOS**: 電源ボタン + 音量アップ
2. **Android**: 電源ボタン + 音量ダウン

### おすすめのタイミング
- 結果画面（勝敗が表示される）
- プレイ中の面白い瞬間
- スコアボード（接戦の時）
- ヴォイドのテーマ表示画面

---

## 🎯 次のステップ

1. **完全リロード** して新機能をテスト
2. **各モードで1ゲームプレイ** して結果画面を確認
3. **シェアボタンを全てテスト** して動作確認
4. **スクリーンショットを撮影** してSNSに投稿

プロモーション素材として活用し、ユーザー拡大にご活用ください！🎉
