# 🔧 DNS設定トラブルシューティング

## エラー内容
```
Both moba-wordwolf.com and its alternate name are improperly configured
Domain's DNS record could not be retrieved. (InvalidDNSError)
```

---

## ✅ 解決手順

### ステップ1: お名前.comのDNS設定を確認

#### 確認すべきポイント

**お名前.com Navi → DNS設定 → DNSレコード設定** で以下が設定されているか確認：

| タイプ | ホスト名 | VALUE | TTL |
|--------|----------|-------|-----|
| A | **空欄**または**@** | 185.199.108.153 | 3600 |
| A | **空欄**または**@** | 185.199.109.153 | 3600 |
| A | **空欄**または**@** | 185.199.110.153 | 3600 |
| A | **空欄**または**@** | 185.199.111.153 | 3600 |
| CNAME | **www** | **pantherdragonpandora-debug.github.io.** | 3600 |

#### ⚠️ よくある間違い

1. **Aレコードのホスト名に「moba-wordwolf.com」と入力している**
   - ❌ 間違い: `moba-wordwolf.com`
   - ✅ 正しい: **空欄** または `@`

2. **CNAMEレコードのVALUEの最後のドット（.）が抜けている**
   - ❌ 間違い: `pantherdragonpandora-debug.github.io`
   - ✅ 正しい: `pantherdragonpandora-debug.github.io.` （最後にドット）

3. **ネームサーバーがお名前.comのものになっていない**
   - お名前.comでDNSを使う場合、ネームサーバーは以下であるべき：
     - `dns1.onamae.com`
     - `dns2.onamae.com`

---

### ステップ2: ネームサーバーの確認と変更

#### お名前.comのネームサーバーを使っているか確認

1. **お名前.com Navi にログイン**
2. **ドメイン一覧** で `moba-wordwolf.com` を探す
3. **「ネームサーバー」** の列を確認

#### もし別のネームサーバーが設定されている場合

1. **ドメイン一覧** → **ネームサーバー** → **「変更する」**
2. **「お名前.comのネームサーバーを使う」** を選択
3. 確認して **「設定する」** をクリック

設定後、反映まで **数時間〜24時間** かかります。

---

### ステップ3: DNS設定の反映を確認

#### Windowsの場合

コマンドプロンプト（cmd）を開いて：

```cmd
nslookup moba-wordwolf.com
```

#### Mac/Linuxの場合

ターミナルを開いて：

```bash
dig moba-wordwolf.com
```

#### 期待される結果

```
Name:    moba-wordwolf.com
Address: 185.199.108.153
Address: 185.199.109.153
Address: 185.199.110.153
Address: 185.199.111.153
```

このように4つのIPアドレスが返ってくればOK！

---

### ステップ4: GitHub Pagesの設定を一旦削除して再設定

DNS設定が反映されたら、GitHubで以下を実行：

1. **GitHub → リポジトリ → Settings → Pages**
2. **Custom domain の入力欄を空にして Save**（一旦削除）
3. **30秒待つ**
4. **再度 `moba-wordwolf.com` と入力して Save**
5. **数分待つ**
6. **DNS Check が成功すると、「Enforce HTTPS」のチェックボックスが表示される**

---

## 🕐 DNS設定の反映時間

| 設定項目 | 反映時間 |
|---------|---------|
| お名前.comでのDNSレコード追加 | 数分〜1時間 |
| ネームサーバー変更 | 数時間〜24時間 |
| GitHub PagesでのDNS確認 | DNSレコード反映後、数分 |
| HTTPS証明書の発行 | DNS確認後、数分〜24時間 |

**現在の状況**: ドメイン購入からまだ時間が経っていない場合、**単純に反映待ち**の可能性が高いです。

---

## 📋 確認チェックリスト

以下を順番に確認してください：

### □ ステップ1: お名前.comのDNS設定を確認

- [ ] Aレコードが4つある
- [ ] Aレコードのホスト名が **空欄** または **@**
- [ ] Aレコードの値が GitHub のIPアドレス4つ
- [ ] CNAMEレコードが1つある
- [ ] CNAMEのホスト名が **www**
- [ ] CNAMEの値が `pantherdragonpandora-debug.github.io.` （**最後にドット**）

### □ ステップ2: ネームサーバーを確認

- [ ] ネームサーバーが `dns1.onamae.com` と `dns2.onamae.com`
- [ ] もし違う場合は、お名前.comのネームサーバーに変更

### □ ステップ3: DNS反映を確認

- [ ] `nslookup moba-wordwolf.com` で GitHub のIPアドレスが返ってくる
- [ ] 反映されていない場合は、**数時間〜24時間待つ**

### □ ステップ4: GitHub Pagesを再設定

- [ ] GitHub Pages でカスタムドメインを一旦削除
- [ ] 再度 `moba-wordwolf.com` を入力
- [ ] DNS Check が成功する

---

## 🎯 今すぐやるべきこと

### 1. お名前.comのDNS設定を確認

**お名前.com Navi → ドメイン一覧 → moba-wordwolf.com → DNS設定**

上記のチェックリストと照らし合わせて、正しく設定されているか確認。

### 2. ネームサーバーを確認

**お名前.com Navi → ドメイン一覧 → ネームサーバー列**

`dns1.onamae.com` / `dns2.onamae.com` になっているか確認。

### 3. 反映を待つ

設定が正しければ、**数時間待つ**だけでOKです。

### 4. コマンドで確認

定期的に以下を実行して、DNS設定が反映されたか確認：

```bash
nslookup moba-wordwolf.com
```

---

## 💡 それでも解決しない場合

以下の情報を教えてください：

1. **お名前.comのDNS設定画面のスクリーンショット**（設定内容を確認）
2. **ネームサーバーは何になっていますか？**
3. **ドメインを購入してから何時間経ちましたか？**
4. **`nslookup moba-wordwolf.com` の結果**（コマンド実行結果をコピペ）

これらの情報があれば、より具体的にサポートできます！

---

## ✅ 正しい設定例（コピペ用）

お名前.comのDNS設定画面で、以下のように設定してください：

```
【Aレコード 1つ目】
タイプ: A
ホスト名: （空欄）
VALUE: 185.199.108.153
TTL: 3600

【Aレコード 2つ目】
タイプ: A
ホスト名: （空欄）
VALUE: 185.199.109.153
TTL: 3600

【Aレコード 3つ目】
タイプ: A
ホスト名: （空欄）
VALUE: 185.199.110.153
TTL: 3600

【Aレコード 4つ目】
タイプ: A
ホスト名: （空欄）
VALUE: 185.199.111.153
TTL: 3600

【CNAMEレコード】
タイプ: CNAME
ホスト名: www
VALUE: pantherdragonpandora-debug.github.io.
TTL: 3600
```

**重要**: CNAMEの値の最後に `.` （ドット）を忘れずに！

---

**焦らず、設定を確認して、反映を待ちましょう！** 🕐✨
