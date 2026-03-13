// LoL セリフ当てクイズ - メインスクリプト

// ===================================
// グローバル変数
// ===================================

let gameData = {
    totalCorrectPoints: 0,
    availableGenerations: 0,
    usedCombinations: [],
    unlockedCharacters: [],
    playCount: 0,
    lastPlayedAt: null
};

let currentQuestion = null;
let currentGeneratedCharacter = null;
let currentLanguage = 'ja'; // デフォルト言語

// ===================================
// 言語管理
// ===================================

function initLanguage() {
    const saved = localStorage.getItem('language');
    if (saved) {
        currentLanguage = saved;
    } else {
        // ブラウザの言語を検出
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ko')) {
            currentLanguage = 'ko';
        } else if (browserLang.startsWith('zh')) {
            currentLanguage = 'zh';
        } else if (browserLang.startsWith('en')) {
            currentLanguage = 'en';
        } else {
            currentLanguage = 'ja';
        }
    }
}

// ===================================
// クイズ問題データ（多言語対応）
// ===================================

let quizQuestions = [
    {
        id: 1,
        quotes: {
            ja: "死は風のごとく、常に我が傍に",
            en: "Death is like the wind — always by my side.",
            ko: "죽음은 바람과 같지, 항상 내 곁에 있어.",
            zh: "死亡如风，常伴吾身。"
        },
        choices: {
            ja: ["ヤスオ", "ヨネ", "ジン", "ゼド"],
            en: ["Yasuo", "Yone", "Jhin", "Zed"],
            ko: ["야스오", "요네", "진", "제드"],
            zh: ["亚索", "永恩", "烬", "劫"]
        },
        answer: 0 // インデックスで管理
    },
    {
        id: 2,
        quotes: {
            ja: "暴力が全てを解決する！",
            en: "Violence solves everything!",
            ko: "폭력은 모든 걸 해결해!",
            zh: "暴力解决一切！"
        },
        choices: {
            ja: ["ジンクス", "ケイトリン", "ミス・フォーチュン", "ヴァイ"],
            en: ["Jinx", "Caitlyn", "Miss Fortune", "Vi"],
            ko: ["징크스", "케이틀린", "미스 포츈", "바이"],
            zh: ["金克丝", "凯特琳", "厄运小姐", "蔚"]
        },
        answer: 0
    },
    {
        id: 3,
        quotes: {
            ja: "心こそが最強の筋肉だ",
            en: "The heart is the strongest muscle.",
            ko: "심장이야말로 가장 강한 근육이지.",
            zh: "心脏是最强壮的肌肉。"
        },
        choices: {
            ja: ["ブラウム", "ガレン", "ダリウス", "グラガス"],
            en: ["Braum", "Garen", "Darius", "Gragas"],
            ko: ["브라움", "가렌", "다리우스", "그라가스"],
            zh: ["布隆", "盖伦", "德莱厄斯", "古拉加斯"]
        },
        answer: 0
    },
    {
        id: 4,
        quotes: {
            ja: "殺戮の中で、私は咲く。夜明けの花のように",
            en: "In carnage, I bloom, like a flower in the dawn.",
            ko: "살육 속에서 나는 피어난다. 새벽의 꽃처럼.",
            zh: "在杀戮中绽放，如黎明之花。"
        },
        choices: {
            ja: ["ジン", "ゼド", "タロン", "カ'ジックス"],
            en: ["Jhin", "Zed", "Talon", "Kha'Zix"],
            ko: ["진", "제드", "탈론", "카직스"],
            zh: ["烬", "劫", "泰隆", "卡兹克"]
        },
        answer: 0
    },
    {
        id: 5,
        quotes: {
            ja: "時は矢のように飛び、果物は蠅のように飛ぶ",
            en: "Time flies like an arrow; fruit flies like banana.",
            ko: "시간은 화살처럼 날고, 과일은 바나나처럼 날지.",
            zh: "时间像箭一样飞逝，水果像香蕉一样飞。"
        },
        choices: {
            ja: ["ジリアン", "エコー", "フィドルスティックス", "シンジド"],
            en: ["Zilean", "Ekko", "Fiddlesticks", "Singed"],
            ko: ["질리언", "에코", "피들스틱", "신지드"],
            zh: ["基兰", "艾克", "费德提克", "辛吉德"]
        },
        answer: 0
    },
    {
        id: 6,
        quotes: {
            ja: "正義に翼あり！",
            en: "Justice takes wing!",
            ko: "정의에 날개를!",
            zh: "正义展翅！"
        },
        choices: {
            ja: ["クイン", "ケイル", "モルガナ", "アニビア"],
            en: ["Quinn", "Kayle", "Morgana", "Anivia"],
            ko: ["퀸", "케일", "모르가나", "애니비아"],
            zh: ["奎因", "凯尔", "莫甘娜", "艾尼维亚"]
        },
        answer: 0
    },
    {
        id: 7,
        quotes: {
            ja: "罪ある者のみが恐怖を感じる",
            en: "Only the guilty feel fear.",
            ko: "죄 있는 자만이 두려움을 느낀다.",
            zh: "只有有罪之人才会感到恐惧。"
        },
        choices: {
            ja: ["ノクターン", "フィドルスティックス", "シャコ", "イブリン"],
            en: ["Nocturne", "Fiddlesticks", "Shaco", "Evelynn"],
            ko: ["녹턴", "피들스틱", "샤코", "이블린"],
            zh: ["魔腾", "费德提克", "萨科", "伊芙琳"]
        },
        answer: 0
    },
    {
        id: 8,
        quotes: {
            ja: "もし立場が逆なら、私も容赦しないだろう！",
            en: "Know that if the tables were turned, I would show you no mercy!",
            ko: "입장이 바뀌었다면, 나도 자비를 베풀지 않았을 것이다!",
            zh: "要知道，如果换作是我，我也不会手下留情！"
        },
        choices: {
            ja: ["ルシアン", "グレイブス", "ジン", "ヴェイン"],
            en: ["Lucian", "Graves", "Jhin", "Vayne"],
            ko: ["루시안", "그레이브즈", "진", "베인"],
            zh: ["卢锡安", "格雷福斯", "烬", "薇恩"]
        },
        answer: 0
    },
    {
        id: 9,
        quotes: {
            ja: "夜が暗いほど、星は明るく輝く",
            en: "The darker the night, the brighter the stars.",
            ko: "밤이 어두울수록 별은 더 밝게 빛난다.",
            zh: "夜越黑，星越亮。"
        },
        choices: {
            ja: ["ブラウム", "タリック", "ソラカ", "レオナ"],
            en: ["Braum", "Taric", "Soraka", "Leona"],
            ko: ["브라움", "타릭", "소라카", "레오나"],
            zh: ["布隆", "塔里克", "索拉卡", "蕾欧娜"]
        },
        answer: 0
    },
    {
        id: 10,
        quotes: {
            ja: "影を抱きしめろ…さもなくば闇の中で死ね！",
            en: "Embrace the shadow... or die in darkness!",
            ko: "그림자를 받아들여라... 아니면 어둠 속에서 죽어라!",
            zh: "拥抱阴影……否则死于黑暗！"
        },
        choices: {
            ja: ["ゼド", "ヨネ", "ヤスオ", "シェン"],
            en: ["Zed", "Yone", "Yasuo", "Shen"],
            ko: ["제드", "요네", "야스오", "쉔"],
            zh: ["劫", "永恩", "亚索", "慎"]
        },
        answer: 0
    },
    {
        id: 11,
        quotes: {
            ja: "生と死の循環は続く。我らは生き、彼らは死ぬ",
            en: "The cycle of life and death continues. We will live, they will die.",
            ko: "삶과 죽음의 순환은 계속된다. 우리는 살고, 그들은 죽는다.",
            zh: "生死轮回不息。我们生，他们死。"
        },
        choices: {
            ja: ["ナサス", "レネクトン", "アズール", "タリヤ"],
            en: ["Nasus", "Renekton", "Azir", "Taliyah"],
            ko: ["나서스", "레넥톤", "아지르", "탈리야"],
            zh: ["内瑟斯", "雷克顿", "阿兹尔", "塔莉垭"]
        },
        answer: 0
    },
    {
        id: 12,
        quotes: {
            ja: "暴力で暴力を終わらせる！",
            en: "Violence to end the violence!",
            ko: "폭력으로 폭력을 끝낸다!",
            zh: "以暴制暴！"
        },
        choices: {
            ja: ["ヴァイ", "ジンクス", "エコー", "ケイトリン"],
            en: ["Vi", "Jinx", "Ekko", "Caitlyn"],
            ko: ["바이", "징크스", "에코", "케이틀린"],
            zh: ["蔚", "金克丝", "艾克", "凯特琳"]
        },
        answer: 0
    },
    {
        id: 13,
        quotes: {
            ja: "定義なんて制限的すぎる",
            en: "Definitions are so limiting.",
            ko: "정의는 너무 제한적이야.",
            zh: "定义太过局限。"
        },
        choices: {
            ja: ["ニーコ", "ゾーイ", "ユーミ", "リリア"],
            en: ["Neeko", "Zoe", "Yuumi", "Lillia"],
            ko: ["니코", "조이", "유미", "릴리아"],
            zh: ["妮蔻", "佐伊", "悠米", "莉莉娅"]
        },
        answer: 0
    },
    {
        id: 14,
        quotes: {
            ja: "見えぬ刃こそが最も致命的",
            en: "The unseen blade is the deadliest.",
            ko: "보이지 않는 칼날이 가장 치명적이지.",
            zh: "看不见的刀刃最为致命。"
        },
        choices: {
            ja: ["ゼド", "タロン", "シェン", "ケネン"],
            en: ["Zed", "Talon", "Shen", "Kennen"],
            ko: ["제드", "탈론", "쉔", "케넨"],
            zh: ["劫", "泰隆", "慎", "凯南"]
        },
        answer: 0
    },
    {
        id: 15,
        quotes: {
            ja: "戦士の最大の武器…それは忍耐だ",
            en: "A warrior's greatest weapon... is patience.",
            ko: "전사의 가장 위대한 무기는... 인내다.",
            zh: "战士最伟大的武器……是耐心。"
        },
        choices: {
            ja: ["シェン", "ヤスオ", "リー・シン", "ウーコン"],
            en: ["Shen", "Yasuo", "Lee Sin", "Wukong"],
            ko: ["쉔", "야스오", "리 신", "우콩"],
            zh: ["慎", "亚索", "李青", "孙悟空"]
        },
        answer: 0
    },
    {
        id: 16,
        quotes: {
            ja: "私が潮の満ち引きを決める",
            en: "I decide what the tide will bring.",
            ko: "내가 조수의 흐름을 결정한다.",
            zh: "我决定潮汐的走向。"
        },
        choices: {
            ja: ["ナミ", "イラオイ", "フィズ", "パイク"],
            en: ["Nami", "Illaoi", "Fizz", "Pyke"],
            ko: ["나미", "일라오이", "피즈", "파이크"],
            zh: ["娜美", "俄洛伊", "菲兹", "派克"]
        },
        answer: 0
    },
    {
        id: 17,
        quotes: {
            ja: "蜘蛛の呪いが我ら全てを滅ぼすだろう",
            en: "The spider's curse will doom us all.",
            ko: "거미의 저주가 우리 모두를 파멸시킬 것이다.",
            zh: "蜘蛛的诅咒将毁灭我们所有人。"
        },
        choices: {
            ja: ["エリス", "イブリン", "エルザ", "モルガナ"],
            en: ["Elise", "Evelynn", "Elsa", "Morgana"],
            ko: ["엘리스", "이블린", "엘자", "모르가나"],
            zh: ["伊莉丝", "伊芙琳", "艾尔莎", "莫甘娜"]
        },
        answer: 0
    },
    {
        id: 18,
        quotes: {
            ja: "私の職業？そうだな、実はパン屋になりたかったんだ",
            en: "My profession? You know, now that I think of it, I've always wanted to be a baker.",
            ko: "내 직업? 생각해보니 항상 제빵사가 되고 싶었어.",
            zh: "我的职业？你知道吗，现在想想，我一直想当个面包师。"
        },
        choices: {
            ja: ["ブラッドミア", "スウェイン", "ドレイヴン", "グレイブス"],
            en: ["Vladimir", "Swain", "Draven", "Graves"],
            ko: ["블라디미르", "스웨인", "드레이븐", "그레이브즈"],
            zh: ["弗拉基米尔", "斯维因", "德莱文", "格雷福斯"]
        },
        answer: 0
    },
    {
        id: 19,
        quotes: {
            ja: "全ての笑顔は逆さまになるのを待っているしかめっ面だ！",
            en: "Every smile is just a frown waiting to be turned upside down!",
            ko: "모든 미소는 뒤집히기를 기다리는 찡그림일 뿐이야!",
            zh: "每个笑容都只是等待被颠倒的皱眉！"
        },
        choices: {
            ja: ["シャコ", "フィドルスティックス", "ジンクス", "ティーモ"],
            en: ["Shaco", "Fiddlesticks", "Jinx", "Teemo"],
            ko: ["샤코", "피들스틱", "징크스", "티모"],
            zh: ["萨科", "费德提克", "金克丝", "提莫"]
        },
        answer: 0
    },
    {
        id: 20,
        quotes: {
            ja: "大きさが全てではない",
            en: "Size doesn't mean everything.",
            ko: "크기가 전부는 아니야.",
            zh: "体型不代表一切。"
        },
        choices: {
            ja: ["ティーモ", "ポピー", "ランブル", "ハイマーディンガー"],
            en: ["Teemo", "Poppy", "Rumble", "Heimerdinger"],
            ko: ["티모", "뽀삐", "럼블", "하이머딩거"],
            zh: ["提莫", "波比", "兰博", "黑默丁格"]
        },
        answer: 0
    },
    {
        id: 21,
        quotes: {
            ja: "誰にでも値段がある",
            en: "Everyone has a price.",
            ko: "모두에게 가격표가 있지.",
            zh: "每个人都有价码。"
        },
        choices: {
            ja: ["タム・ケンチ", "トゥイステッド・フェイト", "グレイブス", "パイク"],
            en: ["Tahm Kench", "Twisted Fate", "Graves", "Pyke"],
            ko: ["탐 켄치", "트위스티드 페이트", "그레이브즈", "파이크"],
            zh: ["塔姆", "崔斯特", "格雷福斯", "派克"]
        },
        answer: 1
    },
    {
        id: 22,
        quotes: {
            ja: "俺が最高だ。はっきりしている",
            en: "I'm the best there is, plain and simple.",
            ko: "나는 최고야. 명백하고 단순하지.",
            zh: "我是最棒的，简单明了。"
        },
        choices: {
            ja: ["ドレイヴン", "ダリウス", "ジン", "ヴァイ"],
            en: ["Draven", "Darius", "Jhin", "Vi"],
            ko: ["드레이븐", "다리우스", "진", "바이"],
            zh: ["德莱文", "德莱厄斯", "烬", "蔚"]
        },
        answer: 0
    },
    {
        id: 23,
        quotes: {
            ja: "俺の右腕は左腕よりずっと強い！",
            en: "My right arm is a lot stronger than my left arm!",
            ko: "내 오른팔은 왼팔보다 훨씬 강해!",
            zh: "我的右臂比左臂强壮得多！"
        },
        choices: {
            ja: ["トランドル", "ヴォリベア", "オラフ", "セジュアニ"],
            en: ["Trundle", "Volibear", "Olaf", "Sejuani"],
            ko: ["트런들", "볼리베어", "올라프", "세주아니"],
            zh: ["特朗德尔", "沃利贝尔", "奥拉夫", "瑟庄妮"]
        },
        answer: 0
    },
    {
        id: 24,
        quotes: {
            ja: "今夜は狩りの時間だ！",
            en: "Tonight we hunt!",
            ko: "오늘 밤은 사냥이다!",
            zh: "今夜我们狩猎！"
        },
        choices: {
            ja: ["レンガー", "ワーウィック", "ニダリー", "カ'ジックス"],
            en: ["Rengar", "Warwick", "Nidalee", "Kha'Zix"],
            ko: ["렝가", "워윅", "니달리", "카직스"],
            zh: ["雷恩加尔", "沃里克", "奈德丽", "卡兹克"]
        },
        answer: 0
    },
    {
        id: 25,
        quotes: {
            ja: "闇に堕ちた者を狩るのだ",
            en: "Let us hunt those who have fallen to darkness.",
            ko: "어둠에 빠진 자들을 사냥하자.",
            zh: "让我们猎杀那些堕入黑暗的人。"
        },
        choices: {
            ja: ["ヴェイン", "ルシアン", "クイン", "ケイル"],
            en: ["Vayne", "Lucian", "Quinn", "Kayle"],
            ko: ["베인", "루시안", "퀸", "케일"],
            zh: ["薇恩", "卢锡安", "奎因", "凯尔"]
        },
        answer: 0
    },
    {
        id: 26,
        quotes: {
            ja: "デマーシア！",
            en: "Demacia!",
            ko: "데마시아!",
            zh: "德玛西亚！"
        },
        choices: {
            ja: ["ガレン", "ジャーヴァンIV", "ラックス", "シヴィア"],
            en: ["Garen", "Jarvan IV", "Lux", "Xin Zhao"],
            ko: ["가렌", "자르반 4세", "럭스", "신 짜오"],
            zh: ["盖伦", "嘉文四世", "拉克丝", "赵信"]
        },
        answer: 0
    },
    {
        id: 27,
        quotes: {
            ja: "運命など、私が捻じ曲げてやる",
            en: "I will bend fate.",
            ko: "운명은 내가 꺾어버린다.",
            zh: "我将扭曲命运。"
        },
        choices: {
            ja: ["トゥイステッド・フェイト", "アーリ", "ゾーイ", "エコー"],
            en: ["Twisted Fate", "Ahri", "Zoe", "Ekko"],
            ko: ["트위스티드 페이트", "아리", "조이", "에코"],
            zh: ["崔斯特", "阿狸", "佐伊", "艾克"]
        },
        answer: 0
    },
    {
        id: 28,
        quotes: {
            ja: "血よ、私の糧となれ",
            en: "The rivers will run red.",
            ko: "피여, 내 양식이 되어라.",
            zh: "鲜血，成为我的粮食。"
        },
        choices: {
            ja: ["ブラッドミア", "ダリウス", "ドレイヴン", "スウェイン"],
            en: ["Vladimir", "Darius", "Draven", "Swain"],
            ko: ["블라디미르", "다리우스", "드레이븐", "스웨인"],
            zh: ["弗拉基米尔", "德莱厄斯", "德莱文", "斯维因"]
        },
        answer: 0
    },
    {
        id: 29,
        quotes: {
            ja: "知恵こそが武器",
            en: "Knowledge is power.",
            ko: "지식이 곧 힘이다.",
            zh: "知识就是力量。"
        },
        choices: {
            ja: ["ライズ", "ハイマーディンガー", "ビクター", "ジリアン"],
            en: ["Ryze", "Heimerdinger", "Viktor", "Zilean"],
            ko: ["라이즈", "하이머딩거", "빅토르", "질리언"],
            zh: ["瑞兹", "黑默丁格", "维克托", "基兰"]
        },
        answer: 0
    },
    {
        id: 30,
        quotes: {
            ja: "私は戦争そのものだ",
            en: "I am war.",
            ko: "나는 전쟁 그 자체다.",
            zh: "我就是战争。"
        },
        choices: {
            ja: ["パンテオン", "アトロックス", "ダリウス", "ガレン"],
            en: ["Pantheon", "Aatrox", "Darius", "Garen"],
            ko: ["판테온", "아트록스", "다리우스", "가렌"],
            zh: ["潘森", "亚托克斯", "德莱厄斯", "盖伦"]
        },
        answer: 0
    },
    {
        id: 31,
        quotes: {
            ja: "戦いは私の瞑想だ",
            en: "War is my meditation.",
            ko: "전쟁은 나의 명상이다.",
            zh: "战争是我的冥想。"
        },
        choices: {
            ja: ["リー・シン", "ヤスオ", "シェン", "ウーコン"],
            en: ["Lee Sin", "Yasuo", "Shen", "Wukong"],
            ko: ["리 신", "야스오", "쉔", "우콩"],
            zh: ["李青", "亚索", "慎", "孙悟空"]
        },
        answer: 0
    },
    {
        id: 32,
        quotes: {
            ja: "光よ、私を導きたまえ",
            en: "Guide me, light.",
            ko: "빛이여, 나를 인도하소서.",
            zh: "光明，指引我。"
        },
        choices: {
            ja: ["ラックス", "レオナ", "ケイル", "モルガナ"],
            en: ["Lux", "Leona", "Kayle", "Morgana"],
            ko: ["럭스", "레오나", "케일", "모르가나"],
            zh: ["拉克丝", "蕾欧娜", "凯尔", "莫甘娜"]
        },
        answer: 0
    },
    {
        id: 33,
        quotes: {
            ja: "魔法？ただの科学だ",
            en: "Magic? It's just science we don't understand yet.",
            ko: "마법? 그저 이해하지 못한 과학일 뿐이야.",
            zh: "魔法？不过是我们尚未理解的科学。"
        },
        choices: {
            ja: ["ハイマーディンガー", "ビクター", "ジェイス", "エコー"],
            en: ["Heimerdinger", "Viktor", "Jayce", "Ekko"],
            ko: ["하이머딩거", "빅토르", "제이스", "에코"],
            zh: ["黑默丁格", "维克托", "杰斯", "艾克"]
        },
        answer: 0
    },
    {
        id: 34,
        quotes: {
            ja: "完璧を目指せ",
            en: "Strive for perfection.",
            ko: "완벽을 추구하라.",
            zh: "追求完美。"
        },
        choices: {
            ja: ["カミール", "ビクター", "ジン", "オリアナ"],
            en: ["Camille", "Viktor", "Jhin", "Orianna"],
            ko: ["카밀", "빅토르", "진", "오리아나"],
            zh: ["卡蜜尔", "维克托", "烬", "奥莉安娜"]
        },
        answer: 0
    },
    {
        id: 35,
        quotes: {
            ja: "未来は既に決まっている",
            en: "The future is set.",
            ko: "미래는 이미 정해졌다.",
            zh: "未来已定。"
        },
        choices: {
            ja: ["ジリアン", "エコー", "バード", "ゾーイ"],
            en: ["Zilean", "Ekko", "Bard", "Zoe"],
            ko: ["질리언", "에코", "바드", "조이"],
            zh: ["基兰", "艾克", "巴德", "佐伊"]
        },
        answer: 0
    },
    {
        id: 36,
        quotes: {
            ja: "音楽が始まる",
            en: "The music begins.",
            ko: "음악이 시작된다.",
            zh: "音乐开始了。"
        },
        choices: {
            ja: ["ソナ", "セラフィーン", "バード", "ジン"],
            en: ["Sona", "Seraphine", "Bard", "Jhin"],
            ko: ["소나", "세라핀", "바드", "진"],
            zh: ["娑娜", "萨勒芬妮", "巴德", "烬"]
        },
        answer: 0
    },
    {
        id: 37,
        quotes: {
            ja: "私の音楽を聴け",
            en: "Listen to my music.",
            ko: "내 음악을 들어라.",
            zh: "聆听我的音乐。"
        },
        choices: {
            ja: ["ソナ", "セラフィーン", "バード", "ジン"],
            en: ["Sona", "Seraphine", "Bard", "Jhin"],
            ko: ["소나", "세라핀", "바드", "진"],
            zh: ["娑娜", "萨勒芬妮", "巴德", "烬"]
        },
        answer: 0
    },
    {
        id: 38,
        quotes: {
            ja: "星々が私を導く",
            en: "The stars guide me.",
            ko: "별들이 나를 인도한다.",
            zh: "星辰指引我。"
        },
        choices: {
            ja: ["バード", "ソラカ", "タリック", "オーレリオン・ソル"],
            en: ["Bard", "Soraka", "Taric", "Aurelion Sol"],
            ko: ["바드", "소라카", "타릭", "아우렐리온 솔"],
            zh: ["巴德", "索拉卡", "塔里克", "奥瑞利安·索尔"]
        },
        answer: 0
    },
    {
        id: 39,
        quotes: {
            ja: "希望を失うな",
            en: "Never lose hope.",
            ko: "희망을 잃지 마라.",
            zh: "永不放弃希望。"
        },
        choices: {
            ja: ["ソラカ", "ブラウム", "タリック", "ラックス"],
            en: ["Soraka", "Braum", "Taric", "Lux"],
            ko: ["소라카", "브라움", "타릭", "럭스"],
            zh: ["索拉卡", "布隆", "塔里克", "拉克丝"]
        },
        answer: 0
    },
    {
        id: 40,
        quotes: {
            ja: "美しさは力だ",
            en: "Beauty is power.",
            ko: "아름다움은 힘이다.",
            zh: "美丽即力量。"
        },
        choices: {
            ja: ["アーリ", "イブリン", "カイ=サ", "エリス"],
            en: ["Ahri", "Evelynn", "Kai'Sa", "Elise"],
            ko: ["아리", "이블린", "카이사", "엘리스"],
            zh: ["阿狸", "伊芙琳", "卡莎", "伊莉丝"]
        },
        answer: 0
    },
    {
        id: 41,
        quotes: {
            ja: "魅了されなさい",
            en: "Be charmed.",
            ko: "매혹되어라.",
            zh: "为我着迷吧。"
        },
        choices: {
            ja: ["アーリ", "イブリン", "セラフィーン", "エリス"],
            en: ["Ahri", "Evelynn", "Seraphine", "Elise"],
            ko: ["아리", "이블린", "세라핀", "엘리스"],
            zh: ["阿狸", "伊芙琳", "萨勒芬妮", "伊莉丝"]
        },
        answer: 0
    },
    {
        id: 42,
        quotes: {
            ja: "痛みを知れ",
            en: "Feel the pain.",
            ko: "고통을 느껴라.",
            zh: "感受痛苦。"
        },
        choices: {
            ja: ["モルガナ", "ケイル", "シンドラ", "ベイガー"],
            en: ["Morgana", "Kayle", "Syndra", "Veigar"],
            ko: ["모르가나", "케일", "신드라", "베이가"],
            zh: ["莫甘娜", "凯尔", "辛德拉", "维迦"]
        },
        answer: 0
    },
    {
        id: 43,
        quotes: {
            ja: "力こそが全て",
            en: "Power is everything.",
            ko: "힘이 전부다.",
            zh: "力量就是一切。"
        },
        choices: {
            ja: ["シンドラ", "ビクター", "スウェイン", "モルデカイザー"],
            en: ["Syndra", "Viktor", "Swain", "Mordekaiser"],
            ko: ["신드라", "빅토르", "스웨인", "모데카이저"],
            zh: ["辛德拉", "维克托", "斯维因", "莫德凯撒"]
        },
        answer: 0
    },
    {
        id: 44,
        quotes: {
            ja: "恐怖こそが私の武器",
            en: "Fear is my weapon.",
            ko: "공포가 내 무기다.",
            zh: "恐惧是我的武器。"
        },
        choices: {
            ja: ["ノクターン", "フィドルスティックス", "ハンター", "イブリン"],
            en: ["Nocturne", "Fiddlesticks", "Hecarim", "Evelynn"],
            ko: ["녹턴", "피들스틱", "헤카림", "이블린"],
            zh: ["魔腾", "费德提克", "赫卡里姆", "伊芙琳"]
        },
        answer: 0
    },
    {
        id: 45,
        quotes: {
            ja: "闇が呼んでいる",
            en: "Darkness calls.",
            ko: "어둠이 부른다.",
            zh: "黑暗在召唤。"
        },
        choices: {
            ja: ["ノクターン", "ゼド", "モルガナ", "ヴェックス"],
            en: ["Nocturne", "Zed", "Morgana", "Vex"],
            ko: ["녹턴", "제드", "모르가나", "벡스"],
            zh: ["魔腾", "劫", "莫甘娜", "薇古丝"]
        },
        answer: 0
    },
    {
        id: 46,
        quotes: {
            ja: "炎よ、私の命令に従え",
            en: "Fire, obey my command.",
            ko: "불이여, 내 명령에 따르라.",
            zh: "火焰，听从我的命令。"
        },
        choices: {
            ja: ["ブランド", "アニー", "ランブル", "シンジド"],
            en: ["Brand", "Annie", "Rumble", "Singed"],
            ko: ["브랜드", "애니", "럼블", "신지드"],
            zh: ["布兰德", "安妮", "兰博", "辛吉德"]
        },
        answer: 0
    },
    {
        id: 47,
        quotes: {
            ja: "一緒に遊ぼう！",
            en: "Let's play!",
            ko: "같이 놀자!",
            zh: "一起玩吧！"
        },
        choices: {
            ja: ["アニー", "ゾーイ", "ジンクス", "ニーコ"],
            en: ["Annie", "Zoe", "Jinx", "Neeko"],
            ko: ["애니", "조이", "징크스", "니코"],
            zh: ["安妮", "佐伊", "金克丝", "妮蔻"]
        },
        answer: 0
    },
    {
        id: 48,
        quotes: {
            ja: "時間は味方だ",
            en: "Time is on my side.",
            ko: "시간은 내 편이다.",
            zh: "时间站在我这边。"
        },
        choices: {
            ja: ["ジリアン", "エコー", "バード", "ライズ"],
            en: ["Zilean", "Ekko", "Bard", "Ryze"],
            ko: ["질리언", "에코", "바드", "라이즈"],
            zh: ["基兰", "艾克", "巴德", "瑞兹"]
        },
        answer: 0
    },
    {
        id: 49,
        quotes: {
            ja: "進化こそが生存の鍵",
            en: "Evolution is the key to survival.",
            ko: "진화가 생존의 열쇠다.",
            zh: "进化是生存的关键。"
        },
        choices: {
            ja: ["カ'ジックス", "コグ=マウ", "ヴェル=コズ", "レク=サイ"],
            en: ["Kha'Zix", "Kog'Maw", "Vel'Koz", "Rek'Sai"],
            ko: ["카직스", "코그모", "벨코즈", "렉사이"],
            zh: ["卡兹克", "克格莫", "维克兹", "雷克塞"]
        },
        answer: 0
    },
    {
        id: 50,
        quotes: {
            ja: "孤独が私を強くする",
            en: "Isolation sharpens me.",
            ko: "고립이 나를 날카롭게 한다.",
            zh: "孤立让我更强。"
        },
        choices: {
            ja: ["カ'ジックス", "レンガー", "ワーウィック", "カイン"],
            en: ["Kha'Zix", "Rengar", "Warwick", "Kayn"],
            ko: ["카직스", "렝가", "워윅", "케인"],
            zh: ["卡兹克", "雷恩加尔", "沃里克", "凯隐"]
        },
        answer: 0
    },
    {
        id: 51,
        quotes: {
            ja: "力こそが全てだ",
            en: "Strength above all.",
            ko: "힘이 전부다.",
            zh: "力量高于一切。"
        },
        choices: {
            ja: ["ダリウス", "ガレン", "イラオイ", "セト"],
            en: ["Darius", "Garen", "Illaoi", "Sett"],
            ko: ["다리우스", "가렌", "일라오이", "세트"],
            zh: ["德莱厄斯", "盖伦", "俄洛伊", "瑟提"]
        },
        answer: 0
    },
    {
        id: 52,
        quotes: {
            ja: "痛みは一時的、栄光は永遠だ",
            en: "Pain is temporary, glory is forever.",
            ko: "고통은 일시적이고, 영광은 영원하다.",
            zh: "痛苦是暂时的，荣耀是永恒的。"
        },
        choices: {
            ja: ["ドレイヴン", "ダリウス", "ジン", "ヴァイ"],
            en: ["Draven", "Darius", "Jhin", "Vi"],
            ko: ["드레이븐", "다리우스", "진", "바이"],
            zh: ["德莱文", "德莱厄斯", "烬", "蔚"]
        },
        answer: 0
    },
    {
        id: 53,
        quotes: {
            ja: "獲物を見つけた",
            en: "I've found my prey.",
            ko: "먹잇감을 찾았다.",
            zh: "我找到猎物了。"
        },
        choices: {
            ja: ["カ'ジックス", "レンガー", "ニダリー", "イブリン"],
            en: ["Kha'Zix", "Rengar", "Nidalee", "Evelynn"],
            ko: ["카직스", "렝가", "니달리", "이블린"],
            zh: ["卡兹克", "雷恩加尔", "奈德丽", "伊芙琳"]
        },
        answer: 0
    },
    {
        id: 54,
        quotes: {
            ja: "変化こそが生き残る道だ",
            en: "Change is good.",
            ko: "변화야말로 살아남는 길이다.",
            zh: "变化是生存之道。"
        },
        choices: {
            ja: ["カ'ジックス", "レクサイ", "カジックス", "ラムス"],
            en: ["Kha'Zix", "Rek'Sai", "Kha'Zix", "Rammus"],
            ko: ["카직스", "렉사이", "카직스", "람머스"],
            zh: ["卡兹克", "雷克塞", "卡兹克", "拉莫斯"]
        },
        answer: 0
    },
    {
        id: 55,
        quotes: {
            ja: "復讐の時だ",
            en: "Time for vengeance.",
            ko: "복수할 시간이다.",
            zh: "复仇的时候到了。"
        },
        choices: {
            ja: ["カリスタ", "ヴェイン", "ルシアン", "イレリア"],
            en: ["Kalista", "Vayne", "Lucian", "Irelia"],
            ko: ["칼리스타", "베인", "루시안", "이렐리아"],
            zh: ["卡莉丝塔", "薇恩", "卢锡安", "艾瑞莉娅"]
        },
        answer: 0
    },
    {
        id: 56,
        quotes: {
            ja: "契約は絶対だ",
            en: "The contract is sealed.",
            ko: "계약은 절대적이다.",
            zh: "契约已定。"
        },
        choices: {
            ja: ["タム・ケンチ", "スウェイン", "モルガナ", "ベイガー"],
            en: ["Tahm Kench", "Swain", "Morgana", "Veigar"],
            ko: ["탐 켄치", "스웨인", "모르가나", "베이가"],
            zh: ["塔姆", "斯维因", "莫甘娜", "维迦"]
        },
        answer: 0
    },
    {
        id: 57,
        quotes: {
            ja: "炎よ、私に従え",
            en: "Fire at will!",
            ko: "불이여, 내게 복종하라.",
            zh: "火焰，服从我！"
        },
        choices: {
            ja: ["ブランド", "アニー", "ランブル", "オレリオン・ソル"],
            en: ["Brand", "Annie", "Rumble", "Aurelion Sol"],
            ko: ["브랜드", "애니", "럼블", "아우렐리온 솔"],
            zh: ["布兰德", "安妮", "兰博", "奥瑞利安·索尔"]
        },
        answer: 0
    },
    {
        id: 58,
        quotes: {
            ja: "お前の魂を頂く",
            en: "Your soul is mine.",
            ko: "네 영혼을 가져가겠다.",
            zh: "你的灵魂是我的。"
        },
        choices: {
            ja: ["スレッシュ", "モルデカイザー", "カーサス", "ヴェックス"],
            en: ["Thresh", "Mordekaiser", "Karthus", "Vex"],
            ko: ["쓰레쉬", "모데카이저", "카서스", "벡스"],
            zh: ["锤石", "莫德凯撒", "卡尔萨斯", "薇古丝"]
        },
        answer: 0
    },
    {
        id: 59,
        quotes: {
            ja: "死は始まりに過ぎない",
            en: "Death is only the beginning.",
            ko: "죽음은 시작에 불과하다.",
            zh: "死亡只是开始。"
        },
        choices: {
            ja: ["カーサス", "モルデカイザー", "ヨリック", "ナサス"],
            en: ["Karthus", "Mordekaiser", "Yorick", "Nasus"],
            ko: ["카서스", "모데카이저", "요릭", "나서스"],
            zh: ["卡尔萨斯", "莫德凯撒", "约里克", "内瑟斯"]
        },
        answer: 0
    },
    {
        id: 60,
        quotes: {
            ja: "光は時に眩しすぎる",
            en: "Light can be blinding.",
            ko: "빛은 때때로 너무 눈부시다.",
            zh: "光明有时太过刺眼。"
        },
        choices: {
            ja: ["ラックス", "レオナ", "ケイル", "モルガナ"],
            en: ["Lux", "Leona", "Kayle", "Morgana"],
            ko: ["럭스", "레오나", "케일", "모르가나"],
            zh: ["拉克丝", "蕾欧娜", "凯尔", "莫甘娜"]
        },
        answer: 0
    },
    {
        id: 61,
        quotes: {
            ja: "闇に抱かれよ",
            en: "Embrace the darkness.",
            ko: "어둠을 받아들여라.",
            zh: "拥抱黑暗。"
        },
        choices: {
            ja: ["モルガナ", "ノクターン", "ゼド", "ヴェックス"],
            en: ["Morgana", "Nocturne", "Zed", "Vex"],
            ko: ["모르가나", "녹턴", "제드", "벡스"],
            zh: ["莫甘娜", "魔腾", "劫", "薇古丝"]
        },
        answer: 0
    },
    {
        id: 62,
        quotes: {
            ja: "自由のために戦う",
            en: "I fight for freedom.",
            ko: "자유를 위해 싸운다.",
            zh: "我为自由而战。"
        },
        choices: {
            ja: ["サイラス", "エコー", "ルシアン", "アッシュ"],
            en: ["Sylas", "Ekko", "Lucian", "Ashe"],
            ko: ["사일러스", "에코", "루시안", "애쉬"],
            zh: ["塞拉斯", "艾克", "卢锡安", "艾希"]
        },
        answer: 0
    },
    {
        id: 63,
        quotes: {
            ja: "氷よ、全てを凍らせよ",
            en: "Let it snow!",
            ko: "얼음이여, 모든 것을 얼려라.",
            zh: "冰冻一切！"
        },
        choices: {
            ja: ["リサンドラ", "アニビア", "アッシュ", "セジュアニ"],
            en: ["Lissandra", "Anivia", "Ashe", "Sejuani"],
            ko: ["리산드라", "애니비아", "애쉬", "세주아니"],
            zh: ["丽桑卓", "艾尼维亚", "艾希", "瑟庄妮"]
        },
        answer: 0
    },
    {
        id: 64,
        quotes: {
            ja: "凍てつく心",
            en: "My heart is frozen.",
            ko: "얼어붙은 심장.",
            zh: "我的心已冰封。"
        },
        choices: {
            ja: ["リサンドラ", "アニビア", "アッシュ", "ブランド"],
            en: ["Lissandra", "Anivia", "Ashe", "Brand"],
            ko: ["리산드라", "애니비아", "애쉬", "브랜드"],
            zh: ["丽桑卓", "艾尼维亚", "艾希", "布兰德"]
        },
        answer: 0
    },
    {
        id: 65,
        quotes: {
            ja: "星は私のもの",
            en: "The stars are mine.",
            ko: "별은 내 것이다.",
            zh: "星辰属于我。"
        },
        choices: {
            ja: ["オーレリオン・ソル", "バード", "ゾーイ", "ソラカ"],
            en: ["Aurelion Sol", "Bard", "Zoe", "Soraka"],
            ko: ["아우렐리온 솔", "바드", "조이", "소라카"],
            zh: ["奥瑞利安·索尔", "巴德", "佐伊", "索拉卡"]
        },
        answer: 0
    },
    {
        id: 66,
        quotes: {
            ja: "運命など、私が書き換える",
            en: "I will rewrite the stars.",
            ko: "운명은 내가 다시 쓴다.",
            zh: "我将改写命运。"
        },
        choices: {
            ja: ["オーレリオン・ソル", "ジリアン", "バード", "エコー"],
            en: ["Aurelion Sol", "Zilean", "Bard", "Ekko"],
            ko: ["아우렐리온 솔", "질리언", "바드", "에코"],
            zh: ["奥瑞利安·索尔", "基兰", "巴德", "艾克"]
        },
        answer: 0
    },
    {
        id: 67,
        quotes: {
            ja: "大地よ、私に力を",
            en: "The earth moves at my command.",
            ko: "대지여, 내게 힘을 주어라.",
            zh: "大地，赐予我力量。"
        },
        choices: {
            ja: ["タリヤ", "マルファイト", "アイバーン", "オーン"],
            en: ["Taliyah", "Malphite", "Ivern", "Ornn"],
            ko: ["탈리야", "말파이트", "아이번", "오른"],
            zh: ["塔莉垭", "墨菲特", "艾翁", "奥恩"]
        },
        answer: 0
    },
    {
        id: 68,
        quotes: {
            ja: "織りなせ、石よ",
            en: "Weave the stone.",
            ko: "돌을 엮어라.",
            zh: "编织石头。"
        },
        choices: {
            ja: ["タリヤ", "カシオペア", "ニダリー", "リサンドラ"],
            en: ["Taliyah", "Cassiopeia", "Nidalee", "Lissandra"],
            ko: ["탈리야", "카시오페아", "니달리", "리산드라"],
            zh: ["塔莉垭", "卡西奥佩娅", "奈德丽", "丽桑卓"]
        },
        answer: 0
    },
    {
        id: 69,
        quotes: {
            ja: "毒は最も美しい芸術",
            en: "Poison is my art.",
            ko: "독은 가장 아름다운 예술이다.",
            zh: "毒药是最美的艺术。"
        },
        choices: {
            ja: ["カシオペア", "シンジド", "ティーモ", "トゥイッチ"],
            en: ["Cassiopeia", "Singed", "Teemo", "Twitch"],
            ko: ["카시오페아", "신지드", "티모", "트위치"],
            zh: ["卡西奥佩娅", "辛吉德", "提莫", "图奇"]
        },
        answer: 0
    },
    {
        id: 70,
        quotes: {
            ja: "絶望を味わえ",
            en: "Taste despair.",
            ko: "절망을 맛보아라.",
            zh: "品尝绝望吧。"
        },
        choices: {
            ja: ["フィドルスティックス", "ノクターン", "シャコ", "スレッシュ"],
            en: ["Fiddlesticks", "Nocturne", "Shaco", "Thresh"],
            ko: ["피들스틱", "녹턴", "샤코", "쓰레쉬"],
            zh: ["费德提克", "魔腾", "萨科", "锤石"]
        },
        answer: 0
    },
    {
        id: 71,
        quotes: {
            ja: "恐怖そのものだ",
            en: "I am the thing under your bed.",
            ko: "공포 그 자체다.",
            zh: "我就是恐惧本身。"
        },
        choices: {
            ja: ["フィドルスティックス", "ノクターン", "エコー", "ウーコン"],
            en: ["Fiddlesticks", "Nocturne", "Ekko", "Wukong"],
            ko: ["피들스틱", "녹턴", "에코", "우콩"],
            zh: ["费德提克", "魔腾", "艾克", "孙悟空"]
        },
        answer: 0
    },
    {
        id: 72,
        quotes: {
            ja: "夢の中で会おう",
            en: "See you in your dreams.",
            ko: "꿈에서 만나자.",
            zh: "梦中见。"
        },
        choices: {
            ja: ["ゾーイ", "ノクターン", "リリア", "バード"],
            en: ["Zoe", "Nocturne", "Lillia", "Bard"],
            ko: ["조이", "녹턴", "릴리아", "바드"],
            zh: ["佐伊", "魔腾", "莉莉娅", "巴德"]
        },
        answer: 2
    },
    {
        id: 73,
        quotes: {
            ja: "静かに、夢を",
            en: "Sleep now.",
            ko: "조용히, 꿈을.",
            zh: "安静入梦。"
        },
        choices: {
            ja: ["リリア", "ゾーイ", "ソラカ", "ユーミ"],
            en: ["Lillia", "Zoe", "Soraka", "Yuumi"],
            ko: ["릴리아", "조이", "소라카", "유미"],
            zh: ["莉莉娅", "佐伊", "索拉卡", "悠米"]
        },
        answer: 0
    },
    {
        id: 74,
        quotes: {
            ja: "進化は止まらない",
            en: "Evolution never stops.",
            ko: "진화는 멈추지 않는다.",
            zh: "进化永不停息。"
        },
        choices: {
            ja: ["ビクター", "カ'ジックス", "ジェイス", "ハイマーディンガー"],
            en: ["Viktor", "Kha'Zix", "Jayce", "Heimerdinger"],
            ko: ["빅토르", "카직스", "제이스", "하이머딩거"],
            zh: ["维克托", "卡兹克", "杰斯", "黑默丁格"]
        },
        answer: 0
    },
    {
        id: 75,
        quotes: {
            ja: "未来は輝かしい",
            en: "The future is bright.",
            ko: "미래는 찬란하다.",
            zh: "未来一片光明。"
        },
        choices: {
            ja: ["ビクター", "ジェイス", "エコー", "ジリアン"],
            en: ["Viktor", "Jayce", "Ekko", "Zilean"],
            ko: ["빅토르", "제이스", "에코", "질리언"],
            zh: ["维克托", "杰斯", "艾克", "基兰"]
        },
        answer: 1
    },
    {
        id: 76,
        quotes: {
            ja: "明日への希望",
            en: "Hope for tomorrow.",
            ko: "내일을 위한 희망.",
            zh: "对明天的希望。"
        },
        choices: {
            ja: ["ジェイス", "ラックス", "ソラカ", "ブラウム"],
            en: ["Jayce", "Lux", "Soraka", "Braum"],
            ko: ["제이스", "럭스", "소라카", "브라움"],
            zh: ["杰斯", "拉克丝", "索拉卡", "布隆"]
        },
        answer: 0
    },
    {
        id: 77,
        quotes: {
            ja: "時は金なり",
            en: "Time is money.",
            ko: "시간은 돈이다.",
            zh: "时间就是金钱。"
        },
        choices: {
            ja: ["ジリアン", "エコー", "トゥイステッド・フェイト", "グレイブス"],
            en: ["Zilean", "Ekko", "Twisted Fate", "Graves"],
            ko: ["질리언", "에코", "트위스티드 페이트", "그레이브즈"],
            zh: ["基兰", "艾克", "崔斯特", "格雷福斯"]
        },
        answer: 2
    },
    {
        id: 78,
        quotes: {
            ja: "カードは語る",
            en: "The cards never lie.",
            ko: "카드는 말한다.",
            zh: "卡牌不会说谎。"
        },
        choices: {
            ja: ["トゥイステッド・フェイト", "タム・ケンチ", "グレイブス", "ジン"],
            en: ["Twisted Fate", "Tahm Kench", "Graves", "Jhin"],
            ko: ["트위스티드 페이트", "탐 켄치", "그레이브즈", "진"],
            zh: ["崔斯特", "塔姆", "格雷福斯", "烬"]
        },
        answer: 0
    },
    {
        id: 79,
        quotes: {
            ja: "金のために働く",
            en: "I work for gold.",
            ko: "금을 위해 일한다.",
            zh: "我为黄金工作。"
        },
        choices: {
            ja: ["グレイブス", "トゥイステッド・フェイト", "パイク", "ミス・フォーチュン"],
            en: ["Graves", "Twisted Fate", "Pyke", "Miss Fortune"],
            ko: ["그레이브즈", "트위스티드 페이트", "파이크", "미스 포츈"],
            zh: ["格雷福斯", "崔斯特", "派克", "厄运小姐"]
        },
        answer: 0
    },
    {
        id: 80,
        quotes: {
            ja: "葉巻はいかが？",
            en: "Got a light?",
            ko: "시가 어때?",
            zh: "来根雪茄？"
        },
        choices: {
            ja: ["グレイブス", "トゥイステッド・フェイト", "ジン", "ランブル"],
            en: ["Graves", "Twisted Fate", "Jhin", "Rumble"],
            ko: ["그레이브즈", "트위스티드 페이트", "진", "럼블"],
            zh: ["格雷福斯", "崔斯特", "烬", "兰博"]
        },
        answer: 0
    },
    {
        id: 81,
        quotes: {
            ja: "海は私のもの",
            en: "The sea is mine.",
            ko: "바다는 내 것이다.",
            zh: "大海属于我。"
        },
        choices: {
            ja: ["ミス・フォーチュン", "ガングプランク", "パイク", "ノーチラス"],
            en: ["Miss Fortune", "Gangplank", "Pyke", "Nautilus"],
            ko: ["미스 포츈", "갱플랭크", "파이크", "노틸러스"],
            zh: ["厄运小姐", "普朗克", "派克", "诺提勒斯"]
        },
        answer: 1
    },
    {
        id: 82,
        quotes: {
            ja: "金貨が全てだ",
            en: "Gold before glory.",
            ko: "금화가 전부다.",
            zh: "黄金高于荣耀。"
        },
        choices: {
            ja: ["ガングプランク", "グレイブス", "ミス・フォーチュン", "トゥイステッド・フェイト"],
            en: ["Gangplank", "Graves", "Miss Fortune", "Twisted Fate"],
            ko: ["갱플랭크", "그레이브즈", "미스 포츈", "트위스티드 페이트"],
            zh: ["普朗克", "格雷福斯", "厄运小姐", "崔斯特"]
        },
        answer: 0
    },
    {
        id: 83,
        quotes: {
            ja: "運は味方する",
            en: "Fortune favors the bold.",
            ko: "운은 편이다.",
            zh: "财富青睐勇者。"
        },
        choices: {
            ja: ["ミス・フォーチュン", "ガングプランク", "カタリナ", "サミーラ"],
            en: ["Miss Fortune", "Gangplank", "Katarina", "Samira"],
            ko: ["미스 포츈", "갱플랭크", "카타리나", "사미라"],
            zh: ["厄运小姐", "普朗克", "卡特琳娜", "莎弥拉"]
        },
        answer: 0
    },
    {
        id: 84,
        quotes: {
            ja: "深淵が呼んでいる",
            en: "The abyss calls.",
            ko: "심연이 부른다.",
            zh: "深渊在召唤。"
        },
        choices: {
            ja: ["パイク", "ノーチラス", "フィズ", "イラオイ"],
            en: ["Pyke", "Nautilus", "Fizz", "Illaoi"],
            ko: ["파이크", "노틸러스", "피즈", "일라오이"],
            zh: ["派克", "诺提勒斯", "菲兹", "俄洛伊"]
        },
        answer: 0
    },
    {
        id: 85,
        quotes: {
            ja: "名簿に名を刻む",
            en: "Your name is on my list.",
            ko: "명부에 이름을 새긴다.",
            zh: "你的名字在我的名单上。"
        },
        choices: {
            ja: ["パイク", "ヴェイン", "カリスタ", "ルシアン"],
            en: ["Pyke", "Vayne", "Kalista", "Lucian"],
            ko: ["파이크", "베인", "칼리스타", "루시안"],
            zh: ["派克", "薇恩", "卡莉丝塔", "卢锡安"]
        },
        answer: 0
    },
    {
        id: 86,
        quotes: {
            ja: "宇宙は広大だ",
            en: "The universe is vast.",
            ko: "우주는 광대하다.",
            zh: "宇宙浩瀚无垠。"
        },
        choices: {
            ja: ["オーレリオン・ソル", "バード", "ジリアン", "ゾーイ"],
            en: ["Aurelion Sol", "Bard", "Zilean", "Zoe"],
            ko: ["아우렐리온 솔", "바드", "질리언", "조이"],
            zh: ["奥瑞利安·索尔", "巴德", "基兰", "佐伊"]
        },
        answer: 0
    },
    {
        id: 87,
        quotes: {
            ja: "星を創り出す",
            en: "I forge stars.",
            ko: "별을 만들어낸다.",
            zh: "我锻造星辰。"
        },
        choices: {
            ja: ["オーレリオン・ソル", "タリック", "バード", "ソラカ"],
            en: ["Aurelion Sol", "Taric", "Bard", "Soraka"],
            ko: ["아우렐리온 솔", "타릭", "바드", "소라카"],
            zh: ["奥瑞利安·索尔", "塔里克", "巴德", "索拉卡"]
        },
        answer: 0
    },
    {
        id: 88,
        quotes: {
            ja: "美は宝石の中に",
            en: "Beauty is in the gems.",
            ko: "아름다움은 보석 속에.",
            zh: "美在宝石之中。"
        },
        choices: {
            ja: ["タリック", "スカーナー", "マルファイト", "タリヤ"],
            en: ["Taric", "Skarner", "Malphite", "Taliyah"],
            ko: ["타릭", "스카너", "말파이트", "탈리야"],
            zh: ["塔里克", "斯卡纳", "墨菲特", "塔莉垭"]
        },
        answer: 0
    },
    {
        id: 89,
        quotes: {
            ja: "愛が全てを守る",
            en: "Love protects all.",
            ko: "사랑이 모든 것을 지킨다.",
            zh: "爱守护一切。"
        },
        choices: {
            ja: ["タリック", "ソラカ", "ブラウム", "ラカン"],
            en: ["Taric", "Soraka", "Braum", "Rakan"],
            ko: ["타릭", "소라카", "브라움", "라칸"],
            zh: ["塔里克", "索拉卡", "布隆", "洛"]
        },
        answer: 0
    },
    {
        id: 90,
        quotes: {
            ja: "羽根よ、舞え",
            en: "Feathers fly!",
            ko: "깃털이여, 춤춰라.",
            zh: "羽毛飞舞！"
        },
        choices: {
            ja: ["ラカン", "シャヤ", "クイン", "アニビア"],
            en: ["Rakan", "Xayah", "Quinn", "Anivia"],
            ko: ["라칸", "자야", "퀸", "애니비아"],
            zh: ["洛", "霞", "奎因", "艾尼维亚"]
        },
        answer: 1
    },
    {
        id: 91,
        quotes: {
            ja: "羽根は嘘をつかない",
            en: "Feathers don't lie.",
            ko: "깃털은 거짓말하지 않는다.",
            zh: "羽毛不会说谎。"
        },
        choices: {
            ja: ["シャヤ", "ラカン", "クイン", "スウェイン"],
            en: ["Xayah", "Rakan", "Quinn", "Swain"],
            ko: ["자야", "라칸", "퀸", "스웨인"],
            zh: ["霞", "洛", "奎因", "斯维因"]
        },
        answer: 0
    },
    {
        id: 92,
        quotes: {
            ja: "共に舞おう",
            en: "Let's dance!",
            ko: "함께 춤추자.",
            zh: "一起跳舞吧！"
        },
        choices: {
            ja: ["ラカン", "シャヤ", "アーリ", "イレリア"],
            en: ["Rakan", "Xayah", "Ahri", "Irelia"],
            ko: ["라칸", "자야", "아리", "이렐리아"],
            zh: ["洛", "霞", "阿狸", "艾瑞莉娅"]
        },
        answer: 0
    },
    {
        id: 93,
        quotes: {
            ja: "刃は踊る",
            en: "The blade dances.",
            ko: "칼날이 춤춘다.",
            zh: "刀刃起舞。"
        },
        choices: {
            ja: ["イレリア", "フィオラ", "カタリナ", "カミール"],
            en: ["Irelia", "Fiora", "Katarina", "Camille"],
            ko: ["이렐리아", "피오라", "카타리나", "카밀"],
            zh: ["艾瑞莉娅", "菲奥娜", "卡特琳娜", "卡蜜尔"]
        },
        answer: 0
    },
    {
        id: 94,
        quotes: {
            ja: "私は刃そのもの",
            en: "I am the blade.",
            ko: "나는 칼날 그 자체다.",
            zh: "我就是刀刃。"
        },
        choices: {
            ja: ["イレリア", "ヤスオ", "カタリナ", "タロン"],
            en: ["Irelia", "Yasuo", "Katarina", "Talon"],
            ko: ["이렐리아", "야스오", "카타리나", "탈론"],
            zh: ["艾瑞莉娅", "亚索", "卡特琳娜", "泰隆"]
        },
        answer: 0
    },
    {
        id: 95,
        quotes: {
            ja: "決闘を申し込む",
            en: "En garde!",
            ko: "결투를 신청한다.",
            zh: "请与我决斗！"
        },
        choices: {
            ja: ["フィオラ", "イレリア", "カミール", "ジン"],
            en: ["Fiora", "Irelia", "Camille", "Jhin"],
            ko: ["피오라", "이렐리아", "카밀", "진"],
            zh: ["菲奥娜", "艾瑞莉娅", "卡蜜尔", "烬"]
        },
        answer: 0
    },
    {
        id: 96,
        quotes: {
            ja: "精密さが全て",
            en: "Precision is everything.",
            ko: "정밀함이 전부다.",
            zh: "精准至上。"
        },
        choices: {
            ja: ["カミール", "ジン", "フィオラ", "ケイトリン"],
            en: ["Camille", "Jhin", "Fiora", "Caitlyn"],
            ko: ["카밀", "진", "피오라", "케이틀린"],
            zh: ["卡蜜尔", "烬", "菲奥娜", "凯特琳"]
        },
        answer: 0
    },
    {
        id: 97,
        quotes: {
            ja: "完璧な一撃",
            en: "One perfect strike.",
            ko: "완벽한 일격.",
            zh: "完美的一击。"
        },
        choices: {
            ja: ["カミール", "ジン", "リー・シン", "ヤスオ"],
            en: ["Camille", "Jhin", "Lee Sin", "Yasuo"],
            ko: ["카밀", "진", "리 신", "야스오"],
            zh: ["卡蜜尔", "烬", "李青", "亚索"]
        },
        answer: 1
    },
    {
        id: 98,
        quotes: {
            ja: "四が私の美学",
            en: "Four is my aesthetic.",
            ko: "4가 나의 미학이다.",
            zh: "四是我的美学。"
        },
        choices: {
            ja: ["ジン", "ヤスオ", "ゼド", "タロン"],
            en: ["Jhin", "Yasuo", "Zed", "Talon"],
            ko: ["진", "야스오", "제드", "탈론"],
            zh: ["烬", "亚索", "劫", "泰隆"]
        },
        answer: 0
    },
    {
        id: 99,
        quotes: {
            ja: "芸術は爆発だ",
            en: "Art is an explosion!",
            ko: "예술은 폭발이다.",
            zh: "艺术就是爆炸！"
        },
        choices: {
            ja: ["ジグス", "ジン", "ランブル", "ジグス"],
            en: ["Ziggs", "Jhin", "Rumble", "Ziggs"],
            ko: ["직스", "진", "럼블", "직스"],
            zh: ["吉格斯", "烬", "兰博", "吉格斯"]
        },
        answer: 3
    },
    {
        id: 100,
        quotes: {
            ja: "爆弾は最高の友達",
            en: "Bombs are my best friend!",
            ko: "폭탄은 최고의 친구다.",
            zh: "炸弹是我最好的朋友！"
        },
        choices: {
            ja: ["ジグス", "ジンクス", "ランブル", "コーキ"],
            en: ["Ziggs", "Jinx", "Rumble", "Corki"],
            ko: ["직스", "징크스", "럼블", "코르키"],
            zh: ["吉格斯", "金克丝", "兰博", "库奇"]
        },
        answer: 0
    },
    {
        id: 101,
        quotes: {
            ja: "科学の力を見せてやる",
            en: "Science will reveal all!",
            ko: "과학의 힘을 보여주겠다.",
            zh: "让你见识科学的力量！"
        },
        choices: {
            ja: ["ハイマーディンガー", "ビクター", "ジェイス", "ジグス"],
            en: ["Heimerdinger", "Viktor", "Jayce", "Ziggs"],
            ko: ["하이머딩거", "빅토르", "제이스", "직스"],
            zh: ["黑默丁格", "维克托", "杰斯", "吉格斯"]
        },
        answer: 0
    },
    {
        id: 102,
        quotes: {
            ja: "発明は人生",
            en: "Invention is my life.",
            ko: "발명이 인생이다.",
            zh: "发明就是我的生命。"
        },
        choices: {
            ja: ["ハイマーディンガー", "ランブル", "ジグス", "コーキ"],
            en: ["Heimerdinger", "Rumble", "Ziggs", "Corki"],
            ko: ["하이머딩거", "럼블", "직스", "코르키"],
            zh: ["黑默丁格", "兰博", "吉格斯", "库奇"]
        },
        answer: 0
    },
    {
        id: 103,
        quotes: {
            ja: "私のメカが最強",
            en: "My mech is the best!",
            ko: "내 메카가 최강이다.",
            zh: "我的机甲最强！"
        },
        choices: {
            ja: ["ランブル", "ハイマーディンガー", "ブリッツクランク", "オリアナ"],
            en: ["Rumble", "Heimerdinger", "Blitzcrank", "Orianna"],
            ko: ["럼블", "하이머딩거", "블리츠크랭크", "오리아나"],
            zh: ["兰博", "黑默丁格", "布里茨", "奥莉安娜"]
        },
        answer: 0
    },
    {
        id: 104,
        quotes: {
            ja: "小さくても強い",
            en: "Small but mighty.",
            ko: "작지만 강하다.",
            zh: "虽小但强。"
        },
        choices: {
            ja: ["ランブル", "ティーモ", "ポピー", "コーキ"],
            en: ["Rumble", "Teemo", "Poppy", "Corki"],
            ko: ["럼블", "티모", "뽀삐", "코르키"],
            zh: ["兰博", "提莫", "波比", "库奇"]
        },
        answer: 1
    },
    {
        id: 105,
        quotes: {
            ja: "キノコを植えよう",
            en: "Planting mushrooms!",
            ko: "버섯을 심자.",
            zh: "种蘑菇啦！"
        },
        choices: {
            ja: ["ティーモ", "マオカイ", "アイバーン", "ニーコ"],
            en: ["Teemo", "Maokai", "Ivern", "Neeko"],
            ko: ["티모", "마오카이", "아이번", "니코"],
            zh: ["提莫", "茂凯", "艾翁", "妮蔻"]
        },
        answer: 0
    },
    {
        id: 106,
        quotes: {
            ja: "森が私を守る",
            en: "The forest protects me.",
            ko: "숲이 나를 지킨다.",
            zh: "森林保护我。"
        },
        choices: {
            ja: ["マオカイ", "アイバーン", "ニダリー", "ジグス"],
            en: ["Maokai", "Ivern", "Nidalee", "Zyra"],
            ko: ["마오카이", "아이번", "니달리", "자이라"],
            zh: ["茂凯", "艾翁", "奈德丽", "婕拉"]
        },
        answer: 0
    },
    {
        id: 107,
        quotes: {
            ja: "友達を作ろう",
            en: "Let's be friends!",
            ko: "친구를 만들자.",
            zh: "让我们做朋友吧！"
        },
        choices: {
            ja: ["アイバーン", "ニーコ", "ユーミ", "リリア"],
            en: ["Ivern", "Neeko", "Yuumi", "Lillia"],
            ko: ["아이번", "니코", "유미", "릴리아"],
            zh: ["艾翁", "妮蔻", "悠米", "莉莉娅"]
        },
        answer: 0
    },
    {
        id: 108,
        quotes: {
            ja: "変身は得意よ",
            en: "I'm great at transforming!",
            ko: "변신은 자신 있어.",
            zh: "我最擅长变身！"
        },
        choices: {
            ja: ["ニーコ", "シャコ", "ルブラン", "ゾーイ"],
            en: ["Neeko", "Shaco", "LeBlanc", "Zoe"],
            ko: ["니코", "샤코", "르블랑", "조이"],
            zh: ["妮蔻", "萨科", "乐芙兰", "佐伊"]
        },
        answer: 0
    },
    {
        id: 109,
        quotes: {
            ja: "猫は自由だ",
            en: "Cats are free.",
            ko: "고양이는 자유롭다.",
            zh: "猫是自由的。"
        },
        choices: {
            ja: ["ユーミ", "レンガー", "ニダリー", "アーリ"],
            en: ["Yuumi", "Rengar", "Nidalee", "Ahri"],
            ko: ["유미", "렝가", "니달리", "아리"],
            zh: ["悠米", "雷恩加尔", "奈德丽", "阿狸"]
        },
        answer: 0
    },
    {
        id: 110,
        quotes: {
            ja: "本を読もう",
            en: "Let's read a book!",
            ko: "책을 읽자.",
            zh: "让我们读书吧！"
        },
        choices: {
            ja: ["ユーミ", "ライズ", "ベイガー", "ジリアン"],
            en: ["Yuumi", "Ryze", "Veigar", "Zilean"],
            ko: ["유미", "라이즈", "베이가", "질리언"],
            zh: ["悠米", "瑞兹", "维迦", "基兰"]
        },
        answer: 0
    },
    // Additional questions (111-300) from voice_lines.csv
    {
        id: 111,
        quotes: {
            ja: "I am the World-Ender!",
            en: "I am the World-Ender!",
            ko: "I am the World-Ender!",
            zh: "I am the World-Ender!"
        },
        choices: {
            ja: ["エイトロックス", "モルデカイザー", "サイオン", "ダリウス"],
            en: ["Aatrox", "Mordekaiser", "Sion", "Darius"],
            ko: ["아트록스", "모데카이저", "사이온", "다리우스"],
            zh: ["亚托克斯", "莫德凯撒", "赛恩", "德莱厄斯"]
        },
        answer: 0
    },
    {
        id: 112,
        quotes: {
            ja: "Charmed, I'm sure.",
            en: "Charmed, I'm sure.",
            ko: "Charmed, I'm sure.",
            zh: "Charmed, I'm sure."
        },
        choices: {
            ja: ["アーリ", "イブリン", "シンドラ", "ルブラン"],
            en: ["Ahri", "Evelynn", "Syndra", "LeBlanc"],
            ko: ["아리", "이블린", "신드라", "르블랑"],
            zh: ["阿狸", "伊芙琳", "辛德拉", "乐芙兰"]
        },
        answer: 0
    },
    {
        id: 113,
        quotes: {
            ja: "The key to immortality? Not dying!",
            en: "The key to immortality? Not dying!",
            ko: "The key to immortality? Not dying!",
            zh: "The key to immortality? Not dying!"
        },
        choices: {
            ja: ["アリスター", "ブラウム", "タリック", "タム・ケンチ"],
            en: ["Alistar", "Braum", "Taric", "Tahm Kench"],
            ko: ["알리스타", "브라움", "타릭", "탐 켄치"],
            zh: ["阿利斯塔", "布隆", "塔里克", "塔姆"]
        },
        answer: 0
    },
    {
        id: 114,
        quotes: {
            ja: "Let's find some friends!",
            en: "Let's find some friends!",
            ko: "Let's find some friends!",
            zh: "Let's find some friends!"
        },
        choices: {
            ja: ["アムム", "ナー", "ポッピー", "ティーモ"],
            en: ["Amumu", "Gnar", "Poppy", "Teemo"],
            ko: ["아무무", "나르", "뽀삐", "티모"],
            zh: ["阿木木", "纳尔", "波比", "提莫"]
        },
        answer: 0
    },
    {
        id: 115,
        quotes: {
            ja: "On my wings.",
            en: "On my wings.",
            ko: "On my wings.",
            zh: "On my wings."
        },
        choices: {
            ja: ["アニビア", "クイン", "アッシュ", "ザヤ"],
            en: ["Anivia", "Quinn", "Ashe", "Xayah"],
            ko: ["애니비아", "퀸", "애쉬", "자야"],
            zh: ["艾尼维亚", "奎因", "艾希", "霞"]
        },
        answer: 0
    },
    {
        id: 116,
        quotes: {
            ja: "Have you seen my bear Tibbers?",
            en: "Have you seen my bear Tibbers?",
            ko: "Have you seen my bear Tibbers?",
            zh: "Have you seen my bear Tibbers?"
        },
        choices: {
            ja: ["アニー", "ゾーイ", "ルル", "ポッピー"],
            en: ["Annie", "Zoe", "Lulu", "Poppy"],
            ko: ["애니", "조이", "룰루", "뽀삐"],
            zh: ["安妮", "佐伊", "璐璐", "波比"]
        },
        answer: 0
    },
    {
        id: 117,
        quotes: {
            ja: "Icing on the cake.",
            en: "Icing on the cake.",
            ko: "Icing on the cake.",
            zh: "Icing on the cake."
        },
        choices: {
            ja: ["アッシュ", "ケイトリン", "ジンクス", "ヴェイン"],
            en: ["Ashe", "Caitlyn", "Jinx", "Vayne"],
            ko: ["애쉬", "케이틀린", "징크스", "베인"],
            zh: ["艾希", "凯特琳", "金克丝", "薇恩"]
        },
        answer: 0
    },
    {
        id: 118,
        quotes: {
            ja: "Stars fill the sky.",
            en: "Stars fill the sky.",
            ko: "Stars fill the sky.",
            zh: "Stars fill the sky."
        },
        choices: {
            ja: ["オレリオン・ソル", "バード", "ゾーイ", "ソラカ"],
            en: ["Aurelion Sol", "Bard", "Zoe", "Soraka"],
            ko: ["아우렐리온 솔", "바드", "조이", "소라카"],
            zh: ["奥瑞利安·索尔", "巴德", "佐伊", "索拉卡"]
        },
        answer: 0
    },
    {
        id: 119,
        quotes: {
            ja: "Shurima! Your emperor has returned!",
            en: "Shurima! Your emperor has returned!",
            ko: "Shurima! Your emperor has returned!",
            zh: "Shurima! Your emperor has returned!"
        },
        choices: {
            ja: ["アジール", "ナサス", "レネクトン", "ゼラス"],
            en: ["Azir", "Nasus", "Renekton", "Xerath"],
            ko: ["아지르", "나서스", "레넥톤", "제라스"],
            zh: ["阿兹尔", "内瑟斯", "鳄鱼", "泽拉斯"]
        },
        answer: 0
    },
    {
        id: 120,
        quotes: {
            ja: "Beep boop.",
            en: "Beep boop.",
            ko: "Beep boop.",
            zh: "Beep boop."
        },
        choices: {
            ja: ["ブリッツクランク", "ビクター", "オリアナ", "ジグス"],
            en: ["Blitzcrank", "Viktor", "Orianna", "Ziggs"],
            ko: ["블리츠크랭크", "빅토르", "오리아나", "직스"],
            zh: ["布里茨", "维克托", "奥莉安娜", "吉格斯"]
        },
        answer: 0
    },
    {
        id: 121,
        quotes: {
            ja: "Is it hot in here or is it just me?",
            en: "Is it hot in here or is it just me?",
            ko: "Is it hot in here or is it just me?",
            zh: "Is it hot in here or is it just me?"
        },
        choices: {
            ja: ["ブランド", "アニー", "ランブル", "スウェイン"],
            en: ["Brand", "Annie", "Rumble", "Swain"],
            ko: ["브랜드", "애니", "럼블", "스웨인"],
            zh: ["布兰德", "安妮", "兰博", "斯维因"]
        },
        answer: 0
    },
    {
        id: 122,
        quotes: {
            ja: "The heart is the strongest muscle.",
            en: "The heart is the strongest muscle.",
            ko: "The heart is the strongest muscle.",
            zh: "The heart is the strongest muscle."
        },
        choices: {
            ja: ["ブラウム", "ガレン", "ダリウス", "グラガス"],
            en: ["Braum", "Garen", "Darius", "Gragas"],
            ko: ["브라움", "가렌", "다리우스", "그라가스"],
            zh: ["布隆", "盖伦", "德莱厄斯", "古拉加斯"]
        },
        answer: 0
    },
    {
        id: 123,
        quotes: {
            ja: "I always take my toll.",
            en: "I always take my toll.",
            ko: "I always take my toll.",
            zh: "I always take my toll."
        },
        choices: {
            ja: ["ケイトリン", "ジンクス", "ヴェイン", "アッシュ"],
            en: ["Caitlyn", "Jinx", "Vayne", "Ashe"],
            ko: ["케이틀린", "징크스", "베인", "애쉬"],
            zh: ["凯特琳", "金克丝", "薇恩", "艾希"]
        },
        answer: 0
    },
    {
        id: 124,
        quotes: {
            ja: "Precision is the difference between a butcher and a surgeon.",
            en: "Precision is the difference between a butcher and a surgeon.",
            ko: "Precision is the difference between a butcher and a surgeon.",
            zh: "Precision is the difference between a butcher and a surgeon."
        },
        choices: {
            ja: ["カミール", "フィオラ", "イレリア", "カタリナ"],
            en: ["Camille", "Fiora", "Irelia", "Katarina"],
            ko: ["카밀", "피오라", "이렐리아", "카타리나"],
            zh: ["卡蜜尔", "菲奥娜", "艾瑞莉娅", "卡特琳娜"]
        },
        answer: 0
    },
    {
        id: 125,
        quotes: {
            ja: "I was once a lady. Now, I am so much more.",
            en: "I was once a lady. Now, I am so much more.",
            ko: "I was once a lady. Now, I am so much more.",
            zh: "I was once a lady. Now, I am so much more."
        },
        choices: {
            ja: ["カシオペア", "エリス", "イブリン", "モルガナ"],
            en: ["Cassiopeia", "Elise", "Evelynn", "Morgana"],
            ko: ["카시오페아", "엘리스", "이블린", "모르가나"],
            zh: ["卡西奥佩娅", "伊莉丝", "伊芙琳", "莫甘娜"]
        },
        answer: 0
    },
    {
        id: 126,
        quotes: {
            ja: "Nom nom nom nom.",
            en: "Nom nom nom nom.",
            ko: "Nom nom nom nom.",
            zh: "Nom nom nom nom."
        },
        choices: {
            ja: ["チョ＝ガス", "コグ＝マウ", "タム・ケンチ", "ザック"],
            en: ["Cho'Gath", "Kog'Maw", "Tahm Kench", "Zac"],
            ko: ["초가스", "코그모", "탐 켄치", "자크"],
            zh: ["科加斯", "克格莫", "塔姆", "扎克"]
        },
        answer: 0
    },
    {
        id: 127,
        quotes: {
            ja: "I'm on it, blacksheep!",
            en: "I'm on it, blacksheep!",
            ko: "I'm on it, blacksheep!",
            zh: "I'm on it, blacksheep!"
        },
        choices: {
            ja: ["コーキ", "ジグス", "ランブル", "ハイマーディンガー"],
            en: ["Corki", "Ziggs", "Rumble", "Heimerdinger"],
            ko: ["코르키", "직스", "럼블", "하이머딩거"],
            zh: ["库奇", "吉格斯", "兰博", "黑默丁格"]
        },
        answer: 0
    },
    {
        id: 128,
        quotes: {
            ja: "Noxus will rise!",
            en: "Noxus will rise!",
            ko: "Noxus will rise!",
            zh: "Noxus will rise!"
        },
        choices: {
            ja: ["ダリウス", "ドレイヴン", "スウェイン", "タロン"],
            en: ["Darius", "Draven", "Swain", "Talon"],
            ko: ["다리우스", "드레이븐", "스웨인", "탈론"],
            zh: ["德莱厄斯", "德莱文", "斯维因", "泰隆"]
        },
        answer: 0
    },
    {
        id: 129,
        quotes: {
            ja: "A new moon is rising.",
            en: "A new moon is rising.",
            ko: "A new moon is rising.",
            zh: "A new moon is rising."
        },
        choices: {
            ja: ["ダイアナ", "レオナ", "ゾーイ", "ソラカ"],
            en: ["Diana", "Leona", "Zoe", "Soraka"],
            ko: ["다이애나", "레오나", "조이", "소라카"],
            zh: ["黛安娜", "蕾欧娜", "佐伊", "索拉卡"]
        },
        answer: 0
    },
    {
        id: 130,
        quotes: {
            ja: "Mundo goes where he pleases!",
            en: "Mundo goes where he pleases!",
            ko: "Mundo goes where he pleases!",
            zh: "Mundo goes where he pleases!"
        },
        choices: {
            ja: ["ドクター・ムンド", "サイオン", "ウーコン", "グラガス"],
            en: ["Dr. Mundo", "Sion", "Wukong", "Gragas"],
            ko: ["문도 박사", "사이온", "오공", "그라가스"],
            zh: ["蒙多医生", "赛恩", "悟空", "古拉加斯"]
        },
        answer: 0
    },
    {
        id: 131,
        quotes: {
            ja: "Welcome to the League of Draven!",
            en: "Welcome to the League of Draven!",
            ko: "Welcome to the League of Draven!",
            zh: "Welcome to the League of Draven!"
        },
        choices: {
            ja: ["ドレイヴン", "ダリウス", "スウェイン", "ブラッドミア"],
            en: ["Draven", "Darius", "Swain", "Vladimir"],
            ko: ["드레이븐", "다리우스", "스웨인", "블라디미르"],
            zh: ["德莱文", "德莱厄斯", "斯维因", "弗拉基米尔"]
        },
        answer: 0
    },
    {
        id: 132,
        quotes: {
            ja: "It's not how much time you have, it's how you use it.",
            en: "It's not how much time you have, it's how you use it.",
            ko: "It's not how much time you have, it's how you use it.",
            zh: "It's not how much time you have, it's how you use it."
        },
        choices: {
            ja: ["エコー", "ジリアン", "エズリアル", "ケイン"],
            en: ["Ekko", "Zilean", "Ezreal", "Kayn"],
            ko: ["에코", "질리언", "이즈리얼", "케인"],
            zh: ["艾克", "基兰", "伊泽瑞尔", "凯隐"]
        },
        answer: 0
    },
    {
        id: 133,
        quotes: {
            ja: "You belong in a museum!",
            en: "You belong in a museum!",
            ko: "You belong in a museum!",
            zh: "You belong in a museum!"
        },
        choices: {
            ja: ["エズリアル", "ジェイス", "ビクター", "ハイマーディンガー"],
            en: ["Ezreal", "Jayce", "Viktor", "Heimerdinger"],
            ko: ["이즈리얼", "제이스", "빅토르", "하이머딩거"],
            zh: ["伊泽瑞尔", "杰斯", "维克托", "黑默丁格"]
        },
        answer: 0
    },
    {
        id: 134,
        quotes: {
            ja: "I decide what the tide will bring.",
            en: "I decide what the tide will bring.",
            ko: "I decide what the tide will bring.",
            zh: "I decide what the tide will bring."
        },
        choices: {
            ja: ["フィズ", "ナミ", "パイク", "イラオイ"],
            en: ["Fizz", "Nami", "Pyke", "Illaoi"],
            ko: ["피즈", "나미", "파이크", "일라오이"],
            zh: ["菲兹", "娜美", "派克", "俄洛伊"]
        },
        answer: 0
    },
    {
        id: 135,
        quotes: {
            ja: "Justice.",
            en: "Justice.",
            ko: "Justice.",
            zh: "Justice."
        },
        choices: {
            ja: ["ガリオ", "ガレン", "パンテオン", "ジャーヴァンⅣ"],
            en: ["Galio", "Garen", "Pantheon", "Jarvan IV"],
            ko: ["갈리오", "가렌", "판테온", "자르반 4세"],
            zh: ["加里奥", "盖伦", "潘森", "嘉文四世"]
        },
        answer: 0
    },
    {
        id: 136,
        quotes: {
            ja: "Demacia!",
            en: "Demacia!",
            ko: "Demacia!",
            zh: "Demacia!"
        },
        choices: {
            ja: ["ガレン", "ジャーヴァンⅣ", "ラックス", "ザヤ"],
            en: ["Garen", "Jarvan IV", "Lux", "Xayah"],
            ko: ["가렌", "자르반 4세", "럭스", "자야"],
            zh: ["盖伦", "嘉文四世", "拉克丝", "霞"]
        },
        answer: 0
    },
    {
        id: 137,
        quotes: {
            ja: "Shaken, not stirred.",
            en: "Shaken, not stirred.",
            ko: "Shaken, not stirred.",
            zh: "Shaken, not stirred."
        },
        choices: {
            ja: ["グラガス", "グレイブス", "ガングプランク", "ジャックス"],
            en: ["Gragas", "Graves", "Gangplank", "Jax"],
            ko: ["그라가스", "그레이브즈", "갱플랭크", "잭스"],
            zh: ["古拉加斯", "格雷福斯", "普朗克", "贾克斯"]
        },
        answer: 0
    },
    {
        id: 138,
        quotes: {
            ja: "Dead man walking.",
            en: "Dead man walking.",
            ko: "Dead man walking.",
            zh: "Dead man walking."
        },
        choices: {
            ja: ["グレイブス", "ルシアン", "ジン", "トゥイッチ"],
            en: ["Graves", "Lucian", "Jhin", "Twitch"],
            ko: ["그레이브즈", "루시안", "진", "트위치"],
            zh: ["格雷福斯", "卢锡安", "烬", "图奇"]
        },
        answer: 0
    },
    {
        id: 139,
        quotes: {
            ja: "Beware the depths.",
            en: "Beware the depths.",
            ko: "Beware the depths.",
            zh: "Beware the depths."
        },
        choices: {
            ja: ["ノーチラス", "パイク", "ナミ", "フィズ"],
            en: ["Nautilus", "Pyke", "Nami", "Fizz"],
            ko: ["노틸러스", "파이크", "나미", "피즈"],
            zh: ["诺提勒斯", "派克", "娜美", "菲兹"]
        },
        answer: 0
    },
    {
        id: 140,
        quotes: {
            ja: "Eureka!",
            en: "Eureka!",
            ko: "Eureka!",
            zh: "Eureka!"
        },
        choices: {
            ja: ["ハイマーディンガー", "ジェイス", "ビクター", "ジグス"],
            en: ["Heimerdinger", "Jayce", "Viktor", "Ziggs"],
            ko: ["하이머딩거", "제이스", "빅토르", "직스"],
            zh: ["黑默丁格", "杰斯", "维克托", "吉格斯"]
        },
        answer: 0
    },
    {
        id: 141,
        quotes: {
            ja: "Motion before emotion.",
            en: "Motion before emotion.",
            ko: "Motion before emotion.",
            zh: "Motion before emotion."
        },
        choices: {
            ja: ["イラオイ", "カルマ", "ナミ", "ソラカ"],
            en: ["Illaoi", "Karma", "Nami", "Soraka"],
            ko: ["일라오이", "카르마", "나미", "소라카"],
            zh: ["俄洛伊", "卡尔玛", "娜美", "索拉卡"]
        },
        answer: 0
    },
    {
        id: 142,
        quotes: {
            ja: "Remember the placidium!",
            en: "Remember the placidium!",
            ko: "Remember the placidium!",
            zh: "Remember the placidium!"
        },
        choices: {
            ja: ["イレリア", "カルマ", "シヴァーナ", "ザヤ"],
            en: ["Irelia", "Karma", "Shyvana", "Xayah"],
            ko: ["이렐리아", "카르마", "쉬바나", "자야"],
            zh: ["艾瑞莉娅", "卡尔玛", "希瓦娜", "霞"]
        },
        answer: 0
    },
    {
        id: 143,
        quotes: {
            ja: "Friend!",
            en: "Friend!",
            ko: "Friend!",
            zh: "Friend!"
        },
        choices: {
            ja: ["アイバーン", "マオカイ", "ザイラ", "ニーコ"],
            en: ["Ivern", "Maokai", "Zyra", "Neeko"],
            ko: ["아이번", "마오카이", "자이라", "니코"],
            zh: ["艾翁", "茂凯", "婕拉", "妮蔻"]
        },
        answer: 0
    },
    {
        id: 144,
        quotes: {
            ja: "By my will, this shall be finished!",
            en: "By my will, this shall be finished!",
            ko: "By my will, this shall be finished!",
            zh: "By my will, this shall be finished!"
        },
        choices: {
            ja: ["ジャーヴァンⅣ", "ガレン", "ダリウス", "パンテオン"],
            en: ["Jarvan IV", "Garen", "Darius", "Pantheon"],
            ko: ["자르반 4세", "가렌", "다리우스", "판테온"],
            zh: ["嘉文四世", "盖伦", "德莱厄斯", "潘森"]
        },
        answer: 0
    },
    {
        id: 145,
        quotes: {
            ja: "Imagine if I had a real weapon.",
            en: "Imagine if I had a real weapon.",
            ko: "Imagine if I had a real weapon.",
            zh: "Imagine if I had a real weapon."
        },
        choices: {
            ja: ["ジャックス", "ウーコン", "イレリア", "フィオラ"],
            en: ["Jax", "Wukong", "Irelia", "Fiora"],
            ko: ["잭스", "오공", "이렐리아", "피오라"],
            zh: ["贾克斯", "悟空", "艾瑞莉娅", "菲奥娜"]
        },
        answer: 0
    },
    {
        id: 146,
        quotes: {
            ja: "The future belongs to those who break the rules.",
            en: "The future belongs to those who break the rules.",
            ko: "The future belongs to those who break the rules.",
            zh: "The future belongs to those who break the rules."
        },
        choices: {
            ja: ["ジェイス", "ビクター", "ハイマーディンガー", "ジグス"],
            en: ["Jayce", "Viktor", "Heimerdinger", "Ziggs"],
            ko: ["제이스", "빅토르", "하이머딩거", "직스"],
            zh: ["杰斯", "维克托", "黑默丁格", "吉格斯"]
        },
        answer: 0
    },
    {
        id: 147,
        quotes: {
            ja: "In carnage, I bloom, like a flower in the dawn.",
            en: "In carnage, I bloom, like a flower in the dawn.",
            ko: "In carnage, I bloom, like a flower in the dawn.",
            zh: "In carnage, I bloom, like a flower in the dawn."
        },
        choices: {
            ja: ["ジン", "ケイン", "ゼド", "タロン"],
            en: ["Jhin", "Kayn", "Zed", "Talon"],
            ko: ["진", "케인", "제드", "탈론"],
            zh: ["烬", "凯隐", "劫", "泰隆"]
        },
        answer: 0
    },
    {
        id: 148,
        quotes: {
            ja: "Rules are made to be broken... like buildings! Or people!",
            en: "Rules are made to be broken... like buildings! Or people!",
            ko: "Rules are made to be broken... like buildings! Or people!",
            zh: "Rules are made to be broken... like buildings! Or people!"
        },
        choices: {
            ja: ["ジンクス", "ヴァイ", "ケイトリン", "クレッド"],
            en: ["Jinx", "Vi", "Caitlyn", "Kled"],
            ko: ["징크스", "바이", "케이틀린", "클레드"],
            zh: ["金克丝", "蔚", "凯特琳", "克烈"]
        },
        answer: 0
    },
    {
        id: 149,
        quotes: {
            ja: "None may challenge Kalista and live!",
            en: "None may challenge Kalista and live!",
            ko: "None may challenge Kalista and live!",
            zh: "None may challenge Kalista and live!"
        },
        choices: {
            ja: ["カリスタ", "カミール", "フィオラ", "イレリア"],
            en: ["Kalista", "Camille", "Fiora", "Irelia"],
            ko: ["칼리스타", "카밀", "피오라", "이렐리아"],
            zh: ["卡莉丝塔", "卡蜜尔", "菲奥娜", "艾瑞莉娅"]
        },
        answer: 0
    },
    {
        id: 150,
        quotes: {
            ja: "Obey.",
            en: "Obey.",
            ko: "Obey.",
            zh: "Obey."
        },
        choices: {
            ja: ["ケイン", "ゼド", "タロン", "カタリナ"],
            en: ["Kayn", "Zed", "Talon", "Katarina"],
            ko: ["케인", "제드", "탈론", "카타리나"],
            zh: ["凯隐", "劫", "泰隆", "卡特琳娜"]
        },
        answer: 0
    },
    {
        id: 151,
        quotes: {
            ja: "Death is certain.",
            en: "Death is certain.",
            ko: "Death is certain.",
            zh: "Death is certain."
        },
        choices: {
            ja: ["カーサス", "ヴィエゴ", "モルデカイザー", "ヨリック"],
            en: ["Karthus", "Viego", "Mordekaiser", "Yorick"],
            ko: ["카서스", "비에고", "모데카이저", "요릭"],
            zh: ["卡尔萨斯", "佛耶戈", "莫德凯撒", "约里克"]
        },
        answer: 0
    },
    {
        id: 152,
        quotes: {
            ja: "Balance in all things.",
            en: "Balance in all things.",
            ko: "Balance in all things.",
            zh: "Balance in all things."
        },
        choices: {
            ja: ["カサディン", "ライズ", "マルザハール", "ゼラス"],
            en: ["Kassadin", "Ryze", "Malzahar", "Xerath"],
            ko: ["카사딘", "라이즈", "말자하", "제라스"],
            zh: ["卡萨丁", "瑞兹", "玛尔扎哈", "泽拉斯"]
        },
        answer: 0
    },
    {
        id: 153,
        quotes: {
            ja: "Violence solves everything!",
            en: "Violence solves everything!",
            ko: "Violence solves everything!",
            zh: "Violence solves everything!"
        },
        choices: {
            ja: ["カタリナ", "タロン", "ケイン", "ゼド"],
            en: ["Katarina", "Talon", "Kayn", "Zed"],
            ko: ["카타리나", "탈론", "케인", "제드"],
            zh: ["卡特琳娜", "泰隆", "凯隐", "劫"]
        },
        answer: 0
    },
    {
        id: 154,
        quotes: {
            ja: "Justice takes wing.",
            en: "Justice takes wing.",
            ko: "Justice takes wing.",
            zh: "Justice takes wing."
        },
        choices: {
            ja: ["ケイル", "モルガナ", "アニビア", "クイン"],
            en: ["Kayle", "Morgana", "Anivia", "Quinn"],
            ko: ["케일", "모르가나", "애니비아", "퀸"],
            zh: ["凯尔", "莫甘娜", "艾尼维亚", "奎因"]
        },
        answer: 0
    },
    {
        id: 155,
        quotes: {
            ja: "The lamb and the wolf.",
            en: "The lamb and the wolf.",
            ko: "The lamb and the wolf.",
            zh: "The lamb and the wolf."
        },
        choices: {
            ja: ["キンドレッド", "ワーウィック", "ヴォリベア", "レンガー"],
            en: ["Kindred", "Warwick", "Volibear", "Rengar"],
            ko: ["킨드레드", "워윅", "볼리베어", "렝가"],
            zh: ["千珏", "沃里克", "沃利贝尔", "雷恩加尔"]
        },
        answer: 0
    },
    {
        id: 156,
        quotes: {
            ja: "I miss my buddies!",
            en: "I miss my buddies!",
            ko: "I miss my buddies!",
            zh: "I miss my buddies!"
        },
        choices: {
            ja: ["クレッド", "ナー", "ランブル", "ハイマーディンガー"],
            en: ["Kled", "Gnar", "Rumble", "Heimerdinger"],
            ko: ["클레드", "나르", "럼블", "하이머딩거"],
            zh: ["克烈", "纳尔", "兰博", "黑默丁格"]
        },
        answer: 0
    },
    {
        id: 157,
        quotes: {
            ja: "Terror coming... Daddy coming!",
            en: "Terror coming... Daddy coming!",
            ko: "Terror coming... Daddy coming!",
            zh: "Terror coming... Daddy coming!"
        },
        choices: {
            ja: ["コグ＝マウ", "チョ＝ガス", "カ＝ジックス", "レク＝サイ"],
            en: ["Kog'Maw", "Cho'Gath", "Kha'Zix", "Rek'Sai"],
            ko: ["코그모", "초가스", "카직스", "렉사이"],
            zh: ["克格莫", "科加斯", "卡兹克", "雷克塞"]
        },
        answer: 0
    },
    {
        id: 158,
        quotes: {
            ja: "I am the thing under the bed.",
            en: "I am the thing under the bed.",
            ko: "I am the thing under the bed.",
            zh: "I am the thing under the bed."
        },
        choices: {
            ja: ["フィドルスティックス", "ノクターン", "イブリン", "シャコ"],
            en: ["Fiddlesticks", "Nocturne", "Evelynn", "Shaco"],
            ko: ["피들스틱", "녹턴", "이블린", "샤코"],
            zh: ["费德提克", "魔腾", "伊芙琳", "萨科"]
        },
        answer: 0
    },
    {
        id: 159,
        quotes: {
            ja: "Deceive. Destroy. Dominate.",
            en: "Deceive. Destroy. Dominate.",
            ko: "Deceive. Destroy. Dominate.",
            zh: "Deceive. Destroy. Dominate."
        },
        choices: {
            ja: ["ルブラン", "シンドラ", "カシオペア", "エリス"],
            en: ["LeBlanc", "Syndra", "Cassiopeia", "Elise"],
            ko: ["르블랑", "신드라", "카시오페아", "엘리스"],
            zh: ["乐芙兰", "辛德拉", "卡西奥佩娅", "伊莉丝"]
        },
        answer: 0
    },
    {
        id: 160,
        quotes: {
            ja: "OK.",
            en: "OK.",
            ko: "OK.",
            zh: "OK."
        },
        choices: {
            ja: ["ラムス", "マルファイト", "ナサス", "スカーナー"],
            en: ["Rammus", "Malphite", "Nasus", "Skarner"],
            ko: ["람머스", "말파이트", "나서스", "스카너"],
            zh: ["拉莫斯", "墨菲特", "内瑟斯", "斯卡纳"]
        },
        answer: 0
    },
    {
        id: 161,
        quotes: {
            ja: "Tonight we hunt!",
            en: "Tonight we hunt!",
            ko: "Tonight we hunt!",
            zh: "Tonight we hunt!"
        },
        choices: {
            ja: ["レンガー", "カ＝ジックス", "ニダリー", "ウディア"],
            en: ["Rengar", "Kha'Zix", "Nidalee", "Udyr"],
            ko: ["렝가", "카직스", "니달리", "우디르"],
            zh: ["雷恩加尔", "卡兹克", "奈德丽", "乌迪尔"]
        },
        answer: 0
    },
    {
        id: 162,
        quotes: {
            ja: "What is broken can be reforged!",
            en: "What is broken can be reforged!",
            ko: "What is broken can be reforged!",
            zh: "What is broken can be reforged!"
        },
        choices: {
            ja: ["リヴェン", "ヤスオ", "ヨネ", "イレリア"],
            en: ["Riven", "Yasuo", "Yone", "Irelia"],
            ko: ["리븐", "야스오", "요네", "이렐리아"],
            zh: ["锐雯", "亚索", "永恩", "艾瑞莉娅"]
        },
        answer: 0
    },
    {
        id: 163,
        quotes: {
            ja: "Let's get dirty!",
            en: "Let's get dirty!",
            ko: "Let's get dirty!",
            zh: "Let's get dirty!"
        },
        choices: {
            ja: ["ランブル", "ジグス", "コーキ", "ハイマーディンガー"],
            en: ["Rumble", "Ziggs", "Corki", "Heimerdinger"],
            ko: ["럼블", "직스", "코르키", "하이머딩거"],
            zh: ["兰博", "吉格斯", "库奇", "黑默丁格"]
        },
        answer: 0
    },
    {
        id: 164,
        quotes: {
            ja: "Let's go, let's go!",
            en: "Let's go, let's go!",
            ko: "Let's go, let's go!",
            zh: "Let's go, let's go!"
        },
        choices: {
            ja: ["サミーラ", "ジンクス", "ケイトリン", "ミス・フォーチュン"],
            en: ["Samira", "Jinx", "Caitlyn", "Miss Fortune"],
            ko: ["사미라", "징크스", "케이틀린", "미스 포츈"],
            zh: ["莎弥拉", "金克丝", "凯特琳", "厄运小姐"]
        },
        answer: 0
    },
    {
        id: 165,
        quotes: {
            ja: "We ride to battle!",
            en: "We ride to battle!",
            ko: "We ride to battle!",
            zh: "We ride to battle!"
        },
        choices: {
            ja: ["セジュアニ", "アッシュ", "リサンドラ", "トリンダメア"],
            en: ["Sejuani", "Ashe", "Lissandra", "Tryndamere"],
            ko: ["세주아니", "애쉬", "리산드라", "트린다미어"],
            zh: ["瑟庄妮", "艾希", "丽桑卓", "泰达米尔"]
        },
        answer: 0
    },
    {
        id: 166,
        quotes: {
            ja: "Never speak of defeat.",
            en: "Never speak of defeat.",
            ko: "Never speak of defeat.",
            zh: "Never speak of defeat."
        },
        choices: {
            ja: ["セナ", "ルシアン", "ソラカ", "カルマ"],
            en: ["Senna", "Lucian", "Soraka", "Karma"],
            ko: ["세나", "루시안", "소라카", "카르마"],
            zh: ["赛娜", "卢锡安", "索拉卡", "卡尔玛"]
        },
        answer: 0
    },
    {
        id: 167,
        quotes: {
            ja: "I'll be here all week. Probably.",
            en: "I'll be here all week. Probably.",
            ko: "I'll be here all week. Probably.",
            zh: "I'll be here all week. Probably."
        },
        choices: {
            ja: ["セラフィーン", "ソナ", "ルル", "ジャンナ"],
            en: ["Seraphine", "Sona", "Lulu", "Janna"],
            ko: ["세라핀", "소나", "룰루", "잔나"],
            zh: ["萨勒芬妮", "娑娜", "璐璐", "迦娜"]
        },
        answer: 0
    },
    {
        id: 168,
        quotes: {
            ja: "The boss is here.",
            en: "The boss is here.",
            ko: "The boss is here.",
            zh: "The boss is here."
        },
        choices: {
            ja: ["セト", "ダリウス", "ガレン", "ドレイヴン"],
            en: ["Sett", "Darius", "Garen", "Draven"],
            ko: ["세트", "다리우스", "가렌", "드레이븐"],
            zh: ["瑟提", "德莱厄斯", "盖伦", "德莱文"]
        },
        answer: 0
    },
    {
        id: 169,
        quotes: {
            ja: "Why so serious?",
            en: "Why so serious?",
            ko: "Why so serious?",
            zh: "Why so serious?"
        },
        choices: {
            ja: ["シャコ", "ジンクス", "ジグス", "フィドルスティックス"],
            en: ["Shaco", "Jinx", "Ziggs", "Fiddlesticks"],
            ko: ["샤코", "징크스", "직스", "피들스틱"],
            zh: ["萨科", "金克丝", "吉格斯", "费德提克"]
        },
        answer: 0
    },
    {
        id: 170,
        quotes: {
            ja: "A demonstration of superior judgment.",
            en: "A demonstration of superior judgment.",
            ko: "A demonstration of superior judgment.",
            zh: "A demonstration of superior judgment."
        },
        choices: {
            ja: ["シェン", "ゼド", "ケネン", "アカリ"],
            en: ["Shen", "Zed", "Kennen", "Akali"],
            ko: ["쉔", "제드", "케넨", "아칼리"],
            zh: ["慎", "劫", "凯南", "阿卡丽"]
        },
        answer: 0
    },
    {
        id: 171,
        quotes: {
            ja: "Only you can hear me, summoner.",
            en: "Only you can hear me, summoner.",
            ko: "Only you can hear me, summoner.",
            zh: "Only you can hear me, summoner."
        },
        choices: {
            ja: ["ソナ", "セラフィーン", "ルル", "ジャンナ"],
            en: ["Sona", "Seraphine", "Lulu", "Janna"],
            ko: ["소나", "세라핀", "룰루", "잔나"],
            zh: ["娑娜", "萨勒芬妮", "璐璐", "迦娜"]
        },
        answer: 0
    },
    {
        id: 172,
        quotes: {
            ja: "Wishes are for fools.",
            en: "Wishes are for fools.",
            ko: "Wishes are for fools.",
            zh: "Wishes are for fools!"
        },
        choices: {
            ja: ["ソラカ", "ジャンナ", "ナミ", "カルマ"],
            en: ["Soraka", "Janna", "Nami", "Karma"],
            ko: ["소라카", "잔나", "나미", "카르마"],
            zh: ["索拉卡", "迦娜", "娜美", "卡尔玛"]
        },
        answer: 0
    },
    {
        id: 173,
        quotes: {
            ja: "Knowledge through... disintegration!",
            en: "Knowledge through... disintegration!",
            ko: "Knowledge through... disintegration!",
            zh: "Knowledge through... disintegration!"
        },
        choices: {
            ja: ["スウェイン", "ライズ", "ブラッドミア", "マルザハール"],
            en: ["Swain", "Ryze", "Vladimir", "Malzahar"],
            ko: ["스웨인", "라이즈", "블라디미르", "말자하"],
            zh: ["斯维因", "瑞兹", "弗拉基米尔", "玛尔扎哈"]
        },
        answer: 0
    },
    {
        id: 174,
        quotes: {
            ja: "Revolution is such a simple thing.",
            en: "Revolution is such a simple thing.",
            ko: "Revolution is such a simple thing.",
            zh: "Revolution is such a simple thing."
        },
        choices: {
            ja: ["サイラス", "スウェイン", "ヴィエゴ", "ゼド"],
            en: ["Sylas", "Swain", "Viego", "Zed"],
            ko: ["사일러스", "스웨인", "비에고", "제드"],
            zh: ["塞拉斯", "斯维因", "佛耶戈", "劫"]
        },
        answer: 0
    },
    {
        id: 175,
        quotes: {
            ja: "I am not naive!",
            en: "I am not naive!",
            ko: "I am not naive!",
            zh: "I am not naive!"
        },
        choices: {
            ja: ["シンドラ", "ルブラン", "リサンドラ", "アニビア"],
            en: ["Syndra", "LeBlanc", "Lissandra", "Anivia"],
            ko: ["신드라", "르블랑", "리산드라", "애니비아"],
            zh: ["辛德拉", "乐芙兰", "丽桑卓", "艾尼维亚"]
        },
        answer: 0
    },
    {
        id: 176,
        quotes: {
            ja: "Call me king. Call me demon. Water forgets the names of the drowned.",
            en: "Call me king. Call me demon. Water forgets the names of the drowned.",
            ko: "Call me king. Call me demon. Water forgets the names of the drowned.",
            zh: "Call me king. Call me demon. Water forgets the names of the drowned."
        },
        choices: {
            ja: ["パイク", "ノーチラス", "ガングプランク", "グレイブス"],
            en: ["Pyke", "Nautilus", "Gangplank", "Graves"],
            ko: ["파이크", "노틸러스", "갱플랭크", "그레이브즈"],
            zh: ["派克", "诺提勒斯", "普朗克", "格雷福斯"]
        },
        answer: 0
    },
    {
        id: 177,
        quotes: {
            ja: "Wealth is my kind of burden.",
            en: "Wealth is my kind of burden.",
            ko: "Wealth is my kind of burden.",
            zh: "Wealth is my kind of burden."
        },
        choices: {
            ja: ["シヴィア", "ケイトリン", "ミス・フォーチュン", "サミーラ"],
            en: ["Sivir", "Caitlyn", "Miss Fortune", "Samira"],
            ko: ["시비르", "케이틀린", "미스 포츈", "사미라"],
            zh: ["希维尔", "凯特琳", "厄运小姐", "莎弥拉"]
        },
        answer: 0
    },
    {
        id: 178,
        quotes: {
            ja: "Never underestimate the power of the Scout's code.",
            en: "Never underestimate the power of the Scout's code.",
            ko: "Never underestimate the power of the Scout's code.",
            zh: "Never underestimate the power of the Scout's code."
        },
        choices: {
            ja: ["ティーモ", "トリスターナ", "コーキ", "ポッピー"],
            en: ["Teemo", "Tristana", "Corki", "Poppy"],
            ko: ["티모", "트리스타나", "코르키", "뽀삐"],
            zh: ["提莫", "崔丝塔娜", "库奇", "波比"]
        },
        answer: 0
    },
    {
        id: 179,
        quotes: {
            ja: "What delightful agony we shall inflict.",
            en: "What delightful agony we shall inflict.",
            ko: "What delightful agony we shall inflict.",
            zh: "What delightful agony we shall inflict."
        },
        choices: {
            ja: ["スレッシュ", "パイク", "ノーチラス", "ヴィエゴ"],
            en: ["Thresh", "Pyke", "Nautilus", "Viego"],
            ko: ["쓰레쉬", "파이크", "노틸러스", "비에고"],
            zh: ["锤石", "派克", "诺提勒斯", "佛耶戈"]
        },
        answer: 0
    },
    {
        id: 180,
        quotes: {
            ja: "Fortune doesn't favor fools.",
            en: "Fortune doesn't favor fools.",
            ko: "Fortune doesn't favor fools.",
            zh: "Fortune doesn't favor fools."
        },
        choices: {
            ja: ["ツイステッド・フェイト", "グレイブス", "ガングプランク", "ジン"],
            en: ["Twisted Fate", "Graves", "Gangplank", "Jhin"],
            ko: ["트위스티드 페이트", "그레이브즈", "갱플랭크", "진"],
            zh: ["崔斯特", "格雷福斯", "普朗克", "烬"]
        },
        answer: 0
    },
    {
        id: 181,
        quotes: {
            ja: "It's me! Hi! I've been the problem, it's me!",
            en: "It's me! Hi! I've been the problem, it's me!",
            ko: "It's me! Hi! I've been the problem, it's me!",
            zh: "It's me! Hi! I've been the problem, it's me!"
        },
        choices: {
            ja: ["トゥイッチ", "ティーモ", "シャコ", "ジグス"],
            en: ["Twitch", "Teemo", "Shaco", "Ziggs"],
            ko: ["트위치", "티모", "샤코", "직스"],
            zh: ["图奇", "提莫", "萨科", "吉格斯"]
        },
        answer: 0
    },
    {
        id: 182,
        quotes: {
            ja: "Our rage is beyond your control!",
            en: "Our rage is beyond your control!",
            ko: "Our rage is beyond your control!",
            zh: "Our rage is beyond your control!"
        },
        choices: {
            ja: ["ウディア", "レンガー", "ニダリー", "ウーコン"],
            en: ["Udyr", "Rengar", "Nidalee", "Wukong"],
            ko: ["우디르", "렝가", "니달리", "오공"],
            zh: ["乌迪尔", "雷恩加尔", "奈德丽", "悟空"]
        },
        answer: 0
    },
    {
        id: 183,
        quotes: {
            ja: "Eternal life... endless torture.",
            en: "Eternal life... endless torture.",
            ko: "Eternal life... endless torture.",
            zh: "Eternal life... endless torture."
        },
        choices: {
            ja: ["アーゴット", "サイオン", "モルデカイザー", "ヴィエゴ"],
            en: ["Urgot", "Sion", "Mordekaiser", "Viego"],
            ko: ["우르곳", "사이온", "모데카이저", "비에고"],
            zh: ["厄加特", "赛恩", "莫德凯撒", "佛耶戈"]
        },
        answer: 0
    },
    {
        id: 184,
        quotes: {
            ja: "We are as one.",
            en: "We are as one.",
            ko: "We are as one.",
            zh: "We are as one."
        },
        choices: {
            ja: ["ヴァルス", "エイトロックス", "ケイン", "カーサス"],
            en: ["Varus", "Aatrox", "Kayn", "Karthus"],
            ko: ["바루스", "아트록스", "케인", "카서스"],
            zh: ["韦鲁斯", "亚托克斯", "凯隐", "卡尔萨斯"]
        },
        answer: 0
    },
    {
        id: 185,
        quotes: {
            ja: "Let us hunt those who have fallen to darkness.",
            en: "Let us hunt those who have fallen to darkness.",
            ko: "Let us hunt those who have fallen to darkness.",
            zh: "Let us hunt those who have fallen to darkness."
        },
        choices: {
            ja: ["ヴェイン", "ルシアン", "ケイトリン", "アッシュ"],
            en: ["Vayne", "Lucian", "Caitlyn", "Ashe"],
            ko: ["베인", "루시안", "케이틀린", "애쉬"],
            zh: ["薇恩", "卢锡安", "凯特琳", "艾希"]
        },
        answer: 0
    },
    {
        id: 186,
        quotes: {
            ja: "Know that if the tables were turned, I would show you no mercy!",
            en: "Know that if the tables were turned, I would show you no mercy!",
            ko: "Know that if the tables were turned, I would show you no mercy!",
            zh: "Know that if the tables were turned, I would show you no mercy!"
        },
        choices: {
            ja: ["ベイガー", "ライズ", "ジリアン", "ベル＝ヴェス"],
            en: ["Veigar", "Ryze", "Zilean", "Bel'Veth"],
            ko: ["베이가", "라이즈", "질리언", "벨베스"],
            zh: ["维迦", "瑞兹", "基兰", "贝蕾娅"]
        },
        answer: 0
    },
    {
        id: 187,
        quotes: {
            ja: "I have seen your death, and it was painful.",
            en: "I have seen your death, and it was painful.",
            ko: "I have seen your death, and it was painful.",
            zh: "I have seen your death, and it was painful."
        },
        choices: {
            ja: ["ヴェル＝コズ", "ゼラス", "マルザハール", "ベル＝ヴェス"],
            en: ["Vel'Koz", "Xerath", "Malzahar", "Bel'Veth"],
            ko: ["벨코즈", "제라스", "말자하", "벨베스"],
            zh: ["维克兹", "泽拉斯", "玛尔扎哈", "贝蕾娅"]
        },
        answer: 0
    },
    {
        id: 188,
        quotes: {
            ja: "I'm in a really dark place right now.",
            en: "I'm in a really dark place right now.",
            ko: "I'm in a really dark place right now.",
            zh: "I'm in a really dark place right now."
        },
        choices: {
            ja: ["ヴェックス", "ゾーイ", "アニー", "ルル"],
            en: ["Vex", "Zoe", "Annie", "Lulu"],
            ko: ["벡스", "조이", "애니", "룰루"],
            zh: ["薇古丝", "佐伊", "安妮", "璐璐"]
        },
        answer: 0
    },
    {
        id: 189,
        quotes: {
            ja: "Punch first. Ask questions while punching.",
            en: "Punch first. Ask questions while punching.",
            ko: "Punch first. Ask questions while punching.",
            zh: "Punch first. Ask questions while punching."
        },
        choices: {
            ja: ["ヴァイ", "ジンクス", "セト", "イラオイ"],
            en: ["Vi", "Jinx", "Sett", "Illaoi"],
            ko: ["바이", "징크스", "세트", "일라오이"],
            zh: ["蔚", "金克丝", "瑟提", "俄洛伊"]
        },
        answer: 0
    },
    {
        id: 190,
        quotes: {
            ja: "I am not Ruined. I am king.",
            en: "I am not Ruined. I am king.",
            ko: "I am not Ruined. I am king.",
            zh: "I am not Ruined. I am king."
        },
        choices: {
            ja: ["ヴィエゴ", "モルデカイザー", "サイオン", "サイラス"],
            en: ["Viego", "Mordekaiser", "Sion", "Sylas"],
            ko: ["비에고", "모데카이저", "사이온", "사일러스"],
            zh: ["佛耶戈", "莫德凯撒", "赛恩", "塞拉斯"]
        },
        answer: 0
    },
    {
        id: 191,
        quotes: {
            ja: "Join the glorious evolution.",
            en: "Join the glorious evolution.",
            ko: "Join the glorious evolution.",
            zh: "Join the glorious evolution."
        },
        choices: {
            ja: ["ビクター", "ジェイス", "ハイマーディンガー", "ブリッツクランク"],
            en: ["Viktor", "Jayce", "Heimerdinger", "Blitzcrank"],
            ko: ["빅토르", "제이스", "하이머딩거", "블리츠크랭크"],
            zh: ["维克托", "杰斯", "黑默丁格", "布里茨"]
        },
        answer: 0
    },
    {
        id: 192,
        quotes: {
            ja: "The rivers will run red.",
            en: "The rivers will run red.",
            ko: "The rivers will run red.",
            zh: "The rivers will run red."
        },
        choices: {
            ja: ["ブラッドミア", "スウェイン", "ダリウス", "ドレイヴン"],
            en: ["Vladimir", "Swain", "Darius", "Draven"],
            ko: ["블라디미르", "스웨인", "다리우스", "드레이븐"],
            zh: ["弗拉基米尔", "斯维因", "德莱厄斯", "德莱文"]
        },
        answer: 0
    },
    {
        id: 193,
        quotes: {
            ja: "The cycle of life and death continues. We will live, they will die.",
            en: "The cycle of life and death continues. We will live, they will die.",
            ko: "The cycle of life and death continues. We will live, they will die.",
            zh: "The cycle of life and death continues. We will live, they will die."
        },
        choices: {
            ja: ["ナサス", "レネクトン", "アジール", "ゼラス"],
            en: ["Nasus", "Renekton", "Azir", "Xerath"],
            ko: ["나서스", "레넥톤", "아지르", "제라스"],
            zh: ["内瑟斯", "鳄鱼", "阿兹尔", "泽拉斯"]
        },
        answer: 0
    },
    {
        id: 194,
        quotes: {
            ja: "I long for a worthy opponent.",
            en: "I long for a worthy opponent.",
            ko: "I long for a worthy opponent.",
            zh: "I long for a worthy opponent."
        },
        choices: {
            ja: ["フィオラ", "イレリア", "カミール", "リヴェン"],
            en: ["Fiora", "Irelia", "Camille", "Riven"],
            ko: ["피오라", "이렐리아", "카밀", "리븐"],
            zh: ["菲奥娜", "艾瑞莉娅", "卡蜜尔", "锐雯"]
        },
        answer: 0
    },
    {
        id: 195,
        quotes: {
            ja: "Behold the might of the shadow isles!",
            en: "Behold the might of the shadow isles!",
            ko: "Behold the might of the shadow isles!",
            zh: "Behold the might of the shadow isles!"
        },
        choices: {
            ja: ["ヘカリム", "ヴィエゴ", "スレッシュ", "ヨリック"],
            en: ["Hecarim", "Viego", "Thresh", "Yorick"],
            ko: ["헤카림", "비에고", "쓰레쉬", "요릭"],
            zh: ["赫卡里姆", "佛耶戈", "锤石", "约里克"]
        },
        answer: 0
    },
    {
        id: 196,
        quotes: {
            ja: "I put the go in golem. That was humor. Other golems find that to be appropriately funny.",
            en: "I put the go in golem. That was humor. Other golems find that to be appropriately funny.",
            ko: "I put the go in golem. That was humor. Other golems find that to be appropriately funny.",
            zh: "I put the go in golem. That was humor. Other golems find that to be appropriately funny."
        },
        choices: {
            ja: ["マルファイト", "ガリオ", "ラムス", "オーン"],
            en: ["Malphite", "Galio", "Rammus", "Ornn"],
            ko: ["말파이트", "갈리오", "람머스", "오른"],
            zh: ["墨菲特", "加里奥", "拉莫斯", "奥恩"]
        },
        answer: 0
    },
    {
        id: 197,
        quotes: {
            ja: "The darkness within... will consume you!",
            en: "The darkness within... will consume you!",
            ko: "The darkness within... will consume you!",
            zh: "The darkness within... will consume you!"
        },
        choices: {
            ja: ["ノクターン", "フィドルスティックス", "イブリン", "シャコ"],
            en: ["Nocturne", "Fiddlesticks", "Evelynn", "Shaco"],
            ko: ["녹턴", "피들스틱", "이블린", "샤코"],
            zh: ["魔腾", "费德提克", "伊芙琳", "萨科"]
        },
        answer: 0
    },
    {
        id: 198,
        quotes: {
            ja: "Your will, my hands.",
            en: "Your will, my hands.",
            ko: "Your will, my hands.",
            zh: "Your will, my hands."
        },
        choices: {
            ja: ["リー・シン", "ウディア", "ケネン", "アカリ"],
            en: ["Lee Sin", "Udyr", "Kennen", "Akali"],
            ko: ["리 신", "우디르", "케넨", "아칼리"],
            zh: ["李青", "乌迪尔", "凯南", "阿卡丽"]
        },
        answer: 0
    },
    {
        id: 199,
        quotes: {
            ja: "My profession? You know, now that I think of it, I've always wanted to be a baker.",
            en: "My profession? You know, now that I think of it, I've always wanted to be a baker.",
            ko: "My profession? You know, now that I think of it, I've always wanted to be a baker.",
            zh: "My profession? You know, now that I think of it, I've always wanted to be a baker."
        },
        choices: {
            ja: ["パンテオン", "エイトロックス", "ガレン", "ジャーヴァンⅣ"],
            en: ["Pantheon", "Aatrox", "Garen", "Jarvan IV"],
            ko: ["판테온", "아트록스", "가렌", "자르반 4세"],
            zh: ["潘森", "亚托克斯", "盖伦", "嘉文四世"]
        },
        answer: 0
    },
    {
        id: 200,
        quotes: {
            ja: "My right arm is a lot stronger than my left arm!",
            en: "My right arm is a lot stronger than my left arm!",
            ko: "My right arm is a lot stronger than my left arm!",
            zh: "My right arm is a lot stronger than my left arm!"
        },
        choices: {
            ja: ["トランドル", "オラフ", "ウディア", "ヴォリベア"],
            en: ["Trundle", "Olaf", "Udyr", "Volibear"],
            ko: ["트런들", "올라프", "우디르", "볼리베어"],
            zh: ["特朗德尔", "奥拉夫", "乌迪尔", "沃利贝尔"]
        },
        answer: 0
    },
    {
        id: 201,
        quotes: {
            ja: "My blade is yours.",
            en: "My blade is yours.",
            ko: "My blade is yours.",
            zh: "My blade is yours."
        },
        choices: {
            ja: ["タロン", "ゼド", "ケイン", "カタリナ"],
            en: ["Talon", "Zed", "Kayn", "Katarina"],
            ko: ["탈론", "제드", "케인", "카타리나"],
            zh: ["泰隆", "劫", "凯隐", "卡特琳娜"]
        },
        answer: 0
    },
    {
        id: 202,
        quotes: {
            ja: "Size doesn't mean everything.",
            en: "Size doesn't mean everything.",
            ko: "Size doesn't mean everything.",
            zh: "Size doesn't mean everything."
        },
        choices: {
            ja: ["ルル", "ポッピー", "トリスターナ", "ティーモ"],
            en: ["Lulu", "Poppy", "Tristana", "Teemo"],
            ko: ["룰루", "뽀삐", "트리스타나", "티모"],
            zh: ["璐璐", "波比", "崔丝塔娜", "提莫"]
        },
        answer: 1
    },
    {
        id: 203,
        quotes: {
            ja: "My destiny? What a joke.",
            en: "My destiny? What a joke.",
            ko: "My destiny? What a joke.",
            zh: "My destiny? What a joke."
        },
        choices: {
            ja: ["キヤナ", "タリヤ", "ニーコ", "ザヤ"],
            en: ["Qiyana", "Taliyah", "Neeko", "Xayah"],
            ko: ["키아나", "탈리야", "니코", "자야"],
            zh: ["奇亚娜", "塔莉垭", "妮蔻", "霞"]
        },
        answer: 0
    },
    {
        id: 204,
        quotes: {
            ja: "Valor, to me!",
            en: "Valor, to me!",
            ko: "Valor, to me!",
            zh: "Valor, to me!"
        },
        choices: {
            ja: ["クイン", "アッシュ", "ケイトリン", "ヴェイン"],
            en: ["Quinn", "Ashe", "Caitlyn", "Vayne"],
            ko: ["퀸", "애쉬", "케이틀린", "베인"],
            zh: ["奎因", "艾希", "凯特琳", "薇恩"]
        },
        answer: 0
    },
    {
        id: 205,
        quotes: {
            ja: "Battle is my symphony, and carnage is my song.",
            en: "Battle is my symphony, and carnage is my song.",
            ko: "Battle is my symphony, and carnage is my song.",
            zh: "Battle is my symphony, and carnage is my song."
        },
        choices: {
            ja: ["ラカン", "ザヤ", "アーリ", "イレリア"],
            en: ["Rakan", "Xayah", "Ahri", "Irelia"],
            ko: ["라칸", "자야", "아리", "이렐리아"],
            zh: ["洛", "霞", "阿狸", "艾瑞莉娅"]
        },
        answer: 0
    },
    {
        id: 206,
        quotes: {
            ja: "Death is like the wind... always by my side.",
            en: "Death is like the wind... always by my side.",
            ko: "Death is like the wind... always by my side.",
            zh: "Death is like the wind... always by my side."
        },
        choices: {
            ja: ["ヤスオ", "ヨネ", "イレリア", "タロン"],
            en: ["Yasuo", "Yone", "Irelia", "Talon"],
            ko: ["야스오", "요네", "이렐리아", "탈론"],
            zh: ["亚索", "永恩", "艾瑞莉娅", "泰隆"]
        },
        answer: 0
    },
    {
        id: 207,
        quotes: {
            ja: "I will not die dishonored.",
            en: "I will not die dishonored.",
            ko: "I will not die dishonored.",
            zh: "I will not die dishonored."
        },
        choices: {
            ja: ["ヨネ", "ヤスオ", "シェン", "ゼド"],
            en: ["Yone", "Yasuo", "Shen", "Zed"],
            ko: ["요네", "야스오", "쉔", "제드"],
            zh: ["永恩", "亚索", "慎", "劫"]
        },
        answer: 0
    },
    {
        id: 208,
        quotes: {
            ja: "The living will fall.",
            en: "The living will fall.",
            ko: "The living will fall.",
            zh: "The living will fall."
        },
        choices: {
            ja: ["ヨリック", "ヴィエゴ", "スレッシュ", "ヘカリム"],
            en: ["Yorick", "Viego", "Thresh", "Hecarim"],
            ko: ["요릭", "비에고", "쓰레쉬", "헤카림"],
            zh: ["约里克", "佛耶戈", "锤石", "赫卡里姆"]
        },
        answer: 0
    },
    {
        id: 209,
        quotes: {
            ja: "Book? I am your library!",
            en: "Book? I am your library!",
            ko: "Book? I am your library!",
            zh: "Book? I am your library!"
        },
        choices: {
            ja: ["ユーミ", "ルル", "ゾーイ", "ニーコ"],
            en: ["Yuumi", "Lulu", "Zoe", "Neeko"],
            ko: ["유미", "룰루", "조이", "니코"],
            zh: ["悠米", "璐璐", "佐伊", "妮蔻"]
        },
        answer: 0
    },
    {
        id: 210,
        quotes: {
            ja: "Let's bounce!",
            en: "Let's bounce!",
            ko: "Let's bounce!",
            zh: "Let's bounce!"
        },
        choices: {
            ja: ["ザック", "ブラウム", "ガングプランク", "グラガス"],
            en: ["Zac", "Braum", "Gangplank", "Gragas"],
            ko: ["자크", "브라움", "갱플랭크", "그라가스"],
            zh: ["扎克", "布隆", "普朗克", "古拉加斯"]
        },
        answer: 0
    },
    {
        id: 211,
        quotes: {
            ja: "The unseen blade is the deadliest.",
            en: "The unseen blade is the deadliest.",
            ko: "The unseen blade is the deadliest.",
            zh: "The unseen blade is the deadliest."
        },
        choices: {
            ja: ["ゼド", "タロン", "ケイン", "アカリ"],
            en: ["Zed", "Talon", "Kayn", "Akali"],
            ko: ["제드", "탈론", "케인", "아칼리"],
            zh: ["劫", "泰隆", "凯隐", "阿卡丽"]
        },
        answer: 0
    },
    {
        id: 212,
        quotes: {
            ja: "Sparkle!",
            en: "Sparkle!",
            ko: "Sparkle!",
            zh: "Sparkle!"
        },
        choices: {
            ja: ["ゾーイ", "ルル", "アニー", "ポッピー"],
            en: ["Zoe", "Lulu", "Annie", "Poppy"],
            ko: ["조이", "룰루", "애니", "뽀삐"],
            zh: ["佐伊", "璐璐", "安妮", "波比"]
        },
        answer: 0
    },
    {
        id: 213,
        quotes: {
            ja: "Time to blossom!",
            en: "Time to blossom!",
            ko: "Time to blossom!",
            zh: "Time to blossom!"
        },
        choices: {
            ja: ["ザイラ", "ニーコ", "リリア", "アイバーン"],
            en: ["Zyra", "Neeko", "Lillia", "Ivern"],
            ko: ["자이라", "니코", "릴리아", "아이번"],
            zh: ["婕拉", "妮蔻", "莉莉娅", "艾翁"]
        },
        answer: 0
    },
    {
        id: 214,
        quotes: {
            ja: "Get jinxed!",
            en: "Get jinxed!",
            ko: "Get jinxed!",
            zh: "Get jinxed!"
        },
        choices: {
            ja: ["ジンクス", "ヴァイ", "ケイトリン", "エコー"],
            en: ["Jinx", "Vi", "Caitlyn", "Ekko"],
            ko: ["징크스", "바이", "케이틀린", "에코"],
            zh: ["金克丝", "蔚", "凯特琳", "艾克"]
        },
        answer: 0
    },
    {
        id: 215,
        quotes: {
            ja: "Watch and learn!",
            en: "Watch and learn!",
            ko: "Watch and learn!",
            zh: "Watch and learn!"
        },
        choices: {
            ja: ["アカリ", "ゼド", "ケネン", "シェン"],
            en: ["Akali", "Zed", "Kennen", "Shen"],
            ko: ["아칼리", "제드", "케넨", "쉔"],
            zh: ["阿卡丽", "劫", "凯南", "慎"]
        },
        answer: 0
    },
    {
        id: 216,
        quotes: {
            ja: "My path is clear.",
            en: "My path is clear.",
            ko: "My path is clear.",
            zh: "My path is clear."
        },
        choices: {
            ja: ["マスター・イー", "リー・シン", "ウディア", "シェン"],
            en: ["Master Yi", "Lee Sin", "Udyr", "Shen"],
            ko: ["마스터 이", "리 신", "우디르", "쉔"],
            zh: ["易", "李青", "乌迪尔", "慎"]
        },
        answer: 0
    },
    {
        id: 217,
        quotes: {
            ja: "Courage is the magic that turns dreams into reality.",
            en: "Courage is the magic that turns dreams into reality.",
            ko: "Courage is the magic that turns dreams into reality.",
            zh: "Courage is the magic that turns dreams into reality."
        },
        choices: {
            ja: ["リリア", "ゾーイ", "ニーコ", "ルル"],
            en: ["Lillia", "Zoe", "Neeko", "Lulu"],
            ko: ["릴리아", "조이", "니코", "룰루"],
            zh: ["莉莉娅", "佐伊", "妮蔻", "璐璐"]
        },
        answer: 0
    },
    {
        id: 218,
        quotes: {
            ja: "Feel my sting!",
            en: "Feel my sting!",
            ko: "Feel my sting!",
            zh: "Feel my sting!"
        },
        choices: {
            ja: ["スカーナー", "レク＝サイ", "カ＝ジックス", "チョ＝ガス"],
            en: ["Skarner", "Rek'Sai", "Kha'Zix", "Cho'Gath"],
            ko: ["스카너", "렉사이", "카직스", "초가스"],
            zh: ["斯卡纳", "雷克塞", "卡兹克", "科加斯"]
        },
        answer: 0
    },
    {
        id: 219,
        quotes: {
            ja: "Pain is temporary, victory is forever.",
            en: "Pain is temporary, victory is forever.",
            ko: "Pain is temporary, victory is forever.",
            zh: "Pain is temporary, victory is forever."
        },
        choices: {
            ja: ["パンテオン", "エイトロックス", "ガレン", "ダリウス"],
            en: ["Pantheon", "Aatrox", "Garen", "Darius"],
            ko: ["판테온", "아트록스", "가렌", "다리우스"],
            zh: ["潘森", "亚托克斯", "盖伦", "德莱厄斯"]
        },
        answer: 0
    },
    {
        id: 220,
        quotes: {
            ja: "I march to my own beat.",
            en: "I march to my own beat.",
            ko: "I march to my own beat.",
            zh: "I march to my own beat."
        },
        choices: {
            ja: ["セラフィーン", "ソナ", "ジャンナ", "ナミ"],
            en: ["Seraphine", "Sona", "Janna", "Nami"],
            ko: ["세라핀", "소나", "잔나", "나미"],
            zh: ["萨勒芬妮", "娑娜", "迦娜", "娜美"]
        },
        answer: 0
    },
    {
        id: 221,
        quotes: {
            ja: "The weave takes shape!",
            en: "The weave takes shape!",
            ko: "The weave takes shape!",
            zh: "The weave takes shape!"
        },
        choices: {
            ja: ["タリヤ", "キヤナ", "ニーコ", "ザイラ"],
            en: ["Taliyah", "Qiyana", "Neeko", "Zyra"],
            ko: ["탈리야", "키아나", "니코", "자이라"],
            zh: ["塔莉垭", "奇亚娜", "妮蔻", "婕拉"]
        },
        answer: 0
    },
    {
        id: 222,
        quotes: {
            ja: "True power bites.",
            en: "True power bites.",
            ko: "True power bites.",
            zh: "True power bites."
        },
        choices: {
            ja: ["タム・ケンチ", "チョ＝ガス", "ワーウィック", "レンガー"],
            en: ["Tahm Kench", "Cho'Gath", "Warwick", "Rengar"],
            ko: ["탐 켄치", "초가스", "워윅", "렝가"],
            zh: ["塔姆", "科加斯", "沃里克", "雷恩加尔"]
        },
        answer: 0
    },
    {
        id: 223,
        quotes: {
            ja: "The rivers will remember.",
            en: "The rivers will remember.",
            ko: "The rivers will remember.",
            zh: "The rivers will remember."
        },
        choices: {
            ja: ["ナミ", "フィズ", "パイク", "イラオイ"],
            en: ["Nami", "Fizz", "Pyke", "Illaoi"],
            ko: ["나미", "피즈", "파이크", "일라오이"],
            zh: ["娜美", "菲兹", "派克", "俄洛伊"]
        },
        answer: 0
    },
    {
        id: 224,
        quotes: {
            ja: "The storm approaches!",
            en: "The storm approaches!",
            ko: "The storm approaches!",
            zh: "The storm approaches!"
        },
        choices: {
            ja: ["ジャンナ", "ナミ", "ケネン", "ヴォリベア"],
            en: ["Janna", "Nami", "Kennen", "Volibear"],
            ko: ["잔나", "나미", "케넨", "볼리베어"],
            zh: ["迦娜", "娜美", "凯南", "沃利贝尔"]
        },
        answer: 0
    },
    {
        id: 225,
        quotes: {
            ja: "I smell their fear.",
            en: "I smell their fear.",
            ko: "I smell their fear.",
            zh: "I smell their fear."
        },
        choices: {
            ja: ["ワーウィック", "レンガー", "ニダリー", "ウディア"],
            en: ["Warwick", "Rengar", "Nidalee", "Udyr"],
            ko: ["워윅", "렝가", "니달리", "우디르"],
            zh: ["沃里克", "雷恩加尔", "奈德丽", "乌迪尔"]
        },
        answer: 0
    },
    {
        id: 226,
        quotes: {
            ja: "I do not rest!",
            en: "I do not rest!",
            ko: "I do not rest!",
            zh: "I do not rest!"
        },
        choices: {
            ja: ["サイオン", "アーゴット", "モルデカイザー", "ヴィエゴ"],
            en: ["Sion", "Urgot", "Mordekaiser", "Viego"],
            ko: ["사이온", "우르곳", "모데카이저", "비에고"],
            zh: ["赛恩", "厄加特", "莫德凯撒", "佛耶戈"]
        },
        answer: 0
    },
    {
        id: 227,
        quotes: {
            ja: "My genius will be understood... eventually.",
            en: "My genius will be understood... eventually.",
            ko: "My genius will be understood... eventually.",
            zh: "My genius will be understood... eventually."
        },
        choices: {
            ja: ["ジグス", "ハイマーディンガー", "ジェイス", "ビクター"],
            en: ["Ziggs", "Heimerdinger", "Jayce", "Viktor"],
            ko: ["직스", "하이머딩거", "제이스", "빅토르"],
            zh: ["吉格斯", "黑默丁格", "杰斯", "维克托"]
        },
        answer: 0
    },
    {
        id: 228,
        quotes: {
            ja: "Change... is good.",
            en: "Change... is good.",
            ko: "Change... is good.",
            zh: "Change... is good."
        },
        choices: {
            ja: ["カ＝ジックス", "レク＝サイ", "コグ＝マウ", "チョ＝ガス"],
            en: ["Kha'Zix", "Rek'Sai", "Kog'Maw", "Cho'Gath"],
            ko: ["카직스", "렉사이", "코그모", "초가스"],
            zh: ["卡兹克", "雷克塞", "克格莫", "科加斯"]
        },
        answer: 0
    },
    {
        id: 229,
        quotes: {
            ja: "Time marches on, and I must follow.",
            en: "Time marches on, and I must follow.",
            ko: "Time marches on, and I must follow.",
            zh: "Time marches on, and I must follow."
        },
        choices: {
            ja: ["ジリアン", "エコー", "ライズ", "ベイガー"],
            en: ["Zilean", "Ekko", "Ryze", "Veigar"],
            ko: ["질리언", "에코", "라이즈", "베이가"],
            zh: ["基兰", "艾克", "瑞兹", "维迦"]
        },
        answer: 0
    },
    {
        id: 230,
        quotes: {
            ja: "The moon also rises.",
            en: "The moon also rises.",
            ko: "The moon also rises.",
            zh: "The moon also rises."
        },
        choices: {
            ja: ["ダイアナ", "レオナ", "ゾーイ", "タリック"],
            en: ["Diana", "Leona", "Zoe", "Taric"],
            ko: ["다이애나", "레오나", "조이", "타릭"],
            zh: ["黛安娜", "蕾欧娜", "佐伊", "塔里克"]
        },
        answer: 0
    },
    {
        id: 231,
        quotes: {
            ja: "Metal is perfection.",
            en: "Metal is perfection.",
            ko: "Metal is perfection.",
            zh: "Metal is perfection."
        },
        choices: {
            ja: ["モルデカイザー", "サイオン", "アーゴット", "ビクター"],
            en: ["Mordekaiser", "Sion", "Urgot", "Viktor"],
            ko: ["모데카이저", "사이온", "우르곳", "빅토르"],
            zh: ["莫德凯撒", "赛恩", "厄加特", "维克托"]
        },
        answer: 0
    },
    {
        id: 232,
        quotes: {
            ja: "So much untapped power!",
            en: "So much untapped power!",
            ko: "So much untapped power!",
            zh: "So much untapped power!"
        },
        choices: {
            ja: ["ゼラス", "アジール", "ナサス", "レネクトン"],
            en: ["Xerath", "Azir", "Nasus", "Renekton"],
            ko: ["제라스", "아지르", "나서스", "레넥톤"],
            zh: ["泽拉斯", "阿兹尔", "内瑟斯", "鳄鱼"]
        },
        answer: 0
    },
    {
        id: 233,
        quotes: {
            ja: "To the arena!",
            en: "To the arena!",
            ko: "To the arena!",
            zh: "To the arena!"
        },
        choices: {
            ja: ["シン・ジャオ", "ジャーヴァンⅣ", "ガレン", "ダリウス"],
            en: ["Xin Zhao", "Jarvan IV", "Garen", "Darius"],
            ko: ["신 짜오", "자르반 4세", "가렌", "다리우스"],
            zh: ["赵信", "嘉文四世", "盖伦", "德莱厄斯"]
        },
        answer: 0
    },
    {
        id: 234,
        quotes: {
            ja: "Feathers fly!",
            en: "Feathers fly!",
            ko: "Feathers fly!",
            zh: "Feathers fly!"
        },
        choices: {
            ja: ["ザヤ", "ラカン", "クイン", "アニビア"],
            en: ["Xayah", "Rakan", "Quinn", "Anivia"],
            ko: ["자야", "라칸", "퀸", "애니비아"],
            zh: ["霞", "洛", "奎因", "艾尼维亚"]
        },
        answer: 0
    },
    {
        id: 235,
        quotes: {
            ja: "The dawn has arrived.",
            en: "The dawn has arrived.",
            ko: "The dawn has arrived.",
            zh: "The dawn has arrived."
        },
        choices: {
            ja: ["レオナ", "ダイアナ", "タリック", "ソラカ"],
            en: ["Leona", "Diana", "Taric", "Soraka"],
            ko: ["레오나", "다이애나", "타릭", "소라카"],
            zh: ["蕾欧娜", "黛安娜", "塔里克", "索拉卡"]
        },
        answer: 0
    },
    {
        id: 236,
        quotes: {
            ja: "I decide what the tide will bring.",
            en: "I decide what the tide will bring.",
            ko: "I decide what the tide will bring.",
            zh: "I decide what the tide will bring."
        },
        choices: {
            ja: ["ナミ", "フィズ", "パイク", "イラオイ"],
            en: ["Nami", "Fizz", "Pyke", "Illaoi"],
            ko: ["나미", "피즈", "파이크", "일라오이"],
            zh: ["娜美", "菲兹", "派克", "俄洛伊"]
        },
        answer: 0
    },
    {
        id: 237,
        quotes: {
            ja: "The hunt begins!",
            en: "The hunt begins!",
            ko: "The hunt begins!",
            zh: "The hunt begins!"
        },
        choices: {
            ja: ["ニダリー", "レンガー", "ワーウィック", "カ＝ジックス"],
            en: ["Nidalee", "Rengar", "Warwick", "Kha'Zix"],
            ko: ["니달리", "렝가", "워윅", "카직스"],
            zh: ["奈德丽", "雷恩加尔", "沃里克", "卡兹克"]
        },
        answer: 0
    },
    {
        id: 238,
        quotes: {
            ja: "The water forgets the names of the drowned.",
            en: "The water forgets the names of the drowned.",
            ko: "The water forgets the names of the drowned.",
            zh: "The water forgets the names of the drowned."
        },
        choices: {
            ja: ["ニーラ", "ナミ", "パイク", "イラオイ"],
            en: ["Nilah", "Nami", "Pyke", "Illaoi"],
            ko: ["닐라", "나미", "파이크", "일라오이"],
            zh: ["尼菈", "娜美", "派克", "俄洛伊"]
        },
        answer: 0
    },
    {
        id: 239,
        quotes: {
            ja: "Come, try your luck!",
            en: "Come, try your luck!",
            ko: "Come, try your luck!",
            zh: "Come, try your luck!"
        },
        choices: {
            ja: ["ツイステッド・フェイト", "グレイブス", "ガングプランク", "ジン"],
            en: ["Twisted Fate", "Graves", "Gangplank", "Jhin"],
            ko: ["트위스티드 페이트", "그레이브즈", "갱플랭크", "진"],
            zh: ["崔斯特", "格雷福斯", "普朗克", "烬"]
        },
        answer: 0
    },
    {
        id: 240,
        quotes: {
            ja: "Witness true strength!",
            en: "Witness true strength!",
            ko: "Witness true strength!",
            zh: "Witness true strength!"
        },
        choices: {
            ja: ["トリンダメア", "オラフ", "ダリウス", "ガレン"],
            en: ["Tryndamere", "Olaf", "Darius", "Garen"],
            ko: ["트린다미어", "올라프", "다리우스", "가렌"],
            zh: ["泰达米尔", "奥拉夫", "德莱厄斯", "盖伦"]
        },
        answer: 0
    },
    {
        id: 241,
        quotes: {
            ja: "Gems are truly outrageous.",
            en: "Gems are truly outrageous.",
            ko: "Gems are truly outrageous.",
            zh: "Gems are truly outrageous."
        },
        choices: {
            ja: ["タリック", "レオナ", "ブラウム", "ソラカ"],
            en: ["Taric", "Leona", "Braum", "Soraka"],
            ko: ["타릭", "레오나", "브라움", "소라카"],
            zh: ["塔里克", "蕾欧娜", "布隆", "索拉卡"]
        },
        answer: 0
    },
    {
        id: 242,
        quotes: {
            ja: "I was made for this... literally.",
            en: "I was made for this... literally.",
            ko: "I was made for this... literally.",
            zh: "I was made for this... literally."
        },
        choices: {
            ja: ["オリアナ", "ブリッツクランク", "ビクター", "ジグス"],
            en: ["Orianna", "Blitzcrank", "Viktor", "Ziggs"],
            ko: ["오리아나", "블리츠크랭크", "빅토르", "직스"],
            zh: ["奥莉安娜", "布里茨", "维克托", "吉格斯"]
        },
        answer: 0
    },
    {
        id: 243,
        quotes: {
            ja: "The fire is eternal!",
            en: "The fire is eternal!",
            ko: "The fire is eternal!",
            zh: "The fire is eternal!"
        },
        choices: {
            ja: ["オーン", "ブランド", "アニー", "ランブル"],
            en: ["Ornn", "Brand", "Annie", "Rumble"],
            ko: ["오른", "브랜드", "애니", "럼블"],
            zh: ["奥恩", "布兰德", "安妮", "兰博"]
        },
        answer: 0
    },
    {
        id: 244,
        quotes: {
            ja: "Stand behind me!",
            en: "Stand behind me!",
            ko: "Stand behind me!",
            zh: "Stand behind me!"
        },
        choices: {
            ja: ["ブラウム", "タリック", "アリスター", "レオナ"],
            en: ["Braum", "Taric", "Alistar", "Leona"],
            ko: ["브라움", "타릭", "알리스타", "레오나"],
            zh: ["布隆", "塔里克", "阿利斯塔", "蕾欧娜"]
        },
        answer: 0
    },
    {
        id: 245,
        quotes: {
            ja: "Monsters can be made to fear.",
            en: "Monsters can be made to fear.",
            ko: "Monsters can be made to fear.",
            zh: "Monsters can be made to fear."
        },
        choices: {
            ja: ["ポッピー", "ガレン", "ジャーヴァンⅣ", "ダリウス"],
            en: ["Poppy", "Garen", "Jarvan IV", "Darius"],
            ko: ["뽀삐", "가렌", "자르반 4세", "다리우스"],
            zh: ["波比", "盖伦", "嘉文四世", "德莱厄斯"]
        },
        answer: 0
    },
    {
        id: 246,
        quotes: {
            ja: "I go where I please.",
            en: "I go where I please.",
            ko: "I go where I please.",
            zh: "I go where I please."
        },
        choices: {
            ja: ["ナフィーリ", "レンガー", "レク＝サイ", "カ＝ジックス"],
            en: ["Naafiri", "Rengar", "Rek'Sai", "Kha'Zix"],
            ko: ["나피리", "렝가", "렉사이", "카직스"],
            zh: ["纳亚菲利", "雷恩加尔", "雷克塞", "卡兹克"]
        },
        answer: 0
    },
    {
        id: 247,
        quotes: {
            ja: "Time to feed!",
            en: "Time to feed!",
            ko: "Time to feed!",
            zh: "Time to feed!"
        },
        choices: {
            ja: ["ワーウィック", "レンガー", "ヴォリベア", "ウディア"],
            en: ["Warwick", "Rengar", "Volibear", "Udyr"],
            ko: ["워윅", "렝가", "볼리베어", "우디르"],
            zh: ["沃里克", "雷恩加尔", "沃利贝尔", "乌迪尔"]
        },
        answer: 0
    },
    {
        id: 248,
        quotes: {
            ja: "Always fly just out of reach.",
            en: "Always fly just out of reach.",
            ko: "Always fly just out of reach.",
            zh: "Always fly just out of reach."
        },
        choices: {
            ja: ["グウェン", "グレン", "イレリア", "フィオラ"],
            en: ["Gwen", "Garen", "Irelia", "Fiora"],
            ko: ["그웬", "가렌", "이렐리아", "피오라"],
            zh: ["格温", "盖伦", "艾瑞莉娅", "菲奥娜"]
        },
        answer: 0
    },
    {
        id: 249,
        quotes: {
            ja: "Go ahead. Be negative. You'll be just my type.",
            en: "Go ahead. Be negative. You'll be just my type.",
            ko: "Go ahead. Be negative. You'll be just my type.",
            zh: "Go ahead. Be negative. You'll be just my type."
        },
        choices: {
            ja: ["ゼリ", "ジンクス", "ケネン", "ヴォリベア"],
            en: ["Zeri", "Jinx", "Kennen", "Volibear"],
            ko: ["제리", "징크스", "케넨", "볼리베어"],
            zh: ["泽丽", "金克丝", "凯南", "沃利贝尔"]
        },
        answer: 0
    },
    {
        id: 250,
        quotes: {
            ja: "Witness the power of the Ascended!",
            en: "Witness the power of the Ascended!",
            ko: "Witness the power of the Ascended!",
            zh: "Witness the power of the Ascended!"
        },
        choices: {
            ja: ["レネクトン", "ナサス", "アジール", "ゼラス"],
            en: ["Renekton", "Nasus", "Azir", "Xerath"],
            ko: ["레넥톤", "나서스", "아지르", "제라스"],
            zh: ["鳄鱼", "内瑟斯", "阿兹尔", "泽拉斯"]
        },
        answer: 0
    },
    {
        id: 251,
        quotes: {
            ja: "I'll show them the power of Noxus!",
            en: "I'll show them the power of Noxus!",
            ko: "I'll show them the power of Noxus!",
            zh: "I'll show them the power of Noxus!"
        },
        choices: {
            ja: ["レル", "レオナ", "セジュアニ", "ポッピー"],
            en: ["Rell", "Leona", "Sejuani", "Poppy"],
            ko: ["렐", "레오나", "세주아니", "뽀삐"],
            zh: ["芮尔", "蕾欧娜", "瑟庄妮", "波比"]
        },
        answer: 0
    },
    {
        id: 252,
        quotes: {
            ja: "Let's make a better tomorrow, together.",
            en: "Let's make a better tomorrow, together.",
            ko: "Let's make a better tomorrow, together.",
            zh: "Let's make a better tomorrow, together."
        },
        choices: {
            ja: ["レナータ・グラスク", "カミール", "セラフィーン", "ジャンナ"],
            en: ["Renata Glasc", "Camille", "Seraphine", "Janna"],
            ko: ["레나타 글라스크", "카밀", "세라핀", "잔나"],
            zh: ["烬娜塔·戈拉斯克", "卡蜜尔", "萨勒芬妮", "迦娜"]
        },
        answer: 0
    },
    {
        id: 253,
        quotes: {
            ja: "We are eternal.",
            en: "We are eternal.",
            ko: "We are eternal.",
            zh: "We are eternal."
        },
        choices: {
            ja: ["ベル＝ヴェス", "カ＝ジックス", "レク＝サイ", "チョ＝ガス"],
            en: ["Bel'Veth", "Kha'Zix", "Rek'Sai", "Cho'Gath"],
            ko: ["벨베스", "카직스", "렉사이", "초가스"],
            zh: ["贝蕾娅", "卡兹克", "雷克塞", "科加斯"]
        },
        answer: 0
    },
    {
        id: 254,
        quotes: {
            ja: "I feel no fear!",
            en: "I feel no fear!",
            ko: "I feel no fear!",
            zh: "I feel no fear!"
        },
        choices: {
            ja: ["ブライアー", "ワーウィック", "レンガー", "ヴォリベア"],
            en: ["Briar", "Warwick", "Rengar", "Volibear"],
            ko: ["브라이어", "워윅", "렝가", "볼리베어"],
            zh: ["贝蕾亚", "沃里克", "雷恩加尔", "沃利贝尔"]
        },
        answer: 0
    },
    {
        id: 255,
        quotes: {
            ja: "I paint in all mediums - watercolor, oils, blood...",
            en: "I paint in all mediums - watercolor, oils, blood...",
            ko: "I paint in all mediums - watercolor, oils, blood...",
            zh: "I paint in all mediums - watercolor, oils, blood..."
        },
        choices: {
            ja: ["フェイ", "ジン", "ブラッドミア", "スウェイン"],
            en: ["Hwei", "Jhin", "Vladimir", "Swain"],
            ko: ["흐웨이", "진", "블라디미르", "스웨인"],
            zh: ["彗", "烬", "弗拉基米尔", "斯维因"]
        },
        answer: 0
    },
    {
        id: 256,
        quotes: {
            ja: "I am the fury of the mountain!",
            en: "I am the fury of the mountain!",
            ko: "I am the fury of the mountain!",
            zh: "I am the fury of the mountain!"
        },
        choices: {
            ja: ["クサンテ", "セト", "イラオイ", "ダリウス"],
            en: ["K'Sante", "Sett", "Illaoi", "Darius"],
            ko: ["크산테", "세트", "일라오이", "다리우스"],
            zh: ["奎桑提", "瑟提", "俄洛伊", "德莱厄斯"]
        },
        answer: 0
    },
    {
        id: 257,
        quotes: {
            ja: "I will guide them to death.",
            en: "I will guide them to death.",
            ko: "I will guide them to death.",
            zh: "I will guide them to death."
        },
        choices: {
            ja: ["キンドレッド", "カーサス", "ヴィエゴ", "モルデカイザー"],
            en: ["Kindred", "Karthus", "Viego", "Mordekaiser"],
            ko: ["킨드레드", "카서스", "비에고", "모데카이저"],
            zh: ["千珏", "卡尔萨斯", "佛耶戈", "莫德凯撒"]
        },
        answer: 0
    },
    {
        id: 258,
        quotes: {
            ja: "My warmth is on loan.",
            en: "My warmth is on loan.",
            ko: "My warmth is on loan.",
            zh: "My warmth is on loan."
        },
        choices: {
            ja: ["ミリオ", "ブラウム", "タリック", "アイバーン"],
            en: ["Milio", "Braum", "Taric", "Ivern"],
            ko: ["밀리오", "브라움", "타릭", "아이번"],
            zh: ["米利欧", "布隆", "塔里克", "艾翁"]
        },
        answer: 0
    },
    {
        id: 259,
        quotes: {
            ja: "The fire inside burns brighter than the fire around me.",
            en: "The fire inside burns brighter than the fire around me.",
            ko: "The fire inside burns brighter than the fire around me.",
            zh: "The fire inside burns brighter than the fire around me."
        },
        choices: {
            ja: ["スモルダー", "ブランド", "アニー", "ランブル"],
            en: ["Smolder", "Brand", "Annie", "Rumble"],
            ko: ["스몰더", "브랜드", "애니", "럼블"],
            zh: ["斯莫德", "布兰德", "安妮", "兰博"]
        },
        answer: 0
    },
    {
        id: 260,
        quotes: {
            ja: "I was made to rule.",
            en: "I was made to rule.",
            ko: "I was made to rule.",
            zh: "I was made to rule."
        },
        choices: {
            ja: ["アジール", "スウェイン", "ジャーヴァンⅣ", "ヴィエゴ"],
            en: ["Azir", "Swain", "Jarvan IV", "Viego"],
            ko: ["아지르", "스웨인", "자르반 4세", "비에고"],
            zh: ["阿兹尔", "斯维因", "嘉文四世", "佛耶戈"]
        },
        answer: 0
    },
    {
        id: 261,
        quotes: {
            ja: "The light can deceive, but shadows never lie.",
            en: "The light can deceive, but shadows never lie.",
            ko: "The light can deceive, but shadows never lie.",
            zh: "The light can deceive, but shadows never lie."
        },
        choices: {
            ja: ["ゼド", "ノクターン", "シェン", "タロン"],
            en: ["Zed", "Nocturne", "Shen", "Talon"],
            ko: ["제드", "녹턴", "쉔", "탈론"],
            zh: ["劫", "魔腾", "慎", "泰隆"]
        },
        answer: 0
    },
    {
        id: 262,
        quotes: {
            ja: "Do not deny me!",
            en: "Do not deny me!",
            ko: "Do not deny me!",
            zh: "Do not deny me!"
        },
        choices: {
            ja: ["ヴィエゴ", "モルデカイザー", "サイオン", "アーゴット"],
            en: ["Viego", "Mordekaiser", "Sion", "Urgot"],
            ko: ["비에고", "모데카이저", "사이온", "우르곳"],
            zh: ["佛耶戈", "莫德凯撒", "赛恩", "厄加特"]
        },
        answer: 0
    },
    {
        id: 263,
        quotes: {
            ja: "Their sanity. My specialty.",
            en: "Their sanity. My specialty.",
            ko: "Their sanity. My specialty.",
            zh: "Their sanity. My specialty."
        },
        choices: {
            ja: ["フィドルスティックス", "シャコ", "ノクターン", "イブリン"],
            en: ["Fiddlesticks", "Shaco", "Nocturne", "Evelynn"],
            ko: ["피들스틱", "샤코", "녹턴", "이블린"],
            zh: ["费德提克", "萨科", "魔腾", "伊芙琳"]
        },
        answer: 0
    },
    {
        id: 264,
        quotes: {
            ja: "I will not falter!",
            en: "I will not falter!",
            ko: "I will not falter!",
            zh: "I will not falter!"
        },
        choices: {
            ja: ["ガレン", "ダリウス", "ジャーヴァンⅣ", "パンテオン"],
            en: ["Garen", "Darius", "Jarvan IV", "Pantheon"],
            ko: ["가렌", "다리우스", "자르반 4세", "판테온"],
            zh: ["盖伦", "德莱厄斯", "嘉文四世", "潘森"]
        },
        answer: 0
    },
    {
        id: 265,
        quotes: {
            ja: "I will be the best.",
            en: "I will be the best.",
            ko: "I will be the best.",
            zh: "I will be the best."
        },
        choices: {
            ja: ["アクシャン", "ルシアン", "エズリアル", "ジン"],
            en: ["Akshan", "Lucian", "Ezreal", "Jhin"],
            ko: ["아크샨", "루시안", "이즈리얼", "진"],
            zh: ["阿克尚", "卢锡安", "伊泽瑞尔", "烬"]
        },
        answer: 0
    },
    {
        id: 266,
        quotes: {
            ja: "The moon will rise. The night will last forever.",
            en: "The moon will rise. The night will last forever.",
            ko: "The moon will rise. The night will last forever.",
            zh: "The moon will rise. The night will last forever."
        },
        choices: {
            ja: ["アフェリオス", "ダイアナ", "タリック", "レオナ"],
            en: ["Aphelios", "Diana", "Taric", "Leona"],
            ko: ["아펠리오스", "다이애나", "타릭", "레오나"],
            zh: ["厄斐琉斯", "黛安娜", "塔里克", "蕾欧娜"]
        },
        answer: 0
    },
    {
        id: 267,
        quotes: {
            ja: "Don't mess with a yordle!",
            en: "Don't mess with a yordle!",
            ko: "Don't mess with a yordle!",
            zh: "Don't mess with a yordle!"
        },
        choices: {
            ja: ["トリスターナ", "ティーモ", "ポッピー", "ルル"],
            en: ["Tristana", "Teemo", "Poppy", "Lulu"],
            ko: ["트리스타나", "티모", "뽀삐", "룰루"],
            zh: ["崔丝塔娜", "提莫", "波比", "璐璐"]
        },
        answer: 0
    },
    {
        id: 268,
        quotes: {
            ja: "Do you feel a chill?",
            en: "Do you feel a chill?",
            ko: "Do you feel a chill?",
            zh: "Do you feel a chill?"
        },
        choices: {
            ja: ["リサンドラ", "アニビア", "アッシュ", "セジュアニ"],
            en: ["Lissandra", "Anivia", "Ashe", "Sejuani"],
            ko: ["리산드라", "애니비아", "애쉬", "세주아니"],
            zh: ["丽桑卓", "艾尼维亚", "艾希", "瑟庄妮"]
        },
        answer: 0
    },
    {
        id: 269,
        quotes: {
            ja: "The purification has begun!",
            en: "The purification has begun!",
            ko: "The purification has begun!",
            zh: "The purification has begun!"
        },
        choices: {
            ja: ["ルシアン", "ヴェイン", "セナ", "アッシュ"],
            en: ["Lucian", "Vayne", "Senna", "Ashe"],
            ko: ["루시안", "베인", "세나", "애쉬"],
            zh: ["卢锡安", "薇恩", "赛娜", "艾希"]
        },
        answer: 0
    },
    {
        id: 270,
        quotes: {
            ja: "That tasted purple!",
            en: "That tasted purple!",
            ko: "That tasted purple!",
            zh: "That tasted purple!"
        },
        choices: {
            ja: ["ルル", "ゾーイ", "アニー", "ニーコ"],
            en: ["Lulu", "Zoe", "Annie", "Neeko"],
            ko: ["룰루", "조이", "애니", "니코"],
            zh: ["璐璐", "佐伊", "安妮", "妮蔻"]
        },
        answer: 0
    },
    {
        id: 271,
        quotes: {
            ja: "They will fear Ionia!",
            en: "They will fear Ionia!",
            ko: "They will fear Ionia!",
            zh: "They will fear Ionia!"
        },
        choices: {
            ja: ["イレリア", "ヤスオ", "シェン", "ゼド"],
            en: ["Irelia", "Yasuo", "Shen", "Zed"],
            ko: ["이렐리아", "야스오", "쉔", "제드"],
            zh: ["艾瑞莉娅", "亚索", "慎", "劫"]
        },
        answer: 0
    },
    {
        id: 272,
        quotes: {
            ja: "Tides of change!",
            en: "Tides of change!",
            ko: "Tides of change!",
            zh: "Tides of change!"
        },
        choices: {
            ja: ["ナミ", "フィズ", "パイク", "ノーチラス"],
            en: ["Nami", "Fizz", "Pyke", "Nautilus"],
            ko: ["나미", "피즈", "파이크", "노틸러스"],
            zh: ["娜美", "菲兹", "派克", "诺提勒斯"]
        },
        answer: 0
    },
    {
        id: 273,
        quotes: {
            ja: "I am the thunder!",
            en: "I am the thunder!",
            ko: "I am the thunder!",
            zh: "I am the thunder!"
        },
        choices: {
            ja: ["ヴォリベア", "オラフ", "ウディア", "トランドル"],
            en: ["Volibear", "Olaf", "Udyr", "Trundle"],
            ko: ["볼리베어", "올라프", "우디르", "트런들"],
            zh: ["沃利贝尔", "奥拉夫", "乌迪尔", "特朗德尔"]
        },
        answer: 0
    },
    {
        id: 274,
        quotes: {
            ja: "You face Jarvan, for the last time!",
            en: "You face Jarvan, for the last time!",
            ko: "You face Jarvan, for the last time!",
            zh: "You face Jarvan, for the last time!"
        },
        choices: {
            ja: ["ジャーヴァンⅣ", "ガレン", "シン・ジャオ", "ダリウス"],
            en: ["Jarvan IV", "Garen", "Xin Zhao", "Darius"],
            ko: ["자르반 4세", "가렌", "신 짜오", "다리우스"],
            zh: ["嘉文四世", "盖伦", "赵信", "德莱厄斯"]
        },
        answer: 0
    },
    {
        id: 275,
        quotes: {
            ja: "I will bury the world in ice!",
            en: "I will bury the world in ice!",
            ko: "I will bury the world in ice!",
            zh: "I will bury the world in ice!"
        },
        choices: {
            ja: ["リサンドラ", "アニビア", "アッシュ", "セジュアニ"],
            en: ["Lissandra", "Anivia", "Ashe", "Sejuani"],
            ko: ["리산드라", "애니비아", "애쉬", "세주아니"],
            zh: ["丽桑卓", "艾尼维亚", "艾希", "瑟庄妮"]
        },
        answer: 0
    },
    {
        id: 276,
        quotes: {
            ja: "They're gonna live... until they die.",
            en: "They're gonna live... until they die.",
            ko: "They're gonna live... until they die.",
            zh: "They're gonna live... until they die."
        },
        choices: {
            ja: ["ジリアン", "エコー", "ライズ", "ベイガー"],
            en: ["Zilean", "Ekko", "Ryze", "Veigar"],
            ko: ["질리언", "에코", "라이즈", "베이가"],
            zh: ["基兰", "艾克", "瑞兹", "维迦"]
        },
        answer: 0
    },
    {
        id: 277,
        quotes: {
            ja: "Here's to you, kid.",
            en: "Here's to you, kid.",
            ko: "Here's to you, kid.",
            zh: "Here's to you, kid."
        },
        choices: {
            ja: ["ガングプランク", "グレイブス", "ツイステッド・フェイト", "ジン"],
            en: ["Gangplank", "Graves", "Twisted Fate", "Jhin"],
            ko: ["갱플랭크", "그레이브즈", "트위스티드 페이트", "진"],
            zh: ["普朗克", "格雷福斯", "崔斯特", "烬"]
        },
        answer: 0
    },
    {
        id: 278,
        quotes: {
            ja: "A mighty sword wields its own power.",
            en: "A mighty sword wields its own power.",
            ko: "A mighty sword wields its own power.",
            zh: "A mighty sword wields its own power."
        },
        choices: {
            ja: ["マスター・イー", "ヤスオ", "ヨネ", "シェン"],
            en: ["Master Yi", "Yasuo", "Yone", "Shen"],
            ko: ["마스터 이", "야스오", "요네", "쉔"],
            zh: ["易", "亚索", "永恩", "慎"]
        },
        answer: 0
    },
    {
        id: 279,
        quotes: {
            ja: "Through conflict, I grow.",
            en: "Through conflict, I grow.",
            ko: "Through conflict, I grow.",
            zh: "Through conflict, I grow."
        },
        choices: {
            ja: ["セト", "ダリウス", "ガレン", "ドレイヴン"],
            en: ["Sett", "Darius", "Garen", "Draven"],
            ko: ["세트", "다리우스", "가렌", "드레이븐"],
            zh: ["瑟提", "德莱厄斯", "盖伦", "德莱文"]
        },
        answer: 0
    },
    {
        id: 280,
        quotes: {
            ja: "Face the void!",
            en: "Face the void!",
            ko: "Face the void!",
            zh: "Face the void!"
        },
        choices: {
            ja: ["マルザハール", "カサディン", "カ＝ジックス", "コグ＝マウ"],
            en: ["Malzahar", "Kassadin", "Kha'Zix", "Kog'Maw"],
            ko: ["말자하", "카사딘", "카직스", "코그모"],
            zh: ["玛尔扎哈", "卡萨丁", "卡兹克", "克格莫"]
        },
        answer: 0
    },
    {
        id: 281,
        quotes: {
            ja: "I walk alone, for now.",
            en: "I walk alone, for now.",
            ko: "I walk alone, for now.",
            zh: "I walk alone, for now."
        },
        choices: {
            ja: ["カイ＝サ", "ジンクス", "ヴェイン", "カタリナ"],
            en: ["Kai'Sa", "Jinx", "Vayne", "Katarina"],
            ko: ["카이사", "징크스", "베인", "카타리나"],
            zh: ["卡莎", "金克丝", "薇恩", "卡特琳娜"]
        },
        answer: 0
    },
    {
        id: 282,
        quotes: {
            ja: "The heart is the strongest muscle!",
            en: "The heart is the strongest muscle!",
            ko: "The heart is the strongest muscle!",
            zh: "The heart is the strongest muscle!"
        },
        choices: {
            ja: ["ブラウム", "アリスター", "タリック", "ガレン"],
            en: ["Braum", "Alistar", "Taric", "Garen"],
            ko: ["브라움", "알리스타", "타릭", "가렌"],
            zh: ["布隆", "阿利斯塔", "塔里克", "盖伦"]
        },
        answer: 0
    },
    {
        id: 283,
        quotes: {
            ja: "Let's make this fun!",
            en: "Let's make this fun!",
            ko: "Let's make this fun!",
            zh: "Let's make this fun!"
        },
        choices: {
            ja: ["ゾーイ", "ジンクス", "ルル", "ニーコ"],
            en: ["Zoe", "Jinx", "Lulu", "Neeko"],
            ko: ["조이", "징크스", "룰루", "니코"],
            zh: ["佐伊", "金克丝", "璐璐", "妮蔻"]
        },
        answer: 0
    },
    {
        id: 284,
        quotes: {
            ja: "So many noobs... will matchmaking ever find true balance?",
            en: "So many noobs... will matchmaking ever find true balance?",
            ko: "So many noobs... will matchmaking ever find true balance?",
            zh: "So many noobs... will matchmaking ever find true balance?"
        },
        choices: {
            ja: ["アカリ", "ゼド", "シェン", "ケネン"],
            en: ["Akali", "Zed", "Shen", "Kennen"],
            ko: ["아칼리", "제드", "쉔", "케넨"],
            zh: ["阿卡丽", "劫", "慎", "凯南"]
        },
        answer: 0
    },
    {
        id: 285,
        quotes: {
            ja: "Know that if the tables were turned, I would show you no mercy!",
            en: "Know that if the tables were turned, I would show you no mercy!",
            ko: "Know that if the tables were turned, I would show you no mercy!",
            zh: "Know that if the tables were turned, I would show you no mercy!"
        },
        choices: {
            ja: ["ベイガー", "ゼラス", "ジリアン", "ライズ"],
            en: ["Veigar", "Xerath", "Zilean", "Ryze"],
            ko: ["베이가", "제라스", "질리언", "라이즈"],
            zh: ["维迦", "泽拉斯", "基兰", "瑞兹"]
        },
        answer: 0
    },
    {
        id: 286,
        quotes: {
            ja: "Rock solid.",
            en: "Rock solid.",
            ko: "Rock solid.",
            zh: "Rock solid."
        },
        choices: {
            ja: ["マルファイト", "ガリオ", "オーン", "ブラウム"],
            en: ["Malphite", "Galio", "Ornn", "Braum"],
            ko: ["말파이트", "갈리오", "오른", "브라움"],
            zh: ["墨菲特", "加里奥", "奥恩", "布隆"]
        },
        answer: 0
    },
    {
        id: 287,
        quotes: {
            ja: "You can't tame the storm!",
            en: "You can't tame the storm!",
            ko: "You can't tame the storm!",
            zh: "You can't tame the storm!"
        },
        choices: {
            ja: ["ケネン", "ジャンナ", "ゼリ", "ヴォリベア"],
            en: ["Kennen", "Janna", "Zeri", "Volibear"],
            ko: ["케넨", "잔나", "제리", "볼리베어"],
            zh: ["凯南", "迦娜", "泽丽", "沃利贝尔"]
        },
        answer: 0
    },
    {
        id: 288,
        quotes: {
            ja: "Our spirit will never die!",
            en: "Our spirit will never die!",
            ko: "Our spirit will never die!",
            zh: "Our spirit will never die!"
        },
        choices: {
            ja: ["ウーコン", "マスター・イー", "シン・ジャオ", "リー・シン"],
            en: ["Wukong", "Master Yi", "Xin Zhao", "Lee Sin"],
            ko: ["오공", "마스터 이", "신 짜오", "리 신"],
            zh: ["悟空", "易", "赵信", "李青"]
        },
        answer: 0
    },
    {
        id: 289,
        quotes: {
            ja: "Let us dance once more!",
            en: "Let us dance once more!",
            ko: "Let us dance once more!",
            zh: "Let us dance once more!"
        },
        choices: {
            ja: ["ラカン", "ザヤ", "アーリ", "イレリア"],
            en: ["Rakan", "Xayah", "Ahri", "Irelia"],
            ko: ["라칸", "자야", "아리", "이렐리아"],
            zh: ["洛", "霞", "阿狸", "艾瑞莉娅"]
        },
        answer: 0
    },
    {
        id: 290,
        quotes: {
            ja: "Neeko is not a sad tomato... Neeko is a strong tomato!",
            en: "Neeko is not a sad tomato... Neeko is a strong tomato!",
            ko: "Neeko is not a sad tomato... Neeko is a strong tomato!",
            zh: "Neeko is not a sad tomato... Neeko is a strong tomato!"
        },
        choices: {
            ja: ["ニーコ", "ゾーイ", "ルル", "ザイラ"],
            en: ["Neeko", "Zoe", "Lulu", "Zyra"],
            ko: ["니코", "조이", "룰루", "자이라"],
            zh: ["妮蔻", "佐伊", "璐璐", "婕拉"]
        },
        answer: 0
    },
    {
        id: 291,
        quotes: {
            ja: "The pack grows!",
            en: "The pack grows!",
            ko: "The pack grows!",
            zh: "The pack grows!"
        },
        choices: {
            ja: ["ナフィーリ", "ワーウィック", "レンガー", "ニダリー"],
            en: ["Naafiri", "Warwick", "Rengar", "Nidalee"],
            ko: ["나피리", "워윅", "렝가", "니달리"],
            zh: ["纳亚菲利", "沃里克", "雷恩加尔", "奈德丽"]
        },
        answer: 0
    },
    {
        id: 292,
        quotes: {
            ja: "I am the storm that is approaching!",
            en: "I am the storm that is approaching!",
            ko: "I am the storm that is approaching!",
            zh: "I am the storm that is approaching!"
        },
        choices: {
            ja: ["ヴォリベア", "オラフ", "ウディア", "トランドル"],
            en: ["Volibear", "Olaf", "Udyr", "Trundle"],
            ko: ["볼리베어", "올라프", "우디르", "트런들"],
            zh: ["沃利贝尔", "奥拉夫", "乌迪尔", "特朗德尔"]
        },
        answer: 0
    },
    {
        id: 293,
        quotes: {
            ja: "Zaun needs me!",
            en: "Zaun needs me!",
            ko: "Zaun needs me!",
            zh: "Zaun needs me!"
        },
        choices: {
            ja: ["エコー", "ジンクス", "ヴァイ", "ジグス"],
            en: ["Ekko", "Jinx", "Vi", "Ziggs"],
            ko: ["에코", "징크스", "바이", "직스"],
            zh: ["艾克", "金克丝", "蔚", "吉格斯"]
        },
        answer: 0
    },
    {
        id: 294,
        quotes: {
            ja: "Everybody dies. Some just need a little help.",
            en: "Everybody dies. Some just need a little help.",
            ko: "Everybody dies. Some just need a little help.",
            zh: "Everybody dies. Some just need a little help."
        },
        choices: {
            ja: ["ミス・フォーチュン", "ジンクス", "ケイトリン", "サミーラ"],
            en: ["Miss Fortune", "Jinx", "Caitlyn", "Samira"],
            ko: ["미스 포츈", "징크스", "케이틀린", "사미라"],
            zh: ["厄运小姐", "金克丝", "凯特琳", "莎弥拉"]
        },
        answer: 0
    },
    {
        id: 295,
        quotes: {
            ja: "I like my weapons how I like my music: heavy and metal.",
            en: "I like my weapons how I like my music: heavy and metal.",
            ko: "I like my weapons how I like my music: heavy and metal.",
            zh: "I like my weapons how I like my music: heavy and metal."
        },
        choices: {
            ja: ["モルデカイザー", "サイオン", "ダリウス", "アーゴット"],
            en: ["Mordekaiser", "Sion", "Darius", "Urgot"],
            ko: ["모데카이저", "사이온", "다리우스", "우르곳"],
            zh: ["莫德凯撒", "赛恩", "德莱厄斯", "厄加特"]
        },
        answer: 0
    },
    {
        id: 296,
        quotes: {
            ja: "I am the mountain!",
            en: "I am the mountain!",
            ko: "I am the mountain!",
            zh: "I am the mountain!"
        },
        choices: {
            ja: ["マルファイト", "オーン", "ガリオ", "ブラウム"],
            en: ["Malphite", "Ornn", "Galio", "Braum"],
            ko: ["말파이트", "오른", "갈리오", "브라움"],
            zh: ["墨菲特", "奥恩", "加里奥", "布隆"]
        },
        answer: 0
    },
    {
        id: 297,
        quotes: {
            ja: "My right arm is stronger than my left!",
            en: "My right arm is stronger than my left!",
            ko: "My right arm is stronger than my left!",
            zh: "My right arm is stronger than my left!"
        },
        choices: {
            ja: ["トランドル", "オラフ", "ウディア", "グラガス"],
            en: ["Trundle", "Olaf", "Udyr", "Gragas"],
            ko: ["트런들", "올라프", "우디르", "그라가스"],
            zh: ["特朗德尔", "奥拉夫", "乌迪尔", "古拉加斯"]
        },
        answer: 0
    },
    {
        id: 298,
        quotes: {
            ja: "They will know pain!",
            en: "They will know pain!",
            ko: "They will know pain!",
            zh: "They will know pain!"
        },
        choices: {
            ja: ["モルガナ", "ケイル", "ルブラン", "シンドラ"],
            en: ["Morgana", "Kayle", "LeBlanc", "Syndra"],
            ko: ["모르가나", "케일", "르블랑", "신드라"],
            zh: ["莫甘娜", "凯尔", "乐芙兰", "辛德拉"]
        },
        answer: 0
    },
    {
        id: 299,
        quotes: {
            ja: "My destiny is my own!",
            en: "My destiny is my own!",
            ko: "My destiny is my own!",
            zh: "My destiny is my own!"
        },
        choices: {
            ja: ["シンドラ", "ルブラン", "モルガナ", "カシオペア"],
            en: ["Syndra", "LeBlanc", "Morgana", "Cassiopeia"],
            ko: ["신드라", "르블랑", "모르가나", "카시오페아"],
            zh: ["辛德拉", "乐芙兰", "莫甘娜", "卡西奥佩娅"]
        },
        answer: 0
    },
    {
        id: 300,
        quotes: {
            ja: "There is life. There is death. And then there is me.",
            en: "There is life. There is death. And then there is me.",
            ko: "There is life. There is death. And then there is me.",
            zh: "There is life. There is death. And then there is me."
        },
        choices: {
            ja: ["モルデカイザー", "ヴィエゴ", "サイオン", "ヨリック"],
            en: ["Mordekaiser", "Viego", "Sion", "Yorick"],
            ko: ["모데카이저", "비에고", "사이온", "요릭"],
            zh: ["莫德凯撒", "佛耶戈", "赛恩", "约里克"]
        },
        answer: 0
    }
];

