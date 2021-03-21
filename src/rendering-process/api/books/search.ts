import {get} from '../base';

// 搜索热词
export const searchHotwords = async()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/search-hotwords',
        apiName: '搜索热词'
    })
};

// 热门搜索
export const hotWords = async()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/hot-word',
        apiName: '热门搜索'
    })
};

// 搜索补全
export const autoComplete = async (query:string)=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/auto-complete',
        params: {
            query: encodeURIComponent(query)
        },
        apiName: '搜索补全'
    })
};

// 模糊搜索
export const searchByTitle = async (query:string)=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/fuzzy-search',
        params: {
            query: encodeURIComponent(query)
        },
        apiName: '模糊搜索'
    })
};

// 根据作者名模糊搜索, 怎么搜都是空数组，醉了
export const searchByAuthor = async (author:string)=> {
    return get({
        url: 'http://api.zhuishushenqi.com/book/accurate-search',
        params: {
            author: encodeURIComponent(author)
        },
        apiName: '根据作者名搜索'
    })
};