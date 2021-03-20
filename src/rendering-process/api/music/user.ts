import { get } from '../base';

const baseServe = 'http://139.9.230.159:3000';

// 获取用户歌单
export const getUserPlaylist = (uid:number)=> {
    return get({
        url: `${baseServe}/user/playlist`,
        params: {
            uid,
            limit: 10000,
            timestamp: Date.now()
        }
    })
};