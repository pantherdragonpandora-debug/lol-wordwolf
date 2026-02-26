<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firebaseセキュリティルール設定ガイド</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a1428 0%, #1a2942 100%);
            color: #e8e8e8;
            padding: 2rem;
            line-height: 1.6;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(26, 41, 66, 0.8);
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        h1 {
            color: #0bc6e3;
            text-align: center;
            margin-bottom: 2rem;
        }
        h2 {
            color: #c89b3c;
            margin-top: 2rem;
            border-bottom: 2px solid #c89b3c;
            padding-bottom: 0.5rem;
        }
        .step {
            background: rgba(11, 198, 227, 0.1);
            border-left: 4px solid #0bc6e3;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        .code-block {
            background: #0a1428;
            border: 1px solid #0bc6e3;
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            overflow-x: auto;
        }
        pre {
            margin: 0;
            color: #0bc6e3;
        }
        .warning {
            background: rgba(255, 193, 7, 0.1);
            border-left: 4px solid #ffc107;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        .success {
            background: rgba(76, 175, 80, 0.1);
            border-left: 4px solid #4caf50;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #c89b3c 0%, #a67c2b 100%);
            color: #0a1428;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 1rem 0.5rem 1rem 0;
            transition: transform 0.3s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        img {
            max-width: 100%;
            border-radius: 8px;
            margin: 1rem 0;
            border: 2px solid #0bc6e3;
        }
        .center {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 Firebaseセキュリティルール設定ガイド</h1>
        
        <div class="warning">
            <strong>⚠️ 重要</strong><br>
            ルームに参加できない場合、Firebaseのセキュリティルールが正しく設定されていない可能性があります。
            以下の手順に従って設定してください。
        </div>

        <h2>📋 設定手順</h2>

        <div class="step">
            <strong>ステップ1: Firebase Consoleにアクセス</strong><br>
            <a href="https://console.firebase.google.com/" target="_blank" class="btn">Firebase Consoleを開く</a>
        </div>

        <div class="step">
            <strong>ステップ2: プロジェクトを選択</strong><br>
            「lol-word-wolf」プロジェクトをクリックして開きます。
        </div>

        <div class="step">
            <strong>ステップ3: Realtime Databaseを開く</strong><br>
            左側のメニューから「Realtime Database」を選択します。
        </div>

        <div class="step">
            <strong>ステップ4: ルールタブを開く</strong><br>
            上部の「ルール」タブをクリックします。
        </div>

        <div class="step">
            <strong>ステップ5: 以下のルールをコピーして貼り付け</strong><br>
            <div class="code-block">
                <pre>{
  "rules": {
    "rooms": {
      ".read": true,
      ".write": true
    },
    "demacia_rooms": {
      ".read": true,
      ".write": true
    }
  }
}</pre>
            </div>
            <button class="btn" onclick="copyRules()">📋 ルールをコピー</button>
        </div>

        <div class="step">
            <strong>ステップ6: 公開</strong><br>
            右上の「公開」ボタンをクリックします。
        </div>

        <div class="step">
            <strong>ステップ7: 警告を確認</strong><br>
            「セキュリティルールが公開モードになっています」という警告が表示される場合がありますが、
            これはテスト目的のため問題ありません。もう一度「公開」をクリックします。
        </div>

        <div class="success">
            <strong>✅ 設定完了！</strong><br>
            ゲームページに戻って、もう一度ルームに参加してみてください。
        </div>

        <h2>🔍 動作確認</h2>

        <div class="step">
            <strong>診断ツールを使用</strong><br>
            ゲームページのブラウザコンソール（F12）を開き、以下のコマンドを実行：
            <div class="code-block">
                <pre>diagnosisFirebase()</pre>
            </div>
            これでFirebase接続と権限が正しく設定されているか確認できます。
        </div>

        <h2>📝 セキュリティについて</h2>

        <div class="warning">
            <strong>⚠️ 注意事項</strong><br>
            現在の設定は<strong>開発・テスト用</strong>です。本番環境では、より厳密なセキュリティルールの設定を推奨します。
            <br><br>
            <strong>本番環境用の推奨ルール（将来的に実装）:</strong>
            <ul>
                <li>認証されたユーザーのみがルームを作成可能</li>
                <li>参加者は自分のデータのみ変更可能</li>
                <li>ホストのみがゲーム開始可能</li>
            </ul>
        </div>

        <h2>❓ よくある質問</h2>

        <div class="step">
            <strong>Q: ルールを公開しても参加できません</strong><br>
            A: 以下を確認してください：
            <ul>
                <li>ブラウザをハードリロード（Ctrl+Shift+R）</li>
                <li>診断ツール <code>diagnosisFirebase()</code> を実行</li>
                <li>ルームIDが正しいか確認</li>
                <li>ルーム作成者と参加者のインターネット接続を確認</li>
            </ul>
        </div>

        <div class="step">
            <strong>Q: 「PERMISSION_DENIED」エラーが出ます</strong><br>
            A: Firebaseルールが正しく公開されていない可能性があります。
            ルールタブで「公開」ボタンをもう一度クリックしてください。
        </div>

        <div class="step">
            <strong>Q: 他のプロジェクトのルールに影響はありますか？</strong><br>
            A: いいえ、各Firebaseプロジェクトのルールは独立しています。
            このプロジェクト（lol-word-wolf）のみに適用されます。
        </div>

        <div class="center">
            <a href="index.html" class="btn">🎮 ゲームに戻る</a>
            <a href="ROOM_JOIN_FIX.md" class="btn">📚 詳細なガイド</a>
        </div>
    </div>

    <script>
        function copyRules() {
            const rules = `{
  "rules": {
    "rooms": {
      ".read": true,
      ".write": true
    },
    "demacia_rooms": {
      ".read": true,
      ".write": true
    }
  }
}`;
            navigator.clipboard.writeText(rules).then(() => {
                alert('✅ ルールをコピーしました！\nFirebase Consoleのルールエディタに貼り付けてください。');
            }).catch(() => {
                alert('コピーに失敗しました。手動でコピーしてください。');
            });
        }
    </script>
</body>
</html>
