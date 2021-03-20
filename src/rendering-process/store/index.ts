import { createStore } from 'vuex';
import user from './modules/user';
import config from './modules/config';
import book from './modules/book';
import pictures from './modules/pictures';
import music from './modules/music';
import syncPlugins from './plugins/synchronous';

export default createStore({
    modules: {
        user,
        config,
        book,
        pictures,
        music
    },
    plugins: [syncPlugins]
})