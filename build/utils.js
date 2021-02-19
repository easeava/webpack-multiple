'use strict'
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')

const resolve = (params = '') => {
  return path.resolve(__dirname, '..', params)
}

exports.assetsPath = _path => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.resolve = resolve

exports.generateEntriesAndPlugins = () => {
  const entryFiels = glob.sync(resolve('src/views/**/main.js'))

  const entries = {}
  const plugins = []

  entryFiels.forEach(item => {
    const file = path.parse(item)
    const name = file.dir.split('/').slice(-1)[0]

    entries[name] = item
    plugins.push(new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      filename: `${name}.html`,
      template: `${file.dir}/index.html`,
      chunks: ['commons', 'vendor', 'manifest', name],
      xhtml: true,
      minify: process.env.NODE_ENV === 'developemnt' ? false : {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }))
  })

  return {
    entries,
    plugins,
  }
}
