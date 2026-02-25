// ========================================
// Firebase 設定ファイル
// ========================================
// このファイルはFirebase Realtime Databaseに接続するための設定です

const firebaseConfig = {
  // 🔑 APIキー
  apiKey: "AIzaSyAVHCMGfXWAfIEZ7E93FKM_pQ7uz0hY3nE",
  
  // 🌐 認証ドメイン
  authDomain: "lol-word-wolf.firebaseapp.com",
  
  // 📊 データベースURL（重要！）
  databaseURL: "https://lol-word-wolf-default-rtdb.asia-southeast1.firebasedatabase.app",
  
  // 🆔 プロジェクトID
  projectId: "lol-word-wolf",
  
  // 💾 ストレージバケット
  storageBucket: "lol-word-wolf.firebasestorage.app",
  
  // 📧 メッセージ送信ID
  messagingSenderId: "535370778213",
  
  // 📱 アプリID
  appId: "1:535370778213:web:440df2e808fda1eea7288c",
  
  // 📈 測定ID
  measurementId: "G-KKNBV5DYM0"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);

// Realtime Database参照
const database = firebase.database();

// 接続状態の監視
const connectedRef = database.ref('.info/connected');
connectedRef.on('value', (snap) => {
  if (snap.val() === true) {
    console.log('✅ Firebase接続成功');
  } else {
    console.log('❌ Firebase接続失敗');
  }
});
