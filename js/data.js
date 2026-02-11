/**
 * LOLワードウルフ - お題データ
 * League of Legendsをテーマにしたワードウルフゲームのお題ペア
 */

const TOPIC_PAIRS = {
    // チャンピオン関連（20ペア）
    champion: [
        { citizen: "ヤスオ", wolf: "ヨネ" },
        { citizen: "リー・シン", wolf: "ブラインドモンク" },
        { citizen: "ルックス", wolf: "ガレン" },
        { citizen: "ジンクス", wolf: "ケイトリン" },
        { citizen: "ゼド", wolf: "カシオペア" },
        { citizen: "アーリ", wolf: "ラックス" },
        { citizen: "ドレイヴン", wolf: "ダリウス" },
        { citizen: "イブリン", wolf: "ニダリー" },
        { citizen: "ティーモ", wolf: "トリスターナ" },
        { citizen: "アッシュ", wolf: "ヴェイン" },
        { citizen: "マスター・イー", wolf: "ワーウィック" },
        { citizen: "ブリッツクランク", wolf: "スレッシュ" },
        { citizen: "アニー", wolf: "ティバーズ" },
        { citizen: "リヴェン", wolf: "フィオラ" },
        { citizen: "マルファイト", wolf: "ナサス" },
        { citizen: "カタリナ", wolf: "タロン" },
        { citizen: "ジャックス", wolf: "トランドル" },
        { citizen: "エズリアル", wolf: "ルシアン" },
        { citizen: "ソナ", wolf: "ソラカ" },
        { citizen: "ランブル", wolf: "ハイマーディンガー" }
    ],
    
    // アイテム関連（15ペア）
    item: [
        { citizen: "インフィニティエッジ", wolf: "ストームレイザー" },
        { citizen: "ラバドンデスキャップ", wolf: "ヴォイドスタッフ" },
        { citizen: "トリニティフォース", wolf: "ディヴァインサンダラー" },
        { citizen: "ブラッククリーバー", wolf: "ゴアドリンカー" },
        { citizen: "ガーディアンエンジェル", wolf: "ジョニャ" },
        { citizen: "ソーサラーシューズ", wolf: "アイオニアブーツ" },
        { citizen: "ラピッドファイアキャノン", wolf: "スタティックシヴ" },
        { citizen: "ルインドキングブレード", wolf: "ブレードオブザルインドキング" },
        { citizen: "モレロノミコン", wolf: "リアンドリーの苦悶" },
        { citizen: "ソーンメイル", wolf: "ランデュイン" },
        { citizen: "メジャイソウルスティーラー", wolf: "ダークシール" },
        { citizen: "サンファイアイージス", wolf: "フロストファイアガントレット" },
        { citizen: "エッセンスリーバー", wolf: "ナヴォリクイックブレード" },
        { citizen: "デスダンス", wolf: "ステラックの篭手" },
        { citizen: "ムーンストーンリニューアー", wolf: "シュレリアのレクイエム" }
    ],
    
    // スキル・能力関連（15ペア）
    skill: [
        { citizen: "ブリンク", wolf: "ダッシュ" },
        { citizen: "スタン", wolf: "ルート" },
        { citizen: "サイレンス", wolf: "ディスアーム" },
        { citizen: "ノックアップ", wolf: "ノックバック" },
        { citizen: "インビジブル", wolf: "カモフラージュ" },
        { citizen: "シールド", wolf: "バリア" },
        { citizen: "ヒール", wolf: "リジェネ" },
        { citizen: "スロー", wolf: "グラウンド" },
        { citizen: "サプレッション", wolf: "スタン" },
        { citizen: "パッシブ", wolf: "アクティブ" },
        { citizen: "Qスキル", wolf: "Wスキル" },
        { citizen: "Eスキル", wolf: "Rスキル" },
        { citizen: "オンヒット", wolf: "スキルショット" },
        { citizen: "エンパワー", wolf: "バフ" },
        { citizen: "エグゼキュート", wolf: "トゥルーダメージ" }
    ],
    
    // マップ・レーン関連（15ペア）
    map: [
        { citizen: "トップレーン", wolf: "ミッドレーン" },
        { citizen: "ボットレーン", wolf: "トップレーン" },
        { citizen: "ジャングル", wolf: "リバー" },
        { citizen: "ブルーバフ", wolf: "レッドバフ" },
        { citizen: "ドラゴン", wolf: "バロン" },
        { citizen: "リフトヘラルド", wolf: "シャドーチェンジャー" },
        { citizen: "タレット", wolf: "インヒビター" },
        { citizen: "ネクサス", wolf: "インヒビター" },
        { citizen: "ブッシュ", wolf: "リバー" },
        { citizen: "レッドサイド", wolf: "ブルーサイド" },
        { citizen: "クルーグ", wolf: "ラプター" },
        { citizen: "ウルフ", wolf: "グロンプ" },
        { citizen: "スカトル", wolf: "ハニーフルーツ" },
        { citizen: "タワーダイブ", wolf: "ロームガンク" },
        { citizen: "リコール", wolf: "テレポート" }
    ],
    
    // スペル関連（8ペア）
    spell: [
        { citizen: "フラッシュ", wolf: "ゴースト" },
        { citizen: "イグナイト", wolf: "テレポート" },
        { citizen: "スマイト", wolf: "イグゾースト" },
        { citizen: "ヒール", wolf: "バリア" },
        { citizen: "クレンズ", wolf: "イグゾースト" },
        { citizen: "イグナイト", wolf: "イグゾースト" },
        { citizen: "テレポート", wolf: "フラッシュ" },
        { citizen: "マーク", wolf: "ダッシュ" }
    ]
};

