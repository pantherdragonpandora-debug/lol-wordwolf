// ========================================
// Firebase連携モジュール（LoLクイズ用）
// ========================================

// Firebase設定（実際の値は環境変数またはFirebaseコンソールから取得）
// ⚠️ 注意: この設定はダミーです。実際に使用する場合は、Firebaseプロジェクトを作成してください。
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE", // ← Firebaseコンソールから取得
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase設定が有効かチェック
function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" && 
           firebaseConfig.projectId !== "YOUR_PROJECT_ID";
}

// Firebase初期化状態
let firebaseInitialized = false;
let currentUser = null;

// ========================================
// Firebase初期化
// ========================================

function initializeFirebase() {
    try {
        // Firebase設定が有効かチェック
        if (!isFirebaseConfigured()) {
            console.warn('⚠️ Firebase設定が未完了です。ローカルストレージのみで動作します。');
            console.warn('💡 設定方法: README.mdの「Firebase設定手順」を参照してください。');
            updateAuthUI(false);
            hideAuthButtons(); // ログインボタンを非表示
            return false;
        }

        // Firebase SDKがロードされているか確認
        if (typeof firebase === 'undefined') {
            console.warn('⚠️ Firebase SDKが読み込まれていません。ローカルストレージのみで動作します。');
            hideAuthButtons();
            return false;
        }

        // Firebaseアプリの初期化（既に初期化されている場合はスキップ）
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log('✅ Firebase初期化完了');
        }

        firebaseInitialized = true;

        // 認証状態の監視
        firebase.auth().onAuthStateChanged((user) => {
            currentUser = user;
            if (user) {
                console.log(`✅ ユーザーログイン: ${user.displayName || user.email}`);
                updateAuthUI(true);
                // Firestoreからデータを同期
                syncFromFirestore();
            } else {
                console.log('ℹ️ ゲストモードで動作中（ローカルストレージのみ）');
                updateAuthUI(false);
            }
        });

        return true;
    } catch (error) {
        console.error('❌ Firebase初期化エラー:', error);
        console.warn('💡 Firebase設定を確認してください。ローカルストレージのみで動作します。');
        hideAuthButtons();
        return false;
    }
}

// ========================================
// Google認証
// ========================================

async function signInWithGoogle() {
    if (!firebaseInitialized || !isFirebaseConfigured()) {
        alert('Firebase設定が未完了です。\n\nログイン機能を使用するには、README.mdの「Firebase設定手順」を参照して、Firebaseプロジェクトを作成してください。\n\n設定なしでもゲームは遊べます（ローカルストレージで保存）。');
        return;
    }

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(`✅ Googleログイン成功: ${user.displayName}`);
        
        // ローカルデータをFirestoreに同期
        await syncToFirestore();
        
        return user;
    } catch (error) {
        console.error('❌ Googleログインエラー:', error);
        if (error.code === 'auth/popup-closed-by-user') {
            // ユーザーがポップアップを閉じた場合はアラートを表示しない
            console.log('ℹ️ ログインがキャンセルされました');
        } else {
            alert(`ログインに失敗しました: ${error.message}`);
        }
        return null;
    }
}

async function signOut() {
    if (!firebaseInitialized) {
        return;
    }

    try {
        await firebase.auth().signOut();
        console.log('✅ ログアウト完了');
    } catch (error) {
        console.error('❌ ログアウトエラー:', error);
    }
}

// ========================================
// Firestore同期
// ========================================

/**
 * ローカルデータをFirestoreに保存
 */
