# ヴォイドゲーム - カテゴリー選択機能

## 📅 実装日: 2026-02-16

## 🎯 概要
「ヴォイドに届くは光か闇か」ゲームにカテゴリー選択機能を追加。ワードウルフやデマーシアと同様に、プレイしたいカテゴリーを選択してテーマをフィルタリングできるようになりました。

## ✨ 新機能

### 1. カテゴリー選択UI
ルーム作成画面に「カテゴリー選択」セクションを追加：

#### League of Legends カテゴリー（4種類）
- ✅ チャンピオン (champions) - 10テーマ
- ✅ アイテム (items) - 5テーマ
- ✅ 地域 (places) - 5テーマ
- ✅ ゲーム用語 (concepts) - 5テーマ

#### VALORANT カテゴリー（4種類）
- ✅ エージェント (agent) - 5テーマ
- ✅ 武器 (weapon) - 3テーマ
- ✅ マップ (map) - 5テーマ
- ✅ ゲーム用語 (concept) - 2テーマ

### 2. ゲームタイプ別カテゴリー表示
- LOLを選択すると、LOL用カテゴリーが表示
- VALORANTを選択すると、VALORANT用カテゴリーが表示
- デフォルトですべてのカテゴリーがチェック済み

### 3. カテゴリーフィルタリング機能
- 選択されたカテゴリーのテーマのみが抽選対象になる
- 最低1つのカテゴリーを選択する必要がある
- カテゴリーが未選択の場合、アラートで通知

## 📝 変更ファイル

### 1. `js/void-data.js` (+50行)
```javascript
// 新規関数追加
function getRandomVoidThemeByCategories(gameType, selectedCategories)
function getVoidCategories(gameType)
```

**機能**:
- 選択されたカテゴリーに基づいてランダムテーマを取得
- ゲームタイプの全カテゴリー情報を取得（i18n対応）

### 2. `js/i18n.js` (+24行)
```javascript
// 日本語
'void.category.champions': 'チャンピオン',
'void.category.items': 'アイテム',
'void.category.places': '地域',
'void.category.concepts': 'ゲーム用語',
'void.category.agents': 'エージェント',
'void.category.weapons': '武器',
'void.category.maps': 'マップ',
```

**対応言語**:
- 🇯🇵 日本語
- 🇬🇧 英語
- 🇰🇷 韓国語
- 🇨🇳 中国語（簡体字）

### 3. `index.html` (+54行)
```html
<!-- カテゴリー選択セクション -->
<div id="void-categories-section" class="form-group">
  <label>カテゴリー選択</label>
  <div id="void-category-checkboxes" class="checkbox-group">
    <!-- LOL用カテゴリー -->
    <div class="checkbox-item void-lol-category">...</div>
    <!-- VALORANT用カテゴリー -->
    <div class="checkbox-item void-valorant-category">...</div>
  </div>
</div>
```

### 4. `js/void-main.js` (+22行, -4行)
```javascript
// カテゴリー選択の取得
let selectedCategories = [];
if (themeMode === 'random') {
  const categoryCheckboxes = document.querySelectorAll('input[name="void-category"]:checked');
  selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
  
  if (selectedCategories.length === 0) {
    alert('カテゴリーを1つ以上選択してください');
    return;
  }
}

// テーマ取得
let theme = null;
if (themeMode === 'random') {
  theme = getRandomVoidThemeByCategories(selectedGameType, selectedCategories);
}
```

### 5. `js/main.js` (+14行)
```javascript
// ヴォイドモードの場合
if (selectedGameMode === 'void') {
  // ヴォイド用カテゴリー表示切り替え
  const voidLolCategories = document.querySelectorAll('.void-lol-category');
  const voidValorantCategories = document.querySelectorAll('.void-valorant-category');
  
  if (gameType === 'lol') {
    voidLolCategories.forEach(el => el.style.display = 'flex');
    voidValorantCategories.forEach(el => el.style.display = 'none');
  } else if (gameType === 'valorant') {
    voidLolCategories.forEach(el => el.style.display = 'none');
    voidValorantCategories.forEach(el => el.style.display = 'flex');
  }
  
  showScreen('void-home-screen');
  return;
}
```

## 🎮 使い方

### プレイヤー向け

1. **モード選択**: 「ヴォイドに届くは光か闇か」を選択
2. **ゲームタイプ選択**: LOLまたはVALORANTを選択
3. **ルーム作成**: 「ルームを作成」をクリック
4. **カテゴリー選択**: 
   - 「ランダム」を選択（デフォルト）
   - 遊びたいカテゴリーにチェック
   - 最低1つ以上選択必須
