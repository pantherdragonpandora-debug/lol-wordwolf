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
  ],
  
  // シチュエーション（40ペア）
  situations: [
    // 追いかけられている時
    { majority: 'ガレンに追いかけられている時', minority: 'ヤスオに追いかけられている時' },
    { majority: 'ダリウスに追いかけられている時', minority: 'ドレイヴンに追いかけられている時' },
    { majority: 'ゼドに追いかけられている時', minority: 'タロンに追いかけられている時' },
    { majority: 'ジンクスに追いかけられている時', minority: 'ケイトリンに追いかけられている時' },
    { majority: 'ティーモに追いかけられている時', minority: 'トゥイッチに追いかけられている時' },
    
    // ウルトを使った時
    { majority: 'ビクターのウルトを打った時', minority: 'オレリオンソルのウルトを打った時' },
    { majority: 'ジンのウルトを打った時', minority: 'ゼラスのウルトを打った時' },
    { majority: 'ルクスのウルトを打った時', minority: 'エズリアルのウルトを打った時' },
    { majority: 'アッシュのウルトを打った時', minority: 'ジンクスのウルトを打った時' },
    { majority: 'マルファイトのウルトを打った時', minority: 'ガリオのウルトを打った時' },
    { majority: 'カタリナのウルトを打った時', minority: 'サミーラのウルトを打った時' },
    { majority: 'ヤスオのウルトを打った時', minority: 'ヨネのウルトを打った時' },
    
    // 考えること
    { majority: 'リコール中に考えること', minority: 'スタート時に考えること' },
    { majority: 'デス後に考えること', minority: 'キル後に考えること' },
    { majority: 'タワー下で考えること', minority: 'プッシュ中に考えること' },
    { majority: 'ドラゴン前に考えること', minority: 'バロン前に考えること' },
    { majority: '集団戦前に考えること', minority: 'レーン戦中に考えること' },
    { majority: 'ジャングルに入る時に考えること', minority: 'ガンクされる時に考えること' },
    
    // やってしまったこと
    { majority: 'タワーダイブして失敗した時', minority: 'フラッシュ先に壁があった時' },
    { majority: 'スマイトミスった時', minority: 'イグナイトミスった時' },
    { majority: 'ウルト空振りした時', minority: 'Qを空振りした時' },
    { majority: 'タワーに突っ込んでしまった時', minority: 'ファウンテンに突っ込んでしまった時' },
    { majority: 'ワードを置き忘れた時', minority: 'TPを使い忘れた時' },
    
    // ゲーム状況
    { majority: '1キル5デスの時の言い訳', minority: '0キル10デスの時の言い訳' },
    { majority: 'ソロキルされた時の言い訳', minority: 'ガンクされた時の言い訳' },
    { majority: 'トップがフィードしてる時', minority: 'ボットがフィードしてる時' },
    { majority: 'ジャングルが来ない時', minority: 'サポートがローミングしてる時' },
    { majority: '20分で10キル差ついた時', minority: '10分で5タワー差ついた時' },
    
    // チャンピオン特有のシチュエーション
    { majority: 'ヤスオで0/10/0の時', minority: 'ティーモで10/0/0の時' },
    { majority: 'ブリッツのフックが当たった時', minority: 'スレッシュのフックが当たった時' },
    { majority: 'アニーのスタンを食らった時', minority: 'ヴェイガーの檻に入った時' },
    { majority: 'ノクターンにウルトされた時', minority: 'レンガーに飛ばれた時' },
    { majority: 'シンジドに追いかけられてる時', minority: 'ティーモのキノコを踏んだ時' },
    
    // 装備・ビルド
    { majority: '靴を買う順番', minority: 'ピンクワードを買う順番' },
    { majority: 'ADアイテムを積む順番', minority: 'APアイテムを積む順番' },
    { majority: 'アーマーを積むタイミング', minority: 'MRを積むタイミング' },
    { majority: 'ライフスティールを積む時', minority: 'シールドを積む時' },
    
    // コミュニケーション
    { majority: 'ピン連打された時', minority: 'クエスチョンマークつけられた時' },
    { majority: 'ナイスって言われた時', minority: 'GGって言われた時' },
    { majority: 'FFしたい時', minority: 'FFしたくない時' }
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
function getRandomTopic(categories, gameType = 'lol', language = 'ja') {
  // 選択されたカテゴリーからお題を集める
  let allTopics = [];
  
  // 多言語対応データがある場合はそれを使用
  if (typeof wordDataI18n !== 'undefined') {
    // カテゴリー名をi18n形式に変換
    const i18nCategories = categories.map(cat => `${gameType}_${cat}`);
    
    i18nCategories.forEach(category => {
      if (wordDataI18n[category]) {
        allTopics = allTopics.concat(wordDataI18n[category]);
      }
    });
    
    // データが見つかった場合は多言語データを返す
    if (allTopics.length > 0) {
      const randomIndex = Math.floor(Math.random() * allTopics.length);
      const topicData = allTopics[randomIndex];
      // 言語に応じたデータを返す
      return topicData[language] || topicData['ja'];
    }
  }
  
  // フォールバック：従来のデータを使用
  const dataSource = gameType === 'tft' ? tftData : (gameType === 'valorant' ? valorantData : wordData);
  
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
