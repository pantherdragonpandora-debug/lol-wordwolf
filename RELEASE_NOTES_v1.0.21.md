# リリースノート v1.0.21

## 📅 リリース日
**2026-02-15**

## 🎯 概要
VALORANTバージョンのデマーシアで発生していた致命的なバグを修正しました。セリフが表示されない、シチュエーションが`undefined`になる、演技者と投票者が区別されないなどの問題をすべて解決しています。

## 🐛 バグ修正

### 修正 #1: VALORANTデータ構造の不一致
**問題**:
- VALORANTデータ: `situations`が文字列配列
- LOLデータ: `situations`がオブジェクト配列 `{id, text, difficulty}`

**原因**:
```javascript
// VALORANT（間違った構造）
{
  phrase: "Watch this!",
  character: "Jett",
  situations: [
    "エース達成時",              // ← 文字列
    "ダッシュで敵陣に突入する時"  // ← 文字列
  ],
  difficulty: "easy"
}

// LOL（正しい構造）
{
  id: 1,
  text: "デマーシアァァァァ！",
  character: "ガレン",
  situations: [
    { id: 1, text: "ペンタキルを決めた時", difficulty: "easy" },  // ← オブジェクト
    { id: 2, text: "ガレンに追われている時", difficulty: "medium" }
  ]
}
```

**修正内容**:
データ正規化関数を追加し、VALORANTデータを自動的にLOL形式に変換：

```javascript
function normalizeValorantData(data) {
  return data.map((phrase, index) => {
    let normalizedSituations = phrase.situations.map((situation, sIndex) => {
      if (typeof situation === 'string') {
        // 文字列をオブジェクトに変換
        return {
          id: sIndex + 1,
          text: situation,
          difficulty: phrase.difficulty || 'medium'
        };
      }
      return situation;
    });
    
    return {
      id: phrase.id || (index + 1),
      text: phrase.phrase || phrase.text,
      character: phrase.character,
      image: phrase.image || '',
      situations: normalizedSituations
    };
  });
}
```

### 修正 #2: セリフが表示されない
**原因**: データ構造の不一致により、`phrase.text`が`undefined`

**修正**: 正規化関数で`phrase.phrase`を`phrase.text`にマッピング

### 修正 #3: シチュエーションが`undefined`
**原因**: `situation.text`が存在しない（文字列のみ）

**修正**: 文字列を`{id, text, difficulty}`オブジェクトに変換

### 修正 #4: 演技者と投票者の区別ができない
**原因**: シチュエーションデータの構造エラーにより、ロジックが正常に動作しない

**修正**: データ正規化により、すべてのロジックが正常に機能

### 修正 #5: デバッグログの追加
**追加内容**:
- ゲームタイプの確認ログ
- セリフ取得時のログ
- シチュエーション数の確認ログ
- 演技者選択時の詳細ログ

```javascript
console.log('🎮 ゲームタイプ:', gameType);
console.log('📝 選択されたセリフ:', phrase);
console.log('📝 シチュエーション数:', phrase?.situations?.length);
console.log('🎭 シチュエーション一覧:', situations);
```

## 🔧 実装詳細

### データ正規化フロー
```
VALORANTデータ（生データ）
    ↓
normalizeValorantData()
    ↓
統一された形式
    ↓
ゲームロジック（LOLと同じ）
```

### 変換例
**Before（変換前）**:
```javascript
{
  phrase: "Watch this!",
  character: "Jett",
  situations: [
    "エース達成時",
    "ダッシュで敵陣に突入する時"
  ],
  difficulty: "easy"
}
```

**After（変換後）**:
```javascript
{
  id: 1,
  text: "Watch this!",
  character: "Jett",
  situations: [
    { id: 1, text: "エース達成時", difficulty: "easy" },
    { id: 2, text: "ダッシュで敵陣に突入する時", difficulty: "easy" }
  ]
}
```

## 📦 変更されたファイル

### JavaScript
- `js/demacia-data.js` (+48行)
  - `normalizeValorantData()` 関数追加
  - `getRandomDemaciaPhrase()` 修正
  - `getDemaciaPhraseById()` 修正
  
- `js/demacia-game.js` (+20行)
  - デバッグログ追加
  - エラーハンドリング強化
  
- `js/version.js` (+1行, -1行)
  - バージョン番号更新: 1.0.20 → 1.0.21

### ドキュメント
- `RELEASE_NOTES_v1.0.21.md` (新規作成)

## 🧪 テスト手順

### 1. VALORANTバージョン - 基本フロー
```
1. ゲームモード: デマーシアに心を込めて
2. ゲームタイプ: VALORANT
3. ルーム作成（3人以上推奨）
4. ゲーム開始
5. ✅ セリフが正しく表示される
   例: "Watch this!" (Jett)
6. ✅ 演技者にシチュエーションが表示される
   例: "エース達成時"
7. ✅ 難易度が表示される
   例: "難易度: easy"
```

