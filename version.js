// ========================================
// デマーシアに心を込めて - ゲームデータ（拡張版）
// ========================================
// 「はぁというゲーム」のLOLバージョン
// LOLの有名なセリフを、指定されたシチュエーションで演じる

const demaciaData = {
  // セリフとシチュエーションのセット（60個）
  phrases: [
    // === 戦闘系セリフ ===
    {
      id: 1,
      text: 'デマーシアァァァァ！',
      character: 'ガレン',
      situations: [
        { id: 1, text: 'ペンタキルを決めた時', difficulty: 'easy' },
        { id: 2, text: 'ガレンに追われている時', difficulty: 'medium' },
        { id: 3, text: '悲しい時', difficulty: 'hard' },
        { id: 4, text: '眠い時', difficulty: 'hard' },
        { id: 5, text: '勝利を確信した時', difficulty: 'easy' },
        { id: 6, text: 'バグに遭遇した時', difficulty: 'medium' }
      ]
    },
    {
      id: 2,
      text: 'ハサキ',
      character: 'ヤスオ',
      situations: [
        { id: 1, text: 'ヤスオの3回目のQに当たった時', difficulty: 'medium' },
        { id: 2, text: '怒っている時', difficulty: 'easy' },
        { id: 3, text: '嬉しい時', difficulty: 'medium' },
        { id: 4, text: '諦めた時', difficulty: 'hard' },
        { id: 5, text: 'フラッシュをミスった時', difficulty: 'hard' },
        { id: 6, text: '集中している時', difficulty: 'medium' }
      ]
    },
    {
      id: 3,
      text: '死ぬがよい',
      character: 'ダリウス',
      situations: [
        { id: 1, text: '怒っている時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: '挨拶する時', difficulty: 'hard' },
        { id: 4, text: '嬉しい時', difficulty: 'hard' },
        { id: 5, text: '低HPの敵を見つけた時', difficulty: 'easy' },
        { id: 6, text: 'さようならを言う時', difficulty: 'medium' }
      ]
    },
    {
      id: 4,
      text: '闇に飲まれろ！',
      character: 'シンドラ',
      situations: [
        { id: 1, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 2, text: '怒っている時', difficulty: 'easy' },
        { id: 3, text: '挨拶する時', difficulty: 'hard' },
        { id: 4, text: '球を6個以上持っている時', difficulty: 'medium' },
        { id: 5, text: '暗い部屋に入る時', difficulty: 'medium' },
        { id: 6, text: 'おやすみを言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 5,
      text: '舞え！',
      character: 'イレリア',
      situations: [
        { id: 1, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 2, text: '楽しい時', difficulty: 'easy' },
        { id: 3, text: '命令する時', difficulty: 'easy' },
        { id: 4, text: 'ダンスを見ている時', difficulty: 'medium' },
        { id: 5, text: 'ブレードが5枚揃った時', difficulty: 'medium' },
        { id: 6, text: '踊りたい時', difficulty: 'easy' }
      ]
    },
    {
      id: 6,
      text: '時間だ',
      character: 'エコー',
      situations: [
        { id: 1, text: 'ゲーム開始時', difficulty: 'easy' },
        { id: 2, text: 'チームファイトが始まる時', difficulty: 'easy' },
        { id: 3, text: '焦っている時', difficulty: 'medium' },
        { id: 4, text: '時間がない時', difficulty: 'easy' },
        { id: 5, text: 'ウルトでやり直したい時', difficulty: 'medium' },
        { id: 6, text: '眠い時', difficulty: 'hard' }
      ]
    },
    {
      id: 7,
      text: '完璧だ',
      character: 'ジン',
      situations: [
        { id: 1, text: '満足した時', difficulty: 'easy' },
        { id: 2, text: '4キル目を取った時', difficulty: 'easy' },
        { id: 3, text: '皮肉を言う時', difficulty: 'medium' },
        { id: 4, text: 'フラッシュをミスった時', difficulty: 'hard' },
        { id: 5, text: 'コンボが決まった時', difficulty: 'easy' },
        { id: 6, text: 'チームが全滅した時', difficulty: 'hard' }
      ]
    },
    {
      id: 8,
      text: 'うん、全てを燃やそう',
      character: 'アニー',
      situations: [
        { id: 1, text: '怒っている時', difficulty: 'easy' },
        { id: 2, text: '楽しんでいる時', difficulty: 'medium' },
        { id: 3, text: 'ミニオンウェーブをクリアする時', difficulty: 'easy' },
        { id: 4, text: '料理を失敗した時', difficulty: 'hard' },
        { id: 5, text: 'ティーモのキノコを踏んだ時', difficulty: 'medium' },
        { id: 6, text: '諦めた時', difficulty: 'hard' }
      ]
    },

    // === 短いセリフ ===
    {
      id: 9,
      text: 'OK',
      character: 'ラムス',
      situations: [
        { id: 1, text: '了解した時', difficulty: 'easy' },
        { id: 2, text: '怒っている時', difficulty: 'hard' },
        { id: 3, text: '嬉しい時', difficulty: 'medium' },
        { id: 4, text: '泣いている時', difficulty: 'hard' },
        { id: 5, text: 'タワーダイブを見た時', difficulty: 'medium' },
        { id: 6, text: '全く理解できない時', difficulty: 'hard' }
      ]
    },
    {
      id: 10,
      text: 'はい',
      character: 'ソナ',
      situations: [
        { id: 1, text: '了解した時', difficulty: 'easy' },
        { id: 2, text: '怒っている時', difficulty: 'hard' },
        { id: 3, text: '泣いている時', difficulty: 'hard' },
        { id: 4, text: '無理やり同意させられた時', difficulty: 'medium' },
        { id: 5, text: '実はソナじゃない時（声が出る）', difficulty: 'hard' },
        { id: 6, text: '本当は嫌な時', difficulty: 'medium' }
      ]
    },
    {
      id: 11,
      text: 'やったか？',
      character: 'ジンクス',
      situations: [
        { id: 1, text: '敵を倒したと思った時', difficulty: 'easy' },
        { id: 2, text: '不安な時', difficulty: 'medium' },
        { id: 3, text: '期待している時', difficulty: 'easy' },
        { id: 4, text: 'ザックが分裂した時', difficulty: 'hard' },
        { id: 5, text: 'テレポートが見えた時', difficulty: 'medium' },
        { id: 6, text: '自信がない時', difficulty: 'medium' }
      ]
    },
    {
      id: 12,
      text: 'ハッピー？',
      character: 'ティーモ',
      situations: [
        { id: 1, text: '嬉しい時', difficulty: 'easy' },
        { id: 2, text: 'キノコで敵を倒した時', difficulty: 'easy' },
        { id: 3, text: '皮肉を言う時', difficulty: 'medium' },
        { id: 4, text: '怒っている時', difficulty: 'hard' },
        { id: 5, text: '味方が負けている時', difficulty: 'hard' },
        { id: 6, text: '無邪気に聞く時', difficulty: 'easy' }
      ]
    },
    {
      id: 13,
      text: 'ワンモア',
      character: 'ジャックス',
      situations: [
        { id: 1, text: 'もう一回やりたい時', difficulty: 'easy' },
        { id: 2, text: '負けた後', difficulty: 'easy' },
        { id: 3, text: '怒っている時', difficulty: 'medium' },
        { id: 4, text: 'Eをもう一回使いたい時', difficulty: 'medium' },
        { id: 5, text: 'おかわりが欲しい時', difficulty: 'easy' },
        { id: 6, text: '疲れている時', difficulty: 'hard' }
      ]
    },

    // === 感情・状態系 ===
    {
      id: 14,
      text: 'ゆっくりでいい',
      character: 'ジリアン',
      situations: [
        { id: 1, text: '落ち着かせる時', difficulty: 'easy' },
        { id: 2, text: '時間を戻したい時', difficulty: 'medium' },
        { id: 3, text: '焦っている時', difficulty: 'medium' },
        { id: 4, text: 'レイトゲームに持ち込みたい時', difficulty: 'medium' },
        { id: 5, text: '眠い時', difficulty: 'hard' },
        { id: 6, text: '皮肉を言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 15,
      text: 'もっと輝きを',
      character: 'タリック',
      situations: [
        { id: 1, text: '励ます時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: '不満な時', difficulty: 'medium' },
        { id: 4, text: 'ワードが足りない時', difficulty: 'medium' },
        { id: 5, text: 'キラキラしたスキンを見た時', difficulty: 'easy' },
        { id: 6, text: '暗い時', difficulty: 'medium' }
      ]
    },
    {
      id: 16,
      text: 'いいでしょう',
      character: 'ブラッドミア',
      situations: [
        { id: 1, text: '同意する時', difficulty: 'easy' },
        { id: 2, text: '仕方なく受け入れる時', difficulty: 'medium' },
        { id: 3, text: '優雅に承諾する時', difficulty: 'easy' },
        { id: 4, text: '皮肉を言う時', difficulty: 'hard' },
        { id: 5, text: 'Eで血を集めた時', difficulty: 'medium' },
        { id: 6, text: '本当は嫌な時', difficulty: 'medium' }
      ]
    },

    // === 特殊セリフ ===
    {
      id: 17,
      text: 'ブラインドモンク、お前もか...',
      character: 'リー・シン',
      situations: [
        { id: 1, text: '裏切られた時', difficulty: 'easy' },
        { id: 2, text: 'リー・シンのキックで味方がキルされた時', difficulty: 'easy' },
        { id: 3, text: '驚いた時', difficulty: 'medium' },
        { id: 4, text: '感動した時', difficulty: 'hard' },
        { id: 5, text: 'バロンをスティールされた時', difficulty: 'medium' },
        { id: 6, text: '期待外れだった時', difficulty: 'medium' }
      ]
    },
    {
      id: 18,
      text: 'シュリマの砂は血に飢えている',
      character: 'アジール',
      situations: [
        { id: 1, text: '戦闘前', difficulty: 'easy' },
        { id: 2, text: '怖がらせる時', difficulty: 'easy' },
        { id: 3, text: 'ウルトで敵を押す時', difficulty: 'medium' },
        { id: 4, text: '砂漠を見た時', difficulty: 'medium' },
        { id: 5, text: 'お腹が空いた時', difficulty: 'hard' },
        { id: 6, text: '威厳を示す時', difficulty: 'easy' }
      ]
    },
    {
      id: 19,
      text: 'スケール、スケール、スケール',
      character: 'カ=ジックス',
      situations: [
        { id: 1, text: '進化したい時', difficulty: 'easy' },
        { id: 2, text: '成長を感じる時', difficulty: 'medium' },
        { id: 3, text: 'レイトゲーム志向の時', difficulty: 'medium' },
        { id: 4, text: 'ファームに集中したい時', difficulty: 'easy' },
        { id: 5, text: '焦っている時', difficulty: 'hard' },
        { id: 6, text: '孤立した敵を見つけた時', difficulty: 'medium' }
      ]
    },
    {
      id: 20,
      text: 'ナーフしろ',
      character: 'プレイヤー',
      situations: [
        { id: 1, text: 'OPチャンピオンにやられた時', difficulty: 'easy' },
        { id: 2, text: '理不尽に負けた時', difficulty: 'easy' },
        { id: 3, text: '褒め言葉として', difficulty: 'hard' },
        { id: 4, text: 'ヤスオを見た時', difficulty: 'medium' },
        { id: 5, text: 'パッチノートを見た時', difficulty: 'medium' },
        { id: 6, text: '自虐する時', difficulty: 'hard' }
      ]
    },

    // === 追加セリフ（21-60） ===
    {
      id: 21,
      text: '運命の輪は回る',
      character: 'ガングプランク',
      situations: [
        { id: 1, text: '勝利を確信した時', difficulty: 'easy' },
        { id: 2, text: '負けそうな時', difficulty: 'medium' },
        { id: 3, text: '哲学的になった時', difficulty: 'hard' },
        { id: 4, text: 'バレルが連鎖した時', difficulty: 'medium' },
        { id: 5, text: '諦めた時', difficulty: 'hard' },
        { id: 6, text: 'リスポーン待ちの時', difficulty: 'medium' }
      ]
    },
    {
      id: 22,
      text: '痛いか？',
      character: 'ドクター・ムンド',
      situations: [
        { id: 1, text: '攻撃した時', difficulty: 'easy' },
        { id: 2, text: '心配している時', difficulty: 'hard' },
        { id: 3, text: '楽しんでいる時', difficulty: 'medium' },
        { id: 4, text: 'Qが当たった時', difficulty: 'easy' },
        { id: 5, text: '医者のように聞く時', difficulty: 'medium' },
        { id: 6, text: '優しく聞く時', difficulty: 'hard' }
      ]
    },
    {
      id: 23,
      text: '血が舞う',
      character: 'ブラッドミア',
      situations: [
        { id: 1, text: 'スキルを使う時', difficulty: 'easy' },
        { id: 2, text: '戦闘開始時', difficulty: 'easy' },
        { id: 3, text: '優雅に言う時', difficulty: 'medium' },
        { id: 4, text: 'Eをフルチャージした時', difficulty: 'easy' },
        { id: 5, text: '料理中', difficulty: 'hard' },
        { id: 6, text: '芸術的な瞬間', difficulty: 'hard' }
      ]
    },
    {
      id: 24,
      text: 'さぁ、ショータイムだ',
      character: 'ジン',
      situations: [
        { id: 1, text: 'ゲーム開始時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: '自信満々の時', difficulty: 'easy' },
        { id: 4, text: 'トリプルキル以上', difficulty: 'medium' },
        { id: 5, text: 'ステージに立つ時', difficulty: 'medium' },
        { id: 6, text: '眠い時', difficulty: 'hard' }
      ]
    },
    {
      id: 25,
      text: '狩りの時間だ',
      character: 'レンガー',
      situations: [
        { id: 1, text: 'ジャングルに入る時', difficulty: 'easy' },
        { id: 2, text: '敵のADCを見つけた時', difficulty: 'easy' },
        { id: 3, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 4, text: '食事の時間', difficulty: 'hard' },
        { id: 5, text: '集中する時', difficulty: 'medium' },
        { id: 6, text: 'スタックが揃った時', difficulty: 'medium' }
      ]
    },
    {
      id: 26,
      text: '影を斬る',
      character: 'ゼド',
      situations: [
        { id: 1, text: 'コンボを決める時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: 'かっこつけている時', difficulty: 'medium' },
        { id: 4, text: '影と入れ替わる時', difficulty: 'easy' },
        { id: 5, text: '暗闇で', difficulty: 'hard' },
        { id: 6, text: '刀を振る時', difficulty: 'medium' }
      ]
    },
    {
      id: 27,
      text: '均衡を保つ',
      character: 'シェン',
      situations: [
        { id: 1, text: '味方を守る時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: '冷静な時', difficulty: 'medium' },
        { id: 4, text: 'タンクとしての役割', difficulty: 'medium' },
        { id: 5, text: 'バランスを取る時', difficulty: 'easy' },
        { id: 6, text: '瞑想中', difficulty: 'hard' }
      ]
    },
    {
      id: 28,
      text: '爆発だ！',
      character: 'ジグス',
      situations: [
        { id: 1, text: 'スキルを使う時', difficulty: 'easy' },
        { id: 2, text: '楽しい時', difficulty: 'easy' },
        { id: 3, text: 'タワーを壊す時', difficulty: 'easy' },
        { id: 4, text: 'ウルトが命中した時', difficulty: 'easy' },
        { id: 5, text: '怒っている時', difficulty: 'medium' },
        { id: 6, text: 'サプライズの時', difficulty: 'hard' }
      ]
    },
    {
      id: 29,
      text: 'ロケットだ！',
      character: 'ジンクス',
      situations: [
        { id: 1, text: 'ウルトを撃つ時', difficulty: 'easy' },
        { id: 2, text: '興奮している時', difficulty: 'easy' },
        { id: 3, text: 'Qを切り替える時', difficulty: 'medium' },
        { id: 4, text: '遠距離キルを狙う時', difficulty: 'easy' },
        { id: 5, text: '何かを始める時', difficulty: 'medium' },
        { id: 6, text: '科学の時間', difficulty: 'hard' }
      ]
    },
    {
      id: 30,
      text: 'もっと速く！',
      character: 'ジンクス',
      situations: [
        { id: 1, text: '急いでいる時', difficulty: 'easy' },
        { id: 2, text: 'パッシブが発動した時', difficulty: 'easy' },
        { id: 3, text: '焦っている時', difficulty: 'medium' },
        { id: 4, text: 'タワーを壊した時', difficulty: 'medium' },
        { id: 5, text: '待ちきれない時', difficulty: 'easy' },
        { id: 6, text: 'レースしている時', difficulty: 'hard' }
      ]
    },
    {
      id: 31,
      text: '恐れろ',
      character: 'フィドルスティックス',
      situations: [
        { id: 1, text: 'ウルトで飛び込む時', difficulty: 'easy' },
        { id: 2, text: '怖がらせる時', difficulty: 'easy' },
        { id: 3, text: '威嚇する時', difficulty: 'easy' },
        { id: 4, text: '茂みから出る時', difficulty: 'medium' },
        { id: 5, text: '挨拶する時', difficulty: 'hard' },
        { id: 6, text: '静かに言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 32,
      text: '美しい',
      character: 'ジン',
      situations: [
        { id: 1, text: '感動した時', difficulty: 'easy' },
        { id: 2, text: 'キルを取った時', difficulty: 'medium' },
        { id: 3, text: '芸術を見た時', difficulty: 'easy' },
        { id: 4, text: 'トラップが作動した時', difficulty: 'medium' },
        { id: 5, text: 'サンセットを見た時', difficulty: 'hard' },
        { id: 6, text: '皮肉を言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 33,
      text: '私に従え',
      character: 'アジール',
      situations: [
        { id: 1, text: '命令する時', difficulty: 'easy' },
        { id: 2, text: '兵士を召喚する時', difficulty: 'easy' },
        { id: 3, text: '威厳を示す時', difficulty: 'easy' },
        { id: 4, text: '皇帝として', difficulty: 'medium' },
        { id: 5, text: 'お願いする時', difficulty: 'hard' },
        { id: 6, text: '優しく言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 34,
      text: '復讐だ',
      character: 'カリスタ',
      situations: [
        { id: 1, text: '怒っている時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: '敵を倒す時', difficulty: 'easy' },
        { id: 4, text: '裏切られた時', difficulty: 'medium' },
        { id: 5, text: '決意した時', difficulty: 'medium' },
        { id: 6, text: '冷静に言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 35,
      text: '夜は私のもの',
      character: 'ヴェイン',
      situations: [
        { id: 1, text: '夜になった時', difficulty: 'easy' },
        { id: 2, text: '自信がある時', difficulty: 'easy' },
        { id: 3, text: 'ステルスを使う時', difficulty: 'medium' },
        { id: 4, text: '暗い場所で', difficulty: 'easy' },
        { id: 5, text: '眠る時', difficulty: 'hard' },
        { id: 6, text: '優しく言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 36,
      text: '雷が落ちる',
      character: 'ケネン',
      situations: [
        { id: 1, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 2, text: 'スタンを決める時', difficulty: 'easy' },
        { id: 3, text: '警告する時', difficulty: 'medium' },
        { id: 4, text: '天気予報', difficulty: 'hard' },
        { id: 5, text: '怒っている時', difficulty: 'medium' },
        { id: 6, text: 'Eで突っ込む時', difficulty: 'easy' }
      ]
    },
    {
      id: 37,
      text: '炎よ、燃えろ',
      character: 'ブランド',
      situations: [
        { id: 1, text: 'スキルを使う時', difficulty: 'easy' },
        { id: 2, text: 'パッシブが爆発する時', difficulty: 'easy' },
        { id: 3, text: '怒っている時', difficulty: 'medium' },
        { id: 4, text: 'ウルトをバウンスさせる時', difficulty: 'easy' },
        { id: 5, text: '料理中', difficulty: 'hard' },
        { id: 6, text: 'キャンプファイヤー', difficulty: 'hard' }
      ]
    },
    {
      id: 38,
      text: '凍れ',
      character: 'アニビア',
      situations: [
        { id: 1, text: 'スキルを使う時', difficulty: 'easy' },
        { id: 2, text: '壁を作る時', difficulty: 'easy' },
        { id: 3, text: '命令する時', difficulty: 'easy' },
        { id: 4, text: 'ウルトを置く時', difficulty: 'easy' },
        { id: 5, text: '寒い時', difficulty: 'medium' },
        { id: 6, text: '静止を求める時', difficulty: 'hard' }
      ]
    },
    {
      id: 39,
      text: '大地よ、応えよ',
      character: 'マルファイト',
      situations: [
        { id: 1, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 2, text: 'お願いする時', difficulty: 'medium' },
        { id: 3, text: '力を溜める時', difficulty: 'medium' },
        { id: 4, text: '岩として', difficulty: 'hard' },
        { id: 5, text: '地震を起こす時', difficulty: 'easy' },
        { id: 6, text: '祈る時', difficulty: 'hard' }
      ]
    },
    {
      id: 40,
      text: '星々が導く',
      character: 'オレリオン・ソル',
      situations: [
        { id: 1, text: '道を示す時', difficulty: 'easy' },
        { id: 2, text: '星を作る時', difficulty: 'medium' },
        { id: 3, text: '威厳を持って', difficulty: 'medium' },
        { id: 4, text: 'Qを拡大する時', difficulty: 'easy' },
        { id: 5, text: '占星術', difficulty: 'hard' },
        { id: 6, text: '夜空を見る時', difficulty: 'hard' }
      ]
    },
    {
      id: 41,
      text: '月の力を',
      character: 'ダイアナ',
      situations: [
        { id: 1, text: 'スキルを使う時', difficulty: 'easy' },
        { id: 2, text: 'ウルトでダッシュする時', difficulty: 'easy' },
        { id: 3, text: '夜の時', difficulty: 'medium' },
        { id: 4, text: 'パワーを溜める時', difficulty: 'medium' },
        { id: 5, text: '満月の夜', difficulty: 'hard' },
        { id: 6, text: '祈る時', difficulty: 'hard' }
      ]
    },
    {
      id: 42,
      text: '太陽の輝き',
      character: 'レオナ',
      situations: [
        { id: 1, text: 'スキルを使う時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: '明るい時', difficulty: 'medium' },
        { id: 4, text: '希望を持つ時', difficulty: 'medium' },
        { id: 5, text: '朝日を見る時', difficulty: 'hard' },
        { id: 6, text: '輝く何かを見た時', difficulty: 'hard' }
      ]
    },
    {
      id: 43,
      text: 'ドリルだ！',
      character: 'ラムス',
      situations: [
        { id: 1, text: 'Qで転がる時', difficulty: 'easy' },
        { id: 2, text: 'タウント中', difficulty: 'medium' },
        { id: 3, text: '興奮している時', difficulty: 'medium' },
        { id: 4, text: 'タワーダイブ', difficulty: 'easy' },
        { id: 5, text: '工事現場', difficulty: 'hard' },
        { id: 6, text: '回転する時', difficulty: 'hard' }
      ]
    },
    {
      id: 44,
      text: '毒を盛れ',
      character: 'シンジド',
      situations: [
        { id: 1, text: 'Qを使う時', difficulty: 'easy' },
        { id: 2, text: '逃げる時', difficulty: 'easy' },
        { id: 3, text: '料理中', difficulty: 'hard' },
        { id: 4, text: '敵を追いかける時', difficulty: 'medium' },
        { id: 5, text: '科学実験', difficulty: 'medium' },
        { id: 6, text: '優しく言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 45,
      text: '叫べ',
      character: 'チョ=ガス',
      situations: [
        { id: 1, text: 'Wを使う時', difficulty: 'easy' },
        { id: 2, text: '怒っている時', difficulty: 'easy' },
        { id: 3, text: '命令する時', difficulty: 'easy' },
        { id: 4, text: 'サイレンスを決める時', difficulty: 'medium' },
        { id: 5, text: 'カラオケ', difficulty: 'hard' },
        { id: 6, text: '励ます時', difficulty: 'hard' }
      ]
    },
    {
      id: 46,
      text: '私を見つけられるか？',
      character: 'シャコ',
      situations: [
        { id: 1, text: 'ステルスを使う時', difficulty: 'easy' },
        { id: 2, text: '茂みに隠れる時', difficulty: 'easy' },
        { id: 3, text: '挑発する時', difficulty: 'medium' },
        { id: 4, text: '分身を使う時', difficulty: 'medium' },
        { id: 5, text: 'かくれんぼ', difficulty: 'easy' },
        { id: 6, text: '自信がある時', difficulty: 'medium' }
      ]
    },
    {
      id: 47,
      text: '闇が来る',
      character: 'ノクターン',
      situations: [
        { id: 1, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 2, text: '脅す時', difficulty: 'easy' },
        { id: 3, text: '夜になる時', difficulty: 'medium' },
        { id: 4, text: '警告する時', difficulty: 'medium' },
        { id: 5, text: '眠る前', difficulty: 'hard' },
        { id: 6, text: '停電した時', difficulty: 'hard' }
      ]
    },
    {
      id: 48,
      text: '跪け',
      character: 'アジール',
      situations: [
        { id: 1, text: '命令する時', difficulty: 'easy' },
        { id: 2, text: '皇帝として', difficulty: 'easy' },
        { id: 3, text: 'ウルトで押す時', difficulty: 'medium' },
        { id: 4, text: '威厳を示す時', difficulty: 'easy' },
        { id: 5, text: 'お願いする時', difficulty: 'hard' },
        { id: 6, text: '優しく言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 49,
      text: '音を奏でよ',
      character: 'ソナ',
      situations: [
        { id: 1, text: 'スキルを使う時', difficulty: 'easy' },
        { id: 2, text: '演奏する時', difficulty: 'easy' },
        { id: 3, text: '命令する時', difficulty: 'medium' },
        { id: 4, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 5, text: 'コンサート', difficulty: 'medium' },
        { id: 6, text: '静かに頼む時', difficulty: 'hard' }
      ]
    },
    {
      id: 50,
      text: '転がれ',
      character: 'ラムス',
      situations: [
        { id: 1, text: 'Qを使う時', difficulty: 'easy' },
        { id: 2, text: '移動する時', difficulty: 'easy' },
        { id: 3, text: '命令する時', difficulty: 'medium' },
        { id: 4, text: '急いでいる時', difficulty: 'medium' },
        { id: 5, text: '何かを押す時', difficulty: 'hard' },
        { id: 6, text: '遊んでいる時', difficulty: 'hard' }
      ]
    },
    {
      id: 51,
      text: '喰らえ',
      character: 'チョ=ガス',
      situations: [
        { id: 1, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 2, text: '攻撃する時', difficulty: 'easy' },
        { id: 3, text: '食事の時', difficulty: 'hard' },
        { id: 4, text: 'スタックを積む時', difficulty: 'medium' },
        { id: 5, text: '怒っている時', difficulty: 'medium' },
        { id: 6, text: '何かを渡す時', difficulty: 'hard' }
      ]
    },
    {
      id: 52,
      text: 'さぁ、踊ろう',
      character: 'カタリナ',
      situations: [
        { id: 1, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 2, text: '楽しい時', difficulty: 'easy' },
        { id: 3, text: 'ダンスする時', difficulty: 'easy' },
        { id: 4, text: 'パーティーの時', difficulty: 'medium' },
        { id: 5, text: 'リセットした時', difficulty: 'medium' },
        { id: 6, text: '招待する時', difficulty: 'hard' }
      ]
    },
    {
      id: 53,
      text: '逃がさん',
      character: 'ワーウィック',
      situations: [
        { id: 1, text: '追いかける時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: '低HPの敵を見つけた時', difficulty: 'easy' },
        { id: 4, text: '決意した時', difficulty: 'medium' },
        { id: 5, text: '何かを掴む時', difficulty: 'hard' },
        { id: 6, text: '約束する時', difficulty: 'hard' }
      ]
    },
    {
      id: 54,
      text: '私が見える？',
      character: 'イブリン',
      situations: [
        { id: 1, text: 'ステルス中', difficulty: 'easy' },
        { id: 2, text: '茂みにいる時', difficulty: 'easy' },
        { id: 3, text: '挑発する時', difficulty: 'medium' },
        { id: 4, text: '不安な時', difficulty: 'hard' },
        { id: 5, text: 'チャームを使う時', difficulty: 'medium' },
        { id: 6, text: '自信がない時', difficulty: 'hard' }
      ]
    },
    {
      id: 55,
      text: 'もっと大きく',
      character: 'チョ=ガス',
      situations: [
        { id: 1, text: 'ウルトでスタックを積む時', difficulty: 'easy' },
        { id: 2, text: '成長する時', difficulty: 'easy' },
        { id: 3, text: '要求する時', difficulty: 'medium' },
        { id: 4, text: 'サイズが大きくなった時', difficulty: 'easy' },
        { id: 5, text: '音量を上げる時', difficulty: 'hard' },
        { id: 6, text: '不満な時', difficulty: 'hard' }
      ]
    },
    {
      id: 56,
      text: '静まれ',
      character: 'ソラカ',
      situations: [
        { id: 1, text: 'サイレンスを使う時', difficulty: 'easy' },
        { id: 2, text: '落ち着かせる時', difficulty: 'easy' },
        { id: 3, text: '命令する時', difficulty: 'medium' },
        { id: 4, text: 'Eを使う時', difficulty: 'easy' },
        { id: 5, text: '図書館で', difficulty: 'hard' },
        { id: 6, text: '怒っている時', difficulty: 'hard' }
      ]
    },
    {
      id: 57,
      text: '癒やしを',
      character: 'ソラカ',
      situations: [
        { id: 1, text: 'Wを使う時', difficulty: 'easy' },
        { id: 2, text: 'ウルトを使う時', difficulty: 'easy' },
        { id: 3, text: '優しく言う時', difficulty: 'easy' },
        { id: 4, text: '味方を守る時', difficulty: 'easy' },
        { id: 5, text: '医者として', difficulty: 'medium' },
        { id: 6, text: 'お祈りする時', difficulty: 'hard' }
      ]
    },
    {
      id: 58,
      text: '眠れ',
      character: 'ゾーイ',
      situations: [
        { id: 1, text: 'Eを使う時', difficulty: 'easy' },
        { id: 2, text: '眠い時', difficulty: 'easy' },
        { id: 3, text: '命令する時', difficulty: 'medium' },
        { id: 4, text: 'バブルを当てた時', difficulty: 'easy' },
        { id: 5, text: 'おやすみを言う時', difficulty: 'medium' },
        { id: 6, text: '優しく言う時', difficulty: 'hard' }
      ]
    },
    {
      id: 59,
      text: 'キラキラ〜',
      character: 'ゾーイ',
      situations: [
        { id: 1, text: '楽しい時', difficulty: 'easy' },
        { id: 2, text: 'Qを使う時', difficulty: 'easy' },
        { id: 3, text: 'きれいなものを見た時', difficulty: 'easy' },
        { id: 4, text: 'ポータルを使う時', difficulty: 'medium' },
        { id: 5, text: '星を見る時', difficulty: 'medium' },
        { id: 6, text: '疲れている時', difficulty: 'hard' }
      ]
    },
    {
      id: 60,
      text: '正義の一撃',
      character: 'ガレン',
      situations: [
        { id: 1, text: 'Qを使う時', difficulty: 'easy' },
        { id: 2, text: '攻撃する時', difficulty: 'easy' },
        { id: 3, text: '正義感に燃える時', difficulty: 'easy' },
        { id: 4, text: 'サイレンスを決める時', difficulty: 'medium' },
        { id: 5, text: 'かっこつける時', difficulty: 'medium' },
        { id: 6, text: '裁きを下す時', difficulty: 'hard' }
      ]
    }
  ],

  // 難易度ごとのポイント
  points: {
    easy: 1,
    medium: 2,
    hard: 3
  },

  // ゲーム設定
  settings: {
    minPlayers: 3,
    maxPlayers: 10,
    roundsPerGame: 5,
    timePerRound: 90 // 秒
  }
};

// VALORANTデータを正しい形式に変換する関数
function normalizeValorantData(data) {
  if (!data) return [];
  
  return data.map((phrase, index) => {
    // situationsが文字列配列の場合、オブジェクト配列に変換
    let normalizedSituations = [];
    
    if (Array.isArray(phrase.situations)) {
      normalizedSituations = phrase.situations.map((situation, sIndex) => {
        if (typeof situation === 'string') {
          // 文字列の場合、オブジェクトに変換
          return {
            id: sIndex + 1,
            text: situation,
            difficulty: phrase.difficulty || 'medium'
          };
        } else if (situation && typeof situation === 'object') {
          // 既にオブジェクトの場合、そのまま返す
          return situation;
        }
        return null;
      }).filter(s => s !== null);
    }
    
    // phraseの正規化
    return {
      id: phrase.id || (index + 1),
      text: phrase.phrase || phrase.text || '',
      character: phrase.character || '',
      image: phrase.image || '',
      situations: normalizedSituations
    };
  });
}

// ランダムにお題を選択する関数（ゲームタイプ対応）
function getRandomDemaciaPhrase(gameType = 'lol') {
  let phrases = [];
  
  if (gameType === 'valorant' && window.valorantDemaciaData) {
    // VALORANTデータを正規化
    phrases = normalizeValorantData(window.valorantDemaciaData);
  } else {
    phrases = demaciaData.phrases;
  }
  
  if (!phrases || phrases.length === 0) {
    console.error('❌ セリフデータが見つかりません');
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

// お題をIDで取得
function getDemaciaPhraseById(id, gameType = 'lol') {
  let phrases = [];
  
  if (gameType === 'valorant' && window.valorantDemaciaData) {
    // VALORANTデータを正規化
    phrases = normalizeValorantData(window.valorantDemaciaData);
  } else {
    phrases = demaciaData.phrases;
  }
  
  return phrases.find(p => p.id === id);
}

// グローバルにエクスポート
if (typeof window !== 'undefined') {
  window.demaciaData = demaciaData;
  window.getRandomDemaciaPhrase = getRandomDemaciaPhrase;
  window.getDemaciaPhraseById = getDemaciaPhraseById;
}
