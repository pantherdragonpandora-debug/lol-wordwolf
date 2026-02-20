# AIモード実装案 - ルールベースAI

## 🤖 実装可能な簡易AIモード

### **特徴**
- ✅ サーバー不要
- ✅ 完全にブラウザ内で動作
- ✅ APIキー不要
- ⚠️ AIは賢くない（ランダムやルールベース）

---

## 📝 実装例

### **1. ワードウルフ - 簡易AIプレイヤー**

```javascript
// AI プレイヤーの作成
class SimpleAIPlayer {
  constructor(name, role, topic) {
    this.name = name;
    this.role = role; // 'citizen' or 'wolf'
    this.topic = topic;
  }
  
  // AIがチャットに投稿する
  generateChatMessage() {
    // ランダムにヒントを出す
    const hints = [
      `${this.topic}に関連するものだと思います`,
      `これは${this.topic}ですね`,
      `私のは${this.topic}です`,
      `うーん、難しいですね`,
      `みなさんどうですか？`
    ];
    
    return hints[Math.floor(Math.random() * hints.length)];
  }
  
  // AIが投票する
  vote(players) {
    // ランダムに誰かに投票
    const otherPlayers = players.filter(p => p.name !== this.name);
    return otherPlayers[Math.floor(Math.random() * otherPlayers.length)].name;
  }
}

// 使用例
const aiPlayer = new SimpleAIPlayer('AI太郎', 'citizen', 'アーリ');
console.log(aiPlayer.generateChatMessage());
// → "アーリに関連するものだと思います"
```

### **2. デマーシア - AIが演技する**

```javascript
class DemaciaAI {
  constructor(name) {
    this.name = name;
  }
  
  // AIが演技を提出する（ランダム選択）
  performLine(line, situation) {
    // 簡単な演技テンプレート
    const performances = [
      `${line}（${situation}風に）`,
      `${line}っ！（${situation}）`,
      `あ、${line}...（${situation}）`,
    ];
    
    return performances[Math.floor(Math.random() * performances.length)];
  }
  
  // AIが答えを予想する
  guessAnswer(options) {
    // ランダムに答える
    return options[Math.floor(Math.random() * options.length)];
  }
}
```

### **3. ヴォイド - AIが連想ワードを考える**

```javascript
class VoidAI {
  constructor(name) {
    this.name = name;
    this.wordDatabase = {
      'アーリ': ['キツネ', '魅惑', 'ミッドレーン', '9本の尾'],
      'ヤスオ': ['サムライ', '風', 'ハサキ', '壁'],
      // ... 他のテーマ
    };
  }
  
  // AIが3つのワードを考える
  generateWords(theme) {
    const words = this.wordDatabase[theme] || ['不明', '難しい', 'わからない'];
    
    // ランダムに3つ選ぶ
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }
  
  // AIが前のプレイヤーのワードを見て新しいワードを考える
  transformWords(previousWords) {
    // 簡単なロジック：似た言葉に置き換える
    return previousWords.map(word => {
      // ランダムに変化させる
      return Math.random() > 0.5 ? word : this.getRelatedWord(word);
    });
  }
  
  getRelatedWord(word) {
    const synonyms = {
      'キツネ': '狐',
      '魅惑': 'チャーム',
      'ミッドレーン': 'ミッド',
      // ...
    };
    return synonyms[word] || word + '的な';
  }
  
  // AIが最終回答を予想する
  guessTheme(words, themes) {
    // ワードとテーマの一致度をチェック（簡易版）
    let bestMatch = themes[0];
    let maxScore = 0;
    
    themes.forEach(theme => {
      const themeWords = this.wordDatabase[theme] || [];
      let score = 0;
      
      words.forEach(word => {
        if (themeWords.some(tw => tw.includes(word) || word.includes(tw))) {
          score++;
        }
      });
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = theme;
      }
    });
    
    return bestMatch;
  }
}

// 使用例
const ai = new VoidAI('AIちゃん');
console.log(ai.generateWords('アーリ'));
// → ['キツネ', 'ミッドレーン', '9本の尾']

console.log(ai.transformWords(['キツネ', 'ミッドレーン', '9本の尾']));
// → ['狐', 'ミッドレーン', '9本の尾的な']
```

---

## 🎮 実装の流れ

### **ステップ1: AIプレイヤーをルームに追加**

```javascript
async function createRoomWithAI() {
  // 通常のルーム作成
  const roomId = await createRoom(playerName, maxPlayers);
  
  // AIプレイヤーを追加
  const aiCount = maxPlayers - 1; // 残りをAIで埋める
  for (let i = 0; i < aiCount; i++) {
    await addAIPlayer(roomId, `AI${i + 1}`);
  }
}

async function addAIPlayer(roomId, aiName) {
  // Firebaseに AI プレイヤーとして追加
  await firebase.database().ref(`void_rooms/${roomId}/players/${aiName}`).set({
    joinOrder: Date.now(),
    ready: true,
    isHost: false,
    hasSubmitted: false,
    isAI: true // ← AI フラグ
  });
}
```

