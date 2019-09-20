const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/js/app.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new HtmlWebpackPlugin({
      title: 'Starter WebPack',
      template: 'src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      './src/manifest.json',
      {from: './src/assets/**/*', to: 'assets', flatten: true}
    ]),
    new GenerateSW({
      swDest: 'sw.js',
      include: [/\.html$/, /\.js$/, /\.css$/, /\.jpg$/, /\.png$/],
      exclude: [/\.mp4$/],
      cleanupOutdatedCaches: true,
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};
