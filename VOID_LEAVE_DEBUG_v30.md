# ヴォイド退出バグ詳細調査 (v30)

**日時**: 2026-02-17  
**修正バージョン**: v30  
**問題**: 退出しても退出したプレイヤーが画面に残ったまま

---

## 🐛 問題の詳細

### **症状**
> 「退出しても退出したプレイヤーがまだそのまま残ってるね」

**v29で実装した内容**:
- `playerOrder` 配列からプレイヤーを削除
- `players` オブジェクトからプレイヤーを削除
- ホスト移譲を実装
- 全員退出時のルーム削除

**しかし**:
- 退出ボタンを押しても、他のプレイヤーの画面でそのプレイヤーが消えない
- Firebaseの更新が正しく反映されていない可能性

---

## 🔍 調査内容

### **追加した詳細ログ**

#### **1. `leaveRoom` メソッドのログ強化**

```javascript
async leaveRoom(playerName) {
  console.log('🚪 leaveRoom呼び出し:', playerName);
  
  // 現在のルームデータを取得
  const snapshot = await this.roomRef.once('value');
  const roomData = snapshot.val();
  
  console.log('現在のplayerOrder:', roomData.playerOrder);
  console.log('現在のplayers:', Object.keys(roomData.players || {}));
  
  // playerOrderから削除
  const newPlayerOrder = (roomData.playerOrder || []).filter(name => name !== playerName);
  console.log('新しいplayerOrder:', newPlayerOrder);
  
  const updates = {};
  updates[`players/${playerName}`] = null;
  updates['playerOrder'] = newPlayerOrder;
  
  // 更新前のデータをログ
  console.log('📤 Firebase更新を送信:', updates);
  
  // 更新を適用
  await this.roomRef.update(updates);
  console.log('✅ ルーム退出処理完了');
  
  // 更新後のデータを確認
  const afterSnapshot = await this.roomRef.once('value');
  const afterData = afterSnapshot.val();
  if (afterData) {
    console.log('✅ 更新後のplayerOrder:', afterData.playerOrder);
    console.log('✅ 更新後のplayers:', Object.keys(afterData.players || {}));
  }
  
  return true;
}
```

#### **2. `updateVoidPlayerList` のログ追加**

```javascript
function updateVoidPlayerList(roomData) {
  console.log('📋 プレイヤーリスト更新開始');
  console.log('- roomData.playerOrder:', roomData.playerOrder);
  console.log('- roomData.players:', Object.keys(roomData.players || {}));
  
  const playerList = document.getElementById('void-player-list');
  if (!playerList) return;

  playerList.innerHTML = '';

  const playerOrder = roomData.playerOrder || [];
  
  // ... プレイヤーリスト表示処理
}
```

---

## 🧪 デバッグ手順

### **ステップ1: プレビューを完全リロード**
- **Ctrl+Shift+R** (Mac: **Cmd+Shift+R**)
- コンソールで以下が表示されることを確認:
```
🔥🔥🔥 void-game.js 読み込み開始 v30 🔥🔥🔥
✅ VoidGameクラス定義完了 v30
✅ window.VoidGame エクスポート完了 v30
```

### **ステップ2: 2人でルーム作成**

#### **プレイヤーA（ホスト）の画面**
1. ルーム作成
2. コンソールに以下が表示される:
```
📋 プレイヤーリスト更新開始
- roomData.playerOrder: ["テストA"]
- roomData.players: ["テストA"]
```

#### **プレイヤーBの画面**
1. ルーム参加
2. **両方の画面**のコンソールに以下が表示される:
```
📋 プレイヤーリスト更新開始
- roomData.playerOrder: ["テストA", "テストB"]
- roomData.players: ["テストA", "テストB"]
```

### **ステップ3: プレイヤーBが退出**

#### **プレイヤーBの画面**
1. 「退出」ボタンをクリック
2. コンソールに以下のログが**すべて**表示されることを確認:
```
🚪 ルーム退出処理開始...
- プレイヤー名: テストB
- ルームID: 123456

🚪 leaveRoom呼び出し: テストB
現在のplayerOrder: ["テストA", "テストB"]
現在のplayers: ["テストA", "テストB"]
新しいplayerOrder: ["テストA"]
退出プレイヤーはホスト: false
📤 Firebase更新を送信: {players/テストB: null, playerOrder: ["テストA"]}
✅ ルーム退出処理完了
✅ 更新後のplayerOrder: ["テストA"]
✅ 更新後のplayers: ["テストA"]

✅ Firebaseから退出完了
✅ 監視停止完了
✅ ルーム退出成功
```

#### **プレイヤーAの画面**
**自動的に**コンソールに以下が表示されることを確認:
```
📋 プレイヤーリスト更新開始
- roomData.playerOrder: ["テストA"]
- roomData.players: ["テストA"]
```

