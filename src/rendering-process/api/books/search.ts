import {get} from '../base';

const baseUrl = process.env.VUE_APP_BOOKS_URL;

// 搜索热词
export const searchHotwords = ()=> {
    return get({
        url: `${baseUrl}/book/search-hotwords`,
        apiName: '搜索热词'
    })
};

// 热门搜索
export const hotWords = ()=> {
    return get({
        url: `${baseUrl}/book/hot-word`,
        apiName: '热门搜索'
    })
};

// 搜索补全
export const autoComplete = (query:string)=> {
    return get({
        url: `${baseUrl}/book/auto-complete`,
        params: {
            query: encodeURIComponent(query)
        },
        apiName: '搜索补全'
    })
};

// 模糊搜索
export const searchByTitle = (query:string)=> {
    return get({
        url: `${baseUrl}/book/fuzzy-search`,
        params: {
            query: encodeURIComponent(query)
        },
        apiName: '模糊搜索'
    })
};

// 根据作者名模糊搜索, 怎么搜都是空数组，醉了
export const searchByAuthor = (author:string)=> {
    return get({
        url: `${baseUrl}/book/accurate-search`,
        params: {
            author: encodeURIComponent(author)
        },
        apiName: '根据作者名搜索'
    })
};