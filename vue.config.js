const path = require('path');

module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((options) => {
                options.compilerOptions = {
                    ...(options.compilerOptions || {}),
                    isCustomElement: (tag) => /^webview/.test(tag)
                }
                return options
            })
    },
    configureWebpack: config => {
        config.entry.app = './src/rendering-process/main.ts'
    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: 'src/main-process/index.ts',
            nodeIntegration: true
        },
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/rendering-process/assets/css/common.less'),
                path.resolve(__dirname, './src/rendering-process/assets/css/color.less'),
                path.resolve(__dirname, './src/rendering-process/assets/css/font.less')
            ]
        }
    }
}
