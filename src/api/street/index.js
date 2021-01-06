import {get} from '../base';

export const newsList = ()=> {
    // return get({
    //     // 网易新闻每天只能调100次
    //     url: 'https://v1.alapi.cn/api/new/toutiao',
    //     params: {
    //         start: '1',
    //         num: 20
    //     }
    // });
    // mock
    return Promise.resolve({
        "code": 200,
        "msg": "success",
        "data": [{
                "title": "探秘女民兵方队:有81位\"妈妈队员\" 平均身高1米72",
                "digest": "我们把目光聚焦参阅的民兵方队，2009年，庆祝中华人民共和国60岁生日的那天，女民兵的亮相就曾吸引了无数眼球，那么，十年后的国庆日，她们又将会以怎样崭新的面貌接",
                "docid": "EQ31D75L0001899O",
                "pc_url": "http://news.163.com/19/0927/11/EQ31D75L0001899O.html",
                "m_url": "http://3g.163.com/news/19/0927/11/EQ31D75L0001899O.html",
                "imgsrc": "http://cms-bucket.ws.126.net/2019/09/27/522b6768307e45658fc904aba5a0d3a2.png",
                "source": "央视新闻客户端",
                "time": "2019-09-27 17:16:20"
            },
            {
                "title": "孩子乱玩手机误点拍下一辆凯迪拉克？法院通报孩子乱玩手机误点拍下一辆凯迪拉克？法院通报",
                "digest": "陈某在司法网络拍卖平台，以8万余元的价格，成功拍得一辆凯迪拉克，此后却不想要了，称自家小孩子乱玩手机误点。记者从南海法院获悉，最终陈某还是因自己的草率而买了单。",
                "docid": "EQ39IOUB0001899N",
                "pc_url": "http://news.163.com/19/0927/14/EQ39IOUB0001899N.html",
                "m_url": "http://3g.163.com/news/19/0927/14/EQ39IOUB0001899N.html",
                "imgsrc": "http://cms-bucket.ws.126.net/2019/09/27/49787296c2c94ef3bbb70eaff1d0346b.png",
                "source": "南方都市报",
                "time": "2019-09-27 17:16:26"
            }
        ],
        "Author": {
            "name": "Alone88",
            "desc": "由Alone88提供的免费API 服务，官方文档：www.alapi.cn"
        }
    });
}

export const newsDetail = ()=> {
    return get({
        url: 'https://v1.alapi.cn/api/new/detail',
        params: {
            docid: 'FVK0JGM80534QA9S'
        }
    });
}