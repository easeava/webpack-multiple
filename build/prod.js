'use strict'

const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const baseWebpackConfig = require('./base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const env = process.env.NODE_ENV === 'testing' ? require('../config/test') : require('../config/prod')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

  performance: {
    hints: false,
  },

  devtool: config.build.productionSourceMap ? config.build.devtool : false,

  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },

    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          minSize: 1,
          priority: 0
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 10
        }
      }
    },

    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'] // 移除console
          }
        }
      }),

      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
      }),
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),

    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[fullhash:7].css'),
    }),

    // new ScriptExtHtmlWebpackPlugin({
    //   inline: /manifest\..*\.js$/,
    // }),

    new webpack.ids.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('static'),
          to: config.build.assetsSubDirectory,
          globOptions: {
            // dot: true,
            // gitignore: true,
            // ignore: ['**/.*']
          }
        }
      ],
    }),
  ]
})

webpackConfig.plugins.unshift(new CleanWebpackPlugin())

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = webpackConfig
