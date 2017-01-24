const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    cyto: './index.js'
  },
  output: {
    path: path.resolve(__dirname, './bin'),
    filename: '[name]',
  },
  target: 'node',
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, exclude: 'node_modules', loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('#!/usr/bin/env node', {
      raw: true,
      entryOnly: true
    })
  ]
};
