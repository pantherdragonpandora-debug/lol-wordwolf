<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="League of LegendsとVALORANTをテーマにした4つのオンラインパーティーゲームを紹介。ワードウルフ、デマーシア、ヴォイド、気分診断で友達と楽しもう！">
    <title>ゲーム紹介 - Esports ワードウルフ</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        .games-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: var(--spacing-lg);
        }
        .intro-section {
            background: var(--card-bg);
            border-radius: 12px;
            padding: var(--spacing-xl);
            margin-bottom: var(--spacing-lg);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            text-align: center;
        }
        .intro-section h1 {
            color: var(--primary-color);
            font-size: 2.5rem;
            margin-bottom: var(--spacing-md);
        }
        .intro-section p {
            font-size: 1.2rem;
            line-height: 1.8;
            color: var(--text-light);
            max-width: 800px;
            margin: 0 auto;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-md);
            margin: var(--spacing-lg) 0;
        }
        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            padding: var(--spacing-md);
            border-radius: 8px;
            text-align: center;
        }
        .feature-card .icon {
            font-size: 3rem;
            margin-bottom: var(--spacing-sm);
        }
        .feature-card h3 {
            color: var(--primary-color);
            margin-bottom: var(--spacing-sm);
        }
        .game-card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: var(--spacing-xl);
            margin-bottom: var(--spacing-xl);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s;
        }
        .game-card:hover {
            transform: translateY(-5px);
        }
        .game-header {
            display: flex;
            align-items: center;
            margin-bottom: var(--spacing-lg);
        }
        .game-icon {
            font-size: 4rem;
            margin-right: var(--spacing-md);
        }
        .game-title {
            flex: 1;
        }
        .game-title h2 {
            color: var(--primary-color);
            margin: 0 0 var(--spacing-sm) 0;
            font-size: 2rem;
        }
        .game-subtitle {
            color: var(--text-light);
            font-size: 1.1rem;
        }
        .game-content h3 {
            color: var(--accent-color);
            margin-top: var(--spacing-lg);
            margin-bottom: var(--spacing-md);
        }
        .game-specs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-md);
            margin: var(--spacing-md) 0;
            padding: var(--spacing-md);
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
        }
        .spec-item {
            text-align: center;
        }
        .spec-label {
            color: var(--text-light);
            font-size: 0.9rem;
            margin-bottom: 4px;
        }
        .spec-value {
            color: var(--primary-color);
            font-weight: bold;
            font-size: 1.1rem;
        }
        .game-features {
            list-style: none;
            padding: 0;
        }
        .game-features li {
            padding: var(--spacing-sm) 0;
            padding-left: 30px;
            position: relative;
        }
        .game-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary-color);
            font-weight: bold;
            font-size: 1.2rem;
        }
        .cta-section {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            border-radius: 12px;
            padding: var(--spacing-xl);
            text-align: center;
            margin: var(--spacing-xl) 0;
        }
        .cta-section h2 {
            color: white;
            margin-bottom: var(--spacing-md);
        }
        .cta-button {
            display: inline-block;
            padding: var(--spacing-md) var(--spacing-xl);
            background: white;
            color: var(--primary-color);
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.2rem;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        .back-link {
            display: inline-block;
            margin-top: var(--spacing-lg);
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--primary-color);
            color: white;
            text-decoration: none;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <!-- ナビゲーションメニュー -->
    <nav class="main-nav" style="margin-bottom: var(--spacing-lg);">
        <div class="nav-content">
            <a href="index.html" class="nav-link" data-i18n="nav.game">🎮 ゲーム</a>
            <a href="games.html" class="nav-link" data-i18n="nav.gamesIntro">📖 ゲーム紹介</a>
            <a href="how-to-play.html" class="nav-link" data-i18n="nav.howToPlay">❓ 遊び方</a>
            <a href="blog.html" class="nav-link" data-i18n="nav.blog">✍️ ブログ</a>
            <a href="faq.html" class="nav-link" data-i18n="nav.faq">💬 FAQ</a>
            <a href="contact.html" class="nav-link" data-i18n="nav.contact">📧 お問い合わせ</a>
        </div>
    </nav>

    <div class="games-container">
        <div class="intro-section">
            <h1 data-i18n="gamesPage.title">🎮 Esports パーティーゲームコレクション</h1>
            <p data-i18n="gamesPage.intro">
                League of LegendsとVALORANTをテーマにした、オンラインで友達と楽しめる4つのパーティーゲーム！<br>
                リアルタイムマルチプレイヤー対応で、どこにいても一緒に遊べます。<br>
                アカウント不要、ブラウザだけですぐに始められます。
            </p>
        </div>

        <div class="features-grid">
            <div class="feature-card">
                <div class="icon">🔥</div>
                <h3>完全無料</h3>
                <p>すべてのゲームが無料で遊び放題</p>
            </div>
            <div class="feature-card">
                <div class="icon">🌐</div>
                <h3>オンライン対応</h3>
                <p>リアルタイムマルチプレイヤー</p>
            </div>
            <div class="feature-card">
                <div class="icon">📱</div>
                <h3>モバイル対応</h3>
                <p>スマホ・タブレットでもOK</p>
            </div>
            <div class="feature-card">
                <div class="icon">🌍</div>
                <h3>多言語対応</h3>
                <p>日本語・英語・韓国語・中国語</p>
            </div>
        </div>

        <!-- ワードウルフ -->
        <div class="game-card">
            <div class="game-header">
                <div class="game-icon">🐺</div>
                <div class="game-title">
                    <h2>ワードウルフ</h2>
                    <div class="game-subtitle">隠れたウルフを見つけ出す推理ゲーム</div>
                </div>
            </div>

            <div class="game-content">
                <p>
                    参加者の中に隠れた「ウルフ（少数派）」を見つけ出すコミュニケーションゲーム。多数派は同じお題を、ウルフは少し違うお題を受け取ります。会話を通じて誰がウルフかを推理し、投票で決定します。
                </p>

                <div class="game-specs">
                    <div class="spec-item">
                        <div class="spec-label">プレイ人数</div>
                        <div class="spec-value">3〜6人</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">プレイ時間</div>
                        <div class="spec-value">5〜15分</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">難易度</div>
                        <div class="spec-value">★★☆☆☆</div>
                    </div>
                </div>

                <h3>🎯 対応ゲームタイプ</h3>
                <ul>
                    <li><strong>League of Legends:</strong> チャンピオン、アイテム、スキル、マップなど73ペア</li>
                    <li><strong>VALORANT:</strong> エージェント、武器、アビリティ、マップなど77ペア</li>
                    <li><strong>TFT:</strong> ユニット、特性、アイテムなど75ペア</li>
                </ul>

                <h3>✨ 特徴</h3>
                <ul class="game-features">
                    <li>リアルタイムマルチプレイヤー対応</li>
                    <li>お題画像表示（公式CDN）</li>
                    <li>チャット機能付き</li>
                    <li>カスタマイズ可能なタイマー（3〜15分）</li>
                    <li>投票システムで公平に決定</li>
                    <li>多言語対応（お題も多言語）</li>
                </ul>

                <h3>🎭 こんな人におすすめ</h3>
                <ul>
                    <li>人狼ゲームが好き</li>
                    <li>心理戦が得意</li>
                    <li>ゲーム知識を活かしたい</li>
                    <li>友達とワイワイ楽しみたい</li>
                </ul>
            </div>
        </div>

        <!-- デマーシアに心を込めて -->
        <div class="game-card">
            <div class="game-header">
                <div class="game-icon">💖</div>
                <div class="game-title">
                    <h2>デマーシアに心を込めて</h2>
                    <div class="game-subtitle">セリフを演じて当てる演技ゲーム</div>
                </div>
            </div>

            <div class="game-content">
                <p>
                    有名なゲームキャラクターのセリフを、指定されたシチュエーションで演じて当ててもらうゲーム。演技力と推理力が試される、笑いありのパーティーゲームです。
                </p>

                <div class="game-specs">
                    <div class="spec-item">
                        <div class="spec-label">プレイ人数</div>
                        <div class="spec-value">3〜10人</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">プレイ時間</div>
                        <div class="spec-value">3〜5分/ラウンド</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">難易度</div>
                        <div class="spec-value">★★★☆☆</div>
                    </div>
                </div>

                <h3>🎯 対応ゲームタイプ</h3>
                <ul>
                    <li><strong>League of Legends:</strong> 60種類のセリフ × 6シチュエーション = 360パターン</li>
                    <li><strong>VALORANT:</strong> 60種類のセリフ × 6シチュエーション = 360パターン</li>
                </ul>

                <h3>✨ 特徴</h3>
                <ul class="game-features">
                    <li>60種類以上の有名セリフ（ガレン、ヤスオ、ジンクス、Jett等）</li>
                    <li>多彩なシチュエーション（ペンタキル達成時、告白するときなど）</li>
                    <li>難易度別ポイントシステム（Easy/Medium/Hard）</li>
                    <li>1人演技制（全員が推理者）</li>
                    <li>演技者をランダムまたは手動で選択</li>
                    <li>スコアシステムで競争</li>
                </ul>

                <h3>🎭 こんな人におすすめ</h3>
                <ul>
                    <li>演技が好き・得意</li>
                    <li>ゲームのセリフに詳しい</li>
                    <li>笑いを求めている</li>
                    <li>大人数で盛り上がりたい</li>
                </ul>
            </div>
        </div>

        <!-- ヴォイドに届くは光か闇か -->
        <div class="game-card">
            <div class="game-header">
                <div class="game-icon">🌌</div>
                <div class="game-title">
                    <h2>ヴォイドに届くは光か闇か</h2>
                    <div class="game-subtitle">連想ワードで伝える伝言ゲーム</div>
                </div>
            </div>

            <div class="game-content">
                <p>
                    連想ワードを使ってテーマを伝える伝言ゲーム。最初のプレイヤーからワードを3つずつ伝えていき、最後のプレイヤーが元のテーマを推測します。言葉がどう変化していくかが見どころです。
                </p>

                <div class="game-specs">
                    <div class="spec-item">
                        <div class="spec-label">プレイ人数</div>
                        <div class="spec-value">2〜8人</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">プレイ時間</div>
                        <div class="spec-value">5〜10分</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">難易度</div>
                        <div class="spec-value">★★★★☆</div>
                    </div>
                </div>

                <h3>🎯 対応ゲームタイプ</h3>
                <ul>
                    <li><strong>League of Legends:</strong> チャンピオン、アイテム、場所、概念など25テーマ</li>
                    <li><strong>VALORANT:</strong> エージェント、武器、マップ、概念など15テーマ</li>
                </ul>

                <h3>✨ 特徴</h3>
                <ul class="game-features">
                    <li>回答順番選択（プレイヤー自身が選択）</li>
                    <li>修正機能（伝わりにくい言葉を途中で修正可能）</li>
                    <li>視覚的フィードバック（修正部分が黄色でハイライト）</li>
                    <li>テーマジャンル表示（難易度調整）</li>
                    <li>推移表示（結果画面で言葉の変化を確認）</li>
                    <li>待機画面（現在のターンとプレイヤー名表示）</li>
                    <li>美しいUI（ヴォイドイメージの紫/青グラデーション）</li>
                </ul>

                <h3>🎭 こんな人におすすめ</h3>
                <ul>
                    <li>協力ゲームが好き</li>
                    <li>言葉のセンスに自信がある</li>
                    <li>じっくり考えるのが好き</li>
                    <li>予想外の展開を楽しみたい</li>
                </ul>
            </div>
        </div>

        <!-- 気分診断チャンピオン選択 -->
        <div class="game-card">
            <div class="game-header">
                <div class="game-icon">🎭</div>
                <div class="game-title">
                    <h2>気分診断チャンピオン選択</h2>
                    <div class="game-subtitle">あなたにピッタリのチャンピオンを診断</div>
                </div>
            </div>

            <div class="game-content">
                <p>
                    今の気分やプレイスタイルから、最適なLeague of Legendsチャンピオンを診断するツール。全172体のチャンピオンの中から、あなたにピッタリのチャンピオンをAIがスコアリングして提案します。
                </p>

                <div class="game-specs">
                    <div class="spec-item">
                        <div class="spec-label">プレイ人数</div>
                        <div class="spec-value">1人（ソロ）</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">所要時間</div>
                        <div class="spec-value">2〜3分</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">質問数</div>
                        <div class="spec-value">12問</div>
                    </div>
                </div>

                <h3>🎯 診断タイプ</h3>
                <ul>
                    <li><strong>⚔️ アグレッシブタイプ:</strong> 敵を倒してスカッとしたい気分</li>
                    <li><strong>🛡️ サポーティブタイプ:</strong> 味方を守って勝利に貢献したい気分</li>
                    <li><strong>🧠 タクティカルタイプ:</strong> 頭を使って戦略的に戦いたい気分</li>
                    <li><strong>⚖️ バランスタイプ:</strong> 状況に応じて柔軟に対応したい気分</li>
                </ul>

                <h3>✨ 特徴（v9アップデート）</h3>
                <ul class="game-features">
                    <li>全172体のチャンピオンがスコアリング対象</li>
                    <li>マルチレーン対応（メイン/サブ/ニッチロール）</li>
                    <li>ニッチロール対応（MID ガングプランク、SUP リサンドラなど）</li>
                    <li>タイプ一致ボーナス（+50点）で診断結果を尊重</li>
                    <li>レーン適性ボーナス（最大+30点）</li>
                    <li>1位・2位・3位の順位表示（メダル付き）</li>
                    <li>前の質問に戻る機能</li>
                    <li>視覚的な結果（スコアチャート・チャンピオンカード）</li>
                    <li>チャンピオン画像付き（公式CDN）</li>
                </ul>

                <h3>🎭 こんな人におすすめ</h3>
                <ul>
                    <li>チャンピオン選びに迷っている</li>
                    <li>新しいチャンピオンを探している</li>
                    <li>自分のプレイスタイルを知りたい</li>
                    <li>ニッチなチャンピオンに挑戦したい</li>
                </ul>
            </div>
        </div>

        <div class="cta-section">
            <h2>さあ、今すぐ遊んでみよう！</h2>
            <p style="color: white; margin-bottom: var(--spacing-lg);">
                アカウント不要、ブラウザだけで今すぐ始められます。<br>
                友達にルームIDを共有して、一緒に楽しみましょう！
            </p>
            <a href="index.html" class="cta-button" data-i18n="gamesPage.playNow">🎮 ゲームを始める</a>
        </div>

        <a href="index.html" class="back-link" data-i18n="gamesPage.backToHome">← トップページに戻る</a>
    </div>
    
    <!-- 多言語対応スクリプト -->
    <script src="js/i18n.js"></script>
    <script>
        // 多言語初期化
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof initLanguage === 'function') {
                initLanguage();
            }
        });
        
        // 言語切り替え関数
        function changeLanguage(lang) {
            if (typeof window.changeLanguage === 'function') {
                window.changeLanguage(lang);
            } else {
                currentLanguage = lang;
                localStorage.setItem('language', lang);
                if (typeof updatePageLanguage === 'function') {
                    updatePageLanguage();
                }
            }
        }
    </script>
</body>
</html>
