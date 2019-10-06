const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WebpackCleanPlugin = require('webpack-clean');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

// settings
const destination = 'dist';
const htmlTemplate = './src/client/dialog-template.html';
const htmlWebpackInlineSourcePlugin = new HtmlWebpackInlineSourcePlugin();
const webpackCleanPlugin = new WebpackCleanPlugin([
  destination + '/' + 'main.js',
]);

// Client entrypoints:
const clientEntrypoints = [
  {
    name: 'CLIENT - main dialog',
    entry: './src/client/main.tsx',
    filename: 'main.html',
  },
  {
    name: 'CLIENT - about sidebar',
    entry: './src/client/about.tsx',
    filename: 'about.html',
  },
];

const sharedConfigSettings = {
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          warnings: false,
          ie8: true,
          mangle: false,
          compress: {
            properties: false,
          },
          output: {
            beautify: true,
          },
        },
      }),
    ],
  },
  module: {},
};

const appsscriptConfig = {
  name: 'COPY APPSSCRIPT.JSON',
  entry: './appsscript.json',
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: './appsscript.json',
      },
    ]),
  ],
};

const clientConfig = {
  ...sharedConfigSettings,
  output: {
    path: path.resolve(__dirname, destination),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const clientConfigs = clientEntrypoints.map(clientEntrypoint => {
  return {
    ...clientConfig,
    name: clientEntrypoint.name,
    entry: clientEntrypoint.entry,
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        filename: clientEntrypoint.filename,
        inlineSource: '.(js|css)$', // embed all javascript and css inline
      }),
      htmlWebpackInlineSourcePlugin,
      webpackCleanPlugin,
    ],
  };
});

const serverConfig = {
  ...sharedConfigSettings,
  name: 'SERVER',
  entry: './src/server/code.ts',
  output: {
    filename: 'Code.js',
    path: path.resolve(__dirname, destination),
    libraryTarget: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new GasPlugin()],
};

module.exports = [appsscriptConfig, ...clientConfigs, serverConfig];
