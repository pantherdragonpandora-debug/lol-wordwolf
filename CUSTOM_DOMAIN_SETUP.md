// VALORANT デマーシアデータを LOL 形式に変換するスクリプト
// Node.js で実行: node convert-valorant-data.js

const fs = require('fs');

// 元のデータを読み込む
const valorantDemaciaData = require('./js/demacia-data-valorant.js');

// 変換関数
function convertToLOLFormat(data) {
  return data.map((item, index) => {
    // situations を文字列配列からオブジェクト配列に変換
    const situations = item.situations.map((sitText, sitIndex) => ({
      id: sitIndex + 1,
      text: sitText,
      difficulty: item.difficulty
    }));

    return {
      id: index + 1,
      text: item.phrase,
      character: item.character,
      situations: situations
    };
  });
}

// 変換実行
const converted = convertToLOLFormat(valorantDemaciaData);

// 新しいファイル内容を生成
const fileContent = `// ========================================
// デマーシアに心を込めて - VALORANTバージョン（LOL形式統一版）
// VALORANTの有名なセリフとシチュエーション
// ========================================

const valorantDemaciaData = {
  // セリフとシチュエーションのセット（60個）
  phrases: ${JSON.stringify(converted, null, 2)}
};

// ランダムに1つのセリフを取得する関数
function getRandomValorantPhrase() {
  const phrases = valorantDemaciaData.phrases;
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

// グローバルに公開（ブラウザ環境）
if (typeof window !== 'undefined') {
  window.valorantDemaciaData = valorantDemaciaData;
  window.getRandomValorantPhrase = getRandomValorantPhrase;
}

// モジュールとしてエクスポート（Node.js環境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { valorantDemaciaData, getRandomValorantPhrase };
}
`;

// ファイルに書き込み
fs.writeFileSync('./js/demacia-data-valorant-new.js', fileContent);

console.log('✅ 変換完了！新しいファイル: js/demacia-data-valorant-new.js');
console.log(`📊 変換されたデータ数: ${converted.length}`);
console.log(`📝 最初のエントリ例:`);
console.log(JSON.stringify(converted[0], null, 2));
