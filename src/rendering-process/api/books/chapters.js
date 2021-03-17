import {get} from '../base';

// 获取小说源
export const booksSource = async booksId=> {
    return get({
        url: 'http://api.zhuishushenqi.com/atoc',
        params: {
            view: 'summary',
            book: booksId
        },
        apiName: '小说源'
    })
};

// 根据源id获取章节
export const booksChapters = async sourceId=> {
    return get({
        url: `http://api.zhuishushenqi.com/atoc/${sourceId}`,
        params: {
            view: 'chapters'
        },
        apiName: '书籍章节'
    })
};

// 获取章节内容
export const booksChaptersContent = async chapterlink=> {
    return get({
        url: `http://chapterup.zhuishushenqi.com/chapter/${encodeURIComponent(chapterlink)}`,
        apiName: '书籍章节内容'
    })
};