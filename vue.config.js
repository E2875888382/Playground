const path = require('path');
const resolve = url=> path.resolve(__dirname, url);

module.exports = {
    chainWebpack: config=> {
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
        // 别名
        config.resolve.alias
            .set('commonComponents', resolve('./src/rendering-process/components'))
            .set('commonCss', resolve('./src/rendering-process/assets/css'))
            .set('commonImgs', resolve('./src/rendering-process/assets/img'))
            .set('commonJs', resolve('./src/rendering-process/assets/js'))
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
                resolve('./src/rendering-process/assets/css/common.less'),
                resolve('./src/rendering-process/assets/css/color.less'),
                resolve('./src/rendering-process/assets/css/font.less')
            ]
        }
    }
}
