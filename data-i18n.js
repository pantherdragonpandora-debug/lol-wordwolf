// ========================================
// VALORANT お題データ
// ========================================
// ワードウルフで使用するVALORANT関連のお題ペアデータ

const valorantWordData = {
  // エージェント（25ペア）
  agents: [
    { majority: 'ジェット', minority: 'レイズ' },
    { majority: 'セージ', minority: 'キルジョイ' },
    { majority: 'オーメン', minority: 'ブリムストーン' },
    { majority: 'フェニックス', minority: 'レイナ' },
    { majority: 'ソーヴァ', minority: 'スカイ' },
    { majority: 'ヴァイパー', minority: 'アストラ' },
    { majority: 'サイファー', minority: 'チェンバー' },
    { majority: 'ブリーチ', minority: 'KAY/O' },
    { majority: 'ヨル', minority: 'ネオン' },
    { majority: 'アストラ', minority: 'ハーバー' },
    { majority: 'フェイド', minority: 'ゲッコー' },
    { majority: 'デッドロック', minority: 'ISO' },
    { majority: 'ジェット', minority: 'ネオン' },
    { majority: 'セージ', minority: 'スカイ' },
    { majority: 'ブリムストーン', minority: 'ヴァイパー' },
    { majority: 'レイナ', minority: 'ヨル' },
    { majority: 'サイファー', minority: 'キルジョイ' },
    { majority: 'ソーヴァ', minority: 'フェイド' },
    { majority: 'ブリーチ', minority: 'デッドロック' },
    { majority: 'チェンバー', minority: 'ジェット' },
    { majority: 'ハーバー', minority: 'オーメン' },
    { majority: 'ゲッコー', minority: 'スカイ' },
    { majority: 'ISO', minority: 'ヨル' },
    { majority: 'フェニックス', minority: 'KAY/O' },
    { majority: 'レイズ', minority: 'キルジョイ' }
  ],
  
  // 武器（15ペア）
  weapons: [
    { majority: 'ヴァンダル', minority: 'ファントム' },
    { majority: 'ゴースト', minority: 'シェリフ' },
    { majority: 'オペレーター', minority: 'マーシャル' },
    { majority: 'スペクター', minority: 'スティンガー' },
    { majority: 'ガーディアン', minority: 'ブルドッグ' },
    { majority: 'フレンジー', minority: 'クラシック' },
    { majority: 'ジャッジ', minority: 'バッキー' },
    { majority: 'オーディン', minority: 'アレス' },
    { majority: 'ヴァンダル', minority: 'ガーディアン' },
    { majority: 'ファントム', minority: 'ブルドッグ' },
    { majority: 'シェリフ', minority: 'マーシャル' },
    { majority: 'スペクター', minority: 'バッキー' },
    { majority: 'オペレーター', minority: 'ガーディアン' },
    { majority: 'オーディン', minority: 'ジャッジ' },
    { majority: 'フレンジー', minority: 'ゴースト' }
  ],
  
  // アビリティ（15ペア）
  abilities: [
    { majority: 'フラッシュ', minority: 'スタン' },
    { majority: 'スモーク', minority: 'ウォール' },
    { majority: 'モロトフ', minority: 'スロー' },
    { majority: 'ダッシュ', minority: 'テレポート' },
    { majority: 'ヒール', minority: 'リザレクト' },
    { majority: 'リコンダート', minority: 'ドローン' },
    { majority: 'トラップワイヤー', minority: 'アラームボット' },
    { majority: 'アフターショック', minority: 'フォルトライン' },
    { majority: 'ブレードストーム', minority: 'ショータイム' },
    { majority: 'ディメンションドリフト', minority: 'ゲートクラッシュ' },
    { majority: 'ツアー・ド・フォース', minority: 'レディアント' },
    { majority: 'ヴァイパーズピット', minority: 'コズミックデバイド' },
    { majority: 'ハンターズフューリー', minority: 'シーカー' },
    { majority: 'ナノスワーム', minority: 'スネークバイト' },
    { majority: 'サイバーケージ', minority: 'トキシックスクリーン' }
  ],
  
  // マップ（12ペア）
  maps: [
    { majority: 'ヘイヴン', minority: 'ロータス' },
    { majority: 'バインド', minority: 'スプリット' },
    { majority: 'アセント', minority: 'アイスボックス' },
    { majority: 'ブリーズ', minority: 'フラクチャー' },
    { majority: 'パール', minority: 'サンセット' },
    { majority: 'ヘイヴン', minority: 'アセント' },
    { majority: 'バインド', minority: 'フラクチャー' },
    { majority: 'スプリット', minority: 'アイスボックス' },
    { majority: 'ブリーズ', minority: 'パール' },
    { majority: 'ロータス', minority: 'サンセット' },
    { majority: 'Aサイト', minority: 'Bサイト' },
    { majority: 'ミッド', minority: 'ロング' }
  ],
  
  // ゲーム用語（10ペア）
  terms: [
    { majority: 'エコラウンド', minority: 'フォースバイ' },
    { majority: 'フルバイ', minority: 'セミバイ' },
    { majority: 'プラント', minority: 'ディフューズ' },
    { majority: 'ピーク', minority: 'ホールド' },
    { majority: 'スプリット', minority: 'スタック' },
    { majority: 'フェイク', minority: 'ラッシュ' },
    { majority: 'ローテート', minority: 'リテイク' },
    { majority: 'トレード', minority: 'ベイト' },
    { majority: 'クロスファイア', minority: 'ワンウェイ' },
    { majority: 'タップ撃ち', minority: 'スプレー' }
  ]
};

// すべてのお題を配列にまとめる関数
function getAllValorantWords() {
  return [
    ...valorantWordData.agents,
    ...valorantWordData.weapons,
    ...valorantWordData.abilities,
    ...valorantWordData.maps,
    ...valorantWordData.terms
  ];
}

// カテゴリー別にお題を取得する関数
function getValorantWordsByCategories(categories) {
  let words = [];
  
  if (categories.includes('agents')) {
    words = words.concat(valorantWordData.agents);
  }
  if (categories.includes('weapons')) {
    words = words.concat(valorantWordData.weapons);
  }
  if (categories.includes('abilities')) {
    words = words.concat(valorantWordData.abilities);
  }
  if (categories.includes('maps')) {
    words = words.concat(valorantWordData.maps);
  }
  if (categories.includes('terms')) {
    words = words.concat(valorantWordData.terms);
  }
  
  return words;
}
