import {get} from '../base';

// 获取书籍信息
export const booksDetail = async booksId=> {
    return get({
        url: `http://api.zhuishushenqi.com/book/${booksId}`
    })
}

// 获取5条短评
export const booksComment = async (booksId, page = 0, limit = 5)=> {
    return get({
        url: 'http://api.zhuishushenqi.com/post/review/by-book',
        params: {
            book: booksId,
            start: page,
            limit: limit
        }
    })
}

// 同类书籍推荐
export const booksRecommend = async booksId=> {
    return get({
        url: `http://api.zhuishushenqi.com/book/${booksId}/recommend`
    })
}