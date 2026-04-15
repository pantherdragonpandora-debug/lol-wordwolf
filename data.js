/* Evolution Runner Game Styles */

:root {
    --game-bg: #0A1428;
    --game-primary: #4A90E2;
    --game-secondary: #50E3C2;
    --game-text: #F0E6D2;
    --game-danger: #E74C3C;
}

.evolution-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

/* スタート画面オーバーレイ（全画面・スクロール可能） */
.screen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.98);
    z-index: 9999;
    overflow-y: auto;
    padding: 2rem 1rem;
}

.screen-overlay-content {
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 3rem;
}

.screen-content {
    text-align: center;
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
}

/* スタート画面内のゲーム説明 */
.game-description-inline {
    max-width: 700px;
    margin: 3rem auto 0 auto;
    padding: 2rem;
    background: rgba(10, 20, 40, 0.6);
    border: 2px solid var(--game-primary);
    border-radius: 12px;
    text-align: left;
}

.game-description-inline h2 {
    color: var(--game-secondary);
    margin-bottom: 1rem;
    text-align: center;
}

.game-description-inline h3 {
    color: var(--game-primary);
    margin: 2rem 0 1rem 0;
}

.game-description-inline p {
    color: var(--game-text);
    line-height: 1.8;
    margin-bottom: 1rem;
}

.game-description-inline ul {
    color: var(--game-text);
    line-height: 1.8;
    padding-left: 2rem;
    margin-top: 1rem;
}

.game-description-inline li {
    margin-bottom: 0.5rem;
}

/* ゲームコンテナ */
.game-container {
    position: relative;
    max-width: 800px;
    margin: 0 auto 3rem auto;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    min-height: 500px; /* 400px → 500px に増やして下に余白を作る */
    padding-bottom: 100px; /* 下部に100pxの余白を追加 */
    cursor: pointer; /* タップ可能であることを示す */
    touch-action: manipulation; /* タッチ操作を最適化 */
}

#gameCanvas {
    display: block;
    width: 100%;
    height: auto;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}

/* ゲームオーバー画面（ゲームコンテナ内・スクロール可能） */
.screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    overflow-y: auto;
    padding: 1rem;
}

.screen .screen-content {
    width: 100%;
    max-width: 600px;
    margin: auto;
}

.screen-content {
    text-align: center;
    padding: 2rem;
    max-width: 600px;
    margin: auto;
}

/* スタート画面 */
.game-title {
    font-size: 3rem;
    font-weight: 700;
    color: var(--game-secondary);
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px rgba(80, 227, 194, 0.5);
}

.game-subtitle {
    font-size: 1.5rem;
    color: var(--game-primary);
    margin-bottom: 2rem;
}

.story-intro {
    margin: 2rem 0;
    padding: 1.5rem;
    background: rgba(74, 144, 226, 0.1);
    border: 2px solid var(--game-primary);
    border-radius: 8px;
}

.story-text {
    font-size: 1rem;
    color: var(--game-text);
    margin: 0.8rem 0;
    line-height: 1.6;
}

/* 操作説明 */
.controls-info {
    margin: 2rem 0;
}

.controls-info h3 {
    color: var(--game-secondary);
    margin-bottom: 1rem;
}

.control-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0.8rem 0;
}

.key {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--game-primary);
    color: #fff;
    border-radius: 6px;
    font-weight: 600;
    min-width: 100px;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.3);
}

.action {
    color: var(--game-text);
    font-size: 1.1rem;
}

/* ボタン */
.game-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.4rem 0.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.start-button {
    background: linear-gradient(135deg, var(--game-secondary), var(--game-primary));
    color: #fff;
}

.start-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(80, 227, 194, 0.4);
}

.restart-button {
    background: linear-gradient(135deg, #E74C3C, #C0392B);
    color: #fff;
}

.restart-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
}

.home-button {
    background: rgba(255, 255, 255, 0.1);
    color: var(--game-text);
    border: 2px solid var(--game-primary);
}

.home-button:hover {
    background: rgba(74, 144, 226, 0.2);
}

.ranking-button {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: #000;
    font-weight: 700;
}

.ranking-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
}

/* ランキングモーダル */
.ranking-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.ranking-modal-content {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid var(--game-primary);
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
}

.ranking-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: rgba(74, 144, 226, 0.2);
    border-bottom: 2px solid var(--game-primary);
}

.ranking-modal-title {
    font-size: 1.5rem;
    color: var(--game-secondary);
    margin: 0;
}

