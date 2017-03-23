var helpers = require('./helpers');
var webpack = require('webpack');
var rucksack = require('rucksack-css');

module.exports = {
  debug: false,
  devtool: false,
  entry: {
    'pdk-components': './src/pdk-components.module.ts'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules']
  },
  output: {
    path: helpers.root('dist/@govuk/pdk-components'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    preLoaders: [
      {test: /\.ts$/, loader: 'tslint'},
      {test: /\.js$/, loader: 'source-map'}
    ],
    loaders: [
      {test: /\.html$/, loader: 'html'},
      {test: /\.ts$/,   loader: 'awesome-typescript', exclude: [/\.(spec|e2e)\.ts$/]}
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  }
};