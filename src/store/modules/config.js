import { ipcRenderer } from 'electron';
const state = {
    tabs: [
        {
            name: 'pictures',
            icon: 'picture-outline-round',
            path: '/pictures'
        },
        {
            name: 'news',
            icon: 'news',
            path: '/bbs'
        },
        {
            name: 'webview',
            icon: 'link',
            path: '/webview'
        },
        {
            name: 'books',
            icon: 'notebook-2',
            path: '/books'
        },
        {
            name: 'chat',
            icon: 'chat-round',
            path: '/chat'
        },
        {
            name: 'media',
            icon: 'video-play',
            path: '/media'
        },
        {
            name: 'collection',
            icon: 'star-off',
            path: '/collection'
        }
    ],
    titleBars: [
        {
            icon: 'info',
            event: ()=> ipcRenderer.send('developer')
        },
        {
            icon: 'minus',
            event: ()=> ipcRenderer.send('min')
        },
        {
            icon: 'full-screen',
            event: ()=> ipcRenderer.send('max')
        },
        {
            icon: 'close',
            event: ()=> ipcRenderer.send('close')
        }
    ],
    title: {
        bbs: '新闻',
        booksIndex: '读书',
        booksRanking: '排行榜',
        booksCats: '分类',
        booksCatsDetail: '详细分类',
        booksDetail: '书籍详情',
        booksRecommend: '你可能感兴趣',
        booksChapters: '目录',
        booksComments: '全部评论',
        booksChaptersDetail: '',
        booksSearch: '搜索',
        webview: '浏览器',
        books: '看书',
        chat: '聊天',
        media: '听歌',
        pictures: '壁纸',
        collection: '收藏'
    },
    readMode: 'eyecare',
    backgroundImg: '#f5f5f5',
    // browserBackgroundImg: 'https://cn.bing.com/th?id=OHR.HeartAustralia_ZH-CN7049080558_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
    browserBackgroundImg: ''

};
const mutations = {
    updateTitle(state, {tabs, title}) {
        state.title[tabs] = title;
    },
    updateTabsPath(state, {tabsIndex, path}) {
        state.tabs[tabsIndex].path = path;
    },
    updateReadMode(state, mode) {
        state.readMode = mode;
    },
    updateBackground(state, style) {
        state.backgroundImg = style;
    },
    updateBrowserBackground(state, style) {
        state.browserBackgroundImg = style;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}