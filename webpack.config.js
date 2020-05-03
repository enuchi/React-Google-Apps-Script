/*********************************
 *       import webpack plugins
 ********************************/
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackCleanPlugin = require('webpack-clean');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const moduleToCdn = require('module-to-cdn');

/*********************************
 *       define file paths
 ********************************/
const destination = 'dist';
const htmlTemplate = './src/client/dialog-template.html';

/*********************************
 *    client entry point paths
 ********************************/
const clientEntrypoints = [
  {
    name: 'CLIENT - main dialog',
    entry: './src/client/MainDialog.jsx',
    filename: 'main.html',
  },
  {
    name: 'CLIENT - about sidebar',
    entry: './src/client/AboutDialog.jsx',
    filename: 'about.html',
  },
];

/*********************************
 *       Declare settings
 ********************************/

// any shared client & server settings
const sharedConfigSettings = {
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

// eslint settings, to check during build if desired
const eslintConfig = {
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    cache: false,
    failOnError: false,
    fix: true,
  },
};

// appscript copy settings, to copy this file over to the destination directory
const appsscriptConfig = {
  name: 'COPY APPSSCRIPT.JSON',
  entry: './appsscript.json',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './appsscript.json',
      },
    ]),
  ],
};

// config shared for all client settings
const clientConfig = {
  ...sharedConfigSettings,
  output: {
    path: path.resolve(__dirname, destination),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      // turned off by default, but uncomment below to run linting during build
      // eslintConfig,
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

// config for EACH client entrypoint
const clientConfigs = clientEntrypoints.map(clientEntrypoint => {
  return {
    ...clientConfig,
    name: clientEntrypoint.name,
    entry: clientEntrypoint.entry,
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        filename: clientEntrypoint.filename,
        inlineSource: '^[^(//)]+.(js|css)$', // embed all js and css inline, exclude packages with '//' for dynamic cdn insertion
      }),
      new HtmlWebpackInlineSourcePlugin(),
      new WebpackCleanPlugin([path.join(destination, 'main.js')]),
      new DynamicCdnWebpackPlugin({
        verbose: true,
        resolver: (packageName, packageVersion, options) => {
          const moduleDetails = moduleToCdn(
            packageName,
            packageVersion,
            options
          );
          if (moduleDetails) {
            return moduleDetails;
          }
          switch (packageName) {
            case 'react-transition-group':
              return {
                name: packageName,
                var: 'ReactTransitionGroup',
                version: packageVersion,
                url: `https://unpkg.com/react-transition-group/dist/react-transition-group.min.js`,
              };
            default:
              return null;
          }
        },
      }),
    ],
  };
});

const serverConfig = {
  ...sharedConfigSettings,
  name: 'SERVER',
  entry: './src/server/index.js',
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, destination),
    libraryTarget: 'this',
  },
  module: {
    rules: [
      // turned off by default, but uncomment below to run linting during build
      // eslintConfig,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            properties: false,
          },
          mangle: false,
          module: false,
          output: {
            beautify: true,
          },
          toplevel: false,
          nameCache: null,
          ie8: true,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
  plugins: [new GasPlugin()],
};

module.exports = [
  // 1. Copy the appscript file.
  appsscriptConfig,
  // 2. One client bundle for each client entrypoint.
  ...clientConfigs,
  // 3. Bundle the server
  serverConfig,
];
