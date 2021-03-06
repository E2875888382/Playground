const state = {
    // 播放列表
    playlist: []
};
const mutations = {
    updatePlaylist(state, playlist) {
        state.playlist = playlist;
    },
    addToPlaylist(state, music) {
        state.playlist = [...state.playlist, music];
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