.close-ranking-button {
    background: rgba(231, 76, 60, 0.8);
    color: #fff;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.close-ranking-button:hover {
    background: rgba(231, 76, 60, 1);
    transform: scale(1.1);
}

.ranking-modal-list {
    padding: 1.5rem;
    max-height: calc(80vh - 100px);
    overflow-y: auto;
}

.game-info {
    margin-top: 2rem;
    color: var(--game-text);
    opacity: 0.8;
    font-size: 0.95rem;
}

.game-info p {
    margin: 0.5rem 0;
}

/* ゲームオーバー画面 */
.gameover-title {
    font-size: 2rem;
    color: var(--game-danger);
    margin-bottom: 0.3rem;
    text-shadow: 0 0 20px rgba(231, 76, 60, 0.5);
}

.gameover-stage {
    font-size: 1rem;
    color: var(--game-secondary);
    margin-bottom: 0.8rem;
}

.score-display {
    margin: 0.8rem 0;
}

.score-label {
    font-size: 0.9rem;
    color: var(--game-text);
    margin-bottom: 0.2rem;
}

.final-score {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--game-secondary);
    margin: 0;
    text-shadow: 0 0 30px rgba(80, 227, 194, 0.6);
}

.high-score-display {
    margin: 0.8rem 0;
    padding: 0.6rem;
    background: rgba(255, 215, 0, 0.1);
    border: 2px solid gold;
    border-radius: 8px;
}

.high-score-label {
    font-size: 0.85rem;
    color: gold;
    margin-bottom: 0.2rem;
}

.high-score {
    font-size: 1.5rem;
    font-weight: 700;
    color: gold;
    margin: 0;
}

.gameover-message {
    font-size: 0.95rem;
    color: var(--game-text);
    margin: 0.6rem 0;
    line-height: 1.4;
}

/* ランキング登録フォーム */
.ranking-form {
    margin: 1.5rem 0;
    padding: 1rem;
    background: rgba(80, 227, 194, 0.1);
    border: 2px solid var(--game-secondary);
    border-radius: 8px;
}

.ranking-form-title {
    font-size: 1.2rem;
    color: var(--game-secondary);
    margin-bottom: 0.8rem;
}

.player-name-input {
    width: 100%;
    max-width: 300px;
    padding: 0.8rem;
    font-size: 1rem;
    border: 2px solid var(--game-primary);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: var(--game-text);
    text-align: center;
    margin-bottom: 0.8rem;
}

.player-name-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.player-name-input:focus {
    outline: none;
    border-color: var(--game-secondary);
    background: rgba(255, 255, 255, 0.15);
}

.submit-button {
    background: linear-gradient(135deg, var(--game-secondary), var(--game-primary));
    color: #fff;
}

/* ランキング表示 */
.ranking-display {
    margin: 1.5rem 0;
    padding: 1rem;
    background: rgba(74, 144, 226, 0.1);
    border: 2px solid var(--game-primary);
    border-radius: 8px;
    max-height: 400px;
    overflow-y: auto;
}

.ranking-title {
    font-size: 1.2rem;
    color: var(--game-primary);
    margin-bottom: 1rem;
    text-align: center;
}

.ranking-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.ranking-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.8rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    transition: all 0.3s ease;
}

.ranking-item:hover {
    background: rgba(255, 255, 255, 0.1);
}

.ranking-item.rank-1 {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1));
    border: 2px solid gold;
}

.ranking-item.rank-2 {
    background: linear-gradient(135deg, rgba(192, 192, 192, 0.2), rgba(192, 192, 192, 0.1));
    border: 2px solid silver;
}

.ranking-item.rank-3 {
    background: linear-gradient(135deg, rgba(205, 127, 50, 0.2), rgba(205, 127, 50, 0.1));
    border: 2px solid #cd7f32;
}

.ranking-rank {
    font-size: 1.2rem;
    font-weight: 700;
    min-width: 40px;
    text-align: center;
}

.ranking-rank.rank-1 { color: gold; }
.ranking-rank.rank-2 { color: silver; }
.ranking-rank.rank-3 { color: #cd7f32; }

.ranking-name {
    flex: 1;
    font-size: 1rem;
    color: var(--game-text);
    margin: 0 1rem;
}

.ranking-score {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--game-secondary);
}

.ranking-stage {
    font-size: 0.85rem;
    color: var(--game-text);
    opacity: 0.7;
    margin-left: 0.5rem;
}

/* HUD（ヘッドアップディスプレイ） */
#game-hud {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    pointer-events: none;
}

.hud-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);
}