// ===================================
// 初期化
// ===================================

document.addEventListener('DOMContentLoaded', async () => {
    initLanguage();
    loadGameData();
    updateUI();
    
    // 画像を事前読み込み
    await preloadImages();
    
    // キャンバス保存ヒントの設定
    setupCanvasSaveHint();
    
    console.log(`✅ 多言語対応クイズ初期化完了: ${currentLanguage} | 問題数: ${quizQuestions.length}`);
});

// ===================================
// データ管理
// ===================================

function loadGameData() {
    const saved = localStorage.getItem('lolQuizGameData');
    if (saved) {
        gameData = JSON.parse(saved);
    }
}

function saveGameData() {
    localStorage.setItem('lolQuizGameData', JSON.stringify(gameData));
}

// ===================================
// UI更新
// ===================================

function updateUI() {
    // ポイント表示
    document.getElementById('current-points').textContent = gameData.totalCorrectPoints % 10;
    document.getElementById('generation-tickets').textContent = gameData.availableGenerations;
    document.getElementById('collection-count').textContent = gameData.unlockedCharacters.length;

    // 進捗メッセージ
    const pointsToNext = 10 - (gameData.totalCorrectPoints % 10);
    let message = `あと${pointsToNext}問正解でキャラ生成可能！`;
    if (gameData.availableGenerations > 0) {
        message = `🎉 キャラクターを${gameData.availableGenerations}回生成できます！`;
    }
    document.getElementById('progress-message').textContent = message;
}

