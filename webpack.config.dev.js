require('dotenv').config()
const { join } = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { version } = require('./package.json')

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.jsx'],
  output: {
    filename: '[name].js',
    path: join(__dirname, 'dist/'),
    publicPath: '/'
  },
  context: __dirname,
  devtool: 'eval',

  devServer: {
    hot: true,
    contentBase: __dirname,
    publicPath: '/',
    historyApiFallback: true
  },

  resolve: {
    extensions: ['*', '.js', '.json', '.jsx'],
    alias: {
      components: join(__dirname, 'src/components/'),
      utils: join(__dirname, 'src/utils/')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
        NODE_ENV: JSON.stringify('development'),
        APP_VERSION: JSON.stringify(version),
        ETHEREUM_PROVIDER: JSON.stringify(process.env.DEV_ETHEREUM_PROVIDER),
        STORE_PROVIDER: JSON.stringify(process.env.DEV_STORE_PROVIDER),
        ARBITRATOR_ADDRESS: JSON.stringify(process.env.DEV_ARBITRATOR_ADDRESS)
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && module.context.indexOf('node_modules') !== -1
    })
    // New webpack.optimize.ModuleConcatenationPlugin()
  ]
}