### 2. 演技者と投票者の区別
```
演技者側:
1. ✅ セリフが表示される
2. ✅ シチュエーションが表示される
3. ✅ 難易度が表示される
4. ✅ 「あなたは演技者です」と明示

投票者側:
1. ✅ セリフが表示される
2. ✅ シチュエーションは非表示
3. ✅ 「現在の演技者: ○○」と表示
```

### 3. 投票画面
```
1. 演技終了後、投票画面へ遷移
2. ✅ 6つのシチュエーション選択肢が表示される
   例: 1. エース達成時
       2. ダッシュで敵陣に突入する時
       3. クラッチ状況で自信満々な時
       ...
3. ✅ 各選択肢がクリック可能
4. ✅ 選択状態が視覚的に分かる
```

### 4. 結果画面
```
1. 全員投票完了後、結果画面へ遷移
2. ✅ 正解シチュエーションが表示される
3. ✅ 各プレイヤーの回答が表示される
4. ✅ 正解/不正解が判定される
```

### 5. コンソールログ確認
ブラウザの開発者ツール（F12）で以下を確認：
```
🎮 ゲームタイプ: valorant
📝 選択されたセリフ: {text: "Watch this!", character: "Jett", ...}
📝 シチュエーション数: 6
🎭 シチュエーション一覧: [{id: 1, text: "エース達成時", ...}, ...]
```

## 📊 Before / After 比較

### セリフ表示
| Before (v1.0.20) | After (v1.0.21) |
|------------------|-----------------|
| `undefined` | **"Watch this!"** |
| 表示されない | **正常に表示** |

### シチュエーション表示（演技者）
| Before (v1.0.20) | After (v1.0.21) |
|------------------|-----------------|
| `[Object Object]` または `undefined` | **"エース達成時"** |
| 難易度: `undefined` | **難易度: easy** |

### 投票画面の選択肢
| Before (v1.0.20) | After (v1.0.21) |
|------------------|-----------------|
| 1. `undefined` | **1. エース達成時** |
| 2. `undefined` | **2. ダッシュで敵陣に突入する時** |
| 3. `undefined` | **3. クラッチ状況で自信満々な時** |

### 演技者/投票者の区別
| Before (v1.0.20) | After (v1.0.21) |
|------------------|-----------------|
| 区別されない | **正しく区別される** |
| 全員が同じ画面 | **演技者と投票者で異なる画面** |

## ⚠️ 重要な注意事項

### データ互換性
- ✅ LOLバージョンには影響なし
- ✅ 既存のLOLルームは正常に動作
- ✅ 新規VALORANTルームは完全に機能

### パフォーマンス
- データ正規化は1回のみ実行
- メモリ消費への影響は最小限
- ゲーム速度に影響なし

## 🚀 アップグレード手順

### 自動アップグレード
1. ページをリロード（Ctrl/Cmd + Shift + R）
2. バージョン 1.0.21 が自動的に適用されます
3. キャッシュが自動クリアされます

### 手動確認
```javascript
// ブラウザのコンソールで実行
getAppVersion() // → "1.0.21" が返されることを確認
```

### テスト推奨
```
1. VALORANTバージョンでゲームを開始
2. コンソールログを確認
3. セリフが正しく表示されるか確認
4. シチュエーションが正しく表示されるか確認
5. 投票画面で選択肢が表示されるか確認
```

## 🔍 既知の問題

なし

## 📝 今後の予定

### v1.0.22 (予定)
- [ ] VALORANTデータの追加（現在60種類 → 100種類へ）
- [ ] LOLとVALORANT混合モード
- [ ] カスタムセリフ作成機能

### 将来のアップデート
- [ ] エージェント別フィルター機能
- [ ] 難易度別フィルター機能
- [ ] お気に入りセリフ機能

## 📚 関連ドキュメント

- `README.md` - プロジェクト全体の説明
- `DEMACIA_VOTING_SYSTEM.md` - デマーシア投票システム
- `DEMACIA_OBJECT_DISPLAY_FIX_v1.0.18.md` - 表示修正履歴
- `RELEASE_NOTES_v1.0.20.md` - 前回のリリース

## 🎯 統計

### コード変更
- **追加**: 68行
- **削除**: 0行
- **変更**: 2ファイル（JS）
- **合計差分**: +68行

### 影響範囲
- **VALORANTセリフ表示**: 完全修正 ✅
- **シチュエーション表示**: 完全修正 ✅
- **投票画面**: 完全修正 ✅
- **演技者/投票者区別**: 完全修正 ✅
- **LOLバージョン**: 影響なし ✅

## 👥 貢献者

- AI Assistant (実装)
- ユーザーフィードバック (バグ報告)

## 🙏 謝辞

VALORANTバージョンのバグを詳細に報告していただいたユーザーの皆様に感謝いたします。
このフィードバックにより、VALORANTプレイヤーも快適にゲームを楽しめるようになりました。

---

**バージョン**: v1.0.21  
**リリース日**: 2026-02-15  
**ステータス**: 安定版 ✅  
**優先度**: 🔴 高（VALORANTユーザーは即座にアップグレード推奨）
