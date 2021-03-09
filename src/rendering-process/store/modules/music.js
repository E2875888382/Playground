const state = {
    // 播放列表
    playlist: []
};
const mutations = {
    updatePlaylist(state, playlist) {
        state.playlist = playlist;
    },
    addToPlaylist(state, music) {
        const map = new Map();

        // 根据id去重
        state.playlist = [...state.playlist, music].filter(item=> !map.has(item.id) && map.set(item.id, 1));
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

