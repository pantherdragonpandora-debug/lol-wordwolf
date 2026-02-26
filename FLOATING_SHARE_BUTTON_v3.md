# フローティングSNSシェアボタン実装 (v3)

## 📅 実装日
2026-02-20

## 🎯 実装内容

### 全画面対応のフローティングシェアボタン
すべての画面（モード選択、ゲーム選択、待機室、プレイ中、結果画面など）で利用できる**フローティングシェアボタン**を実装しました。

### 特徴
- 🎈 **フローティングデザイン** - 画面右下に固定表示
- 📱 **モバイル対応** - スマホでも使いやすいサイズ
- 🎨 **美しいアニメーション** - スムーズな開閉エフェクト
- 🌐 **多言語対応準備** - 将来的に多言語対応可能
- 🚀 **軽量** - ページの読み込みに影響しない

## 📐 デザイン

### フローティングボタン
```
┌─────────────────────────┐
│                         │
│                         │
│                    ┌──┐ │
│                    │📤│ │ ← メインボタン
│                    └──┘ │
│                      │   │
│                    ┌──┐ │
│                    │ X│ │ ← X (Twitter)
│                    ├──┤ │
│                    │💬│ │ ← Discord
│                    ├──┤ │
│                    │📱│ │ ← LINE
│                    ├──┤ │
│                    │📋│ │ ← コピー
│                    └──┘ │
└─────────────────────────┘
```

### 位置
- **PC**: 右下 (bottom: 80px, right: 20px)
- **モバイル**: 右下 (bottom: 70px, right: 15px)

### ボタンサイズ
- **メインボタン**: 56px × 56px (モバイル: 50px × 50px)
- **シェアボタン**: 48px × 48px (モバイル: 44px × 44px)

## 🎨 カラースキーム

### プラットフォーム別カラー
```css
X (Twitter): linear-gradient(135deg, #1da1f2, #0d8bd9)
Discord:     linear-gradient(135deg, #5865f2, #4752c4)
LINE:        linear-gradient(135deg, #00b900, #009900)
コピー:      linear-gradient(135deg, #6c757d, #545b62)
```

### メインボタン
```css
background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
```
- LOL: ゴールド
- VALORANT: レッド
- TFT: パープル
- デマーシア: シルバー
- ヴォイド: パープル/ブルー

## 🔧 実装詳細

### 追加した関数

#### 1. `createCompactShareButtons()`
フローティングボタンのHTMLを生成します。

```javascript
function createCompactShareButtons() {
  return `
    <div class="floating-share-container" id="floating-share">
      <button class="floating-share-toggle" onclick="toggleFloatingShare()">
        📤
      </button>
      <div class="floating-share-menu" id="floating-share-menu">
        <!-- 各SNSボタン -->
      </div>
    </div>
  `;
}
```

#### 2. `toggleFloatingShare()`
シェアメニューの開閉を制御します。

```javascript
function toggleFloatingShare() {
  const container = document.getElementById('floating-share');
  container.classList.toggle('active');
}
```

#### 3. `addFloatingShareButton()`
ページにフローティングボタンを追加します。

```javascript
function addFloatingShareButton() {
  document.body.insertAdjacentHTML('beforeend', createCompactShareButtons());
}
```

#### 4. `addFloatingShareStyles()`
フローティングボタンのCSSを動的に追加します。

```javascript
function addFloatingShareStyles() {
  // スタイルを<head>に追加
}
```

### 更新した関数

#### `generateShareText()`
デフォルトのシェアテキストを追加しました。

```javascript
const MODE_SHARE_TEXT = {
  wordwolf: '🎮 ワードウルフで遊んでます！',
  demacia: '🎭 デマーシアに心を込めて！',
  void: '🌌 ヴォイドに届くは光か闇か！',
  default: '🎮 Esports Word Wolf で遊ぼう！'  // ← 追加
};
```

## 📁 変更ファイル

### 変更
- `js/share.js` (v2 → v3)
  - `createCompactShareButtons()` 関数追加
  - `toggleFloatingShare()` 関数追加
  - `addFloatingShareButton()` 関数追加
  - `addFloatingShareStyles()` 関数追加
  - `generateShareText()` にデフォルトテキスト追加
  - `initShareButtons()` 更新

- `index.html`
  - share.js のバージョンを v3 に更新

### 新規作成
- `FLOATING_SHARE_BUTTON_v3.md` (このファイル)

## 🧪 テスト手順

### 1. 完全リロード
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### 2. コンソール確認
```
✅ シェア機能を初期化しました
✅ フローティングシェアボタンを追加しました
📤 share.js ロード完了 (v3)
✅ showScreen フックを設定しました
```

### 3. フローティングボタンの確認
- ページの右下に 📤 ボタンが表示される ✅
- ボタンをクリックするとメニューが開く ✅
- メニューに4つのSNSボタンが表示される ✅

### 4. 各SNSボタンのテスト

#### X (Twitter)
1. X ボタン（上から1番目）をクリック
2. Twitter インテント画面が開く
3. ツイート内容にテキスト + ハッシュタグ + URL が含まれている

