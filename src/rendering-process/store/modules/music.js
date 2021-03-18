const state = {
    // 播放列表
    playlist: [],
    // 播放列表
    history: [],
    // 当前歌曲在播放列表中的索引
    currentMusicIndex: -1,
    // 音量
    volume: 0,
    // 当前歌曲的全部歌词
    allLyric: '',
    // 当前那一行歌词
    lyricLine: '听见好时光',
    // 当前那一个歌词的index
    lyricIndex: 0,
    // 全屏播放
    fullSreen: false,
    // 暂停播放
    pause: true
};
const mutations = {
    // 更新歌单
    updatePlaylist(state, playlist) {
        state.playlist = playlist;
    },
    // 删除歌单某一首歌
    deleteFromPlayList(state, id) {
        state.playlist = state.playlist.filter(item=> item.id !== id);
    },
    // 添加一首歌到歌单
    addToPlaylist(state, music) {
        const map = new Map();

        // 根据id去重
        state.playlist = [...state.playlist, music].filter(item=> !map.has(item.id) && map.set(item.id, 1));
    },
    // 从历史记录删除一首歌
    deleteFromHistory(state, id) {
        state.history = state.history.filter(item=> item.id !== id);
    },
    // 更新历史记录
    updateHistory(state, history) {
        state.history = history;
    },
    // 添加一首歌到历史记录
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
    // 更新当前播放歌曲的索引
    updateCurrentMusicIndex(state, music) {
        state.playlist.map((item, index)=> {
            if (music.id === item.id) {
                state.currentMusicIndex = index;
            }
        });
    },
    // 更新音量
    updateVolume(state, volume) {
        state.volume = volume;
    },
    // 更新当前那一行歌词
    updateLyric(state, lyricLine) {
        state.lyricLine = lyricLine;
    },
    // 更新当前那一行歌词的index
    updateLyricIndex(state, lyricIndex) {
        state.lyricIndex = lyricIndex;
    },
    // 是否全屏模式
    updateFullSreen(state, fullSreen) {
        state.fullSreen = fullSreen;
    },
    // 是否暂停播放
    updatePause(state, pause) {
        state.pause = pause;
    },
    // 更新全部歌词
    updateAllLyric(state, allLyric) {
        state.allLyric = allLyric;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

