import {get} from 'api/base';

const baseUrl = process.env.VUE_APP_BOOKS_URL;

// books首页分类
export const booksIndexClass = ()=> {
    return get({
        url: `${baseUrl}/cats/lv2/statistics`,
        apiName: '书籍首页分类'
    })
};

// books首页排行榜
export const booksIndexRank = ()=> {
    return get({
        url: `${baseUrl}/ranking/54d43437d47d13ff21cad58b`,
        apiName: '书籍首页排行榜'
    })
};

// books首页轮播图
export const booksIndexCarousel = ()=> {
    return get({
        url: `${baseUrl}/recommendPage/node/spread/575f74f27a4a60dc78a435a3`,
        params: {
            pl: 'android'
        },
        apiName: '书籍首页轮播图'
    })
};