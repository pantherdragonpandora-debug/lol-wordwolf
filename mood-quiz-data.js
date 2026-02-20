// ========================================
// ヴォイドに届くは光か闇か - ゲームクラス（簡易版）
// ========================================

console.log('🔥 void-game-simple.js 読み込み開始');

// 最もシンプルなVoidGameクラス
class VoidGameSimple {
  constructor(roomId, gameType) {
    console.log('✅ VoidGameSimpleコンストラクタ呼び出し');
    this.roomId = roomId;
    this.gameType = gameType;
  }
}

console.log('🔥 VoidGameSimpleクラス定義完了');
console.log('🔥 typeof VoidGameSimple:', typeof VoidGameSimple);

// グローバルにエクスポート
window.VoidGameSimple = VoidGameSimple;
window.VoidGame = VoidGameSimple; // 互換性のため

console.log('✅ window.VoidGame に VoidGameSimple をエクスポートしました');
console.log('✅ typeof window.VoidGame:', typeof window.VoidGame);

// テスト
try {
  const test = new window.VoidGame('test', 'lol');
  console.log('✅ テストインスタンス作成成功:', test);
} catch (e) {
  console.error('❌ テストインスタンス作成失敗:', e);
}
