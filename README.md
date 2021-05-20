# playground
## description
> 一个 electron + vue3.0 + element plus 构建的桌面应用，灵感来源于WeChat

<p align="center">
  <img src="https://raw.githubusercontent.com/E2875888382/playground/master/src/rendering-process/assets/img/icon.png" width="120">
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=vue&message=3.0&color=green" />
  <img src="https://img.shields.io/static/v1?label=vue-router&message=@4.0&color=green" />
  <img src="https://img.shields.io/static/v1?label=vuex&message=@4.0&color=green" />
  <img src="https://img.shields.io/static/v1?label=component&message=element+plus&color=green" />
  <img src="https://img.shields.io/static/v1?label=electron&message=9.0&color=green" />
  <img src="https://img.shields.io/static/v1?label=style&message=less&color=green">
  <img src="https://img.shields.io/static/v1?label=typescript&message=4&color=green">
</p>

## Project target
- [x] 应用登录（使用网易云账号）
- [x] 小说主页
- [x] 小说大分类、小分类及列表加载
- [x] 小说详细、热评、全部评论、推荐、搜索、目录、排行榜
- [x] 小说阅读、黑夜模式、护眼模式 
- [x] 应用内webview、自定义导航栏
- [x] 新闻阅读、无限加载
- [x] 修改壁纸、注入webview背景
- [x] 壁纸等高瀑布流（接口数据现在是统一宽高，无瀑布效果）
- [x] 壁纸预览、下载本地
- [ ] 内置音乐
- [ ] 新闻搜索
- [ ] 骨架屏
- [ ] 应用消息通知
- [ ] 全局主题
- [ ] 应用本地状态持久化
- [ ] 用户设置页
- [ ] 小说书架
- [ ] 小说书签
- ...

## src dir(`npm run createDirTree`)
```
├── main-process
│   ├── index.ts
│   ├── ipcManager.ts
│   ├── lyricWindow.ts
│   ├── main.d.ts
│   └── mainWindow.ts
├── rendering-process
│   ├── api
│   │   ├── base
│   │   │   └── index.ts
│   │   ├── books
│   │   │   ├── cats.ts
│   │   │   ├── chapters.ts
│   │   │   ├── detail.ts
│   │   │   ├── index.ts
│   │   │   ├── ranking.ts
│   │   │   └── search.ts
│   │   ├── link
│   │   │   └── index.ts
│   │   ├── login
│   │   │   └── index.ts
│   │   ├── manager
│   │   │   └── index.ts
│   │   ├── mock
│   │   │   └── index.ts
│   │   ├── music
│   │   │   ├── find.ts
│   │   │   └── user.ts
│   │   ├── pictures
│   │   │   └── index.ts
│   │   └── street
│   │       └── index.ts
│   ├── app
│   │   └── App.vue
│   ├── assets
│   │   ├── css
│   │   │   ├── color.less
│   │   │   ├── common.less
│   │   │   └── font.less
│   │   ├── font
│   │   │   └── iconfont.ttf
│   │   ├── img
│   │   │   ├── defaultMusic.jpg
│   │   │   ├── icon.png
│   │   │   ├── record.png
│   │   │   └── record_dec.png
│   │   └── js
│   │       ├── Lyric.js
│   │       ├── nodeTree.js
│   │       └── utils.ts
│   ├── components
│   │   ├── Layout.vue
│   │   ├── Search.vue
│   │   ├── SideBar.vue
│   │   └── TitleBar.vue
│   ├── main.ts
│   ├── pages
│   │   ├── books
│   │   │   ├── components
│   │   │   │   ├── booksList.vue
│   │   │   │   ├── classCard.vue
│   │   │   │   ├── commentsList.vue
│   │   │   │   └── navBar.vue
│   │   │   ├── main.vue
│   │   │   └── pages
│   │   │       ├── booksDetail.vue
│   │   │       ├── cats.vue
│   │   │       ├── catsDetail.vue
│   │   │       ├── chapters.vue
│   │   │       ├── comments.vue
│   │   │       ├── index.vue
│   │   │       ├── ranking.vue
│   │   │       ├── read.vue
│   │   │       ├── recommend.vue
│   │   │       └── search.vue
│   │   ├── link
│   │   │   └── main.vue
│   │   ├── music
│   │   │   ├── components
│   │   │   │   ├── Lyric.vue
│   │   │   │   ├── playBar.vue
│   │   │   │   ├── playBarController.vue
│   │   │   │   ├── playBarDes.vue
│   │   │   │   ├── playBarVolume.vue
│   │   │   │   ├── playList.vue
│   │   │   │   ├── playPanel.vue
│   │   │   │   ├── sideBar.vue
│   │   │   │   └── switch.vue
│   │   │   ├── main.vue
│   │   │   └── pages
│   │   │       ├── cloud
│   │   │       │   └── main.vue
│   │   │       ├── download
│   │   │       │   └── main.vue
│   │   │       ├── dynamic
│   │   │       │   └── main.vue
│   │   │       ├── find
│   │   │       │   ├── components
│   │   │       │   │   ├── home
│   │   │       │   │   │   ├── Banners.vue
│   │   │       │   │   │   ├── Dj.vue
│   │   │       │   │   │   ├── DragController.vue
│   │   │       │   │   │   ├── Mv.vue
│   │   │       │   │   │   ├── NewSong.vue
│   │   │       │   │   │   ├── PrivateContent.vue
│   │   │       │   │   │   └── RecommendPlayList.vue
│   │   │       │   │   └── playList
│   │   │       │   ├── main.vue
│   │   │       │   └── pages
│   │   │       │       ├── home.vue
│   │   │       │       └── playList.vue
│   │   │       ├── fm
│   │   │       │   └── main.vue
│   │   │       ├── local
│   │   │       │   └── main.vue
│   │   │       ├── media
│   │   │       │   └── main.vue
│   │   │       ├── playlist
│   │   │       │   ├── components
│   │   │       │   │   ├── Collectors.vue
│   │   │       │   │   ├── Comments.vue
│   │   │       │   │   └── List.vue
│   │   │       │   └── main.vue
│   │   │       └── star
│   │   │           └── main.vue
│   │   ├── pictures
│   │   │   ├── main.vue
│   │   │   └── preview.vue
│   │   ├── set
│   │   │   └── main.vue
│   │   └── street
│   │       └── main.vue
│   ├── routers
│   │   └── index.js
│   ├── shims-vue.d.ts
│   └── store
│       ├── index.ts
│       ├── modules
│       │   ├── book.ts
│       │   ├── config.ts
│       │   ├── music.ts
│       │   ├── pictures.ts
│       │   └── user.ts
│       └── plugins
│           └── synchronous.ts
└── types
    ├── music.d.ts
    └── request.d.ts
```

