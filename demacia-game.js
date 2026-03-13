// ========================================
// TFT ワードウルフ お題データ
// ========================================

const tftData = {
  // TFT - ユニット（チャンピオン）（20ペア）
  units: [
    { majority: 'アーリ', minority: 'ソラカ' },
    { majority: 'ジンクス', minority: 'トリスターナ' },
    { majority: 'ガレン', minority: 'ダリウス' },
    { majority: 'ヤスオ', minority: 'ヨネ' },
    { majority: 'ルックス', minority: 'モルガナ' },
    { majority: 'リーシン', minority: 'ウーコン' },
    { majority: 'アッシュ', minority: 'ヴァルス' },
    { majority: 'ゼド', minority: 'タロン' },
    { majority: 'ブラウム', minority: 'アリスター' },
    { majority: 'ティーモ', minority: 'ケンネン' },
    { majority: 'カ=ジックス', minority: 'レンガー' },
    { majority: 'カタリナ', minority: 'アカリ' },
    { majority: 'シヴィア', minority: 'カリスタ' },
    { majority: 'レオナ', minority: 'タリック' },
    { majority: 'エズリアル', minority: 'ルシアン' },
    { majority: 'ソナ', minority: 'セラフィーン' },
    { majority: 'チョ=ガス', minority: 'ボリベア' },
    { majority: 'カイサ', minority: 'サミーラ' },
    { majority: 'ジャンナ', minority: 'ナミ' },
    { majority: 'セト', minority: 'ガレン' }
  ],

  // TFT - 特性（トレイト）（15ペア）
  traits: [
    { majority: 'アサシン', minority: 'スレイヤー' },
    { majority: 'ブローラー', minority: 'ヴァンガード' },
    { majority: 'ソーサラー', minority: 'ウィザード' },
    { majority: 'マークスマン', minority: 'スナイパー' },
    { majority: 'プロテクター', minority: 'ガーディアン' },
    { majority: 'タンク', minority: 'コロッサス' },
    { majority: 'レンジャー', minority: 'シャープシューター' },
    { majority: 'メイジ', minority: 'アーケニスト' },
    { majority: 'デュエリスト', minority: 'チャレンジャー' },
    { majority: 'ミスティック', minority: 'スカラー' },
    { majority: 'バーサーカー', minority: 'ウォーリアー' },
    { majority: 'キャバリエ', minority: 'ナイト' },
    { majority: 'インフィルトレーター', minority: 'スパイ' },
    { majority: 'エンペラー', minority: 'ノーブル' },
    { majority: 'フォーチュン', minority: 'トレジャードラゴン' }
  ],

  // TFT - アイテム（15ペア）
  items: [
    { majority: 'インフィニティエッジ', minority: 'ジュエルドガントレット' },
    { majority: 'ラバドンデスキャップ', minority: 'イオニックスパーク' },
    { majority: 'ガーディアンエンジェル', minority: 'エッジオブナイト' },
    { majority: 'ブラッドサースター', minority: 'ハンズオブジャスティス' },
    { majority: 'ガントレット', minority: 'ブラムルベスト' },
    { majority: 'ラストウィスパー', minority: 'タイタンズリゾルブ' },
    { majority: 'ショウジンスピア', minority: 'ブルーバフ' },
    { majority: 'サンファイアケープ', minority: 'モレロノミコン' },
    { majority: 'ゼファー', minority: 'シュレッダー' },
    { majority: 'クイックシルバー', minority: 'ステディファストハート' },
    { majority: 'チーフテインズプライド', minority: 'ワーモグアーマー' },
    { majority: 'ギガンティックハイドラ', minority: 'タイタニックハイドラ' },
    { majority: 'スタティックシヴ', minority: 'ランナンズハリケーン' },
    { majority: 'フローズンハート', minority: 'ウィンタースアプローチ' },
    { majority: 'アーチャンジェルスタッフ', minority: 'スピアオブショウジン' }
  ],

  // TFT - ゲーム用語（15ペア）
  terms: [
    { majority: 'リロール', minority: 'レベルアップ' },
    { majority: 'ゴールド', minority: 'コイン' },
    { majority: 'エコノミー', minority: '経済' },
    { majority: 'ハイパーロール', minority: 'スタンダード' },
    { majority: 'アイテムカルーセル', minority: 'ドラフト' },
    { majority: '3スター', minority: '2スター' },
    { majority: 'ポータル', minority: 'レジェンド' },
    { majority: 'ベンチ', minority: 'ボード' },
    { majority: 'ストリーク', minority: 'コンボ' },
    { majority: 'ボリューム', minority: 'プール' },
    { majority: 'パワースパイク', minority: 'ミッドゲーム' },
    { majority: 'フロントライン', minority: 'バックライン' },
    { majority: 'タンク配置', minority: 'キャリー配置' },
    { majority: 'アーリーゲーム', minority: 'レイトゲーム' },
    { majority: 'スカウト', minority: '偵察' }
  ],

  // TFT - 戦略・構成（10ペア）
  strategy: [
    { majority: 'リロール構成', minority: 'レベリング構成' },
    { majority: '縦構成', minority: '横構成' },
    { majority: 'ファストエイト', minority: 'ファストナイン' },
    { majority: 'ウィンストリーク', minority: 'ロスストリーク' },
    { majority: 'フレックス', minority: 'フォース' },
    { majority: 'スローロール', minority: 'ハイパーロール' },
    { majority: 'ドミナント', minority: 'メタ構成' },
    { majority: 'エコ', minority: 'オールイン' },
    { majority: 'アイテムスラム', minority: 'アイテムホールド' },
    { majority: 'キャリー優先', minority: 'タンク優先' }
  ]
};

// カテゴリーからランダムにお題を選択する関数
function getRandomTFTTopic(categories) {
  const allTopics = [];
  
  if (!categories || categories.length === 0 || categories.includes('all')) {
    // 全カテゴリーから選択
    Object.keys(tftData).forEach(category => {
      allTopics.push(...tftData[category]);
    });
  } else {
    // 指定されたカテゴリーから選択
    categories.forEach(category => {
      if (tftData[category]) {
        allTopics.push(...tftData[category]);
      }
    });
  }
  
  if (allTopics.length === 0) {
    console.error('❌ No topics available');
    return { majority: 'エラー', minority: 'エラー' };
  }
  
  const randomIndex = Math.floor(Math.random() * allTopics.length);
  return allTopics[randomIndex];
}
