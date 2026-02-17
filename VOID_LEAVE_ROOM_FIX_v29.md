# ヴォイド退出バグ修正 (v29)

**日時**: 2026-02-17  
**修正バージョン**: v29  
**問題**: ルームから退出しても人数が減らず、ホスト移譲も機能しない

---

## 🐛 報告された問題

### **問題1: 退出しても人数が減らない**
> 「ヴォイドに届くは光か闇か、でルームから退出しているのに残り人数とその表示が変わっていないから、抜けた後に改めて入りなおしても満席になっているよ。」

**症状**:
- プレイヤーが退出ボタンを押して退出する
- しかし、待機画面の「残り人数」表示が変わらない
- 他のプレイヤーから見ると退出したプレイヤーがまだ表示されている
- ルームが満員状態のまま、新しいプレイヤーが参加できない

### **問題2: ホスト移譲が機能しない**
> 「あと、オーナーが抜けた後のオーナー権の移行がうまくいっていないよ。」

**症状**:
- ホスト（👑マーク）のプレイヤーが退出する
- しかし、次のプレイヤーにホスト権が移譲されない
- 「ゲーム開始」ボタンが誰にも表示されなくなる
- ルームが機能しなくなる

---

## 🔍 原因分析

### **根本原因: `leaveRoom` メソッドの不完全な実装**

**v28の問題のあるコード** (`js/void-game.js`):
```javascript
async leaveRoom(playerName) {
  await this.roomRef.child(`players/${playerName}`).remove();
  return true;
}
```

**問題点**:
1. ❌ `players/${playerName}` だけを削除している
2. ❌ **`playerOrder` 配列を更新していない** ← これが主な原因
3. ❌ ホスト移譲の処理がない
4. ❌ 全員退出時のルーム削除処理がない

### **なぜ人数が減らないのか？**

ヴォイドゲームの人数カウントは `playerOrder` 配列の長さを使用しています：

```javascript
// js/void-main.js の人数表示更新
document.getElementById('void-current-players').textContent = playerOrder.length;
```

**データ構造**:
```javascript
{
  "void_rooms": {
    "123456": {
      "players": {
        "プレイヤーA": { isHost: true, ... },  // ← これだけ削除される
        "プレイヤーB": { isHost: false, ... }
      },
      "playerOrder": ["プレイヤーA", "プレイヤーB"],  // ← これが更新されない！
      "maxPlayers": 4
    }
  }
}
```

退出時に `players/${playerName}` は削除されるが、`playerOrder` 配列に名前が残ったままなので：
- `playerOrder.length` は減らない → 人数表示が変わらない
- ルーム参加時の人数チェックで満員判定される → 新規参加できない

### **Word Wolf と Demacia は正常**

`js/game.js` (Word Wolf) と `js/demacia-game.js` (Demacia) では、`playerOrder` 配列ではなく `players` オブジェクトのキー数を使用しているため、この問題は発生しません：

```javascript
// Word Wolf / Demacia の人数カウント
const playerCount = Object.keys(roomData.players).length;
```

---

## ✅ 修正内容

### **新しい `leaveRoom` メソッド** (v29)

```javascript
async leaveRoom(playerName) {
  console.log('🚪 leaveRoom呼び出し:', playerName);
  
  // 現在のルームデータを取得
  const snapshot = await this.roomRef.once('value');
  const roomData = snapshot.val();
  
  if (!roomData) {
    console.log('⚠️ ルームが存在しません');
    return true;
  }
  
  console.log('現在のplayerOrder:', roomData.playerOrder);
  console.log('現在のplayers:', Object.keys(roomData.players || {}));
  
  // playerOrderから削除
  const newPlayerOrder = (roomData.playerOrder || []).filter(name => name !== playerName);
  console.log('新しいplayerOrder:', newPlayerOrder);
  
  // 退出するプレイヤーがホストかどうか確認
  const isHost = roomData.players[playerName]?.isHost === true;
  console.log('退出プレイヤーはホスト:', isHost);
  
  const updates = {};
  
  // プレイヤーを削除
  updates[`players/${playerName}`] = null;
  
  // playerOrderを更新
  updates['playerOrder'] = newPlayerOrder;
  
  // 全員が退出した場合はルームを削除
  if (newPlayerOrder.length === 0) {
    console.log('✅ 全員退出 - ルームを削除');
    await this.roomRef.remove();
    return true;
  }
  
  // ホストが退出した場合、次のプレイヤーにホスト権を移譲
  if (isHost && newPlayerOrder.length > 0) {
    const newHost = newPlayerOrder[0];
    console.log('🔄 ホスト移譲:', playerName, '→', newHost);
    updates[`players/${newHost}/isHost`] = true;
    updates['hostName'] = newHost;
  }
  
  // 更新を適用
  await this.roomRef.update(updates);
  console.log('✅ ルーム退出処理完了');
  
  return true;
}
```