// ===================================
// 画面遷移
// ===================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

function backToHome() {
    showScreen('home-screen');
    updateUI();
}

// ===================================
// クイズ機能
// ===================================

function startQuiz() {
    // ランダムに問題を選択
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    currentQuestion = quizQuestions[randomIndex];
    
    // クイズ画面を表示
    showScreen('quiz-screen');
    
    // 現在の言語のセリフを表示
    const quote = currentQuestion.quotes[currentLanguage];
    document.getElementById('quote-text').textContent = `"${quote}"`;
    
    // 現在の言語の選択肢を表示
    const choices = currentQuestion.choices[currentLanguage];
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.onclick = () => selectAnswer(index);
        choicesContainer.appendChild(button);
    });
    
    // プレイカウント増加
    gameData.playCount++;
    gameData.lastPlayedAt = new Date().toISOString();
    
    console.log(`📝 問題表示: ${currentQuestion.id} (${currentLanguage})`);
}

function selectAnswer(selectedIndex) {
    const buttons = document.querySelectorAll('.choice-btn');
    const isCorrect = selectedIndex === currentQuestion.answer;
    
    // すべてのボタンを無効化
    buttons.forEach((button, index) => {
        button.disabled = true;
        
        // 正解・不正解の色付け
        if (index === currentQuestion.answer) {
            button.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            button.classList.add('incorrect');
        }
    });
    
    // 結果を表示（少し遅延）
    setTimeout(() => {
        showResult(isCorrect);
    }, 1000);
}

