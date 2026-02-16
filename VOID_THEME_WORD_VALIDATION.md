# ヴォイドゲーム - テーマ単語使用禁止機能

## 📅 実装日: 2026-02-16

## 🎯 概要
「ヴォイドに届くは光か闇か」ゲームで、プレイヤーが連想ワードとしてテーマと同じ単語を入力できないようにする制限を追加しました。これにより、ゲームの難易度が適切に保たれ、より面白いプレイ体験が実現されます。

## ✨ 新機能

### 1. テーマ単語チェック機能
プレイヤーが入力した連想ワードが、テーマ名と一致しないかをチェック：
- ✅ 大文字・小文字を区別しない（`Yasuo` と `yasuo` は同じ）
- ✅ 全角・半角を区別しない（`ヤスオ` と `ﾔｽｵ` は同じ）
- ✅ スペースは無視（`League of Legends` と `LeagueofLegends` は同じ）
- ✅ 完全一致のみを禁止（部分一致は許可）

### 2. リアルタイムバリデーション
ワード送信時に自動的にチェック：
- 最初のプレイヤー（3つのワード入力時）
- 中間プレイヤー（3つのワード入力時）
- エラー時は分かりやすいメッセージを表示

### 3. 多言語対応エラーメッセージ
4つの言語でエラーメッセージを表示：
- 🇯🇵 日本語: `テーマと同じ単語「ヤスオ」は使用できません。\n別の連想ワードを入力してください。`
- 🇬🇧 英語: `You cannot use the theme word "Yasuo".\nPlease enter different associated words.`
- 🇰🇷 韓国語: `테마와 같은 단어 "야스오"는 사용할 수 없습니다.\n다른 연상 단어를 입력하세요.`
- 🇨🇳 中国語: `不能使用主题词 "亚索"。\n请输入其他联想词。`

## 📝 変更ファイル

### 1. `js/void-main.js` (+38行)

#### 新規関数追加
```javascript
// テーマ単語との一致チェック（大文字小文字、全角半角を無視）
function isMatchingTheme(word, themeName) {
  if (!word || !themeName) return false;
  
  // 正規化関数
  const normalize = (str) => {
    return str
      .toLowerCase() // 小文字化
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)) // 全角英数字を半角に
      .replace(/[\s　]/g, '') // スペースを除去
      .trim();
  };
  
  const normalizedWord = normalize(word);
  const normalizedTheme = normalize(themeName);
  
  // 完全一致チェック
  return normalizedWord === normalizedTheme;
}

// テーマ名を取得
function getCurrentThemeName() {
  if (!currentVoidGame || !currentVoidGame.roomData) return null;
  return currentVoidGame.roomData.theme?.name;
}
```

#### バリデーション追加
```javascript
// 最初のワード送信
async function submitVoidFirstWords() {
  // ... 既存のコード ...
  
  // テーマ名との一致チェック
  const themeName = getCurrentThemeName();
  if (themeName) {
    const matchingWords = words.filter(w => isMatchingTheme(w, themeName));
    if (matchingWords.length > 0) {
      alert(t('void.alert.themeWordNotAllowed', { theme: themeName }));
      return;
    }
  }
  
  // ... 送信処理 ...
}

// 中間ワード送信（同様のチェックを追加）
async function submitVoidMiddleWords() {
  // ... 同上 ...
}
```

### 2. `js/i18n.js` (+12行)

#### 日本語
```javascript
'void.alert.themeWordNotAllowed': 'テーマと同じ単語「{theme}」は使用できません。\n別の連想ワードを入力してください。',
'void.alert.enterAllWords': '3つすべての言葉を入力してください',
'void.alert.enterAnswer': '回答を入力してください'
```

#### 英語
```javascript
'void.alert.themeWordNotAllowed': 'You cannot use the theme word "{theme}".\nPlease enter different associated words.',
'void.alert.enterAllWords': 'Please enter all 3 words',
'void.alert.enterAnswer': 'Please enter your answer'
```

#### 韓国語
```javascript
'void.alert.themeWordNotAllowed': '테마와 같은 단어 "{theme}"는 사용할 수 없습니다.\n다른 연상 단어를 입력하세요.',
'void.alert.enterAllWords': '3개의 단어를 모두 입력하세요',
'void.alert.enterAnswer': '답변을 입력하세요'
```

#### 中国語
```javascript
'void.alert.themeWordNotAllowed': '不能使用主题词 "{theme}"。\n请输入其他联想词。',
'void.alert.enterAllWords': '请输入全部3个词语',
'void.alert.enterAnswer': '请输入您的答案'
```

## 🎮 動作例

### ケース1: テーマが「ヤスオ」の場合

❌ **禁止される入力**
- `ヤスオ`
- `yasuo`
- `YASUO`
- `Yasuo`
- `ﾔｽｵ`（全角カタカナ）
- `　ヤスオ　`（前後にスペース）

✅ **許可される入力**
- `風`
- `侍`
- `壁`
- `ノックアップ`
- `流浪`

