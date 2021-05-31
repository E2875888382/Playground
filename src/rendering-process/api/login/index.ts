import {get} from 'api/base';

const baseServe = process.env.VUE_APP_MUSIC_URL;

// 获取二维码code
export const getQrCode = ()=> {
    return get({
        url: `${baseServe}/login/qr/key`,
        params: {
            timerstamp: Date.now()
        }
    })
};

// 获取二维码
export const getQrCodeImg = (key:number|string)=> {
    return get({
        url: `${baseServe}/login/qr/create`,
        params: {
            key: key,
            qrimg: true,
            timerstamp: Date.now()
        }
    })
};

// 获取扫码状态
export const checkQrCodeStatus = (key:number|string)=> {
    return get({
        url: `${baseServe}/login/qr/check`,
        params: {
            key: key,
            timerstamp: Date.now()
        }
    })
};

// 检查登录状态
export const getLoginStatus = ()=> {
    return get({
        url: `${baseServe}/login/status`,
        params: {
            timerstamp: Date.now()
        }
    })
};

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const getSubcount = ()=> {
    return get({
        url: `${baseServe}/user/subcount`,
        params: {
            timerstamp: Date.now()
        }
    })
};