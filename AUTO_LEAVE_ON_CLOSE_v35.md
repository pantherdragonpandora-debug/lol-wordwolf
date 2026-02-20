# 📢 Google AdSense 広告実装ガイド

このドキュメントでは、LOL ワードウルフに Google AdSense 広告を実装する手順を説明します。

## 📋 目次

1. [前提条件](#前提条件)
2. [AdSense アカウントの準備](#adsense-アカウントの準備)
3. [広告コードの設置手順](#広告コードの設置手順)
4. [Legal Jibber Jabber ポリシーへの準拠](#legal-jibber-jabber-ポリシーへの準拠)
5. [トラブルシューティング](#トラブルシューティング)

---

## ✅ 前提条件

- ✅ Google アカウントを持っている
- ✅ 本サイトがデプロイされ、公開URLがある（例: `https://pantherdragonpandora-debug.github.io/lol-wordwolf/`）
- ✅ プライバシーポリシーと利用規約が設置されている（既に完了）
- ✅ サイトが Riot Games の Legal Jibber Jabber ポリシーに準拠している

---

## 🚀 AdSense アカウントの準備

### ステップ 1: AdSense アカウントの作成

1. **Google AdSense にアクセス**
   - [https://www.google.com/adsense/](https://www.google.com/adsense/)

2. **アカウントを作成**
   - Google アカウントでログイン
   - サイトURLを入力: `https://pantherdragonpandora-debug.github.io`
   - 国・地域を選択（日本）
   - 利用規約に同意

3. **支払い情報を入力**
   - 住所
   - 電話番号
   - 支払い方法（銀行口座）

### ステップ 2: サイトの承認申請

1. **AdSense コードを取得**
   - AdSense 管理画面 → サイト → コードを取得
   - 以下のような形式のコードが表示されます：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
```

2. **コードを `index.html` に設置**（後述の手順を参照）

3. **審査を待つ**
   - 通常 1〜2週間で審査結果が通知されます
   - 審査基準：
     - コンテンツが有益であること
     - オリジナルコンテンツであること
     - ナビゲーションが明確であること
     - プライバシーポリシーが設置されていること

---

## 🔧 広告コードの設置手順

### ステップ 1: AdSense スクリプトを設置

`index.html` の `<head>` セクションに、取得した AdSense コードを設置します。

#### 現在の状態（コメントアウト済み）:

```html
<!-- Google AdSense -->
<!-- ⚠️ 重要: 以下の「ca-pub-XXXXXXXXXX」をあなたのAdSense IDに置き換えてください -->
<!-- AdSense承認後、コメントアウトを外してください -->
<!-- 
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
-->
```

#### 実装手順:

1. AdSense 管理画面から **あなたの Publisher ID**（`ca-pub-XXXXXXXXXX` の形式）を取得
2. `ca-pub-XXXXXXXXXX` を実際の ID に置き換える
3. コメントアウト（`<!-- -->` の部分）を削除

#### 実装後のコード例:

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
```

### ステップ 2: 広告ユニットを作成

1. **AdSense 管理画面 → 広告 → 広告ユニット → 新しい広告ユニット**

2. **ディスプレイ広告を選択**
   - 名前: 例）`LOL Wordwolf Footer Banner`
   - 広告タイプ: レスポンシブ
   - サイズ: 自動

3. **広告コードを取得**
   - 以下のような形式のコードが表示されます：

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="YYYYYYYYYY"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### ステップ 3: 広告ユニットを `index.html` に設置

`index.html` のフッター上部にある広告コンテナを編集します。

#### 現在の状態（コメントアウト済み）:

```html
<!-- 広告エリア（フッター上部） -->
<div class="ad-container">
    <!-- Google AdSense バナー広告 -->
    <!-- ⚠️ 重要: 以下の手順で設定してください -->
    <!-- 1. 「ca-pub-XXXXXXXXXX」をあなたのAdSense IDに置き換え -->
    <!-- 2. 「YYYYYYYYYY」をAdSense管理画面で取得した広告スロットIDに置き換え -->
    <!-- 3. AdSense承認後、コメントアウトを外す -->
    <!--
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXX"
         data-ad-slot="YYYYYYYYYY"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    -->
</div>
```

#### 実装手順:

1. `ca-pub-XXXXXXXXXX` を実際の Publisher ID に置き換え
2. `YYYYYYYYYY` を AdSense で作成した広告スロット ID に置き換え
3. コメントアウトを削除

#### 実装後のコード例:

```html
<!-- 広告エリア（フッター上部） -->
<div class="ad-container">
    <!-- Google AdSense バナー広告 -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-1234567890123456"
         data-ad-slot="9876543210"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

---

## ⚖️ Legal Jibber Jabber ポリシーへの準拠

### ✅ 許可されていること

Riot Games の [Legal Jibber Jabber ポリシー](https://www.riotgames.com/en/legal) では、以下の条件下で広告掲載が許可されています：

- ✅ **無料でアクセス可能**: すべてのコンテンツが無料で提供される
- ✅ **非公式である旨を明記**: Riot Games とは関係がないことを明確にする
- ✅ **適度な広告収入**: サイト運営費用をカバーする程度の広告
- ✅ **Riot の知的財産を尊重**: 公式との混同を避ける

### ❌ 禁止されていること

- ❌ **有料コンテンツ化**: ゲームプレイに課金を要求する
- ❌ **公式を装う**: Riot Games の承認を受けたかのように主張する
- ❌ **過度な商業化**: サイト全体が広告で埋め尽くされる

### 本サイトの対応状況

| 要件 | 対応状況 |
|------|---------|
| 無料で提供 | ✅ 完全無料 |
| 非公式の明記 | ✅ フッター・利用規約・著作権ポリシーに明記 |
| プライバシーポリシー | ✅ 設置済み（広告・Cookie対応） |
| 利用規約 | ✅ 設置済み（広告条項追加済み） |
| 著作権ポリシー | ✅ 設置済み |
| 適度な広告 | ✅ フッター上部に1箇所のみ |

---

## 🧪 広告が正しく表示されるか確認

### ローカルでのテスト

**注意**: AdSense 広告は `localhost` では表示されません。公開URLで確認してください。

### 公開URLでの確認

1. **サイトをデプロイ**
   - GitHub Pages: `https://pantherdragonpandora-debug.github.io/lol-wordwolf/`
   
2. **ブラウザで確認**
   - デプロイされたURLにアクセス
   - フッター上部に広告スペースが表示されるか確認

3. **ブラウザの開発者ツールで確認**
   - F12 を押してコンソールを開く
   - エラーがないか確認
   - 広告関連のスクリプトが読み込まれているか確認

### AdSense 承認前の表示

- **承認前**: 広告スペースは空白のまま
- **承認後**: 数時間〜1日で広告が表示開始

---

## 🔧 トラブルシューティング

### 問題 1: 広告が表示されない

**原因**:
- AdSense がまだ承認されていない
- 広告ブロッカーが有効になっている
- Publisher ID が間違っている

**解決策**:
1. AdSense 管理画面で承認状況を確認
2. 広告ブロッカーを無効化して再確認
3. `ca-pub-XXXXXXXXXX` が正しいか確認

### 問題 2: 「AdSense コードの重複」エラー

**原因**:
- 同じ AdSense スクリプトが複数回読み込まれている

**解決策**:
- `<head>` セクションに AdSense スクリプトが1回だけ含まれているか確認

### 問題 3: コンソールに「adsbygoogle.push() error」

**原因**:
- 広告スロット ID が間違っている
- AdSense がまだ承認されていない

**解決策**:
1. `data-ad-slot` の値が正しいか確認
2. AdSense 管理画面で広告ユニットのスロット ID を再確認

### 問題 4: ポリシー違反の警告

**原因**:
- コンテンツが AdSense ポリシーまたは Legal Jibber Jabber ポリシーに違反している

**解決策**:
1. プライバシーポリシーと利用規約が正しく設置されているか確認
2. 非公式である旨が明記されているか確認
3. 過度な広告がないか確認（本サイトは1箇所のみなので問題なし）

---

## 📊 収益の確認

### AdSense レポート

1. **AdSense 管理画面 → レポート**
2. 以下の指標を確認：
   - **表示回数**: 広告が表示された回数
   - **クリック数**: 広告がクリックされた回数
   - **CPC（クリック単価）**: 1クリックあたりの収益
   - **見積もり収益額**: 現在の収益

### 支払いスケジュール

- **支払い基準額**: 8,000円（日本）
- **支払い時期**: 毎月21日頃（前月分）
- **支払い方法**: 銀行振込

---

## 💡 広告最適化のヒント

### 1. 広告配置

- ✅ **フッター上部**: ユーザーエクスペリエンスを損なわない位置
- ❌ **ゲーム画面内**: プレイの妨げになる
- ❌ **ポップアップ**: ユーザーに不快感を与える

### 2. 広告密度

- **推奨**: ページ全体の 30% 以下
- **本サイト**: フッター上部の1箇所のみ（約 5%）= ✅ 適切

### 3. コンテンツの質

- オリジナルで有益なコンテンツを提供
- 定期的に更新やメンテナンスを行う
- ユーザーフィードバックに対応する

---

## 📄 関連ドキュメント

- [Google AdSense ヘルプセンター](https://support.google.com/adsense)
- [Riot Games Legal Jibber Jabber](https://www.riotgames.com/en/legal)
- [プライバシーポリシー](./privacy.html)
- [利用規約](./terms.html)
- [著作権ポリシー](./copyright.html)

---

## ✅ チェックリスト

実装前に以下を確認してください：

- [ ] AdSense アカウントを作成した
- [ ] Publisher ID（`ca-pub-XXXXXXXXXX`）を取得した
- [ ] `index.html` の `<head>` に AdSense スクリプトを設置した
- [ ] AdSense 管理画面で広告ユニットを作成した
- [ ] 広告スロット ID（`YYYYYYYYYY`）を取得した
- [ ] `index.html` のフッター上部に広告ユニットコードを設置した
- [ ] プライバシーポリシーに広告に関する記載がある（✅ 完了済み）
- [ ] 利用規約に広告に関する条項がある（✅ 完了済み）
- [ ] サイトをデプロイした
- [ ] 公開URLで広告が正しく表示されるか確認した
- [ ] AdSense の審査結果を待つ

---

## 🎉 完了！

これで Google AdSense 広告の実装準備が完了しました！

### 次のステップ

1. **AdSense の審査を待つ**（1〜2週間）
2. **承認されたら広告が自動的に表示開始**
3. **定期的に AdSense レポートを確認**
4. **ユーザーフィードバックに基づいて最適化**

### サポート

問題が発生した場合：
1. 本ドキュメントのトラブルシューティングセクションを確認
2. [Google AdSense ヘルプセンター](https://support.google.com/adsense)を参照
3. GitHub リポジトリで Issue を作成

---

**🎮 League of Legends の世界でワードウルフを楽しみながら、サイト運営費用もカバーしましょう！** ⚔️🛡️✨
