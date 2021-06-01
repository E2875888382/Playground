import { ipcRenderer } from 'electron';

const state = {
    tabs: [
        {
            name: 'pictures',
            icon: 'icon-tupian',
            path: '/pictures'
        },
        {
            name: 'news',
            icon: 'icon-xinwen',
            path: '/bbs'
        },
        {
            name: 'webview',
            icon: 'icon-chrome',
            path: '/webview'
        },
        {
            name: 'books',
            icon: 'icon-tubiao1shuxiaoshuo',
            path: '/books'
        },
        {
            name: 'music',
            icon: 'icon-yinle_2',
            path: '/music'
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
    readMode: 'eyecare',
    backgroundImg: '#f5f5f5',
    browserBackgroundImg: ''
};
const mutations = {
    updateTabsPath(state: config.IConfigState, {tabsIndex, path}:any) {
        state.tabs[tabsIndex].path = path;
    },
    updateReadMode(state: config.IConfigState, mode:string) {
        state.readMode = mode;
    },
    updateBackground(state: config.IConfigState, style:string) {
        state.backgroundImg = style;
    },
    updateBrowserBackground(state: config.IConfigState, style:string) {
        state.browserBackgroundImg = style;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}