// ========================================
// SNSシェア機能
// ========================================

/**
 * シェア用テキストを生成
 * @param {string} type - シェアタイプ（'result', 'character', 'collection'）
 * @param {object} data - シェアするデータ
 * @returns {object} { text: string, url: string }
 */
function generateShareText(type, data = {}) {
    const baseUrl = window.location.origin + window.location.pathname;
    let text = '';
    
    const translations = {
        ja: {
            result: `LoLセリフ当てクイズで${data.score}問正解！🎮\n現在のポイント: ${data.totalPoints}pt\n獲得チケット: ${data.tickets}枚 🎫`,
            character: `★${data.rarity} ${data.rarityName}のキャラクターをゲット！✨\nID: ${data.characterId}\nコレクション: ${data.collectionCount}/${data.totalPossible}`,
            collection: `LoLクイズキャラクターコレクション 📊\n所持数: ${data.collectionCount}/${data.totalPossible} (${data.percentage}%)\n★5: ${data.rarity5} | ★4: ${data.rarity4} | ★3: ${data.rarity3}`,
            hashtag: '\n#LoLクイズ #LeagueOfLegends #LoL'
        },
        en: {
            result: `I scored ${data.score} in LoL Quote Quiz! 🎮\nCurrent Points: ${data.totalPoints}pt\nTickets: ${data.tickets} 🎫`,
            character: `Got a ★${data.rarity} ${data.rarityName} character! ✨\nID: ${data.characterId}\nCollection: ${data.collectionCount}/${data.totalPossible}`,
            collection: `LoL Quiz Character Collection 📊\nTotal: ${data.collectionCount}/${data.totalPossible} (${data.percentage}%)\n★5: ${data.rarity5} | ★4: ${data.rarity4} | ★3: ${data.rarity3}`,
            hashtag: '\n#LoLQuiz #LeagueOfLegends #LoL'
        },
        ko: {
            result: `LoL 대사 퀴즈에서 ${data.score}문제 정답! 🎮\n현재 포인트: ${data.totalPoints}pt\n티켓: ${data.tickets}장 🎫`,
            character: `★${data.rarity} ${data.rarityName} 캐릭터 획득! ✨\nID: ${data.characterId}\n컬렉션: ${data.collectionCount}/${data.totalPossible}`,
            collection: `LoL 퀴즈 캐릭터 컬렉션 📊\n보유: ${data.collectionCount}/${data.totalPossible} (${data.percentage}%)\n★5: ${data.rarity5} | ★4: ${data.rarity4} | ★3: ${data.rarity3}`,
            hashtag: '\n#LoL퀴즈 #리그오브레전드 #LoL'
        },
        zh: {
            result: `LoL台词测验答对${data.score}题！🎮\n当前积分：${data.totalPoints}pt\n券：${data.tickets}张 🎫`,
            character: `获得★${data.rarity} ${data.rarityName}角色！✨\nID: ${data.characterId}\n收藏：${data.collectionCount}/${data.totalPossible}`,
            collection: `LoL测验角色收藏 📊\n拥有：${data.collectionCount}/${data.totalPossible} (${data.percentage}%)\n★5: ${data.rarity5} | ★4: ${data.rarity4} | ★3: ${data.rarity3}`,
            hashtag: '\n#LoL测验 #英雄联盟 #LoL'
        }
    };
    
    const lang = getCurrentLanguage();
    const t = translations[lang] || translations.ja;
    
    text = t[type] + t.hashtag;
    
    return {
        text: text,
        url: baseUrl
    };
}

/**
 * Twitterでシェア
 */
function shareOnTwitter(type, data) {
    const { text, url } = generateShareText(type, data);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
}

/**
 * LINEでシェア
 */
function shareOnLine(type, data) {
    const { text, url } = generateShareText(type, data);
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(lineUrl, '_blank', 'width=550,height=420');
}

/**
 * Facebookでシェア
 */
function shareOnFacebook(type, data) {
    const { url } = generateShareText(type, data);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
}

/**
 * クリップボードにコピー
 */
async function copyToClipboard(type, data) {
    const { text, url } = generateShareText(type, data);
    const fullText = `${text}\n${url}`;
    
    try {
        await navigator.clipboard.writeText(fullText);
        showCopySuccess();
        return true;
    } catch (err) {
        console.error('❌ クリップボードへのコピーに失敗:', err);
        // フォールバック: テキストエリアを使用
        const textArea = document.createElement('textarea');
        textArea.value = fullText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopySuccess();
            return true;
        } catch (err2) {
            document.body.removeChild(textArea);
            alert('コピーに失敗しました。');
            return false;
        }
    }
}

/**
 * コピー成功時のフィードバック
 */
