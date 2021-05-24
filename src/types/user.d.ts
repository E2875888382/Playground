declare interface IUserState {
    cookie: string;
    nickname: string;
    avatar: string;
    bookshelf: Array<IBookshelfItem>;
    playList: Array<any>;
}
declare interface IBookshelfItem {
    cover: string;
    booksId: string | number
}