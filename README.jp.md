<p align="center">
  <a href="" rel="noopener">
 <img width="400" src="https://i.imgur.com/83Y7bWN.png" alt="React & Google Apps Script logos"></a>
</p>
<p align="center"><i>
  更新 2022年：React v17 と React Fast Refreshをサポートしました。
</i></p>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg?color=46963a&style=flat-square)]()
[![GitHub Issues](https://img.shields.io/github/issues/enuchi/React-Google-Apps-Script.svg?color=lightblue&style=flat-square)](https://github.com/enuchi/React-Google-Apps-Script/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/enuchi/React-Google-Apps-Script.svg?color=blue&style=flat-square)](https://github.com/enuchi/React-Google-Apps-Script/pulls)
[![License](https://img.shields.io/github/license/enuchi/React-Google-Apps-Script?color=pink&style=flat-square)](/LICENSE)

</div>

<p align="center"> 🚀 このプロジェクトは、Google Sheets, Docs, Forms and Slides内にReactアプリを開発するためのBoilerplateプロジェクトです。個人開発、Google Workspace Marketplaceのアドオンを公開するような開発に最適です。
</p>

---

## 📝 目次

- [概要](#about)
- [インストール](#install)
  - [前提条件](#prerequisites)
  - [はじめに](#getting-started)
- [デプロイ](#deploy)
- [[New!] ローカル開発](#local-development)
  - [React 開発ツールの使い方](#dev-tools)
- [使い方](#usage)
  - [付属サンプルアプリ](#the-included-sample-app)
  - [[New!] TypeScript](#new-typescript)
  - [パッケージ追加](#adding-packages)
  - [スタイル(CSS など)](#styles)
  - [スコープの変更](#modifying-scopes)
  - [サーバー側 Google Apps Script 関数の呼び出し](#calling-server-side-google-apps-script-functions)
  - [オートコンプリート(自動補完)](#Autocomplete)
- [作者](#authors)
- [感謝の言葉](#acknowledgement)

<br/>

## 🔎 概要 <a name = "about"></a>

[Google Apps Script](https://developers.google.com/apps-script/overview)は、Google が開発した JavaScript ベースの開発プラットフォームです。Google Sheets、Docs、Forms、およびその他の Google Apps 用のアプリケーションとアドオンを開発することができます。

[ダイアグラムウィンドウ](https://developers.google.com/apps-script/guides/html)にカスタムユーザーインタフェースを追加することができますが、Google Apps Script は、シンプルな HTML ページ用に設計されています。AppsScript テンプレートと jQuery を使います。

しかし、このリポジトリを使うことで、[React](https://reactjs.org/)アプリをダイアグラム Window で実行することができますし、Google Apps 用のアプリケーションとアドオンを公開することができます。

<p align="center">
 <img width="75%" src="https://i.imgur.com/BZvQ5ua.png" alt="React & Google Apps Script">
</p>

このリポジトリは React と今までのウェブサイト構築に使用するのと同じ開発ツールをすべて Google Apps Script プロジェクト内で使用できるボイラープレートプロジェクトです。

開始方法は以下を参照してください。

<br/>

## 🚜 インストール <a name = "install"></a>

以下の手順に従って、ローカル PC に React プロジェクトのコードをセットアップします。また、`clasp`にログインできるので、コマンドラインから React プロジェクトを管理できます。

プロジェクトをデプロイして、Google スプレッドシートで実際に表示する方法については、[デプロイ](#deploy)を参照してください。

### 前提条件 <a name = "prerequisites"></a>

- [Node.js](https://nodejs.org/en/download/) v10 以上がインストールされていること
- `npm` v6 以上がインストールされていること。
- [script.google.com/home/usersettings](https://script.google.com/home/usersettings)を確認して「Google Apps Script API」がオンになっていること。
- [New!] 開発中にライブリロードを使う場合は、ローカル環境で HTTPS を使えるようにする必要があります。どのように設定するかは、[ローカル開発](#local-development)をご覧ください。

### 🏁 はじめに <a name = "getting-started"></a>

**1.** まず、リポジトリをクローンして、依存ライブラリ(dependencies)をインストールします。

```bash
$ git clone https://github.com/enuchi/React-Google-Apps-Script.git
$ cd React-Google-Apps-Script
$ npm install
```

<img width="100%" src="https://i.imgur.com/EGSsCqO.gif">

**2.** 次に、[clasp](https://github.com/google/clasp)にログインしましょう。clasp により、ローカル環境で Google Apps Script プロジェクトを管理できます。

```bash
$ npm run login
```

<img width="100%" src="https://i.imgur.com/zKCgkMl.gif">

**3.** 次に、セットアップスクリプトを実行して、コマンドラインから Google スプレッドシートとスクリプトプロジェクトを新規作成します。

```bash
$ npm run setup
```

<img width="100%" src="https://imgur.com/Zk2eHFV.gif">

Google スプレッドシートを新規作成するのではなく、既にある Google スプレッドシートとスクリプトファイルを使用することもできます。

<details>
  <summary>既存のスプレッドシートを使用する手順については、こちらを参照してください。</summary>

以下、3 つの「キーと値(Key-Value)」を使用して、このプロジェクトのルートにある`.clasp.json`ファイルを更新する必要があります(具体例として`.clasp.json.SAMPLE`ファイルを参照してください)。

```json
{
  "scriptId": "1PY037hPcy................................................",
  "parentId": ["1Df30......................................."],
  "rootDir": "./dist"
}
```

- `scriptId`: 既存スクリプト(GAS)プロジェクトの`scriptId(スクリプトID)`です。Google スプレッドシートメニューの**拡張機能 > App Script**を選択し、スクリプトエディタが開いたら、**左ナビ > プロジェクト設定 > ID > スクリプト ID**から取得することがきます.
- `parentId`：スクリプトプロジェクトがバインドされている親ファイル (Google スプレッドシート、ドキュメントなど)の ID の配列を指定します。`parentId(親ID)`は、URL から取得できます。URL 形式は、「https://docs.google.com/spreadsheets/d/{親ID}/edit」です。
- `rootDir`：「./dist」を必ず設定してください。プロジェクトファイルの保存に使用されるローカルビルドフォルダーです。

</details>

次に、React アプリをデプロイして、Google スプレッドシートでライブ表示できるようにしましょう。

<br/>

## 🚀 デプロイ <a name = "deploy"></a>

deploy コマンドを実行します。マニフェストファイルを更新するように求められる場合があります(`Manifest file has been updated. Do you want to push and overwrite? (y/N)`)。 `y`と入力します。

```bash
$ npm run deploy
```

deploy コマンドは、サーバーコード(Google Apps Script)、クライアントコード(React コード)、および構成ファイルを本番環境設定(production settings)を使用して全てのファイルをビルド＆デプロイするコマンドです。バンドルされたファイルは`dist/`フォルダーに出力され、クラウド上の Google Apps Script プロジェクトに push されます。

`npm run open`をターミナルで実行し、新規作成した Google スプレッドシート(ファイル名："My React Project")を開きます。"My React Project"を開いている場合は、必ずページを再読み込みしてください。新メニュー("My Sample React Project")が表示されることが確認できます。

<img width="100%" src="https://i.imgur.com/W7UkEpv.gif">

<br/>

## 🎈 [NEW!] ローカル開発 <a name="local-development"></a>

クライアント側の React アプリをローカルで開発し、変更内容を Google スプレッドシートのダイアログウィンドウ内で直接確認できます。

<img width="100%" src="https://i.imgur.com/EsnOEHP.gif">

ローカル開発を開始するには、1. 証明書の生成とインストール(初回のみ)、2. 開始(start)コマンド実行、の 2 手順が必要です。

1. ローカル開発用の証明書の生成 <a name = "generatingcerts"></a>

   mkcert パッケージをインストールします:

   ```bash
   # mac:
   $ brew install mkcert

   # windows:
   $ choco install mkcert
   ```

   [その他インストールオプションはこちら。](https://github.com/FiloSottile/mkcert#installation)

   次に、mkcert をインストールします:

   ```bash
   $ mkcert -install
   ```

   リポジトリに証明書を作成します:

   ```
   $ npm run setup:https
   ```

2. 開始(start)コマンドを実行します:
   ```bash
   npm run start
   ```

開始(start)コマンドは、開発ビルドを作成、デプロイし、ローカルファイルを提供します。

<img width="100%" src="https://imgur.com/uD4uZZK.gif">

開始(start)コマンドを実行した後、"My React Project"スプレッドシートのメニュー項目の 1 つを開きます。例えば、"My Sample React Project > Sheet Editor"です。 これで、ローカルファイルが提供されるはずです。React アプリに変更を加えて保存すると、アプリは Google スプレッドシート内で即座にリロードされ、サーバー側の function にアクセスできるようになります!

<img width="100%" src="https://i.imgur.com/EsnOEHP.gif">

[Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin)のお陰で、ファイルが変更時にコンポーネントのみが更新され、状態(state)が失われないようになりました。

<br/>

### 🔍 React DevTools の使い方 <a name="dev-tools"></a>

React DevTools は、開発中に React コンポーネントの階層を表示できるツールです。

<details>
  <summary>React DevToolsのインストール手順</summary>
<br/>

React アプリは、iframe で実行されているため、React DevTools のスタンドアロン版を使用する必要があります ([詳細はこちら](https://github.com/facebook/react/tree/main/packages/react-devtools#usage-with-react-dom))。

1. React DevTools を devDependencies(開発用の依存関係)としてインストールします。:

   ```bash
   npm install -D react-devtools
   ```

2. ターミナルで`npx react-devtools`を実行して、React DevTools スタンドアロン版を起動します。

3. React アプリの `<head>` の先頭に `<script src="http://localhost:8097"></script>` を追加します。例として、Bootstrap 版サンプルの[index.html](https://github.com/enuchi/React-Google-Apps-Script/blob/e73e51e56e99903885ef8dd5525986f99038d8bf/src/client/dialog-demo-bootstrap/index.html)に追加してみてください。

4. アプリをデプロイ (`npm run deploy:dev`)すると、React DevTools が実行され、アプリの階層が表示されます。

   <img width="100%" src="https://user-images.githubusercontent.com/31550519/110273600-ee9eae80-7f9a-11eb-9796-31353b47dfa8.gif">

5. 本番環境にデプロイする前に、`<script>`タグを必ず削除してください。

</details>

<br/>

## ⛏️ 使い方 <a name = "usage"></a>

### 付属サンプルアプリ <a name = "the-included-sample-app"></a>

付属サンプルの React アプリでは、HTML ダイアログからシートを挿入/アクティブ化/削除できます。このシンプルな React アプリは、Google Apps Script の関数を使用して、React アプリとスプレッドシートを相互連携する方法を示しています。

付属サンプルの React アプリには、3 つのメニュー項目があります。

同じアプリの 2 つのバージョンが異なるスタイルで記載されています。1 つ目のバージョンは、Vanilla React を使用し、2 つ目のバージョンは、人気の bootstrap ライブラリを使っています。(この場合は [`react-bootstrap`](https://react-bootstrap. github.io/))。bootstrap の例には、TypeScript で作成されたページの例も含まれています(以下を参照)。

3 つ目のアプリは、サイドバーダイアログを読み込む方法を説明しています。

新しいメニュー項目("My Sample React Project > About me")から、ダイアログにアクセスします。初めてアプリを使用するときは、アプリ権限を承認する必要があります。

### [New!] TypeScript <a name = "new-typescrip"></a>

このプロジェクトは、TypeScript をサポートするようになりました!

使用する場合は、クライアントコード(.ts/.tsx)または、サーバーコード(.ts)で、TypeScript の拡張子を使用するだけです。TypeScript ファイルが適切な形式にコンパイルされます。

クライアント側のコードについては、[Bootstrap デモの FormInput.tsx](./src/client/dialog-demo-bootstrap/components/FormInput.tsx)ファイルを参照してください。Bootstrap デモでは、JavaScript と TypeScript が混在しても問題ないことを確認してください。

サーバーコードで TypeScript を使用するには、ファイル拡張子を`.ts`に変更するだけです。サーバー側のコードは、Google Apps Script API の型定義が既に設定済みです。

コードが TypeScript から JavaScript にトランスパイル(言語変換)された後、Google Apps Script と互換性のあるコードに、再度トランスパイルされるため、ここでは基本的な TypeScript の設定が使用されます。ただし、セットアップをより詳細に制御したい場合は、[tsconfig.json ファイル](./tsconfig.json)を変更することができます。

### パッケージの追加 <a name="adding-packages"></a>

クライアント側の React アプリにパッケージを追加できます。

例えば、npm で`react-transition-group`をインストールする場合:

```bash
npm install react-transition-group
```

重要: Google Apps Scripts プロジェクトでは、外部ファイルを簡単に参照できないため、このプロジェクトではアプリ全体を 1 つの HTML ファイルにまとめます。これにより、大きなパッケージをインポートする場合、ファイルのサイズが大きくなる可能性があります。ファイルを分割しやすくするために、パッケージの CDN URL を取得し、[ここの webpack ファイル](./webpack.config.js#L157)で宣言できます。適切に設定すると、CDN からパッケージをロードするスクリプトタグが追加されバンドルサイズが縮小されます。

### スタイル(CSS など) <a name="styles"></a>

標準で、このプロジェクトはグローバル CSS をサポートしています。エントリポイントファイル[index.js](./src/client/dialog-demo/index.js)に CSS を必ずインポートしてください。

```javascript
import './styles.css';
```

多くの外部コンポーネントライブラリは、適切に機能するために CSS を必要とします。CSS を HTML テンプレートにインポートできます。[ここでは Bootstrap の CSS で示されています](./src/client/dialog-demo-bootstrap/index.html)

webpack.config.js ファイルを変更して、scss やその他のスタイルライブラリをサポートすることもできます。

### スコープの変更 <a name="modifying-scopes"></a>

付属の React アプリは、Google スプレッドシートへのアクセスと、ダイアログウィンドウの読み込みの権限を必要とします。アプリ権限を変更する場合、例えば、このプロジェクトを変更して Google フォームやドキュメントで動作するようにする場合は、[appscript.json ファイル](./appsscript.json)の oauthScopes を必ず編集してください。

`appsscript.json`データ構造については、https://developers.google.com/apps-script/manifestを参照してください。

### サーバー側 Google Apps Script 関数の呼び出し <a name="calling-server-side-google-apps-script-functions"></a>

このプロジェクトでは、[gas-client](https://github.com/enuchi/gas-client)パッケージを使用して、Promise でサーバー側の関数をより簡単に呼び出すことができます。

```js
// Google's documentation wants you to do this. Boo.
google.script.run
  .withSuccessHandler((response) => doSomething(response))
  .withFailureHandler((err) => handleError(err))
  .addSheet(sheetTitle);

// Poof! With a little magic we can now do this:
import Server from 'gas-client';
const { serverFunctions } = new Server();

// We now have access to all our server functions, which return promises!
serverFunctions
  .addSheet(sheetTitle)
  .then((response) => doSomething(response))
  .catch((err) => handleError(err));

// Or we can equally use async/await style:
async () => {
  try {
    const response = await serverFunctions.addSheet(sheetTitle);
    doSomething(response);
  } catch (err) {
    handleError(err);
  }
};
```

開発時、`gas-client`は[カスタム Webpack Dev Server パッケージ](https://github.com/enuchi/Google-Apps-Script-Webpack-Dev-Server)と連携し、アプリ内部で実行できるようにします。ダイアログウィンドウに表示され、Google Apps Script 関数と連携します。

### オートコンプリート(自動補完) <a name="Autocomplete"></a>

このプロジェクトでは、Google Apps Script メソッドのオートコンプリート(自動補完)と完全な型定義のサポートが含まれています。

![自動補完サポート](https://i.imgur.com/E7FLeTX.gif 'autocomplete')

Google Apps Script API から利用可能なすべてのメソッドが、完全な定義と公式ドキュメントへのリンクとともに表示されます。また、引数、戻り値の型、サンプルコードに関する情報も含まれています。

<br/>

## ✍️ 作者 <a name = "authors"></a>

- [@enuchi](https://github.com/enuchi) - Creator and maintainer

このプロジェクトに参加した[contributors](https://github.com/enuchi/React-Google-Apps-Script/contributors)の一覧をご覧ください。
<br/>

## 🎉 感謝の言葉 <a name = "acknowledgement"></a>

このプロジェクトの一部は、サーバー側プロジェクトの優れたスタータープロジェクトである[apps-script-starter](https://github.com/labnol/apps-script-starter)から採用されています。([ライセンスはこちら](https: //github.com/labnol/apps-script-starter/blob/master/LICENSE))
