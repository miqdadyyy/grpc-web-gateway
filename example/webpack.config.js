const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const babel = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@dlghq/babel-preset-dialog']
    }
  }
};

module.exports = [{
  mode: 'development',
  target: 'web',
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client-bundle.js'
  },
  module: {
    rules: [babel]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'gRPC Web Gateway'
    })
  ]
}, {
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, 'server/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server-bundle.js'
  },
  module: {
    rules: [babel]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: require('webpack-node-externals')()
}];
