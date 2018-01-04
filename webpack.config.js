/**
 * Created by Weil on 2017/5/10.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
let isDev = process.env.NODE_ENV === 'develop'; // 是否是开发环境
const outputPath = isDev ? path.join(__dirname, './dll/debug') : path.join(__dirname, './dll/dist');



module.exports = {
  entry: {
    login: './page/login/login.jsx',
    main: './page/main/main.js',
  },
  output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: isDev ? 'http://localhost:9332/' : '/',
        filename:'[name].bundle.js'
    },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: path.resolve(__dirname, './node_modules/'),
        use: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.join(__dirname)
    },
    extensions: ['.js', '.jsx']
  },
  devtool: isDev ? 'source-map' : '',
  context: __dirname,
  devServer: {
    hot: true,
    port: 9332,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8333/api',
        pathRewrite: {"^/api" : ""}
      },
      '/login': {
        target: 'http://localhost:8333/login',
        pathRewrite: {"^/login" : ""}
      }
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.resolve(path.join(__dirname, 'dist'),'manifest.json')),
      //name:'[name]_[chunkhash]'
  }),
    new OpenBrowserPlugin({ url: `http://${"localhost"}:9332/` }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        isDev ? JSON.stringify('develop') : JSON.stringify('production')
    }),

    new HtmlWebpackPlugin({
      template: './template/index.html',
      filename: 'index.html',
      showErrors: true,
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './template/login.html',
      filename: 'login.html',
      showErrors: true,
      inject: 'body',
    }),
    new CopyWebpackPlugin([  { from: './assets', to: './static' },], )
  ]
};