#### Discord
1. Discord ボタン（上から2番目）をクリック
2. 「Discord用のテキストをコピーしました！」通知が表示される
3. Discord に貼り付けてテキストを確認

#### LINE
1. LINE ボタン（上から3番目）をクリック
2. LINE 共有画面が開く（モバイル）/ LINE Web が開く（PC）
3. シェアテキストが正しく表示される

#### コピー
1. コピーボタン（上から4番目）をクリック
2. 緑色の通知「シェア用テキストをコピーしました！」が表示される
3. クリップボードにテキストがコピーされている

### 5. 全画面でのテスト
以下のすべての画面で📤ボタンが表示されることを確認：

- ✅ モード選択画面
- ✅ ゲーム選択画面（LOL/VALORANT/TFT）
- ✅ ホーム画面（ルーム作成/参加）
- ✅ ルーム作成画面
- ✅ ルーム参加画面
- ✅ 待機室
- ✅ ゲームプレイ中
- ✅ 投票画面
- ✅ 結果画面
- ✅ ヴォイド順番選択画面
- ✅ デマーシア演技者選択画面

### 6. モバイルテスト
1. ブラウザ幅を768px以下にする
2. ボタンサイズが小さくなることを確認
3. タップしやすいサイズであることを確認

### 7. ホバーエフェクトテスト（PC）
1. メインボタンにマウスオーバー → 拡大する ✅
2. SNSボタンにマウスオーバー → 拡大する ✅
3. スムーズなアニメーション ✅

## 🎯 動作フロー

### シェアボタンクリックの流れ
```
1. ユーザーが 📤 ボタンをクリック
   ↓
2. toggleFloatingShare() が呼ばれる
   ↓
3. .active クラスがトグルされる
   ↓
4. メニューがスライドインで表示される
   ↓
5. ユーザーがSNSボタンをクリック
   ↓
6. shareOnTwitter() / shareOnDiscord() などが呼ばれる
   ↓
7. シェアテキストが生成される
   ↓
8. 各プラットフォームのシェア処理が実行される
```

## 📊 シェアテキストの種類

### 1. モード選択画面 / ゲーム選択画面
```
🎮 Esports Word Wolf で遊ぼう！LoL・VALORANTのテーマでパーティゲーム！

Esports Word Wolf - eスポーツで遊ぶパーティゲーム
https://your-domain.com/
```

### 2. ワードウルフモード
```
🎮 ワードウルフで遊んでます！誰が人狼か見抜けるかな？

League of Legendsのテーマで遊べる無料オンラインパーティゲーム！

Esports Word Wolf - eスポーツで遊ぶパーティゲーム
https://your-domain.com/
```

### 3. デマーシアモード
```
🎭 デマーシアに心を込めて！名セリフで演技対決中！

VALORANTのテーマで遊べる無料オンラインパーティゲーム！

Esports Word Wolf - eスポーツで遊ぶパーティゲーム
https://your-domain.com/
```

### 4. ヴォイドモード
```
🌌 ヴォイドに届くは光か闇か！連想ゲームで協力プレイ！

League of Legendsのテーマで遊べる無料オンラインパーティゲーム！

Esports Word Wolf - eスポーツで遊ぶパーティゲーム
https://your-domain.com/
```

## 🔄 Before & After

### Before (v2)
- ❌ 結果画面にしかシェアボタンがない
- ❌ 他の画面からはシェアできない
- ❌ ボタンが大きくスペースを取る

### After (v3)
- ✅ すべての画面でシェア可能
- ✅ フローティングボタンで邪魔にならない
- ✅ コンパクトで使いやすい
- ✅ アニメーションで視覚的に魅力的

## 🚀 将来の拡張機能

### 追加可能なSNS
- Facebook
- Bluesky
- Threads
- Telegram
- WhatsApp

### 追加機能アイデア
1. **シェア回数カウント** - 各プラットフォームのシェア回数を記録
2. **画像付きシェア** - Canvas APIで結果画像を自動生成
3. **カスタムメッセージ** - ユーザーが独自のメッセージを追加
4. **QRコード生成** - シェア用のQRコード生成
5. **埋め込みコード** - ブログ埋め込み用コード生成

## 🎨 カスタマイズ方法

### ボタンの位置を変更
```css
.floating-share-container {
  bottom: 80px;   /* 下からの距離 */
  right: 20px;    /* 右からの距離 */
}
```

### ボタンのサイズを変更
```css
.floating-share-toggle {
  width: 56px;    /* ボタンの幅 */
  height: 56px;   /* ボタンの高さ */
  font-size: 24px; /* 絵文字のサイズ */
}
```

### ボタンの色を変更
```css
.floating-share-toggle {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

## ✅ 完了チェックリスト

- [x] フローティングボタンのHTML生成
- [x] 開閉アニメーション実装
- [x] 各SNSシェア機能連携
- [x] モバイル対応
- [x] ホバーエフェクト
- [x] グラデーション配色
- [x] ゲームモード別テキスト生成
- [x] デフォルトテキスト追加
- [x] 全画面対応
- [x] ドキュメント作成

---

## 🎉 完成！

フローティングシェアボタンが実装され、**どの画面からでもSNSシェアが可能**になりました！

完全リロード（Ctrl + Shift + R）してテストしてください！
