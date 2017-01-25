const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");

const plugins = [
  new webpack.BannerPlugin({
    banner: '#!/usr/bin/env node',
    raw: true,
    entryOnly: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.IgnorePlugin(/configPath/),
  function() {
    this.plugin('done', () => {
      fs.chmodSync('bin/cyto.js', '755');
      fs.renameSync('bin/cyto.js', 'bin/cyto');
    })
  }
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new BabiliPlugin());
}

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
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ]
  },
  plugins,
};