/**
 * カテゴリー名の日本語マップ
 */
const CATEGORY_NAMES = {
    champion: "チャンピオン",
    item: "アイテム",
    skill: "スキル・能力",
    map: "マップ・レーン",
    spell: "スペル"
};

/**
 * カテゴリーの説明
 */
const CATEGORY_DESCRIPTIONS = {
    champion: "LOLのプレイアブルキャラクター",
    item: "ゲーム内で購入できる装備品",
    skill: "チャンピオンの能力や効果",
    map: "マップ上の場所やオブジェクト",
    spell: "サモナースペル"
};

/**
 * 選択されたカテゴリーからランダムにお題ペアを取得
 * @param {string[]} categories - 選択されたカテゴリーの配列
 * @returns {Object} お題ペア { citizen: string, wolf: string, category: string }
 */
function getRandomTopicPair(categories) {
    if (!categories || categories.length === 0) {
        throw new Error("少なくとも1つのカテゴリーを選択してください");
    }
    
    // 全カテゴリーからお題を集める
    const allPairs = [];
    categories.forEach(category => {
        if (TOPIC_PAIRS[category]) {
            TOPIC_PAIRS[category].forEach(pair => {
                allPairs.push({
                    ...pair,
                    category: category
                });
            });
        }
    });
    
    if (allPairs.length === 0) {
        throw new Error("有効なお題が見つかりません");
    }
    
    // ランダムに1つ選択
    const randomIndex = Math.floor(Math.random() * allPairs.length);
    return allPairs[randomIndex];
}

/**
 * カテゴリー内のお題数を取得
 * @param {string} category - カテゴリー名
 * @returns {number} お題数
 */
function getTopicCount(category) {
    return TOPIC_PAIRS[category] ? TOPIC_PAIRS[category].length : 0;
}

/**
 * 全カテゴリーのお題数を取得
 * @returns {Object} カテゴリーごとのお題数
 */
function getAllTopicCounts() {
    const counts = {};
    Object.keys(TOPIC_PAIRS).forEach(category => {
        counts[category] = getTopicCount(category);
    });
    return counts;
}

/**
 * 総お題数を取得
 * @param {string[]} categories - カテゴリーの配列（省略時は全カテゴリー）
 * @returns {number} 総お題数
 */
function getTotalTopicCount(categories = null) {
    if (categories) {
        return categories.reduce((total, category) => {
            return total + getTopicCount(category);
        }, 0);
    }
    return Object.values(TOPIC_PAIRS).reduce((total, pairs) => {
        return total + pairs.length;
    }, 0);
}

/**
 * カテゴリーの一覧を取得
 * @returns {string[]} カテゴリー名の配列
 */
function getCategories() {
    return Object.keys(TOPIC_PAIRS);
}

/**
 * カテゴリーの日本語名を取得
 * @param {string} category - カテゴリー名
 * @returns {string} 日本語カテゴリー名
 */
function getCategoryName(category) {
    return CATEGORY_NAMES[category] || category;
}

/**
 * カテゴリーの説明を取得
 * @param {string} category - カテゴリー名
 * @returns {string} カテゴリーの説明
 */
function getCategoryDescription(category) {
    return CATEGORY_DESCRIPTIONS[category] || "";
}

// モジュールとしてエクスポート（必要に応じて）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TOPIC_PAIRS,
        CATEGORY_NAMES,
        CATEGORY_DESCRIPTIONS,
        getRandomTopicPair,
        getTopicCount,
        getAllTopicCounts,
        getTotalTopicCount,
        getCategories,
        getCategoryName,
        getCategoryDescription
    };
}