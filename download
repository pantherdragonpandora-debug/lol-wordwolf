// ========================================
// SNSシェア機能
// ========================================

// シェア用のテキストとURL設定
const SHARE_CONFIG = {
  title: 'Esports Word Wolf - eスポーツで遊ぶパーティゲーム',
  description: 'LoL・VALORANT・TFTのテーマで遊ぶワードウルフ、デマーシア、ヴォイドモード！友達と一緒にオンラインで楽しもう！',
  hashtags: ['EsportsWordWolf', 'ワードウルフ', 'LeagueOfLegends', 'VALORANT', 'TFT', 'パーティゲーム'],
  url: window.location.origin + window.location.pathname
};

// モード別のシェアテキスト
const MODE_SHARE_TEXT = {
  wordwolf: '🎮 ワードウルフで遊んでます！誰が人狼か見抜けるかな？',
  demacia: '🎭 デマーシアに心を込めて！名セリフで演技対決中！',
  void: '🌌 ヴォイドに届くは光か闇か！連想ゲームで協力プレイ！',
  default: '🎮 Esports Word Wolf で遊ぼう！LoL・VALORANTのテーマでパーティゲーム！'
};

// 現在のゲームモードを取得
function getCurrentGameMode() {
  return window.selectedGameMode || 'wordwolf';
}

// 現在のゲームタイプを取得
function getCurrentGameType() {
  return window.selectedGameType || 'lol';
}

// シェア用のテキストを生成
function generateShareText() {
  const mode = getCurrentGameMode();
  const gameType = getCurrentGameType();
  const modeText = MODE_SHARE_TEXT[mode] || MODE_SHARE_TEXT.default;
  
  const gameTypeName = {
    lol: 'League of Legends',
    valorant: 'VALORANT',
    tft: 'Teamfight Tactics'
  }[gameType] || '';
  
  if (gameTypeName) {
    return `${modeText}\n\n${gameTypeName}のテーマで遊べる無料オンラインパーティゲーム！\n\n${SHARE_CONFIG.title}`;
  } else {
    return `${modeText}\n\n${SHARE_CONFIG.title}`;
  }
}

// X (Twitter) でシェア
function shareOnTwitter() {
  const text = generateShareText();
  const hashtags = SHARE_CONFIG.hashtags.join(',');
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent(hashtags)}&url=${encodeURIComponent(SHARE_CONFIG.url)}`;
  
  window.open(url, '_blank', 'width=550,height=420');
  
  // アナリティクス記録（将来的に実装可能）
  logShareEvent('twitter');
}

// Discord でシェア（クリップボードにコピー + Discord URL）
function shareOnDiscord() {
  const text = `${generateShareText()}\n\n🔗 ${SHARE_CONFIG.url}`;
  
  // クリップボードにコピー
  copyToClipboard(text, 'Discord用のテキストをコピーしました！Discordに貼り付けてシェアしてください。');
  
  // Discordを開く（オプション）
  // window.open('https://discord.com/channels/@me', '_blank');
  
  logShareEvent('discord');
}

// LINE でシェア
function shareOnLine() {
  const text = generateShareText();
  const url = `https://line.me/R/msg/text/?${encodeURIComponent(text + '\n' + SHARE_CONFIG.url)}`;
  
  window.open(url, '_blank');
  
  logShareEvent('line');
}

// URLをクリップボードにコピー
function copyShareUrl() {
  // URLのみをコピー
  copyToClipboard(SHARE_CONFIG.url, 'URLをコピーしました！');
  
  // ボタンの表示を変更
  const button = event.target.closest('.share-button');
  if (button) {
    const originalText = button.innerHTML;
    button.innerHTML = '✅ コピー完了！';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
  }
  
  logShareEvent('copy');
}

// クリップボードにテキストをコピー
function copyToClipboard(text, successMessage = 'コピーしました！') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showCopyNotification(successMessage);
      })
      .catch(err => {
        console.error('❌ クリップボードへのコピーに失敗:', err);
        fallbackCopyToClipboard(text, successMessage);
      });
  } else {
    fallbackCopyToClipboard(text, successMessage);
  }
}

// フォールバック: クリップボードAPIが使えない場合
function fallbackCopyToClipboard(text, successMessage) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showCopyNotification(successMessage);
  } catch (err) {
    console.error('❌ フォールバックコピーに失敗:', err);
    alert('コピーに失敗しました。手動でコピーしてください。');
  }
  
  document.body.removeChild(textarea);
}

