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
            .set('pages', resolve('./src/rendering-process/pages'))
            .set('api', resolve('./src/rendering-process/api'))
            .set('assets', resolve('./src/rendering-process/assets'))
    },
    configureWebpack: config => {
        config.entry.app = './src/rendering-process/main.ts'
    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: 'src/main-process/index.ts',
            nodeIntegration: true,
            builderOptions: {
                appId: 'com.playground.app',
                productName: 'Playground',
                directories: {
                    output: "./dist"//输出文件路径
                },
                // 放置静态资源到resource文件夹
                extraResources: [
                    {
                        from: './public',
                        to: './public'
                    }
                ],
                win: {
                    // icon: "./public/icon.png", //图标，当前图标在根目录下，注意这里有两个坑
                    target: [
                        {
                            target: "nsis",//利用nsis制作安装程序
                            arch: [
                                "x64" //64位
                            ]
                        }
                    ]
                },
                nsis: {
                    oneClick: false, // 是否一键安装
                    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowToChangeInstallationDirectory: true, // 允许修改安装目录
                    // installerIcon: "./public/icon.png",// 安装图标
                    // uninstallerIcon: "./public/icon.png",//卸载图标
                    // installerHeaderIcon: "./public/icon.png", // 安装时头部图标
                    createDesktopShortcut: true, // 创建桌面图标
                    createStartMenuShortcut: true,// 创建开始菜单图标
                    shortcutName: "Playground", // 图标名称
                }
            }
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
