import { get } from '../base';

export const getPictures = page=> {
    return get({
        url: 'http://wallpaper.apc.360.cn/index.php',
        params: {
            c: 'WallPaper',
            a: 'getAppsByOrder',
            order: 'create_time',
            start: page,
            count: 20,
            from: '360chrome'
        },
        apiName: '壁纸'
    })
};