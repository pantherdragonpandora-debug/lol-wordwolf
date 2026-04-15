// ========================================
// Evolution Runner Game Logic
// ========================================

// ゲーム設定
const CONFIG = {
    GRAVITY: 0.6,
    JUMP_FORCE: -13,
    INITIAL_SPEED: 5,
    SPEED_INCREMENT: 0.5, // 難易度上昇（0.4 → 0.5）
    STAGE_INTERVAL: 100,
    OBSTACLE_MIN_DISTANCE: 280, // 初期間隔
    OBSTACLE_MAX_DISTANCE: 450,
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 400
};

// ステージ定義（時代に合わせたビジュアル）
const STAGES = [
    { 
        score: 0, 
        name: '🌊 生命誕生', 
        bgColor: '#001a33', 
        groundColor: '#003366', 
        playerColor: '#00ffff',
        playerShape: 'cell',
        obstacleType: 'rock'
    },
    { 
        score: 200, 
        name: '💨 酸素革命', 
        bgColor: '#1a0033', 
        groundColor: '#330066', 
        playerColor: '#ff00ff',
        playerShape: 'bacteria',
        obstacleType: 'crystal'
    },
    { 
        score: 500, 
        name: '🦈 カンブリア爆発', 
        bgColor: '#003d5c', 
        groundColor: '#006b8f', 
        playerColor: '#00d4ff',
        playerShape: 'fish',
        obstacleType: 'coral'
    },
    { 
        score: 900, 
        name: '🦕 恐竜時代', 
        bgColor: '#1a3300', 
        groundColor: '#336600', 
        playerColor: '#66ff00',
        playerShape: 'dino',
        obstacleType: 'tree'
    },
    { 
        score: 1400, 
        name: '🗿 新石器時代', 
        bgColor: '#4a3728', 
        groundColor: '#8b6f47', 
        playerColor: '#d4a76a',
        playerShape: 'caveman',
        obstacleType: 'stone'
    },
    { 
        score: 2000, 
        name: '🏛️ 古代文明', 
        bgColor: '#1a1a2e', // 夜の砂漠（暗い青紫）
        groundColor: '#6b5d4f', // 砂の色
        playerColor: '#ffcc00',
        playerShape: 'pharaoh',
        obstacleType: 'sphinx'
    },
    { 
        score: 2700, 
        name: '⚔️ 中世', 
        bgColor: '#2e3a4f', 
        groundColor: '#4a5568', 
        playerColor: '#c0c0c0',
        playerShape: 'knight',
        obstacleType: 'castle'
    },
    { 
        score: 3500, 
        name: '⚓ 大航海時代', 
        bgColor: '#0f4c81', 
        groundColor: '#1e6ba8', 
        playerColor: '#8b4513',
        playerShape: 'sailor',
        obstacleType: 'barrel'
    },
    { 
        score: 4400, 
        name: '🏭 産業革命', 
        bgColor: '#3a3a3a', 
        groundColor: '#5a5a5a', 
        playerColor: '#8b8b00',
        playerShape: 'worker',
        obstacleType: 'machine'
    },
    { 
        score: 5400, 
        name: '🏙️ 現代', 
        bgColor: '#1a1a2e', 
        groundColor: '#16213e', 
        playerColor: '#0f3460',
        playerShape: 'modern',
        obstacleType: 'car'
    },
    { 
        score: 6500, 
        name: '☢️ 生命崩壊時代', 
        bgColor: '#4a1a1a', 
        groundColor: '#6b2222', 
        playerColor: '#ff4444',
        playerShape: 'survivor',
        obstacleType: 'debris'
    },
    { 
        score: 7700, 
        name: '🚀 宇宙へ', 
        bgColor: '#000000', 
        groundColor: '#0a0a1e', 
        playerColor: '#ffff00',
        playerShape: 'rocket',
        obstacleType: 'asteroid'
    }
];

// ゲーム状態
let gameState = {
    isRunning: false,
    score: 0,
    highScore: 0,
    speed: CONFIG.INITIAL_SPEED,
    frameCount: 0,
    currentStage: 0,
    nextObstacleDistance: CONFIG.OBSTACLE_MIN_DISTANCE
};

// プレイヤー
let player = {
    x: 80,
    y: 0,
    width: 32,
    height: 32,
    velocityY: 0,
    isJumping: false,
    canDoubleJump: false,
    groundY: CONFIG.CANVAS_HEIGHT - 80
};

// 障害物リスト
let obstacles = [];

// Canvas要素とその他のDOM要素（init関数内で取得）
let canvas, ctx;
let startScreen, gameoverScreen, gameHud;
let startButton, restartButton;
let hudScoreValue, hudHighScoreValue, hudStageName;
let finalScore, highScoreDisplay, gameoverStage, gameoverMessage;

// ========================================
// 初期化
// ========================================

