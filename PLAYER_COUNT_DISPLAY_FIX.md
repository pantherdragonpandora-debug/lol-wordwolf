# 人数表示機能の修正 - デマーシアモード対応 & ヴォイドルーム作成修正

## 概要
1. デマーシアモードには人数設定機能がないため、待機画面で「残り人数〇／〇」表示を非表示にする修正を実施
2. **ヴォイドルーム作成エラーを修正**（VoidGameクラスのグローバルエクスポート不足）

---

## 問題点

### 1. デマーシアモードでの不要な表示
- デマーシアモードは**人数制限なし**で、settings.playerCount が設定されていない
- そのため「残り人数」表示が意味をなさない
- ワードウルフモードのみで人数表示が必要

### 2. ヴォイドのルーム作成エラー ✅ **解決済み**
**エラー内容**:
```
ReferenceError: VoidGame is not defined
    at HTMLButtonElement.createVoidRoom (void-main.js:183:5)
```

**原因**: `js/void-game.js` でクラス定義はあったが、グローバルスコープへのエクスポートが欠けていた

**結果**: `void-main.js` から `new VoidGame()` を呼び出すと「未定義」エラーが発生

---

## 実装内容

### 1. **HTMLの変更** (`index.html`)

#### 修正前
```html
<!-- 人数表示 -->
<div class="form-group" style="...">
```

#### 修正後
```html
<!-- 人数表示（ワードウルフモードのみ） -->
<div id="waiting-player-count-display" class="form-group" style="...">
```

**変更点**: 固有IDを追加して、JavaScriptから制御しやすくした

---

### 2. **JavaScriptの変更** (`js/main.js`)

#### 修正前
```javascript
// 人数表示を更新
const currentCount = players.length;
const maxCount = roomData.settings?.playerCount || 5;
document.getElementById('current-player-count').textContent = currentCount;
document.getElementById('max-player-count').textContent = maxCount;
```

#### 修正後
```javascript
// 人数表示を更新
const currentCount = players.length;
const maxCount = roomData.settings?.playerCount || 5;

// ゲームモードを判定
const isDemaciaMode = (currentDemaciaGame !== null) || 
                      roomData.gameMode === 'demacia' || 
                      roomData.gameState === 'performer_selection' || 
                      roomData.gameState === 'performing' || 
                      roomData.gameState === 'round_result';

// デマーシアモードの場合は人数表示を非表示にする
const playerCountDisplay = document.getElementById('waiting-player-count-display');
if (playerCountDisplay) {
  playerCountDisplay.style.display = isDemaciaMode ? 'none' : 'block';
}

// ワードウルフモードのみ人数表示を更新
if (!isDemaciaMode) {
  document.getElementById('current-player-count').textContent = currentCount;
  document.getElementById('max-player-count').textContent = maxCount;
}
```

**変更点**:
- デマーシアモードの判定を追加
- デマーシアモードの場合は `display: none` で非表示
- ワードウルフモードの場合のみ人数を更新

---

### 3. **ヴォイドゲームクラスのグローバルエクスポート** (`js/void-game.js`) ✅ **修正完了**

#### 修正前（444行目で終了）
```javascript
  watchChat(callback) {
    // ...
  }
} // クラスの終わり
```

#### 修正後
```javascript
  watchChat(callback) {
    // ...
  }
}

// ========================================
// グローバルスコープにエクスポート
// ========================================
if (typeof window !== 'undefined') {
  window.VoidGame = VoidGame;
  console.log('✅ VoidGameクラスをグローバルにエクスポートしました');
}
```

**変更点**: 
- `window.VoidGame = VoidGame;` で明示的にグローバルに公開
- `void-main.js` から `new VoidGame()` を呼び出せるようになった
- 同様のパターンを `GameState`, `DemaciaGame` でも使用済み

### 4. **ヴォイドルーム作成のデバッグ強化** (`js/void-main.js`)
```javascript
console.log('📋 入力値チェック:');
console.log('- プレイヤー名入力:', playerNameInput);
console.log('- 最大人数要素:', maxPlayersElement ? 'あり' : 'なし');
console.log('- テーマモード要素:', themeModeElement ? 'あり' : 'なし');

console.log('🎮 ヴォイドルーム作成開始...');
console.log('- プレイヤー名:', playerName);
console.log('- 最大人数:', maxPlayers);
console.log('- テーマモード:', themeMode);
console.log('- ゲームタイプ:', selectedGameType);
console.log('- 選択カテゴリー:', selectedCategories);
```

**目的**: どの段階でエラーが発生しているかを特定

---

## 動作仕様

### ワードウルフモード
- ✅ 「残り人数 X / Y」が表示される
- ✅ プレイヤーが入退室するたびに更新される

### デマーシアモード
- ✅ 人数表示が**非表示**になる
- ✅ プレイヤーリストのみ表示される

### ヴォイドモード
- ✅ 独自の待機画面で人数表示（変更なし）
- ✅ **ルーム作成エラー修正完了！**

---

## テストケース

### 1. ワードウルフモード
1. ✅ ルーム作成 → 「残り人数 1 / 5」が表示
2. ✅ プレイヤー参加 → 「残り人数 2 / 5」に更新
3. ✅ プレイヤー退出 → 「残り人数 1 / 5」に戻る

### 2. デマーシアモード
1. ✅ ルーム作成 → 人数表示が**非表示**
2. ✅ プレイヤーリストのみ表示
3. ✅ 人数制限なしで何人でも参加可能

### 3. ヴォイドモード
1. ✅ ルーム作成 → 正常に作成される
2. ✅ 待機画面で人数表示が正常動作
3. ✅ 「VoidGame is not defined」エラーが解消

---

## 変更ファイル

| ファイル | 変更内容 | 行数 |
|---------|---------|------|
| `index.html` | 人数表示エリアにID追加 | 1行 編集 |
| `js/main.js` | デマーシアモード時に人数表示を非表示化 | +15行 |
| `js/void-game.js` | **VoidGameクラスをグローバルエクスポート** | **+7行** |
| `js/void-main.js` | ルーム作成のデバッグログ追加 | +30行 |
| `PLAYER_COUNT_DISPLAY_FIX.md` | 本ドキュメント | +250行 新規 |

**合計**: 約303行の変更・追加

---

## トラブルシューティング

### 人数表示が消えない場合（デマーシア）
1. ブラウザキャッシュをクリア (`Ctrl+Shift+R` / `Cmd+Shift+R`)
2. コンソールで `isDemaciaMode` の値を確認
3. `waiting-player-count-display` 要素の `display` スタイルを確認

### ヴォイドルーム作成エラー ✅ **解決済み**
1. ~~ブラウザの開発者ツール（F12）を開く~~
2. ~~コンソールタブでエラーメッセージを確認~~
3. ~~どの段階でエラーが出ているか（入力値チェック、ルームID生成、Firebase書き込み等）を特定~~
4. ~~エラーメッセージを報告~~

**→ 修正完了！VoidGameクラスのグローバルエクスポートを追加しました。**

---

## 今後の対応

### 短期
- [x] ~~ヴォイドルーム作成エラーの原因特定と修正~~ ✅ **完了**
- [ ] デバッグログの削除（本番環境では不要）
- [ ] 他のクラスも同様にエクスポートされているか確認

### 中期
- [ ] デマーシアモードに推奨人数の表示を追加（例: "推奨: 4-8人"）
- [ ] 各モードの待機画面UIを統一

### 長期
- [ ] 人数表示のアニメーション追加
- [ ] 満員時の視覚的フィードバック強化

---

## 完了日
2026-02-17

## 実装者
AI Assistant
