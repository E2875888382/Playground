const path = require('path');

module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true
      },
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
          path.resolve(__dirname, './src/assets/css/common.less')
        ]
      }
    }
}
