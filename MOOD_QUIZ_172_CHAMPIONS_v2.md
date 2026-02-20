<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    
    <!-- キャッシュ制御 -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    
    <title>Esports ワードウルフ - LOL & VALORANT</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css?v=28">
    <link rel="stylesheet" href="css/demacia-style.css?v=28">
    <link rel="stylesheet" href="css/void-style.css?v=28">
    <link rel="stylesheet" href="css/screenshot-style.css?v=1">
    <link rel="stylesheet" href="css/mood-quiz-style.css?v=5">
    
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6628280908520822"
         crossorigin="anonymous"></script>
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
</head>
<body>
    <!-- ヘッダー -->
    <header>
        <div class="header-content">
            <h1 id="site-title" data-i18n="header.title" style="cursor: pointer;">🎮 Esports ワードウルフ</h1>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="language-switcher">
                    <button class="lang-btn" data-lang="ja" onclick="changeLanguage('ja')">日本語</button>
                    <button class="lang-btn" data-lang="en" onclick="changeLanguage('en')">EN</button>
                    <button class="lang-btn" data-lang="ko" onclick="changeLanguage('ko')">한국어</button>
                    <button class="lang-btn" data-lang="zh" onclick="changeLanguage('zh')">中文</button>
                </div>
                <div id="pageview-display" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-color); opacity: 0.8;">
                    <span>👁️</span>
                    <span id="pageview-count">---</span>
                    <span style="font-size: 0.8rem;">views</span>
                </div>
                <div id="connection-status" class="connection-status" data-i18n="header.connection.connecting">接続中...</div>
            </div>
        </div>
    </header>

    <!-- スタート画面に戻るボタン（固定） -->
    <button id="btn-home-fixed" class="btn-home-fixed" style="display: none;" onclick="goToStart()">
        <span data-i18n="header.backToStart">🏠 スタート画面に戻る</span>
    </button>

    <!-- メインコンテンツ -->
    <main>
        <!-- モード選択画面（最初の画面） -->
        <div id="mode-select-screen" class="screen active">
            <div class="card">
                <h2 data-i18n="modeSelect.title">ゲームモード選択</h2>
                <p style="text-align: center; margin-bottom: 2rem; color: var(--text-color);" data-i18n="modeSelect.subtitle">どのモードで遊びますか？</p>
                
                <div class="mode-selection-grid">
                    <button id="select-wordwolf-mode-btn" class="mode-card">
                        <img src="images/wordwolf-icon.jpg" alt="ワードウルフ" class="mode-icon-image" width="160" height="160">
                        <h3 class="mode-title" data-i18n="modeSelect.wordwolf">ワードウルフ</h3>
                        <p class="mode-description" data-i18n="modeSelect.wordwolfDesc">少数派のウルフを見つけ出すゲーム</p>
                        <p class="mode-players" data-i18n="modeSelect.wordwolfPlayers">👥 3〜6人</p>
                    </button>
                    
                    <button id="select-demacia-mode-btn" class="mode-card">
                        <img src="images/demacia-icon.jpg" alt="デマーシアに心を込めて" class="mode-icon-image" width="160" height="160">
                        <h3 class="mode-title" data-i18n="modeSelect.demacia">デマーシアに心を込めて</h3>
                        <p class="mode-description" data-i18n="modeSelect.demaciaDesc">セリフを演技して当ててもらうゲーム</p>
                        <p class="mode-players" data-i18n="modeSelect.demaciaPlayers">👥 3〜10人</p>
                    </button>
                    
                    <button id="select-void-mode-btn" class="mode-card void-mode-card">
                        <img src="images/void-icon.jpg" alt="ヴォイドに届くは光か闇か" class="mode-icon-image" width="160" height="160">
                        <h3 class="mode-title" data-i18n="modeSelect.void">ヴォイドに届くは光か闇か</h3>
                        <p class="mode-description" data-i18n="modeSelect.voidDesc">連想ワードを伝えてテーマを当てるゲーム</p>
                        <p class="mode-players" data-i18n="modeSelect.voidPlayers">👥 2〜8人</p>
                    </button>
                    
                    <button id="select-mood-quiz-btn" class="mode-card mood-quiz-mode-card">
                        <img src="images/mood-quiz-icon.jpg" alt="気分診断チャンピオン選択" class="mode-icon-image" width="160" height="160">
                        <h3 class="mode-title" data-i18n="modeSelect.moodQuiz">気分診断チャンピオン選択</h3>
                        <p class="mode-description" data-i18n="modeSelect.moodQuizDesc">今の気分にピッタリのチャンピオンを診断</p>
                        <p class="mode-players" data-i18n="modeSelect.moodQuizPlayers">👤 1人</p>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- ゲームタイプ選択画面 -->
        <div id="game-select-screen" class="screen">
            <div class="card">
                <div class="game-title-header">
                    <button id="back-to-mode-select-btn" class="btn-back">← <span data-i18n="gameSelect.backToMode">モード選択に戻る</span></button>
                    <h2 id="game-select-title" data-i18n="gameSelect.title">ゲームタイプ選択</h2>
                </div>
                <p style="text-align: center; margin-bottom: 2rem; color: var(--text-color);" data-i18n="gameSelect.subtitle">どのゲームで遊びますか？</p>
                
                <div class="game-selection">
                    <button id="select-lol-btn" class="game-select-btn lol-game">
                        <span class="game-icon">🎮</span>
                        <span class="game-name">League of Legends</span>
                        <span id="lol-desc" class="game-desc" data-i18n="gameSelect.lolDesc">チャンピオン・アイテム・スキル</span>
                    </button>
                    
                    <button id="select-valorant-btn" class="game-select-btn valorant-game">
                        <span class="game-icon">🔫</span>
                        <span class="game-name">VALORANT</span>
                        <span id="valorant-desc" class="game-desc" data-i18n="gameSelect.valorantDesc">エージェント・武器・マップ</span>
                    </button>
                    
                    <!-- TFTはワードウルフモードでのみ表示 -->
                    <button id="select-tft-btn" class="game-select-btn tft-game" style="display: none;">
                        <span class="game-icon">♟️</span>
                        <span class="game-name">Teamfight Tactics</span>
                        <span id="tft-desc" class="game-desc" data-i18n="gameSelect.tftDesc">ユニット・特性・アイテム</span>
                    </button>
                        <span class="game-desc" data-i18n="gameSelect.tftDesc">ユニット・特性・アイテム</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- ゲームモード選択画面 -->
        <div id="mode-select-screen" class="screen">
            <div class="card">
                <div class="game-title-header">
                    <button id="back-to-game-select-btn" class="btn-back">← <span data-i18n="home.backToSelect">ゲーム選択に戻る</span></button>
                    <h2 id="current-game-title" data-i18n="home.title">ゲームモード選択</h2>
                </div>
                
                <!-- ゲームモード選択 -->
                <div class="game-mode-selection">
                    <h3 data-i18n="home.selectMode">どのモードで遊びますか？</h3>
                    <div class="mode-buttons">
                        <button id="mode-wordwolf-btn" class="mode-btn">
                            <span class="mode-icon">🐺</span>
                            <span class="mode-name" data-i18n="home.modeWordwolf">ワードウルフ</span>
                            <span class="mode-desc" data-i18n="home.modeWordwolfDesc">少数派のウルフを見つけ出せ！</span>
                        </button>
                        <button id="mode-demacia-btn" class="mode-btn">
                            <span class="mode-icon">💖</span>
                            <span class="mode-name" data-i18n="home.modeDemacia">デマーシアに心を込めて</span>
                            <span class="mode-desc" data-i18n="home.modeDemaciaDesc">LOLのセリフを演技して当てろ！</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ホーム画面 -->
        <div id="home-screen" class="screen">
            <div class="card">
                <div class="game-title-header">
                    <button id="back-to-game-type-btn" class="btn-back">← <span data-i18n="home.backToGameType">ゲーム選択に戻る</span></button>
                    <h2 id="home-game-mode-title" data-i18n="home.title">ワードウルフゲーム</h2>
                </div>
                
                <button id="create-room-btn" class="btn-primary btn-full-width" data-i18n="home.create">ルームを作成</button>
                <button id="join-room-btn" class="btn-secondary btn-full-width" data-i18n="home.join">ルームに参加</button>
                <button id="rules-btn" class="btn-secondary btn-full-width" data-i18n="home.rules">ルール説明</button>
                
                <!-- デマーシア専用：ソロプレイモード -->
                <button id="solo-play-btn" class="btn-secondary btn-full-width" style="display:none; background: linear-gradient(135deg, #c89b3c 0%, #a67c2b 100%); color: #0a1428; font-weight: 600;">
                    <span data-i18n="home.soloPlay">🎭 ソロプレイ（配信者向け）</span>
                </button>
            </div>
        </div>

        <!-- ルーム作成画面 -->
        <div id="create-screen" class="screen">
            <div class="card">
                <h2 data-i18n="create.title">ルーム作成</h2>
                
                <div class="form-group">
                    <label for="create-player-name" data-i18n="create.playerName">プレイヤー名</label>
                    <input type="text" id="create-player-name" data-i18n="create.playerNamePlaceholder" placeholder="名前を入力" maxlength="20">
                </div>
                
                <div id="player-count-section" class="form-group">
                    <label for="player-count" data-i18n="create.playerCount">プレイ人数</label>
                    <select id="player-count">
                        <option value="3">3</option>
                        <option value="4" selected>4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="timer" data-i18n="create.timer">討論時間（分）</label>
                    <select id="timer">
                        <option value="3">3</option>
                        <option value="5" selected>5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                
                <!-- ワードウルフ用：お題カテゴリー -->
                <div id="wordwolf-categories" class="form-group">
                    <label data-i18n="create.categories">お題カテゴリー</label>
                    <div id="category-checkboxes" class="checkbox-group">
                        <!-- LOL用カテゴリー（デフォルト） -->
                        <div class="checkbox-item lol-category">
                            <input type="checkbox" name="category" value="champions" id="cat-champions" checked>
                            <label for="cat-champions" data-i18n="create.category.champions">チャンピオン</label>
                        </div>
                        <div class="checkbox-item lol-category">
                            <input type="checkbox" name="category" value="items" id="cat-items" checked>
                            <label for="cat-items" data-i18n="create.category.items">アイテム</label>
                        </div>
                        <div class="checkbox-item lol-category">
                            <input type="checkbox" name="category" value="skills" id="cat-skills" checked>
                            <label for="cat-skills" data-i18n="create.category.skills">スキル・能力</label>
                        </div>
                        <div class="checkbox-item lol-category">
                            <input type="checkbox" name="category" value="map" id="cat-map" checked>
                            <label for="cat-map" data-i18n="create.category.map">マップ・レーン</label>
                        </div>
                        <div class="checkbox-item lol-category">
                            <input type="checkbox" name="category" value="spells" id="cat-spells" checked>
                            <label for="cat-spells" data-i18n="create.category.spells">スペル</label>
                        </div>
                        
                        <!-- VALORANT用カテゴリー -->
                        <div class="checkbox-item valorant-category" style="display:none;">
                            <input type="checkbox" name="category" value="agents" id="cat-agents" checked>
                            <label for="cat-agents" data-i18n="create.category.agents">エージェント</label>
                        </div>
                        <div class="checkbox-item valorant-category" style="display:none;">
                            <input type="checkbox" name="category" value="weapons" id="cat-weapons" checked>
                            <label for="cat-weapons" data-i18n="create.category.weapons">武器</label>
                        </div>
                        <div class="checkbox-item valorant-category" style="display:none;">
                            <input type="checkbox" name="category" value="abilities" id="cat-abilities" checked>
                            <label for="cat-abilities" data-i18n="create.category.abilities">アビリティ</label>
                        </div>
                        <div class="checkbox-item valorant-category" style="display:none;">
                            <input type="checkbox" name="category" value="maps" id="cat-maps" checked>
                            <label for="cat-maps" data-i18n="create.category.maps">マップ</label>
                        </div>
                        <div class="checkbox-item valorant-category" style="display:none;">
                            <input type="checkbox" name="category" value="terms" id="cat-terms" checked>
                            <label for="cat-terms" data-i18n="create.category.terms">ゲーム用語</label>
                        </div>
                        
                        <!-- TFT用カテゴリー -->
                        <div class="checkbox-item tft-category" style="display:none;">
                            <input type="checkbox" name="category" value="units" id="cat-units" checked>
                            <label for="cat-units" data-i18n="create.category.units">ユニット</label>
                        </div>
                        <div class="checkbox-item tft-category" style="display:none;">
                            <input type="checkbox" name="category" value="traits" id="cat-traits" checked>
                            <label for="cat-traits" data-i18n="create.category.traits">特性</label>
                        </div>
                        <div class="checkbox-item tft-category" style="display:none;">
                            <input type="checkbox" name="category" value="items" id="cat-tft-items" checked>
                            <label for="cat-tft-items" data-i18n="create.category.tftItems">アイテム</label>
                        </div>
                        <div class="checkbox-item tft-category" style="display:none;">
                            <input type="checkbox" name="category" value="tft_terms" id="cat-tft-terms" checked>
                            <label for="cat-tft-terms" data-i18n="create.category.tftTerms">ゲーム用語</label>
                        </div>
                    </div>
                </div>
                
                <!-- デマーシア用：シチュエーションジャンル -->
                <div id="demacia-genres" class="form-group" style="display:none;">
                    <label data-i18n="create.situationGenres">シチュエーションジャンル</label>
                    <div id="genre-checkboxes" class="checkbox-group">
                        <!-- LOL用ジャンル -->
                        <div class="checkbox-item lol-genre">
                            <input type="checkbox" name="genre" value="battle" id="genre-battle" checked>
                            <label for="genre-battle" data-i18n="create.genre.battle">戦闘シーン</label>
                        </div>
                        <div class="checkbox-item lol-genre">
                            <input type="checkbox" name="genre" value="victory" id="genre-victory" checked>
                            <label for="genre-victory" data-i18n="create.genre.victory">勝利・エース</label>
                        </div>
                        <div class="checkbox-item lol-genre">
                            <input type="checkbox" name="genre" value="emotion" id="genre-emotion" checked>
                            <label for="genre-emotion" data-i18n="create.genre.emotion">感情表現</label>
                        </div>
                        <div class="checkbox-item lol-genre">
                            <input type="checkbox" name="genre" value="strategy" id="genre-strategy" checked>
                            <label for="genre-strategy" data-i18n="create.genre.strategy">戦略・判断</label>
                        </div>
                        <div class="checkbox-item lol-genre">
                            <input type="checkbox" name="genre" value="teamwork" id="genre-teamwork" checked>
                            <label for="genre-teamwork" data-i18n="create.genre.teamwork">チームワーク</label>
                        </div>
                        <div class="checkbox-item lol-genre">
                            <input type="checkbox" name="genre" value="casual" id="genre-casual" checked>
                            <label for="genre-casual" data-i18n="create.genre.casual">カジュアル</label>
                        </div>
                        
                        <!-- VALORANT用ジャンル -->
                        <div class="checkbox-item valorant-genre" style="display:none;">
                            <input type="checkbox" name="genre" value="clutch" id="genre-clutch" checked>
                            <label for="genre-clutch" data-i18n="create.genre.clutch">クラッチ状況</label>
                        </div>
                        <div class="checkbox-item valorant-genre" style="display:none;">
                            <input type="checkbox" name="genre" value="ace" id="genre-ace" checked>
                            <label for="genre-ace" data-i18n="create.genre.ace">エース獲得</label>
                        </div>
                        <div class="checkbox-item valorant-genre" style="display:none;">
                            <input type="checkbox" name="genre" value="ability" id="genre-ability" checked>
                            <label for="genre-ability" data-i18n="create.genre.ability">アビリティ使用</label>
                        </div>
                        <div class="checkbox-item valorant-genre" style="display:none;">
                            <input type="checkbox" name="genre" value="teamwork-val" id="genre-teamwork-val" checked>
                            <label for="genre-teamwork-val" data-i18n="create.genre.teamworkVal">チーム連携</label>
                        </div>
                        <div class="checkbox-item valorant-genre" style="display:none;">
                            <input type="checkbox" name="genre" value="defuse" id="genre-defuse" checked>
                            <label for="genre-defuse" data-i18n="create.genre.defuse">設置・解除</label>
                        </div>
                        <div class="checkbox-item valorant-genre" style="display:none;">
                            <input type="checkbox" name="genre" value="humor" id="genre-humor" checked>
                            <label for="genre-humor" data-i18n="create.genre.humor">ユーモア</label>
                        </div>
                    </div>
                </div>
                
                <div class="button-group">
                    <button id="start-create-btn" class="btn-primary" data-i18n="create.createButton">作成</button>
                    <button id="back-from-create-btn" class="btn-secondary" data-i18n="create.back">戻る</button>
                </div>
            </div>
        </div>

        <!-- ルーム参加画面 -->
        <div id="join-screen" class="screen">
            <div class="card">
                <h2 data-i18n="join.title">ルームに参加</h2>
                
                <!-- 選択中のゲーム情報 -->
                <div class="form-group" style="background: rgba(11, 198, 227, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <div style="text-align: center;">
                        <span style="font-size: 0.9rem; color: var(--text-color); opacity: 0.8;">参加するゲーム</span>
                        <div id="join-game-info" style="font-size: 1.2rem; font-weight: 600; color: var(--primary-color); margin-top: 0.5rem;">
                            <!-- JavaScriptで動的に設定 -->
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="join-room-id" data-i18n="join.roomId">ルームID</label>
                    <input type="text" id="join-room-id" data-i18n="join.roomIdPlaceholder" placeholder="6桁のルームID" maxlength="6">
                </div>
                
                <div class="form-group">
                    <label for="join-player-name" data-i18n="join.playerName">プレイヤー名</label>
                    <input type="text" id="join-player-name" data-i18n="join.playerNamePlaceholder" placeholder="名前を入力" maxlength="20">
                </div>
                
                <div class="button-group">
                    <button id="start-join-btn" class="btn-primary" data-i18n="join.joinButton">参加</button>
                    <button id="back-from-join-btn" class="btn-secondary" data-i18n="join.back">戻る</button>
                </div>
            </div>
        </div>

        <!-- 待機室画面 -->
        <div id="waiting-screen" class="screen">
            <div class="card">
                <h2 data-i18n="waiting.title">待機室</h2>
                
                <!-- ゲーム情報 -->
                <div class="form-group" style="background: rgba(11, 198, 227, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <div style="text-align: center;">
                        <div id="waiting-game-info" style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color);">
                            <!-- JavaScriptで動的に設定 -->
                        </div>
                    </div>
                </div>
                
                <!-- 人数表示（ワードウルフモードのみ） -->
                <div id="waiting-player-count-display" class="form-group" style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">
                        👥 <span id="current-player-count">0</span> / <span id="max-player-count">0</span>
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-color); margin-top: 0.5rem;" data-i18n="waiting.remainingSlots">残り人数</div>
                </div>
                
                <div class="room-info">
                    <div class="room-id"><span data-i18n="waiting.roomId">ルームID:</span> <span id="room-id-display">------</span></div>
                    <div class="room-url" id="room-url-display"></div>
                    <button id="copy-room-url-btn" class="btn-secondary btn-full-width" data-i18n="waiting.copyUrl">URLをコピー</button>
                </div>
                
                <div class="form-group">
                    <label data-i18n="waiting.players">参加プレイヤー</label>
                    <div id="players-list" class="players-list"></div>
                </div>
                
                <div class="button-group">
                    <button id="start-game-btn" class="btn-primary" style="display: none;" data-i18n="waiting.startGame">ゲーム開始</button>
                    <button id="leave-room-btn" class="btn-danger" data-i18n="waiting.leave">退出</button>
                </div>
            </div>
        </div>

        <!-- ゲーム画面 -->
        <div id="game-screen" class="screen">
            <div class="card">
                <h2 data-i18n="game.title">討論タイム</h2>
                
                <div class="timer">
                    <div class="timer-display" id="timer-display">00:00</div>
                </div>
                
                <div class="topic-display">
                    <img id="topic-image" class="topic-image" src="" alt="" style="display: none;">
                    <div class="topic-text" id="your-topic">-</div>
                </div>
                
                <div class="chat-container">
                    <div id="chat-messages" class="chat-messages"></div>
                    <div class="chat-input-group">
                        <input type="text" id="chat-input" data-i18n="game.chatPlaceholder" placeholder="メッセージを入力..." maxlength="100">
                        <button id="send-message-btn" class="btn-primary" data-i18n="game.send">送信</button>
                    </div>
                </div>
                
                <button id="end-discussion-btn" class="btn-primary btn-full-width" data-i18n="game.endDiscussion">投票へ進む</button>
            </div>
        </div>

        <!-- 投票画面 -->
        <div id="voting-screen" class="screen">
            <div class="card">
                <h2 data-i18n="voting.title">投票タイム</h2>
                
                <p style="text-align: center; margin-bottom: 1.5rem; color: var(--lol-text);" data-i18n="voting.question">
                    誰がウルフだと思いますか？
                </p>
                
                <!-- 投票状況表示 -->
                <div id="wordwolf-vote-status" style="text-align: center; margin-bottom: 1rem; padding: 0.5rem; background: rgba(255,215,0,0.1); border-radius: 8px; font-size: 0.9rem;">
                    <span id="wordwolf-vote-count">0</span> / <span id="wordwolf-total-players">0</span> 人が投票完了
                </div>
                
                <div id="vote-options" class="vote-options"></div>
                
                <button id="confirm-vote-btn" class="btn-primary btn-full-width" data-i18n="voting.confirm">投票確定</button>
            </div>
        </div>

        <!-- 結果画面 -->
        <div id="result-screen" class="screen">
            <div class="card">
                <h2 id="result-title" class="result-title" data-i18n="result.title">結果発表</h2>
                
                <div class="result-info">
                    <p id="wolf-reveal" data-i18n="result.wolfWas">ウルフは ？ でした</p>
                    <p id="voted-out" data-i18n="result.votedOut">追放されたのは ？ です</p>
                    
                    <div style="margin-top: 1.5rem;">
                        <label style="color: var(--primary-color); margin-bottom: 0.5rem; display: block;" data-i18n="result.topics">お題</label>
                        <p id="wolf-topic" style="color: var(--wolf-color); margin: 0.5rem 0;"></p>
                        <p id="citizen-topic" style="color: var(--citizen-color); margin: 0.5rem 0;"></p>
                    </div>
                    
                    <div style="margin-top: 1.5rem;">
                        <label style="color: var(--primary-color); margin-bottom: 0.5rem; display: block;" data-i18n="result.voteResults">投票結果</label>
                        <div id="vote-results"></div>
                    </div>
                </div>
                
                <div class="button-group">
                    <button id="play-again-btn" class="btn-primary" data-i18n="result.playAgain">もう一度</button>
                    <button id="back-to-home-btn" class="btn-secondary" data-i18n="result.backToHome">ホームへ</button>
                </div>
            </div>
        </div>

        <!-- デマーシアゲーム: 演技者選択画面 -->
        <div id="demacia-performer-selection-screen" class="screen">
            <div class="card">
                <h2 data-i18n="demacia.selectPerformerTitle">演技者を選択</h2>
                
                <div class="demacia-phrase-display">
                    <div class="phrase-label" data-i18n="demacia.phrase">セリフ:</div>
                    <div id="demacia-phrase-preview" class="demacia-phrase">デマーシアァァァァ！</div>
                    <div class="character-label" data-i18n="demacia.character">キャラクター:</div>
                    <div id="demacia-character-preview" class="demacia-character">ガレン</div>
                </div>
                
                <div class="performer-selection-mode">
                    <button id="random-performer-btn" class="btn-primary btn-full-width" data-i18n="demacia.randomPerformer">ランダムに選ぶ</button>
                    <div class="or-divider" data-i18n="demacia.or">または</div>
                    <div class="manual-performer-list" id="manual-performer-list"></div>
                </div>
            </div>
        </div>

        <!-- デマーシアゲーム: 演技画面 -->
        <div id="demacia-perform-screen" class="screen">
            <div class="card">
                <h2 data-i18n="demacia.performTitle">演技タイム</h2>
                
                <div class="timer-display">
                    <div id="demacia-timer" class="timer">01:30</div>
                </div>
                
                <div class="demacia-phrase-display">
                    <div class="phrase-label" data-i18n="demacia.phrase">セリフ:</div>
                    <div id="demacia-phrase" class="demacia-phrase">デマーシアァァァァ！</div>
                    <div class="character-label" data-i18n="demacia.character">キャラクター:</div>
                    <div id="demacia-character" class="demacia-character">ガレン</div>
                </div>
                
                <div class="situation-display">
                    <div class="situation-label" data-i18n="demacia.yourSituation">あなたのシチュエーション:</div>
                    <div id="demacia-situation" class="demacia-situation">ペンタキルを決めた時</div>
                    <div class="difficulty-badge" id="demacia-difficulty">難易度: Medium</div>
                </div>
                
                <div class="performer-info">
                    <div class="current-performer-label" data-i18n="demacia.currentPerformer">現在の演技者:</div>
                    <div id="current-performer-name" class="current-performer">プレイヤー1</div>
                </div>
                
                <div class="performer-instruction">
                    <p data-i18n="demacia.performInstruction">上記のシチュエーションで、このセリフを演技してください！</p>
                    <p data-i18n="demacia.performWaiting">他のプレイヤーは演技を見て、どのシチュエーションか推理してください。</p>
                </div>
                
                <button id="demacia-start-voting-btn" class="btn-primary btn-full-width" data-i18n="demacia.startVoting">投票を開始</button>
            </div>
        </div>

        <!-- デマーシアゲーム: 投票画面 -->
        <div id="demacia-voting-screen" class="screen">
            <div class="card">
                <h2 data-i18n="demacia.votingTitle">投票タイム</h2>
                
                <div class="demacia-phrase-display">
                    <div class="phrase-label" data-i18n="demacia.phrase">セリフ:</div>
                    <div id="demacia-voting-phrase" class="demacia-phrase">デマーシアァァァァ！</div>
                </div>
                
                <p class="voting-instruction" data-i18n="demacia.votingInstruction">
                    演技者はどのシチュエーションを演じていましたか？
                </p>
                
                <!-- 投票状況表示 -->
                <div id="demacia-vote-status" style="text-align: center; margin-bottom: 1rem; padding: 0.5rem; background: rgba(200,155,60,0.1); border-radius: 8px; font-size: 0.9rem;">
                    <span id="demacia-vote-count">0</span> / <span id="demacia-total-voters">0</span> 人が投票完了
                </div>
                
                <div id="demacia-situation-options" class="demacia-situation-options"></div>
                
                <button id="demacia-submit-vote-btn" class="btn-primary btn-full-width" data-i18n="demacia.submitVote">投票する</button>
            </div>
        </div>

        <!-- デマーシアゲーム: 結果画面 -->
        <div id="demacia-result-screen" class="screen">
            <div class="card">
                <h2 data-i18n="demacia.resultTitle">ラウンド結果</h2>
                
                <div id="demacia-round-results" class="demacia-round-results"></div>
                
                <div class="score-board">
                    <h3 data-i18n="demacia.scores">現在のスコア</h3>
                    <div id="demacia-score-list"></div>
                </div>
                
                <button id="demacia-next-round-btn" class="btn-primary btn-full-width" data-i18n="demacia.nextRound">次のラウンドへ</button>
            </div>
        </div>
        
        <!-- デマーシアゲーム: ラウンド結果画面 -->
        <div id="demacia-round-result-screen" class="screen">
            <div class="card">
                <h2 data-i18n="demacia.roundResult">ラウンド結果</h2>
                
                <div class="demacia-phrase-display">
                    <div class="phrase-label" data-i18n="demacia.phrase">セリフ:</div>
                    <div id="demacia-round-result-phrase" class="demacia-phrase"></div>
                </div>
                
                <div class="result-info">
                    <p><strong data-i18n="demacia.correctSituation">正解:</strong></p>
                    <p id="demacia-correct-situation" class="correct-situation"></p>
                    
                    <p id="demacia-correct-count" class="correct-count"></p>
                    
                    <!-- 投票者の結果一覧 -->
                    <div id="demacia-voter-results" class="voter-results-container" style="margin-top: 1.5rem;"></div>
                </div>
                
                <div class="button-group">
                    <button id="demacia-next-round-btn" class="btn-primary btn-full-width" data-i18n="demacia.nextRound">次のラウンドへ</button>
                    <button id="demacia-show-results-btn" class="btn-secondary btn-full-width" data-i18n="demacia.showResults">最終結果を見る</button>
                </div>
            </div>
        </div>
        
        <!-- デマーシアゲーム: 最終結果画面 -->
        <div id="demacia-final-result-screen" class="screen">
            <div class="card">
                <h2 data-i18n="demacia.finalResults">最終結果</h2>
                
                <div id="demacia-final-rankings" class="rankings-container"></div>
                
                <div class="button-group">
                    <button id="demacia-play-again-btn" class="btn-primary" data-i18n="result.playAgain">もう一度</button>
                    <button id="demacia-back-to-home-btn" class="btn-secondary" data-i18n="result.backToHome">ホームへ</button>
                </div>
            </div>
        </div>

        <!-- デマーシアゲーム: ソロプレイ - セリフ表示画面 -->
        <div id="demacia-solo-phrase-screen" class="screen">
            <div class="card">
                <h2>🎭 セリフが決定しました</h2>
                
                <div class="demacia-phrase-display" style="margin: 2rem 0;">
                    <div class="phrase-label">セリフ:</div>
                    <div id="demacia-solo-phrase" class="demacia-phrase" style="font-size: 1.8rem; font-weight: bold;"></div>
                    <div id="demacia-solo-character" class="demacia-character" style="font-size: 1.2rem; color: rgba(255,255,255,0.7); margin-top: 0.5rem;"></div>
                </div>
                
                <div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(200,155,60,0.1); border-radius: 12px;">
                    <p style="font-size: 1.1rem; margin-bottom: 1rem;">
                        このセリフで演技を行います。<br>
                        次の画面でシチュエーションが表示されます。
                    </p>
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                        ⚠️ 視聴者に見えないようご注意ください
                    </p>
                </div>
                
                <button id="demacia-solo-show-situation-btn" class="btn-primary btn-full-width">
                    シチュエーションを確認する
                </button>
            </div>
        </div>

        <!-- デマーシアゲーム: ソロプレイ - シチュエーション確認画面 -->
        <div id="demacia-solo-situation-screen" class="screen">
            <div class="card">
                <h2 style="color: #c89b3c;">🎯 あなたのシチュエーション</h2>
                
                <div style="margin: 2rem 0; padding: 2rem; background: linear-gradient(135deg, rgba(200,155,60,0.2) 0%, rgba(200,155,60,0.05) 100%); border-radius: 12px; border: 2px solid rgba(200,155,60,0.3);">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <div class="phrase-label" style="font-size: 0.9rem;">セリフ:</div>
                        <div id="demacia-solo-situation-phrase" style="font-size: 1.5rem; font-weight: bold; margin: 0.5rem 0;"></div>
                    </div>
                    
                    <div style="text-align: center; padding: 2rem; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 0.5rem;">シチュエーション:</div>
                        <div id="demacia-solo-situation-text" style="font-size: 2rem; font-weight: bold; color: #c89b3c;"></div>
                        <div id="demacia-solo-situation-difficulty" style="margin-top: 1rem; font-size: 0.9rem; color: rgba(255,255,255,0.7);"></div>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 1.5rem 0; padding: 1rem; background: rgba(255,215,0,0.1); border-radius: 8px;">
                    <p style="color: rgba(255,255,255,0.8);">
                        このシチュエーションで演技してください。<br>
                        準備ができたら「演技開始」を押してください。
                    </p>
                </div>
                
                <button id="demacia-solo-start-perform-btn" class="btn-primary btn-full-width">
                    演技開始
                </button>
            </div>
        </div>

        <!-- デマーシアゲーム: ソロプレイ - 演技中画面 -->
        <div id="demacia-solo-perform-screen" class="screen">
            <div class="card">
                <h2>🎭 演技中...</h2>
                
                <div class="demacia-phrase-display" style="margin: 2rem 0;">
                    <div class="phrase-label">セリフ:</div>
                    <div id="demacia-solo-perform-phrase" class="demacia-phrase" style="font-size: 1.8rem; font-weight: bold;"></div>
                </div>
                
                <div style="text-align: center; margin: 3rem 0; padding: 2rem; background: linear-gradient(135deg, rgba(200,155,60,0.1) 0%, rgba(200,155,60,0.05) 100%); border-radius: 12px;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎬</div>
                    <p style="font-size: 1.2rem; margin-bottom: 1rem;">
                        視聴者にセリフを読んで演技してください
                    </p>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem;">
                        シチュエーションは伝えないでください
                    </p>
                </div>
                
                <button id="demacia-solo-end-perform-btn" class="btn-primary btn-full-width">
                    演技終了
                </button>
            </div>
        </div>

        <!-- デマーシアゲーム: ソロプレイ - 正解選択画面 -->
        <div id="demacia-solo-answer-screen" class="screen">
            <div class="card">
                <h2>📝 正解のシチュエーションを選択</h2>
                
                <div class="demacia-phrase-display" style="margin: 2rem 0;">
                    <div class="phrase-label">セリフ:</div>
                    <div id="demacia-solo-answer-phrase" class="demacia-phrase"></div>
                </div>
                
                <div style="text-align: center; margin: 1.5rem 0; padding: 1rem; background: rgba(200,155,60,0.1); border-radius: 8px;">
                    <p style="color: rgba(255,255,255,0.8);">
                        視聴者のコメントを確認してから、<br>
                        正解のシチュエーションを選んでください。
                    </p>
                </div>
                
                <div id="demacia-solo-situation-options" class="demacia-situation-options" style="margin: 2rem 0;"></div>
                
                <button id="demacia-solo-reveal-answer-btn" class="btn-primary btn-full-width" disabled>
                    結果発表
                </button>
            </div>
        </div>

        <!-- デマーシアゲーム: ソロプレイ - 結果発表画面 -->
        <div id="demacia-solo-result-screen" class="screen">
            <div class="card">
                <h2>🎉 正解発表！</h2>
                
                <div class="demacia-phrase-display" style="margin: 2rem 0;">
                    <div class="phrase-label">セリフ:</div>
                    <div id="demacia-solo-result-phrase" class="demacia-phrase"></div>
                </div>
                
                <div class="result-info" style="margin: 2rem 0;">
                    <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(76,175,80,0.05) 100%); border-radius: 12px; border: 2px solid rgba(76,175,80,0.3);">
                        <p style="font-size: 1rem; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem;">正解:</p>
                        <p id="demacia-solo-correct-situation" style="font-size: 2rem; font-weight: bold; color: #4caf50; margin: 1rem 0;"></p>
                        <p id="demacia-solo-difficulty" style="font-size: 0.9rem; color: rgba(255,255,255,0.6);"></p>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: rgba(200,155,60,0.1); border-radius: 8px;">
                    <p style="font-size: 1.1rem; color: rgba(255,255,255,0.9);">
                        視聴者の皆さん、お疲れさまでした！
                    </p>
                </div>
                
                <div class="button-group">
                    <button id="demacia-solo-next-btn" class="btn-primary btn-full-width">
                        次のセリフで遊ぶ
                    </button>
                    <button id="demacia-solo-home-btn" class="btn-secondary btn-full-width">
                        ホームに戻る
                    </button>
                </div>
            </div>
        </div>
    </main>

    <!-- 広告エリア（フッター上部） -->
    <div class="ad-container">
        <!-- Google AdSense バナー広告 -->
        <!-- ⚠️ 重要: 以下の手順で設定してください -->
        <!-- 1. 「ca-pub-XXXXXXXXXX」をあなたのAdSense IDに置き換え -->
        <!-- 2. 「YYYYYYYYYY」をAdSense管理画面で取得した広告スロットIDに置き換え -->
        <!-- 3. AdSense承認後、コメントアウトを外す -->
        <!--
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXX"
             data-ad-slot="YYYYYYYYYY"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        -->
    </div>

    <!-- ========================================
         ヴォイドに届くは光か闇か - 画面
         ======================================== -->
    
    <!-- ヴォイド - ホーム画面 -->
    <div id="void-home-screen" class="screen">
        <div class="void-card">
            <h2 data-i18n="void.home.title">🌌 ヴォイドに届くは光か闇か</h2>
            <p style="text-align: center; margin-bottom: 2rem; color: var(--void-light);" data-i18n="void.home.description">連想ワードを伝えてテーマを当てよう</p>
            
            <button id="void-create-room-btn" class="void-btn-primary btn-full-width" style="margin-bottom: 1rem;" data-i18n="void.home.createRoom">ルームを作成</button>
            <button id="void-join-room-btn" class="void-btn-secondary btn-full-width" style="margin-bottom: 1rem;" data-i18n="void.home.joinRoom">ルームに参加</button>
            <button id="void-rules-btn" class="void-btn-secondary btn-full-width" style="margin-bottom: 1rem;" data-i18n="void.home.rules">ルール説明</button>
            <button id="void-back-to-game-type-btn" class="void-btn-secondary btn-full-width" data-i18n="void.home.backToGameType">ゲーム選択に戻る</button>
        </div>
    </div>

    <!-- ヴォイド - ルーム作成画面 -->
    <div id="void-create-screen" class="screen">
        <div class="card">
            <h2 data-i18n="void.create.title">ルーム作成</h2>
            
            <div class="form-group">
                <label for="void-create-player-name" data-i18n="void.create.playerName">プレイヤー名</label>
                <input type="text" id="void-create-player-name" data-i18n-placeholder="void.create.playerNamePlaceholder" placeholder="名前を入力" maxlength="20">
            </div>
            
            <div class="form-group">
                <label for="void-max-players" data-i18n="void.create.maxPlayers">参加人数</label>
                <select id="void-max-players">
                    <option value="2">2人</option>
                    <option value="3">3人</option>
                    <option value="4" selected>4人</option>
                    <option value="5">5人</option>
                    <option value="6">6人</option>
                    <option value="7">7人</option>
                    <option value="8">8人</option>
                </select>
            </div>
            
            <div class="form-group">
                <label data-i18n="void.create.themeSelection">テーマ選択</label>
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="radio" name="void-theme-mode" value="random" id="void-theme-random" checked>
                        <label for="void-theme-random" class="void-radio-label" data-i18n="void.create.random">ランダム</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="radio" name="void-theme-mode" value="select" id="void-theme-select">
                        <label for="void-theme-select" class="void-radio-label" data-i18n="void.create.select">選択</label>
                    </div>
                </div>
            </div>
            
            <!-- カテゴリー選択（ランダム時に使用） -->
            <div id="void-categories-section" class="form-group">
                <label data-i18n="void.create.categorySelection">カテゴリー選択</label>
                <div id="void-category-checkboxes" class="checkbox-group">
                    <!-- LOL用カテゴリー（デフォルト） -->
                    <div class="checkbox-item void-lol-category">
                        <input type="checkbox" name="void-category" value="champions" id="void-cat-champions" checked>
                        <label for="void-cat-champions" data-i18n="void.category.champions">チャンピオン</label>
                    </div>
                    <div class="checkbox-item void-lol-category">
                        <input type="checkbox" name="void-category" value="items" id="void-cat-items" checked>
                        <label for="void-cat-items" data-i18n="void.category.items">アイテム</label>
                    </div>
                    <div class="checkbox-item void-lol-category">
                        <input type="checkbox" name="void-category" value="places" id="void-cat-places" checked>
                        <label for="void-cat-places" data-i18n="void.category.places">地域</label>
                    </div>
                    <div class="checkbox-item void-lol-category">
                        <input type="checkbox" name="void-category" value="concepts" id="void-cat-concepts" checked>
                        <label for="void-cat-concepts" data-i18n="void.category.concepts">ゲーム用語</label>
                    </div>
                    
                    <!-- VALORANT用カテゴリー -->
                    <div class="checkbox-item void-valorant-category" style="display:none;">
                        <input type="checkbox" name="void-category" value="agent" id="void-cat-agent" checked>
                        <label for="void-cat-agent" data-i18n="void.category.agents">エージェント</label>
                    </div>
                    <div class="checkbox-item void-valorant-category" style="display:none;">
                        <input type="checkbox" name="void-category" value="weapon" id="void-cat-weapon" checked>
                        <label for="void-cat-weapon" data-i18n="void.category.weapons">武器</label>
                    </div>
                    <div class="checkbox-item void-valorant-category" style="display:none;">
                        <input type="checkbox" name="void-category" value="map" id="void-cat-map" checked>
                        <label for="void-cat-map" data-i18n="void.category.maps">マップ</label>
                    </div>
                    <div class="checkbox-item void-valorant-category" style="display:none;">
                        <input type="checkbox" name="void-category" value="concept" id="void-cat-concept" checked>
                        <label for="void-cat-concept" data-i18n="void.category.concepts">ゲーム用語</label>
                    </div>
                </div>
            </div>
            
            <div class="button-group">
                <button id="void-create-btn" class="btn-primary">作成</button>
                <button id="void-cancel-create-btn" class="btn-secondary">戻る</button>
            </div>
        </div>
    </div>

    <!-- ヴォイド - ルーム参加画面 -->
    <div id="void-join-screen" class="screen">
        <div class="card">
            <h2>ルームに参加</h2>
            
            <div class="form-group">
                <label for="void-join-room-id">ルームID</label>
                <input type="text" id="void-join-room-id" placeholder="6桁の数字" maxlength="6">
            </div>
            
            <div class="form-group">
                <label for="void-join-player-name">プレイヤー名</label>
                <input type="text" id="void-join-player-name" placeholder="名前を入力" maxlength="20">
            </div>
            
            <div class="button-group">
                <button id="void-join-btn" class="btn-primary">参加</button>
                <button id="void-cancel-join-btn" class="btn-secondary">戻る</button>
            </div>
        </div>
    </div>

    <!-- ヴォイド - 待機画面 -->
    <div id="void-waiting-screen" class="screen">
        <div class="card">
            <h2>待機室</h2>
            
            <!-- ゲーム情報 -->
            <div class="form-group" style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <div style="text-align: center;">
                    <div id="void-waiting-game-info" style="font-size: 1.1rem; font-weight: 600; color: var(--primary-color);">
                        ヴォイドに届くは光か闇か
                    </div>
                </div>
            </div>
            
            <!-- 人数表示 -->
            <div class="form-group" style="background: rgba(139, 92, 246, 0.15); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center; border: 2px solid rgba(139, 92, 246, 0.3);">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--void-glow);">
                    👥 <span id="void-current-players">0</span> / <span id="void-max-players-display">0</span>
                </div>
                <div style="font-size: 0.9rem; color: var(--void-light); margin-top: 0.5rem;" data-i18n="waiting.remainingSlots">残り人数</div>
            </div>
            
            <div class="room-info">
                <div class="room-id">ルームID: <span id="void-room-id-display">------</span></div>
                <div class="room-url" id="void-room-url-display"></div>
                <button id="void-copy-room-url-btn" class="btn-secondary btn-full-width">URLをコピー</button>
            </div>
            
            <div class="form-group">
                <label>参加プレイヤー</label>
                <div id="void-player-list" class="players-list"></div>
            </div>
            
            <div class="button-group">
                <button id="void-start-game-btn" class="btn-primary" style="display: none;">ゲーム開始</button>
                <button id="void-leave-room-btn" class="btn-danger">退出</button>
            </div>
        </div>
    </div>

    <!-- ヴォイド - 順番選択画面 -->
    <div id="void-order-select-screen" class="screen">
        <div class="card">
            <h2>回答順番を決定してください</h2>
            
            <!-- テーマジャンル表示 -->
            <div class="form-group" style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: center;">
                <div style="font-size: 0.9rem; color: #a78bfa; margin-bottom: 0.5rem;">テーマジャンル</div>
                <div id="void-theme-category-display" style="font-size: 1.3rem; font-weight: 600; color: var(--void-glow);">
                    ---
                </div>
            </div>
            
            <p style="text-align: center; margin-bottom: 1.5rem; color: #94a3b8;">
                <span style="color: var(--void-glow); font-weight: 600;">👑 ホストが順番を決めます</span><br>
                プレイヤー名をクリックした順番が回答順になります<br>
                <strong style="color: var(--void-glow);">1番目：テーマを見て3つのワードを入力</strong><br>
                <strong style="color: var(--void-glow);">最後：ワードを見てテーマを回答</strong>
            </p>
            
            <!-- プレイヤーリスト（クリックして順番決定） -->
            <div class="form-group">
                <label id="void-order-instruction">プレイヤーをクリックして順番を決定</label>
                <div id="void-order-player-list" class="players-list" style="cursor: pointer;"></div>
            </div>
            
            <!-- 決定した順番を表示 -->
            <div class="form-group">
                <label>決定した順番</label>
                <div id="void-order-confirmed-list" class="players-list"></div>
            </div>
            
            <div class="button-group">
                <button id="void-confirm-order-btn" class="btn-primary" style="display: none;">この順番で開始</button>
            </div>
            
            <p id="void-order-waiting-message" style="text-align: center; margin-top: 1rem; font-size: 0.9rem; color: #64748b; display: none;">
                ホストが順番を決定しています...
            </p>
        </div>
    </div>

    <!-- ヴォイド - プレイ画面（最初のプレイヤー） -->
    <div id="void-play-first-screen" class="screen">
        <div class="void-card">
            <div class="void-turn-indicator">あなたの番です (1/<span id="void-total-players-first">0</span>)</div>
            
            <!-- テーマジャンル表示 -->
            <div style="background: rgba(139, 92, 246, 0.15); padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
                <div style="font-size: 0.85rem; color: #a78bfa; margin-bottom: 0.3rem;">ジャンル</div>
                <div id="void-first-theme-category" style="font-size: 1rem; font-weight: 600; color: var(--void-glow);">---</div>
            </div>
            
            <div class="void-theme-display">
                <div class="void-theme-label">テーマ</div>
                <div class="void-theme-name" id="void-theme-name-display">-----</div>
            </div>
            
            <h3 style="color: var(--void-light); margin: 2rem 0 1rem;">連想する言葉を3つ入力:</h3>
            
            <div class="void-word-input-container">
                <div class="void-word-input-group">
                    <div class="void-word-number">1</div>
                    <input type="text" class="void-word-input" id="void-first-word-1" placeholder="1つ目の言葉" maxlength="30">
                </div>
                <div class="void-word-input-group">
                    <div class="void-word-number">2</div>
                    <input type="text" class="void-word-input" id="void-first-word-2" placeholder="2つ目の言葉" maxlength="30">
                </div>
                <div class="void-word-input-group">
                    <div class="void-word-number">3</div>
                    <input type="text" class="void-word-input" id="void-first-word-3" placeholder="3つ目の言葉" maxlength="30">
                </div>
            </div>
            
            <button id="void-submit-first-words-btn" class="void-btn-primary btn-full-width" style="margin-top: 2rem;">送信</button>
        </div>
    </div>

    <!-- ヴォイド - プレイ画面（中間プレイヤー） -->
    <div id="void-play-middle-screen" class="screen">
        <div class="void-card">
            <div class="void-turn-indicator">あなたの番です (<span id="void-current-turn-middle">0</span>/<span id="void-total-players-middle">0</span>)</div>
            
            <!-- テーマジャンル表示 -->
            <div style="background: rgba(139, 92, 246, 0.15); padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
                <div style="font-size: 0.85rem; color: #a78bfa; margin-bottom: 0.3rem;">ジャンル</div>
                <div id="void-middle-theme-category" style="font-size: 1rem; font-weight: 600; color: var(--void-glow);">---</div>
            </div>
            
            <div class="void-previous-words">
                <h3>前の人が選んだ言葉:</h3>
                <div class="void-word-list" id="void-previous-word-list">
                    <!-- 前のワードが表示される -->
                </div>
            </div>
            
            <div class="void-modify-section">
                <h3 style="color: var(--void-light); margin: 1.5rem 0 1rem;">伝わりにくい言葉があれば修正してください:</h3>
                <p style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 1rem;">
                    修正したい言葉にチェックを入れて、新しい言葉を入力してください。<br>
                    修正しない言葉はそのまま次の人に伝わります。
                </p>
                <div id="void-modify-options">
                    <!-- 修正オプションが動的に追加される -->
                </div>
            </div>
            
            <button id="void-submit-middle-words-btn" class="void-btn-primary btn-full-width" style="margin-top: 2rem;">送信</button>
        </div>
    </div>

    <!-- ヴォイド - プレイ画面（最後のプレイヤー） -->
    <div id="void-play-last-screen" class="screen">
        <div class="void-card">
            <div class="void-turn-indicator">最終回答 (<span id="void-total-players-last">0</span>/<span id="void-total-players-last-2">0</span>)</div>
            
            <!-- テーマジャンル表示 -->
            <div style="background: rgba(139, 92, 246, 0.15); padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
                <div style="font-size: 0.85rem; color: #a78bfa; margin-bottom: 0.3rem;">ジャンル</div>
                <div id="void-last-theme-category" style="font-size: 1rem; font-weight: 600; color: var(--void-glow);">---</div>
            </div>
            
            <div class="void-previous-words">
                <h3>前の人が選んだ言葉:</h3>
                <div class="void-word-list" id="void-last-previous-word-list">
                    <!-- 前のワードが表示される -->
                </div>
            </div>
            
            <h3 style="color: var(--void-light); margin: 2rem 0 1rem;">元のテーマは何だと思いますか？</h3>
            
            <input type="text" class="void-word-input" id="void-final-answer" placeholder="回答を入力" maxlength="30" style="width: 100%; font-size: 1.2rem;">
            
            <button id="void-submit-answer-btn" class="void-btn-primary btn-full-width" style="margin-top: 2rem;">回答</button>
        </div>
    </div>

    <!-- ヴォイド - 待機中画面（他のプレイヤーのターン） -->
    <div id="void-waiting-turn-screen" class="screen">
        <div class="void-card">
            <div class="void-turn-indicator" data-i18n="void.waiting.otherTurn">他のプレイヤーの番です</div>
            
            <!-- テーマジャンル表示 -->
            <div style="background: rgba(139, 92, 246, 0.15); padding: 0.75rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: center;">
                <div style="font-size: 0.85rem; color: #a78bfa; margin-bottom: 0.3rem;" data-i18n="void.waiting.genre">ジャンル</div>
                <div id="void-waiting-theme-category" style="font-size: 1rem; font-weight: 600; color: var(--void-glow);">---</div>
            </div>
            
            <!-- 現在のターン表示 -->
            <div style="text-align: center; margin: 2rem 0;">
                <div style="font-size: 3rem; font-weight: 700; color: var(--void-glow);">
                    <span id="void-waiting-current-turn">1</span> / <span id="void-waiting-total-turns">4</span>
                </div>
                <div style="font-size: 1.1rem; color: #94a3b8; margin-top: 0.5rem;">
                    <strong id="void-waiting-current-player" style="color: var(--void-light);">プレイヤー名</strong> <span data-i18n="void.waiting.answering">が回答中...</span>
                </div>
            </div>
            
            <div style="text-align: center; color: #64748b; margin-top: 2rem;">
                <p data-i18n="void.waiting.pleaseWait">しばらくお待ちください</p>
                <div class="loading-dots" style="margin-top: 1rem;">
                    <span style="animation: pulse 1.5s ease-in-out infinite;">●</span>
                    <span style="animation: pulse 1.5s ease-in-out 0.2s infinite;">●</span>
                    <span style="animation: pulse 1.5s ease-in-out 0.4s infinite;">●</span>
                </div>
            </div>
        </div>
    </div>

    <!-- ヴォイド - 結果画面 -->
    <div id="void-result-screen" class="screen">
        <div class="void-card">
            <div class="void-result-header">
                <div id="void-result-icon" class="void-result-correct">🎉</div>
                <h2 id="void-result-title" style="color: var(--void-light);">正解！</h2>
            </div>
            
            <div class="void-answer-comparison">
                <div class="void-answer-box">
                    <div class="void-answer-label">元のテーマ</div>
                    <div class="void-answer-text" id="void-correct-answer">-----</div>
                </div>
                <div class="void-answer-box">
                    <div class="void-answer-label">あなたの回答</div>
                    <div class="void-answer-text" id="void-your-answer">-----</div>
                </div>
            </div>
            
            <h3 style="color: var(--void-light); margin: 2rem 0 1rem;">言葉の推移:</h3>
            
            <div class="void-word-history" id="void-word-history">
                <!-- ワードの推移が動的に追加される -->
            </div>
            
            <button id="void-play-again-btn" class="void-btn-primary btn-full-width" style="margin-top: 2rem;">もう一度遊ぶ</button>
            <button id="void-back-to-home-btn" class="void-btn-secondary btn-full-width" style="margin-top: 1rem;">ホームに戻る</button>
        </div>
    </div>

    <!-- 気分診断チャンピオン選択 -->
    <!-- ホーム画面 -->
    <div id="mood-quiz-home-screen" class="screen">
        <div class="card mood-quiz-home">
            <h2 class="mood-quiz-title">🎭 気分診断チャンピオン選択</h2>
            <p class="mood-quiz-subtitle">今の気分にピッタリのチャンピオンを診断！</p>
            
            <div class="mood-quiz-description">
                <p>5つの質問に答えるだけで、今のあなたの気分に最適なチャンピオンをおすすめします。</p>
                <p>アグレッシブ、サポーティブ、タクティカル...あなたは今どんな気分？</p>
            </div>
            
            <div class="mood-quiz-features">
                <div class="mood-quiz-feature">
                    <div class="mood-quiz-feature-icon">⚔️</div>
                    <div class="mood-quiz-feature-text">攻撃的</div>
                </div>
                <div class="mood-quiz-feature">
                    <div class="mood-quiz-feature-icon">💖</div>
                    <div class="mood-quiz-feature-text">支援的</div>
                </div>
                <div class="mood-quiz-feature">
                    <div class="mood-quiz-feature-icon">🧠</div>
                    <div class="mood-quiz-feature-text">戦術的</div>
                </div>
                <div class="mood-quiz-feature">
                    <div class="mood-quiz-feature-icon">⚖️</div>
                    <div class="mood-quiz-feature-text">バランス型</div>
                </div>
            </div>
            
            <button class="btn-primary btn-full-width" onclick="startMoodQuiz()">診断を始める</button>
            <button class="btn-secondary btn-full-width" style="margin-top: 1rem;" onclick="showScreen('mode-select-screen')">モード選択に戻る</button>
        </div>
    </div>
    
    <!-- 質問画面 -->
    <div id="mood-quiz-question-screen" class="screen">
        <div class="card mood-question-container">
            <div class="mood-progress-container">
                <div class="mood-question-number" id="mood-question-number">質問 1 / 5</div>
                <div class="mood-progress-bar-wrapper">
                    <div class="mood-progress-bar" id="mood-progress-bar" style="width: 20%"></div>
                </div>
            </div>
            
            <div class="mood-question-card">
                <h2 class="mood-question-text" id="mood-question-text">質問テキスト</h2>
                <div class="mood-question-options" id="mood-question-options">
                    <!-- 選択肢が動的に生成されます -->
                </div>
                <button id="mood-back-question-btn" class="mood-back-question-btn" onclick="goBackQuestion()" style="display: none;">
                    ⏪ 前の質問に戻る
                </button>
            </div>
        </div>
    </div>
    
    <!-- 結果画面 -->
    <div id="mood-quiz-result-screen" class="screen">
        <div class="card mood-result-container">
            <div class="mood-result-header">
                <h2 class="mood-result-title" id="mood-result-title">診断結果</h2>
                <p class="mood-result-description" id="mood-result-description">結果の説明</p>
            </div>
            
            <div class="mood-score-section">
                <h3>📊 あなたのスコア</h3>
                <div class="mood-score-chart" id="mood-score-chart">
                    <!-- スコアチャートが動的に生成されます -->
                </div>
            </div>
            
            <div class="mood-champion-section">
                <h3>🎮 おすすめチャンピオン</h3>
                <div class="mood-champion-list" id="mood-champion-list">
                    <!-- チャンピオンカードが動的に生成されます -->
                </div>
            </div>
            
            <div class="mood-result-actions">
                <button class="btn-primary" onclick="retryMoodQuiz()">もう一度診断</button>
                <button class="btn-secondary" onclick="backToMoodQuizHome()">ホームに戻る</button>
                <button class="btn-secondary" onclick="exitMoodQuiz()">モード選択へ</button>
            </div>
        </div>
    </div>

    <!-- フッター -->
    <footer>
        <div class="footer-content">
            <div class="footer-disclaimer">
                <p data-i18n="footer.fanMade">🎮 Riot Games（League of Legends / VALORANT）ファンによる非公式ゲームサイト</p>
                <p data-i18n="footer.notAffiliated">本サイトは Riot Games によって承認されたものではありませんが、Riot Games の Legal Jibber Jabber ポリシーに準拠して運営されています</p>
            </div>
            <div class="footer-links">
                <a href="privacy.html" data-i18n="footer.privacy">プライバシーポリシー</a>
                <span class="separator">|</span>
                <a href="terms.html" data-i18n="footer.terms">利用規約</a>
                <span class="separator">|</span>
                <a href="copyright.html" data-i18n="footer.copyright">著作権ポリシー</a>
                <span class="separator">|</span>
                <a href="faq.html">FAQ</a>
                <span class="separator">|</span>
                <a href="contact.html">お問い合わせ</a>
                <span class="separator">|</span>
                <a href="diagnosis.html" style="color: #fbbf24;">🔍 接続診断</a>
            </div>
            <div class="footer-copyright">
                <p>&copy; 2025 LOL Word Wolf Fan Site. All rights reserved.</p>
                <p class="small-text">League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <!-- バージョン管理（最初に読み込む） -->
    <script src="js/version.js?v=13"></script>
    <!-- Firebase診断ツール -->
    <script src="js/diagnosis.js?v=13"></script>
    <script src="js/firebase-config.js?v=13"></script>
    <!-- セキュリティ機能 -->
    <script src="js/security.js?v=22"></script>
    <script src="js/i18n.js?v=38"></script>
    <script src="js/data.js?v=13"></script>
    <script src="js/data-valorant.js?v=13"></script>
    <script src="js/data-tft.js?v=13"></script>
    <script src="js/data-i18n.js?v=13"></script>
    <script src="js/demacia-data.js?v=13"></script>
    <script src="js/demacia-data-valorant.js?v=18"></script>
    <script src="js/void-data.js?v=29"></script>
    <script src="js/game.js?v=18"></script>
    <script src="js/demacia-game.js?v=20"></script>
    <script src="js/void-game.js?v=34"></script>
    <script src="js/demacia-solo.js?v=18"></script>
    <script src="js/pageview-counter.js?v=22"></script>
    <script src="js/mood-quiz-data.js?v=3"></script>
    <script src="js/mood-quiz.js?v=5"></script>
    <script src="js/void-main.js?v=38"></script>
    <script src="js/main.js?v=36"></script>
    <!-- シェア機能（main.jsの後に読み込む） -->
    <script src="js/share.js?v=5"></script>
</body>
</html>