function showCopySuccess() {
    const copyBtn = document.querySelector('.share-btn-copy');
    if (copyBtn) {
        const originalText = copyBtn.innerHTML;
        copyBtn.classList.add('copied', 'success');
        copyBtn.innerHTML = '<span class="share-icon">✓</span><span>コピー完了！</span>';
        
        setTimeout(() => {
            copyBtn.classList.remove('copied', 'success');
            copyBtn.innerHTML = originalText;
        }, 2000);
    }
}

/**
 * シェアコンテナを生成
 * @param {string} containerId - シェアボタンを配置するコンテナのID
 * @param {string} type - シェアタイプ
 * @param {object} data - シェアするデータ
 */
function createShareButtons(containerId, type, data) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`⚠️ シェアコンテナが見つかりません: ${containerId}`);
        return;
    }
    
    const lang = getCurrentLanguage();
    const titles = {
        ja: '結果をシェア',
        en: 'Share Result',
        ko: '결과 공유',
        zh: '分享结果'
    };
    
    const buttonLabels = {
        ja: { twitter: 'X (Twitter)', line: 'LINE', facebook: 'Facebook', copy: 'コピー' },
        en: { twitter: 'X (Twitter)', line: 'LINE', facebook: 'Facebook', copy: 'Copy' },
        ko: { twitter: 'X (Twitter)', line: 'LINE', facebook: 'Facebook', copy: '복사' },
        zh: { twitter: 'X (Twitter)', line: 'LINE', facebook: 'Facebook', copy: '复制' }
    };
    
    const title = titles[lang] || titles.ja;
    const labels = buttonLabels[lang] || buttonLabels.ja;
    
    container.innerHTML = `
        <div class="share-container">
            <div class="share-title">${title}</div>
            <div class="share-buttons">
                <button class="share-btn share-btn-twitter" onclick="shareOnTwitter('${type}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">
                    <span class="share-icon">🐦</span>
                    <span>${labels.twitter}</span>
                </button>
                <button class="share-btn share-btn-line" onclick="shareOnLine('${type}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">
                    <span class="share-icon">💬</span>
                    <span>${labels.line}</span>
                </button>
                <button class="share-btn share-btn-facebook" onclick="shareOnFacebook('${type}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">
                    <span class="share-icon">📘</span>
                    <span>${labels.facebook}</span>
                </button>
                <button class="share-btn share-btn-copy" onclick="copyToClipboard('${type}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">
                    <span class="share-icon">📋</span>
                    <span>${labels.copy}</span>
                </button>
            </div>
        </div>
    `;
}

/**
 * 現在の言語を取得
 */
function getCurrentLanguage() {
    return window.currentLanguage || 'ja';
}

// ========================================
// 自動シェアボタン生成
// ========================================

/**
 * クイズ結果画面にシェアボタンを追加
 */
function addShareButtonsToResult() {
    const resultScreen = document.getElementById('result-screen');
    if (!resultScreen) return;
    
    // シェアコンテナがない場合は作成
    let shareContainer = document.getElementById('result-share-container');
    if (!shareContainer) {
        shareContainer = document.createElement('div');
        shareContainer.id = 'result-share-container';
        
        const container = resultScreen.querySelector('.container');
        const nextButton = resultScreen.querySelector('.btn-primary');
        if (container && nextButton) {
            container.insertBefore(shareContainer, nextButton);
        }
    }
}

/**
 * キャラクター生成画面にシェアボタンを追加
 */
function addShareButtonsToGeneration() {
    const generationScreen = document.getElementById('generation-screen');
    if (!generationScreen) return;
    
    let shareContainer = document.getElementById('generation-share-container');
    if (!shareContainer) {
        shareContainer = document.createElement('div');
        shareContainer.id = 'generation-share-container';
        
        const container = generationScreen.querySelector('.container');
        const downloadBtn = generationScreen.querySelector('.btn-primary');
        if (container && downloadBtn) {
            container.insertBefore(shareContainer, downloadBtn.parentElement);
        }
    }
}

/**
 * コレクション画面にシェアボタンを追加
 */
function addShareButtonsToCollection() {
    const collectionScreen = document.getElementById('collection-screen');
    if (!collectionScreen) return;
    
    let shareContainer = document.getElementById('collection-share-container');
    if (!shareContainer) {
        shareContainer = document.createElement('div');
        shareContainer.id = 'collection-share-container';
        
        const container = collectionScreen.querySelector('.container');
        const statsContainer = document.getElementById('rarity-stats-container');
        if (container && statsContainer) {
            container.insertBefore(shareContainer, statsContainer.nextSibling);
        }
    }
}

console.log('✅ SNSシェア機能が読み込まれました');
