'use strict'
const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    devServer: {
      hot: true,
      hotOnly: true,
      contentBase: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../dist')
      ],
      // host: 'localhost',
      port: 8000,
      open: true,
      openPage: '',
      publicPath: '/',
      watchContentBase: true,
      disableHostCheck: true,
      inline: true,
      noInfo: false
    },

    devtool: 'source-map'

    // cssSourceMap: true
  },

  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    productionSourceMap: false,

    devtool: 'eval-cheap-module-source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    bundleAnalyzerReport: process.env.npm_config_report
  }
}
