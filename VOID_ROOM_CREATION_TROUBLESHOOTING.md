# 🔧 ヴォイドゲーム ルーム作成エラー - トラブルシューティング

**作成日**: 2026-02-16  
**バージョン**: 1.0.23  

---

## 🐛 症状

ヴォイドゲームでルーム作成に失敗する。

**エラーメッセージ例**:
- "ルーム作成に失敗しました"
- "Permission denied"
- "PERMISSION_DENIED"

---

## 🔍 原因

Firebase Realtime Databaseのセキュリティルールに`void_rooms`のパスが追加されていない可能性があります。

ワードウルフとデマーシアは以前に設定済みですが、ヴォイドゲームは新しく追加したため、ルールの更新が必要です。

---

## ✅ 解決方法

### ステップ1: Firebase Console にアクセス

以下のURLにアクセスしてください：

```
https://console.firebase.google.com/project/lol-word-wolf/database/lol-word-wolf-default-rtdb/rules
```

または：

1. https://console.firebase.google.com/ にアクセス
2. プロジェクト「lol-word-wolf」を選択
3. 左メニューから「Realtime Database」をクリック
4. 「ルール」タブをクリック

---

### ステップ2: 現在のルールを確認

現在のルールがこのようになっている場合：

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

**問題**: `void_rooms` が含まれていません。

---

### ステップ3: ルールを更新