function showResult(isCorrect) {
    showScreen('result-screen');
    
    // 結果アイコンとタイトル
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    
    if (isCorrect) {
        resultIcon.textContent = '✅';
        resultTitle.textContent = '正解！';
        
        // ポイント加算
        gameData.totalCorrectPoints++;
        
        // 10ポイント貯まったら生成チケット付与
        if (gameData.totalCorrectPoints % 10 === 0) {
            gameData.availableGenerations++;
            document.getElementById('generation-notice').style.display = 'block';
        } else {
            document.getElementById('generation-notice').style.display = 'none';
        }
    } else {
        resultIcon.textContent = '❌';
        resultTitle.textContent = '不正解...';
        document.getElementById('generation-notice').style.display = 'none';
    }
    
    // 正解チャンピオン名（現在の言語）
    const correctAnswer = currentQuestion.choices[currentLanguage][currentQuestion.answer];
    document.getElementById('result-answer').textContent = `正解: ${correctAnswer}`;
    
    // 獲得ポイントと累計
    document.getElementById('earned-points').textContent = isCorrect ? '+1' : '+0';
    document.getElementById('total-points-result').textContent = gameData.totalCorrectPoints;
    
    // 生成ボタンの表示制御
    const generateBtn = document.getElementById('generate-btn');
    if (gameData.availableGenerations > 0) {
        generateBtn.style.display = 'block';
    } else {
        generateBtn.style.display = 'none';
    }
    
    // データ保存
    saveGameData();
    
    // シェアボタンを追加
    addShareButtonsToResult();
    const shareData = {
        score: isCorrect ? 1 : 0,
        totalPoints: gameData.totalCorrectPoints,
        tickets: gameData.availableGenerations
    };
    createShareButtons('result-share-container', 'result', shareData);
}

