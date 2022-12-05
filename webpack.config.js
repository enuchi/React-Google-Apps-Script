/*********************************
 *    import webpack plugins
 ********************************/
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('@effortlessmotion/html-webpack-inline-source-plugin');
const DynamicCdnWebpackPlugin = require('@effortlessmotion/dynamic-cdn-webpack-plugin');
const moduleToCdn = require('module-to-cdn');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

/*********************************
 *    set up environment variables
 ********************************/
const dotenv = require('dotenv').config();

const parsed = dotenv.error ? {} : dotenv.parsed;
const envVars = parsed || {};
const PORT = envVars.PORT || 3000;
envVars.NODE_ENV = process.env.NODE_ENV;
envVars.PORT = PORT;

const isProd = process.env.NODE_ENV === 'production';
const isWebpackServe = process.env.WEBPACK_SERVE === 'true';

const publicPath = process.env.ASSET_PATH || '/';

/*********************************
 *    define entrypoints
 ********************************/
// our destination directory
const destination = path.resolve(__dirname, 'dist');

// define server paths
const serverEntry = './src/server/index.ts';

// define appsscript.json file path
const copyAppscriptEntry = './appsscript.json';

// define live development dialog paths
const devDialogEntry = './dev/index.js';

// define client entry points and output names
const clientEntrypoints = [
  {
    name: 'CLIENT - Dialog Demo',
    entry: './src/client/dialog-demo/index.js',
    filename: 'dialog-demo', // we'll add the .html suffix to these
    template: './src/client/dialog-demo/index.html',
  },
  {
    name: 'CLIENT - Dialog Demo Bootstrap',
    entry: './src/client/dialog-demo-bootstrap/index.js',
    filename: 'dialog-demo-bootstrap',
    template: './src/client/dialog-demo-bootstrap/index.html',
  },
  {
    name: 'CLIENT - Dialog Demo MUI',
    entry: './src/client/dialog-demo-mui/index.js',
    filename: 'dialog-demo-mui',
    template: './src/client/dialog-demo-mui/index.html',
  },
  {
    name: 'CLIENT - Dialog Demo Tailwind CSS',
    entry: './src/client/dialog-demo-tailwindcss/index.js',
    filename: 'dialog-demo-tailwindcss',
    template: './src/client/dialog-demo-tailwindcss/index.html',
  },
  {
    name: 'CLIENT - Sidebar About Page',
    entry: './src/client/sidebar-about-page/index.js',
    filename: 'sidebar-about-page',
    template: './src/client/sidebar-about-page/index.html',
  },
];

// define certificate locations
// see "npm run setup:https" script in package.json
const keyPath = path.resolve(__dirname, './certs/key.pem');
const certPath = path.resolve(__dirname, './certs/cert.pem');
const pfxPath = path.resolve(__dirname, './certs/cert.pfx'); // if needed for Windows

/*********************************
 *    Declare settings
 ********************************/

// webpack settings for copying files to the destination folder
const copyFilesConfig = {
  name: 'COPY FILES - appsscript.json',
  mode: 'production', // unnecessary for this config, but removes console warning
  entry: copyAppscriptEntry,
  output: {
    path: destination,
    publicPath,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: copyAppscriptEntry,
          to: destination,
        },
      ],
    }),
  ],
};

// webpack settings used by both client and server
const sharedClientAndServerConfig = {
  context: __dirname,
};

