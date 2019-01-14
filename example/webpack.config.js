const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const createNodeExternals = require('webpack-node-externals');

const babel = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@dlghq/babel-preset-dialog'],
    },
  },
};

module.exports = [
  {
    mode: 'development',
    target: 'web',
    entry: ['@babel/polyfill', path.resolve(__dirname, 'client/index.js')],
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
    externals: createNodeExternals(),
    plugins: [new NodemonPlugin()],
  },
];
