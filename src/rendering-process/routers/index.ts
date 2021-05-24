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
            component: ()=> import('../pages/music/components/Lyric.vue'),
            meta: {
                needSearch: false
            }
        },
        {
            path: '/bbs',
            name: 'bbs',
            component: ()=> import('../pages/street/main.vue'),
            meta: {
                needSearch: true
            }
        },
        {
            path: '/webview',
            name: 'webview',
            component: ()=> import('../pages/link/main.vue'),
            meta: {
                needSearch: false
            }
        },
        {
            path: '/books',
            name: 'books',
            component: ()=> import('../pages/books/main.vue'),
            children: [
                {
                    path: '',
                    redirect: '/books/index'
                },
                {
                    path: 'booksSearch',
                    name: 'booksSearch',
                    component: ()=> import('../pages/books/pages/search.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'index',
                    name: 'booksIndex',
                    component: ()=> import('../pages/books/pages/index.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'ranking',
                    name: 'booksRanking',
                    component: ()=> import('../pages/books/pages/ranking.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'cats',
                    name: 'booksCats',
                    component: ()=> import('../pages/books/pages/cats.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'catsDetail/:major/:gender',
                    name: 'booksCatsDetail',
                    component: ()=> import('../pages/books/pages/catsDetail.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'booksDetail/:from/:booksId',
                    name: 'booksDetail',
                    component: ()=> import('../pages/books/pages/booksDetail.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'booksComments/:booksId',
                    name: 'booksComments',
                    component: ()=> import('../pages/books/pages/comments.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'booksRecommend/:booksId',
                    name: 'booksRecommend',
                    component: ()=> import('../pages/books/pages/recommend.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'booksChapters/:booksId',
                    name: 'booksChapters',
                    component: ()=> import('../pages/books/pages/chapters.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'booksChaptersDetail/:chapterIndex',
                    name: 'booksChaptersDetail',
                    component: ()=> import('../pages/books/pages/read.vue'),
                    meta: {
                        needSearch: false
                    }
                }
            ]
        },
        {
            path: '/pictures',
            name: 'pictures',
            component: ()=> import('../pages/pictures/main.vue'),
            meta: {
                needSearch: false
            }
        },
        {
            path: '/preview/:currentIndex',
            name: 'preview',
            component: ()=> import('../pages/pictures/preview.vue'),
            meta: {
                needSearch: false
            }
        },
        {
            path: '/music',
            name: 'music',
            component: ()=> import('../pages/music/main.vue'),
            children: [
                {
                    path: '',
                    redirect: '/music/find'
                },
                {
                    path: 'find',
                    name: 'musicFind',
                    component: ()=> import('../pages/music/pages/find/main.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'fm',
                    name: 'musicFM',
                    component: ()=> import('../pages/music/pages/fm/main.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'media',
                    name: 'musicMedia',
                    component: ()=> import('../pages/music/pages/media/main.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'dynamic',
                    name: 'musicDynamic',
                    component: ()=> import('../pages/music/pages/dynamic/main.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'local',
                    name: 'musicLocal',
                    component: ()=> import('../pages/music/pages/local/main.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'playlist/:id',
                    name: 'musicPlaylist',
                    component: ()=> import('../pages/music/pages/playlist/main.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'cloud',
                    name: 'musicCloud',
                    component: ()=> import('../pages/music/pages/cloud/main.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'download',
                    name: 'musicDownload',
                    component: ()=> import('../pages/music/pages/download/main.vue'),
                    meta: {
                        needSearch: false
                    }
                },
                {
                    path: 'star',
                    name: 'musicStar',
                    component: ()=> import('../pages/music/pages/star/main.vue'),
                    meta: {
                        needSearch: false
                    }
                }
            ]
        },
        {
            path: '/set',
            name: 'set',
            component: ()=> import('../pages/set/main.vue'),
            meta: {
                needSearch: true
            }
        }
    ]
});

export default router;
