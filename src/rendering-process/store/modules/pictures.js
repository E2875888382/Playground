const state = {
    pictures: []
};
const mutations = {
    updatePictures(state, imgs) {
        state.pictures = imgs;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}