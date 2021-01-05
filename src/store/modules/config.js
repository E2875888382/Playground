import { ipcRenderer } from 'electron';
const state = {
    tabs: [
        {
            icon: 'news',
            path: '/bbs'
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
            icon: 'close',
            event: ()=> ipcRenderer.send('close')
        },
        {
            icon: 'full-screen',
            event: ()=> ipcRenderer.send('max')
        },
        {
            icon: 'minus',
            event: ()=> ipcRenderer.send('min')
        }
    ]
};

export default {
    namespaced: true,
    state
}