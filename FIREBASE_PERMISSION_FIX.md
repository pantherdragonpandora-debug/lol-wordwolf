# 🚨 ヴォイドルーム作成エラー - Firebase権限エラー修正

## エラー内容

```
@firebase/database: FIREBASE WARNING: set at /_connection_test/1771289061961 failed: permission_denied
```

または

```
Error: permission denied
```

---

## 🎯 原因

Firebase Realtime Databaseのセキュリティルールに**`void_rooms`パスが追加されていない**ため、ヴォイドゲームのデータを書き込めません。

---

## ✅ 解決方法：Firebaseセキュリティルールの更新

### ステップ1: Firebase Consoleにアクセス

以下のURLを開いてください：

```
https://console.firebase.google.com/project/lol-word-wolf/database/lol-word-wolf-default-rtdb/rules
```

または、手動で：
1. https://console.firebase.google.com/
2. **「lol-word-wolf」** プロジェクトをクリック
3. 左メニュー **「構築」** → **「Realtime Database」**
4. 上部タブの **「ルール」** をクリック

---

### ステップ2: 現在のルールを確認

現在のルールは以下のようになっているはずです：

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    },
    "demacia_rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    },
    "site_stats": {
      "pageviews": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

**問題**: `void_rooms` が含まれていません！

---

### ステップ3: ルールを更新

以下の**完全なルール**をコピーして、エディタに貼り付けてください：

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt", "gameState"]
      }
    },
    "demacia_rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt", "gameState"]
      }
    },
    "void_rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt", "gameState"]
      }
    },
    "site_stats": {
      "pageviews": {
        ".read": true,
        ".write": true
      }
    },
    "_connection_test": {
      ".read": true,
      ".write": true
    }
  }
}
```

**追加された内容**:
- ✅ `void_rooms` パス（ヴォイドゲーム用）
- ✅ `_connection_test` パス（Firebase接続テスト用）
- ✅ `.indexOn` でパフォーマンス向上

---

### ステップ4: 公開

1. 右上の **「公開」** または **「Publish」** ボタンをクリック
2. 確認ダイアログが表示されたら **「公開」** をクリック

**成功メッセージ**:
```
✅ ルールが正常に公開されました
```

---

### ステップ5: サイトをテスト

1. ブラウザで完全リロード（`Ctrl+Shift+R` / `Cmd+Shift+R`）
2. ヴォイドモードを選択
3. ルーム作成を試す

**期待される結果**:
- エラーメッセージが表示されない
- 待機画面に遷移する
- コンソールに成功ログが表示される

```
✅ Firebase書き込み完了
✅ ヴォイドルーム作成成功: 123456
```

---

## 🔍 トラブルシューティング

### ケース1: まだ "permission_denied" エラーが出る

**対処法**:
1. Firebase Consoleで「公開」ボタンを押したか確認
2. ブラウザを完全リロード（`Ctrl+Shift+R`）
3. ルールが正しく保存されているか再確認
4. 数分待ってから再試行（ルール反映に時間がかかる場合がある）

### ケース2: "_connection_test" のエラーが続く

**原因**: Firebase SDKの接続テストが拒否されている

**対処法**:
ルールに以下を追加したか確認：
```json
"_connection_test": {
  ".read": true,
  ".write": true
}
```

### ケース3: ルールが公開できない

**エラーメッセージ**: "Invalid JSON" など

**原因**: JSON構文エラー

**対処法**:
1. カンマ（`,`）の位置を確認
2. 括弧（`{}`）が正しく閉じられているか確認
3. 上記の完全なルールをコピー&ペーストで再試行

---

## 📊 各パスの説明

| パス | 用途 | 必須 |
|------|------|------|
| `rooms/` | ワードウルフのルームデータ | ✅ はい |
| `demacia_rooms/` | デマーシアのルームデータ | ✅ はい |
| `void_rooms/` | **ヴォイドのルームデータ** | ✅ **はい（新規）** |
| `site_stats/` | サイト統計（ページビュー） | ⚠️ オプション |
| `_connection_test/` | Firebase接続テスト | ✅ はい |

---

## 🎮 ヴォイドゲームのデータ構造

Firebase上で以下のような構造でデータが保存されます：

```
void_rooms/
  └── 123456/  (ルームID)
      ├── roomId: "123456"
      ├── gameType: "lol" | "valorant"
      ├── hostName: "Player1"
      ├── maxPlayers: 4
      ├── theme: {
      │     id: "yasuo",
      │     name: "ヤスオ",
      │     category: "champions"
      │   }
      ├── gameState: "waiting" | "selecting_order" | "playing" | "finished"
      ├── currentTurn: 0
      ├── players: {
      │     "Player1": {
      │       joinOrder: 0,
      │       isHost: true,
      │       ready: false,
      │       submitted: false
      │     }
      │   }
      ├── playerOrder: ["Player1", "Player2", ...]
      ├── playOrder: [1, 2, 3, ...]
      ├── orderSelections: {
      │     "Player1": 1,
      │     "Player2": 2
      │   }
      ├── turns: {
      │     "0": {
      │       playerName: "Player1",
      │       words: ["風", "剣", "疾走"],
      │       modified: [],
      │       timestamp: 1771289061961
      │     }
      │   }
      ├── finalAnswer: "ヤスオ"
      ├── isCorrect: true
      └── createdAt: 1771289061961
```

---

## 🔒 セキュリティに関する注意

### 現在のルール
```json
".read": true,
".write": true
```

**これは開発/テスト用です**。

### 本番環境での推奨ルール

将来的には、以下のようなより厳格なルールを設定することを推奨します：

```json
"void_rooms": {
  "$roomId": {
    ".read": true,
    ".write": "!data.exists() || data.child('players').hasChild(auth.uid)",
    ".validate": "newData.hasChildren(['roomId', 'gameType', 'hostName'])",
    ".indexOn": ["createdAt", "gameState"]
  }
}
```

ただし、このアプリは**匿名認証なし**で動作するため、当面は `".write": true` のままで問題ありません。

---

## ✅ 完了確認チェックリスト

- [ ] Firebase Consoleにアクセスした
- [ ] Realtime Database → ルール タブを開いた
- [ ] `void_rooms` を含む完全なルールをコピー&ペーストした
- [ ] 「公開」ボタンをクリックした
- [ ] 公開成功のメッセージを確認した
- [ ] ブラウザを完全リロード（Ctrl+Shift+R）した
- [ ] ヴォイドモードでルーム作成を試した
- [ ] エラーが出ずに成功した

すべてチェックが付けば、完了です！🎉

---

## 📞 サポート

まだエラーが出る場合は、以下の情報を確認してください：

1. **Firebase Consoleのルールタブのスクリーンショット**
2. **ブラウザコンソールのエラーメッセージ（F12）**
3. **Firebaseプロジェクト名**: `lol-word-wolf`

---

## 完了日
2026-02-17

## 関連ドキュメント
- `VOID_FIREBASE_RULES.md` - ヴォイドゲームのFirebaseルール設定
- `FIREBASE_RULES_FIX.md` - 一般的なFirebaseルール設定ガイド
- `VOID_ROOM_CREATION_FIX.md` - ヴォイドルーム作成の技術的修正
