require('dotenv').config()
const { join } = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const { version } = require('./package.json')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].[chunkhash].js',
    path: join(__dirname, 'dist/'),
    publicPath: '/'
  },
  context: __dirname,
  devtool: 'source-map',

  resolve: {
    extensions: ['*', '.js', '.json'],
    alias: {
      components: join(__dirname, 'src/components/'),
      utils: join(__dirname, 'src/utils/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpe?g|png|gif|eot|woff|ttf|woff2)$/,
        use: ['url-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HTMLWebpackPlugin({
      template: './index.ejs'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_VERSION: JSON.stringify(version),
        ETHEREUM_PROVIDER: JSON.stringify(process.env.PROD_ETHEREUM_PROVIDER),
        STORE_PROVIDER: JSON.stringify(process.env.PROD_STORE_PROVIDER),
        ARBITRATOR_ADDRESS: JSON.stringify(process.env.PROD_ARBITRATOR_ADDRESS)
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && module.context.indexOf('node_modules') !== -1
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackRuntime'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../bundle-size-report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      logLevel: 'info'
    })
  ]
}
