const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    cyto: './index.js'
  },
  output: {
    path: path.resolve(__dirname, './bin'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: 'node_modules' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('#!/usr/bin/env node', {
      raw: true,
      entryOnly: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ]
};
