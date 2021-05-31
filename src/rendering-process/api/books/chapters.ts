import {get} from 'api/base';

const baseUrl = process.env.VUE_APP_BOOKS_URL;

// 获取小说源
export const booksSource = (booksId:number|string)=> {
    return get({
        url: `${baseUrl}/atoc`,
        params: {
            view: 'summary',
            book: booksId
        },
        apiName: '小说源'
    })
};

// 根据源id获取章节
export const booksChapters = (sourceId:number|string)=> {
    return get({
        url: `${baseUrl}/atoc/${sourceId}`,
        params: {
            view: 'chapters'
        },
        apiName: '书籍章节'
    })
};

// 获取章节内容
export const booksChaptersContent = (chapterlink:string)=> {
    return get({
        url: `http://chapterup.zhuishushenqi.com/chapter/${encodeURIComponent(chapterlink)}`,
        apiName: '书籍章节内容'
    })
};