import { ipcRenderer } from 'electron';
const state = {
    tabs: [
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
            name: 'pictures',
            icon: 'picture-outline-round',
            path: '/pictures'
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
        booksIndex: '追书神器',
        booksRanking: '排行榜',
        booksCats: '分类',
        booksCatsDetail: '详细分类',
        webview: '浏览器',
        books: '看书',
        chat: '聊天',
        media: '听歌',
        pictures: '看图',
        collection: '收藏'
    }
};
const mutations = {
    updateTitle(state, {tabs, title}) {
        state.title[tabs] = title;
    },
    updateTabsPath(state, {tabsIndex, path}) {
        state.tabs[tabsIndex].path = path;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}