function init() {
    // DOM要素を取得
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    startScreen = document.getElementById('start-screen-overlay');
    gameoverScreen = document.getElementById('gameover-screen');
    gameHud = document.getElementById('game-hud');
    
    startButton = document.getElementById('start-button');
    restartButton = document.getElementById('restart-button');
    
    hudScoreValue = document.getElementById('hud-score-value');
    hudHighScoreValue = document.getElementById('hud-high-score-value');
    hudStageName = document.getElementById('hud-stage-name');
    finalScore = document.getElementById('final-score');
    highScoreDisplay = document.getElementById('high-score');
    gameoverStage = document.getElementById('gameover-stage');
    gameoverMessage = document.getElementById('gameover-message');
    
    // ローカルストレージから最高記録を読み込み
    const savedHighScore = localStorage.getItem('evolution-runner-highscore');
    if (savedHighScore) {
        gameState.highScore = parseInt(savedHighScore);
    }
    
    // イベントリスナー設定
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
    
    // ランキング登録ボタン
    const submitRankingButton = document.getElementById('submit-ranking-button');
    if (submitRankingButton) {
        submitRankingButton.addEventListener('click', submitRanking);
    }
    
    // ランキング表示ボタン（複数の方法で取得を試みる）
    setTimeout(() => {
        const viewRankingButton = document.getElementById('view-ranking-button');
        console.log('View ranking button (delayed):', viewRankingButton);
        if (viewRankingButton) {
            viewRankingButton.addEventListener('click', async () => {
                console.log('Ranking button clicked!');
                try {
                    await showRankingModal();
                } catch (error) {
                    console.error('Error showing ranking modal:', error);
                }
            });
            console.log('Ranking button event listener added');
        } else {
            console.error('View ranking button not found after delay!');
            // すべてのボタンを列挙してデバッグ
            const allButtons = document.querySelectorAll('button');
            console.log('All buttons found:', allButtons.length);
            allButtons.forEach((btn, i) => {
                console.log(`Button ${i}: id="${btn.id}", class="${btn.className}"`);
            });
        }
    }, 100);
    
    // ランキングモーダル閉じるボタン
    const closeRankingButton = document.getElementById('close-ranking-button');
    if (closeRankingButton) {
        closeRankingButton.addEventListener('click', closeRankingModal);
    }
    
    // モーダル背景クリックで閉じる
    const rankingModal = document.getElementById('ranking-modal');
    if (rankingModal) {
        rankingModal.addEventListener('click', (e) => {
            if (e.target === rankingModal) {
                closeRankingModal();
            }
        });
    }
    
    // キーボード操作
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // タッチ/クリック操作（ジャンプのみ）
    if (canvas) {
        canvas.addEventListener('click', handleJump);
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleJump();
        });
    }
    
    // 初期表示
    updateHighScoreDisplay();
    
    console.log('Evolution Runner initialized!');
}

// ========================================
// ゲーム開始
// ========================================

function startGame() {
    // ゲーム状態リセット
    gameState.isRunning = true;
    gameState.score = 0;
    gameState.speed = CONFIG.INITIAL_SPEED;
    gameState.frameCount = 0;
    gameState.currentStage = 0;
    gameState.nextObstacleDistance = CONFIG.OBSTACLE_MIN_DISTANCE;
    
    // プレイヤーリセット
    player.y = player.groundY;
    player.velocityY = 0;
    player.isJumping = false;
    player.canDoubleJump = false;
    
    // 障害物リセット
    obstacles = [];
    
    // ステージ名を初期化
    hudStageName.textContent = STAGES[0].name;
    
    // 画面切り替え
    startScreen.style.display = 'none';
    gameoverScreen.style.display = 'none';
    gameHud.style.display = 'block';
    
    // ゲームループ開始
    requestAnimationFrame(gameLoop);
}

// ========================================
// ゲームループ
// ========================================

function gameLoop() {
    if (!gameState.isRunning) return;
    
    // 更新
    update();
    
    // 描画
    render();
    
    // 次フレーム
    requestAnimationFrame(gameLoop);
}

// ========================================
// 更新処理
// ========================================

function update() {
    gameState.frameCount++;
    
    // プレイヤー更新
    updatePlayer();
    
    // 障害物更新
    updateObstacles();
    
    // 衝突判定
    checkCollisions();
    
    // スコア更新
    updateScore();
    
    // ステージ更新
    updateStage();
}

// プレイヤー更新
function updatePlayer() {
    // ジャンプ中
    if (player.isJumping || player.y < player.groundY) {
        player.velocityY += CONFIG.GRAVITY;
        player.y += player.velocityY;
        
        // 地面に着地
        if (player.y >= player.groundY) {
            player.y = player.groundY;
            player.velocityY = 0;
            player.isJumping = false;
            player.canDoubleJump = false; // 着地時に二段ジャンプをリセット
        }
    }
}

