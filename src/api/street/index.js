import {get} from '../base';
import mock from '../mock';

// 网易新闻的接口每天只能调100次，请求失败返回mock
export const newsList = async page=> {
    const res = await get({
        url: 'https://v1.alapi.cn/api/new/toutiao',
        params: {
            start: page,
            num: 20
        }
    });

    return res.code === 200 ? res : mock.newsListMock();
}

export const newsDetail = async (docid)=> {
    const res = await get({
        url: 'https://v1.alapi.cn/api/new/detail',
        params: {
            docid: docid
        }
    });

    return res.code === 200 ? res : mock.newsDetailMock();
}