import path from 'path';
import config from './package.json';
import webpack from 'webpack';
import dotenv from 'dotenv';

dotenv.config();

const PROD = process.env.NODE_ENV === 'production';

let plugins = [];

PROD ? [
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }))
  ] : '';

module.exports = {
  entry: path.resolve(__dirname, config.main),
  devtool: 'source-map',
  output: {
    library: process.env.NAME,
    libraryTarget: process.env.TARGET,
    path: __dirname,
    filename: (PROD) ? 'build/csvjs.min.js' : 'build/csvjs.js'
  },
  module: {
    loaders: [
      {test: /\.es6?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: plugins
};