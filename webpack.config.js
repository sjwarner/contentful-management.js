'use strict'
var webpack = require('webpack')
var path = require('path')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var plugins = [
  new LodashModuleReplacementPlugin({
    'cloning': true,
    'caching': true
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.IgnorePlugin(/vertx/),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  )
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  )
}

const loaders = [
  {
    test: /\.js?$/,
    include: [
      path.resolve(__dirname, 'node_modules', 'contentful-sdk-core'),
      path.resolve(__dirname, 'lib'),
      path.resolve(__dirname, 'test')
    ],
    loader: 'babel-loader'
  }
]

module.exports = [
  {
    context: path.join(__dirname, 'lib'),
    entry: './contentful-management.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `contentful-management${process.env.NODE_ENV === 'production' ? '.min' : ''}.js`,
      libraryTarget: 'umd',
      library: 'contentfulManagement'
    },
    module: {
      loaders: loaders
    },
    devtool: 'source-map',
    plugins: plugins
  },
  {
    context: path.join(__dirname, 'lib'),
    entry: './contentful-management.js',
    target: 'node',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `contentful-management.node${process.env.NODE_ENV === 'production' ? '.min' : ''}.js`,
      libraryTarget: 'commonjs2',
      library: 'contentfulManagement'
    },
    module: {
      loaders: loaders
    },
    devtool: 'source-map',
    plugins: plugins
  }
]