// 障害物更新
function updateObstacles() {
    // 障害物生成（距離ベース）
    gameState.nextObstacleDistance -= gameState.speed;
    
    if (gameState.nextObstacleDistance <= 0) {
        spawnObstacle();
        // 次の障害物までの距離をランダムに設定（スコアが高いほど短く）
        const densityFactor = Math.max(0.4, 1 - (gameState.score / 3000)); // 密度強化（5000→3000、0.5→0.4）
        gameState.nextObstacleDistance = (CONFIG.OBSTACLE_MIN_DISTANCE + 
            Math.random() * (CONFIG.OBSTACLE_MAX_DISTANCE - CONFIG.OBSTACLE_MIN_DISTANCE)) * densityFactor;
    }
    
    // 障害物移動と上部トラップ有効化
    obstacles.forEach(obstacle => {
        obstacle.x -= gameState.speed;
        
        // 上部トラップの有効化判定
        if (obstacle.linkedToLower && !obstacle.isActive) {
            // プレイヤーがジャンプしていて、この障害物の近くにいる場合
            const distanceToPlayer = Math.abs(obstacle.x - player.x);
            if (player.isJumping && distanceToPlayer < 100) {
                obstacle.isActive = true; // 上部障害物を有効化
            }
        }
    });
    
    // 画面外の障害物を削除
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

// 障害物生成
function spawnObstacle() {
    // 難易度に応じて障害物タイプを変更
    const stageLevel = gameState.currentStage;
    const score = gameState.score;
    
    let types = ['low']; // 基本: 地上の障害物（通常ジャンプで飛び越える）
    
    // スコア50以上で高い障害物を追加（序盤から二段ジャンプを学習）
    if (score >= 50) {
        types.push('high'); // 地面から生えている高い障害物（二段ジャンプ推奨）
        types.push('tallGround'); // 地面から生えている超高い障害物（二段ジャンプ必須）
    }
    
    if (score >= 150) {
        types.push('doubleLayer'); // 二段構造（上下に配置）
    }
    
    if (stageLevel >= 3 || score >= 600) {
        types.push('veryHigh'); // 非常に高い地面障害物（二段ジャンプ必須）
    }
    
    if (stageLevel >= 5 || score >= 1000) {
        types.push('tripleLayer'); // 三段構造
    }
    
    const type = types[Math.floor(Math.random() * types.length)];
    
    if (type === 'low') {
        // 低い障害物（通常ジャンプで飛び越える）
        obstacles.push({
            x: CONFIG.CANVAS_WIDTH,
            y: player.groundY + 8,
            width: 24,
            height: 28,
            type: 'low'
        });
    } else if (type === 'high') {
        // 地面から生えている高い障害物（二段ジャンプ推奨、高さ55px）
        obstacles.push({
            x: CONFIG.CANVAS_WIDTH,
            y: player.groundY - 47, // 地上から高さ55px
            width: 28,
            height: 55, // 地上まで届く
            type: 'high'
        });
    } else if (type === 'veryHigh') {
        // 地面から生えている非常に高い障害物（二段ジャンプ必須、高さ70px）
        obstacles.push({
            x: CONFIG.CANVAS_WIDTH,
            y: player.groundY - 62, // 地上から高さ70px
            width: 32,
            height: 70, // 地上まで届く
            type: 'veryHigh'
        });
    } else if (type === 'tallGround') {
        // 地面から生えている超高い障害物（二段ジャンプ必須、高さ60px）
        obstacles.push({
            x: CONFIG.CANVAS_WIDTH,
            y: player.groundY - 52, // 地上から高さ60px
            width: 30,
            height: 60, // 地上まで完全に届く
            type: 'tallGround'
        });
    } else if (type === 'doubleLayer') {
        // 下部の障害物（通過可能だが、飛ぶと上部が出現）
        obstacles.push({
            x: CONFIG.CANVAS_WIDTH,
            y: player.groundY + 8,
            width: 24,
            height: 28,
            type: 'low',
            hasUpperTrap: true // 上部トラップフラグ
        });
        // 上部の障害物（プレイヤーがジャンプしたら有効化）
        obstacles.push({
            x: CONFIG.CANVAS_WIDTH,
            y: player.groundY - 60, // 通常ジャンプの頂点付近
            width: 32,
            height: 30,
            type: 'upper',
            isActive: false, // 初期は無効
            linkedToLower: true
        });
    } else if (type === 'tripleLayer') {
        // 三段構造（通常ジャンプでは中段に当たる、二段ジャンプ必須）
        obstacles.push({
            x: CONFIG.CANVAS_WIDTH,
            y: player.groundY + 8,
            width: 20,
            height: 25,
            type: 'low'
        });
        obstacles.push({
            x: CONFIG.CANVAS_WIDTH,
            y: player.groundY - 35, // 通常ジャンプで当たる位置
            height: 28,
            type: 'middle',
            isActive: true
        });
    }
}

// 衝突判定（余裕を持たせた判定）
function checkCollisions() {
    const hitboxMargin = 4; // ヒットボックス調整
    
    obstacles.forEach(obstacle => {
        // 無効な障害物はスキップ
        if (obstacle.isActive === false) return;
        
        if (
            player.x + hitboxMargin < obstacle.x + obstacle.width - hitboxMargin &&
            player.x + player.width - hitboxMargin > obstacle.x + hitboxMargin &&
            player.y + hitboxMargin < obstacle.y + obstacle.height - hitboxMargin &&
            player.y + player.height - hitboxMargin > obstacle.y + hitboxMargin
        ) {
            gameOver();
        }
    });
}

// スコア更新
function updateScore() {
    if (gameState.frameCount % 5 === 0) {
        gameState.score++;
        hudScoreValue.textContent = gameState.score;
        
        // 最高記録更新
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            updateHighScoreDisplay();
            localStorage.setItem('evolution-runner-highscore', gameState.highScore);
        }
        
        // 100点ごとに速度を少し上げる（難易度上昇）
        if (gameState.score % 100 === 0) {
            gameState.speed += 0.4; // 0.3 → 0.4に強化
        }
    }
}

