// import {get} from '../base';
import mock from '../mock';

export const newsList = async ()=> {
    // const res = await get({
    //     url: 'https://v1.alapi.cn/api/new/toutiao',
    //     params: {
    //         start: '1',
    //         num: 20
    //     }
    // });

    // // // 网易新闻每天只能调100次，请求失败返回mock
    // return res.code === 200 ? res : mock.newsListMock();
    return mock.newsListMock();
}

export const newsDetail = async (docid)=> {
    // const res = await get({
    //     url: 'https://v1.alapi.cn/api/new/detail',
    //     params: {
    //         docid: docid
    //     }
    // });

    // // // 网易新闻每天只能调100次，请求失败返回mock
    // return res.code === 200 ? res : mock.newsDetailMock();
    return mock.newsDetailMock(docid);
}