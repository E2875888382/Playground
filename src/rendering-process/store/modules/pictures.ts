interface IPicturesState {
    pictures: Array<any>;
}

const state = {
    pictures: []
};
const mutations = {
    updatePictures(state: IPicturesState, imgs:Array<any>) {
        state.pictures = imgs;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}