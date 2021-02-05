const state = {
    book: {
        booksId: '',
        chapters: []
    }
};
const mutations = {
    updateBook(state, book) {
        state.book = book;
    },
    resetBook(state) {
        state.book = {booksId: '', chapters: []};
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

