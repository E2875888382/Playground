declare interface IBookState {
    [propsName: string]: any;
}
declare interface IBook {
    booksId: string | number;
    chapters: Array<any>;
}