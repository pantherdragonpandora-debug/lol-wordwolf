// ========================================
// デマーシアに心を込めて - VALORANTバージョン
// VALORANTの有名なセリフとシチュエーション
// ========================================

const valorantDemaciaData = [
  // ========== エージェントボイスライン ==========
  
  // Jett
  {
    phrase: "Watch this!",
    character: "Jett",
    situations: [
      "エース達成時",
      "ダッシュで敵陣に突入する時",
      "クラッチ状況で自信満々な時",
      "味方に煽られて反論する時",
      "ウルトで複数キルを狙う時",
      "ランクで昇格した時"
    ],
    difficulty: "easy"
  },
  {
    phrase: "Get out of my way!",
    character: "Jett",
    situations: [
      "ラッシュで先陣を切る時",
      "リーダーボードトップで調子に乗っている時",
      "味方が遅くてイライラしている時",
      "敵に囲まれて脱出する時",
      "クラッチ中に集中したい時",
      "スモークから飛び出す時"
    ],
    difficulty: "medium"
  },
  
  // Phoenix
  {
    phrase: "Here comes the party!",
    character: "Phoenix",
    situations: [
      "サイトに突入する時",
      "ウルトで復活した時",
      "フラッシュを投げる時",
      "勝利確定の時",
      "1v5でも諦めない時",
      "ファーストブラッドを取った時"
    ],
    difficulty: "easy"
  },
  {
    phrase: "I'm too hot for you!",
    character: "Phoenix",
    situations: [
      "エースを取った時",
      "連続キルした時",
      "相手をバカにする時",
      "自分のスキルで蘇生した時",
      "MVPを取った時",
      "ウルトで無双する時"
    ],
    difficulty: "medium"
  },
  
  // Sage
  {
    phrase: "I will heal you.",
    character: "Sage",
    situations: [
      "味方をヒールする時（優しく）",
      "瀕死の味方を発見した時",
      "自分もダメージ受けながら",
      "味方が文句言ってる時（仕方なく）",
      "蘇生した直後",
      "ラウンド開始時の励まし"
    ],
    difficulty: "medium"
  },
  {
    phrase: "You will not kill my allies!",
    character: "Sage",
    situations: [
      "ウォールで味方を守る時",
      "敵を倒して味方を守った時",
      "怒って敵に立ち向かう時",
      "スロウオーブで敵を止める時",
      "味方が集中砲火を浴びている時",
      "リザレクトで味方を復活させる時"
    ],
    difficulty: "hard"
  },
  
  // Reyna
  {
    phrase: "Such a waste of time.",
    character: "Reyna",
    situations: [
      "敵を簡単に倒した時",
      "一方的な試合で余裕な時",
      "格下相手に勝った時",
      "エースした時（冷静に）",
      "相手チームが弱すぎる時",
      "自分以外のチームが負けそうな時"
    ],
    difficulty: "hard"
  },
  {
    phrase: "More!",
    character: "Reyna",
    situations: [
      "連続キルして興奮している時",
      "ソウルオーブを吸収する時",
      "エースに向けて4キル目",
      "敵を倒して次を狙う時",
      "ディスミスで回復した時",
      "無双状態の時"
    ],
    difficulty: "easy"
  },
  
  // Sova
  {
    phrase: "I know exactly where you are.",
    character: "Sova",
    situations: [
      "リコンダーツで敵を見つけた時",
      "ドローンで敵位置を把握した時",
      "予測で敵の位置を当てた時",
      "ウルトで壁越しキルする時",
      "索敵後に味方に報告する時",
      "同じ場所にいる敵を煽る時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "Nowhere to run.",
    character: "Sova",
    situations: [
      "ウルトを撃つ時",
      "敵を追い詰めた時",
      "ショックダーツで敵を倒す時",
      "1v1で優位な時",
      "逃げる敵を見つけた時",
      "包囲して挟み撃ちする時"
    ],
    difficulty: "medium"
  },
  
  // Viper
  {
    phrase: "You're in my world now.",
    character: "Viper",
    situations: [
      "ピットを展開した時",
      "スモークでサイトを制圧した時",
      "毒エリアに敵が入った時",
      "防衛側で待ち構えている時",
      "ウルト内で敵を倒す時",
      "有利ポジションを取った時"
    ],
    difficulty: "hard"
  },
  {
    phrase: "Die for me.",
    character: "Viper",
    situations: [
      "毒で敵を倒す時",
      "冷酷に敵をキルする時",
      "ウルト内で優位な時",
      "瀕死の敵を見つけた時",
      "スネークバイトでダメージを与える時",
      "敵に命令する時"
    ],
    difficulty: "hard"
  },
  
  // Omen
  {
    phrase: "Scared?",
    character: "Omen",
    situations: [
      "テレポートで敵の背後に現れた時",
      "敵を倒した後",
      "闇から現れる時",
      "パラノイアで敵を盲目にした時",
      "クラッチで冷静な時",
      "敵を心理的に揺さぶる時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "I am everywhere.",
    character: "Omen",
    situations: [
      "ウルトで別の場所にテレポートする時",
      "敵を翻弄している時",
      "複数の場所で顔を出す時",
      "予測できない動きをする時",
      "神出鬼没でキルを重ねる時",
      "敵を混乱させている時"
    ],
    difficulty: "hard"
  },
  
  // Brimstone
  {
    phrase: "I've got your back.",
    character: "Brimstone",
    situations: [
      "スモークで味方をカバーする時",
      "スティムビーコンを置く時",
      "後方支援する時",
      "味方を励ます時",
      "防衛で味方を守る時",
      "経験豊富なリーダーとして"
    ],
    difficulty: "easy"
  },
  {
    phrase: "Bringing the heat!",
    character: "Brimstone",
    situations: [
      "インセンディアリーを投げる時",
      "ウルトを発動する時",
      "攻撃的な戦術を取る時",
      "連続キルした時",
      "サイト制圧する時",
      "炎でエリアを制圧する時"
    ],
    difficulty: "medium"
  },
  
  // Cypher
  {
    phrase: "I know everything about you.",
    character: "Cypher",
    situations: [
      "カメラで敵を監視している時",
      "トラップで敵を捕まえた時",
      "情報を収集した時",
      "敵の動きを予測して当てた時",
      "神経戦で優位な時",
      "ウルトで敵位置を暴露した時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "No secrets are safe.",
    character: "Cypher",
    situations: [
      "ウルトで敵の位置を明らかにする時",
      "トラップワイヤーが発動した時",
      "スパイカメラで情報を得た時",
      "敵の戦略を見抜いた時",
      "死体から情報を得た時",
      "監視網を完成させた時"
    ],
    difficulty: "hard"
  },
  
  // Raze
  {
    phrase: "Fire in the hole!",
    character: "Raze",
    situations: [
      "グレネードを投げる時",
      "ウルトを撃つ時",
      "ブームボットを出す時",
      "爆発物で敵を倒す時",
      "派手に攻める時",
      "エリアクリアする時"
    ],
    difficulty: "easy"
  },
  {
    phrase: "Let's paint the town!",
    character: "Raze",
    situations: [
      "試合開始時にテンション高い時",
      "連続キルして楽しんでいる時",
      "勝利が見えて余裕な時",
      "爆発物で派手に倒した時",
      "エースを取りそうな時",
      "ウルトで複数キルした時"
    ],
    difficulty: "medium"
  },
  
  // Breach
  {
    phrase: "Time to bring down the house!",
    character: "Breach",
    situations: [
      "ウルトを発動する時",
      "フォルトラインでエリア制圧する時",
      "壁を破壊する勢いで攻める時",
      "派手に突入する時",
      "敵陣を崩す時",
      "アフターショックで壁越しキル"
    ],
    difficulty: "medium"
  },
  {
    phrase: "Can't run from this!",
    character: "Breach",
    situations: [
      "ウルトで敵を拘束した時",
      "フラッシュポイントを発動した時",
      "フォルトラインで敵を動けなくした時",
      "逃げる敵を追い詰めた時",
      "範囲攻撃で複数を巻き込む時",
      "エリアを封鎖した時"
    ],
    difficulty: "hard"
  },
  
  // Killjoy
  {
    phrase: "My bots are going to school you!",
    character: "Killjoy",
    situations: [
      "タレットで敵を倒した時",
      "アラームボットが敵を見つけた時",
      "テクノロジーで勝った時",
      "天才的なセットアップで勝利",
      "トラップで敵を倒す時",
      "相手を煽る時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "GG!",
    character: "Killjoy",
    situations: [
      "試合に勝った時",
      "簡単に敵を倒した時",
      "完璧なラウンドだった時",
      "相手を称賛する時（皮肉込み）",
      "自分のプレイに満足した時",
      "気分良くラウンド終了"
    ],
    difficulty: "easy"
  },
  
  // Skye
  {
    phrase: "Time to hunt!",
    character: "Skye",
    situations: [
      "敵を追跡する時",
      "ドッグを出して索敵する時",
      "攻撃的に動く時",
      "敵の位置を特定した時",
      "クラッチで自信がある時",
      "ラウンド開始時に意気込む"
    ],
    difficulty: "easy"
  },
  {
    phrase: "Stay with me!",
    character: "Skye",
    situations: [
      "味方をヒールする時",
      "チームをまとめる時",
      "一緒に行動しようと呼びかける時",
      "味方を励ます時",
      "瀕死の味方を助ける時",
      "戦略的に動く時"
    ],
    difficulty: "medium"
  },
  
  // Yoru
  {
    phrase: "You're just a stepping stone.",
    character: "Yoru",
    situations: [
      "敵を簡単に倒した時",
      "格下を相手にしている時",
      "冷酷に勝利した時",
      "自信満々な時",
      "相手を侮辱する時",
      "エースに向けて連続キル中"
    ],
    difficulty: "hard"
  },
  {
    phrase: "Am I really that predictable?",
    character: "Yoru",
    situations: [
      "フェイクテレポートで騙した時",
      "予想外の場所から現れた時",
      "ウルトで敵を翻弄した時",
      "敵の裏をかいた時",
      "トリッキーなプレイが決まった時",
      "敵に読まれたと勘違いさせる時"
    ],
    difficulty: "hard"
  },
  
  // Astra
  {
    phrase: "The cosmos guide me.",
    character: "Astra",
    situations: [
      "スターを設置する時",
      "完璧なタイミングでスキルを使う時",
      "宇宙的な力を感じる時",
      "冷静に戦況を見ている時",
      "予知能力のような判断をした時",
      "味方をサポートする時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "I control this battlefield.",
    character: "Astra",
    situations: [
      "複数のスターで戦場を支配する時",
      "ウルトで完全に分断した時",
      "完璧なスモーク配置",
      "敵の動きを制限している時",
      "戦術的優位を取った時",
      "全てを把握している時"
    ],
    difficulty: "hard"
  },
  
  // Chamber
  {
    phrase: "How's that for style?",
    character: "Chamber",
    situations: [
      "美しいヘッドショットを決めた時",
      "テレポートで華麗に脱出した時",
      "ウルトでキルを取った時",
      "スタイリッシュにエースした時",
      "完璧なプレイをした時",
      "余裕で勝った時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "Perfection.",
    character: "Chamber",
    situations: [
      "完璧なヘッドショット",
      "美しいラウンド勝利",
      "計画通りに事が進んだ時",
      "フルバイラウンドで勝った時",
      "自分のプレイに満足した時",
      "芸術的なキルをした時"
    ],
    difficulty: "medium"
  },
  
  // Neon
  {
    phrase: "Can't catch me!",
    character: "Neon",
    situations: [
      "スライディングで逃げる時",
      "スピードで敵を翻弄する時",
      "ウルトで走り回る時",
      "敵の攻撃を避けた時",
      "素早く移動してキルする時",
      "追いかけられて逃げ切った時"
    ],
    difficulty: "easy"
  },
  {
    phrase: "Too slow!",
    character: "Neon",
    situations: [
      "スピードで敵を出し抜いた時",
      "相手の反応が遅い時",
      "素早くキルした時",
      "ラン&ガンで倒した時",
      "敵をバカにする時",
      "圧倒的なスピード差を見せた時"
    ],
    difficulty: "medium"
  },
  
  // Fade
  {
    phrase: "Your worst nightmare.",
    character: "Fade",
    situations: [
      "ウルトで敵を恐怖に陥れる時",
      "敵を倒した後",
      "ナイトメアを放った時",
      "心理戦で優位な時",
      "恐怖を与えながら接近する時",
      "敵を追い詰めた時"
    ],
    difficulty: "hard"
  },
  {
    phrase: "I see your fears.",
    character: "Fade",
    situations: [
      "ハウントで敵を見つけた時",
      "敵の位置を把握した時",
      "ウルトで敵を暴露した時",
      "心理的に攻める時",
      "敵の弱点を突く時",
      "索敵スキルで情報を得た時"
    ],
    difficulty: "medium"
  },
  
  // Harbor
  {
    phrase: "Ride the wave!",
    character: "Harbor",
    situations: [
      "ウェーブを展開する時",
      "水のスキルで突入する時",
      "勢いに乗っている時",
      "攻撃的に前に出る時",
      "連続キル中",
      "チームをリードする時"
    ],
    difficulty: "easy"
  },
  {
    phrase: "The ocean protects us.",
    character: "Harbor",
    situations: [
      "コーブで味方を守る時",
      "防御的なスキルを使う時",
      "水の壁で遮蔽する時",
      "味方をサポートする時",
      "敵の攻撃を防いだ時",
      "安全なエリアを作った時"
    ],
    difficulty: "medium"
  },
  
  // Gekko
  {
    phrase: "Let's get 'em, buddy!",
    character: "Gekko",
    situations: [
      "クリーチャーを出す時",
      "味方と一緒に攻める時",
      "ポジティブに試合を楽しむ時",
      "ウィングマンでプラント/ディフューズ",
      "チームワークで勝つ時",
      "友達と遊んでいる時"
    ],
    difficulty: "easy"
  },
  {
    phrase: "Good job, amigo!",
    character: "Gekko",
    situations: [
      "クリーチャーがキルアシストした時",
      "味方が良いプレイをした時",
      "チームで勝利した時",
      "ディジーでアシストした時",
      "フレンドリーに褒める時",
      "ラウンド勝利後"
    ],
    difficulty: "easy"
  },
  
  // Deadlock
  {
    phrase: "Locked down.",
    character: "Deadlock",
    situations: [
      "ウルトで敵を捕まえた時",
      "ネットで敵を拘束した時",
      "エリアを完全に封鎖した時",
      "敵の動きを止めた時",
      "防衛に成功した時",
      "完璧なセットアップで勝った時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "You're not going anywhere.",
    character: "Deadlock",
    situations: [
      "ウルトで敵を捕らえた時",
      "トラップで敵を止めた時",
      "逃げ道を塞いだ時",
      "包囲して追い詰めた時",
      "敵を拘束した時",
      "確実にキルできる状況"
    ],
    difficulty: "hard"
  },
  
  // Iso
  {
    phrase: "One versus one. Let's settle this.",
    character: "Iso",
    situations: [
      "ウルトで1v1に持ち込む時",
      "クラッチ状況",
      "公平な勝負を挑む時",
      "自信を持って対決する時",
      "決闘を申し込む時",
      "最後の一人として"
    ],
    difficulty: "medium"
  },
  {
    phrase: "Flow state.",
    character: "Iso",
    situations: [
      "完璧な集中状態の時",
      "シールドを発動する時",
      "連続キルで調子が良い時",
      "冷静沈着にプレイしている時",
      "ゾーンに入った時",
      "無敵状態を感じる時"
    ],
    difficulty: "hard"
  },
  
  // ========== 汎用シチュエーション（キャラ不問） ==========
  
  {
    phrase: "Nice shot!",
    character: "汎用",
    situations: [
      "味方のキルを褒める時",
      "自分の良いキルの後（謙虚に）",
      "敵の良いキルを認める時（皮肉込み）",
      "偶然のキルが決まった時",
      "味方を励ます時",
      "良いヘッドショットを見た時"
    ],
    difficulty: "easy"
  },
  {
    phrase: "One more!",
    character: "汎用",
    situations: [
      "敵が残り1人の時",
      "エースまであと1キル",
      "クラッチで敵を減らした時",
      "連続キル中でまだ足りない時",
      "勝利まであと少しの時",
      "もう1ラウンド取れば勝利"
    ],
    difficulty: "easy"
  },
  {
    phrase: "They're low!",
    character: "汎用",
    situations: [
      "敵にダメージを与えた後",
      "味方に詰めを任せる時",
      "瀕死の敵を見つけた時",
      "交戦後の情報共有",
      "味方をサポートする時",
      "敵のHPが少ない時"
    ],
    difficulty: "easy"
  },
  {
    phrase: "Clutch or kick!",
    character: "汎用",
    situations: [
      "味方に冗談でプレッシャーをかける時",
      "1vX状況で味方を応援",
      "重要な局面で",
      "友達と遊んでいて煽る時",
      "クラッチ状況を楽しむ時",
      "緊張感を和らげる冗談"
    ],
    difficulty: "medium"
  },
  {
    phrase: "Eco round. Play safe.",
    character: "汎用",
    situations: [
      "お金がない時に指示",
      "セーブラウンドを伝える時",
      "リスクを避けたい時",
      "戦略的に撤退する時",
      "次のラウンドのため",
      "冷静な判断を促す時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "Spike down!",
    character: "汎用",
    situations: [
      "スパイクを設置した時",
      "味方に設置完了を伝える時",
      "緊張が走る瞬間",
      "重要な情報共有",
      "防衛に移行する時",
      "時間との戦いで設置成功"
    ],
    difficulty: "easy"
  },
  {
    phrase: "Rotate! Rotate!",
    character: "汎用",
    situations: [
      "別サイトに敵が来た時",
      "急いで移動を指示する時",
      "焦っている時",
      "戦略変更を伝える時",
      "フェイクだと気づいた時",
      "緊急の移動が必要な時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "Rush B! Don't stop!",
    character: "汎用",
    situations: [
      "全員でラッシュする時",
      "勢いで押し切る戦術",
      "時間がない時",
      "ストレートな攻めをする時",
      "相手の裏をかく時",
      "アグレッシブな作戦"
    ],
    difficulty: "easy"
  },
  {
    phrase: "GG EZ",
    character: "汎用",
    situations: [
      "圧勝した後（煽り）",
      "相手を侮辱する時",
      "余裕で勝った時",
      "冗談半分で言う時",
      "簡単な試合だった時",
      "トキシックな時"
    ],
    difficulty: "medium"
  },
  {
    phrase: "Defuse! Defuse!",
    character: "汎用",
    situations: [
      "スパイク解除を急ぐ時",
      "カバーしながら指示する時",
      "時間がギリギリの時",
      "緊迫した場面で",
      "全員倒して安全確認後",
      "勝利目前の時"
    ],
    difficulty: "easy"
  }
];

// グローバルに公開（ブラウザ環境）
if (typeof window !== 'undefined') {
  window.valorantDemaciaData = valorantDemaciaData;
}

// モジュールとしてエクスポート（Node.js環境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = valorantDemaciaData;
}
