# 気分診断ロード問題の修正 (v8)

# 気分診断ロード問題の修正 (v8 - FINAL)

## 🚨 発生していた問題

### 症状
```
Uncaught ReferenceError: startMoodQuiz is not defined
    at HTMLButtonElement.onclick (index.html:1160:82)
```

- 「診断を始める」ボタンをクリックしても何も起こらない
- `startMoodQuiz` 関数が未定義エラー
- コンソールに `mood-quiz.js` のロードログが一切表示されない

### 根本原因（最終判明）

**mood-quiz.js 内に構文エラーが存在**

```javascript
// 537-541行目 - 誤った記述
function getLaneDisplayText(champion, selectedLane) {
  // ... コード ...
  return mainLanes || '—';
}
  `;              // ← 💥 この不要な行が原因！
  
  return card;    // ← 💥 これも不要（スコープ外のreturn）
}
```

**問題点：**
1. `}` の後に不要な `` `;` があった（HTMLテンプレートリテラルの閉じタグ）
2. 関数の外に `return card;` があった
3. これらが `Unexpected token 'class'` エラーを引き起こし、**ファイル全体が読み込まれない状態**だった

**なぜ見つけにくかったか：**
- エラーメッセージが「Unexpected token 'class'」だったが、実際には `}` や `return` が問題だった
- ブラウザのJavaScriptパーサーがファイル全体を拒否するため、最初の `console.log` すら実行されなかった
- コンソールには「🎭 mood-quiz.js ロード開始...」が**一切表示されない**という症状

## ✅ 実施した修正

### 1. **構文エラーの修正（最重要）**

**js/mood-quiz.js (v8 - 完全に再作成)**

不要なコード片を削除し、ファイル全体をクリーンに再構築：

```javascript
// ❌ 修正前（537-541行目）- バグあり
function getLaneDisplayText(champion, selectedLane) {
  // ... コード ...
  return mainLanes || '—';
}
  `;              // ← 削除
  
  return card;    // ← 削除
}

// ✅ 修正後 - クリーンな構造
function getLaneDisplayText(champion, selectedLane) {
  // ... コード ...
  return mainLanes || '—';
}

// スコアチャートを表示
function displayScoreChart() {
  // ... 次の関数 ...
}
```

### 2. グローバルスコープへの明示的露出

**js/mood-quiz.js (v8)**

```javascript
// 診断を開始
function startMoodQuiz() {
  console.log('🎯 startMoodQuiz() が呼ばれました');
  // ... 処理 ...
}

// グローバルスコープに明示的に露出
window.startMoodQuiz = startMoodQuiz;
console.log('✅ startMoodQuiz 関数をグローバルスコープに登録しました');
```

すべての主要関数を window オブジェクトに登録：
- `window.startMoodQuiz`
- `window.retryMoodQuiz`
- `window.backToMoodQuizHome`
- `window.exitMoodQuiz`
- `window.goBackQuestion`

### 3. デバッグログの強化

**js/mood-quiz-data.js (v6)**
```javascript
console.log('🎯🎯🎯 mood-quiz-data.js: ファイル読み込み開始');
// ... データ定義 ...
console.log('✅✅✅ 気分診断データを読み込みました（全172体対応 - マルチレーン対応 v6）');
console.log('📊 データサマリー:', {
  questions: moodQuizQuestions.length,
  aggressiveChampions: championsByMood.aggressive.length,
  // ...
});
```

**js/mood-quiz.js (v8)**
```javascript
console.log('🎭 mood-quiz.js ロード開始...');
console.log('📋 データチェック完了:', {
  moodQuizQuestions: typeof moodQuizQuestions,
  championsByMood: typeof championsByMood,
  laneBonusPoints: typeof laneBonusPoints
});
```

### 3. HTML デバッグスクリプト追加

**index.html**
```html
<!-- 気分診断（main.jsより前にロード） -->
<script src="js/mood-quiz-data.js?v=6&t=202602202"></script>
<script src="js/mood-quiz.js?v=8&t=202602202"></script>

<!-- デバッグ用：mood-quiz.jsがロードされているか確認 -->
<script>
  console.log('🔍 mood-quiz.js ロード確認 (v8):');
  console.log('  - typeof startMoodQuiz:', typeof startMoodQuiz);
  console.log('  - typeof window.startMoodQuiz:', typeof window.startMoodQuiz);
  
  if (typeof startMoodQuiz === 'undefined') {
    console.error('❌❌❌ startMoodQuiz が未定義です！');
    
    // 緊急対応：ダミー関数を定義
    window.startMoodQuiz = function() {
      alert('気分診断の初期化に失敗しました。ページを再読み込みしてください。');
    };
  } else {
    console.log('✅✅✅ startMoodQuiz 関数は正常に定義されています');
  }
</script>
```

