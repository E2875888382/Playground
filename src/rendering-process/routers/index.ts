import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active-tab',
    routes: [
        {
            path: '/',
            redirect: '/books'
        },
        {
            path: '/lyric',
            name: 'lyric',
            component: ()=> import('pages/music/components/Lyric.vue'),
        },
        {
            path: '/bbs',
            name: 'bbs',
            component: ()=> import('pages/street/main.vue'),
        },
        {
            path: '/webview',
            name: 'webview',
            component: ()=> import('pages/link/main.vue'),
        },
        {
            path: '/books',
            name: 'books',
            component: ()=> import('pages/books/main.vue'),
            children: [
                {
                    path: '',
                    redirect: '/books/index'
                },
                {
                    path: 'booksSearch',
                    name: 'booksSearch',
                    component: ()=> import('pages/books/pages/search.vue')
                },
                {
                    path: 'index',
                    name: 'booksIndex',
                    component: ()=> import('pages/books/pages/index.vue')
                },
                {
                    path: 'ranking',
                    name: 'booksRanking',
                    component: ()=> import('pages/books/pages/ranking.vue')
                },
                {
                    path: 'cats',
                    name: 'booksCats',
                    component: ()=> import('pages/books/pages/cats.vue')
                },
                {
                    path: 'catsDetail/:major/:gender',
                    name: 'booksCatsDetail',
                    component: ()=> import('pages/books/pages/catsDetail.vue')
                },
                {
                    path: 'booksDetail/:from/:booksId',
                    name: 'booksDetail',
                    component: ()=> import('pages/books/pages/booksDetail.vue')
                },
                {
                    path: 'booksComments/:booksId',
                    name: 'booksComments',
                    component: ()=> import('pages/books/pages/comments.vue')
                },
                {
                    path: 'booksRecommend/:booksId',
                    name: 'booksRecommend',
                    component: ()=> import('pages/books/pages/recommend.vue')
                },
                {
                    path: 'booksChapters/:booksId',
                    name: 'booksChapters',
                    component: ()=> import('pages/books/pages/chapters.vue')
                },
                {
                    path: 'booksChaptersDetail/:chapterIndex',
                    name: 'booksChaptersDetail',
                    component: ()=> import('pages/books/pages/read.vue')
                }
            ]
        },
        {
            path: '/pictures',
            name: 'pictures',
            component: ()=> import('pages/pictures/main.vue')
        },
        {
            path: '/preview/:currentIndex',
            name: 'preview',
            component: ()=> import('pages/pictures/preview.vue')
        },
        {
            path: '/music',
            name: 'music',
            component: ()=> import('pages/music/main.vue'),
            children: [
                {
                    path: '',
                    redirect: '/music/find'
                },
                {
                    path: 'find',
                    name: 'musicFind',
                    component: ()=> import('pages/music/pages/find/main.vue')
                },
                {
                    path: 'fm',
                    name: 'musicFM',
                    component: ()=> import('pages/music/pages/fm/main.vue')
                },
                {
                    path: 'media',
                    name: 'musicMedia',
                    component: ()=> import('pages/music/pages/media/main.vue')
                },
                {
                    path: 'dynamic',
                    name: 'musicDynamic',
                    component: ()=> import('pages/music/pages/dynamic/main.vue')
                },
                {
                    path: 'local',
                    name: 'musicLocal',
                    component: ()=> import('pages/music/pages/local/main.vue')
                },
                {
                    path: 'playlist/:id',
                    name: 'musicPlaylist',
                    component: ()=> import('pages/music/pages/playlist/main.vue')
                },
                {
                    path: 'cloud',
                    name: 'musicCloud',
                    component: ()=> import('pages/music/pages/cloud/main.vue')
                },
                {
                    path: 'download',
                    name: 'musicDownload',
                    component: ()=> import('pages/music/pages/download/main.vue')
                },
                {
                    path: 'star',
                    name: 'musicStar',
                    component: ()=> import('pages/music/pages/star/main.vue')
                }
            ]
        },
        {
            path: '/set',
            name: 'set',
            component: ()=> import('pages/set/main.vue')
        }
    ]
});

export default router;
