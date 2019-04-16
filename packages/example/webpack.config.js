const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const createNodeExternals = require('webpack-node-externals');

const babel = {
  test: /\.js$/,
  include: [
    path.resolve(__dirname, 'client'),
    path.resolve(__dirname, 'server'),
    path.resolve(__dirname, '../'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: ['@dlghq/babel-preset-dialog'],
    },
  },
};

module.exports = [
  {
    mode: 'development',
    target: 'web',
    resolve: {
      symlinks: false,
    },
    entry: [path.resolve(__dirname, 'client/index.js')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'client-bundle.js',
    },
    module: {
      rules: [babel],
    },
    plugins: [
      new HtmlPlugin({
        title: 'gRPC Web Gateway',
      }),
    ],
  },
  {
    mode: 'development',
    target: 'node',
    resolve: {
      symlinks: true,
      mainFields: ['module', 'main'],
      mainFiles: ['index', 'index.browser.js'],
    },
    entry: path.resolve(__dirname, 'server/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server-bundle.js',
    },
    module: {
      rules: [babel],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: function(context, request, callback) {
      if (
        /^((?!node_modules).)*$/.test(context) &&
        (request.startsWith(__dirname) ||
          request.startsWith('.') ||
          request.startsWith('@dlghq'))
      ) {
        return callback();
      }
      return callback(null, 'commonjs ' + request);
    },

    plugins: [new NodemonPlugin()],
  },
];
