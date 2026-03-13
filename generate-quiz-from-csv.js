// ========================================
// CSVからクイズ問題を生成するスクリプト
// ========================================

const fs = require('fs');

// チャンピオン名の多言語対応マッピング
const championTranslations = {
    "Aatrox": { ja: "エイトロックス", en: "Aatrox", ko: "아트록스", zh: "亚托克斯" },
    "Ahri": { ja: "アーリ", en: "Ahri", ko: "아리", zh: "阿狸" },
    "Akali": { ja: "アカリ", en: "Akali", ko: "아칼리", zh: "阿卡丽" },
    "Akshan": { ja: "アクシャン", en: "Akshan", ko: "아크샨", zh: "阿克尚" },
    "Alistar": { ja: "アリスター", en: "Alistar", ko: "알리스타", zh: "阿利斯塔" },
    "Amumu": { ja: "アムム", en: "Amumu", ko: "아무무", zh: "阿木木" },
    "Anivia": { ja: "アニビア", en: "Anivia", ko: "애니비아", zh: "艾尼维亚" },
    "Annie": { ja: "アニー", en: "Annie", ko: "애니", zh: "安妮" },
    "Aphelios": { ja: "アフェリオス", en: "Aphelios", ko: "아펠리오스", zh: "厄斐琉斯" },
    "Ashe": { ja: "アッシュ", en: "Ashe", ko: "애쉬", zh: "艾希" },
    "Aurelion Sol": { ja: "オレリオン・ソル", en: "Aurelion Sol", ko: "아우렐리온 솔", zh: "奥瑞利安·索尔" },
    "Azir": { ja: "アジール", en: "Azir", ko: "아지르", zh: "阿兹尔" },
    "Bard": { ja: "バード", en: "Bard", ko: "바드", zh: "巴德" },
    "Bel'Veth": { ja: "ベル＝ヴェス", en: "Bel'Veth", ko: "벨베스", zh: "贝蕾娅" },
    "Blitzcrank": { ja: "ブリッツクランク", en: "Blitzcrank", ko: "블리츠크랭크", zh: "布里茨" },
    "Brand": { ja: "ブランド", en: "Brand", ko: "브랜드", zh: "布兰德" },
    "Braum": { ja: "ブラウム", en: "Braum", ko: "브라움", zh: "布隆" },
    "Briar": { ja: "ブライアー", en: "Briar", ko: "브라이어", zh: "贝蕾亚" },
    "Caitlyn": { ja: "ケイトリン", en: "Caitlyn", ko: "케이틀린", zh: "凯特琳" },
    "Camille": { ja: "カミール", en: "Camille", ko: "카밀", zh: "卡蜜尔" },
    "Cassiopeia": { ja: "カシオペア", en: "Cassiopeia", ko: "카시오페아", zh: "卡西奥佩娅" },
    "Cho'Gath": { ja: "チョ＝ガス", en: "Cho'Gath", ko: "초가스", zh: "科加斯" },
    "Corki": { ja: "コーキ", en: "Corki", ko: "코르키", zh: "库奇" },
    "Darius": { ja: "ダリウス", en: "Darius", ko: "다리우스", zh: "德莱厄斯" },
    "Diana": { ja: "ダイアナ", en: "Diana", ko: "다이애나", zh: "黛安娜" },
    "Draven": { ja: "ドレイヴン", en: "Draven", ko: "드레이븐", zh: "德莱文" },
    "Dr. Mundo": { ja: "ドクター・ムンド", en: "Dr. Mundo", ko: "문도 박사", zh: "蒙多医生" },
    "Ekko": { ja: "エコー", en: "Ekko", ko: "에코", zh: "艾克" },
    "Elise": { ja: "エリス", en: "Elise", ko: "엘리스", zh: "伊莉丝" },
    "Evelynn": { ja: "イブリン", en: "Evelynn", ko: "이블린", zh: "伊芙琳" },
    "Ezreal": { ja: "エズリアル", en: "Ezreal", ko: "이즈리얼", zh: "伊泽瑞尔" },
    "Fiddlesticks": { ja: "フィドルスティックス", en: "Fiddlesticks", ko: "피들스틱", zh: "费德提克" },
    "Fiora": { ja: "フィオラ", en: "Fiora", ko: "피오라", zh: "菲奥娜" },
    "Fizz": { ja: "フィズ", en: "Fizz", ko: "피즈", zh: "菲兹" },
    "Galio": { ja: "ガリオ", en: "Galio", ko: "갈리오", zh: "加里奥" },
    "Gangplank": { ja: "ガングプランク", en: "Gangplank", ko: "갱플랭크", zh: "普朗克" },
    "Garen": { ja: "ガレン", en: "Garen", ko: "가렌", zh: "盖伦" },
    "Gnar": { ja: "ナー", en: "Gnar", ko: "나르", zh: "纳尔" },
    "Gragas": { ja: "グラガス", en: "Gragas", ko: "그라가스", zh: "古拉加斯" },
    "Graves": { ja: "グレイブス", en: "Graves", ko: "그레이브즈", zh: "格雷福斯" },
    "Gwen": { ja: "グウェン", en: "Gwen", ko: "그웬", zh: "格温" },
    "Hecarim": { ja: "ヘカリム", en: "Hecarim", ko: "헤카림", zh: "赫卡里姆" },
    "Heimerdinger": { ja: "ハイマーディンガー", en: "Heimerdinger", ko: "하이머딩거", zh: "黑默丁格" },
    "Hwei": { ja: "フェイ", en: "Hwei", ko: "흐웨이", zh: "彗" },
    "Illaoi": { ja: "イラオイ", en: "Illaoi", ko: "일라오이", zh: "俄洛伊" },
    "Irelia": { ja: "イレリア", en: "Irelia", ko: "이렐리아", zh: "艾瑞莉娅" },
    "Ivern": { ja: "アイバーン", en: "Ivern", ko: "아이번", zh: "艾翁" },
    "Janna": { ja: "ジャンナ", en: "Janna", ko: "잔나", zh: "迦娜" },
    "Jarvan IV": { ja: "ジャーヴァンⅣ", en: "Jarvan IV", ko: "자르반 4세", zh: "嘉文四世" },
    "Jax": { ja: "ジャックス", en: "Jax", ko: "잭스", zh: "贾克斯" },
    "Jayce": { ja: "ジェイス", en: "Jayce", ko: "제이스", zh: "杰斯" },
    "Jhin": { ja: "ジン", en: "Jhin", ko: "진", zh: "烬" },
    "Jinx": { ja: "ジンクス", en: "Jinx", ko: "징크스", zh: "金克丝" },
    "K'Sante": { ja: "クサンテ", en: "K'Sante", ko: "크산테", zh: "奎桑提" },
    "Kai'Sa": { ja: "カイ＝サ", en: "Kai'Sa", ko: "카이사", zh: "卡莎" },
    "Kalista": { ja: "カリスタ", en: "Kalista", ko: "칼리스타", zh: "卡莉丝塔" },
    "Karma": { ja: "カルマ", en: "Karma", ko: "카르마", zh: "卡尔玛" },
    "Karthus": { ja: "カーサス", en: "Karthus", ko: "카서스", zh: "卡尔萨斯" },
    "Kassadin": { ja: "カサディン", en: "Kassadin", ko: "카사딘", zh: "卡萨丁" },
    "Katarina": { ja: "カタリナ", en: "Katarina", ko: "카타리나", zh: "卡特琳娜" },
    "Kayle": { ja: "ケイル", en: "Kayle", ko: "케일", zh: "凯尔" },
    "Kayn": { ja: "ケイン", en: "Kayn", ko: "케인", zh: "凯隐" },
    "Kennen": { ja: "ケネン", en: "Kennen", ko: "케넨", zh: "凯南" },
    "Kha'Zix": { ja: "カ＝ジックス", en: "Kha'Zix", ko: "카직스", zh: "卡兹克" },
    "Kindred": { ja: "キンドレッド", en: "Kindred", ko: "킨드레드", zh: "千珏" },
    "Kled": { ja: "クレッド", en: "Kled", ko: "클레드", zh: "克烈" },
    "Kog'Maw": { ja: "コグ＝マウ", en: "Kog'Maw", ko: "코그모", zh: "克格莫" },
    "LeBlanc": { ja: "ルブラン", en: "LeBlanc", ko: "르블랑", zh: "乐芙兰" },
    "Lee Sin": { ja: "リー・シン", en: "Lee Sin", ko: "리 신", zh: "李青" },
    "Leona": { ja: "レオナ", en: "Leona", ko: "레오나", zh: "蕾欧娜" },
    "Lillia": { ja: "リリア", en: "Lillia", ko: "릴리아", zh: "莉莉娅" },
    "Lissandra": { ja: "リサンドラ", en: "Lissandra", ko: "리산드라", zh: "丽桑卓" },
    "Lucian": { ja: "ルシアン", en: "Lucian", ko: "루시안", zh: "卢锡安" },
    "Lulu": { ja: "ルル", en: "Lulu", ko: "룰루", zh: "璐璐" },
    "Lux": { ja: "ラックス", en: "Lux", ko: "럭스", zh: "拉克丝" },
    "Malphite": { ja: "マルファイト", en: "Malphite", ko: "말파이트", zh: "墨菲特" },
    "Malzahar": { ja: "マルザハール", en: "Malzahar", ko: "말자하", zh: "玛尔扎哈" },
    "Maokai": { ja: "マオカイ", en: "Maokai", ko: "마오카이", zh: "茂凯" },
    "Master Yi": { ja: "マスター・イー", en: "Master Yi", ko: "마스터 이", zh: "易" },
    "Milio": { ja: "ミリオ", en: "Milio", ko: "밀리오", zh: "米利欧" },
    "Miss Fortune": { ja: "ミス・フォーチュン", en: "Miss Fortune", ko: "미스 포츈", zh: "厄运小姐" },
    "Mordekaiser": { ja: "モルデカイザー", en: "Mordekaiser", ko: "모데카이저", zh: "莫德凯撒" },
    "Morgana": { ja: "モルガナ", en: "Morgana", ko: "모르가나", zh: "莫甘娜" },
    "Naafiri": { ja: "ナフィーリ", en: "Naafiri", ko: "나피리", zh: "纳亚菲利" },
    "Nami": { ja: "ナミ", en: "Nami", ko: "나미", zh: "娜美" },
    "Nasus": { ja: "ナサス", en: "Nasus", ko: "나서스", zh: "内瑟斯" },
    "Nautilus": { ja: "ノーチラス", en: "Nautilus", ko: "노틸러스", zh: "诺提勒斯" },
    "Neeko": { ja: "ニーコ", en: "Neeko", ko: "니코", zh: "妮蔻" },
    "Nidalee": { ja: "ニダリー", en: "Nidalee", ko: "니달리", zh: "奈德丽" },
    "Nilah": { ja: "ニーラ", en: "Nilah", ko: "닐라", zh: "尼菈" },
    "Nocturne": { ja: "ノクターン", en: "Nocturne", ko: "녹턴", zh: "魔腾" },
    "Nunu & Willump": { ja: "ヌヌ＆ウィルンプ", en: "Nunu & Willump", ko: "누누와 윌럼프", zh: "努努和威朗普" },
    "Olaf": { ja: "オラフ", en: "Olaf", ko: "올라프", zh: "奥拉夫" },
    "Orianna": { ja: "オリアナ", en: "Orianna", ko: "오리아나", zh: "奥莉安娜" },
    "Ornn": { ja: "オーン", en: "Ornn", ko: "오른", zh: "奥恩" },
    "Pantheon": { ja: "パンテオン", en: "Pantheon", ko: "판테온", zh: "潘森" },
    "Poppy": { ja: "ポッピー", en: "Poppy", ko: "뽀삐", zh: "波比" },
    "Pyke": { ja: "パイク", en: "Pyke", ko: "파이크", zh: "派克" },
    "Qiyana": { ja: "キヤナ", en: "Qiyana", ko: "키아나", zh: "奇亚娜" },
    "Quinn": { ja: "クイン", en: "Quinn", ko: "퀸", zh: "奎因" },
    "Rakan": { ja: "ラカン", en: "Rakan", ko: "라칸", zh: "洛" },
    "Rammus": { ja: "ラムス", en: "Rammus", ko: "람머스", zh: "拉莫斯" },
    "Rek'Sai": { ja: "レク＝サイ", en: "Rek'Sai", ko: "렉사이", zh: "雷克塞" },
    "Rell": { ja: "レル", en: "Rell", ko: "렐", zh: "芮尔" },
    "Renata Glasc": { ja: "レナータ・グラスク", en: "Renata Glasc", ko: "레나타 글라스크", zh: "烬娜塔·戈拉斯克" },
    "Renekton": { ja: "レネクトン", en: "Renekton", ko: "레넥톤", zh: "鳄鱼" },
    "Rengar": { ja: "レンガー", en: "Rengar", ko: "렝가", zh: "雷恩加尔" },
    "Riven": { ja: "リヴェン", en: "Riven", ko: "리븐", zh: "锐雯" },
    "Rumble": { ja: "ランブル", en: "Rumble", ko: "럼블", zh: "兰博" },
    "Ryze": { ja: "ライズ", en: "Ryze", ko: "라이즈", zh: "瑞兹" },
    "Samira": { ja: "サミーラ", en: "Samira", ko: "사미라", zh: "莎弥拉" },
    "Sejuani": { ja: "セジュアニ", en: "Sejuani", ko: "세주아니", zh: "瑟庄妮" },
    "Senna": { ja: "セナ", en: "Senna", ko: "세나", zh: "赛娜" },
    "Seraphine": { ja: "セラフィーン", en: "Seraphine", ko: "세라핀", zh: "萨勒芬妮" },
    "Sett": { ja: "セト", en: "Sett", ko: "세트", zh: "瑟提" },
    "Shaco": { ja: "シャコ", en: "Shaco", ko: "샤코", zh: "萨科" },
    "Shen": { ja: "シェン", en: "Shen", ko: "쉔", zh: "慎" },
    "Shyvana": { ja: "シヴァーナ", en: "Shyvana", ko: "쉬바나", zh: "希瓦娜" },
    "Singed": { ja: "シンジド", en: "Singed", ko: "신지드", zh: "辛吉德" },
    "Sion": { ja: "サイオン", en: "Sion", ko: "사이온", zh: "赛恩" },
    "Sivir": { ja: "シヴィア", en: "Sivir", ko: "시비르", zh: "希维尔" },
    "Skarner": { ja: "スカーナー", en: "Skarner", ko: "스카너", zh: "斯卡纳" },
    "Smolder": { ja: "スモルダー", en: "Smolder", ko: "스몰더", zh: "斯莫德" },
    "Sona": { ja: "ソナ", en: "Sona", ko: "소나", zh: "娑娜" },
    "Soraka": { ja: "ソラカ", en: "Soraka", ko: "소라카", zh: "索拉卡" },
    "Swain": { ja: "スウェイン", en: "Swain", ko: "스웨인", zh: "斯维因" },
    "Sylas": { ja: "サイラス", en: "Sylas", ko: "사일러스", zh: "塞拉斯" },
    "Syndra": { ja: "シンドラ", en: "Syndra", ko: "신드라", zh: "辛德拉" },
    "Tahm Kench": { ja: "タム・ケンチ", en: "Tahm Kench", ko: "탐 켄치", zh: "塔姆" },
    "Taliyah": { ja: "タリヤ", en: "Taliyah", ko: "탈리야", zh: "塔莉垭" },
    "Talon": { ja: "タロン", en: "Talon", ko: "탈론", zh: "泰隆" },
    "Taric": { ja: "タリック", en: "Taric", ko: "타릭", zh: "塔里克" },
    "Teemo": { ja: "ティーモ", en: "Teemo", ko: "티모", zh: "提莫" },
    "Thresh": { ja: "スレッシュ", en: "Thresh", ko: "쓰레쉬", zh: "锤石" },
    "Tristana": { ja: "トリスターナ", en: "Tristana", ko: "트리스타나", zh: "崔丝塔娜" },
    "Trundle": { ja: "トランドル", en: "Trundle", ko: "트런들", zh: "特朗德尔" },
    "Tryndamere": { ja: "トリンダメア", en: "Tryndamere", ko: "트린다미어", zh: "泰达米尔" },
    "Twisted Fate": { ja: "ツイステッド・フェイト", en: "Twisted Fate", ko: "트위스티드 페이트", zh: "崔斯特" },
    "Twitch": { ja: "トゥイッチ", en: "Twitch", ko: "트위치", zh: "图奇" },
    "Udyr": { ja: "ウディア", en: "Udyr", ko: "우디르", zh: "乌迪尔" },
    "Urgot": { ja: "アーゴット", en: "Urgot", ko: "우르곳", zh: "厄加特" },
    "Varus": { ja: "ヴァルス", en: "Varus", ko: "바루스", zh: "韦鲁斯" },
    "Vayne": { ja: "ヴェイン", en: "Vayne", ko: "베인", zh: "薇恩" },
    "Veigar": { ja: "ベイガー", en: "Veigar", ko: "베이가", zh: "维迦" },
    "Vel'Koz": { ja: "ヴェル＝コズ", en: "Vel'Koz", ko: "벨코즈", zh: "维克兹" },
    "Vex": { ja: "ヴェックス", en: "Vex", ko: "벡스", zh: "薇古丝" },
    "Vi": { ja: "ヴァイ", en: "Vi", ko: "바이", zh: "蔚" },
    "Viego": { ja: "ヴィエゴ", en: "Viego", ko: "비에고", zh: "佛耶戈" },
    "Viktor": { ja: "ビクター", en: "Viktor", ko: "빅토르", zh: "维克托" },
    "Vladimir": { ja: "ブラッドミア", en: "Vladimir", ko: "블라디미르", zh: "弗拉基米尔" },
    "Volibear": { ja: "ボリベア", en: "Volibear", ko: "볼리베어", zh: "沃利贝尔" },
    "Warwick": { ja: "ワーウィック", en: "Warwick", ko: "워윅", zh: "沃里克" },
    "Wukong": { ja: "ウーコン", en: "Wukong", ko: "오공", zh: "悟空" },
    "Xayah": { ja: "ザヤ", en: "Xayah", ko: "자야", zh: "霞" },
    "Xerath": { ja: "ゼラス", en: "Xerath", ko: "제라스", zh: "泽拉斯" },
    "Xin Zhao": { ja: "シン・ジャオ", en: "Xin Zhao", ko: "신 짜오", zh: "赵信" },
    "Yasuo": { ja: "ヤスオ", en: "Yasuo", ko: "야스오", zh: "亚索" },
    "Yone": { ja: "ヨネ", en: "Yone", ko: "요네", zh: "永恩" },
    "Yorick": { ja: "ヨリック", en: "Yorick", ko: "요릭", zh: "约里克" },
    "Yuumi": { ja: "ユーミ", en: "Yuumi", ko: "유미", zh: "悠米" },
    "Zac": { ja: "ザック", en: "Zac", ko: "자크", zh: "扎克" },
    "Zed": { ja: "ゼド", en: "Zed", ko: "제드", zh: "劫" },
    "Zeri": { ja: "ゼリ", en: "Zeri", ko: "제리", zh: "泽丽" },
    "Ziggs": { ja: "ジグス", en: "Ziggs", ko: "직스", zh: "吉格斯" },
    "Zilean": { ja: "ジリアン", en: "Zilean", ko: "질리언", zh: "基兰" },
    "Zoe": { ja: "ゾーイ", en: "Zoe", ko: "조이", zh: "佐伊" },
    "Zyra": { ja: "ザイラ", en: "Zyra", ko: "자이라", zh: "婕拉" }
};

