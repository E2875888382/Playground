import {get} from 'api/base';

const baseServe = process.env.VUE_APP_MUSIC_URL;

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