import {get} from '../base';

// 获取书籍信息
export const booksDetail = async booksId=> {
    return get({
        url: `http://api.zhuishushenqi.com/book/${booksId}`,
        apiName: '书籍信息'
    })
};

// 获取5条短评
export const booksComment = async (booksId, page = 0, limit = 5)=> {
    return get({
        url: 'http://api.zhuishushenqi.com/post/review/by-book',
        params: {
            book: booksId,
            start: page,
            limit: limit
        },
        apiName: '书籍短评'
    })
};

// 同类书籍推荐
export const booksRecommend = async booksId=> {
    return get({
        url: `http://api.zhuishushenqi.com/book/${booksId}/recommend`,
        apiName: '书籍推荐'
    })
};