### **ステップ2: AIの行動をシミュレート**

```javascript
function onGameStateChange(roomData) {
  // AIプレイヤーの番になったら自動で行動
  const currentPlayer = roomData.playOrder[roomData.currentTurn];
  const player = roomData.players[currentPlayer];
  
  if (player?.isAI) {
    // AIの番 → 自動で処理
    setTimeout(() => {
      performAIAction(roomData, currentPlayer);
    }, 2000); // 2秒待って自然な感じに
  }
}

async function performAIAction(roomData, aiName) {
  const ai = new VoidAI(aiName);
  
  if (roomData.currentTurn === 0) {
    // 最初のプレイヤー → テーマから3つのワードを考える
    const words = ai.generateWords(roomData.theme.name);
    await submitWords(roomData.roomId, aiName, words);
    
  } else if (roomData.currentTurn === roomData.playOrder.length - 1) {
    // 最後のプレイヤー → テーマを予想する
    const previousWords = getPreviousWords(roomData);
    const guess = ai.guessTheme(previousWords, getAllThemes());
    await submitAnswer(roomData.roomId, aiName, guess);
    
  } else {
    // 中間のプレイヤー → 前のワードを変換する
    const previousWords = getPreviousWords(roomData);
    const newWords = ai.transformWords(previousWords);
    await submitWords(roomData.roomId, aiName, newWords);
  }
}
```

### **ステップ3: UI に AI モード追加**

```html
<!-- ルーム作成画面に追加 -->
<div class="form-group">
  <label>
    <input type="checkbox" id="ai-mode-checkbox">
    AIと一緒に遊ぶ（残りのプレイヤーをAIで埋める）
  </label>
</div>
```

```javascript
// ルーム作成時にチェック
async function createVoidRoom() {
  const aiMode = document.getElementById('ai-mode-checkbox').checked;
  
  // 通常のルーム作成
  await currentVoidGame.createRoom(hostName, maxPlayers);
  
  if (aiMode) {
    // AIプレイヤーを追加
    for (let i = 1; i < maxPlayers; i++) {
      await addAIPlayer(currentVoidRoomId, `AI-${i}`);
    }
  }
}
```

---

## ⚠️ 制限事項

### **このAIの問題点**
1. **賢くない** - ランダムや単純なルールベース
2. **学習しない** - 毎回同じパターン
3. **文脈理解できない** - 本物の会話は不可能
4. **データベース依存** - 事前に登録したワードしか使えない

### **ユーザー体験**
- ✅ 1人でも遊べる
- ✅ 人数が足りなくても開始できる
- ⚠️ AIの回答が単調
- ⚠️ AIが明らかに不自然

---

## 🌟 より賢いAIを実装するには

### **必要なもの**
1. **バックエンドサーバー**
   - Node.js / Python / Go など
   - Vercel / Netlify Functions / AWS Lambda

2. **AI API**
   - OpenAI GPT-4
   - Anthropic Claude
   - Google Gemini

3. **セキュアなAPIキー管理**
   - 環境変数
   - サーバーサイドでのみ使用

4. **実装の流れ**
```
ブラウザ → サーバー → AI API → サーバー → ブラウザ
         (APIキー保護)
```

---

## 💡 推奨アプローチ

### **現時点での最適解**

**簡易AIモード（ルールベース）を実装する**
- ✅ サーバー不要
- ✅ 無料
- ✅ すぐに実装可能
- ⚠️ AI の賢さは限定的

**将来的にバックエンドを追加**
- より賢いAIを実装
- ChatGPT APIなどを統合
- 自然な会話が可能

---

## 🎯 まとめ

| 実装方法 | 実装可能？ | 賢さ | コスト |
|---------|----------|------|--------|
| **ルールベースAI** | ✅ 可能 | ⭐⭐☆☆☆ | 無料 |
| **バックエンド + AI API** | ❌ 不可（現環境） | ⭐⭐⭐⭐⭐ | 有料 |

**現在のプロジェクトでできること**:
- ✅ 簡易的なルールベースAIの実装
- ✅ 1人プレイモード
- ✅ AI がランダムに行動

**現在のプロジェクトでできないこと**:
- ❌ ChatGPT のような賢いAI
- ❌ 文脈を理解した会話
- ❌ 学習するAI

---

簡易AIモードを実装しますか？それとも、将来的にバックエンドを追加する計画について相談しますか？
