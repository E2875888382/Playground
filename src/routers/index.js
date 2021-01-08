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
            component: ()=> import('../pages/street.vue')
        },
        {
            path: '/webview',
            name: 'webview',
            component: ()=> import('../pages/link.vue')
        },
        {
            path: '/books',
            name: 'books',
            component: ()=> import('../pages/books.vue')
        },
        {
            path: '/chat',
            name: 'chat',
            component: ()=> import('../pages/chat.vue')
        },
        {
            path: '/collection',
            name: 'collection',
            component: ()=> import('../pages/collection.vue')
        },
        {
            path: '/pictures',
            name: 'pictures',
            component: ()=> import('../pages/pictures.vue')
        },
        {
            path: '/media',
            name: 'media',
            component: ()=> import('../pages/media.vue')
        }
    ]
});

export default router;
