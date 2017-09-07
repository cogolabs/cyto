const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    cyto: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    library: "cyto-core",
    libraryTarget: "umd",
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    function() {
      this.plugin('done', () => {
        fs.chmodSync('bin/cyto.js', '755');
        fs.renameSync('bin/cyto.js', 'bin/cyto');
        fs.chmodSync('bin/postInstall.js', '755');
        fs.renameSync('bin/postInstall.js', 'bin/postInstall');
      })
    }
  ],
};