// ステージ更新
function updateStage() {
    // スコアに応じてステージを判定
    let newStageIndex = 0;
    for (let i = STAGES.length - 1; i >= 0; i--) {
        if (gameState.score >= STAGES[i].score) {
            newStageIndex = i;
            break;
        }
    }
    
    if (newStageIndex !== gameState.currentStage) {
        const oldStage = gameState.currentStage;
        gameState.currentStage = newStageIndex;
        gameState.speed += CONFIG.SPEED_INCREMENT;
        
        // ステージ名更新
        if (hudStageName && STAGES[gameState.currentStage]) {
            hudStageName.textContent = STAGES[gameState.currentStage].name;
            console.log(`Stage updated: ${oldStage} → ${newStageIndex}, Name: ${STAGES[gameState.currentStage].name}`);
        }
    }
}

// ========================================
// 描画処理
// ========================================

function render() {
    const stage = STAGES[gameState.currentStage];
    
    // 背景
    ctx.fillStyle = stage.bgColor;
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // 背景要素（星・雲など）
    drawBackground(stage);
    
    // 地面
    ctx.fillStyle = stage.groundColor;
    ctx.fillRect(0, player.groundY + 32, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // 地面のライン
    ctx.strokeStyle = lightenColor(stage.groundColor, 30);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, player.groundY + 32);
    ctx.lineTo(CONFIG.CANVAS_WIDTH, player.groundY + 32);
    ctx.stroke();
    
    // プレイヤー
    drawPlayer(stage);
    
    // 障害物
    drawObstacles(stage);
}

// 背景要素描画
function drawBackground(stage) {
    // 宇宙ステージ（最初と最後）
    if (gameState.currentStage === 0 || gameState.currentStage >= 11) {
        drawStars();
    }
    
    // 海ステージ
    if (gameState.currentStage >= 1 && gameState.currentStage <= 2) {
        drawBubbles();
    }
    
    // 恐竜時代
    if (gameState.currentStage === 3) {
        drawClouds();
    }
    
    // 古代文明（ピラミッド）
    if (gameState.currentStage === 5) {
        drawPyramids();
    }
    
    // 中世〜現代
    if (gameState.currentStage >= 6 && gameState.currentStage <= 9) {
        drawClouds();
    }
}

// 星描画
function drawStars() {
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 50; i++) {
        const x = (i * 37 + gameState.frameCount * 0.5) % CONFIG.CANVAS_WIDTH;
        const y = (i * 73) % CONFIG.CANVAS_HEIGHT;
        const size = (i % 3) + 1;
        ctx.fillRect(x, y, size, size);
    }
}

