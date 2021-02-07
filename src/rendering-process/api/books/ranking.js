import {get} from '../base';

// 排行榜分类
export const booksRankingClass = ()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/ranking/gender',
        apiName: '排行榜分类'
    })
}

// 排行榜具体内容
export const booksRankingDetail = rankingId=> {
    return get({
        url: `http://api.zhuishushenqi.com/ranking/${rankingId}`,
        apiName: '排行榜'
    })
}