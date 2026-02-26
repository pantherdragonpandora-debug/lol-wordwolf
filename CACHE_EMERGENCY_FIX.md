<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ブログ管理画面 - Esports ワードウルフ</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        .admin-container {
            max-width: 900px;
            margin: 0 auto;
            padding: var(--spacing-lg);
        }
        .login-screen {
            background: var(--card-bg);
            border-radius: 12px;
            padding: var(--spacing-xl);
            max-width: 400px;
            margin: 100px auto;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            text-align: center;
        }
        .login-screen h1 {
            color: var(--primary-color);
            margin-bottom: var(--spacing-lg);
        }
        .login-form {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        .login-form input {
            padding: var(--spacing-sm);
            border: 2px solid var(--border-color);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-color);
            font-size: 1rem;
        }
        .login-form button {
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--primary-color);
            color: var(--bg-dark);
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        .login-form button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .error-message {
            color: #e74c3c;
            margin-top: var(--spacing-sm);
            font-size: 0.9rem;
        }
        .admin-header {
            background: var(--card-bg);
            border-radius: 12px;
            padding: var(--spacing-lg);
            margin-bottom: var(--spacing-lg);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .admin-header h1 {
            color: var(--primary-color);
            margin: 0;
        }
        .logout-btn {
            padding: var(--spacing-sm) var(--spacing-md);
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .logout-btn:hover {
            background: #c0392b;
        }
        .editor-card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: var(--spacing-xl);
            margin-bottom: var(--spacing-lg);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .editor-card h2 {
            color: var(--primary-color);
            margin-bottom: var(--spacing-md);
        }
        .form-group {
            margin-bottom: var(--spacing-md);
        }
        .form-group label {
            display: block;
            color: var(--text-color);
            margin-bottom: var(--spacing-sm);
            font-weight: 600;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: var(--spacing-sm);
            border: 2px solid var(--border-color);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-color);
            font-size: 1rem;
            font-family: inherit;
        }
        .form-group textarea {
            min-height: 200px;
            resize: vertical;
        }
        .tag-input-container {
            display: flex;
            gap: var(--spacing-sm);
        }
        .tag-input-container input {
            flex: 1;
        }
        .tags-display {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-sm);
            margin-top: var(--spacing-sm);
        }
        .tag-item {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 12px;
            background: rgba(52, 152, 219, 0.2);
            border-radius: 16px;
            font-size: 0.85rem;
            color: var(--primary-color);
        }
        .tag-item button {
            background: none;
            border: none;
            color: var(--primary-color);
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0;
            margin-left: 4px;
        }
        .emoji-selector {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
            gap: 8px;
            margin-top: var(--spacing-sm);
            padding: var(--spacing-sm);
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
        }
        .emoji-btn {
            font-size: 1.5rem;
            padding: 8px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid transparent;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .emoji-btn:hover {
            background: var(--primary-color);
            border-color: var(--primary-color);
            transform: scale(1.1);
        }
        .action-buttons {
            display: flex;
            gap: var(--spacing-md);
            margin-top: var(--spacing-lg);
        }
        .action-buttons button {
            flex: 1;
            padding: var(--spacing-md);
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-preview {
            background: #3498db;
            color: white;
        }
        .btn-preview:hover {
            background: #2980b9;
        }
        .btn-generate {
            background: var(--primary-color);
            color: var(--bg-dark);
        }
        .btn-generate:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .output-card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: var(--spacing-xl);
            margin-top: var(--spacing-lg);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .output-card h2 {
            color: var(--primary-color);
            margin-bottom: var(--spacing-md);
        }
        .code-output {
            background: #1a1a2e;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            padding: var(--spacing-md);
            overflow-x: auto;
            position: relative;
        }
        .code-output pre {
            margin: 0;
            color: #d4d4d4;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .copy-btn {
            position: absolute;
            top: var(--spacing-sm);
            right: var(--spacing-sm);
            padding: 8px 16px;
            background: var(--primary-color);
            color: var(--bg-dark);
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: bold;
        }
        .copy-btn:hover {
            opacity: 0.8;
        }
        .preview-card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: var(--spacing-xl);
            margin-top: var(--spacing-lg);
        }
        .instructions {
            background: rgba(52, 152, 219, 0.1);
            border-left: 4px solid var(--primary-color);
            padding: var(--spacing-md);
            margin-top: var(--spacing-lg);
            border-radius: 4px;
        }
        .instructions h3 {
            color: var(--primary-color);
            margin-top: 0;
        }
        .instructions ol {
            margin: var(--spacing-sm) 0 0 var(--spacing-lg);
        }
        .instructions li {
            margin-bottom: var(--spacing-sm);
            color: var(--text-light);
        }
    </style>
</head>
<body>
    <!-- ログイン画面 -->
    <div id="login-screen" class="login-screen">
        <h1>🔐 ブログ管理画面</h1>
        <form class="login-form" onsubmit="login(event)">
            <input type="password" id="password-input" placeholder="パスワードを入力" required>
            <button type="submit">ログイン</button>
            <div id="error-message" class="error-message" style="display: none;"></div>
        </form>
        <p style="margin-top: var(--spacing-lg); color: var(--text-light); font-size: 0.9rem;">
            ⚠️ このページは管理者専用です
        </p>
    </div>

    <!-- 管理画面 -->
    <div id="admin-panel" style="display: none;">
        <div class="admin-container">
            <div class="admin-header">
                <h1>📝 ブログ記事作成</h1>
                <button class="logout-btn" onclick="logout()">ログアウト</button>
            </div>

            <div class="editor-card">
                <h2>記事情報</h2>
                
                <div class="form-group">
                    <label>📌 タイトルの絵文字</label>
                    <div class="emoji-selector">
                        <button type="button" class="emoji-btn" onclick="selectEmoji('🌟')">🌟</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('🎮')">🎮</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('🐛')">🐛</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('💡')">💡</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('📢')">📢</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('🎉')">🎉</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('⚙️')">⚙️</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('🎭')">🎭</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('🔥')">🔥</button>
                        <button type="button" class="emoji-btn" onclick="selectEmoji('✨')">✨</button>
                    </div>
                </div>

                <div class="form-group">
                    <label>📝 記事タイトル</label>
                    <input type="text" id="post-title" placeholder="例: 新機能追加！ランキングシステム実装" required>
                </div>

                <div class="form-group">
                    <label>📅 投稿日</label>
                    <input type="date" id="post-date" required>
                </div>

                <div class="form-group">
                    <label>🏷️ タグ</label>
                    <div class="tag-input-container">
                        <input type="text" id="tag-input" placeholder="タグを入力してEnter">
                        <button type="button" onclick="addTag()" style="padding: 8px 16px; background: var(--primary-color); border: none; border-radius: 8px; cursor: pointer; color: var(--bg-dark); font-weight: bold;">追加</button>
                    </div>
                    <div id="tags-display" class="tags-display"></div>
                    <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 4px;">
                        おすすめ: アップデート、バグ修正、新機能、お知らせ、攻略、Tips
                    </p>
                </div>

                <div class="form-group">
                    <label>✍️ 記事本文（HTML形式）</label>
                    <textarea id="post-content" placeholder="<p>記事の内容をここに書きます。</p>

<h3>📊 見出し1</h3>
<p>本文...</p>
<ul>
    <li>項目1</li>
    <li>項目2</li>
</ul>

<h3>💡 見出し2</h3>
<p>本文...</p>" required></textarea>
                    <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 4px;">
                        💡 HTMLタグが使えます: &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;code&gt;
                    </p>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="is-new" checked style="width: auto; margin-right: 8px;">
                        NEWバッジを表示
                    </label>
                </div>

                <div class="action-buttons">
                    <button type="button" class="btn-preview" onclick="previewPost()">👁️ プレビュー</button>
                    <button type="button" class="btn-generate" onclick="generateCode()">📋 HTMLコード生成</button>
                </div>
            </div>

            <!-- プレビュー -->
            <div id="preview-section" style="display: none;">
                <div class="preview-card">
                    <h2>👁️ プレビュー</h2>
                    <div id="preview-content"></div>
                </div>
            </div>

            <!-- 生成されたコード -->
            <div id="output-section" style="display: none;">
                <div class="output-card">
                    <h2>📋 生成されたHTMLコード</h2>
                    <div class="code-output">
                        <button class="copy-btn" onclick="copyCode()">📋 コピー</button>
                        <pre id="generated-code"></pre>
                    </div>
                    
                    <div class="instructions">
                        <h3>📝 使い方</h3>
                        <ol>
                            <li>「📋 コピー」ボタンをクリック</li>
                            <li><code>blog.html</code> をテキストエディタで開く</li>
                            <li><code>&lt;!-- 最新の投稿 --&gt;</code> の直後に貼り付け</li>
                            <li>古い記事の <code>&lt;span class="update-badge"&gt;NEW&lt;/span&gt;</code> を削除</li>
                            <li>ファイルを保存してデプロイ</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // パスワード設定（ここを変更してください）
        const ADMIN_PASSWORD = 'your_secure_password_here';
        
        let selectedEmoji = '🎮';
        let tags = [];

        // ページ読み込み時に日付を今日に設定
        window.onload = function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('post-date').value = today;
            
            // タグ入力でEnterキーを押したら追加
            document.getElementById('tag-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                }
            });
        };

        function login(event) {
            event.preventDefault();
            const password = document.getElementById('password-input').value;
            const errorMessage = document.getElementById('error-message');
            
            if (password === ADMIN_PASSWORD) {
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('admin-panel').style.display = 'block';
                sessionStorage.setItem('admin_logged_in', 'true');
            } else {
                errorMessage.textContent = '❌ パスワードが間違っています';
                errorMessage.style.display = 'block';
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 3000);
            }
        }

        function logout() {
            sessionStorage.removeItem('admin_logged_in');
            document.getElementById('login-screen').style.display = 'block';
            document.getElementById('admin-panel').style.display = 'none';
            document.getElementById('password-input').value = '';
        }

        // ページロード時にログイン状態を確認
        if (sessionStorage.getItem('admin_logged_in') === 'true') {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('admin-panel').style.display = 'block';
        }

        function selectEmoji(emoji) {
            selectedEmoji = emoji;
            // 選択された絵文字を視覚的に表示
            document.querySelectorAll('.emoji-btn').forEach(btn => {
                btn.style.background = 'rgba(255, 255, 255, 0.05)';
            });
            event.target.style.background = 'var(--primary-color)';
        }

        function addTag() {
            const tagInput = document.getElementById('tag-input');
            const tagText = tagInput.value.trim();
            
            if (tagText && !tags.includes(tagText)) {
                tags.push(tagText);
                updateTagsDisplay();
                tagInput.value = '';
            }
        }

        function removeTag(tag) {
            tags = tags.filter(t => t !== tag);
            updateTagsDisplay();
        }

        function updateTagsDisplay() {
            const container = document.getElementById('tags-display');
            container.innerHTML = tags.map(tag => `
                <span class="tag-item">
                    ${tag}
                    <button onclick="removeTag('${tag}')">×</button>
                </span>
            `).join('');
        }

        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}年${month}月${day}日`;
        }

        function previewPost() {
            const title = document.getElementById('post-title').value;
            const date = document.getElementById('post-date').value;
            const content = document.getElementById('post-content').value;
            const isNew = document.getElementById('is-new').checked;
            
            if (!title || !date || !content) {
                alert('すべての必須項目を入力してください');
                return;
            }

            const preview = `
                <div class="blog-post" style="background: var(--card-bg); border-radius: 12px; padding: var(--spacing-xl); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                    <div class="post-header" style="border-bottom: 2px solid rgba(255, 255, 255, 0.1); padding-bottom: var(--spacing-md); margin-bottom: var(--spacing-md);">
                        <h2 class="post-title" style="color: var(--primary-color); font-size: 1.8rem; margin-bottom: var(--spacing-sm);">
                            ${selectedEmoji} ${title}
                            ${isNew ? '<span class="update-badge" style="display: inline-block; padding: 4px 12px; background: #e74c3c; color: white; border-radius: 4px; font-size: 0.85rem; font-weight: bold; margin-left: var(--spacing-sm);">NEW</span>' : ''}
                        </h2>
                        <div class="post-meta" style="color: var(--text-light); font-size: 0.9rem; display: flex; gap: var(--spacing-md); flex-wrap: wrap;">
                            <span style="display: flex; align-items: center; gap: 4px;">📅 ${formatDate(date)}</span>
                            <span style="display: flex; align-items: center; gap: 4px;">👤 開発者</span>
                            ${tags.map(tag => `<span class="post-tag" style="display: inline-block; padding: 4px 12px; background: rgba(52, 152, 219, 0.2); border-radius: 16px; font-size: 0.85rem; color: var(--primary-color);">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="post-content" style="line-height: 1.8; color: var(--text-light);">
                        ${content}
                    </div>
                </div>
            `;
            
            document.getElementById('preview-content').innerHTML = preview;
            document.getElementById('preview-section').style.display = 'block';
            document.getElementById('preview-section').scrollIntoView({ behavior: 'smooth' });
        }

        function generateCode() {
            const title = document.getElementById('post-title').value;
            const date = document.getElementById('post-date').value;
            const content = document.getElementById('post-content').value;
            const isNew = document.getElementById('is-new').checked;
            
            if (!title || !date || !content) {
                alert('すべての必須項目を入力してください');
                return;
            }

            const code = `        <!-- 新しい投稿 -->
        <div class="blog-post">
            <div class="post-header">
                <h2 class="post-title">
                    ${selectedEmoji} ${title}${isNew ? '\n                    <span class="update-badge">NEW</span>' : ''}
                </h2>
                <div class="post-meta">
                    <span>📅 ${formatDate(date)}</span>
                    <span>👤 開発者</span>${tags.length > 0 ? '\n                    ' + tags.map(tag => `<span class="post-tag">${tag}</span>`).join('\n                    ') : ''}
                </div>
            </div>
            <div class="post-content">
                ${content.split('\n').join('\n                ')}
            </div>
        </div>`;

            document.getElementById('generated-code').textContent = code;
            document.getElementById('output-section').style.display = 'block';
            document.getElementById('output-section').scrollIntoView({ behavior: 'smooth' });
        }

        function copyCode() {
            const code = document.getElementById('generated-code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                const btn = document.querySelector('.copy-btn');
                const originalText = btn.textContent;
                btn.textContent = '✅ コピーしました！';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            });
        }
    </script>
</body>
</html>
