'use strict'

const utils = require('./utils')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const config = require('../config')
const { entries, plugins } = utils.generateEntriesAndPlugins()

module.exports = {
  entry: {
    ...entries,
  },

  output: {
    path: config.build.assetsRoot,
    filename: `js/[name].[fullhash:7].bundle.js`,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
  },

  resolve: {
    roots: [
      utils.resolve('src'),
      utils.resolve('static')
    ],

    modules: [
      utils.resolve('node_modules'),
      utils.resolve('src')
    ],

    extensions: ['.js', '.json', 'scss', 'css'],

    alias: {
      '@': utils.resolve('src'),
      '@static': utils.resolve('static'),
      '~': utils.resolve('node_modules')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          utils.resolve('src'),
        ],
        exclude: [
          utils.resolve('node_modules'),
        ],
        use: [
          {
            loader: 'babel-loader'
          },
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]
      },
      // {
      //   test: /\.ejs$/,
      //   use: {
      //     loader: 'ejs-loader',
      //     options: {
      //       esModule: false,
      //     }
      //   }
      // },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false,
            esModule: false,
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        include: [utils.resolve('src')],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: [utils.resolve('src')],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    ...plugins,

    new ESLintWebpackPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
    })
  ]
}
