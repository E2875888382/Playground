import {get} from '../base';

export const booksClass = ()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/cats/lv2/statistics'
    })
}

export const booksIndexRank = ()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b'
    })
}