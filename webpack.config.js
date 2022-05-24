const path = require('path')
const { join } = path
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const settings = require('./settings.js')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/[name].[contenthash].js',
    chunkFilename: 'assets/bundle-[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public', 
        to: ''
      }]
    }),
    new HtmlWebpackPlugin({
      title: settings.title,
      template: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      '@': join('../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: [
              /node_modules[\\\/]core-js/,
              /node_modules[\\\/]webpack[\\\/]buildin/
            ],
            presets: [['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: 3
            }]]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset',
        parser: {
           dataUrlCondition: {
               maxSize: 6 * 1024,
           }
        }
      }
    ]
  },
  devServer: {
    port: 9527
  }
}
