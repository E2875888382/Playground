import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active-tab',
    routes: [
        {
            path: '/',
            redirect: '/bbs'
        },
        {
            path: '/bbs',
            name: 'bbs',
            component: ()=> import('../pages/street/main.vue')
        },
        {
            path: '/webview',
            name: 'webview',
            component: ()=> import('../pages/link/main.vue')
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
                    path: 'index',
                    name: 'booksIndex',
                    component: ()=> import('../pages/books/pages/index.vue')
                },
                {
                    path: 'ranking',
                    name: 'booksRanking',
                    component: ()=> import('../pages/books/pages/ranking.vue')
                },
                {
                    path: 'cats',
                    name: 'booksCats',
                    component: ()=> import('../pages/books/pages/cats.vue')
                },
                {
                    path: 'catsDetail/:major/:gender',
                    name: 'booksCatsDetail',
                    component: ()=> import('../pages/books/pages/catsDetail.vue')
                },
                {
                    path: 'booksDetail/:from/:booksId',
                    name: 'booksDetail',
                    component: ()=> import('../pages/books/pages/booksDetail.vue')
                },
                {
                    path: 'booksRecommend/:booksId',
                    name: 'booksRecommend',
                    component: ()=> import('../pages/books/pages/recommend.vue')
                },
                {
                    path: 'booksChapters/:booksId',
                    name: 'booksChapters',
                    component: ()=> import('../pages/books/pages/chapters.vue')
                }
            ]
        },
        {
            path: '/chat',
            name: 'chat',
            component: ()=> import('../pages/chat/main.vue')
        },
        {
            path: '/collection',
            name: 'collection',
            component: ()=> import('../pages/collection/main.vue')
        },
        {
            path: '/pictures',
            name: 'pictures',
            component: ()=> import('../pages/pictures/main.vue')
        },
        {
            path: '/media',
            name: 'media',
            component: ()=> import('../pages/media/main.vue')
        }
    ]
});

export default router;
