import * as books from 'api/books/index';
import * as booksRanking from 'api/books/ranking';
import * as booksCats from 'api/books/cats';
import * as booksDetail from 'api/books/detail';
import * as booksChapters from 'api/books/chapters';
import * as booksSearch from 'api/books/search';
import * as street from 'api/street/index';
import * as webview from 'api/link/index';
import * as pictures from 'api/pictures/index';
import * as login from 'api/login/index';
import * as musicFind from 'api/music/find';
import * as musicUser from 'api/music/user';

// 全局管理api，通过provide注入
export default {
    books,
    booksRanking,
    booksCats,
    booksDetail,
    street,
    booksChapters,
    booksSearch,
    webview,
    pictures,
    login,
    music: {
        find: musicFind,
        user: musicUser
    }
}