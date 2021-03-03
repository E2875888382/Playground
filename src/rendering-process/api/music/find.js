import { get } from '../base';

const baseServe = 'http://139.9.230.159:3000';

export const getBanner = ()=> {
    return get({
        url: `${baseServe}/banner`,
        params: {
            timestamp: Date.now()
        }
    })
};

export const getPrivateContent = ()=> {
    return get({
        url: `${baseServe}/personalized/privatecontent`,
        params: {
            timestamp: Date.now()
        }
    })
};

export const getNewSong = ()=> {
    return get({
        url: `${baseServe}/personalized/newsong`,
        params: {
            limit: 20,
            timestamp: Date.now()
        }
    })
};

export const getRecommendPlaylist = ()=> {
    return get({
        url: `${baseServe}/personalized`,
        params: {
            timestamp: Date.now()
        }
    })
};

export const getPersonalizedMV = ()=> {
    return get({
        url: `${baseServe}/personalized/mv`,
        params: {
            timestamp: Date.now()
        }
    })
};

export const getDjHot = ()=> {
    return get({
        url: `${baseServe}/dj/hot`,
        params: {
            timestamp: Date.now()
        }
    })
};

export const getPlaylist = id=> {
    return get({
        url: `${baseServe}/playlist/detail`,
        params: {
            id,
            timestamp: Date.now()
        }
    })
};

export const getSongDetail = ids=> {
    return get({
        url: `${baseServe}/song/detail`,
        params: {
            ids: ids.join(',')
        }
    })
};