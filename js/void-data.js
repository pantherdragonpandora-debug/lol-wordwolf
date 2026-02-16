// ========================================
// ヴォイドに届くは光か闇か - テーマデータ
// ========================================

const voidThemes = {
  // League of Legends テーマ
  lol: {
    champions: [
      {
        id: 'ashe',
        name: 'アッシュ',
        category: 'champion',
        hints: ['氷', '弓', 'フレイヨルド', '遠距離', 'スロー']
      },
      {
        id: 'yasuo',
        name: 'ヤスオ',
        category: 'champion',
        hints: ['風', '侍', '壁', 'ノックアップ', '流浪']
      },
      {
        id: 'lux',
        name: 'ラックス',
        category: 'champion',
        hints: ['光', 'レーザー', 'デマーシア', '魔法', '拘束']
      },
      {
        id: 'jinx',
        name: 'ジンクス',
        category: 'champion',
        hints: ['狂気', 'ロケット', 'ピルトーヴァー', '破壊', '銃']
      },
      {
        id: 'garen',
        name: 'ガレン',
        category: 'champion',
        hints: ['デマーシア', '剣', '回転', '正義', '沈黙']
      },
      {
        id: 'ahri',
        name: 'アーリ',
        category: 'champion',
        hints: ['狐', '魅了', '9本', 'アイオニア', '魂']
      },
      {
        id: 'zed',
        name: 'ゼド',
        category: 'champion',
        hints: ['影', '忍者', 'アイオニア', '暗殺', '手裏剣']
      },
      {
        id: 'thresh',
        name: 'スレッシュ',
        category: 'champion',
        hints: ['鎖', 'フック', '魂', 'シャドウアイル', 'ランタン']
      },
      {
        id: 'ekko',
        name: 'エコー',
        category: 'champion',
        hints: ['時間', '巻き戻し', 'ザウン', '少年', 'クロノ']
      },
      {
        id: 'vayne',
        name: 'ヴェイン',
        category: 'champion',
        hints: ['銀', 'クロスボウ', '3撃', 'デマーシア', 'ハンター']
      }
    ],
    items: [
      {
        id: 'infinity-edge',
        name: 'インフィニティエッジ',
        category: 'item',
        hints: ['剣', 'クリティカル', 'AD', 'ダメージ', 'コア']
      },
      {
        id: 'rabadons',
        name: 'ラバドンデスキャップ',
        category: 'item',
        hints: ['帽子', 'AP', '魔法', '増幅', 'パワー']
      },
      {
        id: 'zhonyas',
        name: 'ゾーニャの砂時計',
        category: 'item',
        hints: ['金色', '無敵', 'AP', '防御', '時間停止']
      },
      {
        id: 'guardian-angel',
        name: 'ガーディアンエンジェル',
        category: 'item',
        hints: ['復活', '天使', '防御', 'AD', '保険']
      },
      {
        id: 'trinity-force',
        name: 'トリニティフォース',
        category: 'item',
        hints: ['3つ', '力', 'AS', 'MS', '万能']
      }
    ],
    places: [
      {
        id: 'demacia',
        name: 'デマーシア',
        category: 'place',
        hints: ['正義', '王国', '光', '反魔法', '城']
      },
      {
        id: 'noxus',
        name: 'ノクサス',
        category: 'place',
        hints: ['帝国', '力', '征服', '赤', '拡大']
      },
      {
        id: 'ionia',
        name: 'アイオニア',
        category: 'place',
        hints: ['調和', '東洋', '自然', '精霊', '平和']
      },
      {
        id: 'void',
        name: 'ヴォイド',
        category: 'place',
        hints: ['虚無', '紫', '異次元', '破壊', '侵食']
      },
      {
        id: 'shadow-isles',
        name: 'シャドウアイル',
        category: 'place',
        hints: ['死', '霧', '呪い', '幽霊', '黒']
      }
    ],
    concepts: [
      {
        id: 'baron',
        name: 'バロン',
        category: 'concept',
        hints: ['紫', '強化', '川', 'オブジェクト', 'チーム']
      },
      {
        id: 'dragon',
        name: 'ドラゴン',
        category: 'concept',
        hints: ['元素', 'バフ', '川', 'ソロキル', '4種']
      },
      {
        id: 'pentakill',
        name: 'ペンタキル',
        category: 'concept',
        hints: ['5', '全滅', 'キル', '栄光', 'アナウンス']
      },
      {
        id: 'flash',
        name: 'フラッシュ',
        category: 'concept',
        hints: ['瞬間移動', 'スペル', '必須', 'D/F', '逃げ']
      },
      {
        id: 'gank',
        name: 'ガンク',
        category: 'concept',
        hints: ['奇襲', 'ジャングル', '援護', '挟撃', '数的有利']
      }
    ]
  },

  // VALORANT テーマ
  valorant: [
    {
      id: 'jett',
      name: 'Jett',
      category: 'agent',
      hints: ['風', 'ダッシュ', '韓国', 'デュエリスト', 'ナイフ']
    },
    {
      id: 'phoenix',
      name: 'Phoenix',
      category: 'agent',
      hints: ['炎', '復活', 'イギリス', 'デュエリスト', '自己回復']
    },
    {
      id: 'sage',
      name: 'Sage',
      category: 'agent',
      hints: ['氷', '回復', '中国', 'センチネル', '壁']
    },
    {
      id: 'sova',
      name: 'Sova',
      category: 'agent',
      hints: ['弓', '偵察', 'ロシア', 'イニシエーター', 'ドローン']
    },
    {
      id: 'reyna',
      name: 'Reyna',
      category: 'agent',
      hints: ['魂', 'メキシコ', 'デュエリスト', '吸収', '目']
    },
    {
      id: 'vandal',
      name: 'ヴァンダル',
      category: 'weapon',
      hints: ['AK', '25発', 'タップ', '2900', 'ヘッドショット']
    },
    {
      id: 'phantom',
      name: 'ファントム',
      category: 'weapon',
      hints: ['M4', '30発', 'スプレー', '2900', 'サイレンサー']
    },
    {
      id: 'operator',
      name: 'オペレーター',
      category: 'weapon',
      hints: ['AWP', 'スナイパー', '4700', '一撃', 'スコープ']
    },
    {
      id: 'spike',
      name: 'スパイク',
      category: 'concept',
      hints: ['爆弾', '設置', '45秒', 'ビープ', '目標']
    },
    {
      id: 'ace',
      name: 'エース',
      category: 'concept',
      hints: ['5キル', '全滅', '1人', '達成', '称賛']
    },
    {
      id: 'bind',
      name: 'バインド',
      category: 'map',
      hints: ['テレポート', 'A/B', 'フックアウト', 'ロング', '2サイト']
    },
    {
      id: 'haven',
      name: 'ヘイブン',
      category: 'map',
      hints: ['3サイト', 'A/B/C', '寺院', 'ガレージ', 'ロングC']
    },
    {
      id: 'split',
      name: 'スプリット',
      category: 'map',
      hints: ['東京', 'ロープ', 'ミッド', 'A/B', '塔']
    },
    {
      id: 'ascent',
      name: 'アセント',
      category: 'map',
      hints: ['イタリア', 'ミッド', 'ドア', 'A/B', 'カバット']
    },
    {
      id: 'icebox',
      name: 'アイスボックス',
      category: 'map',
      hints: ['雪', 'ジップ', '縦', 'A/B', '寒い']
    }
  ]
};

// ランダムにテーマを取得
function getRandomVoidTheme(gameType) {
  let allThemes = [];
  
  if (gameType === 'lol') {
    // LOLの全カテゴリーから取得
    Object.keys(voidThemes.lol).forEach(category => {
      allThemes.push(...voidThemes.lol[category]);
    });
  } else if (gameType === 'valorant') {
    allThemes = voidThemes.valorant;
  }
  
  if (allThemes.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * allThemes.length);
  return allThemes[randomIndex];
}

// テーマをIDで取得
function getVoidThemeById(themeId, gameType) {
  let allThemes = [];
  
  if (gameType === 'lol') {
    Object.keys(voidThemes.lol).forEach(category => {
      allThemes.push(...voidThemes.lol[category]);
    });
  } else if (gameType === 'valorant') {
    allThemes = voidThemes.valorant;
  }
  
  return allThemes.find(t => t.id === themeId) || null;
}

// カテゴリー別にテーマを取得
function getVoidThemesByCategory(gameType, category) {
  if (gameType === 'lol') {
    return voidThemes.lol[category] || [];
  } else if (gameType === 'valorant') {
    return voidThemes.valorant.filter(t => t.category === category);
  }
  return [];
}