// コピー完了通知を表示
function showCopyNotification(message) {
  // 既存の通知を削除
  const existingNotification = document.querySelector('.copy-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // 新しい通知を作成
  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #28a745, #218838);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 600;
    animation: slideUp 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // 3秒後に削除
  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// シェアイベントをログに記録
function logShareEvent(platform) {
  console.log(`📤 シェア: ${platform}`);
  
  // Google Analytics などに送信可能
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', 'share', {
  //     method: platform,
  //     content_type: 'game',
  //     item_id: getCurrentGameMode()
  //   });
  // }
}

// シェアボタンのHTMLを生成
function createShareButtons() {
  return `
    <div class="share-section">
      <h3 class="share-section-title" data-i18n="share.title">🎮 Share with Friends</h3>
      <div class="share-buttons-container">
        <button class="share-button twitter" onclick="shareOnTwitter()" aria-label="Share on X (Twitter)">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span data-i18n="share.twitter">Xでシェア</span>
        </button>
        
        <button class="share-button discord" onclick="shareOnDiscord()" aria-label="Share on Discord">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          <span data-i18n="share.discord">Discordでシェア</span>
        </button>
        
        <button class="share-button line" onclick="shareOnLine()" aria-label="Share on LINE">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M19.365 9.863c.349 0 .63.285.63.631c0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63c0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63c0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596c-.064.021-.133.031-.199.031c-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629c-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595c.06-.023.136-.033.194-.033c.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63c.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63c.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63c.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63c0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608c.391.082.923.258 1.058.59c.12.301.079.771.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645c1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
          <span data-i18n="share.line">LINEでシェア</span>
        </button>
        
        <button class="share-button copy" onclick="copyShareUrl()" aria-label="Copy share text">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
          <span data-i18n="share.copy">テキストをコピー</span>
        </button>
      </div>
      <p class="screenshot-hint" data-i18n="share.hint">
        💡 スクリーンショットを撮ってSNSに投稿しよう！
      </p>
    </div>
  `;
}

// 結果画面にシェアボタンを追加
function addShareButtonsToResultScreen() {
  const resultScreens = [
    'result-screen',
    'demacia-final-result-screen',
    'void-result-screen'
  ];
  
  resultScreens.forEach(screenId => {
    const screen = document.getElementById(screenId);
    if (screen) {
      // 既存のシェアセクションを削除
      const existingShare = screen.querySelector('.share-section');
      if (existingShare) {
        existingShare.remove();
      }
      
      // 新しいシェアセクションを追加（ボタンの前に挿入）
      const buttons = screen.querySelector('.btn-primary, .void-btn-primary');
      if (buttons) {
        buttons.insertAdjacentHTML('beforebegin', createShareButtons());
      } else {
        // ボタンがない場合は最後に追加
        const card = screen.querySelector('.card');
        if (card) {
          card.insertAdjacentHTML('beforeend', createShareButtons());
        }
      }
    }
  });
  
  console.log('✅ シェアボタンを結果画面に追加しました');
}

// アニメーションのCSSを追加
function addShareAnimationStyles() {
  if (!document.getElementById('share-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'share-animation-styles';
    style.textContent = `
      @keyframes slideUp {
        from {
          transform: translateX(-50%) translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes slideDown {
        from {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        to {
          transform: translateX(-50%) translateY(20px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// 初期化
function initShareButtons() {
  addShareAnimationStyles();
  addFloatingShareStyles();
  addShareButtonsToResultScreen();
  addFloatingShareButton();
  console.log('✅ シェア機能を初期化しました');
}

// ページ読み込み時に初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShareButtons);
} else {
  initShareButtons();
}

// 結果画面表示時に再度ボタンを追加（動的生成対応）
// showScreen関数が定義された後にフックする
window.addEventListener('load', function() {
  const originalShowScreen = window.showScreen;
  if (originalShowScreen && typeof originalShowScreen === 'function') {
    window.showScreen = function(screenId) {
      originalShowScreen(screenId);
      if (screenId && screenId.includes('result')) {
        setTimeout(addShareButtonsToResultScreen, 100);
      }
    };
    console.log('✅ showScreen フックを設定しました');
  }
});

// グローバルに公開
window.shareOnTwitter = shareOnTwitter;
window.shareOnDiscord = shareOnDiscord;
window.shareOnLine = shareOnLine;
window.copyShareUrl = copyShareUrl;
window.addShareButtonsToResultScreen = addShareButtonsToResultScreen;

// ========================================
// フローティングシェアボタン（全画面対応）
// ========================================

// コンパクトなシェアボタンHTMLを生成
function createCompactShareButtons() {
  return `
    <div class="floating-share-container" id="floating-share">
      <button class="floating-share-toggle" onclick="toggleFloatingShare()" aria-label="Share menu">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
        </svg>
        <span class="share-text">シェア</span>
      </button>
      <div class="floating-share-menu" id="floating-share-menu">
        <button class="floating-share-btn twitter" onclick="shareOnTwitter()" title="X (Twitter)でシェア">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>X</span>
        </button>
        <button class="floating-share-btn discord" onclick="shareOnDiscord()" title="Discordでシェア">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          <span>Discord</span>
        </button>
        <button class="floating-share-btn line" onclick="shareOnLine()" title="LINEでシェア">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19.365 9.863c.349 0 .63.285.63.631c0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63c0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63c0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596c-.064.021-.133.031-.199.031c-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629c-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595c.06-.023.136-.033.194-.033c.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63c.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63c.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63c.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63c0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608c.391.082.923.258 1.058.59c.12.301.079.771.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645c1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
          <span>LINE</span>
        </button>
        <button class="floating-share-btn copy" onclick="copyShareUrl()" title="リンクをコピー">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
          <span>コピー</span>
        </button>
      </div>
    </div>
  `;
}

// フローティングシェアメニューの開閉
function toggleFloatingShare() {
  const menu = document.getElementById('floating-share-menu');
  const container = document.getElementById('floating-share');
  
  if (menu && container) {
    container.classList.toggle('active');
  }
}

// フローティングシェアボタンを追加
function addFloatingShareButton() {
  // 既存のフローティングボタンを削除
  const existing = document.getElementById('floating-share');
  if (existing) {
    existing.remove();
  }
  
  // 新しいフローティングボタンを追加
  document.body.insertAdjacentHTML('beforeend', createCompactShareButtons());
  console.log('✅ フローティングシェアボタンを追加しました');
}

// フローティングシェアボタンのスタイルを追加
function addFloatingShareStyles() {
  if (!document.getElementById('floating-share-styles')) {
    const style = document.createElement('style');
    style.id = 'floating-share-styles';
    style.textContent = `
      .floating-share-container {
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 9998;
      }
      
      .floating-share-toggle {
        min-width: 100px;
        height: 48px;
        padding: 0 16px;
        border-radius: 24px;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
        border: none;
        color: white;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      
      .floating-share-toggle svg {
        flex-shrink: 0;
      }
      
      .floating-share-toggle .share-text {
        white-space: nowrap;
      }
      
      .floating-share-toggle:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      }
      
      .floating-share-menu {
        position: absolute;
        bottom: 60px;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        opacity: 0;
        pointer-events: none;
        transform: translateY(10px);
        transition: all 0.3s ease;
      }
      
      .floating-share-container.active .floating-share-menu {
        opacity: 1;
        pointer-events: all;
        transform: translateY(0);
      }
      
      .floating-share-btn {
        min-width: 100px;
        height: 40px;
        padding: 0 12px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        color: white;
        font-size: 13px;
        font-weight: 600;
      }
      
      .floating-share-btn svg {
        flex-shrink: 0;
      }
      
      .floating-share-btn span {
        white-space: nowrap;
      }
      
      .floating-share-btn:hover {
        transform: translateX(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      
      .floating-share-btn.twitter {
        background: linear-gradient(135deg, #1da1f2, #0d8bd9);
      }
      
      .floating-share-btn.discord {
        background: linear-gradient(135deg, #5865f2, #4752c4);
      }
      
      .floating-share-btn.line {
        background: linear-gradient(135deg, #00b900, #009900);
      }
      
      .floating-share-btn.copy {
        background: linear-gradient(135deg, #6c757d, #545b62);
      }
      
      /* モバイル対応 */
      @media (max-width: 768px) {
        .floating-share-container {
          bottom: 70px;
          right: 15px;
        }
        
        .floating-share-toggle {
          min-width: 90px;
          height: 44px;
          padding: 0 14px;
          font-size: 13px;
        }
        
        .floating-share-btn {
          min-width: 90px;
          height: 38px;
          padding: 0 10px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// グローバルに公開
window.toggleFloatingShare = toggleFloatingShare;

console.log('📤 share.js ロード完了 (v4)');
