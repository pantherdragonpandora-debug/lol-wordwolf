// ========================================
// セキュリティ機能
// ========================================
// レート制限、入力サニタイゼーション、XSS対策

/**
 * レート制限クラス
 * 短時間の連続操作を防止
 */
class RateLimiter {
  constructor() {
    this.limits = new Map();
    this.blockedUntil = new Map();
  }
  
  /**
   * アクションの実行を許可するか確認
   * @param {string} action - アクション名
   * @param {number} cooldown - クールダウン時間（ミリ秒）
   * @param {number} maxAttempts - 最大試行回数（デフォルト: なし）
   * @param {number} blockDuration - ブロック時間（ミリ秒、デフォルト: 60000）
   * @returns {boolean} - 実行可能ならtrue
   */
  check(action, cooldown = 1000, maxAttempts = null, blockDuration = 60000) {
    const now = Date.now();
    
    // ブロック中かチェック
    const blockedUntil = this.blockedUntil.get(action);
    if (blockedUntil && now < blockedUntil) {
      const remainingSeconds = Math.ceil((blockedUntil - now) / 1000);
      console.warn(`⚠️ レート制限: ${action} は ${remainingSeconds}秒間ブロック中`);
      return false;
    }
    
    // ブロック期間が終了していたらリセット
    if (blockedUntil && now >= blockedUntil) {
      this.blockedUntil.delete(action);
      this.limits.delete(action);
    }
    
    const lastAction = this.limits.get(action) || { time: 0, count: 0 };
    
    // クールダウン中かチェック
    if (now - lastAction.time < cooldown) {
      if (maxAttempts) {
        lastAction.count++;
        this.limits.set(action, lastAction);
        
        // 最大試行回数を超えたらブロック
        if (lastAction.count >= maxAttempts) {
          this.blockedUntil.set(action, now + blockDuration);
          console.warn(`🚫 レート制限: ${action} が一時的にブロックされました（${blockDuration/1000}秒間）`);
        }
      }
      console.warn(`⚠️ レート制限: ${action} はクールダウン中（${cooldown}ms）`);
      return false;
    }
    
    // 実行を許可
    this.limits.set(action, { time: now, count: 0 });
    return true;
  }
  
  /**
   * アクションのクールダウンをリセット
   * @param {string} action - アクション名
   */
  reset(action) {
    this.limits.delete(action);
    this.blockedUntil.delete(action);
  }
  
  /**
   * すべてのクールダウンをリセット
   */
  resetAll() {
    this.limits.clear();
    this.blockedUntil.clear();
  }
}

/**
 * 入力サニタイゼーション
 * XSS攻撃を防止するために危険な文字を削除
 * @param {string} input - サニタイズする文字列
 * @param {number} maxLength - 最大長（デフォルト: 100）
 * @returns {string} - サニタイズされた文字列
 */
function sanitizeInput(input, maxLength = 100) {
  if (typeof input !== 'string') {
    console.warn('⚠️ sanitizeInput: 入力が文字列ではありません', typeof input);
    return '';
  }
  
  return input
    .trim()                           // 前後の空白を削除
    .replace(/[<>'"]/g, '')          // 危険な文字を削除
    .replace(/javascript:/gi, '')    // javascript: を削除
    .replace(/on\w+=/gi, '')         // イベントハンドラを削除
    .replace(/data:/gi, '')          // data: URLを削除
    .replace(/vbscript:/gi, '')      // vbscript: を削除
    .substring(0, maxLength);        // 最大長を制限
}

/**
 * HTMLエスケープ
 * HTMLタグをエスケープして表示用に変換
 * @param {string} text - エスケープする文字列
 * @returns {string} - エスケープされた文字列
 */
function escapeHtml(text) {
  if (typeof text !== 'string') {
    return '';
  }
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * ルームIDの検証
 * 6桁の数字のみ許可
 * @param {string} roomId - 検証するルームID
 * @returns {boolean} - 有効ならtrue
 */
function validateRoomId(roomId) {
  if (typeof roomId !== 'string') {
    return false;
  }
  
  // 6桁の数字のみ
  return /^\d{6}$/.test(roomId);
}

/**
 * プレイヤー名の検証
 * 1〜20文字、空白のみは不可
 * @param {string} name - 検証するプレイヤー名
 * @returns {boolean} - 有効ならtrue
 */
function validatePlayerName(name) {
  if (typeof name !== 'string') {
    return false;
  }
  
  const trimmed = name.trim();
  return trimmed.length >= 1 && trimmed.length <= 20;
}

/**
 * チャットメッセージの検証
 * 1〜500文字、空白のみは不可
 * @param {string} message - 検証するメッセージ
 * @returns {boolean} - 有効ならtrue
 */
function validateChatMessage(message) {
  if (typeof message !== 'string') {
    return false;
  }
  
  const trimmed = message.trim();
  return trimmed.length >= 1 && trimmed.length <= 500;
}

/**
 * Firebaseエラーのユーザーフレンドリーなメッセージへの変換
 * @param {Error} error - Firebaseエラー
 * @returns {string} - ユーザー向けメッセージ
 */
function getFriendlyErrorMessage(error) {
  const errorCode = error.code || '';
  
  const errorMessages = {
    'PERMISSION_DENIED': '権限がありません。ページを再読み込みしてください。',
    'NETWORK_ERROR': 'ネットワークエラーが発生しました。接続を確認してください。',
    'TIMEOUT': '接続がタイムアウトしました。もう一度お試しください。',
    'DATABASE_ERROR': 'データベースエラーが発生しました。',
  };
  
  for (const [key, message] of Object.entries(errorMessages)) {
    if (errorCode.includes(key) || error.message.includes(key)) {
      return message;
    }
  }
  
  // デフォルトメッセージ
  return 'エラーが発生しました。もう一度お試しください。';
}

/**
 * セキュアな乱数生成
 * @param {number} min - 最小値
 * @param {number} max - 最大値
 * @returns {number} - 乱数
 */
function secureRandom(min, max) {
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const randomBytes = new Uint8Array(bytesNeeded);
  
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(randomBytes);
    let randomValue = 0;
    for (let i = 0; i < bytesNeeded; i++) {
      randomValue = (randomValue << 8) + randomBytes[i];
    }
    return min + (randomValue % range);
  } else {
    // フォールバック: Math.random()
    console.warn('⚠️ Web Crypto APIが利用できません。Math.random()を使用します。');
    return min + Math.floor(Math.random() * range);
  }
}

/**
 * ログの安全な出力
 * 本番環境では機密情報をログに出力しない
 * @param {string} level - ログレベル（'info', 'warn', 'error'）
 * @param {string} message - メッセージ
 * @param {*} data - データ（オプション）
 */
function secureLog(level, message, data = null) {
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';
  
  if (isProduction && level === 'info') {
    // 本番環境ではinfoログを出力しない
    return;
  }
  
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  
  if (data) {
    console[level](logMessage, data);
  } else {
    console[level](logMessage);
  }
}

// ========================================
// グローバルに公開
// ========================================

window.rateLimiter = new RateLimiter();
window.sanitizeInput = sanitizeInput;
window.escapeHtml = escapeHtml;
window.validateRoomId = validateRoomId;
window.validatePlayerName = validatePlayerName;
window.validateChatMessage = validateChatMessage;
window.getFriendlyErrorMessage = getFriendlyErrorMessage;
window.secureRandom = secureRandom;
window.secureLog = secureLog;

console.log('✅ セキュリティ機能を初期化しました');