function nextQuestion() {
    startQuiz();
}

// ===================================
// キャラクター生成
// ===================================

function showGeneration() {
    if (gameData.availableGenerations <= 0) {
        alert('生成チケットがありません。クイズで10ポイント貯めましょう！');
        return;
    }
    
    showScreen('generation-screen');
    
    // チケット消費
    gameData.availableGenerations--;
    saveGameData();
    
    // キャラクター生成
    generateCharacter();
    
    // 残りチケット表示
    document.getElementById('remaining-tickets').textContent = gameData.availableGenerations;
}

function generateCharacter() {
    // ランダムに組み合わせを生成
    const bodyOptions = 25; // 5種類 × 5色
    const eyeOptions = 4; // 実際は4種類
    const mouthOptions = 5;
    const itemOptions = 5;
    
    let combinationId;
    let attempts = 0;
    const maxAttempts = 100;
    let body, eye, mouth, item;
    
    // 未使用の組み合わせを探す
    do {
        body = Math.floor(Math.random() * bodyOptions) + 1;
        eye = Math.floor(Math.random() * eyeOptions) + 1;
        mouth = Math.floor(Math.random() * mouthOptions) + 1;
        item = Math.floor(Math.random() * itemOptions) + 1;
        
        combinationId = `body${String(body).padStart(2, '0')}_eye${String(eye).padStart(2, '0')}_mouth${String(mouth).padStart(2, '0')}_item${String(item).padStart(2, '0')}`;
        attempts++;
    } while (gameData.usedCombinations.includes(combinationId) && attempts < maxAttempts);
    
    // 組み合わせを記録
    if (!gameData.usedCombinations.includes(combinationId)) {
        gameData.usedCombinations.push(combinationId);
    }
    
    // レアリティを計算
    const rarity = calculateRarity(body, eye, mouth, item);
    
    // キャラクター情報を保存
    currentGeneratedCharacter = {
        id: combinationId,
        rarity: rarity,
        createdAt: new Date().toISOString()
    };
    
    // キャンバスに描画
    drawCharacter('character-canvas', combinationId, rarity);
    
    // レアリティを表示
    displayRarity(rarity);
    document.getElementById('generation-info').textContent = '💾 画像を右クリック（長押し）で保存できます';
    
    // シェアボタンを追加
    addShareButtonsToGeneration();
    const rarityNames = {
        1: 'コモン',
        2: 'アンコモン',
        3: 'レア',
        4: 'エピック',
        5: 'レジェンダリー'
    };
    const shareData = {
        rarity: rarity,
        rarityName: rarityNames[rarity],
        characterId: combinationId,
        collectionCount: gameData.unlockedCharacters.length,
        totalPossible: 2500
    };
    createShareButtons('generation-share-container', 'character', shareData);
}