.hud-score, .hud-high-score {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hud-label {
    font-size: 0.8rem;
    color: rgba(240, 230, 210, 0.7);
    margin-bottom: 0.2rem;
}

.hud-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--game-secondary);
    text-shadow: 0 0 10px rgba(80, 227, 194, 0.5);
}

.hud-stage {
    text-align: center;
}

.hud-stage-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--game-primary);
    background: rgba(0, 0, 0, 0.6);
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    text-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
}

/* スタートに戻るボタン */
.back-to-start-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(231, 76, 60, 0.8);
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 7;
    pointer-events: auto;
}

.back-to-start-button:hover {
    background: rgba(231, 76, 60, 1);
    transform: scale(1.05);
}

/* モバイル用タップヒント */
.mobile-tap-hint {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(80, 227, 194, 0.9);
    color: #000;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 700;
    z-index: 6;
    pointer-events: none;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
    50% { opacity: 0.7; transform: translateX(-50%) scale(1.05); }
}

/* ゲーム説明 */
.game-description {
    max-width: 800px;
    margin: 3rem auto;
    padding: 2rem;
    background: rgba(10, 20, 40, 0.5);
    border: 2px solid var(--game-primary);
    border-radius: 12px;
}

.game-description h2 {
    color: var(--game-secondary);
    margin-bottom: 1rem;
}

.game-description h3 {
    color: var(--game-primary);
    margin: 2rem 0 1rem 0;
}

.game-description p {
    color: var(--game-text);
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.game-description ul {
    color: var(--game-text);
    line-height: 2;
    padding-left: 2rem;
}

/* ステージリスト */
.stages-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.stage-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(74, 144, 226, 0.1);
    border: 1px solid var(--game-primary);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.stage-item:hover {
    background: rgba(74, 144, 226, 0.2);
    transform: translateX(5px);
}

.stage-score {
    font-weight: 700;
    color: var(--game-secondary);
    min-width: 80px;
}

.stage-name {
    color: var(--game-text);
}

/* レスポンシブ */
@media (max-width: 768px) {
    .evolution-main {
        padding: 1rem 0.5rem;
    }
    
    .screen-overlay {
        padding: 1rem 0.5rem;
    }
    
    .screen-overlay-content {
        padding-bottom: 2rem;
    }
    
    .game-description-inline {
        padding: 1.5rem;
        margin-top: 2rem;
    }
    
    .screen {
        min-height: auto;
    }
    
    .game-title {
        font-size: 2rem;
    }
    
    .game-subtitle {
        font-size: 1.2rem;
    }
    
    .screen-content {
        padding: 1rem;
    }
    
    .story-intro {
        padding: 1rem;
        margin: 1.5rem 0;
    }
    
    .story-text {
        font-size: 0.9rem;
    }
    
    .controls-info {
        margin: 1.5rem 0;
    }
    
    .game-button {
        padding: 0.7rem 1.2rem;
        font-size: 0.95rem;
        margin: 0.3rem 0.3rem;
    }
    
    .gameover-title {
        font-size: 1.8rem;
    }
    
    .final-score {
        font-size: 2rem;
    }
    
    .high-score {
        font-size: 1.3rem;
    }
    
    .hud-value {
        font-size: 1.2rem;
    }
    
    .hud-stage-name {
        font-size: 1rem;
        padding: 0.4rem 1rem;
    }
    
    .stages-list {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .screen-overlay {
        padding: 0.5rem;
    }
    
    .screen {
        min-height: 450px;
    }
    
    .screen-content {
        padding: 1.5rem 1rem;
    }
    
    .game-description-inline {
        padding: 1rem;
        margin-top: 1.5rem;
    }
    
    .game-title {
        font-size: 1.8rem;
    }
    
    .game-subtitle {
        font-size: 1rem;
    }
    
    .story-intro {
        padding: 0.8rem;
        margin: 1rem 0;
    }
    
    .story-text {
        font-size: 0.85rem;
        margin: 0.5rem 0;
    }
    
    .control-item {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .key {
        min-width: 80px;
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
    }
    
    .action {
        font-size: 0.95rem;
    }
    
    .game-button {
        padding: 0.7rem 1.5rem;
        font-size: 1rem;
    }
    
    .gameover-title {
        font-size: 2rem;
    }
    
    .final-score {
        font-size: 2.5rem;
    }
    
    .game-info {
        font-size: 0.85rem;
    }
    
    .game-description-inline h2 {
        font-size: 1.3rem;
    }
    
    .game-description-inline h3 {
        font-size: 1.1rem;
    }
    
    .game-description-inline p,
    .game-description-inline ul {
        font-size: 0.9rem;
    }
}