**画面の変化**:
- 人数表示: `👥 2 / 4` → `👥 1 / 4`
- プレイヤーリスト: `1. テストA 👑` `2. テストB` → `1. テストA 👑` のみ

---

## 🔍 問題の特定

### **確認すべきポイント**

#### **1. Firebaseの更新は成功しているか？**
プレイヤーBのコンソールで以下が表示されるか確認:
```
✅ 更新後のplayerOrder: ["テストA"]
✅ 更新後のplayers: ["テストA"]
```

- ✅ **表示される** → Firebaseの更新は成功している
- ❌ **表示されない** → Firebase更新が失敗している可能性

#### **2. プレイヤーAの画面は更新されているか？**
プレイヤーAのコンソールで以下が表示されるか確認:
```
📋 プレイヤーリスト更新開始
- roomData.playerOrder: ["テストA"]
- roomData.players: ["テストA"]
```

- ✅ **表示される** → リアルタイム監視は正常、UI更新に問題がある
- ❌ **表示されない** → リアルタイム監視が機能していない

#### **3. UI は更新されているか？**
プレイヤーAの画面で:
- 人数表示が `👥 1 / 4` に変わっているか？
- プレイヤーリストから「テストB」が消えているか？

- ✅ **変わっている** → 問題解決！
- ❌ **変わっていない** → `updateVoidPlayerList` の実装に問題がある

---

## 📊 想定される問題と対処法

### **問題1: Firebaseの権限エラー**

**症状**:
- コンソールに `permission_denied` エラーが表示される
- `✅ ルーム退出処理完了` が表示されない

**対処法**:
- Firebase Console でセキュリティルールを設定
- 詳細: `FIREBASE_PERMISSION_FIX.md`

### **問題2: リアルタイム監視が機能していない**

**症状**:
- プレイヤーBのコンソールには `✅ 更新後のplayerOrder: ["テストA"]` が表示される
- しかし、プレイヤーAのコンソールに `📋 プレイヤーリスト更新開始` が表示されない

**原因**:
- `watchRoom` の監視が正しく設定されていない
- Firebase のリスナーが登録されていない

**対処法**:
```javascript
// ルーム作成/参加後に監視を開始しているか確認
currentVoidGame.watchRoom(onVoidRoomUpdate);
```

### **問題3: UI更新が反映されない**

**症状**:
- プレイヤーAのコンソールに `📋 プレイヤーリスト更新開始` と正しいデータが表示される
- しかし、画面上のプレイヤーリストが更新されない

**原因**:
- `updateVoidPlayerList` の DOM 操作に問題がある
- HTML要素のIDが間違っている

**対処法**:
```javascript
// HTML要素が存在するか確認
const playerList = document.getElementById('void-player-list');
console.log('playerList要素:', playerList);

if (!playerList) {
  console.error('❌ void-player-list要素が見つかりません');
  return;
}
```

### **問題4: キャッシュの問題**

**症状**:
- 古いバージョンが読み込まれている
- コンソールに `v30` が表示されない

**対処法**:
1. Ctrl+Shift+Delete → キャッシュクリア
2. シークレットモードで開く（Ctrl+Shift+N）
3. 別のブラウザでテスト

---

## 📝 次のステップ

### **必ず実行すること**
1. ✅ プレビューを**完全リロード**（Ctrl+Shift+R）
2. ✅ コンソールで **v30** を確認
3. ✅ 2人でルーム作成
4. ✅ プレイヤーBが退出
5. ✅ **両方の画面のコンソールログ**を確認

### **報告してほしいこと**
以下の情報を報告してください：

#### **プレイヤーB（退出した人）のコンソールログ**:
```
退出ボタンをクリック後のログをすべてコピー
```

#### **プレイヤーA（残った人）のコンソールログ**:
```
プレイヤーBが退出した後に表示されたログをすべてコピー
```

#### **プレイヤーAの画面の状態**:
- [ ] 人数表示が `👥 1 / 4` に変わった
- [ ] プレイヤーリストから「テストB」が消えた
- [ ] 変わっていない（そのまま）

---

## 🎯 まとめ

### **v30で追加したもの**
1. ✅ `leaveRoom` メソッドの詳細ログ
2. ✅ 更新前・更新後のデータ確認ログ
3. ✅ `updateVoidPlayerList` のデータ確認ログ

### **これでわかること**
- Firebaseの更新が成功しているか
- リアルタイム監視が機能しているか
- UI更新が正しく動作しているか
- どこで問題が発生しているか

### **次の対応**
コンソールログを確認することで、問題の正確な場所を特定し、適切な修正を行います。

---

**デバッグバージョン**: v30  
**修正日時**: 2026-02-17  
**ステータス**: 🔍 調査中 - ログ収集が必要
