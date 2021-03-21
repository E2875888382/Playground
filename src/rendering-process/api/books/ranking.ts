import {get} from '../base';

const baseUrl = process.env.VUE_APP_BOOKS_URL;

// 排行榜分类
export const booksRankingClass = ()=> {
    return get({
        url: `${baseUrl}/ranking/gender`,
        apiName: '排行榜分类'
    })
};

// 排行榜具体内容
export const booksRankingDetail = (rankingId:number|string)=> {
    return get({
        url: `${baseUrl}/ranking/${rankingId}`,
        apiName: '排行榜'
    })
};