// ========================================
// レアリティシステム
// ========================================

/**
 * レアリティを計算（★1〜★5）
 * 各パーツのレア度を合計し、確率で決定
 */
function calculateRarity(body, eye, mouth, item) {
    // 各パーツのレア度を取得
    const bodyRarity = getBodyRarity(body);
    const eyeRarity = getEyeRarity(eye);
    const mouthRarity = getMouthRarity(mouth);
    const itemRarity = getItemRarity(item);
    
    // 合計レア度
    const totalRarity = bodyRarity + eyeRarity + mouthRarity + itemRarity;
    
    // レアリティ判定（合計12〜48）
    // ★5: 5%   (40以上)
    // ★4: 15%  (32以上)
    // ★3: 30%  (24以上)
    // ★2: 30%  (16以上)
    // ★1: 20%  (16未満)
    
    if (totalRarity >= 40) return 5;
    if (totalRarity >= 32) return 4;
    if (totalRarity >= 24) return 3;
    if (totalRarity >= 16) return 2;
    return 1;
}

// ボディのレア度（1〜12）
function getBodyRarity(bodyNum) {
    // モンスター型（7〜11）: 高レア
    if (bodyNum >= 7 && bodyNum <= 11) return 12;
    // グラデーション（21）: 超高レア
    if (bodyNum === 21) return 15;
    // その他: 通常
    return Math.floor(Math.random() * 8) + 3; // 3〜10
}

