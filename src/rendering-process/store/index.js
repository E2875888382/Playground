import { createStore } from 'vuex';
import user from './modules/user';
import config from './modules/config';
import book from './modules/book';
import pictures from './modules/pictures';

export default createStore({
    modules: {
        user,
        config,
        book,
        pictures
    }
})