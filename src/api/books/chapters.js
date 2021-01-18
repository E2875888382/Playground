import {get} from '../base';

// 获取小说源
export const booksSource = async booksId=> {
    return get({
        url: 'http://api.zhuishushenqi.com/atoc',
        params: {
            view: 'summary',
            book: booksId
        }
    })
}

// 根据源id获取章节
export const booksChapters = async sourceId=> {
    return get({
        url: `http://api.zhuishushenqi.com/atoc/${sourceId}`,
        params: {
            view: 'chapters'
        }
    })
}