// 泡描画
function drawBubbles() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 10; i++) {
        const x = (i * 80 + gameState.frameCount * 0.3) % CONFIG.CANVAS_WIDTH;
        const y = player.groundY - (i * 30 + gameState.frameCount % 200);
        if (y < player.groundY && y > 0) {
            ctx.beginPath();
            ctx.arc(x, y, 4 + (i % 3), 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// 雲描画
function drawClouds() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 5; i++) {
        const x = (i * 200 + gameState.frameCount * 0.2) % (CONFIG.CANVAS_WIDTH + 100) - 50;
        const y = 50 + i * 30;
        // 簡易的な雲
        ctx.fillRect(x, y, 60, 20);
        ctx.fillRect(x + 10, y - 10, 40, 20);
    }
}

// ピラミッド描画（夜の砂漠バージョン）
function drawPyramids() {
    // 大ピラミッド（暗めの色調）
    ctx.fillStyle = '#4a3f2a';
    ctx.beginPath();
    ctx.moveTo(150, player.groundY + 32);
    ctx.lineTo(100, player.groundY - 50);
    ctx.lineTo(200, player.groundY - 50);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#2a2010';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 中ピラミッド
    ctx.fillStyle = '#5a4f3a';
    ctx.beginPath();
    ctx.moveTo(600, player.groundY + 32);
    ctx.lineTo(560, player.groundY - 30);
    ctx.lineTo(640, player.groundY - 30);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#3a3020';
    ctx.stroke();
    
    // 月（夜の象徴）
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.arc(700, 80, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // クレーター
    ctx.fillStyle = '#b0b0b0';
    ctx.beginPath();
    ctx.arc(695, 75, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(708, 82, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // 星々
    ctx.fillStyle = '#ffffff';
    const stars = [[50, 60], [120, 40], [250, 50], [320, 70], [450, 45], [520, 65]];
    stars.forEach(([x, y]) => {
        ctx.fillRect(x, y, 2, 2);
    });
}

// プレイヤー描画（時代に合わせた形状）
function drawPlayer(stage) {
    ctx.save();
    ctx.translate(player.x + player.width/2, player.y + player.height/2);
    
    switch(stage.playerShape) {
        case 'cell':
            drawCell(stage.playerColor);
            break;
        case 'bacteria':
            drawBacteria(stage.playerColor);
            break;
        case 'fish':
            drawFish(stage.playerColor);
            break;
        case 'dino':
            drawDino(stage.playerColor);
            break;
        case 'caveman':
            drawCaveman(stage.playerColor);
            break;
        case 'pharaoh':
            drawPharaoh(stage.playerColor);
            break;
        case 'knight':
            drawKnight(stage.playerColor);
            break;
        case 'sailor':
            drawSailor(stage.playerColor);
            break;
        case 'worker':
            drawWorker(stage.playerColor);
            break;
        case 'modern':
            drawModern(stage.playerColor);
            break;
        case 'survivor':
            drawSurvivor(stage.playerColor);
            break;
        case 'rocket':
            drawRocket(stage.playerColor);
            break;
        default:
            drawHumanoid(stage.playerColor);
    }
    
    ctx.restore();
}

// 単細胞生物
function drawCell(color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.arc(-4, -4, 6, 0, Math.PI * 2);
    ctx.fill();
}

// バクテリア
function drawBacteria(color) {
    ctx.fillStyle = color;
    ctx.fillRect(-12, -8, 24, 16);
    ctx.fillRect(-8, -12, 16, 24);
}

// 魚
function drawFish(color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(-8, -12);
    ctx.lineTo(-12, 0);
    ctx.lineTo(-8, 12);
    ctx.closePath();
    ctx.fill();
    // 尾びれ
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-20, -8);
    ctx.lineTo(-20, 8);
    ctx.closePath();
    ctx.fill();
}

// 恐竜
function drawDino(color) {
    ctx.fillStyle = color;
    // 体
    ctx.fillRect(-8, -8, 16, 16);
    // 頭
    ctx.fillRect(8, -12, 8, 12);
    // 尻尾
    ctx.fillRect(-16, -4, 8, 8);
    // 足
    ctx.fillRect(-4, 8, 4, 8);
    ctx.fillRect(4, 8, 4, 8);
}

// 人型
function drawHumanoid(color) {
    ctx.fillStyle = color;
    // 体
    ctx.fillRect(-6, -8, 12, 16);
    // 頭
    ctx.fillRect(-4, -16, 8, 8);
    // 腕（ジャンプ中は上げる）
    if (player.isJumping) {
        ctx.fillRect(-10, -12, 4, 8);
        ctx.fillRect(6, -12, 4, 8);
    } else {
        ctx.fillRect(-10, -4, 4, 8);
        ctx.fillRect(6, -4, 4, 8);
    }
    // 足
    ctx.fillRect(-6, 8, 4, 8);
    ctx.fillRect(2, 8, 4, 8);
}

// ロケット
function drawRocket(color) {
    ctx.fillStyle = color;
    // 本体
    ctx.fillRect(-8, -12, 16, 24);
    // 先端
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(-8, -12);
    ctx.lineTo(8, -12);
    ctx.closePath();
    ctx.fill();
    // 窓
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(-4, -8, 8, 8);
    // 炎
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(-6, 12, 4, 6);
    ctx.fillRect(2, 12, 4, 6);
}

// 原始人
function drawCaveman(color) {
    ctx.fillStyle = color;
    // 体
    ctx.fillRect(-6, -6, 12, 14);
    // 頭（大きめ）
    ctx.fillRect(-5, -15, 10, 9);
    // 髪
    ctx.fillStyle = '#4a2511';
    ctx.fillRect(-6, -16, 12, 3);
    // 腕
    ctx.fillStyle = color;
    ctx.fillRect(-10, -3, 4, 7);
    ctx.fillRect(6, -3, 4, 7);
    // 足
    ctx.fillRect(-6, 8, 4, 8);
    ctx.fillRect(2, 8, 4, 8);
}

// ファラオ
function drawPharaoh(color) {
    // 体（黄金の装飾）
    ctx.fillStyle = color;
    ctx.fillRect(-6, -6, 12, 14);
    // 頭
    ctx.fillRect(-4, -15, 8, 9);
    // ネメス（頭巾）
    ctx.fillStyle = '#4169e1';
    ctx.fillRect(-7, -16, 14, 4);
    ctx.fillRect(-8, -12, 4, 8);
    ctx.fillRect(4, -12, 4, 8);
    // 腕
    ctx.fillStyle = color;
    ctx.fillRect(-10, -4, 4, 8);
    ctx.fillRect(6, -4, 4, 8);
    // 足
    ctx.fillRect(-6, 8, 4, 8);
    ctx.fillRect(2, 8, 4, 8);
    // 杖（権威の象徴）
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(8, -14, 2, 20);
}

// 騎士
function drawKnight(color) {
    // 体（鎧）
    ctx.fillStyle = color;
    ctx.fillRect(-7, -8, 14, 16);
    // 頭（兜）
    ctx.fillRect(-5, -16, 10, 8);
    // 兜の飾り
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(-2, -20, 4, 4);
    // 盾
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(-12, -6, 5, 10);
    // 腕
    ctx.fillStyle = color;
    ctx.fillRect(7, -4, 4, 8);
    // 足
    ctx.fillRect(-6, 8, 4, 8);
    ctx.fillRect(2, 8, 4, 8);
}

// 船乗り
function drawSailor(color) {
    // 体
    ctx.fillStyle = color;
    ctx.fillRect(-6, -6, 12, 14);
    // 頭
    ctx.fillRect(-4, -15, 8, 9);
    // 帽子
    ctx.fillStyle = '#000080';
    ctx.fillRect(-5, -18, 10, 3);
    // 腕
    ctx.fillStyle = color;
    ctx.fillRect(-10, -3, 4, 7);
    ctx.fillRect(6, -3, 4, 7);
    // 足
    ctx.fillRect(-6, 8, 4, 8);
    ctx.fillRect(2, 8, 4, 8);
    // ロープ（装飾）
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(-8, 0, 16, 2);
}

// 労働者
function drawWorker(color) {
    // 体
    ctx.fillStyle = color;
    ctx.fillRect(-6, -6, 12, 14);
    // 頭
    ctx.fillRect(-4, -15, 8, 9);
    // ヘルメット
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(-5, -18, 10, 4);
    // 腕
    ctx.fillStyle = color;
    ctx.fillRect(-10, -3, 4, 7);
    ctx.fillRect(6, -3, 4, 7);
    // 足
    ctx.fillRect(-6, 8, 4, 8);
    ctx.fillRect(2, 8, 4, 8);
    // 工具
    ctx.fillStyle = '#808080';
    ctx.fillRect(7, -2, 6, 2);
}

// 現代人
function drawModern(color) {
    // 体
    ctx.fillStyle = color;
    ctx.fillRect(-6, -6, 12, 14);
    // 頭
    ctx.fillRect(-4, -15, 8, 9);
    // 髪
    ctx.fillStyle = '#2c1810';
    ctx.fillRect(-5, -16, 10, 3);
    // 腕
    ctx.fillStyle = color;
    ctx.fillRect(-10, -3, 4, 7);
    ctx.fillRect(6, -3, 4, 7);
    // 足
    ctx.fillRect(-6, 8, 4, 8);
    ctx.fillRect(2, 8, 4, 8);
    // スマホ（現代の象徴）
    ctx.fillStyle = '#000';
    ctx.fillRect(6, -8, 3, 5);
}

// サバイバー
function drawSurvivor(color) {
    // 体（破れた服）
    ctx.fillStyle = color;
    ctx.fillRect(-6, -6, 12, 14);
    // 頭
    ctx.fillRect(-4, -15, 8, 9);
    // ボロ布
    ctx.fillStyle = '#4a4a4a';
    ctx.fillRect(-7, -8, 5, 3);
    ctx.fillRect(2, -5, 6, 3);
    // 腕
    ctx.fillStyle = color;
    ctx.fillRect(-10, -3, 4, 7);
    ctx.fillRect(6, -3, 4, 7);
    // 足
    ctx.fillRect(-6, 8, 4, 8);
    ctx.fillRect(2, 8, 4, 8);
}

// 障害物描画（時代に合わせた形状）
function drawObstacles(stage) {
    obstacles.forEach(obstacle => {
        // 無効な障害物は薄く表示（または非表示）
        const alpha = obstacle.isActive === false ? 0.3 : 1.0;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2);
        
        const baseColor = lightenColor(stage.groundColor, 60);
        
        switch(stage.obstacleType) {
            case 'rock':
                drawRock(baseColor, obstacle.width);
                break;
            case 'crystal':
                drawCrystal(baseColor, obstacle.width);
                break;
            case 'coral':
                drawCoral(baseColor, obstacle.width);
                break;
            case 'tree':
                drawTree(baseColor, obstacle.width);
                break;
            case 'stone':
                drawStone(baseColor, obstacle.width);
                break;
            case 'sphinx':
                drawSphinx(baseColor, obstacle.width);
                break;
            case 'castle':
                drawCastle(baseColor, obstacle.width);
                break;
            case 'barrel':
                drawBarrel(baseColor, obstacle.width);
                break;
            case 'machine':
                drawMachine(baseColor, obstacle.width);
                break;
            case 'car':
                drawCar(baseColor, obstacle.width);
                break;
            case 'debris':
                drawDebris(baseColor, obstacle.width);
                break;
            case 'asteroid':
                drawAsteroid(baseColor, obstacle.width);
                break;
            default:
                drawRock(baseColor, obstacle.width);
        }
        
        ctx.restore();
    });
}

// 岩
function drawRock(color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(-size/2, -size/2, size, size);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/2, -size/2, size, size);
}

// 結晶
function drawCrystal(color, size) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size/2);
    ctx.lineTo(size/2, 0);
    ctx.lineTo(0, size/2);
    ctx.lineTo(-size/2, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// サンゴ
function drawCoral(color, size) {
    ctx.fillStyle = color;
    for (let i = 0; i < 3; i++) {
        const x = (i - 1) * (size/4);
        ctx.fillRect(x - 2, -size/2, 4, size);
    }
}

// 木
function drawTree(color, size) {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(-4, -size/2, 8, size);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, -size/2 - 4, size/2, 0, Math.PI * 2);
    ctx.fill();
}

