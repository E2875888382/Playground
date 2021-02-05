import {get} from '../base';

// books首页分类
export const booksIndexClass = ()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/cats/lv2/statistics'
    })
}

// books首页排行榜
export const booksIndexRank = ()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b'
    })
}

// books首页轮播图
export const booksIndexCarousel = ()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/recommendPage/node/spread/575f74f27a4a60dc78a435a3',
        params: {
            pl: 'android'
        }
    })
}