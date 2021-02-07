import {get} from '../base';

// 大分类和小分类
export const booksCats = async()=> {
    return get({
        url: 'http://api.zhuishushenqi.com/cats/lv2',
        apiName: '书籍大小分类'
    })
}

// 获取分类细分
export const booksCatsDetail = async({gender, type, major, minor, start, limit = 20})=> {
    return get({
        url: 'https://api.zhuishushenqi.com/book/by-categories',
        params: {
            gender,
            type,
            major: encodeURIComponent(major),
            minor: encodeURIComponent(minor),
            start,
            limit
        },
        apiName: '书籍分类详细'
    })
}