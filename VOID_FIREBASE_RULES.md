# 🌌 ヴォイドゲーム Firebase Security Rules 更新ガイド

**更新日**: 2026-02-15  
**バージョン**: v1.0.23

---

## 📋 必要な作業

Firebase Realtime Databaseにヴォイドゲーム用のデータパスを追加する必要があります。

---

## 🔧 Firebase Console での設定手順

### ステップ1: Firebase Consoleにアクセス

```
https://console.firebase.google.com/project/lol-word-wolf/database/lol-word-wolf-default-rtdb/rules
```

### ステップ2: ルールを更新

左メニューから：
1. **Realtime Database** をクリック
2. **ルール** タブをクリック

### ステップ3: 以下のルールに更新

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

### ステップ4: 公開

右上の **「公開」** ボタンをクリック

---

## ✅ 確認方法

1. ブラウザでサイトにアクセス
2. Ctrl + Shift + R でハードリロード
3. ゲームモード選択で「🌌 ヴォイドに届くは光か闇か」を選択
4. ルーム作成が成功すればOK

エラーが出る場合：
- F12 → Console でエラーを確認
- "Permission denied" エラーの場合は、Rulesが正しく更新されていません

---

## 📊 データ構造

ヴォイドゲームは以下の構造でデータを保存します：

```
void_rooms/
  └── 123456/  (ルームID)
      ├── gameType: "lol"
      ├── hostName: "Player1"
      ├── maxPlayers: 4
      ├── theme: { id, name, category }
      ├── gameState: "waiting" | "playing" | "finished"
      ├── currentTurn: 0
      ├── players: {}
      ├── playerOrder: []
      ├── turns: {}
      ├── finalAnswer: null
      └── isCorrect: null
```

---

**重要**: Firebase Rulesを更新しないと、ヴォイドゲームは動作しません！
