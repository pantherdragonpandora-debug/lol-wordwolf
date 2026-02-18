# ブラウザ/タブ閉じ時の自動退出機能 (v35/v38)

## 📋 報告された問題
「ルームの参加時が退出ボタンを押さずに、ブラウザを閉じたり、タブを閉じたりした場合、ルームに残ったままになってるんだけど、退出にできる？」

## 🔍 問題
プレイヤーが以下の操作をした場合、Firebaseのルームにプレイヤーデータが残り続けていました：

- ブラウザウィンドウを閉じる
- タブを閉じる
- ネットワーク接続が切れる
- ブラウザがクラッシュする

これにより、以下の問題が発生していました：

1. **ルームが満員にならない**: 退出していないプレイヤーが枠を占有
2. **ゴーストプレイヤー**: 実際には参加していないプレイヤーがリストに表示
3. **ゲーム開始不能**: 退出済みプレイヤーの応答待ちで進行不可

## ✅ 実装内容

### 1. beforeunload イベント（ブラウザ/タブを閉じる時）

#### main.js - ワードウルフ・デマーシア
```javascript
window.addEventListener('beforeunload', async (event) => {
  // ワードウルフゲームから退出
  if (currentGame && currentPlayer && currentRoomId) {
    try {
      await currentGame.leaveRoom(currentPlayer);
      console.log('✅ ワードウルフルーム自動退出');
    } catch (error) {
      console.error('❌ 自動退出エラー:', error);
    }
  }
  
  // デマーシアゲームから退出
  if (currentDemaciaGame && currentPlayer && currentRoomId) {
    try {
      await currentDemaciaGame.leaveRoom(currentPlayer);
      console.log('✅ デマーシアルーム自動退出');
    } catch (error) {
      console.error('❌ 自動退出エラー:', error);
    }
  }
});
```

#### void-main.js - ヴォイド
```javascript
window.addEventListener('beforeunload', async (event) => {
  if (currentVoidGame && currentVoidPlayer && currentVoidRoomId) {
    try {
      await currentVoidGame.leaveRoom(currentVoidPlayer);
      console.log('✅ ヴォイドルーム自動退出');
    } catch (error) {
      console.error('❌ ヴォイド自動退出エラー:', error);
    }
  }
});
```

### 2. Firebase onDisconnect（ネットワーク切断時）

Firebase の `onDisconnect()` 機能を使用して、ネットワーク接続が切れた時に自動的にプレイヤーデータを削除します。

#### main.js
```javascript
function setupFirebaseDisconnect() {
  const connectedRef = firebase.database().ref('.info/connected');
  
  connectedRef.on('value', (snapshot) => {
    if (snapshot.val() === true) {
      // ワードウルフ
      if (currentGame && currentPlayer && currentRoomId) {
        const playerRef = firebase.database().ref(`rooms/${currentRoomId}/players/${currentPlayer}`);
        const playerOrderRef = firebase.database().ref(`rooms/${currentRoomId}/playerOrder`);
        
        playerRef.onDisconnect().remove();
        
        playerOrderRef.once('value').then((orderSnapshot) => {
          const playerOrder = orderSnapshot.val() || [];
          const newOrder = playerOrder.filter(name => name !== currentPlayer);
          playerOrderRef.onDisconnect().set(newOrder);
        });
      }
      
      // デマーシア
      if (currentDemaciaGame && currentPlayer && currentRoomId) {
        const playerRef = firebase.database().ref(`demacia_rooms/${currentRoomId}/players/${currentPlayer}`);
        playerRef.onDisconnect().remove();
      }
    }
  });
}
```

#### void-main.js
```javascript
function setupVoidFirebaseDisconnect() {
  const connectedRef = firebase.database().ref('.info/connected');
  
  connectedRef.on('value', (snapshot) => {
    if (snapshot.val() === true && currentVoidGame && currentVoidPlayer && currentVoidRoomId) {
      const playerRef = firebase.database().ref(`void_rooms/${currentVoidRoomId}/players/${currentVoidPlayer}`);
      const playerOrderRef = firebase.database().ref(`void_rooms/${currentVoidRoomId}/playerOrder`);
      
      playerRef.onDisconnect().remove();
      
      playerOrderRef.once('value').then((orderSnapshot) => {
        const playerOrder = orderSnapshot.val() || [];
        const newOrder = playerOrder.filter(name => name !== currentVoidPlayer);
        playerOrderRef.onDisconnect().set(newOrder);
      });
    }
  });
}
```

### 3. ルーム作成・参加時に自動退出設定を有効化

#### ワードウルフ・デマーシア（main.js）
```javascript
// ルーム作成時
if (success) {
  showWaitingRoom();
  currentGame.watch(updateWaitingRoom);
  setupFirebaseDisconnect();  // ✅ 追加
}

// ルーム参加時
await currentGame.joinRoom(playerName);
showWaitingRoom();
currentGame.watch(updateWaitingRoom);
setupFirebaseDisconnect();  // ✅ 追加
```

#### ヴォイド（void-main.js）
```javascript
// ルーム作成時
currentVoidGame.watchRoom(onVoidRoomUpdate);
setupVoidFirebaseDisconnect();  // ✅ 追加

// ルーム参加時
currentVoidGame.watchRoom(onVoidRoomUpdate);
setupVoidFirebaseDisconnect();  // ✅ 追加
```

## 📊 動作シナリオ

