import { get } from '../base';

export const getPictures = (page:number)=> {
    return get({
        url: process.env.VUE_APP_PICTURE_URL as string,
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