// 石碑
function drawStone(color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(-size/2, -size/2, size, size);
    // 模様
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/3, -size/3, size/1.5, size/1.5);
}

// スフィンクス
function drawSphinx(color, size) {
    // 体（ライオンの胴体）
    ctx.fillStyle = '#d4a76a';
    ctx.fillRect(-size/2, 0, size, size/2);
    // 頭（人間の頭）
    ctx.fillStyle = color;
    ctx.fillRect(-size/3, -size/2, size/1.5, size/2);
    // ネメス（頭巾）
    ctx.fillStyle = '#4169e1';
    ctx.fillRect(-size/2.5, -size/2 - 4, size/1.2, 4);
    ctx.fillRect(-size/2.5, -size/2, size/6, size/3);
    ctx.fillRect(size/4, -size/2, size/6, size/3);
    // 前足
    ctx.fillStyle = '#d4a76a';
    ctx.fillRect(-size/2 + 4, size/2, 4, 8);
    ctx.fillRect(size/2 - 8, size/2, 4, 8);
}

// 柱
function drawPillar(color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(-size/3, -size/2, size/1.5, size);
    ctx.fillRect(-size/2, -size/2 - 4, size, 4);
    ctx.fillRect(-size/2, size/2, size, 4);
}

// 城壁
function drawCastle(color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(-size/2, -size/2, size, size);
    // 城壁の凹凸
    for (let i = 0; i < 3; i++) {
        ctx.fillRect(-size/2 + i * (size/3), -size/2 - 4, size/4, 4);
    }
}

