import {get} from 'api/base';

const baseUrl = process.env.VUE_APP_BOOKS_URL;

// 获取书籍信息
export const booksDetail = (booksId:number|string)=> {
    return get({
        url: `${baseUrl}/book/${booksId}`,
        apiName: '书籍信息'
    })
};

// 获取5条短评
export const booksComment = (booksId:number|string, page = 0, limit = 5)=> {
    return get({
        url: `${baseUrl}/post/review/by-book`,
        params: {
            book: booksId,
            start: page,
            limit: limit
        },
        apiName: '书籍短评'
    })
};

// 同类书籍推荐
export const booksRecommend = (booksId:number|string)=> {
    return get({
        url: `${baseUrl}/book/${booksId}/recommend`,
        apiName: '书籍推荐'
    })
};