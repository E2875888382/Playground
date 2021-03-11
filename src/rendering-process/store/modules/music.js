const state = {
    // 播放列表
    playlist: [],
    // 播放列表
    history: [],
    // 当前歌曲在播放列表中的索引
    currentMusicIndex: -1,
    // 音量
    volume: 0
};
const mutations = {
    updatePlaylist(state, playlist) {
        state.playlist = playlist;
    },
    deleteFromPlayList(state, id) {
        state.playlist = state.playlist.filter(item=> item.id !== id);
    },
    addToPlaylist(state, music) {
        const map = new Map();

        // 根据id去重
        state.playlist = [...state.playlist, music].filter(item=> !map.has(item.id) && map.set(item.id, 1));
    },
    deleteFromHistory(state, id) {
        state.history = state.history.filter(item=> item.id !== id);
    },
    updateHistory(state, history) {
        state.history = history;
    },
    addToHistory(state, history) {
        const map = new Map();
        const date = new Date();
        const zero = n=> n < 10 ? '0' + n : n;
        const music = {
            ...history,
            playTime: `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(date.getDate())}`
        };

        // 根据id去重
        state.history = [...state.history, music].filter(item=> !map.has(item.id) && map.set(item.id, 1));
    },
    updateCurrentMusicIndex(state, music) {
        state.playlist.map((item, index)=> {
            if (music.id === item.id) {
                state.currentMusicIndex = index;
            }
        });
    },
    updateVolume(state, volume) {
        state.volume = volume;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

