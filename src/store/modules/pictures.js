const state = {
    pictures: [
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1052506143,1638755810&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=343185238,2815440693&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3172269605,1304675993&fm=26&gp=0.jpg'
    ]
};
const mutations = {
    updatePictures(state, imgs) {
        state.pictures = imgs
    }
};

export default {
    namespaced: true,
    state,
    mutations
}