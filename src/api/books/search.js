import {get} from '../base';

// 搜索热词
export const searchHotwords = async()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/search-hotwords'
    })
};

// 热门搜索
export const hotWords = async()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/hot-word'
    })
};

// 搜索补全
export const autoComplete = async query=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/auto-complete',
        params: {
            query: encodeURIComponent(query)
        }
    })
};

// 模糊搜索
export const searchByTitle = async query=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/fuzzy-search',
        params: {
            query: encodeURIComponent(query)
        }
    })
};

// 根据作者名模糊搜索, 怎么搜都是空数组，醉了
export const searchByAuthor = async author=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/accurate-search',
        params: {
            author: encodeURIComponent(author)
        }
    })
};