// 目のレア度（1〜12）
function getEyeRarity(eyeNum) {
    // 目4（開いた目）: 高レア
    if (eyeNum === 4) return 12;
    // 目3（半目）: 中レア
    if (eyeNum === 3) return 8;
    // その他: 通常
    return Math.floor(Math.random() * 6) + 3; // 3〜8
}

// 口のレア度（1〜12）
function getMouthRarity(mouthNum) {
    // 口5（ニヤリ）: 高レア
    if (mouthNum === 5) return 12;
    // 口4（舌）: 中レア
    if (mouthNum === 4) return 8;
    // その他: 通常
    return Math.floor(Math.random() * 6) + 3; // 3〜8
}

// アイテムのレア度（1〜12）
function getItemRarity(itemNum) {
    // アイテム4（剣）: 高レア
    if (itemNum === 4) return 12;
    // アイテム3（三日月刀）: 中レア
    if (itemNum === 3) return 8;
    // その他: 通常
    return Math.floor(Math.random() * 6) + 3; // 3〜8
}

// レアリティテキスト
function getRarityText(rarity) {
    const texts = {
        1: 'コモン',
        2: 'アンコモン',
        3: 'レア',
        4: 'エピック',
        5: 'レジェンダリー'
    };
    return `★${rarity} ${texts[rarity]}`;
}

