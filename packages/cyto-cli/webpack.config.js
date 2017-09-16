const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    cyto: './index.js',
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
        exclude: [/(node_modules|cyto-core)/],
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_module|cyto-core)/,
        use: [
          'babel-loader'
        ],
      },
    ]
  },
  externals: {
    'cyto-core': "require('cyto-core').default",
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    function() {
      this.plugin('done', () => {
        fs.chmodSync('bin/cyto.js', '755');
        fs.renameSync('bin/cyto.js', 'bin/cyto');
      })
    }
  ],
};
