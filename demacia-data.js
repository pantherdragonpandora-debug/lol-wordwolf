// ========================================
// 多言語対応お題データ
// ========================================
// 画像はRiot Games Data Dragon CDN / Community Dragon CDNから取得
// https://ddragon.leagueoflegends.com/
// https://raw.communitydragon.org/

const wordDataI18n = {
  // LOL - チャンピオン（主要な10ペア）
  lol_champions: [
    { 
      ja: { majority: 'ヤスオ', minority: 'ヨネ' },
      en: { majority: 'Yasuo', minority: 'Yone' },
      ko: { majority: '야스오', minority: '요네' },
      zh: { majority: '亚索', minority: '永恩' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Yasuo.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Yone.png'
      }
    },
    { 
      ja: { majority: 'ジンクス', minority: 'ケイトリン' },
      en: { majority: 'Jinx', minority: 'Caitlyn' },
      ko: { majority: '징크스', minority: '케이틀린' },
      zh: { majority: '金克丝', minority: '凯特琳' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Jinx.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Caitlyn.png'
      }
    },
    { 
      ja: { majority: 'ルックス', minority: 'モルガナ' },
      en: { majority: 'Lux', minority: 'Morgana' },
      ko: { majority: '럭스', minority: '모르가나' },
      zh: { majority: '拉克丝', minority: '莫甘娜' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Lux.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Morgana.png'
      }
    },
    { 
      ja: { majority: 'ゼド', minority: 'シェン' },
      en: { majority: 'Zed', minority: 'Shen' },
      ko: { majority: '제드', minority: '쉔' },
      zh: { majority: '劫', minority: '慎' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Zed.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Shen.png'
      }
    },
    { 
      ja: { majority: 'アッシュ', minority: 'セジュアニ' },
      en: { majority: 'Ashe', minority: 'Sejuani' },
      ko: { majority: '애쉬', minority: '세주아니' },
      zh: { majority: '艾希', minority: '瑟庄妮' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Ashe.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Sejuani.png'
      }
    },
    { 
      ja: { majority: 'ガレン', minority: 'ルクス' },
      en: { majority: 'Garen', minority: 'Lux' },
      ko: { majority: '가렌', minority: '럭스' },
      zh: { majority: '盖伦', minority: '拉克丝' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Garen.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Lux.png'
      }
    },
    { 
      ja: { majority: 'アーリ', minority: 'イブリン' },
      en: { majority: 'Ahri', minority: 'Evelynn' },
      ko: { majority: '아리', minority: '이블린' },
      zh: { majority: '阿狸', minority: '伊芙琳' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Ahri.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Evelynn.png'
      }
    },
    { 
      ja: { majority: 'エズリアル', minority: 'ルシアン' },
      en: { majority: 'Ezreal', minority: 'Lucian' },
      ko: { majority: '이즈리얼', minority: '루시안' },
      zh: { majority: '伊泽瑞尔', minority: '卢锡安' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Ezreal.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Lucian.png'
      }
    },
    { 
      ja: { majority: 'ティーモ', minority: 'トリスターナ' },
      en: { majority: 'Teemo', minority: 'Tristana' },
      ko: { majority: '티모', minority: '트리스타나' },
      zh: { majority: '提莫', minority: '崔丝塔娜' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Teemo.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Tristana.png'
      }
    },
    { 
      ja: { majority: 'ソラカ', minority: 'ナミ' },
      en: { majority: 'Soraka', minority: 'Nami' },
      ko: { majority: '소라카', minority: '나미' },
      zh: { majority: '索拉卡', minority: '娜美' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Soraka.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Nami.png'
      }
    }
  ],

  // LOL - アイテム（主要な8ペア）
  lol_items: [
    { 
      ja: { majority: 'インフィニティエッジ', minority: 'ストームレイザー' },
      en: { majority: 'Infinity Edge', minority: 'Stormrazor' },
      ko: { majority: '무한의 대검', minority: '스톰레이저' },
      zh: { majority: '无尽之刃', minority: '岚切' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3031.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3095.png'
      }
    },
    { 
      ja: { majority: 'トリニティフォース', minority: 'ディヴァインサンダラー' },
      en: { majority: 'Trinity Force', minority: 'Divine Sunderer' },
      ko: { majority: '삼위일체', minority: '신성한 파괴자' },
      zh: { majority: '三相之力', minority: '神圣分离者' }
    },
    { 
      ja: { majority: 'ガーディアンエンジェル', minority: 'ジョニャの砂時計' },
      en: { majority: 'Guardian Angel', minority: "Zhonya's Hourglass" },
      ko: { majority: '수호 천사', minority: '존야의 모래시계' },
      zh: { majority: '守护天使', minority: '中娅沙漏' }
    },
    { 
      ja: { majority: 'ブラッドサースター', minority: 'シールドボウ' },
      en: { majority: 'Bloodthirster', minority: 'Immortal Shieldbow' },
      ko: { majority: '피바라기', minority: '불멸의 철갑궁' },
      zh: { majority: '饮血剑', minority: '不朽盾弓' }
    },
    { 
      ja: { majority: 'ラバドンデスキャップ', minority: 'ヴォイドスタッフ' },
      en: { majority: "Rabadon's Deathcap", minority: 'Void Staff' },
      ko: { majority: '라바돈의 죽음모자', minority: '공허의 지팡이' },
      zh: { majority: '灭世者的死亡之帽', minority: '虚空之杖' }
    },
    { 
      ja: { majority: 'ブーツ', minority: 'ベルト' },
      en: { majority: 'Boots', minority: 'Belt' },
      ko: { majority: '신발', minority: '벨트' },
      zh: { majority: '鞋子', minority: '腰带' }
    },
    { 
      ja: { majority: '体力ポーション', minority: 'マナポーション' },
      en: { majority: 'Health Potion', minority: 'Mana Potion' },
      ko: { majority: '체력 물약', minority: '마나 물약' },
      zh: { majority: '生命药水', minority: '法力药水' }
    },
    { 
      ja: { majority: 'ワード', minority: 'コントロールワード' },
      en: { majority: 'Ward', minority: 'Control Ward' },
      ko: { majority: '와드', minority: '제어 와드' },
      zh: { majority: '守卫', minority: '控制守卫' }
    }
  ],

  // LOL - スキル・用語（主要な8ペア）
  lol_skills: [
    { 
      ja: { majority: 'ブリンク', minority: 'ダッシュ' },
      en: { majority: 'Blink', minority: 'Dash' },
      ko: { majority: '점멸', minority: '돌진' },
      zh: { majority: '闪现', minority: '冲刺' }
    },
    { 
      ja: { majority: 'スタン', minority: 'ルート' },
      en: { majority: 'Stun', minority: 'Root' },
      ko: { majority: '기절', minority: '속박' },
      zh: { majority: '眩晕', minority: '定身' }
    },
    { 
      ja: { majority: 'ノックアップ', minority: 'ノックバック' },
      en: { majority: 'Knock Up', minority: 'Knock Back' },
      ko: { majority: '공중 부양', minority: '밀쳐내기' },
      zh: { majority: '击飞', minority: '击退' }
    },
    { 
      ja: { majority: 'シールド', minority: 'バリア' },
      en: { majority: 'Shield', minority: 'Barrier' },
      ko: { majority: '보호막', minority: '방벽' },
      zh: { majority: '护盾', minority: '屏障' }
    },
    { 
      ja: { majority: 'ヒール', minority: 'リジェネ' },
      en: { majority: 'Heal', minority: 'Regeneration' },
      ko: { majority: '치유', minority: '재생' },
      zh: { majority: '治疗', minority: '再生' }
    },
    { 
      ja: { majority: 'アルティメット', minority: 'パッシブ' },
      en: { majority: 'Ultimate', minority: 'Passive' },
      ko: { majority: '궁극기', minority: '패시브' },
      zh: { majority: '大招', minority: '被动' }
    },
    { 
      ja: { majority: 'ADキャリー', minority: 'APキャリー' },
      en: { majority: 'AD Carry', minority: 'AP Carry' },
      ko: { majority: 'AD 캐리', minority: 'AP 캐리' },
      zh: { majority: 'AD 输出', minority: 'AP 输出' }
    },
    { 
      ja: { majority: 'ジャングラー', minority: 'サポート' },
      en: { majority: 'Jungler', minority: 'Support' },
      ko: { majority: '정글러', minority: '서포터' },
      zh: { majority: '打野', minority: '辅助' }
    }
  ],

  // LOL - マップ・レーン（主要な8ペア）
  lol_map: [
    { 
      ja: { majority: 'トップレーン', minority: 'ミッドレーン' },
      en: { majority: 'Top Lane', minority: 'Mid Lane' },
      ko: { majority: '탑 라인', minority: '미드 라인' },
      zh: { majority: '上路', minority: '中路' }
    },
    { 
      ja: { majority: 'ボットレーン', minority: 'ミッドレーン' },
      en: { majority: 'Bot Lane', minority: 'Mid Lane' },
      ko: { majority: '봇 라인', minority: '미드 라인' },
      zh: { majority: '下路', minority: '中路' }
    },
    { 
      ja: { majority: 'ドラゴン', minority: 'バロン' },
      en: { majority: 'Dragon', minority: 'Baron' },
      ko: { majority: '드래곤', minority: '바론' },
      zh: { majority: '小龙', minority: '大龙' }
    },
    { 
      ja: { majority: 'レッドバフ', minority: 'ブルーバフ' },
      en: { majority: 'Red Buff', minority: 'Blue Buff' },
      ko: { majority: '빨강 버프', minority: '파랑 버프' },
      zh: { majority: '红buff', minority: '蓝buff' }
    },
    { 
      ja: { majority: 'ネクサス', minority: 'インヒビター' },
      en: { majority: 'Nexus', minority: 'Inhibitor' },
      ko: { majority: '넥서스', minority: '억제기' },
      zh: { majority: '主堡', minority: '水晶' }
    },
    { 
      ja: { majority: 'タレット', minority: 'タワー' },
      en: { majority: 'Turret', minority: 'Tower' },
      ko: { majority: '포탑', minority: '타워' },
      zh: { majority: '防御塔', minority: '塔' }
    },
    { 
      ja: { majority: 'ブッシュ', minority: '草むら' },
      en: { majority: 'Bush', minority: 'Brush' },
      ko: { majority: '수풀', minority: '덤불' },
      zh: { majority: '草丛', minority: '灌木' }
    },
    { 
      ja: { majority: 'リバー', minority: '川' },
      en: { majority: 'River', minority: 'Stream' },
      ko: { majority: '강', minority: '냇가' },
      zh: { majority: '河道', minority: '小河' }
    }
  ],

  // LOL - スペル（主要な5ペア）
  lol_spells: [
    { 
      ja: { majority: 'フラッシュ', minority: 'ゴースト' },
      en: { majority: 'Flash', minority: 'Ghost' },
      ko: { majority: '점멸', minority: '유체화' },
      zh: { majority: '闪现', minority: '疾跑' }
    },
    { 
      ja: { majority: 'イグナイト', minority: 'テレポート' },
      en: { majority: 'Ignite', minority: 'Teleport' },
      ko: { majority: '점화', minority: '순간이동' },
      zh: { majority: '引燃', minority: '传送' }
    },
    { 
      ja: { majority: 'ヒール', minority: 'バリア' },
      en: { majority: 'Heal', minority: 'Barrier' },
      ko: { majority: '회복', minority: '방어막' },
      zh: { majority: '治疗术', minority: '屏障' }
    },
    { 
      ja: { majority: 'スマイト', minority: 'エグゾースト' },
      en: { majority: 'Smite', minority: 'Exhaust' },
      ko: { majority: '강타', minority: '탈진' },
      zh: { majority: '惩戒', minority: '虚弱' }
    },
    { 
      ja: { majority: 'クレンズ', minority: 'イグナイト' },
      en: { majority: 'Cleanse', minority: 'Ignite' },
      ko: { majority: '정화', minority: '점화' },
      zh: { majority: '净化', minority: '引燃' }
    }
  ],

  // VALORANT - エージェント（主要な10ペア）
  valorant_agents: [
    { 
      ja: { majority: 'ジェット', minority: 'レイズ' },
      en: { majority: 'Jett', minority: 'Raze' },
      ko: { majority: '제트', minority: '레이즈' },
      zh: { majority: '杰特', minority: '蕾娜' },
      images: {
        majority: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3b1f8c5f7bb2fae5/5eb7cdc1b1f2e27c950d2aae/V_AGENTS_587x900_Jett.png',
        minority: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blta1a8a858baf1efed/5eb7cdc11ea0c32e33c7b99a/V_AGENTS_587x900_Raze.png'
      }
    },
    { 
      ja: { majority: 'セージ', minority: 'キルジョイ' },
      en: { majority: 'Sage', minority: 'Killjoy' },
      ko: { majority: '세이지', minority: '킬조이' },
      zh: { majority: '圣者', minority: '奇乐' },
      images: {
        majority: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt181913f7d0a8e5f9/5eb7cdc1ea0c5035c1a7d5db/V_AGENTS_587x900_Sage.png',
        minority: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltcc5b6db8bc5aa7c3/5f21fda671ec7c6c4a26d1a9/V_AGENTS_587x900_Killjoy.png'
      }
    },
    { 
      ja: { majority: 'フェニックス', minority: 'レイナ' },
      en: { majority: 'Phoenix', minority: 'Reyna' },
      ko: { majority: '피닉스', minority: '레이나' },
      zh: { majority: '凤凰', minority: '蕾娜' }
    },
    { 
      ja: { majority: 'ソーヴァ', minority: 'フェイド' },
      en: { majority: 'Sova', minority: 'Fade' },
      ko: { majority: '소바', minority: '페이드' },
      zh: { majority: '索法', minority: '菲德' }
    },
    { 
      ja: { majority: 'ブリムストーン', minority: 'オーメン' },
      en: { majority: 'Brimstone', minority: 'Omen' },
      ko: { majority: '브림스톤', minority: '오멘' },
      zh: { majority: '布里姆', minority: '奥门' }
    },
    { 
      ja: { majority: 'ヴァイパー', minority: 'アストラ' },
      en: { majority: 'Viper', minority: 'Astra' },
      ko: { majority: '바이퍼', minority: '아스트라' },
      zh: { majority: '蝰蛇', minority: '阿斯特拉' }
    },
    { 
      ja: { majority: 'サイファー', minority: 'チェンバー' },
      en: { majority: 'Cypher', minority: 'Chamber' },
      ko: { majority: '사이퍼', minority: '체임버' },
      zh: { majority: '迷航', minority: '钱柜' }
    },
    { 
      ja: { majority: 'ネオン', minority: 'ヨル' },
      en: { majority: 'Neon', minority: 'Yoru' },
      ko: { majority: '네온', minority: '요루' },
      zh: { majority: '霓虹', minority: '晓' }
    },
    { 
      ja: { majority: 'スカイ', minority: 'ゲッコー' },
      en: { majority: 'Skye', minority: 'Gekko' },
      ko: { majority: '스카이', minority: '게코' },
      zh: { majority: '天娇', minority: '壁虎' }
    },
    { 
      ja: { majority: 'ハーバー', minority: 'ヴァイパー' },
      en: { majority: 'Harbor', minority: 'Viper' },
      ko: { majority: '하버', minority: '바이퍼' },
      zh: { majority: '海湾', minority: '蝰蛇' }
    }
  ],

  // VALORANT - 武器（主要な8ペア）
  valorant_weapons: [
    { 
      ja: { majority: 'ヴァンダル', minority: 'ファントム' },
      en: { majority: 'Vandal', minority: 'Phantom' },
      ko: { majority: '밴달', minority: '팬텀' },
      zh: { majority: '破坏者', minority: '幻影' }
    },
    { 
      ja: { majority: 'オペレーター', minority: 'マーシャル' },
      en: { majority: 'Operator', minority: 'Marshal' },
      ko: { majority: '오퍼레이터', minority: '마샬' },
      zh: { majority: '奥丁', minority: '马歇尔' }
    },
    { 
      ja: { majority: 'ゴースト', minority: 'シェリフ' },
      en: { majority: 'Ghost', minority: 'Sheriff' },
      ko: { majority: '고스트', minority: '셰리프' },
      zh: { majority: '幽灵', minority: '警长' }
    },
    { 
      ja: { majority: 'スペクター', minority: 'スティンガー' },
      en: { majority: 'Spectre', minority: 'Stinger' },
      ko: { majority: '스펙터', minority: '스팅어' },
      zh: { majority: '幽魂', minority: '毒刺' }
    },
    { 
      ja: { majority: 'ジャッジ', minority: 'バッキー' },
      en: { majority: 'Judge', minority: 'Bucky' },
      ko: { majority: '져지', minority: '버키' },
      zh: { majority: '判官', minority: '巴基' }
    },
    { 
      ja: { majority: 'ブルドッグ', minority: 'ガーディアン' },
      en: { majority: 'Bulldog', minority: 'Guardian' },
      ko: { majority: '불독', minority: '가디언' },
      zh: { majority: '斗牛犬', minority: '守护者' }
    },
    { 
      ja: { majority: 'アレス', minority: 'オーディン' },
      en: { majority: 'Ares', minority: 'Odin' },
      ko: { majority: '아레스', minority: '오딘' },
      zh: { majority: '战神', minority: '奥丁' }
    },
    { 
      ja: { majority: 'クラシック', minority: 'フレンジー' },
      en: { majority: 'Classic', minority: 'Frenzy' },
      ko: { majority: '클래식', minority: '프렌지' },
      zh: { majority: '经典', minority: '狂暴' }
    }
  ],

  // VALORANT - アビリティ・用語（主要な8ペア）
  valorant_abilities: [
    { 
      ja: { majority: 'スモーク', minority: '壁' },
      en: { majority: 'Smoke', minority: 'Wall' },
      ko: { majority: '스모크', minority: '벽' },
      zh: { majority: '烟雾', minority: '墙' }
    },
    { 
      ja: { majority: 'フラッシュ', minority: 'スタン' },
      en: { majority: 'Flash', minority: 'Stun' },
      ko: { majority: '섬광', minority: '기절' },
      zh: { majority: '闪光', minority: '眩晕' }
    },
    { 
      ja: { majority: 'ダッシュ', minority: 'テレポート' },
      en: { majority: 'Dash', minority: 'Teleport' },
      ko: { majority: '돌진', minority: '순간이동' },
      zh: { majority: '冲刺', minority: '传送' }
    },
    { 
      ja: { majority: 'ヒール', minority: '蘇生' },
      en: { majority: 'Heal', minority: 'Resurrection' },
      ko: { majority: '치유', minority: '부활' },
      zh: { majority: '治疗', minority: '复活' }
    },
    { 
      ja: { majority: 'ドローン', minority: 'ソナー' },
      en: { majority: 'Drone', minority: 'Sonar' },
      ko: { majority: '드론', minority: '소나' },
      zh: { majority: '无人机', minority: '声纳' }
    },
    { 
      ja: { majority: 'トラップ', minority: 'アラーム' },
      en: { majority: 'Trap', minority: 'Alarm' },
      ko: { majority: '함정', minority: '경보' },
      zh: { majority: '陷阱', minority: '警报' }
    },
    { 
      ja: { majority: 'アルティメット', minority: 'シグネチャー' },
      en: { majority: 'Ultimate', minority: 'Signature' },
      ko: { majority: '궁극기', minority: '시그니처' },
      zh: { majority: '大招', minority: '特长' }
    },
    { 
      ja: { majority: 'デュエリスト', minority: 'イニシエーター' },
      en: { majority: 'Duelist', minority: 'Initiator' },
      ko: { majority: '듀얼리스트', minority: '개시자' },
      zh: { majority: '决斗者', minority: '发起者' }
    }
  ],

  // VALORANT - マップ（主要な8ペア）
  valorant_maps: [
    { 
      ja: { majority: 'アセント', minority: 'ヘイヴン' },
      en: { majority: 'Ascent', minority: 'Haven' },
      ko: { majority: '어센트', minority: '헤이븐' },
      zh: { majority: '空境', minority: '遗城' }
    },
    { 
      ja: { majority: 'バインド', minority: 'スプリット' },
      en: { majority: 'Bind', minority: 'Split' },
      ko: { majority: '바인드', minority: '스플릿' },
      zh: { majority: '双塔', minority: '分割' }
    },
    { 
      ja: { majority: 'アイスボックス', minority: 'ブリーズ' },
      en: { majority: 'Icebox', minority: 'Breeze' },
      ko: { majority: '아이스박스', minority: '브리즈' },
      zh: { majority: '冰箱', minority: '微风' }
    },
    { 
      ja: { majority: 'フラクチャー', minority: 'パール' },
      en: { majority: 'Fracture', minority: 'Pearl' },
      ko: { majority: '프랙처', minority: '펄' },
      zh: { majority: '裂变', minority: '珍珠' }
    },
    { 
      ja: { majority: 'Aサイト', minority: 'Bサイト' },
      en: { majority: 'A Site', minority: 'B Site' },
      ko: { majority: 'A 사이트', minority: 'B 사이트' },
      zh: { majority: 'A点', minority: 'B点' }
    },
    { 
      ja: { majority: 'ミッド', minority: 'ロング' },
      en: { majority: 'Mid', minority: 'Long' },
      ko: { majority: '미드', minority: '롱' },
      zh: { majority: '中路', minority: '长道' }
    },
    { 
      ja: { majority: 'ショート', minority: 'ロング' },
      en: { majority: 'Short', minority: 'Long' },
      ko: { majority: '쇼트', minority: '롱' },
      zh: { majority: '短道', minority: '长道' }
    },
    { 
      ja: { majority: 'タワー', minority: 'ヘブン' },
      en: { majority: 'Tower', minority: 'Heaven' },
      ko: { majority: '타워', minority: '헤븐' },
      zh: { majority: '塔', minority: '天堂' }
    }
  ],

  // VALORANT - その他用語（主要な6ペア）
  valorant_terms: [
    { 
      ja: { majority: 'スパイク', minority: 'デフューズ' },
      en: { majority: 'Spike', minority: 'Defuse' },
      ko: { majority: '스파이크', minority: '해제' },
      zh: { majority: '爆破包', minority: '拆包' }
    },
    { 
      ja: { majority: 'アタッカー', minority: 'ディフェンダー' },
      en: { majority: 'Attacker', minority: 'Defender' },
      ko: { majority: '공격', minority: '수비' },
      zh: { majority: '进攻方', minority: '防守方' }
    },
    { 
      ja: { majority: 'エース', minority: 'クラッチ' },
      en: { majority: 'Ace', minority: 'Clutch' },
      ko: { majority: '에이스', minority: '클러치' },
      zh: { majority: 'ACE', minority: '残局' }
    },
    { 
      ja: { majority: 'ヘッドショット', minority: 'ワンタップ' },
      en: { majority: 'Headshot', minority: 'One Tap' },
      ko: { majority: '헤드샷', minority: '원탭' },
      zh: { majority: '爆头', minority: '一枪' }
    },
    { 
      ja: { majority: 'ランク', minority: 'アンレート' },
      en: { majority: 'Ranked', minority: 'Unrated' },
      ko: { majority: '경쟁전', minority: '일반' },
      zh: { majority: '竞技', minority: '普通' }
    },
    { 
      ja: { majority: 'コンペティティブ', minority: 'カジュアル' },
      en: { majority: 'Competitive', minority: 'Casual' },
      ko: { majority: '랭크', minority: '캐주얼' },
      zh: { majority: '竞技', minority: '休闲' }
    }
  ],

  // ========================================
  // TFT (Teamfight Tactics)
  // ========================================
  
  // TFT - ユニット（主要な10ペア）
  tft_units: [
    { 
      ja: { majority: 'アーリ', minority: 'ソラカ' },
      en: { majority: 'Ahri', minority: 'Soraka' },
      ko: { majority: '아리', minority: '소라카' },
      zh: { majority: '阿狸', minority: '索拉卡' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Ahri.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Soraka.png'
      }
    },
    { 
      ja: { majority: 'ジンクス', minority: 'トリスターナ' },
      en: { majority: 'Jinx', minority: 'Tristana' },
      ko: { majority: '징크스', minority: '트리스타나' },
      zh: { majority: '金克丝', minority: '崔丝塔娜' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Jinx.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Tristana.png'
      }
    },
    { 
      ja: { majority: 'ガレン', minority: 'ダリウス' },
      en: { majority: 'Garen', minority: 'Darius' },
      ko: { majority: '가렌', minority: '다리우스' },
      zh: { majority: '盖伦', minority: '德莱厄斯' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Garen.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Darius.png'
      }
    },
    { 
      ja: { majority: 'ヤスオ', minority: 'ヨネ' },
      en: { majority: 'Yasuo', minority: 'Yone' },
      ko: { majority: '야스오', minority: '요네' },
      zh: { majority: '亚索', minority: '永恩' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Yasuo.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Yone.png'
      }
    },
    { 
      ja: { majority: 'ルックス', minority: 'モルガナ' },
      en: { majority: 'Lux', minority: 'Morgana' },
      ko: { majority: '럭스', minority: '모르가나' },
      zh: { majority: '拉克丝', minority: '莫甘娜' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Lux.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Morgana.png'
      }
    },
    { 
      ja: { majority: 'アッシュ', minority: 'ヴァルス' },
      en: { majority: 'Ashe', minority: 'Varus' },
      ko: { majority: '애쉬', minority: '바루스' },
      zh: { majority: '艾希', minority: '韦鲁斯' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Ashe.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Varus.png'
      }
    },
    { 
      ja: { majority: 'ゼド', minority: 'タロン' },
      en: { majority: 'Zed', minority: 'Talon' },
      ko: { majority: '제드', minority: '탈론' },
      zh: { majority: '劫', minority: '泰隆' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Zed.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Talon.png'
      }
    },
    { 
      ja: { majority: 'カ=ジックス', minority: 'レンガー' },
      en: { majority: "Kha'Zix", minority: 'Rengar' },
      ko: { majority: '카직스', minority: '렝가' },
      zh: { majority: '卡兹克', minority: '雷恩加尔' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Khazix.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Rengar.png'
      }
    },
    { 
      ja: { majority: 'エズリアル', minority: 'ルシアン' },
      en: { majority: 'Ezreal', minority: 'Lucian' },
      ko: { majority: '이즈리얼', minority: '루시안' },
      zh: { majority: '伊泽瑞尔', minority: '卢锡安' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Ezreal.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Lucian.png'
      }
    },
    { 
      ja: { majority: 'カイサ', minority: 'サミーラ' },
      en: { majority: "Kai'Sa", minority: 'Samira' },
      ko: { majority: '카이사', minority: '사미라' },
      zh: { majority: '卡莎', minority: '萨米拉' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Kaisa.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Samira.png'
      }
    }
  ],

  // TFT - 特性（主要な8ペア）
  tft_traits: [
    { 
      ja: { majority: 'アサシン', minority: 'スレイヤー' },
      en: { majority: 'Assassin', minority: 'Slayer' },
      ko: { majority: '암살자', minority: '학살자' },
      zh: { majority: '刺客', minority: '杀手' }
    },
    { 
      ja: { majority: 'ブローラー', minority: 'ヴァンガード' },
      en: { majority: 'Brawler', minority: 'Vanguard' },
      ko: { majority: '난투꾼', minority: '선봉대' },
      zh: { majority: '格斗家', minority: '先锋' }
    },
    { 
      ja: { majority: 'ソーサラー', minority: 'ウィザード' },
      en: { majority: 'Sorcerer', minority: 'Wizard' },
      ko: { majority: '마법사', minority: '위저드' },
      zh: { majority: '法师', minority: '巫师' }
    },
    { 
      ja: { majority: 'マークスマン', minority: 'スナイパー' },
      en: { majority: 'Marksman', minority: 'Sniper' },
      ko: { majority: '명사수', minority: '저격수' },
      zh: { majority: '射手', minority: '狙击手' }
    },
    { 
      ja: { majority: 'プロテクター', minority: 'ガーディアン' },
      en: { majority: 'Protector', minority: 'Guardian' },
      ko: { majority: '보호자', minority: '수호자' },
      zh: { majority: '护卫', minority: '守护者' }
    },
    { 
      ja: { majority: 'デュエリスト', minority: 'チャレンジャー' },
      en: { majority: 'Duelist', minority: 'Challenger' },
      ko: { majority: '결투가', minority: '도전자' },
      zh: { majority: '决斗者', minority: '挑战者' }
    },
    { 
      ja: { majority: 'ミスティック', minority: 'スカラー' },
      en: { majority: 'Mystic', minority: 'Scholar' },
      ko: { majority: '신비술사', minority: '학자' },
      zh: { majority: '秘术师', minority: '学者' }
    },
    { 
      ja: { majority: 'キャバリエ', minority: 'ナイト' },
      en: { majority: 'Cavalier', minority: 'Knight' },
      ko: { majority: '기사', minority: '나이트' },
      zh: { majority: '骑士', minority: '武士' }
    }
  ],

  // TFT - アイテム（主要な8ペア）
  tft_items: [
    { 
      ja: { majority: 'インフィニティエッジ', minority: 'ジュエルドガントレット' },
      en: { majority: 'Infinity Edge', minority: 'Jeweled Gauntlet' },
      ko: { majority: '무한의 대검', minority: '보석 건틀릿' },
      zh: { majority: '无尽之刃', minority: '珠光护手' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3031.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3030.png'
      }
    },
    { 
      ja: { majority: 'ガーディアンエンジェル', minority: 'エッジオブナイト' },
      en: { majority: 'Guardian Angel', minority: 'Edge of Night' },
      ko: { majority: '수호 천사', minority: '밤의 끝자락' },
      zh: { majority: '守护天使', minority: '夜之锋刃' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3026.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3814.png'
      }
    },
    { 
      ja: { majority: 'ラバドンデスキャップ', minority: 'イオニックスパーク' },
      en: { majority: "Rabadon's Deathcap", minority: 'Ionic Spark' },
      ko: { majority: '라바돈의 죽음모자', minority: '이온 충격기' },
      zh: { majority: '灭世者的死亡之帽', minority: '离子火花' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3089.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3042.png'
      }
    },
    { 
      ja: { majority: 'ブラッドサースター', minority: 'ハンズオブジャスティス' },
      en: { majority: 'Bloodthirster', minority: 'Hand of Justice' },
      ko: { majority: '피바라기', minority: '정의의 손길' },
      zh: { majority: '饮血剑', minority: '正义之手' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3072.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3184.png'
      }
    },
    { 
      ja: { majority: 'ショウジンスピア', minority: 'ブルーバフ' },
      en: { majority: "Spear of Shojin", minority: 'Blue Buff' },
      ko: { majority: '쇼진의 창', minority: '푸른 파수꾼' },
      zh: { majority: '朔极之矛', minority: '蓝霸符' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3161.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3070.png'
      }
    },
    { 
      ja: { majority: 'サンファイアケープ', minority: 'モレロノミコン' },
      en: { majority: 'Sunfire Cape', minority: "Morellonomicon" },
      ko: { majority: '태양불꽃 망토', minority: '모렐로노미콘' },
      zh: { majority: '日炎斗篷', minority: '莫雷洛秘典' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3068.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3165.png'
      }
    },
    { 
      ja: { majority: 'ラストウィスパー', minority: 'タイタンズリゾルブ' },
      en: { majority: 'Last Whisper', minority: "Titan's Resolve" },
      ko: { majority: '최후의 속삭임', minority: '거인의 결의' },
      zh: { majority: '最后的轻语', minority: '巨神峰之擎' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3035.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3748.png'
      }
    },
    { 
      ja: { majority: 'フローズンハート', minority: 'ウィンタースアプローチ' },
      en: { majority: 'Frozen Heart', minority: "Winter's Approach" },
      ko: { majority: '얼어붙은 심장', minority: '겨울의 도래' },
      zh: { majority: '冰霜之心', minority: '寒冬降临' },
      images: {
        majority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3110.png',
        minority: 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3119.png'
      }
    }
  ],

  // TFT - ゲーム用語（主要な8ペア）
  tft_terms: [
    { 
      ja: { majority: 'リロール', minority: 'レベルアップ' },
      en: { majority: 'Reroll', minority: 'Level Up' },
      ko: { majority: '리롤', minority: '레벨업' },
      zh: { majority: '刷新', minority: '升级' }
    },
    { 
      ja: { majority: 'ハイパーロール', minority: 'スタンダード' },
      en: { majority: 'Hyper Roll', minority: 'Standard' },
      ko: { majority: '하이퍼 롤', minority: '일반' },
      zh: { majority: '疾速模式', minority: '标准模式' }
    },
    { 
      ja: { majority: 'アイテムカルーセル', minority: 'ドラフト' },
      en: { majority: 'Item Carousel', minority: 'Draft' },
      ko: { majority: '회전목마', minority: '드래프트' },
      zh: { majority: '选秀', minority: '征召' }
    },
    { 
      ja: { majority: '3スター', minority: '2スター' },
      en: { majority: '3-Star', minority: '2-Star' },
      ko: { majority: '3성', minority: '2성' },
      zh: { majority: '三星', minority: '二星' }
    },
    { 
      ja: { majority: 'エコノミー', minority: '経済管理' },
      en: { majority: 'Economy', minority: 'Eco Management' },
      ko: { majority: '경제', minority: '경제 관리' },
      zh: { majority: '经济', minority: '经济管理' }
    },
    { 
      ja: { majority: 'ウィンストリーク', minority: 'ロスストリーク' },
      en: { majority: 'Win Streak', minority: 'Loss Streak' },
      ko: { majority: '연승', minority: '연패' },
      zh: { majority: '连胜', minority: '连败' }
    },
    { 
      ja: { majority: 'フロントライン', minority: 'バックライン' },
      en: { majority: 'Frontline', minority: 'Backline' },
      ko: { majority: '전방', minority: '후방' },
      zh: { majority: '前排', minority: '后排' }
    },
    { 
      ja: { majority: 'スローロール', minority: 'ファストエイト' },
      en: { majority: 'Slow Roll', minority: 'Fast 8' },
      ko: { majority: '슬로우 롤', minority: '빠른 8' },
      zh: { majority: '慢刷', minority: '速8' }
    }
  ]
};

// グローバルにエクスポート
if (typeof window !== 'undefined') {
  window.wordDataI18n = wordDataI18n;
}
