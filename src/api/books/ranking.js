import {get} from '../base';

// 排行榜分类
export const booksRankingClass = ()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/ranking/gender'
    })
}

// 排行榜具体内容
export const booksRankingDetail = rankingId=> {
    return get({
        url: `http://api.zhuishushenqi.com/ranking/${rankingId}`
    })
}