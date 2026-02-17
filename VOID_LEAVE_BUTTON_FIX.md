# ヴォイド退出ボタン修正（v29）

## 問題

ヴォイドモードの待機画面で「退出」ボタンをクリックしても機能しなかった。

---

## 原因

`void-main.js`の`leaveVoidRoom`関数で、存在しないメソッド`stopWatching()`を呼び出していた。

### 問題のあるコード
```javascript
await currentVoidGame.leaveRoom(currentVoidPlayer);
currentVoidGame.stopWatching();  // ← このメソッドは存在しない
```

---

## 解決方法

新しい`void-game.js`（v28で作り直したもの）では、メソッド名が`unwatchRoom()`に変更されていました。

### 修正後のコード
```javascript
await currentVoidGame.leaveRoom(currentVoidPlayer);
currentVoidGame.unwatchRoom();  // ← 正しいメソッド名
```

---

## 実装した修正（v29）

### 修正内容

```javascript
async function leaveVoidRoom() {
  if (!currentVoidGame || !currentVoidPlayer) {
    console.warn('⚠️ ゲームまたはプレイヤーが未設定です');
    showScreen('void-home-screen');
    return;
  }

  try {
    console.log('🚪 ルーム退出処理開始...');
    console.log('- プレイヤー名:', currentVoidPlayer);
    console.log('- ルームID:', currentVoidRoomId);
    
    // ルームから退出
    await currentVoidGame.leaveRoom(currentVoidPlayer);
    console.log('✅ Firebaseから退出完了');
    
    // 監視を停止（修正箇所）
    currentVoidGame.unwatchRoom();
    console.log('✅ 監視停止完了');
    
    // 変数をクリア
    currentVoidGame = null;
    currentVoidRoomId = null;
    currentVoidPlayer = null;

    // ホーム画面に戻る
    showScreen('void-home-screen');
    console.log('✅ ルーム退出成功');
  } catch (error) {
    console.error('❌ ルーム退出エラー:', error);
    alert('退出に失敗しました: ' + error.message);
  }
}
```

### 追加した改善点

1. **詳細なログ出力**
   - 退出処理の各ステップでログを出力
   - デバッグが容易に

2. **エラーハンドリング強化**
   - エラー時にアラートで通知
   - ユーザーに分かりやすいフィードバック

3. **早期リターン処理**
   - ゲームやプレイヤーが未設定の場合は即座にホーム画面へ

---

## テスト手順

### ステップ1: プレビューをリロード

### ステップ2: ヴォイドモードでルーム作成

1. ヴォイドモードを選択
2. ルーム作成
3. プレイヤー名を入力
4. 作成ボタンをクリック

### ステップ3: 退出ボタンをテスト

1. 待機画面で「退出」ボタンをクリック
2. コンソールに以下が表示されることを確認：
   ```
   🚪 ルーム退出処理開始...
   ✅ Firebaseから退出完了
   ✅ 監視停止完了
   ✅ ルーム退出成功
   ```
3. ヴォイドのホーム画面に戻ることを確認

---

## 変更ファイル

| ファイル | 変更内容 | 行数 |
|---------|---------|------|
| `js/void-main.js` | `stopWatching()` → `unwatchRoom()` に修正、ログ追加 | +15行 |
| `index.html` | バージョンをv29に更新 | 4箇所 |

---

## 関連メソッド

### VoidGameクラスのメソッド一覧

| メソッド | 説明 |
|---------|------|
| `createRoom(hostName, maxPlayers, theme)` | ルーム作成 |
| `joinRoom(playerName)` | ルーム参加 |
| `startGame()` | ゲーム開始 |
| `watchRoom(callback)` | ルームデータ監視開始 |
| `unwatchRoom()` | ルームデータ監視停止 ✅ |
| `leaveRoom(playerName)` | ルーム退出 |

---

## 完了日
2026-02-17

## バージョン
v29 - 退出ボタン修正
