'use strict'

process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseWebpackConfig = require('./base')

module.exports = merge(baseWebpackConfig, {
  mode: process.env.NODE_ENV,

  target: 'web',

  devtool: config.dev.devtool,

  devServer: config.dev.devServer,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev')
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('static'),
          to: config.build.assetsSubDirectory,
          globOptions: {
            // ignore: ['**/.*']
          }
        }
      ],
    }),
  ]
})
