interface IBookState {
    [propsName: string]: any;
}
interface IBook {
    booksId: string | number;
    chapters: Array<any>;
}

const state = {
    book: {
        booksId: '',
        chapters: []
    }
};
const mutations = {
    updateBook(state: IBookState, book: IBook) {
        state.book = book;
    },
    resetBook(state: IBookState) {
        state.book = {booksId: '', chapters: []};
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