### **修正のポイント**

1. ✅ **`playerOrder` 配列を更新**
   - `filter()` を使って退出プレイヤーを除外
   - 更新した配列をFirebaseに保存

2. ✅ **ホスト移譲を実装**
   - 退出プレイヤーがホストかチェック
   - ホストの場合、`playerOrder[0]` (次のプレイヤー) にホスト権を移譲
   - `players/${newHost}/isHost` を `true` に設定
   - `hostName` フィールドも更新

3. ✅ **全員退出時のルーム削除**
   - `newPlayerOrder.length === 0` の場合、ルーム全体を削除
   - 孤立したルームがFirebaseに残らない

4. ✅ **詳細なログ出力**
   - デバッグしやすいように各ステップでログを出力

---

## 🧪 動作確認手順

### **ステップ1: プレビューを完全リロード**
- Windows/Linux: **Ctrl+Shift+R**
- Mac: **Cmd+Shift+R**

### **ステップ2: コンソールで v29 を確認**
F12 → Console タブで以下が表示されることを確認:
```
🔥🔥🔥 void-game.js 読み込み開始 v29 🔥🔥🔥
✅ VoidGameクラス定義完了 v29
✅ window.VoidGame エクスポート完了 v29
```

### **ステップ3: 2人以上でルーム作成**

#### **3-1. プレイヤーA（ホスト）**
1. ゲームタイプ選択 (LOL / VALORANT)
2. 「ヴォイドに届くは光か闇か」をクリック
3. 「ルーム作成」をクリック
4. プレイヤー名: `テストA`
5. 人数: `4人`
6. 「作成」ボタンをクリック
7. ルームIDをコピー

**期待結果**:
- 待機画面が表示される
- 人数表示: `👥 1 / 4`
- プレイヤーリスト: `1. テストA 👑`

#### **3-2. プレイヤーB**
1. 別のブラウザ/タブを開く（またはシークレットモード）
2. 「ヴォイドに届くは光か闇か」→「ルーム参加」
3. ルームIDを入力
4. プレイヤー名: `テストB`
5. 「参加」ボタンをクリック

**期待結果**:
- 待機画面が表示される
- 人数表示: `👥 2 / 4`
- プレイヤーリスト: `1. テストA 👑` `2. テストB`

### **ステップ4: プレイヤーBが退出**

#### **4-1. プレイヤーBの画面**
1. 「退出」ボタンをクリック
2. コンソールに以下のログが表示される:
```
🚪 leaveRoom呼び出し: テストB
現在のplayerOrder: ["テストA", "テストB"]
現在のplayers: ["テストA", "テストB"]
新しいplayerOrder: ["テストA"]
退出プレイヤーはホスト: false
✅ ルーム退出処理完了
```

#### **4-2. プレイヤーAの画面**
**期待結果**:
- 人数表示が自動的に更新: `👥 1 / 4` ✅
- プレイヤーリストが更新: `1. テストA 👑` のみ
- 「テストB」が消える ✅

### **ステップ5: 新しいプレイヤーが参加できるか確認**

#### **5-1. プレイヤーC**
1. 別のブラウザ/タブを開く
2. 同じルームIDで参加
3. プレイヤー名: `テストC`

**期待結果**:
- 参加成功 ✅
- 人数表示: `👥 2 / 4` ✅
- プレイヤーリスト: `1. テストA 👑` `2. テストC`

### **ステップ6: ホスト移譲の確認**

#### **6-1. プレイヤーA（ホスト）が退出**
1. プレイヤーAの画面で「退出」ボタンをクリック
2. コンソールに以下のログが表示される:
```
🚪 leaveRoom呼び出し: テストA
現在のplayerOrder: ["テストA", "テストC"]
新しいplayerOrder: ["テストC"]
退出プレイヤーはホスト: true
🔄 ホスト移譲: テストA → テストC
✅ ルーム退出処理完了
```

#### **6-2. プレイヤーCの画面**
**期待結果**:
- 人数表示: `👥 1 / 4` ✅
- プレイヤーリスト: `1. テストC 👑` ← 👑が表示される ✅
- 「ゲーム開始」ボタンが表示される ✅

