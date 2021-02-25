import { get } from '../base';

const baseServe = 'http://139.9.230.159:3000';

export const getBanner = ()=> {
    return get({
        url: `${baseServe}/banner`,
        params: {
            timerstamp: Date.now()
        }
    })
};

export const getPrivateContent = ()=> {
    return get({
        url: `${baseServe}/personalized/privatecontent`,
        params: {
            timerstamp: Date.now()
        }
    })
};

export const getNewSong = ()=> {
    return get({
        url: `${baseServe}/personalized/newsong`,
        params: {
            limit: 20,
            timerstamp: Date.now()
        }
    })
};

export const getRecommendPlaylist = ()=> {
    return get({
        url: `${baseServe}/personalized`,
        params: {
            timerstamp: Date.now()
        }
    })
};

export const getPersonalizedMV = ()=> {
    return get({
        url: `${baseServe}/personalized/mv`,
        params: {
            timerstamp: Date.now()
        }
    })
};

export const getDjHot = ()=> {
    return get({
        url: `${baseServe}/dj/hot`,
        params: {
            timerstamp: Date.now()
        }
    })
};