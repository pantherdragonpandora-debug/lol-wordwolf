// ========================================
// 気分診断チャンピオン選択データ（全172体対応 - マルチレーン対応 v5）
// ========================================

// 診断の質問データ（12問 - 選択肢拡張版）
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
      { text: '敵を倒しまくる', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: '味方を守る', points: { aggressive: 1, supportive: 3, tactical: 1 } },
      { text: 'CCで敵を妨害', points: { aggressive: 1, supportive: 2, tactical: 3 } },
      { text: '敵のキャリーを狙う', points: { aggressive: 3, supportive: 0, tactical: 2 } },
      { text: 'ポークで削る', points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { text: 'ゾーニングで牽制', points: { aggressive: 1, supportive: 2, tactical: 3 } }
    ]
  },
  {
    id: 3,
    question: '今日の気分は？',
    type: 'mood',
    options: [
      { text: '元気いっぱい！', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: '落ち着いている', points: { aggressive: 0, supportive: 2, tactical: 3 } },
      { text: 'ちょっと疲れてる', points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { text: 'ストレス発散したい', points: { aggressive: 3, supportive: 0, tactical: 0 } },
      { text: '頭を使いたい', points: { aggressive: 0, supportive: 1, tactical: 3 } }
    ]
  },
  {
    id: 4,
    question: 'どんなプレイスタイルが好き？',
    type: 'playstyle',
    options: [
      { text: '前に出て戦う！', points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { text: '味方をサポート', points: { aggressive: 0, supportive: 3, tactical: 2 } },
      { text: '計算して立ち回る', points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { text: 'ワンショットキル！', points: { aggressive: 3, supportive: 0, tactical: 2 } },
      { text: 'じわじわ削る', points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { text: '機動力で翻弄', points: { aggressive: 2, supportive: 1, tactical: 3 } }
    ]
  },
  {
    id: 5,
    question: '今の気持ちに一番近いのは？',
    type: 'emotion',
    options: [
      { text: 'ワクワクしてる！', points: { aggressive: 2, supportive: 1, tactical: 1 } },
      { text: '冷静に考えたい', points: { aggressive: 0, supportive: 1, tactical: 3 } },
      { text: '優しくしたい', points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { text: 'スカッとしたい！', points: { aggressive: 3, supportive: 0, tactical: 0 } }
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
      { text: 'プッシュで圧力をかける', points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { text: 'フリーズで有利を作る', points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { text: 'オールイン狙う', points: { aggressive: 3, supportive: 0, tactical: 1 } }
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
      { text: '近～中距離（ブルーザー）', points: { aggressive: 2, supportive: 1, tactical: 1 } },
      { text: '中距離で立ち回る', points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { text: '中～遠距離（ポーク）', points: { aggressive: 1, supportive: 1, tactical: 3 } },
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
      { text: 'スプリットで圧力', points: { aggressive: 2, supportive: 0, tactical: 3 } },
      { text: 'バロン/ドラゴンで決める', points: { aggressive: 1, supportive: 2, tactical: 3 } }
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

// チャンピオンデータ（全172体 - マルチレーン対応）
// lanes配列の形式: { lane: 'top'|'jungle'|'mid'|'adc'|'support', priority: 'main'|'viable'|'niche'|'off-meta', pickRate: 数値 }
const championsByMood = {
  // アグレッシブ（攻撃的）- 43体
  aggressive: [
    { name: 'Aatrox', nameJa: 'エイトロックス', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 10}], image: 'Aatrox', description: '不死の戦士として敵を圧倒' },
    { name: 'Akali', nameJa: 'アカリ', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 35}], image: 'Akali', description: '影の中から瞬時に暗殺' },
    { name: 'Briar', nameJa: 'ブライアー', lanes: [{lane: 'jungle', priority: 'main', pickRate: 90}], image: 'Briar', description: '飢えた吸血鬼が暴れ回る' },
    { name: 'Camille', nameJa: 'カミール', lanes: [{lane: 'top', priority: 'main', pickRate: 70}, {lane: 'jungle', priority: 'viable', pickRate: 25}], image: 'Camille', description: '精密な刃で敵を切り裂く' },
    { name: 'Darius', nameJa: 'ダリウス', lanes: [{lane: 'top', priority: 'main', pickRate: 95}], image: 'Darius', description: '圧倒的なパワーで敵を蹴散らす' },
    { name: 'Diana', nameJa: 'ダイアナ', lanes: [{lane: 'mid', priority: 'main', pickRate: 55}, {lane: 'jungle', priority: 'viable', pickRate: 40}], image: 'Diana', description: '月の力で敵に飛び込む' },
    { name: 'Draven', nameJa: 'ドレイヴン', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Draven', description: '派手に敵を倒して栄光を掴む' },
    { name: 'Fiora', nameJa: 'フィオラ', lanes: [{lane: 'top', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Fiora', description: '華麗な剣技で1対1最強' },
    { name: 'Garen', nameJa: 'ガレン', lanes: [{lane: 'top', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Garen', description: 'デマーシア！正義の剣' },
    { name: 'Gwen', nameJa: 'グウェン', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'jungle', priority: 'niche', pickRate: 12}], image: 'Gwen', description: '聖なるハサミで切り刻む' },
    { name: 'Hecarim', nameJa: 'ヘカリム', lanes: [{lane: 'jungle', priority: 'main', pickRate: 85}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Hecarim', description: '影の騎兵が突撃する' },
    { name: 'Irelia', nameJa: 'イレリア', lanes: [{lane: 'top', priority: 'main', pickRate: 55}, {lane: 'mid', priority: 'viable', pickRate: 40}], image: 'Irelia', description: '刃の舞で敵を翻弄' },
    { name: 'Jax', nameJa: 'ジャックス', lanes: [{lane: 'top', priority: 'main', pickRate: 75}, {lane: 'jungle', priority: 'viable', pickRate: 20}], image: 'Jax', description: 'ランプで最強の戦士' },
    { name: 'Kayn', nameJa: 'ケイン', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Kayn', description: '影か暗殺者に変身' },
    { name: 'Katarina', nameJa: 'カタリナ', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Katarina', description: 'リセットで敵を次々と倒す' },
    { name: 'Khazix', nameJa: 'カ=ジックス', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Khazix', description: '進化する虚無の捕食者' },
    { name: 'KSante', nameJa: 'クサンテ', lanes: [{lane: 'top', priority: 'main', pickRate: 90}], image: 'KSante', description: '誇り高き戦士' },
    { name: 'Leblanc', nameJa: 'ルブラン', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Leblanc', description: '欺瞞の魔術師' },
    { name: 'Lee Sin', nameJa: 'リー・シン', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'LeeSin', description: 'カッコいいプレイで魅せる' },
    { name: 'Master Yi', nameJa: 'マスター・イー', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'MasterYi', description: '瞑想の剣士が敵を斬る' },
    { name: 'Mordekaiser', nameJa: 'モルデカイザー', lanes: [{lane: 'top', priority: 'main', pickRate: 80}, {lane: 'mid', priority: 'niche', pickRate: 15}], image: 'Mordekaiser', description: '鉄の亡霊として支配' },
    { name: 'Nilah', nameJa: 'ニーラ', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Nilah', description: '水流の刃で連続攻撃' },
    { name: 'Nocturne', nameJa: 'ノクターン', lanes: [{lane: 'jungle', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Nocturne', description: '悪夢を具現化して暗殺' },
    { name: 'Olaf', nameJa: 'オラフ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 35}], image: 'Olaf', description: '狂戦士の怒り' },
    { name: 'Pantheon', nameJa: 'パンテオン', lanes: [{lane: 'mid', priority: 'main', pickRate: 50}, {lane: 'support', priority: 'viable', pickRate: 35}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Pantheon', description: '不屈の戦士' },
    { name: 'Pyke', nameJa: 'パイク', lanes: [{lane: 'support', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'Pyke', description: '血の港の処刑人' },
    { name: 'Qiyana', nameJa: 'キヤナ', lanes: [{lane: 'mid', priority: 'main', pickRate: 75}, {lane: 'jungle', priority: 'viable', pickRate: 20}], image: 'Qiyana', description: '元素を操る女王' },
    { name: 'Rakan', nameJa: 'ラカン', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Rakan', description: '華麗に飛び回る' },
    { name: 'Rell', nameJa: 'レル', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Rell', description: '鉄の乙女が突撃' },
    { name: 'Renekton', nameJa: 'レネクトン', lanes: [{lane: 'top', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Renekton', description: '砂漠の屠殺者' },
    { name: 'Rengar', nameJa: 'レンガー', lanes: [{lane: 'jungle', priority: 'main', pickRate: 80}, {lane: 'top', priority: 'niche', pickRate: 15}], image: 'Rengar', description: '獲物を狩る獰猛なハンター' },
    { name: 'Riven', nameJa: 'リヴェン', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'Riven', description: '折れた剣で敵を圧倒' },
    { name: 'Samira', nameJa: 'サミーラ', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Samira', description: 'スタイリッシュコンボ' },
    { name: 'Sett', nameJa: 'セト', lanes: [{lane: 'top', priority: 'main', pickRate: 75}, {lane: 'jungle', priority: 'viable', pickRate: 20}], image: 'Sett', description: 'ボスの拳で殴る' },
    { name: 'Shaco', nameJa: 'シャコ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 90}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Shaco', description: '悪魔の道化師' },
    { name: 'Sylas', nameJa: 'サイラス', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'jungle', priority: 'viable', pickRate: 30}, {lane: 'top', priority: 'niche', pickRate: 8}], image: 'Sylas', description: '革命家がウルトを奪う' },
    { name: 'Talon', nameJa: 'タロン', lanes: [{lane: 'mid', priority: 'main', pickRate: 70}, {lane: 'jungle', priority: 'viable', pickRate: 25}], image: 'Talon', description: '刃の暗殺者' },
    { name: 'Tryndamere', nameJa: 'トリンダメア', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'jungle', priority: 'niche', pickRate: 12}], image: 'Tryndamere', description: '不死の怒り' },
    { name: 'Viego', nameJa: 'ヴィエゴ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'Viego', description: '破滅の王が乗っ取る' },
    { name: 'Warwick', nameJa: 'ワーウィック', lanes: [{lane: 'jungle', priority: 'main', pickRate: 85}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Warwick', description: '血の匂いを追う狼' },
    { name: 'Xin Zhao', nameJa: 'シン・ジャオ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'XinZhao', description: 'デマーシアの槍' },
    { name: 'Yasuo', nameJa: 'ヤスオ', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 35}], image: 'Yasuo', description: '風を操り華麗に敵を倒す' },
    { name: 'Zed', nameJa: 'ゼド', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Zed', description: '影の力で瞬殺する暗殺者' }
  ],
  
  // サポーティブ（支援的）- 43体
  supportive: [
    { name: 'Alistar', nameJa: 'アリスター', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Alistar', description: '牛の突進で味方を守る' },
    { name: 'Bard', nameJa: 'バード', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Bard', description: '時空を操る不思議な存在' },
    { name: 'Blitzcrank', nameJa: 'ブリッツクランク', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Blitzcrank', description: 'フックで敵を引っ張る' },
    { name: 'Braum', nameJa: 'ブラウム', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Braum', description: '盾で味方を守る頼れる男' },
    { name: 'Galio', nameJa: 'ガリオ', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'support', priority: 'viable', pickRate: 35}], image: 'Galio', description: '巨像が味方を守る' },
    { name: 'Ivern', nameJa: 'アイバーン', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Ivern', description: '優しい森の友' },
    { name: 'Janna', nameJa: 'ジャンナ', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Janna', description: '風で味方を守る優しい精霊' },
    { name: 'Karma', nameJa: 'カルマ', lanes: [{lane: 'support', priority: 'main', pickRate: 60}, {lane: 'mid', priority: 'viable', pickRate: 25}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Karma', description: 'シールドとスピードで支援' },
    { name: 'Lulu', nameJa: 'ルル', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Lulu', description: '魔法で味方を強化する妖精' },
    { name: 'Lux', nameJa: 'ラックス', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'support', priority: 'viable', pickRate: 35}], image: 'Lux', description: '光で敵を倒し味方を守る' },
    { name: 'Milio', nameJa: 'ミリオ', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Milio', description: '炎で味方を癒す' },
    { name: 'Nami', nameJa: 'ナミ', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Nami', description: '波で味方を助ける人魚' },
    { name: 'Nautilus', nameJa: 'ノーチラス', lanes: [{lane: 'support', priority: 'main', pickRate: 90}, {lane: 'jungle', priority: 'niche', pickRate: 8}], image: 'Nautilus', description: '深海の巨人が守る' },
    { name: 'Renata Glasc', nameJa: 'レナータ・グラスク', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'RenataGlasc', description: '錬金術で味方を蘇生' },
    { name: 'Seraphine', nameJa: 'セラフィーン', lanes: [{lane: 'support', priority: 'main', pickRate: 60}, {lane: 'mid', priority: 'viable', pickRate: 30}], image: 'Seraphine', description: '歌で味方を鼓舞するスター' },
    { name: 'Shen', nameJa: 'シェン', lanes: [{lane: 'top', priority: 'main', pickRate: 70}, {lane: 'support', priority: 'viable', pickRate: 25}], image: 'Shen', description: 'どこでも飛んで味方を守る' },
    { name: 'Sona', nameJa: 'ソナ', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Sona', description: '音楽で味方を強化する' },
    { name: 'Soraka', nameJa: 'ソラカ', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Soraka', description: '回復で味方を救う癒し手' },
    { name: 'Taric', nameJa: 'タリック', lanes: [{lane: 'support', priority: 'main', pickRate: 90}, {lane: 'jungle', priority: 'niche', pickRate: 8}], image: 'Taric', description: '宝石の輝きで味方を守る' },
    { name: 'Thresh', nameJa: 'スレッシュ', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Thresh', description: 'ランタンで味方を救出' },
    { name: 'Yuumi', nameJa: 'ユーミ', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Yuumi', description: '魔法の猫が味方にくっつく' },
    { name: 'Zilean', nameJa: 'ジリアン', lanes: [{lane: 'support', priority: 'main', pickRate: 70}, {lane: 'mid', priority: 'viable', pickRate: 25}], image: 'Zilean', description: '時間を巻き戻して味方を復活' },
    { name: 'Poppy', nameJa: 'ポピー', lanes: [{lane: 'top', priority: 'main', pickRate: 60}, {lane: 'support', priority: 'viable', pickRate: 30}, {lane: 'jungle', priority: 'niche', pickRate: 8}], image: 'Poppy', description: 'ハンマーで味方を守る' },
    { name: 'Leona', nameJa: 'レオナ', lanes: [{lane: 'support', priority: 'main', pickRate: 95}], image: 'Leona', description: '太陽の戦士が守る' },
    { name: 'Senna', nameJa: 'セナ', lanes: [{lane: 'support', priority: 'main', pickRate: 65}, {lane: 'adc', priority: 'viable', pickRate: 30}], image: 'Senna', description: '魂を集めて味方を支援' },
    { name: 'Neeko', nameJa: 'ニーコ', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'support', priority: 'viable', pickRate: 30}], image: 'Neeko', description: '変身して味方を助ける' },
    { name: 'Morgana', nameJa: 'モルガナ', lanes: [{lane: 'support', priority: 'main', pickRate: 70}, {lane: 'mid', priority: 'viable', pickRate: 25}], image: 'Morgana', description: 'シールドで味方を守る' },
    { name: 'Nunu', nameJa: 'ヌヌ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 90}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Nunu', description: '雪玉を転がして楽しむ' },
    { name: 'Rammus', nameJa: 'ラムス', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Rammus', description: 'OK。タンクで守る' },
    { name: 'Ornn', nameJa: 'オーン', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'support', priority: 'niche', pickRate: 12}], image: 'Ornn', description: '鍛冶屋が装備を強化' },
    { name: 'Maokai', nameJa: 'マオカイ', lanes: [{lane: 'top', priority: 'main', pickRate: 55}, {lane: 'support', priority: 'viable', pickRate: 35}, {lane: 'jungle', priority: 'niche', pickRate: 8}], image: 'Maokai', description: '木が味方を癒す' },
    { name: 'Malphite', nameJa: 'マルファイト', lanes: [{lane: 'top', priority: 'main', pickRate: 75}, {lane: 'mid', priority: 'niche', pickRate: 15}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Malphite', description: '岩のボディで守る' },
    { name: 'Gragas', nameJa: 'グラガス', lanes: [{lane: 'jungle', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 30}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Gragas', description: '酒で味方を助ける' },
    { name: 'Dr. Mundo', nameJa: 'ドクター・ムンド', lanes: [{lane: 'top', priority: 'main', pickRate: 75}, {lane: 'jungle', priority: 'viable', pickRate: 20}], image: 'DrMundo', description: '不死身のタンク' },
    { name: 'Cho\'Gath', nameJa: 'チョ=ガス', lanes: [{lane: 'top', priority: 'main', pickRate: 70}, {lane: 'mid', priority: 'niche', pickRate: 15}, {lane: 'jungle', priority: 'niche', pickRate: 12}], image: 'Chogath', description: '巨大化して守る' },
    { name: 'Amumu', nameJa: 'アムム', lanes: [{lane: 'jungle', priority: 'main', pickRate: 90}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Amumu', description: '泣きながら味方を守る' },
    { name: 'Sejuani', nameJa: 'セジュアニ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Sejuani', description: '氷の騎兵隊長' },
    { name: 'Tahm Kench', nameJa: 'タム・ケンチ', lanes: [{lane: 'top', priority: 'main', pickRate: 65}, {lane: 'support', priority: 'viable', pickRate: 30}], image: 'TahmKench', description: '味方を飲み込んで守る' },
    { name: 'Volibear', nameJa: 'ヴォリベア', lanes: [{lane: 'jungle', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 35}], image: 'Volibear', description: '雷の熊が守る' },
    { name: 'Zac', nameJa: 'ザック', lanes: [{lane: 'jungle', priority: 'main', pickRate: 90}, {lane: 'top', priority: 'niche', pickRate: 8}], image: 'Zac', description: 'スライムが味方を守る' },
    { name: 'Skarner', nameJa: 'スカーナー', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Skarner', description: 'クリスタルのサソリ' },
    { name: 'Orianna', nameJa: 'オリアナ', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Orianna', description: '機械人形で味方を守る' }
  ],
  
  // タクティカル（戦術的）- 43体
  tactical: [
    { name: 'Ahri', nameJa: 'アーリ', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Ahri', description: '魅力的な九尾の狐' },
    { name: 'Anivia', nameJa: 'アニビア', lanes: [{lane: 'mid', priority: 'main', pickRate: 90}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Anivia', description: '氷の壁で戦況を作る' },
    { name: 'Annie', nameJa: 'アニー', lanes: [{lane: 'mid', priority: 'main', pickRate: 80}, {lane: 'support', priority: 'niche', pickRate: 15}], image: 'Annie', description: 'クマを召喚する少女' },
    { name: 'Aurelion Sol', nameJa: 'オレリオン・ソル', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'AurelionSol', description: '星を操る龍' },
    { name: 'Azir', nameJa: 'アジール', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Azir', description: '砂の兵士を配置する皇帝' },
    { name: 'Cassiopeia', nameJa: 'カシオペア', lanes: [{lane: 'mid', priority: 'main', pickRate: 85}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Cassiopeia', description: '蛇の毒で継続ダメージ' },
    { name: 'Corki', nameJa: 'コーキ', lanes: [{lane: 'mid', priority: 'main', pickRate: 75}, {lane: 'adc', priority: 'viable', pickRate: 20}], image: 'Corki', description: '飛行機でポークする' },
    { name: 'Ekko', nameJa: 'エコー', lanes: [{lane: 'mid', priority: 'main', pickRate: 70}, {lane: 'jungle', priority: 'viable', pickRate: 25}], image: 'Ekko', description: '時間を巻き戻す天才少年' },
    { name: 'Elise', nameJa: 'エリス', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Elise', description: '蜘蛛に変身する' },
    { name: 'Evelynn', nameJa: 'イブリン', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Evelynn', description: 'ステルスで暗殺' },
    { name: 'Ezreal', nameJa: 'エズリアル', lanes: [{lane: 'adc', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Ezreal', description: '機動力のある探検家' },
    { name: 'Graves', nameJa: 'グレイブス', lanes: [{lane: 'jungle', priority: 'main', pickRate: 85}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Graves', description: 'ショットガンで爆発' },
    { name: 'Heimerdinger', nameJa: 'ハイマーディンガー', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 25}, {lane: 'support', priority: 'niche', pickRate: 12}], image: 'Heimerdinger', description: 'タレットで領域支配' },
    { name: 'Jayce', nameJa: 'ジェイス', lanes: [{lane: 'top', priority: 'main', pickRate: 55}, {lane: 'mid', priority: 'viable', pickRate: 40}], image: 'Jayce', description: '形態変化で対応' },
    { name: 'Jinx', nameJa: 'ジンクス', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Jinx', description: '狂気のロケット' },
    { name: 'Kai\'Sa', nameJa: 'カイ=サ', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Kaisa', description: '進化する狩人' },
    { name: 'Karthus', nameJa: 'カーサス', lanes: [{lane: 'jungle', priority: 'main', pickRate: 70}, {lane: 'mid', priority: 'viable', pickRate: 25}], image: 'Karthus', description: '死後も戦う' },
    { name: 'Kassadin', nameJa: 'カサディン', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Kassadin', description: '虚空を歩く' },
    { name: 'Kennen', nameJa: 'ケネン', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'Kennen', description: '雷で範囲攻撃' },
    { name: 'Kindred', nameJa: 'キンドレッド', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Kindred', description: '死を司る双子' },
    { name: 'Kled', nameJa: 'クレッド', lanes: [{lane: 'top', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Kled', description: 'トカゲに乗る狂戦士' },
    { name: 'Kog\'Maw', nameJa: 'コグ=マウ', lanes: [{lane: 'adc', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'KogMaw', description: '虚空の砲台' },
    { name: 'Lillia', nameJa: 'リリア', lanes: [{lane: 'jungle', priority: 'main', pickRate: 85}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Lillia', description: '夢見る鹿' },
    { name: 'Lissandra', nameJa: 'リサンドラ', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'support', priority: 'viable', pickRate: 25}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Lissandra', description: '氷で敵を封じる' },
    { name: 'Malzahar', nameJa: 'マルザハール', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Malzahar', description: '虚無の預言者' },
    { name: 'Naafiri', nameJa: 'ナーフィーリ', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Naafiri', description: '群れをなす刃' },
    { name: 'Nidalee', nameJa: 'ニダリー', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Nidalee', description: 'ピューマに変身' },
    { name: 'Rumble', nameJa: 'ランブル', lanes: [{lane: 'top', priority: 'main', pickRate: 75}, {lane: 'mid', priority: 'viable', pickRate: 20}], image: 'Rumble', description: 'ロボで炎を撒く' },
    { name: 'Ryze', nameJa: 'ライズ', lanes: [{lane: 'mid', priority: 'main', pickRate: 75}, {lane: 'top', priority: 'viable', pickRate: 20}], image: 'Ryze', description: '古代魔法を操る' },
    { name: 'Shyvana', nameJa: 'シヴァーナ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 90}, {lane: 'top', priority: 'niche', pickRate: 8}], image: 'Shyvana', description: 'ドラゴンに変身' },
    { name: 'Singed', nameJa: 'シンジド', lanes: [{lane: 'top', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Singed', description: '毒を撒きながら走る' },
    { name: 'Swain', nameJa: 'スウェイン', lanes: [{lane: 'support', priority: 'main', pickRate: 55}, {lane: 'mid', priority: 'viable', pickRate: 30}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Swain', description: '鴉を操る戦略家' },
    { name: 'Syndra', nameJa: 'シンドラ', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Syndra', description: '球を操る計算されたダメージ' },
    { name: 'Taliyah', nameJa: 'タリヤ', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'jungle', priority: 'viable', pickRate: 35}], image: 'Taliyah', description: '岩を操る編む者' },
    { name: 'Teemo', nameJa: 'ティーモ', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'Teemo', description: 'キノコで罠を張る' },
    { name: 'Twisted Fate', nameJa: 'ツイステッド・フェイト', lanes: [{lane: 'mid', priority: 'main', pickRate: 90}, {lane: 'adc', priority: 'niche', pickRate: 8}], image: 'TwistedFate', description: 'カードで戦況を読む策士' },
    { name: 'Veigar', nameJa: 'ベイガー', lanes: [{lane: 'mid', priority: 'main', pickRate: 90}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Veigar', description: 'スタックで無限成長' },
    { name: 'Vel\'Koz', nameJa: 'ヴェル=コズ', lanes: [{lane: 'mid', priority: 'main', pickRate: 65}, {lane: 'support', priority: 'viable', pickRate: 30}], image: 'Velkoz', description: 'レーザーで敵を分解' },
    { name: 'Viktor', nameJa: 'ヴィクター', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Viktor', description: '進化した力で支配する' },
    { name: 'Xerath', nameJa: 'ゼラス', lanes: [{lane: 'mid', priority: 'main', pickRate: 80}, {lane: 'support', priority: 'niche', pickRate: 15}], image: 'Xerath', description: '超長距離砲撃' },
    { name: 'Zoe', nameJa: 'ゾーイ', lanes: [{lane: 'mid', priority: 'main', pickRate: 95}], image: 'Zoe', description: '星を落とすいたずら' },
    { name: 'Zyra', nameJa: 'ザイラ', lanes: [{lane: 'support', priority: 'main', pickRate: 70}, {lane: 'mid', priority: 'viable', pickRate: 25}], image: 'Zyra', description: '植物で領域支配' }
  ],
  
  // バランス型（中間）- 43体
  balanced: [
    { name: 'Akshan', nameJa: 'アクシャン', lanes: [{lane: 'mid', priority: 'main', pickRate: 90}, {lane: 'adc', priority: 'niche', pickRate: 8}], image: 'Akshan', description: '復讐のローグ' },
    { name: 'Aphelios', nameJa: 'アフェリオス', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Aphelios', description: '5つの武器を切り替え' },
    { name: 'Ashe', nameJa: 'アッシュ', lanes: [{lane: 'adc', priority: 'main', pickRate: 90}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Ashe', description: '氷の弓で敵を遅くする' },
    { name: 'Aurora', nameJa: 'オーロラ', lanes: [{lane: 'mid', priority: 'main', pickRate: 85}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Aurora', description: '精霊の力を使う' },
    { name: 'Bel\'Veth', nameJa: 'ベル=ヴェス', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Belveth', description: '虚空の女帝' },
    { name: 'Brand', nameJa: 'ブランド', lanes: [{lane: 'support', priority: 'main', pickRate: 60}, {lane: 'mid', priority: 'viable', pickRate: 30}, {lane: 'jungle', priority: 'niche', pickRate: 8}], image: 'Brand', description: '炎で燃やし尽くす' },
    { name: 'Caitlyn', nameJa: 'ケイトリン', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Caitlyn', description: 'スナイパーで狙撃' },
    { name: 'Fiddlesticks', nameJa: 'フィドルスティックス', lanes: [{lane: 'jungle', priority: 'main', pickRate: 90}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Fiddlesticks', description: '恐怖の案山子' },
    { name: 'Gangplank', nameJa: 'ガングプランク', lanes: [{lane: 'top', priority: 'main', pickRate: 55}, {lane: 'mid', priority: 'viable', pickRate: 30}, {lane: 'support', priority: 'niche', pickRate: 12}], image: 'Gangplank', description: '海賊の王' },
    { name: 'Gnar', nameJa: 'ナー', lanes: [{lane: 'top', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Gnar', description: '小さいか巨大化するか' },
    { name: 'Hwei', nameJa: 'フウェイ', lanes: [{lane: 'mid', priority: 'main', pickRate: 85}, {lane: 'support', priority: 'niche', pickRate: 12}], image: 'Hwei', description: '絵筆で魔法を描く' },
    { name: 'Illaoi', nameJa: 'イラオイ', lanes: [{lane: 'top', priority: 'main', pickRate: 95}], image: 'Illaoi', description: '触手の女司祭' },
    { name: 'Jarvan IV', nameJa: 'ジャーヴァンIV', lanes: [{lane: 'jungle', priority: 'main', pickRate: 85}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'JarvanIV', description: 'デマーシアの王子' },
    { name: 'Jhin', nameJa: 'ジン', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Jhin', description: '芸術的な暗殺者' },
    { name: 'Kalista', nameJa: 'カリスタ', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Kalista', description: '復讐の槍' },
    { name: 'Kayle', nameJa: 'ケイル', lanes: [{lane: 'top', priority: 'main', pickRate: 75}, {lane: 'mid', priority: 'viable', pickRate: 20}], image: 'Kayle', description: '天使に進化する' },
    { name: 'Lucian', nameJa: 'ルシアン', lanes: [{lane: 'adc', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Lucian', description: '二丁拳銃で連射' },
    { name: 'Miss Fortune', nameJa: 'ミス・フォーチュン', lanes: [{lane: 'adc', priority: 'main', pickRate: 90}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'MissFortune', description: '賞金稼ぎの女海賊' },
    { name: 'Nasus', nameJa: 'ナサス', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 10}, {lane: 'jungle', priority: 'niche', pickRate: 10}], image: 'Nasus', description: 'スタックで無限成長' },
    { name: 'Quinn', nameJa: 'クイン', lanes: [{lane: 'top', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'Quinn', description: '鷹と共に飛ぶ' },
    { name: 'Rek\'Sai', nameJa: 'レク=サイ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'RekSai', description: '地中を掘り進む' },
    { name: 'Sion', nameJa: 'サイオン', lanes: [{lane: 'top', priority: 'main', pickRate: 80}, {lane: 'support', priority: 'niche', pickRate: 10}, {lane: 'jungle', priority: 'niche', pickRate: 8}], image: 'Sion', description: '不死の巨人' },
    { name: 'Sivir', nameJa: 'シヴィア', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Sivir', description: 'ブーメランで範囲攻撃' },
    { name: 'Smolder', nameJa: 'スモルダー', lanes: [{lane: 'adc', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'Smolder', description: '若きドラゴン' },
    { name: 'Tristana', nameJa: 'トリスターナ', lanes: [{lane: 'adc', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Tristana', description: '大砲で爆破' },
    { name: 'Trundle', nameJa: 'トランドル', lanes: [{lane: 'jungle', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 30}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Trundle', description: 'トロルの王' },
    { name: 'Twitch', nameJa: 'トゥイッチ', lanes: [{lane: 'adc', priority: 'main', pickRate: 85}, {lane: 'jungle', priority: 'niche', pickRate: 12}], image: 'Twitch', description: 'ステルスのネズミ' },
    { name: 'Udyr', nameJa: 'ウディア', lanes: [{lane: 'jungle', priority: 'main', pickRate: 85}, {lane: 'top', priority: 'niche', pickRate: 12}], image: 'Udyr', description: '精霊の姿を切り替え' },
    { name: 'Urgot', nameJa: 'アーゴット', lanes: [{lane: 'top', priority: 'main', pickRate: 90}, {lane: 'mid', priority: 'niche', pickRate: 8}], image: 'Urgot', description: '処刑マシーン' },
    { name: 'Varus', nameJa: 'ヴァルス', lanes: [{lane: 'adc', priority: 'main', pickRate: 85}, {lane: 'mid', priority: 'niche', pickRate: 12}], image: 'Varus', description: '復讐の矢' },
    { name: 'Vayne', nameJa: 'ヴェイン', lanes: [{lane: 'adc', priority: 'main', pickRate: 90}, {lane: 'top', priority: 'niche', pickRate: 8}], image: 'Vayne', description: '闇の狩人' },
    { name: 'Vi', nameJa: 'ヴァイ', lanes: [{lane: 'jungle', priority: 'main', pickRate: 95}], image: 'Vi', description: 'パンチでぶっ飛ばす' },
    { name: 'Vladimir', nameJa: 'ウラディミール', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 35}], image: 'Vladimir', description: '血の魔術師' },
    { name: 'Wukong', nameJa: 'ウーコン', lanes: [{lane: 'jungle', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 35}], image: 'MonkeyKing', description: '猿の王' },
    { name: 'Xayah', nameJa: 'ザヤ', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Xayah', description: '羽根を操る反逆者' },
    { name: 'Yone', nameJa: 'ヨネ', lanes: [{lane: 'mid', priority: 'main', pickRate: 60}, {lane: 'top', priority: 'viable', pickRate: 35}], image: 'Yone', description: 'ヤスオの兄' },
    { name: 'Yorick', nameJa: 'ヨリック', lanes: [{lane: 'top', priority: 'main', pickRate: 95}], image: 'Yorick', description: '墓掘り人' },
    { name: 'Zeri', nameJa: 'ゼリ', lanes: [{lane: 'adc', priority: 'main', pickRate: 95}], image: 'Zeri', description: '電撃スパーク' },
    { name: 'Ziggs', nameJa: 'ジグス', lanes: [{lane: 'mid', priority: 'main', pickRate: 80}, {lane: 'adc', priority: 'niche', pickRate: 12}, {lane: 'support', priority: 'niche', pickRate: 8}], image: 'Ziggs', description: '爆弾魔' }
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
    description: 'あなたは今、味方を支えて勝利に導きたい気分！サポートや守りが得意なチャンピオンでチームを助けましょう！',
    emoji: '🛡️'
  },
  tactical: {
    title: 'タクティカルタイプ',
    description: 'あなたは今、頭を使って戦略的に戦いたい気分！計算されたプレイで勝利を掴みましょう！',
    emoji: '🧠'
  },
  balanced: {
    title: 'バランスタイプ',
    description: 'あなたは今、状況に応じてプレイスタイルを変えたい気分！バランスの取れたチャンピオンで柔軟に対応しましょう！',
    emoji: '⚖️'
  }
};

// レーン適性ボーナス定義
const laneBonusPoints = {
  'main': 30,      // メインロール
  'viable': 20,    // 実用的なサブロール
  'niche': 10,     // ニッチなロール
  'off-meta': 5    // オフメタ
};

console.log('✅ 気分診断データを読み込みました（全172体対応 - マルチレーン対応 v5）');