### 4. バージョン番号更新

キャッシュを強制的にクリアするため：
- `mood-quiz-data.js`: v5 → **v6**
- `mood-quiz.js`: v7 → **v8**

## 📋 テスト手順

### 1. 完全リロード
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### 2. コンソールログ確認

正常時は以下のログが **この順序で** 表示されるはず：

```
🎯🎯🎯 mood-quiz-data.js: ファイル読み込み開始
✅✅✅ 気分診断データを読み込みました（全172体対応 - マルチレーン対応 v6）
📊 データサマリー: {questions: 12, aggressiveChampions: 43, ...}

🎭 mood-quiz.js ロード開始...
📋 データチェック完了: {moodQuizQuestions: "object", ...}
✅ startMoodQuiz 関数をグローバルスコープに登録しました
✅ 気分診断ロジックを読み込みました（v7 - 緊急修正版）
📦 登録された関数: {startMoodQuiz: "function", ...}

🔍 mood-quiz.js ロード確認 (v8):
  - typeof startMoodQuiz: function
  - typeof window.startMoodQuiz: function
✅✅✅ startMoodQuiz 関数は正常に定義されています
```

### 3. 機能テスト

1. **モード選択画面** で「気分診断」を選択
2. **気分診断ホーム画面** が表示される
3. 「診断を始める」ボタンをクリック
4. **質問画面** が表示され、質問 1 が表示される
5. 選択肢を選ぶと次の質問へ進む
6. 12問回答後、結果画面が表示される

## 🔧 トラブルシューティング

### ❌ それでもエラーが出る場合

#### 方法1: ブラウザキャッシュの完全削除
1. ブラウザの設定を開く
2. 「プライバシーとセキュリティ」→「閲覧データの削除」
3. **「キャッシュされた画像とファイル」**をチェック
4. **「すべての期間」**を選択して削除
5. ブラウザを完全に閉じて再起動

#### 方法2: 別のブラウザでテスト
- Chrome で動かない → Firefox / Edge で試す
- プライベート/シークレットモードで試す

#### 方法3: ローカル開発サーバーで確認
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

#### 方法4: GitHub Pages デプロイ
Sandbox 環境特有の問題の可能性があるため、実際の GitHub Pages にデプロイして確認

## 📝 変更ファイル一覧

| ファイル | 変更内容 | バージョン |
|---------|---------|-----------|
| `js/mood-quiz-data.js` | デバッグログ強化、データサマリー追加 | v5 → v6 |
| `js/mood-quiz.js` | グローバルスコープ露出、デバッグログ強化 | v7 → v8 |
| `index.html` | バージョン更新、デバッグスクリプト強化 | 更新 |
| `MOOD_QUIZ_LOADING_FIX_v8.md` | 本ドキュメント | 新規作成 |

## 🎯 期待される結果

- ✅ 「診断を始める」ボタンが正常に動作
- ✅ コンソールに詳細なロードログが表示
- ✅ `startMoodQuiz` 関数がグローバルスコープに登録
- ✅ 12問の質問に回答できる
- ✅ 結果画面でチャンピオンが表示される

## 📌 技術的な詳細

### なぜ `window.startMoodQuiz` が必要か？

HTML の `onclick` 属性は**グローバルスコープ**の関数を期待します：

```html
<!-- これは window.startMoodQuiz を探す -->
<button onclick="startMoodQuiz()">診断を始める</button>
```

モジュールスコープやクロージャ内の関数は見えないため、明示的に window オブジェクトに登録する必要があります。

### 代替案（推奨）

今後は `onclick` 属性ではなく、JavaScript でイベントリスナーを登録する方が安全：

```javascript
// main.js または mood-quiz.js 内
document.querySelector('#start-mood-quiz-btn').addEventListener('click', startMoodQuiz);
```

ただし、今回は即座の修正を優先し、既存の HTML 構造を維持しました。

---

**作成日**: 2026-02-21  
**バージョン**: v8 緊急修正版  
**対応者**: Assistant
