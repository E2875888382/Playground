# playground
## description

electron + vue 桌面应用

![](https://img.shields.io/static/v1?label=vue&message=3.0&color=green)
![](https://img.shields.io/static/v1?label=vue-router&message=@4.0&color=green)
![](https://img.shields.io/static/v1?label=vuex&message=@4.0&color=green)
![](https://img.shields.io/static/v1?label=component&message=element+plus&color=green)
![](https://img.shields.io/static/v1?label=electron&message=9.0&color=green)
![](https://img.shields.io/static/v1?label=style&message=less&color=green)

## Project target
- [ ] 应用登录（通过微信小程序码 || 公众号码）
- [ ] 应用消息通知
- [ ] 全局主题
- [ ] 应用本地状态持久化
- [ ] 用户设置页
- [ ] 用户收藏
- [x] 新闻阅读、无限加载
- [ ] 新闻搜索
- [x] 应用内webview
- [ ] webview导航栏
- [x] 小说主页
- [x] 小说大分类
- [x] 小说小分类及列表加载
- [x] 小说排行榜
- [x] 小说详细页、热评
- [ ] 同类小说推荐
- [ ] 小说搜索
- [ ] 小说目录页
- [ ] 小说评论页
- [ ] 小说书架
- [ ] 小说阅读、书签等功能
- [ ] 音乐播放页
- [ ] 短视频收集页
- [ ] 短视频播放
- [ ] 壁纸瀑布流
- [ ] 壁纸集横向播放
- [ ] 本地持久化笔记
- [ ] 笔记markdown编写
- [ ] IM ?
- ...

## About request

- 数据请求使用的是Node.js的request模块，不存在跨域问题。
- 在request上简单封装了get和post方法，后续可以改为其他请求库。

## About data

大部分的请求都是使用的开源接口，包括：
- 新闻类：网易新闻API，每天有100次的调用限制，调用失败会返回本地mock
- 小说类：追书神器API，暂时没有限制（本项目仅供学习参考，请勿商用）
- 除了用户系统，其他模块目标是使用开源API。

## About webview

官方推荐使用`BrowserView`代替`<webview />`，通过主进程监听`new-window`打开自定义的容器。暂时使用的方案也是`BrowserView`，但是关于相关的配置比较少，而且`JavaScript`、`CSS`注入的问题待解决。

## About pull requests

如果你对本项目感兴趣的话，或者想把单独的项目作为tab模块放进本项目，请将branch命名为：
- 添加tab下单独模块：`feature-tabs-XXX`
- 添加功能：`feature-add-XXX`
- bug fix：`bug-fix-XXX`
- hot fix：`hot-fix-XXX`
- 样式修正：`feature-style-XXX`
- 更新README：`update-readme`

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
 yarn electron:serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
