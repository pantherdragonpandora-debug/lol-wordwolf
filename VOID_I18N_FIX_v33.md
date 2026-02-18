# ヴォイド多言語化対応 (v33)

**日時**: 2026-02-17  
**バージョン**: v33  
**問題**: ポップアップと画面が選択した言語を反映していない

---

## 🐛 修正した問題

### **問題1: alertが日本語固定**
すべてのalert（ポップアップ）メッセージがハードコードされた日本語で、言語設定を変更しても反映されない

### **問題2: ヴォイド画面が多言語化されていない**
ルーム作成画面以降の各種メッセージが日本語固定

---

## ✅ 修正内容

### **1. 翻訳キーの追加**

#### **日本語**
```javascript
'void.alert.classNotLoaded': 'エラー: VoidGameクラスが読み込まれていません...',
'void.alert.tooFast': 'ルーム作成が早すぎます...',
'void.alert.maxPlayersNotFound': 'エラー: 人数選択要素が見つかりません',
'void.alert.themeModeNotFound': 'エラー: テーマモード選択要素が見つかりません',
'void.alert.playerNameLength': 'プレイヤー名は1〜20文字で入力してください',
'void.alert.selectCategory': 'カテゴリーを1つ以上選択してください',
'void.alert.createFailed': 'ルーム作成に失敗しました: {error}',
'void.alert.joinTooFast': 'ルーム参加の試行が早すぎます...',
'void.alert.roomIdFormat': 'ルームIDは6桁の数字で入力してください',
'void.alert.joinFailed': 'ルーム参加に失敗しました: {error}',
'void.alert.selectPlayers': 'プレイヤーの順番を決定してください',
'void.alert.selectAllPlayers': '全員の順番を決定してください（{current}/{total}）',
'void.alert.orderConfirmFailed': '順番確定に失敗しました: {error}',
```

#### **英語**
```javascript
'void.alert.classNotLoaded': 'Error: VoidGame class not loaded...',
'void.alert.tooFast': 'Room creation too fast...',
'void.alert.playerNameLength': 'Player name must be 1-20 characters',
// ... 全て対応
```

#### **韓国語・中国語**
同様に全メッセージを翻訳

---

### **2. コードの修正**

#### **修正前**
```javascript
alert('エラー: VoidGameクラスが読み込まれていません。\nブラウザを完全リロード（Ctrl+Shift+R）してください。');
```

#### **修正後**
```javascript
alert(t('void.alert.classNotLoaded'));
```

#### **パラメータ付き**
```javascript
// 修正前
alert('ルーム作成に失敗しました: ' + error.message);

// 修正後
alert(t('void.alert.createFailed', { error: error.message }));
```

---

## 📊 修正した箇所

| ファイル | 修正内容 | 行数 |
|---------|---------|------|
| `js/i18n.js` | 翻訳キー追加（4言語） | +60行 |
| `js/void-main.js` | alert置き換え | 12箇所 |

---

## 🌍 対応言語

| 言語 | 状態 |
|-----|------|
| 日本語 | ✅ 完全対応 |
| 英語 | ✅ 完全対応 |
| 韓国語 | ✅ 完全対応 |
| 中国語（簡体字） | ✅ 完全対応 |

---

## 🧪 テスト手順

### **1. プレビューをリロード**
- **Ctrl+Shift+R** (Mac: **Cmd+Shift+R**)
- コンソールで `v33` を確認

### **2. 言語を変更**
1. 画面右上の言語ボタン（🇯🇵 / 🇬🇧 / 🇰🇷 / 🇨🇳）をクリック
2. 言語が切り替わることを確認

### **3. ヴォイドモードをテスト**

#### **日本語**
1. 言語を日本語に設定
2. ヴォイド → ルーム作成
3. プレイヤー名を空欄で「作成」クリック
4. **期待**: 「プレイヤー名は1〜20文字で入力してください」と表示 ✅

#### **英語**
1. 言語を英語に設定
2. 同じ手順を実行
3. **期待**: "Player name must be 1-20 characters" と表示 ✅

#### **韓国語**
1. 言語を韓国語に設定
2. 同じ手順を実行
3. **期待**: "플레이어 이름은 1~20자로 입력하세요" と表示 ✅

#### **中国語**
1. 言語を中国語に設定
2. 同じ手順を実行
3. **期待**: "玩家名称必须为1-20个字符" と表示 ✅

---

## 📝 変更ファイル

- `js/i18n.js` - 翻訳キー追加（v13 → v33）
- `js/void-main.js` - alert多言語化（v32 → v33）
- `index.html` - バージョン番号更新

---

## 🎯 まとめ

**完了した修正**:
1. ✅ ヴォイドの全alertメッセージを多言語化
2. ✅ 日本語・英語・韓国語・中国語に対応
3. ✅ パラメータ付きメッセージも対応（エラー詳細など）

**動作**:
- 言語切り替え後、alertメッセージも自動的に対応言語で表示
- エラーメッセージも選択した言語で表示

**次のステップ**:
1. プレビューをリロード（Ctrl+Shift+R）
2. 各言語でテスト
3. 問題があれば報告

---

**修正バージョン**: v33  
**修正日時**: 2026-02-17  
**ステータス**: ✅ 完了
