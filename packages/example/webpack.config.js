const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const createNodeExternals = require('webpack-node-externals');

const babel = {
  test: /\.js$/,
  include: [
    path.resolve(__dirname, 'client'),
    path.resolve(__dirname, 'server'),
    path.resolve(__dirname, 'node_modules/@dlghq'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: ['@dlghq/babel-preset-dialog'],
    },
  },
};

console.log(path.resolve('./node_modules/'));

module.exports = [
  {
    mode: 'development',
    target: 'web',
    resolve: {
      symlinks: false,
      mainFields: ['module', 'main'],
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
      symlinks: false,
      mainFields: ['module', 'main'],
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
        request.startsWith('@dlghq') ||
        (/node_modules\/@dlghq(?!(.*(node_modules).*)+)/.test(context) &&
          request.startsWith('.')) ||
        (context.startsWith(path.resolve(__dirname)) &&
          !/node_modules/.test(context) &&
          (request.startsWith('.') || request.startsWith('/')))
      ) {
        console.log({ context, request });
        return callback();
      }

      console.log({ context, request });

      return callback(null, 'commonjs ' + request);
    },

    plugins: [new NodemonPlugin()],
  },
];
