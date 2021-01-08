import { ipcRenderer } from 'electron';
const state = {
    tabs: [
        {
            icon: 'news',
            path: '/bbs'
        },
        {
            icon: 'link',
            path: 'webview'
        },
        {
            icon: 'notebook-2',
            path: '/books'
        },
        {
            icon: 'chat-round',
            path: '/chat'
        },
        {
            icon: 'video-play',
            path: '/media'
        },
        {
            icon: 'picture-outline-round',
            path: '/pictures'
        },
        {
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
    }
};

export default {
    namespaced: true,
    state,
    mutations
}