async function syncToFirestore() {
    if (!firebaseInitialized || !currentUser) {
        console.log('ℹ️ ログインしていないため、Firestoreへの同期をスキップします');
        return;
    }

    try {
        const db = firebase.firestore();
        const userDocRef = db.collection('users').doc(currentUser.uid);

        // ローカルストレージからデータを取得
        const localData = {
            gameData: JSON.parse(localStorage.getItem('lolQuizGameData') || '{}'),
            lastSyncedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Firestoreに保存
        await userDocRef.set(localData, { merge: true });
        console.log('✅ Firestoreへの同期完了');

        // UI更新
        showSyncStatus('同期済み', 'success');
    } catch (error) {
        console.error('❌ Firestoreへの同期エラー:', error);
        showSyncStatus('同期エラー', 'error');
    }
}

/**
 * FirestoreからローカルにデータをDL
 */
async function syncFromFirestore() {
    if (!firebaseInitialized || !currentUser) {
        console.log('ℹ️ ログインしていないため、Firestoreからの同期をスキップします');
        return;
    }

    try {
        const db = firebase.firestore();
        const userDocRef = db.collection('users').doc(currentUser.uid);
        const docSnap = await userDocRef.get();

        if (docSnap.exists) {
            const cloudData = docSnap.data();
            const localData = JSON.parse(localStorage.getItem('lolQuizGameData') || '{}');

            // ローカルとクラウドのデータをマージ（クラウドを優先）
            const mergedData = mergeGameData(localData, cloudData.gameData || {});

            // ローカルストレージに保存
            localStorage.setItem('lolQuizGameData', JSON.stringify(mergedData));
            console.log('✅ Firestoreからの同期完了');

            // UI更新
            showSyncStatus('同期済み', 'success');

            // ページをリロードしてUIを更新
            if (typeof updateUI === 'function') {
                updateUI();
            }
        } else {
            console.log('ℹ️ Firestoreにデータが存在しないため、ローカルデータを使用します');
            // 初回ログイン時：ローカルデータをクラウドに保存
            await syncToFirestore();
        }
    } catch (error) {
        console.error('❌ Firestoreからの同期エラー:', error);
        showSyncStatus('同期エラー', 'error');
    }
}

/**
 * ローカルとクラウドのデータをマージ
 */
function mergeGameData(localData, cloudData) {
    // より多くのポイント・コレクションを持つ方を優先
    const localPoints = localData.totalCorrectPoints || 0;
    const cloudPoints = cloudData.totalCorrectPoints || 0;

    const localCharacters = (localData.unlockedCharacters || []).length;
    const cloudCharacters = (cloudData.unlockedCharacters || []).length;

    // クラウドのポイントが多い、またはキャラクター数が多い場合はクラウドを優先
    if (cloudPoints > localPoints || cloudCharacters > localCharacters) {
        return cloudData;
    } else {
        return localData;
    }
}

// ========================================
// UI更新
// ========================================

function updateAuthUI(isLoggedIn) {
    const loginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('google-logout-btn');
    const syncBtn = document.getElementById('manual-sync-btn');
    const userInfo = document.getElementById('user-info');

    if (!loginBtn || !logoutBtn || !userInfo) {
        // UI要素が存在しない場合はスキップ
        return;
    }

    if (isLoggedIn && currentUser) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        if (syncBtn) syncBtn.style.display = 'inline-block';
        userInfo.textContent = `ログイン中: ${currentUser.displayName || currentUser.email}`;
        userInfo.style.display = 'block';
    } else {
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        if (syncBtn) syncBtn.style.display = 'none';
        userInfo.textContent = '';
        userInfo.style.display = 'none';
    }
}

// Firebase未設定時にログインボタンを非表示にする
function hideAuthButtons() {
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        authCard.style.display = 'none';
    }
}

function showSyncStatus(message, type = 'info') {
    const statusElement = document.getElementById('sync-status');
    if (!statusElement) {
        return;
    }

    statusElement.textContent = message;
    statusElement.className = `sync-status ${type}`;
    statusElement.style.display = 'block';

    // 3秒後に非表示
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 3000);
}

// ========================================
// 自動同期
// ========================================

/**
 * ゲームデータ変更時に自動でFirestoreに同期
 */
function enableAutoSync() {
    // localStorageの変更を監視（別のタブで変更された場合も検知）
    window.addEventListener('storage', (e) => {
        if (e.key === 'lolQuizGameData' && currentUser) {
            console.log('ℹ️ ローカルデータが変更されました。Firestoreに同期します...');
            syncToFirestore();
        }
    });

    // 定期的な同期（5分ごと）
    setInterval(() => {
        if (currentUser) {
            syncToFirestore();
        }
    }, 5 * 60 * 1000); // 5分
}

// ========================================
// 手動同期ボタン
// ========================================

function setupSyncButton() {
    const syncButton = document.getElementById('manual-sync-btn');
    if (syncButton) {
        syncButton.addEventListener('click', async () => {
            if (!currentUser) {
                alert('同期するにはログインしてください。');
                return;
            }

            syncButton.disabled = true;
            syncButton.textContent = '同期中...';

            await syncToFirestore();

            syncButton.disabled = false;
            syncButton.textContent = '手動同期';
        });
    }
}

// ========================================
// グローバル関数（HTML内のonclickから呼び出し可能）
// ========================================

window.handleGoogleLogin = async () => {
    await signInWithGoogle();
};

window.handleLogout = async () => {
    await signOut();
};

window.handleManualSync = async () => {
    if (!currentUser) {
        alert('同期するにはログインしてください。');
        return;
    }
    await syncToFirestore();
};

// ========================================
// 初期化（DOMContentLoaded時に実行）
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeFirebase();
        enableAutoSync();
        setupSyncButton();
    });
} else {
    // DOMがすでに読み込まれている場合
    initializeFirebase();
    enableAutoSync();
    setupSyncButton();
}
