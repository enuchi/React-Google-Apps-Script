const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const destination = 'dist';

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/dialog.html",
  filename: "./dialog.html",
  inlineSource: '.(js|css)$' // embed all javascript and css inline
});

const htmlWebpackInlineSourcePlugin = new HtmlWebpackInlineSourcePlugin();

const config = {
  optimization: {
    // Set to true to minimize code (e.g. for production).
    minimize: true
  },
  module: {},
};

const appsscriptConfig = {
  name: "appsscript copy json",
  entry: "./appsscript.json",
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: './appsscript.json'
        // to: path.resolve(__dirname, destination)
      }
    ])
  ]
};

const clientConfig = Object.assign({}, config, {
  name: "CLIENT",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, destination),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },
  plugins: [
    htmlPlugin,
    new HtmlWebpackInlineSourcePlugin()
  ]
});

const serverConfig = Object.assign({}, config, {
  name: "SERVER",
  entry: "./src/code.gs",
  output: {
    filename: 'code.gs',
    path: path.resolve(__dirname, destination),
  },
  module: {
    rules: [
      {
        test: /\.gs$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
  },
  optimization: {
    //don't minimize .gs server code
    minimize: false
  },
  plugins: [
    new GasPlugin()
  ]
});


// Return Array of Configurations
module.exports = [
  // initialConfig,
  appsscriptConfig,
  clientConfig,
  serverConfig,
];