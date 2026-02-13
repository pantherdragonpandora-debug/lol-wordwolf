// ========================================
// LOL お題データ
// ========================================
// ワードウルフで使用するLOL関連のお題ペアデータ

const wordData = {
  // チャンピオン（20ペア）
  champions: [
    { majority: 'ヤスオ', minority: 'ヨネ' },
    { majority: 'ジンクス', minority: 'ケイトリン' },
    { majority: 'リー・シン', minority: 'ブラインドモンク' },
    { majority: 'ルックス', minority: 'モルガナ' },
    { majority: 'ゼド', minority: 'シェン' },
    { majority: 'アッシュ', minority: 'セジュアニ' },
    { majority: 'ダリウス', minority: 'ドレイヴン' },
    { majority: 'ガレン', minority: 'ルクス' },
    { majority: 'カタリナ', minority: 'タロン' },
    { majority: 'アーリ', minority: 'イブリン' },
    { majority: 'エズリアル', minority: 'ルシアン' },
    { majority: 'ヴェイン', minority: 'カイサ' },
    { majority: 'ティーモ', minority: 'トリスターナ' },
    { majority: 'マスター・イー', minority: 'ワーウィック' },
    { majority: 'ブリッツクランク', minority: 'スレッシュ' },
    { majority: 'リヴェン', minority: 'イレリア' },
    { majority: 'ジャックス', minority: 'フィオラ' },
    { majority: 'マルファイト', minority: 'ガリオ' },
    { majority: 'アニー', minority: 'ブランド' },
    { majority: 'ソラカ', minority: 'ナミ' }
  ],
  
  // アイテム（15ペア）
  items: [
    { majority: 'インフィニティエッジ', minority: 'ストームレイザー' },
    { majority: 'トリニティフォース', minority: 'ディヴァインサンダラー' },
    { majority: 'ブラッククリーバー', minority: 'ステラックの篭手' },
    { majority: 'ガーディアンエンジェル', minority: 'ジョニャの砂時計' },
    { majority: 'ルーデンテンペスト', minority: 'リアンドリーの苦悶' },
    { majority: 'ラバドンデスキャップ', minority: 'ヴォイドスタッフ' },
    { majority: 'ブラッドサースター', minority: 'シールドボウ' },
    { majority: 'ガントレット', minority: 'サンファイアイージス' },
    { majority: 'ソーンメイル', minority: 'フローズンハート' },
    { majority: 'デッドマンプレート', minority: 'ランデュイン' },
    { majority: 'ウィッツエンド', minority: 'ブレードオブザルーインドキング' },
    { majority: 'ムーンストーンリニューアー', minority: 'シュレリアレクイエム' },
    { majority: 'ゴアドリンカー', minority: 'ストライドブレイカー' },
    { majority: 'クラーケンスレイヤー', minority: 'ゲイルフォース' },
    { majority: 'サポートアイテム', minority: 'ワードストーン' }
  ],
  
  // スキル・能力（15ペア）
  skills: [
    { majority: 'ブリンク', minority: 'ダッシュ' },
    { majority: 'スタン', minority: 'ルート' },
    { majority: 'ノックアップ', minority: 'ノックバック' },
    { majority: 'スロウ', minority: 'グラウンド' },
    { majority: 'サイレンス', minority: 'ディスアーム' },
    { majority: 'シールド', minority: 'バリア' },
    { majority: 'ライフスティール', minority: 'オムニヴァンプ' },
    { majority: 'クリティカル', minority: 'レーシング' },
    { majority: '物理防御', minority: '魔法防御' },
    { majority: '攻撃速度', minority: '移動速度' },
    { majority: 'マナ', minority: 'エナジー' },
    { majority: 'パッシブ', minority: 'アクティブ' },
    { majority: 'スキルショット', minority: 'ターゲット' },
    { majority: 'エリア攻撃', minority: '単体攻撃' },
    { majority: 'バフ', minority: 'デバフ' }
  ],
  
  // マップ・レーン（15ペア）
  map: [
    { majority: 'トップレーン', minority: 'ミッドレーン' },
    { majority: 'ボットレーン', minority: 'サポート' },
    { majority: 'ジャングル', minority: 'ロースター' },
    { majority: 'レッドバフ', minority: 'ブルーバフ' },
    { majority: 'ドラゴン', minority: 'バロン' },
    { majority: 'リフトヘラルド', minority: 'ボイド' },
    { majority: 'タワー', minority: 'インヒビター' },
    { majority: 'ネクサス', minority: 'クリスタル' },
    { majority: 'リバー', minority: 'ジャングル' },
    { majority: 'トライブッシュ', minority: 'ピクセルブッシュ' },
    { majority: 'ベースキャンプ', minority: 'ファウンテン' },
    { majority: 'マウンテンドラゴン', minority: 'クラウドドラゴン' },
    { majority: 'オーシャンドラゴン', minority: 'インファーナルドラゴン' },
    { majority: 'スカトル', minority: 'グロンプ' },
    { majority: 'ラプター', minority: 'ウルフ' }
  ],
  
  // スペル（8ペア）
  spells: [
    { majority: 'フラッシュ', minority: 'ゴースト' },
    { majority: 'イグナイト', minority: 'テレポート' },
    { majority: 'ヒール', minority: 'バリア' },
    { majority: 'クレンズ', minority: 'エグゾースト' },
    { majority: 'スマイト', minority: 'チャレンジャー' },
    { majority: 'クラリティ', minority: 'マーク' },
    { majority: '疾駆', minority: '俊敏' },
    { majority: 'バースト', minority: 'プロテクト' }
  ]
};

// カテゴリー名の定義
const categoryNames = {
  champions: 'チャンピオン',
  items: 'アイテム',
  skills: 'スキル・能力',
  map: 'マップ・レーン',
  spells: 'スペル'
};

// お題をランダムに選択する関数
function getRandomTopic(categories, gameType = 'lol') {
  // 選択されたカテゴリーからお題を集める
  let allTopics = [];
  
  // ゲームタイプに応じたデータを選択
  const dataSource = gameType === 'valorant' ? valorantData : wordData;
  
  if (categories.length === 0 || categories.includes('all')) {
    // すべてのカテゴリーから選択
    Object.values(dataSource).forEach(categoryData => {
      allTopics = allTopics.concat(categoryData);
    });
  } else {
    // 選択されたカテゴリーのみ
    categories.forEach(category => {
      if (dataSource[category]) {
        allTopics = allTopics.concat(dataSource[category]);
      }
    });
  }
  
  // ランダムに1つ選択
  const randomIndex = Math.floor(Math.random() * allTopics.length);
  return allTopics[randomIndex];
}
