# 🌐 カスタムドメイン設定ガイド

お名前.comで購入したドメインをGitHub Pagesに接続して、Google AdSenseの審査を通すためのガイドです。

## 📋 目次

1. [お名前.com でのDNS設定](#お名前com-でのdns設定)
2. [GitHub Pages でのカスタムドメイン設定](#github-pages-でのカスタムドメイン設定)
3. [動作確認](#動作確認)
4. [Google AdSense に再申請](#google-adsense-に再申請)
5. [トラブルシューティング](#トラブルシューティング)

---

## 🔧 お名前.com でのDNS設定

### ステップ 1: お名前.com にログイン

1. **お名前.com Navi にアクセス**
   - https://www.onamae.com/navi/
   
2. **ログイン**
   - お名前ID（会員ID）とパスワードでログイン

### ステップ 2: DNS設定画面に移動

1. **ドメイン機能一覧** をクリック
2. **DNS関連機能の設定** をクリック
3. 購入したドメインを選択して「次へ」

### ステップ 3: DNSレコードを設定

以下の4つのレコードを追加します：

#### 📝 追加するDNSレコード

| タイプ | ホスト名 | VALUE（値） | TTL |
|--------|----------|-------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | pantherdragonpandora-debug.github.io. | 3600 |

**重要**: CNAMEの値の最後に `.` （ドット）を忘れずに！

### ステップ 4: 設定手順（お名前.com）

1. **「DNSレコード設定を利用する」を選択**
2. **「設定する」ボタンをクリック**
3. **各レコードを追加**:

   **Aレコード（4つ追加）**:
   ```
   タイプ: A
   ホスト名: （空欄または@）
   VALUE: 185.199.108.153
   TTL: 3600
   ```
   これを4回繰り返し、VALUEを以下に変更：
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   **CNAMEレコード（1つ追加）**:
   ```
   タイプ: CNAME
   ホスト名: www
   VALUE: pantherdragonpandora-debug.github.io.
   TTL: 3600
   ```

4. **「追加」ボタンをクリック**
5. **「確認画面へ進む」をクリック**
6. **内容を確認して「設定する」をクリック**

### ✅ DNS設定完了

設定が反映されるまで、通常 **数分〜24時間** かかります（通常は30分程度）。

---

## 🐙 GitHub Pages でのカスタムドメイン設定

### ステップ 1: GitHubリポジトリの設定ページに移動

1. **GitHubにログイン**
2. **リポジトリに移動**: `https://github.com/pantherdragonpandora-debug/lol-wordwolf`
3. **Settings（設定）タブ**をクリック
4. 左サイドバーの **Pages** をクリック

### ステップ 2: カスタムドメインを設定

1. **Custom domain（カスタムドメイン）** のセクションを探す
2. **購入したドメイン名を入力**:
   ```
   例: lol-wordwolf.com
   ```
   または
   ```
   例: lolwordwolf.net
   ```

3. **Save（保存）ボタン**をクリック

### ステップ 3: HTTPS を有効化

1. DNS設定が反映されるまで待つ（数分〜数時間）
2. **Enforce HTTPS（HTTPS を強制する）** のチェックボックスが表示されたら、✅ チェックを入れる

**注意**: DNS設定が反映されるまでは、このチェックボックスは表示されません。

### ✅ GitHub Pages 設定完了

カスタムドメインが設定されると、自動的に `CNAME` ファイルがリポジトリのルートに作成されます。

---

## 🧪 動作確認

### ステップ 1: DNS設定の確認

**Windowsの場合**:
```bash
nslookup lol-wordwolf.com
```

**Mac/Linuxの場合**:
```bash
dig lol-wordwolf.com
```

**期待される結果**:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### ステップ 2: ブラウザで確認

1. **カスタムドメインにアクセス**:
   ```
   https://lol-wordwolf.com
   ```
   （あなたのドメイン名に置き換えてください）

2. **サイトが正しく表示されるか確認**

3. **HTTPSが有効か確認**（URLバーに🔒が表示される）

### ✅ 動作確認完了

サイトが正しく表示されたら、設定成功です！🎉

---

## 📢 Google AdSense に再申請

### ステップ 1: AdSense 管理画面に移動

1. **Google AdSense にログイン**
   - https://www.google.com/adsense/

2. **サイト → サイトを追加**（または既存のサイトを編集）

### ステップ 2: カスタムドメインで申請

1. **サイトURL を入力**:
   ```
   https://lol-wordwolf.com
   ```
   （あなたのドメイン名に置き換えてください）

2. **再審査を申請**

### ステップ 3: AdSense コードが設置されているか確認

`index.html` の広告コードのコメントアウトを外してください（まだの場合）:

#### 編集箇所 1: `<head>` セクション

```html
<!-- 変更前（コメントアウトされている） -->
<!-- 
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
-->

<!-- 変更後（コメントアウトを削除） -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
```

**重要**: `ca-pub-XXXXXXXXXX` を実際の Publisher ID に置き換えてください。

#### 編集箇所 2: フッター上部の広告ユニット

```html
<!-- 変更前（コメントアウトされている） -->
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

<!-- 変更後（コメントアウトを削除） -->
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

**重要**: 
- `ca-pub-XXXXXXXXXX` を実際の Publisher ID に置き換え
- `YYYYYYYYYY` を AdSense で作成した広告スロット ID に置き換え

### ステップ 4: 変更をデプロイ

```bash
git add .
git commit -m "Enable AdSense ads with custom domain"
git push origin main
```

### ✅ AdSense 再申請完了

審査結果を待ちましょう（通常 1〜2週間）。

---

## 🔧 トラブルシューティング

### 問題 1: DNS設定が反映されない

**症状**: カスタムドメインにアクセスしても、サイトが表示されない

**原因**:
- DNS設定の反映に時間がかかっている
- DNSレコードの設定が間違っている

**解決策**:
1. **24時間待つ**（通常は30分〜1時間で反映）
2. **お名前.comのDNS設定を再確認**:
   - Aレコード: 4つ全て追加されているか
   - CNAMEレコード: `pantherdragonpandora-debug.github.io.` の最後にドット（`.`）があるか

3. **キャッシュをクリア**:
   - ブラウザのキャッシュをクリア
   - Ctrl + Shift + R でスーパーリロード

### 問題 2: GitHub Pages で「DNS check unsuccessful」エラー

**症状**: GitHub Pages の設定画面で DNS エラーが表示される

**原因**:
- DNS設定が正しくない
- DNS設定がまだ反映されていない

**解決策**:
1. **お名前.comのDNS設定を再確認**
2. **数時間待つ**
3. **GitHub Pages でカスタムドメインを一度削除して、再度追加**

### 問題 3: HTTPS が有効にならない

**症状**: 「Enforce HTTPS」のチェックボックスがグレーアウトしている

**原因**:
- DNS設定がまだ反映されていない
- GitHub が SSL 証明書を発行中

**解決策**:
1. **24時間待つ**（GitHubが自動的にSSL証明書を発行）
2. **カスタムドメインを一度削除して、再度追加**

### 問題 4: AdSense で「サイトにアクセスできません」エラー

**原因**:
- DNS設定が反映されていない
- サイトが正しく表示されていない

**解決策**:
1. **ブラウザでカスタムドメインにアクセスして、サイトが表示されるか確認**
2. **HTTPS が有効になっているか確認**
3. **robots.txt でクロールがブロックされていないか確認**

---

## 📊 設定完了チェックリスト

すべて完了したら、以下をチェックしてください：

- [ ] お名前.comでドメインを購入した
- [ ] お名前.comでDNSレコード（A × 4、CNAME × 1）を設定した
- [ ] GitHub Pagesでカスタムドメインを設定した
- [ ] DNS設定が反映された（`nslookup` または `dig` で確認）
- [ ] カスタムドメインでサイトにアクセスできる
- [ ] HTTPSが有効になっている（🔒マークが表示される）
- [ ] `index.html` の AdSense コードのコメントアウトを外した
- [ ] Publisher ID と広告スロット ID を設定した
- [ ] 変更をGitHubにプッシュした
- [ ] Google AdSense にカスタムドメインで再申請した
- [ ] AdSense の審査結果を待つ

---

## 🎉 完了！

これでカスタムドメインの設定が完了し、Google AdSense の審査に再申請できます！

審査結果を待つ間に、以下を確認しておきましょう：
- ✅ サイトが正しく動作しているか
- ✅ プライバシーポリシーと利用規約が表示されているか
- ✅ ゲーム機能が正常に動作しているか

---

## 📄 関連ドキュメント

- [ADS.md](./ADS.md) - Google AdSense 広告実装ガイド
- [README.md](./README.md) - プロジェクト全体の説明
- [privacy.html](./privacy.html) - プライバシーポリシー
- [terms.html](./terms.html) - 利用規約

---

**🌐 カスタムドメインでの運営、頑張ってください！** 🎮⚔️✨