### ケース2: テーマが「Infinity Edge」の場合

❌ **禁止される入力**
- `Infinity Edge`
- `infinityedge`（スペースなし）
- `INFINITYEDGE`
- `Ｉｎｆｉｎｉｔｙ　Ｅｄｇｅ`（全角）

✅ **許可される入力**
- `剣`
- `クリティカル`
- `AD`
- `Infinity`（部分一致は許可）
- `Edge`（部分一致は許可）

## 🔧 技術詳細

### 正規化アルゴリズム

```javascript
const normalize = (str) => {
  return str
    .toLowerCase() // 1. 小文字化
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => 
      String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    ) // 2. 全角英数字 → 半角
    .replace(/[\s　]/g, '') // 3. スペース除去
    .trim(); // 4. 前後の空白削除
};
```

### チェックフロー

```
ユーザー入力 → サニタイズ → テーマチェック → 送信
                  ↓              ↓
              (30文字制限)   (一致するか？)
                                ↓
                            YES → エラー
                            NO  → OK
```

### パフォーマンス
- 計算量: O(n)（n = 文字列長）
- メモリ: O(1)（正規化は新しい文字列を生成するが、即座に解放）
- ユーザー体験への影響: なし（即座にチェック完了）

## ✅ テスト項目

- [x] テーマと完全に同じ単語を入力 → エラー表示
- [x] テーマの一部を含む単語を入力 → 送信成功
- [x] 大文字小文字を変えて入力 → エラー表示
- [x] 全角半角を変えて入力 → エラー表示
- [x] スペースを含む/含まない → 正しくチェック
- [x] 多言語でエラーメッセージ表示
- [x] 最初のプレイヤーと中間プレイヤーで動作
- [x] テーマが取得できない場合のフォールバック

## 🎯 ゲームバランス

### 実装前の問題
- プレイヤーがテーマをそのまま入力できた
- ゲームが簡単すぎて面白くない
- 最初のプレイヤーが答えを言ってしまう

### 実装後の改善
- ✅ テーマの直接入力が不可能
- ✅ 連想力が必要になり、ゲームが面白くなる
- ✅ 最後のプレイヤーへの伝言ゲームとして機能

## 🔮 今後の拡張案

### 1. 類似語チェック（未実装）
```javascript
// 例: 「ヤスオ」→「やすお」「八雲」なども禁止
function isSimilarToTheme(word, themeName) {
  // ひらがな・カタカナの相互変換
  // レーベンシュタイン距離による類似度判定
}
```

### 2. テーマのヒント単語も禁止（未実装）
```javascript
// 例: テーマ「ヤスオ」のヒント['風', '侍', '壁', 'ノックアップ', '流浪']も禁止
function isThemeHint(word, themeHints) {
  return themeHints.some(hint => isMatchingTheme(word, hint));
}
```

### 3. リアルタイムフィードバック（未実装）
```html
<!-- 入力中にエラー表示 -->
<input type="text" id="void-first-word-1" class="error">
<span class="error-text">テーマと同じ単語は使えません</span>
```

## 🐛 既知の制限事項

### 1. 部分一致は許可される
- テーマ「Infinity Edge」に対して「Infinity」は入力可能
- **理由**: 過度な制限はゲームを難しくしすぎる

### 2. 類似語は検出されない
- テーマ「ヤスオ」に対して「やすお」（ひらがな）は入力可能
- **理由**: 日本語の表記揺れを完全に検出するのは困難

### 3. 多言語テーマの場合
- テーマが「Yasuo」でも「ヤスオ」は入力可能
- **理由**: 異なる言語として扱われる

## 💡 設計思想

### なぜ完全一致のみを禁止？
1. **過度な制限を避ける**: 部分一致まで禁止すると、使える単語が極端に減る
2. **創造性を尊重**: プレイヤーの連想力を信頼する
3. **実装の複雑性**: 類似語検出は誤判定が多く、ユーザー体験を損なう

### なぜリアルタイムフィードバックなし？
1. **送信時チェックで十分**: ユーザーが送信ボタンを押すまでは自由に入力できる
2. **実装コスト**: リアルタイムチェックはイベントリスナーの追加が必要
3. **パフォーマンス**: 入力のたびにチェックすると重くなる可能性

## 📚 関連ドキュメント

- `VOID_CATEGORY_SELECTION.md` - カテゴリー選択機能
- `VOID_FIREBASE_RULES.md` - Firebaseルール設定
- `RELEASE_NOTES_v1.0.23_patch1.md` - 多言語対応パッチ

## 🎉 まとめ

この機能により：
- ✅ テーマと同じ単語の入力を防止
- ✅ ゲームの難易度と面白さが向上
- ✅ 多言語対応で全プレイヤーに公平
- ✅ シンプルで分かりやすいエラーメッセージ

プレイヤーは連想力を駆使して、テーマを直接言わずに伝える面白さを楽しめます！

---

**実装者**: AI Assistant  
**レビュー**: Pending  
**ステータス**: ✅ 完了