以下の完全なルールにコピー＆ペーストで置き換えてください：

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
    "void_rooms": {
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

**重要な追加部分**:
```json
"void_rooms": {
  "$roomId": {
    ".read": true,
    ".write": true
  }
},
```

---

### ステップ4: 公開

1. ルールを更新したら、右上の **「公開」** ボタンをクリック
2. 確認ダイアログが表示されたら **「公開」** をクリック
3. 「ルールが正常に更新されました」と表示されればOK

**反映時間**: 即座（1〜3秒）

---

## 🧪 動作確認

### 1. ブラウザをリロード

サイトに戻り、ハードリロード（キャッシュクリア）します：

- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### 2. ヴォイドゲームでルーム作成を試す

1. モード選択で「🌌 ヴォイドに届くは光か闇か」を選択
2. ゲームタイプ（LoL/VALORANT）を選択
3. 「ルームを作成」をクリック
4. プレイヤー名と参加人数を入力
5. 「作成」ボタンをクリック

**成功の場合**:
- ✅ 待機画面が表示される
- ✅ ルームIDが表示される
- ✅ コンソールに「✅ ヴォイドルーム作成成功」と表示される

**失敗の場合**:
- ❌ エラーメッセージが表示される
- ❌ 次のステップへ進んでください

---

## 🔍 詳細なエラー確認方法

### ブラウザのコンソールを開く

- **Windows/Linux**: `F12` または `Ctrl + Shift + I`
- **Mac**: `Cmd + Option + I`

### Console タブを確認

エラーメッセージを探してください：

#### パターン1: Permission denied
```
❌ ヴォイドルーム作成エラー: Error: PERMISSION_DENIED: Permission denied
```

**原因**: Firebase Rulesが正しく更新されていない

**解決策**:
1. ステップ2に戻り、ルールを再確認
2. `void_rooms` が含まれているか確認
3. 「公開」ボタンを押したか確認
4. Firebase Consoleで「最終更新: 数秒前」と表示されているか確認

---

#### パターン2: Network error
```
❌ ヴォイドルーム作成エラー: Error: Network error
```

**原因**: インターネット接続の問題、またはFirebaseサービスの障害

**解決策**:
1. インターネット接続を確認
2. Firebase Status Page を確認: https://status.firebase.google.com/
3. 少し待ってから再試行

---

#### パターン3: テーマの取得に失敗
```
❌ ヴォイドルーム作成エラー: Error: テーマの取得に失敗しました
```

**原因**: `js/void-data.js` が読み込まれていない

**解決策**:
1. ブラウザをハードリロード（Ctrl+Shift+R / Cmd+Shift+R）
2. Console で `getRandomVoidTheme` が定義されているか確認:
   ```javascript
   typeof getRandomVoidTheme
   // "function" と表示されればOK
   ```

---

#### パターン4: Rate limit
```
ルーム作成が早すぎます。5秒後にもう一度お試しください。
```

**原因**: レート制限（5秒以内に複数回ルーム作成を試行）

**解決策**:
1. 5秒待ってから再試行
2. これは正常な動作です（スパム防止）

---

## 📊 Firebase Rules の構造

### 正しい構造

```
Firebase Realtime Database
└── lol-word-wolf-default-rtdb (Asia Southeast 1)
    ├── rooms/
    │   └── 123456/  (ワードウルフ用)
    ├── demacia_rooms/
    │   └── 123456/  (デマーシア用)
    ├── void_rooms/    ← これが必要！
    │   └── 123456/  (ヴォイド用)
    └── site_stats/
        └── pageviews: 1234
```

### 各パスの役割

| パス | 用途 | 必須 |
|------|------|------|
| `rooms/` | ワードウルフのルームデータ | ✅ はい |
| `demacia_rooms/` | デマーシアのルームデータ | ✅ はい |
| `void_rooms/` | ヴォイドのルームデータ | ✅ はい |
| `site_stats/pageviews` | ページビューカウンター | ⚠️ 任意 |

---

## 🚨 よくある間違い

### 間違い1: カンマ忘れ

❌ **間違い**:
```json
{
  "rules": {
    "demacia_rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }  // ← カンマがない！
    "void_rooms": {
      ...
    }
  }
}
```

✅ **正しい**:
```json
{
  "rules": {
    "demacia_rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    },  // ← カンマが必要
    "void_rooms": {
      ...
    }
  }
}
```

---

### 間違い2: インデントのズレ

❌ **間違い**:
```json
{
  "rules": {
    "void_rooms": {
    "$roomId": {  // ← インデントが浅い
      ".read": true,
      ".write": true
    }
    }
  }
}
```

✅ **正しい**:
```json
{
  "rules": {
    "void_rooms": {
      "$roomId": {  // ← 正しいインデント
        ".read": true,
        ".write": true
      }
    }
  }
}
```

---

### 間違い3: 部分的なコピー

❌ **間違い**: `void_rooms` だけ追加して他のルールを削除

✅ **正しい**: 完全なルール（`rooms`, `demacia_rooms`, `void_rooms`, `site_stats`）を記述

---

## 📞 それでも解決しない場合

### 1. Firebase Console で手動確認

1. Firebase Console → Realtime Database → データ タブ
2. `void_rooms` パスが作成されているか確認
3. 手動でデータを追加してみる:
   ```
   void_rooms/
     test123/
       roomId: "test123"
       hostName: "TestUser"
   ```
4. 追加できれば Rules は正しい

---

### 2. コンソールログの全文を確認

ブラウザの Console タブで：
1. 「作成」ボタンをクリック前にコンソールをクリア
2. 「作成」ボタンをクリック
3. すべてのログをコピー
4. エラーメッセージの全文を確認

---

### 3. Network タブで確認

1. F12 → Network タブ
2. 「作成」ボタンをクリック
3. Firebase へのリクエストを探す（URL: `firebasedatabase.app`）
4. ステータスコードを確認:
   - **200**: 成功
   - **401**: 認証エラー
   - **403**: Permission denied

---

## 📝 チェックリスト

ルーム作成前に以下を確認してください：

- [ ] Firebase Rules に `void_rooms` が含まれている
- [ ] Firebase Rules を「公開」ボタンで反映した
- [ ] ブラウザをハードリロード（Ctrl+Shift+R / Cmd+Shift+R）した
- [ ] Firebase 接続状態が「✓ 接続中」になっている
- [ ] プレイヤー名を1〜20文字で入力した
- [ ] ゲームタイプ（LoL/VALORANT）を選択した
- [ ] 5秒以内に複数回試行していない

すべてチェックが入れば、ルーム作成は成功するはずです。

---

## 🔗 関連ドキュメント

- `VOID_FIREBASE_RULES.md` - Firebase Rules 設定ガイド
- `VOID_GAME_DESIGN.md` - ヴォイドゲーム設計書
- `js/void-game.js` - ゲームロジック
- `js/void-main.js` - イベントハンドラー
- `FIREBASE_RULES_FIX.md` - Firebase Rules トラブルシューティング

---

**ドキュメント作成日**: 2026-02-16  
**作成者**: AI Assistant  
**バージョン**: 1.0.23
