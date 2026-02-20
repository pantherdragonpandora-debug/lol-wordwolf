/**
 * VALORANT ワードウルフ用トピックデータ
 * カテゴリー：エージェント、武器、アビリティ、マップ、その他
 */

const valorantData = {
    // エージェント（20ペア）
    agents: [
        { majority: "ジェット", minority: "レイズ" },
        { majority: "セージ", minority: "キルジョイ" },
        { majority: "フェニックス", minority: "レイナ" },
        { majority: "ソーヴァ", minority: "フェイド" },
        { majority: "ブリムストーン", minority: "オーメン" },
        { majority: "ヴァイパー", minority: "アストラ" },
        { majority: "サイファー", minority: "チェンバー" },
        { majority: "レイズ", minority: "ネオン" },
        { majority: "スカイ", minority: "ゲッコー" },
        { majority: "ヨル", minority: "ハーバー" },
        { majority: "アストラ", minority: "オーメン" },
        { majority: "KAY/O", minority: "ブリーチ" },
        { majority: "チェンバー", minority: "サイファー" },
        { majority: "ネオン", minority: "ジェット" },
        { majority: "フェイド", minority: "ソーヴァ" },
        { majority: "ハーバー", minority: "ヴァイパー" },
        { majority: "ゲッコー", minority: "スカイ" },
        { majority: "デッドロック", minority: "キルジョイ" },
        { majority: "イソ", minority: "フェニックス" },
        { majority: "クローヴ", minority: "セージ" }
    ],
    
    // 武器（15ペア）
    weapons: [
        { majority: "ヴァンダル", minority: "ファントム" },
        { majority: "ファントム", minority: "ヴァンダル" },
        { majority: "オペレーター", minority: "マーシャル" },
        { majority: "ゴースト", minority: "シェリフ" },
        { majority: "クラシック", minority: "ショーティー" },
        { majority: "スペクター", minority: "スティンガー" },
        { majority: "ジャッジ", minority: "バッキー" },
        { majority: "ブルドッグ", minority: "ガーディアン" },
        { majority: "フレンジー", minority: "クラシック" },
        { majority: "シェリフ", minority: "ゴースト" },
        { majority: "マーシャル", minority: "オペレーター" },
        { majority: "アレス", minority: "オーディン" },
        { majority: "オーディン", minority: "アレス" },
        { majority: "スティンガー", minority: "スペクター" },
        { majority: "ガーディアン", minority: "ブルドッグ" }
    ],
    
    // アビリティ（15ペア）
    abilities: [
        { majority: "スモーク", minority: "壁" },
        { majority: "フラッシュ", minority: "スタン" },
        { majority: "ダッシュ", minority: "テレポート" },
        { majority: "ヒール", minority: "蘇生" },
        { majority: "ドローン", minority: "ソナー" },
        { majority: "トラップワイヤー", minority: "アラームボット" },
        { majority: "毒オーブ", minority: "毒雲" },
        { majority: "ブリンク", minority: "ゲートクラッシュ" },
        { majority: "エントリー", minority: "ブームボット" },
        { majority: "リコン", minority: "ソウルダート" },
        { majority: "インセンディアリー", minority: "モロトフ" },
        { majority: "スローオーブ", minority: "グレネード" },
        { majority: "リザレクション", minority: "ヒーリングオーブ" },
        { majority: "アップドラフト", minority: "テイルウィンド" },
        { majority: "ツアードフォース", minority: "ランページ" }
    ],
    
    // マップ・場所（15ペア）
    maps: [
        { majority: "アセント", minority: "ヘイヴン" },
        { majority: "バインド", minority: "スプリット" },
        { majority: "アイスボックス", minority: "ブリーズ" },
        { majority: "フラクチャー", minority: "パール" },
        { majority: "ロータス", minority: "サンセット" },
        { majority: "Aサイト", minority: "Bサイト" },
        { majority: "ミッド", minority: "カラビネ" },
        { majority: "ヘイヴン", minority: "アセント" },
        { majority: "スプリット", minority: "バインド" },
        { majority: "ブリーズ", minority: "アイスボックス" },
        { majority: "パール", minority: "ロータス" },
        { majority: "サンセット", minority: "フラクチャー" },
        { majority: "Cサイト", minority: "Aサイト" },
        { majority: "ロング", minority: "ショート" },
        { majority: "タワー", minority: "ヘブン" }
    ],
    
    // その他（12ペア）
    others: [
        { majority: "スパイク", minority: "デフューズ" },
        { majority: "アルティメット", minority: "シグネチャー" },
        { majority: "クレジット", minority: "アーマー" },
        { majority: "ラウンド", minority: "ハーフ" },
        { majority: "アタッカー", minority: "ディフェンダー" },
        { majority: "エース", minority: "クラッチ" },
        { majority: "ヘッドショット", minority: "ワンタップ" },
        { majority: "ピーク", minority: "ホールド" },
        { majority: "エコラウンド", minority: "フルバイ" },
        { majority: "ランク", minority: "アンレート" },
        { majority: "デスマッチ", minority: "スパイクラッシュ" },
        { majority: "コンペティティブ", minority: "カジュアル" }
    ]
};

// グローバルにエクスポート
if (typeof window !== 'undefined') {
    window.valorantData = valorantData;
}
