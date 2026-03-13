/**
 * Firebase診断ツール
 * ブラウザのコンソールで使用可能なデバッグコマンド
 */

// グローバル診断関数を定義
window.diagnosisFirebase = async function() {
  console.log('🔬 Firebase診断を開始します...\n');
  
  // 1. Firebase接続状態
  console.log('1️⃣ Firebase接続状態を確認');
  try {
    const connectedRef = firebase.database().ref('.info/connected');
    const connectedSnap = await connectedRef.once('value');
    const isConnected = connectedSnap.val();
    console.log(`   ${isConnected ? '✅' : '❌'} 接続状態:`, isConnected ? '接続済み' : '切断');
  } catch (error) {
    console.error('   ❌ エラー:', error.message);
  }
  
  // 2. 読み取り権限テスト
  console.log('\n2️⃣ 読み取り権限をテスト');
  try {
    const testRef = firebase.database().ref('rooms');
    const snapshot = await testRef.limitToFirst(1).once('value');
    console.log('   ✅ rooms/ の読み取り: 成功');
    console.log('   📊 データ件数:', snapshot.numChildren());
  } catch (error) {
    console.error('   ❌ rooms/ の読み取り: 失敗');
    console.error('   エラー:', error.message);
  }
  
  try {
    const testRef = firebase.database().ref('demacia_rooms');
    const snapshot = await testRef.limitToFirst(1).once('value');
    console.log('   ✅ demacia_rooms/ の読み取り: 成功');
    console.log('   📊 データ件数:', snapshot.numChildren());
  } catch (error) {
    console.error('   ❌ demacia_rooms/ の読み取り: 失敗');
    console.error('   エラー:', error.message);
  }
  
  // 3. 書き込み権限テスト
  console.log('\n3️⃣ 書き込み権限をテスト');
  const testRoomId = 'TEST' + Date.now();
  
  try {
    const testRef = firebase.database().ref(`rooms/${testRoomId}`);
    await testRef.set({ test: true, createdAt: Date.now() });
    console.log('   ✅ rooms/ の書き込み: 成功');
    // テストデータを削除
    await testRef.remove();
    console.log('   ✅ テストデータを削除');
  } catch (error) {
    console.error('   ❌ rooms/ の書き込み: 失敗');
    console.error('   エラー:', error.message);
    console.error('   💡 Firebaseセキュリティルールを確認してください');
  }
  
  try {
    const testRef = firebase.database().ref(`demacia_rooms/${testRoomId}`);
    await testRef.set({ test: true, createdAt: Date.now() });
    console.log('   ✅ demacia_rooms/ の書き込み: 成功');
    // テストデータを削除
    await testRef.remove();
    console.log('   ✅ テストデータを削除');
  } catch (error) {
    console.error('   ❌ demacia_rooms/ の書き込み: 失敗');
    console.error('   エラー:', error.message);
    console.error('   💡 Firebaseセキュリティルールを確認してください');
  }
  
  // 4. 既存ルームの一覧
  console.log('\n4️⃣ 既存ルームを確認');
  try {
    const roomsRef = firebase.database().ref('rooms');
    const roomsSnap = await roomsRef.once('value');
    const rooms = roomsSnap.val();
    console.log('   📦 ワードウルフルーム数:', roomsSnap.numChildren());
    if (rooms) {
      Object.keys(rooms).forEach(roomId => {
        const room = rooms[roomId];
        console.log(`      - ${roomId}: ${room.host} (${room.gameState})`);
      });
    }
  } catch (error) {
    console.error('   ❌ エラー:', error.message);
  }
  
  try {
    const demaciaRef = firebase.database().ref('demacia_rooms');
    const demaciaSnap = await demaciaRef.once('value');
    const demaciaRooms = demaciaSnap.val();
    console.log('   📦 デマーシアルーム数:', demaciaSnap.numChildren());
    if (demaciaRooms) {
      Object.keys(demaciaRooms).forEach(roomId => {
        const room = demaciaRooms[roomId];
        console.log(`      - ${roomId}: ${room.host} (${room.gameState})`);
      });
    }
  } catch (error) {
    console.error('   ❌ エラー:', error.message);
  }
  
  // 5. 推奨設定
  console.log('\n5️⃣ Firebaseセキュリティルール（推奨設定）');
  console.log(`
{
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
}
  `);
  
  console.log('📋 設定方法:');
  console.log('1. https://console.firebase.google.com/ にアクセス');
  console.log('2. プロジェクト「lol-word-wolf」を選択');
  console.log('3. Realtime Database → ルール');
  console.log('4. 上記のJSONをコピーして貼り付け');
  console.log('5. 「公開」ボタンをクリック\n');
  
  console.log('✅ 診断完了！\n');
};