// 樽
function drawBarrel(color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(-size/2, -size/2, size, size);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, size/2, 0, Math.PI * 2);
    ctx.stroke();
}

// 機械
function drawMachine(color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(-size/2, -size/2, size, size);
    // 歯車
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * size/2, Math.sin(angle) * size/2);
        ctx.stroke();
    }
}

// 車
function drawCar(color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(-size/2, -size/3, size, size/1.5);
    // 窓
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(-size/3, -size/4, size/1.5, size/3);
    // タイヤ
    ctx.fillStyle = '#000';
    ctx.fillRect(-size/2 + 4, size/6, 6, 6);
    ctx.fillRect(size/2 - 10, size/6, 6, 6);
}

// 瓦礫
function drawDebris(color, size) {
    ctx.fillStyle = color;
    ctx.save();
    ctx.rotate(Math.PI / 6);
    ctx.fillRect(-size/2, -size/2, size, size);
    ctx.restore();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/2, -size/2, size, size);
}

// 隕石
function drawAsteroid(color, size) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const radius = size/2 * (0.8 + Math.random() * 0.4);
        if (i === 0) {
            ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        } else {
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
    }
    ctx.closePath();
    ctx.fill();
}

// 色を明るくするヘルパー関数
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// ========================================
// 操作処理
// ========================================

function handleKeyDown(e) {
    if (!gameState.isRunning) return;
    
    if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
    }
}

function handleKeyUp(e) {
    // キーアップ処理は不要
}

function handleJump() {
    if (!gameState.isRunning) return;
    
    // 一段目ジャンプ（地上にいる時）
    if (!player.isJumping && player.y === player.groundY) {
        player.velocityY = CONFIG.JUMP_FORCE;
        player.isJumping = true;
        player.canDoubleJump = true; // 二段ジャンプ可能に
    }
    // 二段目ジャンプ（空中で一度だけ）
    else if (player.canDoubleJump && player.isJumping) {
        player.velocityY = CONFIG.JUMP_FORCE * 0.8; // 二段目は少し弱め
        player.canDoubleJump = false; // 二段ジャンプを使用済みに
    }
}

// ========================================
// ゲームオーバー
// ========================================

function gameOver() {
    gameState.isRunning = false;
    
    // 画面切り替え
    gameHud.style.display = 'none';
    gameoverScreen.style.display = 'flex';
    
    // スコア表示
    finalScore.textContent = gameState.score;
    highScoreDisplay.textContent = gameState.highScore;
    gameoverStage.textContent = STAGES[gameState.currentStage].name + ' で到達';
    
    // メッセージ
    const message = getGameOverMessage(gameState.score);
    gameoverMessage.textContent = message;
    
    // ランキング関連の処理
    checkAndShowRankingForm();
}

function getGameOverMessage(score) {
    if (score < 100) return '生命の旅は始まったばかり...';
    if (score < 300) return '進化の道は険しい...';
    if (score < 500) return '文明の芽生えを見た';
    if (score < 800) return '人類の発展を目撃した';
    if (score < 1100) return '危機を乗り越えようとしている...';
    return '宇宙への脱出を果たした！おめでとう！';
}

// ========================================
// リスタート
// ========================================