// レアリティを画面に表示
function displayRarity(rarity) {
    const rarityDisplay = document.getElementById('character-rarity-display');
    if (!rarityDisplay) return;
    
    // レア度表示を表示
    rarityDisplay.style.display = 'flex';
    
    // 星を表示
    const starElement = rarityDisplay.querySelector('.rarity-star');
    starElement.textContent = '★'.repeat(rarity);
    
    // レアリティテキスト
    const textElement = rarityDisplay.querySelector('.rarity-text');
    textElement.textContent = getRarityText(rarity).split(' ')[1]; // "レジェンダリー" のみ
    
    // レアリティに応じたクラスを設定
    rarityDisplay.className = `rarity-display rarity-${rarity}`;
}

// 画像キャッシュ
const imageCache = {};

// 画像を事前読み込み
function preloadImages() {
    return new Promise((resolve) => {
        const imagesToLoad = [];
        
        // ボディ画像（25種類）
        for (let i = 1; i <= 25; i++) {
            imagesToLoad.push(`assets/bodies/body${String(i).padStart(2, '0')}.png`);
        }
        
        // 目画像（4種類）
        for (let i = 1; i <= 4; i++) {
            imagesToLoad.push(`assets/eyes/eye${String(i).padStart(2, '0')}.png`);
        }
        
        // 口画像（5種類）
        for (let i = 1; i <= 5; i++) {
            imagesToLoad.push(`assets/mouths/mouth${String(i).padStart(2, '0')}.png`);
        }
        
        // アイテム画像（5種類）
        for (let i = 1; i <= 5; i++) {
            imagesToLoad.push(`assets/items/item${String(i).padStart(2, '0')}.png`);
        }
        
        let loadedCount = 0;
        const totalImages = imagesToLoad.length;
        
        imagesToLoad.forEach(src => {
            const img = new Image();
            img.onload = () => {
                imageCache[src] = img;
                loadedCount++;
                if (loadedCount === totalImages) {
                    console.log(`✅ 全${totalImages}枚の画像パーツを読み込みました`);
                    resolve();
                }
            };
            img.onerror = () => {
                console.warn(`⚠️ 画像の読み込みに失敗: ${src} - プレースホルダーを使用します`);
                loadedCount++;
                if (loadedCount === totalImages) {
                    resolve();
                }
            };
            img.src = src;
        });
    });
}

function drawCharacter(canvasId, combinationId, rarity = null) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 組み合わせIDから各パーツを取得
    const parts = combinationId.split('_');
    const bodyNum = parseInt(parts[0].replace('body', ''));
    const eyeNum = parseInt(parts[1].replace('eye', ''));
    const mouthNum = parseInt(parts[2].replace('mouth', ''));
    const itemNum = parseInt(parts[3].replace('item', ''));
    
    // 各パーツを描画（画像を使用）
    // 背景は白で塗りつぶし
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // パーツを重ねて描画
    drawImagePart(ctx, canvas, 'body', bodyNum);
    drawImagePart(ctx, canvas, 'eye', eyeNum);
    drawImagePart(ctx, canvas, 'mouth', mouthNum);
    drawImagePart(ctx, canvas, 'item', itemNum);
}

function drawImagePart(ctx, canvas, type, num) {
    const typeMap = {
        'body': 'bodies',
        'eye': 'eyes',
        'mouth': 'mouths',
        'item': 'items'
    };
    const folder = typeMap[type];
    const src = `assets/${folder}/${type}${String(num).padStart(2, '0')}.png`;
    const img = imageCache[src];
    
    if (img && img.complete) {
        // 画像をキャンバス全体に描画
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
        // 画像がない場合はプレースホルダーを描画
        drawPlaceholder(ctx, canvas, type, num);
    }
}

function drawPlaceholder(ctx, canvas, type, num) {
    // 既存の描画関数を使用（フォールバック）
    if (type === 'bg') {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const colors = [
            ['#E0F7FA', '#80DEEA'],
            ['#FFE5E5', '#FFCCCC'],
            ['#FFF9E5', '#FFE5B4'],
            ['#E5FFE5', '#CCFFCC'],
            ['#F0E5FF', '#D4BFFF']
        ];
        const [c1, c2] = colors[(num - 1) % 5];
        gradient.addColorStop(0, c1);
        gradient.addColorStop(1, c2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (type === 'body') {
        drawBody(ctx, num);
    } else if (type === 'eye') {
        drawEyes(ctx, num);
    } else if (type === 'mouth') {
        drawMouth(ctx, num);
    } else if (type === 'item') {
        drawItem(ctx, num);
    }
}

// ボディ描画関数
function drawBody(ctx, bodyNum) {
    const bodyType = Math.ceil(bodyNum / 5); // 1-5
    const colorVariant = (bodyNum - 1) % 5; // 0-4
    
    // 色バリエーション
    const colors = [
        ['#FF6B6B', '#FF8E8E'],
        ['#4ECDC4', '#6FE7DE'],
        ['#FFE66D', '#FFED8F'],
        ['#A8E6CF', '#C4F0E0'],
        ['#FF9A8B', '#FFB0A3']
    ];
    
    const [color1, color2] = colors[colorVariant];
    
    // ボディタイプに応じて異なる形状を描画
    ctx.save();
    ctx.translate(200, 220);
    
    const gradient = ctx.createLinearGradient(-80, -80, 80, 80);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    
    switch (bodyType) {
        case 1: // 円形
            ctx.beginPath();
            ctx.arc(0, 0, 80, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 2: // 四角形
            ctx.fillRect(-70, -70, 140, 140);
            break;
        case 3: // 三角形
            ctx.beginPath();
            ctx.moveTo(0, -90);
            ctx.lineTo(-80, 80);
            ctx.lineTo(80, 80);
            ctx.closePath();
            ctx.fill();
            break;
        case 4: // 楕円
            ctx.beginPath();
            ctx.ellipse(0, 0, 90, 70, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 5: // ひし形
            ctx.beginPath();
            ctx.moveTo(0, -90);
            ctx.lineTo(70, 0);
            ctx.lineTo(0, 90);
            ctx.lineTo(-70, 0);
            ctx.closePath();
            ctx.fill();
            break;
    }
    
    ctx.restore();
}

// 目を描画
function drawEyes(ctx, eyeNum) {
    ctx.fillStyle = '#333';
    ctx.save();
    ctx.translate(200, 200);
    
    switch (eyeNum) {
        case 1: // 丸い目
            ctx.beginPath();
            ctx.arc(-30, 0, 8, 0, Math.PI * 2);
            ctx.arc(30, 0, 8, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 2: // つり目
            ctx.beginPath();
            ctx.moveTo(-40, 0);
            ctx.lineTo(-20, -5);
            ctx.lineTo(-20, 5);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(40, 0);
            ctx.lineTo(20, -5);
            ctx.lineTo(20, 5);
            ctx.closePath();
            ctx.fill();
            break;
        case 3: // 大きい目
            ctx.beginPath();
            ctx.arc(-30, 0, 12, 0, Math.PI * 2);
            ctx.arc(30, 0, 12, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 4: // 点の目
            ctx.beginPath();
            ctx.arc(-30, 0, 4, 0, Math.PI * 2);
            ctx.arc(30, 0, 4, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 5: // X目
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#333';
            ctx.beginPath();
            ctx.moveTo(-35, -5);
            ctx.lineTo(-25, 5);
            ctx.moveTo(-25, -5);
            ctx.lineTo(-35, 5);
            ctx.moveTo(25, -5);
            ctx.lineTo(35, 5);
            ctx.moveTo(35, -5);
            ctx.lineTo(25, 5);
            ctx.stroke();
            break;
    }
    
    ctx.restore();
}

// 口を描画
function drawMouth(ctx, mouthNum) {
    ctx.save();
    ctx.translate(200, 240);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    switch (mouthNum) {
        case 1: // 笑顔
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI);
            ctx.stroke();
            break;
        case 2: // 直線
            ctx.beginPath();
            ctx.moveTo(-30, 0);
            ctx.lineTo(30, 0);
            ctx.stroke();
            break;
        case 3: // 悲しい
            ctx.beginPath();
            ctx.arc(0, 20, 30, Math.PI, 0);
            ctx.stroke();
            break;
        case 4: // O形
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 5: // ニヤリ
            ctx.beginPath();
            ctx.moveTo(-30, -5);
            ctx.quadraticCurveTo(0, 10, 30, -5);
            ctx.stroke();
            break;
    }
    
    ctx.restore();
}

// アイテムを描画
function drawItem(ctx, itemNum) {
    ctx.save();
    ctx.translate(200, 120);
    
    switch (itemNum) {
        case 1: // 王冠
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.moveTo(-40, 0);
            ctx.lineTo(-30, -30);
            ctx.lineTo(-10, -10);
            ctx.lineTo(0, -35);
            ctx.lineTo(10, -10);
            ctx.lineTo(30, -30);
            ctx.lineTo(40, 0);
            ctx.closePath();
            ctx.fill();
            break;
        case 2: // 帽子
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(-50, -10, 100, 15);
            ctx.fillRect(-35, -40, 70, 30);
            break;
        case 3: // リボン
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.arc(-25, 0, 15, 0, Math.PI * 2);
            ctx.arc(25, 0, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(-10, -5, 20, 10);
            break;
        case 4: // 星
            ctx.fillStyle = '#FFD700';
            drawStar(ctx, 0, -20, 5, 20, 10);
            break;
        case 5: // 眼鏡
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(-25, 80, 18, 0, Math.PI * 2);
            ctx.arc(25, 80, 18, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-7, 80);
            ctx.lineTo(7, 80);
            ctx.stroke();
            break;
    }
    
    ctx.restore();
}

// 星を描画するヘルパー関数
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

// PNG保存
function downloadCharacter() {
    const canvas = document.getElementById('character-canvas');
    const link = document.createElement('a');
    link.download = `lol-character-${currentGeneratedCharacter.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// キャンバスに右クリック保存のヒントを追加
function setupCanvasSaveHint() {
    const canvas = document.getElementById('character-canvas');
    if (!canvas) return;
    
    // タッチデバイス用：長押しで保存可能にする
    let touchTimer;
    canvas.addEventListener('touchstart', (e) => {
        touchTimer = setTimeout(() => {
            // 長押し時のヒント表示
            const info = document.getElementById('generation-info');
            if (info) {
                info.textContent = '画像を長押しして保存できます 📥';
                setTimeout(() => {
                    info.textContent = '';
                }, 3000);
            }
        }, 500);
    });
    
    canvas.addEventListener('touchend', () => {
        clearTimeout(touchTimer);
    });
    
    // PC用：右クリックで保存可能
    canvas.addEventListener('contextmenu', (e) => {
        // 右クリックメニューを許可（デフォルト動作）
        const info = document.getElementById('generation-info');
        if (info) {
            info.textContent = '右クリックで画像を保存できます 📥';
            setTimeout(() => {
                info.textContent = '';
            }, 3000);
        }
    });
}

// コレクションに保存
function saveToCollection() {
    if (!currentGeneratedCharacter) {
        alert('キャラクターが生成されていません。');
        return;
    }
    
    // 既に保存済みか確認
    const exists = gameData.unlockedCharacters.some(char => char.id === currentGeneratedCharacter.id);
    
    if (exists) {
        alert('このキャラクターは既にコレクションに保存されています。');
    } else {
        gameData.unlockedCharacters.push(currentGeneratedCharacter);
        saveGameData();
        alert('コレクションに保存しました！');
        updateUI();
    }
}

// ===================================
// コレクション機能
// ===================================

function showCollection() {
    showScreen('collection-screen');
    
    const grid = document.getElementById('collection-grid');
    const empty = document.getElementById('collection-empty');
    const totalEl = document.getElementById('collection-total');
    const percentageEl = document.getElementById('collection-percentage');
    
    // 統計更新（総数を2500に修正）
    totalEl.textContent = gameData.unlockedCharacters.length;
    const percentage = (gameData.unlockedCharacters.length / 2500 * 100).toFixed(2);
    percentageEl.textContent = percentage;
    
    // レアリティ別統計を表示
    displayRarityStats();
    
    // シェアボタンを追加
    addShareButtonsToCollection();
    
    // レアリティ別カウント
    const rarityCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    gameData.unlockedCharacters.forEach(char => {
        const rarity = char.rarity || 1;
        rarityCounts[rarity]++;
    });
    
    const shareData = {
        collectionCount: gameData.unlockedCharacters.length,
        totalPossible: 2500,
        percentage: percentage,
        rarity5: rarityCounts[5],
        rarity4: rarityCounts[4],
        rarity3: rarityCounts[3],
        rarity2: rarityCounts[2],
        rarity1: rarityCounts[1]
    };
    createShareButtons('collection-share-container', 'collection', shareData);
    
    if (gameData.unlockedCharacters.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        empty.style.display = 'none';
        
        // レアリティ順にソート（高→低）
        const sortedCharacters = [...gameData.unlockedCharacters].sort((a, b) => {
            return (b.rarity || 1) - (a.rarity || 1);
        });
        
        // コレクション表示
        grid.innerHTML = '';
        sortedCharacters.forEach((character, index) => {
            const item = document.createElement('div');
            item.className = `collection-item rarity-${character.rarity || 1}`;
            item.onclick = () => showCharacterModal(character);
            
            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 200;
            canvas.id = `collection-canvas-${index}`;
            
            const info = document.createElement('div');
            info.className = 'collection-item-info';
            
            // レアリティ表示
            const raritySpan = document.createElement('span');
            raritySpan.className = 'collection-rarity';
            raritySpan.textContent = '★'.repeat(character.rarity || 1);
            
            // 日付表示
            const date = new Date(character.createdAt);
            const dateSpan = document.createElement('span');
            dateSpan.textContent = date.toLocaleDateString('ja-JP');
            
            info.appendChild(raritySpan);
            info.appendChild(document.createElement('br'));
            info.appendChild(dateSpan);
            
            item.appendChild(canvas);
            item.appendChild(info);
            grid.appendChild(item);
            
            // キャンバスに描画
            setTimeout(() => {
                drawCharacter(canvas.id, character.id, character.rarity || 1);
            }, index * 50); // 順次描画でパフォーマンス向上
        });
    }
}

// レアリティ別統計を表示
function displayRarityStats() {
    let statsContainer = document.getElementById('rarity-stats-container');
    if (!statsContainer) {
        const collectionScreen = document.getElementById('collection-screen');
        const container = collectionScreen.querySelector('.container');
        statsContainer = document.createElement('div');
        statsContainer.id = 'rarity-stats-container';
        statsContainer.className = 'rarity-stats';
        // collection-gridの前に挿入
        const grid = document.getElementById('collection-grid');
        container.insertBefore(statsContainer, grid);
    }
    
    // レアリティ別カウント
    const rarityCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    gameData.unlockedCharacters.forEach(char => {
        const rarity = char.rarity || 1;
        rarityCounts[rarity]++;
    });
    
    // 表示
    statsContainer.innerHTML = '';
    [5, 4, 3, 2, 1].forEach(rarity => {
        const item = document.createElement('div');
        item.className = 'rarity-stat-item';
        
        const label = document.createElement('div');
        label.className = 'rarity-stat-label';
        label.textContent = '★'.repeat(rarity);
        
        const value = document.createElement('div');
        value.className = 'rarity-stat-value';
        value.textContent = rarityCounts[rarity];
        value.style.color = getRarityColor(rarity);
        
        item.appendChild(label);
        item.appendChild(value);
        statsContainer.appendChild(item);
    });
}

// レアリティ色取得
function getRarityColor(rarity) {
    const colors = {
        1: '#A9A9A9',
        2: '#32CD32',
        3: '#0095FF',
        4: '#BA55D3',
        5: '#FFD700'
    };
    return colors[rarity] || '#A9A9A9';
}

function drawCharacterOnCanvas(ctx, canvas, combinationId) {
    // 背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#E0F7FA');
    gradient.addColorStop(1, '#80DEEA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // キャラクター描画（スケール調整）
    const scale = canvas.width / 400;
    ctx.save();
    ctx.scale(scale, scale);
    
    const parts = combinationId.split('_');
    const bodyNum = parseInt(parts[0].replace('body', ''));
    const eyeNum = parseInt(parts[1].replace('eye', ''));
    const mouthNum = parseInt(parts[2].replace('mouth', ''));
    const itemNum = parseInt(parts[3].replace('item', ''));
    
    // 各パーツを描画（座標調整）
    drawBodyScaled(ctx, bodyNum, 200, 220);
    drawEyesScaled(ctx, eyeNum, 200, 200);
    drawMouthScaled(ctx, mouthNum, 200, 240);
    drawItemScaled(ctx, itemNum, 200, 120);
    
    ctx.restore();
}

// スケール調整版の描画関数（簡易版）
function drawBodyScaled(ctx, bodyNum, cx, cy) {
    const bodyType = Math.ceil(bodyNum / 5);
    const colorVariant = (bodyNum - 1) % 5;
    
    const colors = [
        ['#FF6B6B', '#FF8E8E'],
        ['#4ECDC4', '#6FE7DE'],
        ['#FFE66D', '#FFED8F'],
        ['#A8E6CF', '#C4F0E0'],
        ['#FF9A8B', '#FFB0A3']
    ];
    
    const [color1, color2] = colors[colorVariant];
    const gradient = ctx.createLinearGradient(cx - 80, cy - 80, cx + 80, cy + 80);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    
    ctx.save();
    ctx.translate(cx, cy);
    
    switch (bodyType) {
        case 1:
            ctx.beginPath();
            ctx.arc(0, 0, 80, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 2:
            ctx.fillRect(-70, -70, 140, 140);
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(0, -90);
            ctx.lineTo(-80, 80);
            ctx.lineTo(80, 80);
            ctx.closePath();
            ctx.fill();
            break;
        case 4:
            ctx.beginPath();
            ctx.ellipse(0, 0, 90, 70, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(0, -90);
            ctx.lineTo(70, 0);
            ctx.lineTo(0, 90);
            ctx.lineTo(-70, 0);
            ctx.closePath();
            ctx.fill();
            break;
    }
    
    ctx.restore();
}

function drawEyesScaled(ctx, eyeNum, cx, cy) {
    ctx.fillStyle = '#333';
    ctx.save();
    ctx.translate(cx, cy);
    
    switch (eyeNum) {
        case 1:
            ctx.beginPath();
            ctx.arc(-30, 0, 8, 0, Math.PI * 2);
            ctx.arc(30, 0, 8, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(-40, 0);
            ctx.lineTo(-20, -5);
            ctx.lineTo(-20, 5);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(40, 0);
            ctx.lineTo(20, -5);
            ctx.lineTo(20, 5);
            ctx.closePath();
            ctx.fill();
            break;
        case 3:
            ctx.beginPath();
            ctx.arc(-30, 0, 12, 0, Math.PI * 2);
            ctx.arc(30, 0, 12, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 4:
            ctx.beginPath();
            ctx.arc(-30, 0, 4, 0, Math.PI * 2);
            ctx.arc(30, 0, 4, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 5:
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#333';
            ctx.beginPath();
            ctx.moveTo(-35, -5);
            ctx.lineTo(-25, 5);
            ctx.moveTo(-25, -5);
            ctx.lineTo(-35, 5);
            ctx.moveTo(25, -5);
            ctx.lineTo(35, 5);
            ctx.moveTo(35, -5);
            ctx.lineTo(25, 5);
            ctx.stroke();
            break;
    }
    
    ctx.restore();
}

function drawMouthScaled(ctx, mouthNum, cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    switch (mouthNum) {
        case 1:
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(-30, 0);
            ctx.lineTo(30, 0);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.arc(0, 20, 30, Math.PI, 0);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(-30, -5);
            ctx.quadraticCurveTo(0, 10, 30, -5);
            ctx.stroke();
            break;
    }
    
    ctx.restore();
}

function drawItemScaled(ctx, itemNum, cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);
    
    switch (itemNum) {
        case 1:
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.moveTo(-40, 0);
            ctx.lineTo(-30, -30);
            ctx.lineTo(-10, -10);
            ctx.lineTo(0, -35);
            ctx.lineTo(10, -10);
            ctx.lineTo(30, -30);
            ctx.lineTo(40, 0);
            ctx.closePath();
            ctx.fill();
            break;
        case 2:
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(-50, -10, 100, 15);
            ctx.fillRect(-35, -40, 70, 30);
            break;
        case 3:
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.arc(-25, 0, 15, 0, Math.PI * 2);
            ctx.arc(25, 0, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(-10, -5, 20, 10);
            break;
        case 4:
            ctx.fillStyle = '#FFD700';
            drawStar(ctx, 0, -20, 5, 20, 10);
            break;
        case 5:
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(-25, 80, 18, 0, Math.PI * 2);
            ctx.arc(25, 80, 18, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-7, 80);
            ctx.lineTo(7, 80);
            ctx.stroke();
            break;
    }
    
    ctx.restore();
}

// ===================================
// モーダル機能
// ===================================

let currentModalCharacter = null;

function showCharacterModal(character) {
    currentModalCharacter = character;
    const modal = document.getElementById('character-modal');
    modal.classList.add('active');
    
    // モーダルキャンバスに描画
    const canvas = document.getElementById('modal-canvas');
    const ctx = canvas.getContext('2d');
    drawCharacter('modal-canvas', character.id);
    
    // 情報表示
    document.getElementById('modal-character-id').textContent = `ID: ${character.id}`;
    const date = new Date(character.createdAt);
    document.getElementById('modal-character-date').textContent = `作成日: ${date.toLocaleString('ja-JP')}`;
}

function closeModal() {
    const modal = document.getElementById('character-modal');
    modal.classList.remove('active');
    currentModalCharacter = null;
}

function downloadModalCharacter() {
    if (!currentModalCharacter) return;
    
    const canvas = document.getElementById('modal-canvas');
    const link = document.createElement('a');
    link.download = `lol-character-${currentModalCharacter.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}
