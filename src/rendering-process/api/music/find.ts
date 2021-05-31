import {get} from 'api/base';

const baseServe = process.env.VUE_APP_MUSIC_URL;

// 获取发现页banner
export const getBanner = ()=> {
    return get({
        url: `${baseServe}/banner`,
        params: {
            timestamp: Date.now()
        }
    })
};

// 发现页推荐内容
export const getPrivateContent = ()=> {
    return get({
        url: `${baseServe}/personalized/privatecontent`,
        params: {
            timestamp: Date.now()
        }
    })
};

// 发现页最新歌曲
export const getNewSong = ()=> {
    return get({
        url: `${baseServe}/personalized/newsong`,
        params: {
            limit: 20,
            timestamp: Date.now()
        }
    })
};

// 发现页推荐歌单
export const getRecommendPlaylist = ()=> {
    return get({
        url: `${baseServe}/personalized`,
        params: {
            timestamp: Date.now()
        }
    })
};

// 发现页推荐MV
export const getPersonalizedMV = ()=> {
    return get({
        url: `${baseServe}/personalized/mv`,
        params: {
            timestamp: Date.now()
        }
    })
};

// 发现页热门Dj
export const getDjHot = ()=> {
    return get({
        url: `${baseServe}/dj/hot`,
        params: {
            timestamp: Date.now()
        }
    })
};

// 获取歌单
export const getPlaylist = (id:number)=> {
    return get({
        url: `${baseServe}/playlist/detail`,
        params: {
            id,
            timestamp: Date.now()
        }
    })
};

// 获取歌曲详情
export const getSongDetail = (ids:number[])=> {
    return get({
        url: `${baseServe}/song/detail`,
        params: {
            ids: ids.join(',')
        }
    })
};

// 获取歌曲播放链接
export const getSongUrl = (id:number)=> {
    return get({
        url: `${baseServe}/song/url`,
        params: {
            id: id
        }
    })
};

// 获取歌词
export const getSongLyric = (id:number)=> {
    return get({
        url: `${baseServe}/lyric`,
        params: {
            id: id
        }
    })
};