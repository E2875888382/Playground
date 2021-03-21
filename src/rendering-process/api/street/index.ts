import {get} from '../base';
import mock from '../mock';

const baseUrl = process.env.VUE_APP_NEWS_URL;

// 网易新闻的接口每天只能调100次，请求失败返回mock
export const newsList = async (page:number)=> {
    const res = await get({
        url: `${baseUrl}/toutiao`,
        params: {
            start: page,
            num: 20
        },
        apiName: '新闻列表'
    });

    return res.code === 200 ? res : mock.newsListMock();
};

export const newsDetail = async (docid:number)=> {
    const res = await get({
        url: `${baseUrl}/detail`,
        params: {
            docid: docid
        },
        apiName: '新闻详情'
    });

    return res.code === 200 ? res : mock.newsDetailMock();
};