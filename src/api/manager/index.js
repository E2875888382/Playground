import * as books from '../books';
import * as booksRanking from '../books/ranking';
import * as booksCats from '../books/cats';
import * as booksDetail from '../books/booksDetail';
import * as booksChapters from '../books/chapters';
import * as street from '../street';

// 全局管理api，通过provide注入
export default {
    books,
    booksRanking,
    booksCats,
    booksDetail,
    street,
    booksChapters
}