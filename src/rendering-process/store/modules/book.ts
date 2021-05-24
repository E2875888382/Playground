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

