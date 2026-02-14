/**
 * バージョン管理とキャッシュクリア
 * 
 * 使い方：
 * 1. APP_VERSIONを更新する（例: '1.0.10' → '1.0.11'）
 * 2. ファイルを保存してデプロイ
 * 3. ユーザーがアクセスすると自動的にキャッシュがクリアされる
 */

// ========================================
// バージョン設定（更新時にここを変更）
// ========================================
const APP_VERSION = '1.0.11';

// ========================================
// バージョン管理システム
// ========================================
(function() {
  'use strict';
  
  const VERSION_KEY = 'esports_wordwolf_version';
  const LAST_CHECK_KEY = 'esports_wordwolf_last_check';
  const CHECK_INTERVAL = 1000 * 60 * 60; // 1時間ごとにチェック
  
  /**
   * バージョンチェックとキャッシュクリア
   */
  function checkAndClearCache() {
    const savedVersion = localStorage.getItem(VERSION_KEY);
    const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
    const now = Date.now();
    
    // 初回アクセスの場合
    if (!savedVersion) {
      console.log('🎮 Esports ワードウルフへようこそ！');
      console.log('📦 バージョン:', APP_VERSION);
      localStorage.setItem(VERSION_KEY, APP_VERSION);
      localStorage.setItem(LAST_CHECK_KEY, now);
      return;
    }
    
    // バージョンが異なる場合
    if (savedVersion !== APP_VERSION) {
      console.log('🔄 新バージョンが検出されました');
      console.log('📦 旧バージョン:', savedVersion, '→ 新バージョン:', APP_VERSION);
      console.log('🧹 キャッシュをクリアしています...');
      
      clearAllCaches().then(() => {
        console.log('✅ キャッシュクリア完了');
        
        // 言語設定を保持
        const lang = localStorage.getItem('selectedLanguage');
        
        // LocalStorageをクリア
        localStorage.clear();
        
        // 言語設定を復元
        if (lang) {
          localStorage.setItem('selectedLanguage', lang);
        }
        
        // 新バージョンを保存
        localStorage.setItem(VERSION_KEY, APP_VERSION);
        localStorage.setItem(LAST_CHECK_KEY, now);
        
        // 通知表示
        showUpdateNotification();
        
        // 1秒後にリロード
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      });
    } else {
      // 定期チェック（1時間ごと）
      if (!lastCheck || (now - parseInt(lastCheck)) > CHECK_INTERVAL) {
        console.log('🔍 バージョンチェック実行中...');
        localStorage.setItem(LAST_CHECK_KEY, now);
        
        // サーバーから最新バージョンを確認（オプション）
        checkServerVersion();
      }
    }
  }
  
  /**
   * すべてのキャッシュをクリア
   */
  async function clearAllCaches() {
    const promises = [];
    
    // Service Worker キャッシュ
    if ('caches' in window) {
      promises.push(
        caches.keys().then(names => {
          return Promise.all(
            names.map(name => {
              console.log('🗑️ キャッシュ削除:', name);
              return caches.delete(name);
            })
          );
        })
      );
    }
    
    // IndexedDB クリア（オプション）
    if ('indexedDB' in window) {
      promises.push(clearIndexedDB());
    }
    
    await Promise.all(promises);
  }
  
  /**
   * IndexedDBをクリア
   */
  function clearIndexedDB() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        resolve();
        return;
      }
      
      try {
        const dbs = ['firebaseLocalStorageDb', 'firestore'];
        let cleared = 0;
        
        dbs.forEach(dbName => {
          const request = indexedDB.deleteDatabase(dbName);
          request.onsuccess = () => {
            console.log('🗑️ IndexedDB削除:', dbName);
            cleared++;
            if (cleared === dbs.length) resolve();
          };
          request.onerror = () => {
            cleared++;
            if (cleared === dbs.length) resolve();
          };
        });
        
        // タイムアウト処理
        setTimeout(() => resolve(), 1000);
      } catch (e) {
        console.warn('IndexedDBクリアエラー:', e);
        resolve();
      }
    });
  }
  
  /**
   * サーバーから最新バージョンを確認（オプション）
   */
  function checkServerVersion() {
    // version.json をサーバーに配置すれば、動的にバージョンチェック可能
    fetch('version.json?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        if (data.version && data.version !== APP_VERSION) {
          console.log('🆕 サーバー上の新バージョン:', data.version);
          // 必要に応じてリロードを促す
          showUpdateAvailable(data.version);
        }
      })
      .catch(() => {
        // version.jsonが存在しない場合は無視
      });
  }
  
  /**
   * 更新通知を表示
   */
  function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #0bc6e3 0%, #0a9fb5 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>🎉</span>
        <span>アップデート完了！ v${APP_VERSION}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    // 3秒後に削除
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  /**
   * 新バージョン利用可能通知
   */
  function showUpdateAvailable(newVersion) {
    if (document.getElementById('update-banner')) return;
    
    const banner = document.createElement('div');
    banner.id = 'update-banner';
    banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #c89b3c 0%, #a67c2b 100%);
      color: #0a1428;
      padding: 1rem;
      text-align: center;
      z-index: 9999;
      font-weight: 600;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
    `;
    banner.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; gap: 1rem;">
        <span>🆕 新しいバージョン (${newVersion}) が利用可能です</span>
        <button onclick="location.reload(true)" style="
          background: rgba(10, 20, 40, 0.9);
          color: #c89b3c;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        ">更新</button>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: transparent;
          color: rgba(10, 20, 40, 0.7);
          border: none;
          padding: 0.5rem;
          cursor: pointer;
        ">×</button>
      </div>
    `;
    document.body.appendChild(banner);
  }
  
  // アニメーション定義
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // ページ読み込み時に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndClearCache);
  } else {
    checkAndClearCache();
  }
  
  // グローバルに公開（デバッグ用）
  window.clearAppCache = clearAllCaches;
  window.getAppVersion = () => APP_VERSION;
  
})();