### **ステップ7: 全員退出時のルーム削除確認**

#### **7-1. 残ったプレイヤーCが退出**
1. 「退出」ボタンをクリック
2. コンソールに以下のログが表示される:
```
🚪 leaveRoom呼び出し: テストC
新しいplayerOrder: []
✅ 全員退出 - ルームを削除
```

#### **7-2. ルームIDで再参加を試みる**
1. 別のブラウザで同じルームIDに参加しようとする

**期待結果**:
- エラーメッセージ: 「ルームが見つかりません」 ✅
- ルームが完全に削除されている ✅

---

## 📊 修正前後の比較

| 機能 | v28（修正前） | v29（修正後） |
|-----|-------------|-------------|
| プレイヤー退出 | ❌ `players` のみ削除 | ✅ `players` と `playerOrder` を削除 |
| 人数カウント | ❌ 減らない | ✅ 正しく減る |
| 新規参加 | ❌ 満員エラー | ✅ 参加可能 |
| ホスト移譲 | ❌ 実装なし | ✅ 自動移譲 |
| 全員退出 | ❌ ルームが残る | ✅ ルーム削除 |
| デバッグログ | ❌ なし | ✅ 詳細ログ |

---

## 🔍 技術詳細

### **Firebaseの更新方法**

**一括更新を使用**:
```javascript
const updates = {};
updates[`players/${playerName}`] = null;  // 削除
updates['playerOrder'] = newPlayerOrder;   // 更新
updates[`players/${newHost}/isHost`] = true;  // ホスト権付与
updates['hostName'] = newHost;             // ホスト名更新

await this.roomRef.update(updates);  // 1回の操作で全て更新
```

**メリット**:
- ✅ アトミック（原子的）な更新 - 全て成功か全て失敗
- ✅ ネットワーク効率が良い（1回のリクエスト）
- ✅ 他のクライアントから見て不整合な状態が発生しない

### **ホスト選択のロジック**

```javascript
const newHost = newPlayerOrder[0];  // 配列の最初のプレイヤー
```

**理由**:
- `playerOrder` は参加順に並んでいる
- 最も古いプレイヤー（最初に参加した人）をホストにする
- シンプルで予測可能なロジック

---

## ⚠️ 既知の制限事項

### **ゲーム中の退出**

現在の実装では、**待機画面での退出のみ**を想定しています。

**ゲーム進行中（`gameState !== 'waiting'`）に退出した場合**:
- プレイヤーは削除される
- しかし、ゲームロジックは中断しない
- 残ったプレイヤーはゲームを続行できる

**今後の改善案**:
```javascript
// ゲーム中の退出時は特別な処理を追加
if (roomData.gameState !== 'waiting') {
  // ゲームを中断するか、続行可能か判定
  // 必要に応じてゲーム状態をリセット
}
```

---

## 📝 関連ドキュメント

- `VOID_FIX_V28.md` - VoidGameクラス完全再構築（v28）
- `VOID_LEAVE_BUTTON_VERIFICATION.md` - 退出ボタン動作確認
- `PLAYER_COUNT_DISPLAY.md` - 残り人数表示の実装
- `README.md` - プロジェクト全体の概要

---

## 🎯 まとめ

### **完了した修正**
1. ✅ **人数カウント問題を解決**
   - `playerOrder` 配列を正しく更新
   - 退出後に人数が正しく減る
   - 新規プレイヤーが参加できる

2. ✅ **ホスト移譲を実装**
   - ホスト退出時に自動的に次のプレイヤーに移譲
   - `hostName` フィールドと `isHost` フラグを更新
   - 「ゲーム開始」ボタンが新ホストに表示される

3. ✅ **全員退出時のルーム削除**
   - 孤立したルームを残さない
   - Firebaseのデータが整理される

### **変更ファイル**
- `js/void-game.js` - `leaveRoom` メソッドを完全に書き直し（約50行）
- バージョン番号を v28 → v29 に更新

### **次のステップ**
1. プレビューを **完全リロード**（Ctrl+Shift+R）
2. コンソールで **v29** のログを確認
3. 上記の動作確認手順を実行
4. 問題があればコンソールログを報告

---

**修正担当**: AI Assistant  
**修正日時**: 2026-02-17  
**バージョン**: v1.0.29  
**ステータス**: ✅ 完了 - テスト準備完了
