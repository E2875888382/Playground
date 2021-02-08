import { get } from '../base';

// 获取二维码code
export const getQrCode = ()=> {
    return get({
        url: 'http://139.9.230.159:3000/login/qr/key',
        params: {
            timerstamp: Date.now()
        }
    })
};

// 获取二维码
export const getQrCodeImg = key=> {
    return get({
        url: 'http://139.9.230.159:3000/login/qr/create',
        params: {
            key: key,
            qrimg: true,
            timerstamp: Date.now()
        }
    })
};

// 获取扫码状态
export const checkQrCodeStatus = key=> {
    return get({
        url: 'http://139.9.230.159:3000/login/qr/check',
        params: {
            key: key,
            timerstamp: Date.now()
        }
    })
};

export const getLoginStatus = cookie=> {
    return get({
        url: 'http://139.9.230.159:3000/login/status',
        params: {
            timerstamp: Date.now()
        },
        cookie: cookie
    })
}