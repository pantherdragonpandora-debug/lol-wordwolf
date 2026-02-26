<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>接続診断 - Esports パーティーゲーム</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 2rem;
            color: #0bc6e3;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .status {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            margin: 10px 0;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.3);
        }
        
        .status-icon {
            font-size: 24px;
        }
        
        .status-text {
            flex: 1;
        }
        
        .status.success {
            border-left: 4px solid #10b981;
        }
        
        .status.error {
            border-left: 4px solid #ef4444;
        }
        
        .status.warning {
            border-left: 4px solid #f59e0b;
        }
        
        .status.info {
            border-left: 4px solid #3b82f6;
        }
        
        .test-button {
            background: #0bc6e3;
            color: #fff;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px 5px;
            transition: all 0.3s;
        }
        
        .test-button:hover {
            background: #0aa5c5;
            transform: translateY(-2px);
        }
        
        .test-button:disabled {
            background: #666;
            cursor: not-allowed;
            transform: none;
        }
        
        .log {
            background: #000;
            color: #0f0;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            max-height: 400px;
            overflow-y: auto;
            margin-top: 10px;
        }
        
        .log-entry {
            margin: 5px 0;
            word-break: break-all;
        }
        
        .back-button {
            display: inline-block;
            background: #6366f1;
            color: #fff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            margin-bottom: 20px;
            transition: all 0.3s;
        }
        
        .back-button:hover {
            background: #4f46e5;
            transform: translateY(-2px);
        }
        
        .info-box {
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid #3b82f6;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }
        
        .info-box h3 {
            color: #60a5fa;
            margin-bottom: 10px;
        }
        
        code {
            background: rgba(0, 0, 0, 0.5);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="index.html" class="back-button">← ホームに戻る</a>
        
        <h1>🔍 接続診断ツール</h1>
        
        <div class="card">
            <h2>📱 デバイス情報</h2>
            <div class="status info">
                <span class="status-icon">📱</span>
                <div class="status-text">
                    <strong>デバイスタイプ:</strong> <span id="device-type">-</span>
                </div>
            </div>
            <div class="status info">
                <span class="status-icon">🌐</span>
                <div class="status-text">
                    <strong>ブラウザ:</strong> <span id="browser">-</span>
                </div>
            </div>
            <div class="status info">
                <span class="status-icon">📏</span>
                <div class="status-text">
                    <strong>画面サイズ:</strong> <span id="screen-size">-</span>
                </div>
            </div>
            <div class="status info">
                <span class="status-icon">🔌</span>
                <div class="status-text">
                    <strong>オンライン状態:</strong> <span id="online-status">-</span>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2>🔥 Firebase接続テスト</h2>
            <div id="firebase-status" class="status info">
                <span class="status-icon">⏳</span>
                <div class="status-text">
                    <strong>接続状態:</strong> <span id="firebase-connection">テスト中...</span>
                </div>
            </div>
            <button class="test-button" onclick="testFirebaseConnection()">再テスト</button>
        </div>
        
        <div class="card">
            <h2>📝 ルーム作成テスト</h2>
            <div id="room-create-status" class="status info">
                <span class="status-icon">⏳</span>
                <div class="status-text">
                    <strong>テスト状態:</strong> <span id="room-create-text">未実施</span>
                </div>
            </div>
            <button class="test-button" onclick="testRoomCreate()">ルーム作成テスト</button>
            <button class="test-button" onclick="testRoomJoin()">ルーム参加テスト</button>
        </div>
        
        <div class="card">
            <h2>📊 詳細ログ</h2>
            <button class="test-button" onclick="clearLog()">ログをクリア</button>
            <div class="log" id="log">
                <div class="log-entry">診断開始...</div>
            </div>
        </div>
        
        <div class="info-box">
            <h3>💡 問題が見つかった場合</h3>
            <p><strong>Firebase接続エラーの場合:</strong></p>
            <ul>
                <li>Wi-Fiまたはモバイルデータ接続を確認</li>
                <li>ブラウザのキャッシュをクリア</li>
                <li>別のブラウザで試す（Chrome、Safari、Firefoxなど）</li>
                <li>VPNを使用している場合は無効化</li>
            </ul>
            <br>
            <p><strong>ルーム作成/参加エラーの場合:</strong></p>
            <ul>
                <li>ブラウザのCookieとローカルストレージが有効か確認</li>
                <li>プライベートモード/シークレットモードを無効化</li>
                <li>ページを完全に再読み込み（Ctrl+Shift+R / Cmd+Shift+R）</li>
            </ul>
        </div>
    </div>

    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
    
    <!-- Firebase Config -->
    <script src="js/firebase-config.js"></script>
    
    <script>
        // ログ出力関数
        function log(message, type = 'info') {
            const logDiv = document.getElementById('log');
            const timestamp = new Date().toLocaleTimeString();
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            
            let icon = 'ℹ️';
            if (type === 'success') icon = '✅';
            if (type === 'error') icon = '❌';
            if (type === 'warning') icon = '⚠️';
            
            entry.textContent = `[${timestamp}] ${icon} ${message}`;
            logDiv.appendChild(entry);
            logDiv.scrollTop = logDiv.scrollHeight;
            
            console.log(`[診断] ${message}`);
        }
        
        function clearLog() {
            document.getElementById('log').innerHTML = '<div class="log-entry">ログをクリアしました</div>';
        }
        
        // デバイス情報を取得
        function getDeviceInfo() {
            const userAgent = navigator.userAgent;
            let deviceType = 'デスクトップ';
            
            if (/Android/i.test(userAgent)) {
                deviceType = 'Android';
            } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
                deviceType = 'iOS';
            } else if (/Mobile|Tablet/i.test(userAgent)) {
                deviceType = 'モバイル';
            }
            
            let browser = 'Unknown';
            if (/Chrome/i.test(userAgent)) browser = 'Chrome';
            else if (/Safari/i.test(userAgent)) browser = 'Safari';
            else if (/Firefox/i.test(userAgent)) browser = 'Firefox';
            else if (/Edge/i.test(userAgent)) browser = 'Edge';
            else if (/Opera/i.test(userAgent)) browser = 'Opera';
            
            document.getElementById('device-type').textContent = deviceType;
            document.getElementById('browser').textContent = browser;
            document.getElementById('screen-size').textContent = `${window.innerWidth} x ${window.innerHeight}`;
            document.getElementById('online-status').textContent = navigator.onLine ? '✅ オンライン' : '❌ オフライン';
            
            log(`デバイス: ${deviceType}, ブラウザ: ${browser}, 画面: ${window.innerWidth}x${window.innerHeight}`);
        }
        
        // Firebase接続テスト
        async function testFirebaseConnection() {
            log('Firebase接続テスト開始...');
            const statusDiv = document.getElementById('firebase-status');
            const statusText = document.getElementById('firebase-connection');
            
            statusDiv.className = 'status info';
            statusText.textContent = 'テスト中...';
            
            try {
                // 接続状態を確認
                const connectedRef = firebase.database().ref('.info/connected');
                const connectedSnap = await connectedRef.once('value');
                const isConnected = connectedSnap.val();
                
                if (isConnected) {
                    statusDiv.className = 'status success';
                    statusText.textContent = '✅ 接続成功';
                    log('Firebase接続成功', 'success');
                    
                    // 書き込みテスト
                    const testRef = firebase.database().ref('_connection_test/' + Date.now());
                    await testRef.set({
                        timestamp: Date.now(),
                        userAgent: navigator.userAgent
                    });
                    log('書き込みテスト成功', 'success');
                    
                    // 削除
                    await testRef.remove();
                    log('クリーンアップ完了', 'success');
                    
                } else {
                    throw new Error('Firebase未接続');
                }
                
            } catch (error) {
                statusDiv.className = 'status error';
                statusText.textContent = '❌ 接続失敗';
                log(`Firebase接続エラー: ${error.message}`, 'error');
                log(`エラー詳細: ${JSON.stringify(error)}`, 'error');
            }
        }
        
        // ルーム作成テスト
        async function testRoomCreate() {
            log('ルーム作成テスト開始...');
            const statusDiv = document.getElementById('room-create-status');
            const statusText = document.getElementById('room-create-text');
            
            statusDiv.className = 'status info';
            statusText.textContent = 'テスト中...';
            
            try {
                const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
                log(`テストルームID: ${roomId}`);
                
                const roomRef = firebase.database().ref('rooms/' + roomId);
                const testData = {
                    roomId: roomId,
                    hostName: 'テストユーザー',
                    gameType: 'lol',
                    gameMode: 'wordwolf',
                    maxPlayers: 4,
                    createdAt: Date.now(),
                    state: 'test'
                };
                
                await roomRef.set(testData);
                log('ルーム作成成功', 'success');
                
                // 読み取りテスト
                const snapshot = await roomRef.once('value');
                const data = snapshot.val();
                
                if (data && data.roomId === roomId) {
                    log('ルーム読み取り成功', 'success');
                    statusDiv.className = 'status success';
                    statusText.textContent = `✅ テスト成功 (ルームID: ${roomId})`;
                } else {
                    throw new Error('ルームデータが一致しません');
                }
                
                // クリーンアップ
                await roomRef.remove();
                log('テストルーム削除完了', 'success');
                
            } catch (error) {
                statusDiv.className = 'status error';
                statusText.textContent = '❌ テスト失敗';
                log(`ルーム作成エラー: ${error.message}`, 'error');
                log(`エラー詳細: ${JSON.stringify(error)}`, 'error');
            }
        }
        
        // ルーム参加テスト
        async function testRoomJoin() {
            log('ルーム参加テスト開始...');
            const statusDiv = document.getElementById('room-create-status');
            const statusText = document.getElementById('room-create-text');
            
            statusDiv.className = 'status info';
            statusText.textContent = 'テスト中...';
            
            try {
                // まずテストルームを作成
                const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
                log(`テストルームID: ${roomId}`);
                
                const roomRef = firebase.database().ref('rooms/' + roomId);
                await roomRef.set({
                    roomId: roomId,
                    hostName: 'ホスト',
                    players: {
                        'ホスト': { ready: true }
                    },
                    maxPlayers: 4,
                    createdAt: Date.now(),
                    state: 'waiting'
                });
                log('テストルーム作成完了', 'success');
                
                // 参加テスト
                const playerName = 'テスト参加者';
                await roomRef.child('players').child(playerName).set({
                    ready: true,
                    joinedAt: Date.now()
                });
                log('プレイヤー追加成功', 'success');
                
                // 確認
                const snapshot = await roomRef.child('players').once('value');
                const players = snapshot.val();
                
                if (players && players[playerName]) {
                    log('参加確認成功', 'success');
                    statusDiv.className = 'status success';
                    statusText.textContent = `✅ 参加テスト成功 (ルームID: ${roomId})`;
                } else {
                    throw new Error('プレイヤーデータが見つかりません');
                }
                
                // クリーンアップ
                await roomRef.remove();
                log('テストルーム削除完了', 'success');
                
            } catch (error) {
                statusDiv.className = 'status error';
                statusText.textContent = '❌ テスト失敗';
                log(`ルーム参加エラー: ${error.message}`, 'error');
                log(`エラー詳細: ${JSON.stringify(error)}`, 'error');
            }
        }
        
        // オンライン状態の監視
        window.addEventListener('online', () => {
            log('ネットワーク接続復旧', 'success');
            document.getElementById('online-status').textContent = '✅ オンライン';
        });
        
        window.addEventListener('offline', () => {
            log('ネットワーク接続喪失', 'error');
            document.getElementById('online-status').textContent = '❌ オフライン';
        });
        
        // 初期化
        window.addEventListener('DOMContentLoaded', () => {
            log('診断ツール初期化完了', 'success');
            getDeviceInfo();
            
            // 自動的にFirebase接続テストを実行
            setTimeout(() => {
                testFirebaseConnection();
            }, 1000);
        });
    </script>
</body>
</html>
