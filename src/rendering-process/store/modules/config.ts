import { ipcRenderer } from 'electron';

interface ITabItem {
    name: string;
    icon: string;
    path: string;
}
interface ITitleBarsItemEvent {
    ():void;
}
interface ITitleBarsItem {
    icon: string;
    event?: ITitleBarsItemEvent;
}
interface IConfigState {
    tabs: Array<ITabItem>;
    titleBars: Array<ITitleBarsItem>;
    title: any;
    readMode: string;
    backgroundImg: string;
    browserBackgroundImg: string
}

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
        music: '音乐',
        pictures: '壁纸',
        set: '设置'
    },
    readMode: 'eyecare',
    backgroundImg: '#f5f5f5',
    browserBackgroundImg: ''
};
const mutations = {
    updateTitle(state: IConfigState, {tabs, title}:any) {
        state.title[tabs] = title;
    },
    updateTabsPath(state: IConfigState, {tabsIndex, path}:any) {
        state.tabs[tabsIndex].path = path;
    },
    updateReadMode(state: IConfigState, mode:string) {
        state.readMode = mode;
    },
    updateBackground(state: IConfigState, style:string) {
        state.backgroundImg = style;
    },
    updateBrowserBackground(state: IConfigState, style:string) {
        state.browserBackgroundImg = style;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}