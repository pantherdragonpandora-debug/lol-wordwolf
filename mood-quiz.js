// ========================================
// 気分診断チャンピオン選択データ（全172体対応 - マルチレーン対応 v7 - 多言語対応版）
// ========================================

console.log('🎯🎯🎯 mood-quiz-data.js: ファイル読み込み開始 (v7 - 多言語対応)');

// 多言語対応：質問の翻訳データ
const moodQuizQuestionsI18n = {
  ja: {
    questions: [
      '好きなレーンは？',
      'チームファイトでの役割は？',
      '今日の気分は？',
      'どんなプレイスタイルが好き？',
      '今の気持ちに一番近いのは？',
      'レーニングフェーズでのプレイは？',
      '決定的な瞬間では？',
      'ゲームで重視することは？',
      '好きな戦闘距離は？',
      'ゲーム序盤のスタイルは？',
      'ゲーム終盤の立ち回りは？',
      'あなたのプレイで最も大切なことは？'
    ],
    options: [
      // Q1
      ['トップレーン', 'ジャングル', 'ミッドレーン', 'ADC', 'サポート'],
      // Q2
      ['敵を倒しまくる', '味方を守る', 'CCで敵を妨害', '敵のキャリーを狙う', 'ポークで削る', 'ゾーニングで牽制'],
      // Q3
      ['元気いっぱい！', '落ち着いている', 'ちょっと疲れてる', 'ストレス発散したい', '頭を使いたい'],
      // Q4
      ['前に出て戦う！', '味方をサポート', '計算して立ち回る', 'ワンショットキル！', 'じわじわ削る', '機動力で翻弄'],
      // Q5
      ['ワクワクしてる！', '冷静に考えたい', '優しくしたい', 'スカッとしたい！'],
      // Q6
      ['積極的に交易する', '安全にファーム', 'ロームで味方を助ける', 'プッシュで圧力をかける', 'フリーズで有利を作る', 'オールイン狙う'],
      // Q7
      ['積極的にイニシアチブ', 'カウンターを狙う', '味方をフォロー', '状況を見て判断'],
      // Q8
      ['キルを取る', '味方を勝たせる', 'オブジェクトを取る', '戦略的に勝つ'],
      // Q9
      ['接近戦が好き', '近～中距離（ブルーザー）', '中距離で立ち回る', '中～遠距離（ポーク）', '遠距離から攻撃', '状況に応じて変える'],
      // Q10
      ['序盤から有利を作る', '安全に成長する', '味方のガンクを待つ', '敵の動きを見る'],
      // Q11
      ['ピックで試合を決める', '集団戦で勝つ', '味方を守り切る', 'スプリットで圧力', 'バロン/ドラゴンで決める'],
      // Q12
      ['キャリーして勝つ', 'チームを支える', '頭脳で勝つ', '楽しくプレイする']
    ]
  },
  en: {
    questions: [
      'Favorite Lane?',
      'Your Role in Teamfights?',
      'How are you feeling today?',
      'Preferred Playstyle?',
      'Which feeling is closest to you now?',
      'Your Laning Phase Play?',
      'In Decisive Moments?',
      'What do you prioritize in game?',
      'Preferred Combat Range?',
      'Early Game Style?',
      'Late Game Strategy?',
      'What matters most in your play?'
    ],
    options: [
      // Q1
      ['Top Lane', 'Jungle', 'Mid Lane', 'ADC', 'Support'],
      // Q2
      ['Kill enemies', 'Protect allies', 'CC and disrupt', 'Target enemy carries', 'Poke and chip', 'Zone and pressure'],
      // Q3
      ['Full of energy!', 'Calm and collected', 'A bit tired', 'Want to blow off steam', 'Want to think strategically'],
      // Q4
      ['Fight in the front!', 'Support allies', 'Calculate and position', 'One-shot kills!', 'Chip away gradually', 'Outplay with mobility'],
      // Q5
      ['Excited!', 'Want to think calmly', 'Want to be kind', 'Want a thrill!'],
      // Q6
      ['Trade aggressively', 'Farm safely', 'Roam to help team', 'Push for pressure', 'Freeze for advantage', 'Go all-in'],
      // Q7
      ['Take initiative', 'Wait for counter', 'Follow teammates', 'Judge the situation'],
      // Q8
      ['Get kills', 'Help team win', 'Take objectives', 'Win strategically'],
      // Q9
      ['Melee combat', 'Close-mid range (Bruiser)', 'Mid range', 'Mid-long range (Poke)', 'Long range attacks', 'Adapt to situation'],
      // Q10
      ['Build early advantage', 'Scale safely', 'Wait for ganks', 'Watch enemy moves'],
      // Q11
      ['Pick to win', 'Win teamfights', 'Protect team', 'Split push pressure', 'Secure Baron/Dragon'],
      // Q12
      ['Carry to victory', 'Support the team', 'Win with brain', 'Play for fun']
    ]
  },
  ko: {
    questions: [
      '좋아하는 라인은?',
      '팀파이트에서의 역할은?',
      '오늘 기분은?',
      '선호하는 플레이 스타일은?',
      '지금 기분과 가장 가까운 것은?',
      '라인전 플레이는?',
      '결정적인 순간에는?',
      '게임에서 중요하게 생각하는 것은?',
      '좋아하는 전투 거리는?',
      '게임 초반 스타일은?',
      '게임 후반 전략은?',
      '플레이에서 가장 중요한 것은?'
    ],
    options: [
      // Q1
      ['탑 라인', '정글', '미드 라인', 'ADC', '서포트'],
      // Q2
      ['적을 처치', '아군 보호', 'CC로 방해', '적 캐리 노림', '포크로 견제', '존 압박'],
      // Q3
      ['힘이 넘쳐!', '침착함', '좀 피곤해', '스트레스 풀고 싶어', '머리 쓰고 싶어'],
      // Q4
      ['앞으로 나가 싸운다!', '아군 서포트', '계산하며 플레이', '원샷 킬!', '천천히 깎아내기', '기동력으로 압도'],
      // Q5
      ['설렌다!', '침착하게 생각하고 싶어', '친절하게 대하고 싶어', '통쾌하고 싶어!'],
      // Q6
      ['적극적으로 교전', '안전하게 파밍', '로밍으로 지원', '푸시로 압박', '프리즈로 우위', '올인 노림'],
      // Q7
      ['적극적으로 주도', '카운터 노림', '아군 따라가기', '상황 보고 판단'],
      // Q8
      ['킬 획득', '팀 승리 돕기', '오브젝트 확보', '전략적 승리'],
      // Q9
      ['근접전 선호', '근~중거리 (브루저)', '중거리 플레이', '중~원거리 (포크)', '원거리 공격', '상황에 맞게'],
      // Q10
      ['초반 우위 확보', '안전하게 성장', '아군 갱킹 대기', '적 움직임 관찰'],
      // Q11
      ['픽으로 승부', '한타로 승리', '아군 보호', '스플릿 압박', '바론/드래곤 확보'],
      // Q12
      ['캐리해서 승리', '팀 서포트', '머리로 승리', '즐겁게 플레이']
    ]
  },
  zh: {
    questions: [
      '喜欢的路线？',
      '团战中的角色？',
      '今天的心情？',
      '喜欢的游戏风格？',
      '现在最接近的感觉是？',
      '对线期的打法？',
      '决定性时刻？',
      '游戏中重视什么？',
      '喜欢的战斗距离？',
      '游戏前期风格？',
      '游戏后期策略？',
      '你的游戏中最重要的是？'
    ],
    options: [
      // Q1
      ['上路', '打野', '中路', 'ADC', '辅助'],
      // Q2
      ['击杀敌人', '保护队友', 'CC控制', '针对敌方C位', '消耗', '牵制压力'],
      // Q3
      ['精力充沛！', '冷静', '有点累', '想发泄压力', '想动脑'],
      // Q4
      ['冲锋战斗！', '支援队友', '计算走位', '秒杀！', '慢慢消耗', '机动性压制'],
      // Q5
      ['兴奋！', '想冷静思考', '想友善待人', '想爽快！'],
      // Q6
      ['积极换血', '安全补刀', '游走支援', '推线施压', '控线优势', '全力拼杀'],
      // Q7
      ['积极主动', '等待反击', '跟随队友', '观察局势'],
      // Q8
      ['获得击杀', '帮助团队', '拿下目标', '战略取胜'],
      // Q9
      ['近战', '近中距离（战士）', '中距离', '中远距离（消耗）', '远距离攻击', '根据情况'],
      // Q10
      ['前期建立优势', '安全发育', '等待队友gank', '观察敌人动向'],
      // Q11
      ['单抓决胜', '团战取胜', '保护队友', '分推压力', '大龙/小龙决胜'],
      // Q12
      ['Carry取胜', '支援团队', '智取胜利', '开心游戏']
    ]
  }
};

