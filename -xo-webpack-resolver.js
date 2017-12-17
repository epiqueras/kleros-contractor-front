// eslint-disable-next-line unicorn/filename-case
const { join } = require('path')

module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: join(__dirname, 'webpack.config.dev.js')
      }
    }
  }
}