// CSVを読み込んでクイズデータを生成
function generateQuizFromCSV(csvPath, startId = 111, maxQuestions = 190) {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    
    // ヘッダーをスキップ
    const dataLines = lines.slice(1);
    
    // チャンピオンごとにセリフをグループ化
    const championVoiceLines = {};
    
    dataLines.forEach(line => {
        if (!line.trim()) return;
        
        const match = line.match(/^([^,]+),"([^"]+)",(TRUE|FALSE)$/);
        if (!match) return;
        
        const [, champion, voiceLine, isSpoken] = match;
        
        // 実際に話されているセリフのみを対象
        if (isSpoken !== 'TRUE') return;
        
        // 汎用的すぎるセリフを除外
        const genericPhrases = [
            'laughs', 'chuckles', 'giggles', 'groans', 'grunts', 'sighs',
            'gasps', 'roars', 'snarls', 'yells', 'cries', 'shouts',
            'huffs', 'hums', 'growls', 'dances', 'plays'
        ];
        
        const isGeneric = genericPhrases.some(phrase => 
            voiceLine.toLowerCase().includes(champion.toLowerCase() + ' ' + phrase)
        );
        
        if (isGeneric) return;
        
        // 短すぎるセリフを除外（5文字以下）
        if (voiceLine.length < 6) return;
        
        if (!championVoiceLines[champion]) {
            championVoiceLines[champion] = [];
        }
        
        championVoiceLines[champion].push(voiceLine);
    });
    
    // クイズ問題を生成
    const questions = [];
    const championList = Object.keys(championVoiceLines).filter(champ => 
        championTranslations[champ] && championVoiceLines[champ].length > 0
    );
    
    let questionId = startId;
    
    for (const champion of championList) {
        if (questions.length >= maxQuestions) break;
        
        const voiceLines = championVoiceLines[champion];
        
        // 各チャンピオンから最大2つのセリフを問題化
        const selectedLines = voiceLines.slice(0, Math.min(2, voiceLines.length));
        
        for (const voiceLine of selectedLines) {
            if (questions.length >= maxQuestions) break;
            
            // 正解チャンピオンの翻訳
            const correctChampion = championTranslations[champion];
            
            // 不正解の選択肢を3つ選ぶ
            const otherChampions = championList.filter(c => c !== champion);
            const shuffled = otherChampions.sort(() => Math.random() - 0.5);
            const wrongChoices = shuffled.slice(0, 3).map(c => championTranslations[c]);
            
            // 選択肢をシャッフル
            const allChoices = [correctChampion, ...wrongChoices].sort(() => Math.random() - 0.5);
            
            // 正解のインデックスを取得
            const answerIndex = allChoices.findIndex(c => c.en === correctChampion.en);
            
            const question = {
                id: questionId++,
                quotes: {
                    ja: voiceLine, // 英語のセリフをそのまま使用（翻訳データがないため）
                    en: voiceLine,
                    ko: voiceLine,
                    zh: voiceLine
                },
                choices: {
                    ja: allChoices.map(c => c.ja),
                    en: allChoices.map(c => c.en),
                    ko: allChoices.map(c => c.ko),
                    zh: allChoices.map(c => c.zh)
                },
                answer: answerIndex
            };
            
            questions.push(question);
        }
    }
    
    return questions;
}

// 使用例
const questions = generateQuizFromCSV('voice_lines.csv', 111, 190);

console.log(`✅ ${questions.length}問のクイズを生成しました`);
console.log('');
console.log('// 以下をlol-quote-quiz.jsの110問目の後に追加:');
console.log(',');
questions.forEach(q => {
    console.log(JSON.stringify(q, null, 4).replace(/\n/g, '\n    ') + ',');
});

// ファイルに出力
fs.writeFileSync('generated-quiz-questions.json', JSON.stringify(questions, null, 2));
console.log('\n✅ generated-quiz-questions.json に保存しました');