// 診断の質問データ（12問 - 多言語対応版）
// 実際のテキストは moodQuizQuestionsI18n から取得
const moodQuizQuestions = [
  {
    id: 1,
    questionKey: 0, // moodQuizQuestionsI18n.questions[0]
    type: 'lane',
    options: [
      { textKey: 0, lane: 'top', points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { textKey: 1, lane: 'jungle', points: { aggressive: 2, supportive: 1, tactical: 3 } },
      { textKey: 2, lane: 'mid', points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { textKey: 3, lane: 'adc', points: { aggressive: 2, supportive: 0, tactical: 3 } },
      { textKey: 4, lane: 'support', points: { aggressive: 0, supportive: 3, tactical: 2 } }
    ]
  },
  {
    id: 2,
    questionKey: 1,
    type: 'role',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { textKey: 1, points: { aggressive: 1, supportive: 3, tactical: 1 } },
      { textKey: 2, points: { aggressive: 1, supportive: 2, tactical: 3 } },
      { textKey: 3, points: { aggressive: 3, supportive: 0, tactical: 2 } },
      { textKey: 4, points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { textKey: 5, points: { aggressive: 1, supportive: 2, tactical: 3 } }
    ]
  },
  {
    id: 3,
    questionKey: 2,
    type: 'mood',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { textKey: 1, points: { aggressive: 0, supportive: 2, tactical: 3 } },
      { textKey: 2, points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { textKey: 3, points: { aggressive: 3, supportive: 0, tactical: 0 } },
      { textKey: 4, points: { aggressive: 0, supportive: 1, tactical: 3 } }
    ]
  },
  {
    id: 4,
    questionKey: 3,
    type: 'playstyle',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { textKey: 1, points: { aggressive: 0, supportive: 3, tactical: 2 } },
      { textKey: 2, points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { textKey: 3, points: { aggressive: 3, supportive: 0, tactical: 2 } },
      { textKey: 4, points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { textKey: 5, points: { aggressive: 2, supportive: 1, tactical: 3 } }
    ]
  },
  {
    id: 5,
    questionKey: 4,
    type: 'emotion',
    options: [
      { textKey: 0, points: { aggressive: 2, supportive: 1, tactical: 1 } },
      { textKey: 1, points: { aggressive: 0, supportive: 1, tactical: 3 } },
      { textKey: 2, points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { textKey: 3, points: { aggressive: 3, supportive: 0, tactical: 0 } }
    ]
  },
  {
    id: 6,
    questionKey: 5,
    type: 'laning',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { textKey: 1, points: { aggressive: 0, supportive: 1, tactical: 3 } },
      { textKey: 2, points: { aggressive: 1, supportive: 3, tactical: 2 } },
      { textKey: 3, points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { textKey: 4, points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { textKey: 5, points: { aggressive: 3, supportive: 0, tactical: 1 } }
    ]
  },
  {
    id: 7,
    questionKey: 6,
    type: 'decisive',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { textKey: 1, points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { textKey: 2, points: { aggressive: 1, supportive: 3, tactical: 1 } },
      { textKey: 3, points: { aggressive: 0, supportive: 2, tactical: 3 } }
    ]
  },
  {
    id: 8,
    questionKey: 7,
    type: 'priority',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { textKey: 1, points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { textKey: 2, points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { textKey: 3, points: { aggressive: 1, supportive: 2, tactical: 3 } }
    ]
  },
  {
    id: 9,
    questionKey: 8,
    type: 'range',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 1, tactical: 0 } },
      { textKey: 1, points: { aggressive: 2, supportive: 1, tactical: 1 } },
      { textKey: 2, points: { aggressive: 2, supportive: 1, tactical: 2 } },
      { textKey: 3, points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { textKey: 4, points: { aggressive: 1, supportive: 1, tactical: 3 } },
      { textKey: 5, points: { aggressive: 1, supportive: 2, tactical: 2 } }
    ]
  },
  {
    id: 10,
    questionKey: 9,
    type: 'early',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 1, tactical: 1 } },
      { textKey: 1, points: { aggressive: 0, supportive: 2, tactical: 3 } },
      { textKey: 2, points: { aggressive: 1, supportive: 3, tactical: 2 } },
      { textKey: 3, points: { aggressive: 1, supportive: 1, tactical: 3 } }
    ]
  },
  {
    id: 11,
    questionKey: 10,
    type: 'late',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 0, tactical: 2 } },
      { textKey: 1, points: { aggressive: 2, supportive: 2, tactical: 2 } },
      { textKey: 2, points: { aggressive: 0, supportive: 3, tactical: 2 } },
      { textKey: 3, points: { aggressive: 2, supportive: 0, tactical: 3 } },
      { textKey: 4, points: { aggressive: 1, supportive: 2, tactical: 3 } }
    ]
  },
  {
    id: 12,
    questionKey: 11,
    type: 'philosophy',
    options: [
      { textKey: 0, points: { aggressive: 3, supportive: 0, tactical: 1 } },
      { textKey: 1, points: { aggressive: 0, supportive: 3, tactical: 1 } },
      { textKey: 2, points: { aggressive: 0, supportive: 1, tactical: 3 } },
      { textKey: 3, points: { aggressive: 1, supportive: 2, tactical: 1 } }
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

console.log('✅✅✅ 気分診断データを読み込みました（全172体対応 - マルチレーン対応 v6）');
console.log('📊 データサマリー:', {
  questions: moodQuizQuestions.length,
  aggressiveChampions: championsByMood.aggressive.length,
  supportiveChampions: championsByMood.supportive.length,
  tacticalChampions: championsByMood.tactical.length,
  balancedChampions: championsByMood.balanced.length
});