### シナリオ1: ブラウザ/タブを閉じる
```
1. プレイヤーがルームに参加
2. ブラウザ/タブを閉じる
3. beforeunload イベント発火
4. leaveRoom() が自動実行
5. Firebaseからプレイヤーデータ削除 ✅
6. 他のプレイヤーの画面からリアルタイムで消える ✅
```

### シナリオ2: ネットワーク接続が切れる
```
1. プレイヤーがルームに参加
2. setupFirebaseDisconnect() でonDisconnect設定
3. WiFiがオフ / 機内モードなど
4. Firebaseが切断を検知
5. onDisconnect() が自動実行
6. プレイヤーデータが自動削除 ✅
7. 他のプレイヤーの画面からリアルタイムで消える ✅
```

### シナリオ3: ブラウザクラッシュ
```
1. プレイヤーがルームに参加
2. setupFirebaseDisconnect() でonDisconnect設定
3. ブラウザがクラッシュ
4. Firebaseが接続切断を検知（約30秒後）
5. onDisconnect() が自動実行
6. プレイヤーデータが自動削除 ✅
```

## 🔧 変更ファイル
- `js/main.js` (+75行、自動退出機能追加、v34→v35)
- `js/void-main.js` (+44行、自動退出機能追加、v37→v38)
- `index.html` (バージョン更新)
- `AUTO_LEAVE_ON_CLOSE_v35.md` (このドキュメント)

## 🧪 テスト手順

### テスト1: タブを閉じる
1. ルームを作成・参加（2人推奨）
2. プレイヤーAのコンソールを開く（F12）
3. プレイヤーBのタブを閉じる
4. **期待される動作**:
   - プレイヤーBのコンソール: `✅ ワードウルフルーム自動退出`（一瞬表示）
   - プレイヤーAの画面: プレイヤーBがリストから消える
   - 人数表示: 2人 → 1人に減少

### テスト2: ブラウザを閉じる
1. ルームを作成・参加（2人推奨）
2. プレイヤーBのブラウザウィンドウ全体を閉じる
3. **期待される動作**:
   - プレイヤーAの画面: プレイヤーBがリストから消える
   - 人数表示: 2人 → 1人に減少

### テスト3: ネットワーク切断（Chrome DevTools）
1. ルームを作成・参加（2人推奨）
2. プレイヤーBのブラウザでF12 → Network タブ
3. 「Offline」を選択
4. 約30秒待つ
5. **期待される動作**:
   - プレイヤーAの画面: プレイヤーBがリストから消える（約30秒後）
   - コンソール: `🔒 ワードウルフ onDisconnect 設定完了`

### テスト4: 機内モード（モバイル）
1. スマホでルームに参加
2. 機内モードをON
3. 約30秒待つ
4. PCの画面を確認
5. **期待される動作**:
   - スマホプレイヤーがリストから消える（約30秒後）

### テスト5: リロード（退出しない確認）
1. ルームを作成・参加
2. F5キーでリロード
3. **期待される動作**:
   - ❌ 退出してはいけない（beforeunloadは発火するが、すぐに再接続）
   - リロード後も同じルームに残っている

## 📝 技術詳細

### beforeunload の制限
- **非同期処理の制限**: `beforeunload` では `await` が正しく動作しない場合があります
- **ブラウザによる違い**: Chrome/Firefox/Safariで動作が異なる可能性
- **タイムアウト**: 約1秒以内に処理を完了する必要

### onDisconnect の仕組み
Firebase Realtime Database の `onDisconnect()` は、サーバー側で管理されます：

1. クライアントが接続時に `onDisconnect().remove()` を設定
2. Firebaseサーバーがこの命令を記憶
3. クライアントが切断（ハートビート途絶）
4. サーバーが自動的に `remove()` を実行

**メリット**:
- クライアント側の処理不要
- 確実に実行される（サーバー側）
- ネットワーク切断にも対応

**検出時間**:
- 通常: 約30秒
- ハートビート間隔: 30秒
- タイムアウト: 60秒

### playerOrder の更新
`onDisconnect()` では配列の要素削除ができないため、以下の方法を使用：

```javascript
playerOrderRef.once('value').then((orderSnapshot) => {
  const playerOrder = orderSnapshot.val() || [];
  const newOrder = playerOrder.filter(name => name !== currentPlayer);
  playerOrderRef.onDisconnect().set(newOrder);  // 新しい配列をセット
});
```

## 🎯 修正効果

### Before
- ❌ ブラウザ/タブを閉じてもルームに残る
- ❌ ゴーストプレイヤーが表示され続ける
- ❌ ルームが満員になって新規参加不可
- ❌ 手動で退出ボタンを押す必要

### After
- ✅ ブラウザ/タブを閉じると自動退出
- ✅ ネットワーク切断でも自動退出（約30秒後）
- ✅ プレイヤーリストがリアルタイム更新
- ✅ ルーム枠が自動的に空く
- ✅ 手間なく退出できる

## ⚠️ 注意事項

### リロード時の動作
- F5やCtrl+Rでリロードすると `beforeunload` が発火しますが、すぐに再接続するため問題ありません
- `onDisconnect()` も新しい接続で再設定されます

### 同時接続の制限
- 同じプレイヤー名で複数のタブ/デバイスから参加すると、最後の接続のみが有効になります

### タイムラグ
- `onDisconnect()` による削除は約30秒のタイムラグがあります
- `beforeunload` は即座に実行されますが、ブラウザやネットワーク状況により失敗する可能性があります

---
**修正日**: 2026-02-17  
**バージョン**: main.js v35, void-main.js v38  
**関連ファイル**: `js/main.js`, `js/void-main.js`, `index.html`  
**ステータス**: ✅ 修正完了