// 特定のルームを確認する関数
window.checkRoom = async function(roomId) {
  console.log('🔍 ルームを確認:', roomId);
  
  // ワードウルフルームを確認
  const wordwolfRef = firebase.database().ref(`rooms/${roomId}`);
  const wordwolfSnap = await wordwolfRef.once('value');
  console.log('\n📦 ワードウルフルーム (rooms/' + roomId + '):');
  console.log('   存在:', wordwolfSnap.exists());
  if (wordwolfSnap.exists()) {
    const data = wordwolfSnap.val();
    console.log('   データ:', data);
    console.log('   ゲームタイプ:', data.settings?.gameType);
    console.log('   ホスト:', data.host);
    console.log('   ゲーム状態:', data.gameState);
    console.log('   プレイヤー数:', Object.keys(data.players || {}).length);
  }
  
  // デマーシアルームを確認
  const demaciaRef = firebase.database().ref(`demacia_rooms/${roomId}`);
  const demaciaSnap = await demaciaRef.once('value');
  console.log('\n📦 デマーシアルーム (demacia_rooms/' + roomId + '):');
  console.log('   存在:', demaciaSnap.exists());
  if (demaciaSnap.exists()) {
    const data = demaciaSnap.val();
    console.log('   データ:', data);
    console.log('   ゲームタイプ:', data.settings?.gameType);
    console.log('   ホスト:', data.host);
    console.log('   ゲーム状態:', data.gameState);
    console.log('   プレイヤー数:', Object.keys(data.players || {}).length);
  }
  
  if (!wordwolfSnap.exists() && !demaciaSnap.exists()) {
    console.log('\n❌ ルームが見つかりません');
    console.log('💡 ルームIDが正しいか確認してください');
  }
  
  // 現在選択中のモードとの互換性チェック
  console.log('\n🔍 現在の選択状態:');
  console.log('   ゲームモード:', window.selectedGameMode || '未選択');
  console.log('   ゲームタイプ:', window.selectedGameType || '未選択');
  
  if (window.selectedGameMode) {
    if (window.selectedGameMode === 'wordwolf' && wordwolfSnap.exists()) {
      console.log('   ✅ ワードウルフモードで参加可能');
    } else if (window.selectedGameMode === 'demacia' && demaciaSnap.exists()) {
      console.log('   ✅ デマーシアモードで参加可能');
    } else if (window.selectedGameMode === 'wordwolf' && demaciaSnap.exists()) {
      console.log('   ❌ モード不一致: ワードウルフを選択中だがデマーシアルーム');
    } else if (window.selectedGameMode === 'demacia' && wordwolfSnap.exists()) {
      console.log('   ❌ モード不一致: デマーシアを選択中だがワードウルフルーム');
    }
  } else {
    console.log('   ⚠️ ゲームモードが選択されていません');
  }
};

// すべてのルームを削除する関数（デバッグ用）
window.clearAllRooms = async function() {
  const confirm = window.confirm('すべてのルームを削除しますか？この操作は取り消せません。');
  if (!confirm) {
    console.log('キャンセルされました');
    return;
  }
  
  console.log('🧹 すべてのルームを削除中...');
  
  try {
    await firebase.database().ref('rooms').remove();
    console.log('✅ ワードウルフルームを削除');
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
  
  try {
    await firebase.database().ref('demacia_rooms').remove();
    console.log('✅ デマーシアルームを削除');
  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
  
  console.log('✅ 完了');
};

// ヘルプメッセージ
console.log('🔧 Firebase診断ツールが利用可能です！\n');
console.log('使い方:');
console.log('  diagnosisFirebase()     - Firebase接続と権限を診断');
console.log('  checkRoom("123456")     - 特定のルームを確認');
console.log('  clearAllRooms()         - すべてのルームを削除（デバッグ用）\n');
