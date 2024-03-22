# Server (Google Apps Script コード)

このディレクトリは、Google サーバーで実行される Google Apps Script のコードを保存する場所です。

## 要件

サーバーコードには次のものが必要です。

- アプリをロードするエントリポイント(`index.ts`という名前のファイル)。
- 以下のようにエントリポイントで、public 関数を`import`、`export`する必要があります。

  ```javascript
  import { someFunction } from './ui';
  export { someFunction };
  ```

[ui.js](./ui.js)ファイルを参照すると、メニューにメニュー項目を追加する方法、開発設定を適切に設定する方法がわかります。

## ビルド

ここのサーバー側コードは、[v8 ランタイム](https://developers.google.com/apps-script/guides/v8-runtime) と互換性のある設定を使用してコンパイルされます。

設定(権限設定、ランタイムなど)を切り替える場合は、[appsscript.json](../../appsscript.json)ファイルを更新してください。