// webpack settings used by all client entrypoints
const clientConfig = ({ isDevClientWrapper }) => ({
  ...sharedClientAndServerConfig,
  mode: isProd ? 'production' : 'development',
  output: {
    path: destination,
    // this file will get added to the html template inline
    // and should be put in .claspignore so it is not pushed
    filename: 'main.js',
    publicPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
        use: [
          {
            // Fix #157 Issue with template literals in firebase module
            loader: 'babel-loader',
            options: {
              compact: false,
              plugins: [
                '@babel/plugin-transform-template-literals',
                !isProd &&
                  !isDevClientWrapper &&
                  require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
      // typescript config
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            // only enable react-refresh for dev builds, and not when building the dev client "wrapper"
            options: {
              plugins: [
                !isProd &&
                  !isDevClientWrapper &&
                  require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // only enable react-refresh for dev builds, and not when building the dev client "wrapper"
          options: {
            plugins: [
              !isProd &&
                !isDevClientWrapper &&
                require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      // we could add support for scss here
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
});

// DynamicCdnWebpackPlugin settings
// these settings help us load 'react', 'react-dom' and the packages defined below from a CDN
// see https://github.com/enuchi/React-Google-Apps-Script#adding-new-libraries-and-packages
const DynamicCdnWebpackPluginConfig = {
  // set "verbose" to true to print console logs on CDN usage while webpack builds
  verbose: false,
  resolver: (packageName, packageVersion, options) => {
    const packageSuffix = isProd ? '.min.js' : '.js';
    const moduleDetails = moduleToCdn(packageName, packageVersion, options);

    // don't externalize react during development due to issue with react-refresh
    // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/334
    if (!isProd && packageName === 'react') {
      return null;
    }

    // define custom CDN configuration for new packages
    // "name" should match the package being imported
    // "var" is important to get right -- this should be the exposed global. Look up "webpack externals" for info.
    switch (packageName) {
      case 'react-transition-group':
        return {
          name: packageName,
          var: 'ReactTransitionGroup',
          version: packageVersion,
          url: `https://unpkg.com/react-transition-group@${packageVersion}/dist/react-transition-group${packageSuffix}`,
        };
      case 'react-bootstrap':
        return {
          name: packageName,
          var: 'ReactBootstrap',
          version: packageVersion,
          url: `https://unpkg.com/react-bootstrap@${packageVersion}/dist/react-bootstrap${packageSuffix}`,
        };
      case '@mui/material':
        return {
          name: packageName,
          var: 'MaterialUI',
          version: packageVersion,
          url: `https://unpkg.com/@mui/material@${packageVersion}/umd/material-ui.${
            isProd ? 'production.min.js' : 'development.js'
          }`,
        };
      case '@emotion/react':
        return {
          name: packageName,
          var: 'emotionReact',
          version: packageVersion,
          url: `https://unpkg.com/@emotion/react@${packageVersion}/dist/emotion-react.umd.min.js`,
        };
      case '@emotion/styled':
        return {
          name: packageName,
          var: 'emotionStyled',
          version: packageVersion,
          url: `https://unpkg.com/@emotion/styled@${packageVersion}/dist/emotion-styled.umd.min.js`,
        };
      // externalize gas-client to keep bundle size even smaller
      case 'gas-client':
        return {
          name: packageName,
          var: 'GASClient',
          version: packageVersion,
          url: `https://unpkg.com/gas-client@${packageVersion}/dist/index.js`,
        };
      // must include peer dependencies for any custom imports
      case '@types/react':
        return {
          name: packageName,
          var: '@types/react',
          version: packageVersion,
          url: `https://unpkg.com/@types/react@${packageVersion}/index.d.ts`,
        };
      // return defaults/null depending if Dynamic CDN plugin finds package
      default:
        return moduleDetails;
    }
  },
};

// webpack settings used by each client entrypoint defined at top
const clientConfigs = clientEntrypoints.map((clientEntrypoint) => {
  const isDevClientWrapper = false;
  return {
    ...clientConfig({ isDevClientWrapper }),
    name: clientEntrypoint.name,
    entry: clientEntrypoint.entry,
    plugins: [
      !isProd && new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
      new HtmlWebpackPlugin({
        template: clientEntrypoint.template,
        filename: `${clientEntrypoint.filename}${isProd ? '' : '-impl'}.html`,
        inlineSource: '^/.*(js|css)$', // embed all js and css inline, exclude packages from dynamic cdn insertion
        scriptLoading: 'blocking',
        inject: 'body',
      }),
      // add the generated js code to the html file inline
      new HtmlWebpackInlineSourcePlugin(),
      // this plugin allows us to add dynamically load packages from a CDN
      new DynamicCdnWebpackPlugin(DynamicCdnWebpackPluginConfig),
    ].filter(Boolean),
  };
});

// webpack settings for devServer https://webpack.js.org/configuration/dev-server/
const devServer = {
  hot: true,
  port: PORT,
  server: 'https',
};

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  // use key and cert settings only if they are found
  devServer.server = {
    type: 'https',
    options: { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) },
  };
}

// If mkcert -install cannot be used on Windows machines (in pipeline, for example), the
// script at test/generate-cert.ps1 can be used to create a .pfx cert
if (fs.existsSync(pfxPath)) {
  // use pfx file if it's found
  devServer.server = {
    type: 'https',
    options: { pfx: fs.readFileSync(pfxPath), passphrase: 'abc123' },
  };
}

// webpack settings for the development client wrapper
const devClientConfigs = clientEntrypoints.map((clientEntrypoint) => {
  envVars.FILENAME = clientEntrypoint.filename;
  const isDevClientWrapper = true;
  return {
    ...clientConfig({ isDevClientWrapper }),
    name: `DEVELOPMENT: ${clientEntrypoint.name}`,
    entry: devDialogEntry,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
      new HtmlWebpackPlugin({
        template: './dev/index.html',
        // this should match the html files we load in src/server/ui.js
        filename: `${clientEntrypoint.filename}.html`,
        inlineSource: '^/.*(js|css)$', // embed all js and css inline, exclude packages from dynamic cdn insertion
        scriptLoading: 'blocking',
        inject: 'body',
      }),
      new HtmlWebpackInlineSourcePlugin(),
      new DynamicCdnWebpackPlugin({}),
    ],
  };
});

// webpack settings used by the server-side code
const serverConfig = {
  ...sharedClientAndServerConfig,
  name: 'SERVER',
  // server config can't use 'development' mode
  // https://github.com/fossamagna/gas-webpack-plugin/issues/135
  mode: isProd ? 'production' : 'none',
  entry: serverEntry,
  output: {
    filename: 'code.js',
    path: destination,
    libraryTarget: 'this',
    publicPath,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      // typescript config
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // ecma 5 is needed to support Rhino "DEPRECATED_ES5" runtime
          // can use ecma 6 if V8 runtime is used
          ecma: 5,
          warnings: false,
          parse: {},
          compress: {
            properties: false,
          },
          mangle: false,
          module: false,
          output: {
            beautify: true,
            // support custom function autocompletion
            // https://developers.google.com/apps-script/guides/sheets/functions
            comments: /@customfunction/,
          },
        },
      }),
    ],
  },
  plugins: [
    new GasPlugin({
      // removes need for assigning public server functions to "global"
      autoGlobalExportsFiles: [serverEntry],
    }),
  ],
};

module.exports = [
  // 1. Copy appsscript.json to destination,
  // 2. Set up webpack dev server during development
  // Note: devServer settings are only read in the first element when module.exports is an array
  { ...copyFilesConfig, ...(isProd ? {} : { devServer }) },
  // 3. Create the server bundle. Don't serve server bundle when running webpack serve.
  !isWebpackServe && serverConfig,
  // 4. Create one client bundle for each client entrypoint.
  ...clientConfigs,
  // 5. Create a development dialog wrapper bundle for each client entrypoint during development.
  //    Don't actually serve it though when running webpack serve.
  ...(isProd || isWebpackServe ? [] : devClientConfigs),
].filter(Boolean);