## Project screenshots
![14.png](https://upload-images.jianshu.io/upload_images/19383585-297251c368e929ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![15.png](https://upload-images.jianshu.io/upload_images/19383585-67fa272f5b0f4ef0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![0.png](https://upload-images.jianshu.io/upload_images/19383585-44dea07e1e9deb69.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![1.png](https://upload-images.jianshu.io/upload_images/19383585-c6bb2432ef847774.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![2.png](https://upload-images.jianshu.io/upload_images/19383585-60eb6c26995fd8bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![3.png](https://upload-images.jianshu.io/upload_images/19383585-690cd435c7a9ce19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![4.png](https://upload-images.jianshu.io/upload_images/19383585-3cf037d362d9efe4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![5.png](https://upload-images.jianshu.io/upload_images/19383585-ee5c61d5f45bfd29.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![6.png](https://upload-images.jianshu.io/upload_images/19383585-90dc60ad0f990b86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![7.png](https://upload-images.jianshu.io/upload_images/19383585-7c3c4616f9d46db0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![8.png](https://upload-images.jianshu.io/upload_images/19383585-6e850b1c94c4f612.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![9.png](https://upload-images.jianshu.io/upload_images/19383585-7d30e0921d3caa42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![10.png](https://upload-images.jianshu.io/upload_images/19383585-48de0b45413d4667.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![11.png](https://upload-images.jianshu.io/upload_images/19383585-df030afc6be90bad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![12.png](https://upload-images.jianshu.io/upload_images/19383585-dc2841a04a256fd2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![13.png](https://upload-images.jianshu.io/upload_images/19383585-505b24cb205381ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## About data

大部分的请求都是使用的开源接口，包括：
- 新闻类：网易新闻API，每天有100次的调用限制，调用失败会返回本地mock
- 小说类：追书神器API（本项目仅供参考，请勿商用）
- 壁纸类：360浏览器API（本项目仅供参考，请勿商用）

## About debug

渲染进程的debug可以借助vue-devtools，在主进程加入
```
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => {
  await session.defaultSession.loadExtension(path.join(__dirname, 'vue-devtools'))
})
```
> 注意：Vue2 的devtools无法检测到Vue3，最新版的devtools可以到 `https://github.com/vuejs/vue-devtools`下载最新版的zip。
> <br/> 更新：vue-devtools@v6.0.0-beta.3还没支持vuex

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
> 如果启动项目报错：`TypeError: Cannot read property 'parseComponent' of undefined`。<br/>请尝试删除yarn.lock和node_module，并重新`yarn install`。


### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
[Vue-cli Configuration Reference](https://cli.vuejs.org/config/).

[Plugin electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#configuring-electron-builder)

[Vue3.0](https://vue3js.cn/docs/zh/)