function restartGame() {
    // ランキングフォームとランキング表示を非表示
    document.getElementById('ranking-form').style.display = 'none';
    document.getElementById('ranking-display').style.display = 'none';
    startGame();
}

// ========================================
// ランキング機能
// ========================================

async function checkAndShowRankingForm() {
    const rankingForm = document.getElementById('ranking-form');
    const rankingDisplay = document.getElementById('ranking-display');
    
    // 現在のランキングを取得
    const rankings = await fetchRankings();
    
    // TOP10に入るかチェック
    const isTop10 = rankings.length < 10 || gameState.score > rankings[rankings.length - 1].score;
    
    if (isTop10) {
        // ランキング登録フォームを表示
        rankingForm.style.display = 'block';
        rankingDisplay.style.display = 'none';
    } else {
        // ランキング表示のみ
        rankingForm.style.display = 'none';
        displayRankings(rankings);
        rankingDisplay.style.display = 'block';
    }
}

async function fetchRankings() {
    try {
        const response = await fetch('tables/evolution_runner_rankings?sort=-score&limit=10');
        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error('Failed to fetch rankings:', error);
        return [];
    }
}

async function submitRanking() {
    const playerNameInput = document.getElementById('player-name-input');
    const playerName = playerNameInput.value.trim();
    
    if (!playerName) {
        alert('名前を入力してください');
        return;
    }
    
    try {
        const response = await fetch('tables/evolution_runner_rankings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                player_name: playerName,
                score: gameState.score,
                stage_reached: STAGES[gameState.currentStage].name,
                play_date: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            // 登録成功、ランキング表示に切り替え
            document.getElementById('ranking-form').style.display = 'none';
            const rankings = await fetchRankings();
            displayRankings(rankings);
            document.getElementById('ranking-display').style.display = 'block';
        } else {
            alert('ランキング登録に失敗しました');
        }
    } catch (error) {
        console.error('Failed to submit ranking:', error);
        alert('ランキング登録に失敗しました');
    }
}

function displayRankings(rankings) {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    
    rankings.forEach((entry, index) => {
        const rank = index + 1;
        const item = document.createElement('div');
        item.className = 'ranking-item';
        if (rank <= 3) {
            item.classList.add(`rank-${rank}`);
        }
        
        const rankSpan = document.createElement('span');
        rankSpan.className = `ranking-rank ${rank <= 3 ? `rank-${rank}` : ''}`;
        rankSpan.textContent = `${rank}位`;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'ranking-name';
        nameSpan.textContent = entry.player_name;
        
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'ranking-score';
        scoreSpan.textContent = `${entry.score}点`;
        
        const stageSpan = document.createElement('span');
        stageSpan.className = 'ranking-stage';
        stageSpan.textContent = entry.stage_reached;
        
        item.appendChild(rankSpan);
        item.appendChild(nameSpan);
        item.appendChild(scoreSpan);
        item.appendChild(stageSpan);
        
        rankingList.appendChild(item);
    });
}

// ランキングモーダル表示
async function showRankingModal() {
    console.log('showRankingModal called');
    const rankingModal = document.getElementById('ranking-modal');
    const rankingModalList = document.getElementById('ranking-modal-list');
    
    console.log('Ranking modal:', rankingModal);
    console.log('Ranking modal list:', rankingModalList);
    
    // ランキングを取得して表示
    console.log('Fetching rankings...');
    const rankings = await fetchRankings();
    console.log('Rankings fetched:', rankings);
    
    rankingModalList.innerHTML = '';
    
    if (rankings.length === 0) {
        rankingModalList.innerHTML = '<p style="text-align: center; color: var(--game-text); padding: 2rem;">まだランキングがありません</p>';
    } else {
        rankings.forEach((entry, index) => {
            const rank = index + 1;
            const item = document.createElement('div');
            item.className = 'ranking-item';
            if (rank <= 3) {
                item.classList.add(`rank-${rank}`);
            }
            
            const rankSpan = document.createElement('span');
            rankSpan.className = `ranking-rank ${rank <= 3 ? `rank-${rank}` : ''}`;
            rankSpan.textContent = `${rank}位`;
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'ranking-name';
            nameSpan.textContent = entry.player_name;
            
            const scoreSpan = document.createElement('span');
            scoreSpan.className = 'ranking-score';
            scoreSpan.textContent = `${entry.score}点`;
            
            const stageSpan = document.createElement('span');
            stageSpan.className = 'ranking-stage';
            stageSpan.textContent = entry.stage_reached;
            
            item.appendChild(rankSpan);
            item.appendChild(nameSpan);
            item.appendChild(scoreSpan);
            item.appendChild(stageSpan);
            
            rankingModalList.appendChild(item);
        });
    }
    
    rankingModal.style.display = 'flex';
}

// ランキングモーダル閉じる
function closeRankingModal() {
    const rankingModal = document.getElementById('ranking-modal');
    rankingModal.style.display = 'none';
}

// ========================================
// UI更新
// ========================================

function updateHighScoreDisplay() {
    hudHighScoreValue.textContent = gameState.highScore;
}

// ========================================
// 初期化実行
// ========================================

// ページ読み込み完了後に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
