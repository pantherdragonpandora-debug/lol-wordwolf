// ========================================
// ページビューカウンター
// ========================================
// Firebase Realtime Databaseを使用して訪問者数をカウント

(function() {
  'use strict';
  
  const PAGEVIEW_REF = 'site_stats/pageviews';
  
  /**
   * ページビューをカウント
   */
  async function countPageView() {
    try {
      const db = firebase.database();
      const pageviewRef = db.ref(PAGEVIEW_REF);
      
      // トランザクションで安全にカウントアップ
      await pageviewRef.transaction((currentValue) => {
        return (currentValue || 0) + 1;
      });
      
      console.log('✅ ページビューをカウントしました');
    } catch (error) {
      console.error('❌ ページビューカウントエラー:', error);
    }
  }
  
  /**
   * ページビュー数を取得して表示
   */
  function displayPageViews() {
    try {
      const db = firebase.database();
      const pageviewRef = db.ref(PAGEVIEW_REF);
      
      pageviewRef.on('value', (snapshot) => {
        const count = snapshot.val() || 0;
        const element = document.getElementById('pageview-count');
        
        if (element) {
          // 3桁カンマ区切りでフォーマット
          element.textContent = count.toLocaleString();
        }
      });
    } catch (error) {
      console.error('❌ ページビュー表示エラー:', error);
    }
  }
  
  /**
   * 初期化
   */
  function init() {
    // Firebaseが初期化されるまで待つ
    if (typeof firebase === 'undefined' || !firebase.database) {
      console.warn('⚠️ Firebaseが初期化されていません。1秒後に再試行...');
      setTimeout(init, 1000);
      return;
    }
    
    // ページビューをカウント
    countPageView();
    
    // ページビュー数を表示
    displayPageViews();
  }
  
  // DOMの読み込み完了後に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
