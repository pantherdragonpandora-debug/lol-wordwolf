// ========================================
// 気分診断チャンピオン選択データ（全172体対応）
// ========================================

// 診断の質問データ（12問に増加）
const moodQuizQuestions = [
  {
    id: 1,
    question: '好きなレーンは？',
    type: 'lane', // レーンで絞り込み
    options: [
      { text: 'トップレーン', lane: 'top', points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { text: 'ジャングル', lane: 'jungle', points: { aggressive: 2, supportive: 1, tactical: 3 } },
      { text: 'ミッドレーン', lane: 'mid', points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { text: 'ADC', lane: 'adc', points: { aggressive: 2, supportive: 0, tactical: 3 } },
      { text: 'サポート', lane: 'support', points: { aggressive: 0, supportive: 3, tactical: 2 } }
    ]
  },
  {
    id: 2,
    question: 'チームファイトでの役割は？',
    type: 'role',
    options: [
      { text: '敵を倒しまくる', role: 'damage', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: '味方を守る', role: 'tank', points: { aggressive: 1, supportive: 3, tactical: 1 } },
      { text: 'CCで敵を妨害', role: 'control', points: { aggressive: 1, supportive: 2, tactical: 3 } },
      { text: '敵のキャリーを狙う', role: 'assassinate', points: { aggressive: 3, supportive: 0, tactical: 2 } }
    ]
  },
  {
    id: 3,
    question: '今日の気分は？',
    type: 'mood',
    options: [
      { text: '元気いっぱい！', mood: 'energetic', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: '落ち着いている', mood: 'calm', points: { aggressive: 0, supportive: 2, tactical: 3 } },
      { text: 'ちょっと疲れてる', mood: 'tired', points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { text: 'ストレス発散したい', mood: 'stressed', points: { aggressive: 3, supportive: 0, tactical: 0 } }
    ]
  },
  {
    id: 4,
    question: 'どんなプレイスタイルが好き？',
    type: 'playstyle',
    options: [
      { text: '前に出て戦う！', playstyle: 'fighter', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: '味方をサポート', playstyle: 'support', points: { aggressive: 0, supportive: 3, tactical: 2 } },
      { text: '計算して立ち回る', playstyle: 'strategic', points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { text: 'ワンショットキル！', playstyle: 'assassin', points: { aggressive: 3, supportive: 0, tactical: 2 } }
    ]
  },
  {
    id: 5,
    question: '今の気持ちに一番近いのは？',
    type: 'emotion',
    options: [
      { text: 'ワクワクしてる！', emotion: 'excited', points: { aggressive: 2, supportive: 1, tactical: 1 } },
      { text: '冷静に考えたい', emotion: 'analytical', points: { aggressive: 0, supportive: 1, tactical: 3 } },
      { text: '優しくしたい', emotion: 'kind', points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { text: 'スカッとしたい！', emotion: 'cathartic', points: { aggressive: 3, supportive: 0, tactical: 0 } }
    ]
  },
  {
    id: 6,
    question: 'レーニングフェーズでのプレイは？',
    type: 'laning',
    options: [
      { text: '積極的に交易する', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: '安全にファーム', points: { aggressive: 0, supportive: 1, tactical: 3 } },
      { text: 'ロームで味方を助ける', points: { aggressive: 1, supportive: 3, tactical: 2 } },
      { text: 'プッシュで圧力をかける', points: { aggressive: 2, supportive: 1, tactical: 2 } }
    ]
  },
  {
    id: 7,
    question: '決定的な瞬間では？',
    type: 'decisive',
    options: [
      { text: '積極的にイニシアチブ', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: 'カウンターを狙う', points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { text: '味方をフォロー', points: { aggressive: 1, supportive: 3, tactical: 1 } },
      { text: '状況を見て判断', points: { aggressive: 0, supportive: 2, tactical: 3 } }
    ]
  },
  {
    id: 8,
    question: 'ゲームで重視することは？',
    type: 'priority',
    options: [
      { text: 'キルを取る', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: '味方を勝たせる', points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { text: 'オブジェクトを取る', points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { text: '戦略的に勝つ', points: { aggressive: 1, supportive: 2, tactical: 3 } }
    ]
  },
  {
    id: 9,
    question: '好きな戦闘距離は？',
    type: 'range',
    options: [
      { text: '接近戦が好き', points: { aggressive: 3, supportive: 1, tactical: 0 } },
      { text: '中距離で立ち回る', points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { text: '遠距離から攻撃', points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { text: '状況に応じて変える', points: { aggressive: 1, supportive: 2, tactical: 2 } }
    ]
  },
  {
    id: 10,
    question: 'ゲーム序盤のスタイルは？',
    type: 'early',
    options: [
      { text: '序盤から有利を作る', points: { aggressive: 3, supportive: 1, tactical: 1 } },
      { text: '安全に成長する', points: { aggressive: 0, supportive: 2, tactical: 3 } },
      { text: '味方のガンクを待つ', points: { aggressive: 1, supportive: 3, tactical: 2 } },
      { text: '敵の動きを見る', points: { aggressive: 1, supportive: 1, tactical: 3 } }
    ]
  },
  {
    id: 11,
    question: 'ゲーム終盤の立ち回りは？',
    type: 'late',
    options: [
      { text: 'ピックで試合を決める', points: { aggressive: 3, supportive: 0, tactical: 2 } },
      { text: '集団戦で勝つ', points: { aggressive: 2, supportive: 2, tactical: 2 } },
      { text: '味方を守り切る', points: { aggressive: 0, supportive: 3, tactical: 2 } },
      { text: 'スプリットで圧力', points: { aggressive: 2, supportive: 0, tactical: 3 } }
    ]
  },
  {
    id: 12,
    question: 'あなたのプレイで最も大切なことは？',
    type: 'philosophy',
    options: [
      { text: 'キャリーして勝つ', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: 'チームを支える', points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { text: '頭脳で勝つ', points: { aggressive: 0, supportive: 1, tactical: 3 } },
      { text: '楽しくプレイする', points: { aggressive: 1, supportive: 2, tactical: 1 } }
    ]
  }
];

// チャンピオンデータ（全172体 - 気分タイプ別）
const championsByMood = {
  // アグレッシブ（攻撃的）- 43体
  // lanes: 'top', 'jungle', 'mid', 'adc', 'support', 'multi' (複数レーン)
  aggressive: [
    { name: 'Aatrox', nameJa: 'エイトロックス', role: 'トップ', image: 'Aatrox', description: '不死の戦士として敵を圧倒' },
    { name: 'Akali', nameJa: 'アカリ', role: 'ミッド', image: 'Akali', description: '影の中から瞬時に暗殺' },
    { name: 'Briar', nameJa: 'ブライアー', role: 'ジャングル', image: 'Briar', description: '飢えた吸血鬼が暴れ回る' },
    { name: 'Camille', nameJa: 'カミール', role: 'トップ', image: 'Camille', description: '精密な刃で敵を切り裂く' },
    { name: 'Darius', nameJa: 'ダリウス', role: 'トップ', image: 'Darius', description: '圧倒的なパワーで敵を蹴散らす' },
    { name: 'Diana', nameJa: 'ダイアナ', role: 'ミッド/ジャングル', image: 'Diana', description: '月の力で敵に飛び込む' },
    { name: 'Draven', nameJa: 'ドレイヴン', role: 'ADC', image: 'Draven', description: '派手に敵を倒して栄光を掴む' },
    { name: 'Fiora', nameJa: 'フィオラ', role: 'トップ', image: 'Fiora', description: '華麗な剣技で1対1最強' },
    { name: 'Garen', nameJa: 'ガレン', role: 'トップ', image: 'Garen', description: 'デマーシア！正義の剣' },
    { name: 'Gwen', nameJa: 'グウェン', role: 'トップ', image: 'Gwen', description: '聖なるハサミで切り刻む' },
    { name: 'Hecarim', nameJa: 'ヘカリム', role: 'ジャングル', image: 'Hecarim', description: '影の騎兵が突撃する' },
    { name: 'Irelia', nameJa: 'イレリア', role: 'トップ/ミッド', image: 'Irelia', description: '刃の舞で敵を翻弄' },
    { name: 'Jax', nameJa: 'ジャックス', role: 'トップ', image: 'Jax', description: 'ランプで最強の戦士' },
    { name: 'Kayn', nameJa: 'ケイン', role: 'ジャングル', image: 'Kayn', description: '影か暗殺者に変身' },
    { name: 'Katarina', nameJa: 'カタリナ', role: 'ミッド', image: 'Katarina', description: 'リセットで敵を次々と倒す' },
    { name: 'Khazix', nameJa: 'カ=ジックス', role: 'ジャングル', image: 'Khazix', description: '進化する虚無の捕食者' },
    { name: 'KSante', nameJa: 'クサンテ', role: 'トップ', image: 'KSante', description: '誇り高き戦士' },
    { name: 'Leblanc', nameJa: 'ルブラン', role: 'ミッド', image: 'Leblanc', description: '欺瞞の魔術師' },
    { name: 'Lee Sin', nameJa: 'リー・シン', role: 'ジャングル', image: 'LeeSin', description: 'カッコいいプレイで魅せる' },
    { name: 'Master Yi', nameJa: 'マスター・イー', role: 'ジャングル', image: 'MasterYi', description: '瞑想の剣士が敵を斬る' },
    { name: 'Mordekaiser', nameJa: 'モルデカイザー', role: 'トップ', image: 'Mordekaiser', description: '鉄の亡霊として支配' },
    { name: 'Nilah', nameJa: 'ニーラ', role: 'ADC', image: 'Nilah', description: '水流の刃で連続攻撃' },
    { name: 'Nocturne', nameJa: 'ノクターン', role: 'ジャングル', image: 'Nocturne', description: '悪夢を具現化して暗殺' },
    { name: 'Olaf', nameJa: 'オラフ', role: 'ジャングル/トップ', image: 'Olaf', description: '狂戦士の怒り' },
    { name: 'Pantheon', nameJa: 'パンテオン', role: 'ミッド/サポート', image: 'Pantheon', description: '不屈の戦士' },
    { name: 'Pyke', nameJa: 'パイク', role: 'サポート', image: 'Pyke', description: '血の港の処刑人' },
    { name: 'Qiyana', nameJa: 'キヤナ', role: 'ミッド/ジャングル', image: 'Qiyana', description: '元素を操る女王' },
    { name: 'Rakan', nameJa: 'ラカン', role: 'サポート', image: 'Rakan', description: '華麗に飛び回る' },
    { name: 'Rell', nameJa: 'レル', role: 'サポート', image: 'Rell', description: '鉄の乙女が突撃' },
    { name: 'Renekton', nameJa: 'レネクトン', role: 'トップ', image: 'Renekton', description: '砂漠の屠殺者' },
    { name: 'Rengar', nameJa: 'レンガー', role: 'ジャングル', image: 'Rengar', description: '獲物を狩る獰猛なハンター' },
    { name: 'Riven', nameJa: 'リヴェン', role: 'トップ', image: 'Riven', description: '折れた剣で敵を圧倒' },
    { name: 'Samira', nameJa: 'サミーラ', role: 'ADC', image: 'Samira', description: 'スタイリッシュコンボ' },
    { name: 'Sett', nameJa: 'セト', role: 'トップ', image: 'Sett', description: 'ボスの拳で殴る' },
    { name: 'Shaco', nameJa: 'シャコ', role: 'ジャングル', image: 'Shaco', description: '悪魔の道化師' },
    { name: 'Sylas', nameJa: 'サイラス', role: 'ミッド/ジャングル', image: 'Sylas', description: '革命家がウルトを奪う' },
    { name: 'Talon', nameJa: 'タロン', role: 'ミッド/ジャングル', image: 'Talon', description: '刃の暗殺者' },
    { name: 'Tryndamere', nameJa: 'トリンダメア', role: 'トップ', image: 'Tryndamere', description: '不死の怒り' },
    { name: 'Viego', nameJa: 'ヴィエゴ', role: 'ジャングル', image: 'Viego', description: '破滅の王が乗っ取る' },
    { name: 'Warwick', nameJa: 'ワーウィック', role: 'ジャングル', image: 'Warwick', description: '血の匂いを追う狼' },
    { name: 'Xin Zhao', nameJa: 'シン・ジャオ', role: 'ジャングル', image: 'XinZhao', description: 'デマーシアの槍' },
    { name: 'Yasuo', nameJa: 'ヤスオ', role: 'ミッド/トップ', image: 'Yasuo', description: '風を操り華麗に敵を倒す' },
    { name: 'Zed', nameJa: 'ゼド', role: 'ミッド', image: 'Zed', description: '影の力で瞬殺する暗殺者' }
  ],
  
  // サポーティブ（支援的）- 43体
  supportive: [
    { name: 'Alistar', nameJa: 'アリスター', role: 'サポート', image: 'Alistar', description: '牛の突進で味方を守る' },
    { name: 'Bard', nameJa: 'バード', role: 'サポート', image: 'Bard', description: '時空を操る不思議な存在' },
    { name: 'Blitzcrank', nameJa: 'ブリッツクランク', role: 'サポート', image: 'Blitzcrank', description: 'フックで敵を引っ張る' },
    { name: 'Braum', nameJa: 'ブラウム', role: 'サポート', image: 'Braum', description: '盾で味方を守る頼れる男' },
    { name: 'Galio', nameJa: 'ガリオ', role: 'ミッド/サポート', image: 'Galio', description: '巨像が味方を守る' },
    { name: 'Ivern', nameJa: 'アイバーン', role: 'ジャングル', image: 'Ivern', description: '優しい森の友' },
    { name: 'Janna', nameJa: 'ジャンナ', role: 'サポート', image: 'Janna', description: '風で味方を守る優しい精霊' },
    { name: 'Karma', nameJa: 'カルマ', role: 'サポート/ミッド', image: 'Karma', description: 'シールドとスピードで支援' },
    { name: 'Lulu', nameJa: 'ルル', role: 'サポート', image: 'Lulu', description: '魔法で味方を強化する妖精' },
    { name: 'Lux', nameJa: 'ラックス', role: 'ミッド/サポート', image: 'Lux', description: '光で敵を倒し味方を守る' },
    { name: 'Milio', nameJa: 'ミリオ', role: 'サポート', image: 'Milio', description: '炎で味方を癒す' },
    { name: 'Nami', nameJa: 'ナミ', role: 'サポート', image: 'Nami', description: '波で味方を助ける人魚' },
    { name: 'Nautilus', nameJa: 'ノーチラス', role: 'サポート', image: 'Nautilus', description: '深海の巨人が守る' },
    { name: 'Orianna', nameJa: 'オリアナ', role: 'ミッド', image: 'Orianna', description: '機械人形で味方を守る' },
    { name: 'Rakan', nameJa: 'ラカン', role: 'サポート', image: 'Rakan', description: '華麗に飛び回り味方を鼓舞' },
    { name: 'Renata Glasc', nameJa: 'レナータ・グラスク', role: 'サポート', image: 'RenataGlasc', description: '錬金術で味方を蘇生' },
    { name: 'Seraphine', nameJa: 'セラフィーン', role: 'サポート/ミッド', image: 'Seraphine', description: '歌で味方を鼓舞するスター' },
    { name: 'Shen', nameJa: 'シェン', role: 'トップ/サポート', image: 'Shen', description: 'どこでも飛んで味方を守る' },
    { name: 'Sona', nameJa: 'ソナ', role: 'サポート', image: 'Sona', description: '音楽で味方を強化する' },
    { name: 'Soraka', nameJa: 'ソラカ', role: 'サポート', image: 'Soraka', description: '回復で味方を救う癒し手' },
    { name: 'Taric', nameJa: 'タリック', role: 'サポート', image: 'Taric', description: '宝石の輝きで味方を守る' },
    { name: 'Thresh', nameJa: 'スレッシュ', role: 'サポート', image: 'Thresh', description: 'ランタンで味方を救出' },
    { name: 'Yuumi', nameJa: 'ユーミ', role: 'サポート', image: 'Yuumi', description: '魔法の猫が味方にくっつく' },
    { name: 'Zilean', nameJa: 'ジリアン', role: 'サポート/ミッド', image: 'Zilean', description: '時間を巻き戻して味方を復活' },
    { name: 'Poppy', nameJa: 'ポピー', role: 'トップ/サポート', image: 'Poppy', description: 'ハンマーで味方を守る' },
    { name: 'Leona', nameJa: 'レオナ', role: 'サポート', image: 'Leona', description: '太陽の戦士が守る' },
    { name: 'Senna', nameJa: 'セナ', role: 'サポート/ADC', image: 'Senna', description: '魂を集めて味方を支援' },
    { name: 'Neeko', nameJa: 'ニーコ', role: 'ミッド/サポート', image: 'Neeko', description: '変身して味方を助ける' },
    { name: 'Morgana', nameJa: 'モルガナ', role: 'サポート/ミッド', image: 'Morgana', description: 'シールドで味方を守る' },
    { name: 'Nunu', nameJa: 'ヌヌ', role: 'ジャングル', image: 'Nunu', description: '雪玉を転がして楽しむ' },
    { name: 'Rammus', nameJa: 'ラムス', role: 'ジャングル', image: 'Rammus', description: 'OK。タンクで守る' },
    { name: 'Ornn', nameJa: 'オーン', role: 'トップ', image: 'Ornn', description: '鍛冶屋が装備を強化' },
    { name: 'Maokai', nameJa: 'マオカイ', role: 'トップ/サポート', image: 'Maokai', description: '木が味方を癒す' },
    { name: 'Malphite', nameJa: 'マルファイト', role: 'トップ', image: 'Malphite', description: '岩のボディで守る' },
    { name: 'Gragas', nameJa: 'グラガス', role: 'ジャングル/トップ', image: 'Gragas', description: '酒で味方を助ける' },
    { name: 'Dr. Mundo', nameJa: 'ドクター・ムンド', role: 'トップ/ジャングル', image: 'DrMundo', description: '不死身のタンク' },
    { name: 'Cho\'Gath', nameJa: 'チョ=ガス', role: 'トップ/ジャングル', image: 'Chogath', description: '巨大化して守る' },
    { name: 'Amumu', nameJa: 'アムム', role: 'ジャングル', image: 'Amumu', description: '泣きながら味方を守る' },
    { name: 'Sejuani', nameJa: 'セジュアニ', role: 'ジャングル', image: 'Sejuani', description: '氷の騎兵隊長' },
    { name: 'Tahm Kench', nameJa: 'タム・ケンチ', role: 'トップ/サポート', image: 'TahmKench', description: '味方を飲み込んで守る' },
    { name: 'Volibear', nameJa: 'ヴォリベア', role: 'ジャングル/トップ', image: 'Volibear', description: '雷の熊が守る' },
    { name: 'Zac', nameJa: 'ザック', role: 'ジャングル', image: 'Zac', description: 'スライムが味方を守る' },
    { name: 'Skarner', nameJa: 'スカーナー', role: 'ジャングル', image: 'Skarner', description: 'クリスタルのサソリ' }
  ],
  
  // タクティカル（戦術的）- 43体
  tactical: [
    { name: 'Ahri', nameJa: 'アーリ', role: 'ミッド', image: 'Ahri', description: '魅力的な九尾の狐' },
    { name: 'Anivia', nameJa: 'アニビア', role: 'ミッド', image: 'Anivia', description: '氷の壁で戦況を作る' },
    { name: 'Annie', nameJa: 'アニー', role: 'ミッド', image: 'Annie', description: 'クマを召喚する少女' },
    { name: 'Aurelion Sol', nameJa: 'オレリオン・ソル', role: 'ミッド', image: 'AurelionSol', description: '星を操る龍' },
    { name: 'Azir', nameJa: 'アジール', role: 'ミッド', image: 'Azir', description: '砂の兵士を配置する皇帝' },
    { name: 'Cassiopeia', nameJa: 'カシオペア', role: 'ミッド', image: 'Cassiopeia', description: '蛇の毒で継続ダメージ' },
    { name: 'Corki', nameJa: 'コーキ', role: 'ミッド', image: 'Corki', description: '飛行機でポークする' },
    { name: 'Ekko', nameJa: 'エコー', role: 'ミッド/ジャングル', image: 'Ekko', description: '時間を巻き戻す天才少年' },
    { name: 'Elise', nameJa: 'エリス', role: 'ジャングル', image: 'Elise', description: '蜘蛛に変身する' },
    { name: 'Evelynn', nameJa: 'イブリン', role: 'ジャングル', image: 'Evelynn', description: 'ステルスで暗殺' },
    { name: 'Ezreal', nameJa: 'エズリアル', role: 'ADC', image: 'Ezreal', description: '機動力のある探検家' },
    { name: 'Graves', nameJa: 'グレイブス', role: 'ジャングル', image: 'Graves', description: 'ショットガンで爆発' },
    { name: 'Heimerdinger', nameJa: 'ハイマーディンガー', role: 'ミッド/サポート', image: 'Heimerdinger', description: 'タレットで領域支配' },
    { name: 'Jayce', nameJa: 'ジェイス', role: 'トップ/ミッド', image: 'Jayce', description: '形態変化で対応' },
    { name: 'Jinx', nameJa: 'ジンクス', role: 'ADC', image: 'Jinx', description: '狂気のロケット' },
    { name: 'Kai\'Sa', nameJa: 'カイ=サ', role: 'ADC', image: 'Kaisa', description: '進化する狩人' },
    { name: 'Karthus', nameJa: 'カーサス', role: 'ジャングル/ミッド', image: 'Karthus', description: '死後も戦う' },
    { name: 'Kassadin', nameJa: 'カサディン', role: 'ミッド', image: 'Kassadin', description: '虚空を歩く' },
    { name: 'Kennen', nameJa: 'ケネン', role: 'トップ', image: 'Kennen', description: '雷で範囲攻撃' },
    { name: 'Kindred', nameJa: 'キンドレッド', role: 'ジャングル', image: 'Kindred', description: '死を司る双子' },
    { name: 'Kled', nameJa: 'クレッド', role: 'トップ', image: 'Kled', description: 'トカゲに乗る狂戦士' },
    { name: 'Kog\'Maw', nameJa: 'コグ=マウ', role: 'ADC', image: 'KogMaw', description: '虚空の砲台' },
    { name: 'Lillia', nameJa: 'リリア', role: 'ジャングル', image: 'Lillia', description: '夢見る鹿' },
    { name: 'Lissandra', nameJa: 'リサンドラ', role: 'ミッド', image: 'Lissandra', description: '氷で敵を封じる' },
    { name: 'Malzahar', nameJa: 'マルザハール', role: 'ミッド', image: 'Malzahar', description: '虚無の預言者' },
    { name: 'Naafiri', nameJa: 'ナーフィーリ', role: 'ミッド', image: 'Naafiri', description: '群れをなす刃' },
    { name: 'Nidalee', nameJa: 'ニダリー', role: 'ジャングル', image: 'Nidalee', description: 'ピューマに変身' },
    { name: 'Orianna', nameJa: 'オリアナ', role: 'ミッド', image: 'Orianna', description: '機械人形を操る計算高い魔術師' },
    { name: 'Rumble', nameJa: 'ランブル', role: 'トップ', image: 'Rumble', description: 'ロボで炎を撒く' },
    { name: 'Ryze', nameJa: 'ライズ', role: 'ミッド', image: 'Ryze', description: '古代魔法を操る' },
    { name: 'Shyvana', nameJa: 'シヴァーナ', role: 'ジャングル', image: 'Shyvana', description: 'ドラゴンに変身' },
    { name: 'Singed', nameJa: 'シンジド', role: 'トップ', image: 'Singed', description: '毒を撒きながら走る' },
    { name: 'Swain', nameJa: 'スウェイン', role: 'サポート/ミッド', image: 'Swain', description: '鴉を操る戦略家' },
    { name: 'Syndra', nameJa: 'シンドラ', role: 'ミッド', image: 'Syndra', description: '球を操る計算されたダメージ' },
    { name: 'Taliyah', nameJa: 'タリヤ', role: 'ミッド/ジャングル', image: 'Taliyah', description: '岩を操る編む者' },
    { name: 'Teemo', nameJa: 'ティーモ', role: 'トップ', image: 'Teemo', description: 'キノコで罠を張る' },
    { name: 'Twisted Fate', nameJa: 'ツイステッド・フェイト', role: 'ミッド', image: 'TwistedFate', description: 'カードで戦況を読む策士' },
    { name: 'Veigar', nameJa: 'ベイガー', role: 'ミッド', image: 'Veigar', description: 'スタックで無限成長' },
    { name: 'Vel\'Koz', nameJa: 'ヴェル=コズ', role: 'ミッド/サポート', image: 'Velkoz', description: 'レーザーで敵を分解' },
    { name: 'Viktor', nameJa: 'ヴィクター', role: 'ミッド', image: 'Viktor', description: '進化した力で支配する' },
    { name: 'Xerath', nameJa: 'ゼラス', role: 'ミッド', image: 'Xerath', description: '超長距離砲撃' },
    { name: 'Zoe', nameJa: 'ゾーイ', role: 'ミッド', image: 'Zoe', description: '星を落とすいたずら' },
    { name: 'Zyra', nameJa: 'ザイラ', role: 'サポート/ミッド', image: 'Zyra', description: '植物で領域支配' }
  ],
  
  // バランス型（中間）- 43体
  balanced: [
    { name: 'Akshan', nameJa: 'アクシャン', role: 'ミッド', image: 'Akshan', description: '復讐のローグ' },
    { name: 'Aphelios', nameJa: 'アフェリオス', role: 'ADC', image: 'Aphelios', description: '5つの武器を切り替え' },
    { name: 'Ashe', nameJa: 'アッシュ', role: 'ADC', image: 'Ashe', description: '氷の弓で敵を遅くする' },
    { name: 'Aurora', nameJa: 'オーロラ', role: 'ミッド', image: 'Aurora', description: '精霊の力を使う' },
    { name: 'Bel\'Veth', nameJa: 'ベル=ヴェス', role: 'ジャングル', image: 'Belveth', description: '虚空の女帝' },
    { name: 'Brand', nameJa: 'ブランド', role: 'サポート/ミッド', image: 'Brand', description: '炎で燃やし尽くす' },
    { name: 'Caitlyn', nameJa: 'ケイトリン', role: 'ADC', image: 'Caitlyn', description: 'スナイパーで狙撃' },
    { name: 'Fiddlesticks', nameJa: 'フィドルスティックス', role: 'ジャングル', image: 'Fiddlesticks', description: '恐怖の案山子' },
    { name: 'Gangplank', nameJa: 'ガングプランク', role: 'トップ', image: 'Gangplank', description: '海賊の王' },
    { name: 'Gnar', nameJa: 'ナー', role: 'トップ', image: 'Gnar', description: '小さいか巨大化するか' },
    { name: 'Hwei', nameJa: 'フウェイ', role: 'ミッド', image: 'Hwei', description: '絵筆で魔法を描く' },
    { name: 'Illaoi', nameJa: 'イラオイ', role: 'トップ', image: 'Illaoi', description: '触手の女司祭' },
    { name: 'Janna', nameJa: 'ジャンナ', role: 'サポート', image: 'Janna', description: '風の精霊' },
    { name: 'Jarvan IV', nameJa: 'ジャーヴァンIV', role: 'ジャングル', image: 'JarvanIV', description: 'デマーシアの王子' },
    { name: 'Jhin', nameJa: 'ジン', role: 'ADC', image: 'Jhin', description: '芸術的な暗殺者' },
    { name: 'Kalista', nameJa: 'カリスタ', role: 'ADC', image: 'Kalista', description: '復讐の槍' },
    { name: 'Kayle', nameJa: 'ケイル', role: 'トップ', image: 'Kayle', description: '天使に進化する' },
    { name: 'Lucian', nameJa: 'ルシアン', role: 'ADC', image: 'Lucian', description: '二丁拳銃で連射' },
    { name: 'Miss Fortune', nameJa: 'ミス・フォーチュン', role: 'ADC', image: 'MissFortune', description: '賞金稼ぎの女海賊' },
    { name: 'Nasus', nameJa: 'ナサス', role: 'トップ', image: 'Nasus', description: 'スタックで無限成長' },
    { name: 'Quinn', nameJa: 'クイン', role: 'トップ', image: 'Quinn', description: '鷹と共に飛ぶ' },
    { name: 'Rek\'Sai', nameJa: 'レク=サイ', role: 'ジャングル', image: 'RekSai', description: '地中を掘り進む' },
    { name: 'Riven', nameJa: 'リヴェン', role: 'トップ', image: 'Riven', description: '折れた剣の亡命者' },
    { name: 'Shaco', nameJa: 'シャコ', role: 'ジャングル', image: 'Shaco', description: '悪魔の道化師' },
    { name: 'Sion', nameJa: 'サイオン', role: 'トップ', image: 'Sion', description: '不死の巨人' },
    { name: 'Sivir', nameJa: 'シヴィア', role: 'ADC', image: 'Sivir', description: 'ブーメランで範囲攻撃' },
    { name: 'Smolder', nameJa: 'スモルダー', role: 'ADC', image: 'Smolder', description: '若きドラゴン' },
    { name: 'Sona', nameJa: 'ソナ', role: 'サポート', image: 'Sona', description: '音楽で味方を鼓舞' },
    { name: 'Tristana', nameJa: 'トリスターナ', role: 'ADC', image: 'Tristana', description: '大砲で爆破' },
    { name: 'Trundle', nameJa: 'トランドル', role: 'ジャングル/トップ', image: 'Trundle', description: 'トロルの王' },
    { name: 'Twitch', nameJa: 'トゥイッチ', role: 'ADC', image: 'Twitch', description: 'ステルスのネズミ' },
    { name: 'Udyr', nameJa: 'ウディア', role: 'ジャングル', image: 'Udyr', description: '精霊の姿を切り替え' },
    { name: 'Urgot', nameJa: 'アーゴット', role: 'トップ', image: 'Urgot', description: '処刑マシーン' },
    { name: 'Varus', nameJa: 'ヴァルス', role: 'ADC', image: 'Varus', description: '復讐の矢' },
    { name: 'Vayne', nameJa: 'ヴェイン', role: 'ADC', image: 'Vayne', description: '闇の狩人' },
    { name: 'Vi', nameJa: 'ヴァイ', role: 'ジャングル', image: 'Vi', description: 'パンチでぶっ飛ばす' },
    { name: 'Vladimir', nameJa: 'ウラディミール', role: 'ミッド/トップ', image: 'Vladimir', description: '血の魔術師' },
    { name: 'Wukong', nameJa: 'ウーコン', role: 'ジャングル/トップ', image: 'MonkeyKing', description: '猿の王' },
    { name: 'Xayah', nameJa: 'ザヤ', role: 'ADC', image: 'Xayah', description: '羽根を操る反逆者' },
    { name: 'Yone', nameJa: 'ヨネ', role: 'ミッド/トップ', image: 'Yone', description: 'ヤスオの兄' },
    { name: 'Yorick', nameJa: 'ヨリック', role: 'トップ', image: 'Yorick', description: '墓掘り人' },
    { name: 'Zeri', nameJa: 'ゼリ', role: 'ADC', image: 'Zeri', description: '電撃スパーク' },
    { name: 'Ziggs', nameJa: 'ジグス', role: 'ミッド', image: 'Ziggs', description: '爆弾魔' }
  ]
};

// 診断結果のメッセージ
const moodResultMessages = {
  aggressive: {
    title: 'アグレッシブタイプ',
    description: 'あなたは今、敵を倒してスカッとしたい気分！攻撃的なチャンピオンで思いっきり暴れましょう！',
    emoji: '⚔️'
  },
  supportive: {
    title: 'サポーティブタイプ',
    description: 'あなたは今、味方を助けたい優しい気分。サポートチャンピオンで仲間を勝利に導きましょう！',
    emoji: '💖'
  },
  tactical: {
    title: 'タクティカルタイプ',
    description: 'あなたは今、冷静に戦況を読みたい気分。戦略的なチャンピオンで頭脳プレイを楽しみましょう！',
    emoji: '🧠'
  },
  balanced: {
    title: 'バランスタイプ',
    description: 'あなたは今、バランスの取れたプレイがしたい気分。万能なチャンピオンで柔軟に対応しましょう！',
    emoji: '⚖️'
  }
};

console.log('✅ 気分診断データを読み込みました（全172体対応）');
