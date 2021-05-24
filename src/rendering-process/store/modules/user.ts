const state = {
    cookie: '',
    nickname: '未登录',
    avatar: require('commonImgs/user_default.png'),
    bookshelf: [],
    playList: []
};
const mutations = {
    updateNickName(state: IUserState, nickname:string) {
        state.nickname = nickname;
    },
    updateAvatar(state: IUserState, avatar:string) {
        state.avatar = avatar;
    },
    updateCookie(state: IUserState, cookie:string) {
        state.cookie = cookie;
        localStorage.setItem('cookie', cookie);
    },
    updatePlayList(state: IUserState, playList:Array<any>) {
        state.playList = playList;
    },
    updateBookshelf(state: IUserState, book: IBookshelfItem) {
        if (!state.bookshelf.map(book=> book.booksId).includes(book.booksId)) {
            state.bookshelf = [...state.bookshelf, book];
        }
    },
    deleteFromBookshelf(state: IUserState, booksId: string | number) {
        state.bookshelf = state.bookshelf.filter(book=> book.booksId !== booksId);
    },
    getBookshelfStorage(state: IUserState) {
        state.bookshelf = localStorage['bookshelf'] ? JSON.parse(localStorage['bookshelf']) : [];
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