5. **作成**: 「作成」ボタンをクリック

### 例：LOLで「チャンピオン」と「地域」のみ遊びたい場合
```
✅ チャンピオン (10テーマから抽選)
☐  アイテム
✅ 地域 (5テーマから抽選)
☐  ゲーム用語

→ 合計15テーマから1つがランダムに選ばれる
```

## 🔧 技術詳細

### カテゴリーデータ構造

```javascript
// LOL
voidThemes.lol = {
  champions: [テーマ10個],
  items: [テーマ5個],
  places: [テーマ5個],
  concepts: [テーマ5個]
}

// VALORANT
voidThemes.valorant = [
  { category: 'agent', ... },  // 5個
  { category: 'weapon', ... }, // 3個
  { category: 'map', ... },    // 5個
  { category: 'concept', ... } // 2個
]
```

### フィルタリングロジック

```javascript
function getRandomVoidThemeByCategories(gameType, selectedCategories) {
  let allThemes = [];
  
  if (gameType === 'lol') {
    selectedCategories.forEach(category => {
      if (voidThemes.lol[category]) {
        allThemes.push(...voidThemes.lol[category]);
      }
    });
  } else if (gameType === 'valorant') {
    selectedCategories.forEach(category => {
      allThemes.push(...voidThemes.valorant.filter(t => t.category === category));
    });
  }
  
  if (allThemes.length === 0) {
    return getRandomVoidTheme(gameType); // フォールバック
  }
  
  const randomIndex = Math.floor(Math.random() * allThemes.length);
  return allThemes[randomIndex];
}
```

## 📊 統計

### カテゴリー別テーマ数

**League of Legends (合計25テーマ)**
- チャンピオン: 10 (40%)
- アイテム: 5 (20%)
- 地域: 5 (20%)
- ゲーム用語: 5 (20%)

**VALORANT (合計15テーマ)**
- エージェント: 5 (33%)
- 武器: 3 (20%)
- マップ: 5 (33%)
- ゲーム用語: 2 (14%)

## ✅ テスト項目

- [x] LOLカテゴリー選択の表示切り替え
- [x] VALORANTカテゴリー選択の表示切り替え
- [x] カテゴリー未選択時のアラート表示
- [x] 選択したカテゴリーからテーマが抽選される
- [x] 多言語対応（日/英/韓/中）
- [x] デフォルトで全カテゴリーチェック済み

## 🔮 今後の拡張予定

### 1. テーマ個別選択モード（未実装）
```html
<input type="radio" name="void-theme-mode" value="select" id="void-theme-select">
<label for="void-theme-select">選択</label>
```
→ 将来的にテーマ一覧から直接選択できる機能を実装予定

### 2. カテゴリー別テーマ数表示
```html
<label for="void-cat-champions">
  チャンピオン <span class="theme-count">(10)</span>
</label>
```

### 3. お気に入りカテゴリーの保存
```javascript
localStorage.setItem('void_favorite_categories', JSON.stringify(selectedCategories));
```

## 🎨 UI/UX改善

### デザイン統一
- ワードウルフ・デマーシアと同じチェックボックススタイルを使用
- カテゴリー名は多言語対応で自動翻訳
- モード別のテーマカラー（Void: 紫/青グラデーション）

### ユーザビリティ
- デフォルトで全カテゴリーチェック済み（初心者フレンドリー）
- 最低1つ選択必須（エラー防止）
- ゲームタイプ変更時に自動的にカテゴリー切り替え

## 📚 関連ドキュメント

- `VOID_FIREBASE_RULES.md` - Firebaseデータベースルール設定
- `RELEASE_NOTES_v1.0.23_patch1.md` - 多言語対応パッチノート
- `THEME_COLOR_UPDATE.md` - テーマカラー更新ガイド
- `VOID_WAITING_SCREEN_UNIFICATION.md` - 待機画面統一ドキュメント

## 🐛 既知の問題

なし

## 💡 備考

- テーマ選択モード（`value="select"`）は現在未実装
- カテゴリーが全て未選択の場合、従来の動作（全テーマから抽選）にフォールバック
- Firebaseに保存されるテーマデータにはカテゴリー情報も含まれる

---

**実装者**: AI Assistant  
**レビュー**: Pending  
**ステータス**: ✅ 完了
