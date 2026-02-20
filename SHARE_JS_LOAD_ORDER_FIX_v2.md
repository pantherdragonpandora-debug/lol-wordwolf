# share.js 読み込み順序修正 (v2)

## 📅 修正日
2026-02-20

## 🐛 問題
share.js を main.js と void-main.js の**前**に読み込んでいたため、`showScreen` 関数が未定義の状態でフックしようとして画面遷移が壊れた。

### エラー症状
- ゲームモード選択ボタンをクリックしても何も起こらない
- `showScreen` 関数が正しく動作しない
- コンソールに `showScreen is not defined` などのエラーが出る可能性

## 🔧 修正内容

### 1. share.js の読み込み順序を変更
**Before**
```html
<script src="js/pageview-counter.js?v=22"></script>
<script src="js/share.js?v=1"></script>  <!-- ここが早すぎた -->
<script src="js/void-main.js?v=38"></script>
<script src="js/main.js?v=35"></script>
```

**After**
```html
<script src="js/pageview-counter.js?v=22"></script>
<script src="js/void-main.js?v=38"></script>
<script src="js/main.js?v=35"></script>
<!-- シェア機能（main.jsの後に読み込む） -->
<script src="js/share.js?v=2"></script>
```

### 2. showScreen フックのタイミングを修正

**Before (v1)**
```javascript
// DOMContentLoaded時に即座に実行（showScreenが未定義）
const originalShowScreen = window.showScreen;
if (originalShowScreen) {
  window.showScreen = function(screenId) {
    originalShowScreen(screenId);
    if (screenId.includes('result')) {
      setTimeout(addShareButtonsToResultScreen, 100);
    }
  };
}
```

**After (v2)**
```javascript
// window.load イベントで実行（全てのスクリプトが読み込まれた後）
window.addEventListener('load', function() {
  const originalShowScreen = window.showScreen;
  if (originalShowScreen && typeof originalShowScreen === 'function') {
    window.showScreen = function(screenId) {
      originalShowScreen(screenId);
      if (screenId && screenId.includes('result')) {
        setTimeout(addShareButtonsToResultScreen, 100);
      }
    };
    console.log('✅ showScreen フックを設定しました');
  }
});
```

## 📝 変更ファイル
- `index.html` - スクリプト読み込み順序変更
- `js/share.js` (v1 → v2) - フックタイミング修正

## ✅ 修正後の動作
1. main.js と void-main.js が先に読み込まれる
2. `showScreen` 関数が定義される
3. share.js が読み込まれる
4. `window.load` イベントで安全にフックを設定
5. 画面遷移が正常に動作する
6. 結果画面でシェアボタンが自動追加される

## 🧪 テスト手順
1. **完全リロード**: `Ctrl + Shift + R`
2. **コンソール確認**:
   ```
   ✅ シェア機能を初期化しました
   📤 share.js ロード完了 (v2)
   ✅ showScreen フックを設定しました
   ```
3. **モード選択**: ワードウルフ、デマーシア、ヴォイドのボタンをクリック
4. **画面遷移確認**: ゲーム選択画面が正しく表示される
5. **シェアボタン確認**: ゲームを最後まで進めて結果画面でシェアボタンが表示される

## 📚 学んだこと
- **スクリプトの読み込み順序は重要**: 依存関係のあるスクリプトは後に読み込む
- **関数のフックは慎重に**: 元の関数が存在するか確認してからフックする
- **DOMContentLoaded vs load**: 
  - `DOMContentLoaded`: DOM構築完了時（スクリプトは未完了の可能性）
  - `load`: すべてのリソース読み込み完了時（より安全）

## 🔄 今後の改善案
より安全な実装として、Mutation Observer を使う方法も検討可能：
```javascript
// 結果画面が表示されたら自動でボタン追加
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.id && node.id.includes('result')) {
        addShareButtonsToResultScreen();
      }
    });
  });
});
```

---

**修正完了**: 画面遷移の問題が解決され、シェア機能も正常に動作するようになりました。
