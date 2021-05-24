const state = {
    // 播放列表
    playlist: [],
    // 播放列表
    history: [],
    // 当前歌曲在播放列表中的索引
    currentMusicIndex: 0,
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
    updatePlaylist(state: IMusicState, playlist: IMusicList) {
        state.playlist = playlist;
    },
    // 删除歌单某一首歌
    deleteFromPlayList(state: IMusicState, id: number) {
        state.playlist = state.playlist.filter(item=> item.id !== id);
    },
    // 添加一首歌到歌单
    addToPlaylist(state: IMusicState, music: IMusicItem) {
        const map = new Map();

        // 根据id去重
        state.playlist = [...state.playlist, music].filter(item=> !map.has(item.id) && map.set(item.id, 1));
    },
    // 从历史记录删除一首歌
    deleteFromHistory(state: IMusicState, id: number) {
        state.history = state.history.filter(item=> item.id !== id);
    },
    // 更新历史记录
    updateHistory(state: IMusicState, history: IMusicList) {
        state.history = history;
    },
    // 添加一首歌到历史记录
    addToHistory(state: IMusicState, history: IMusicItem) {
        const map = new Map();
        const date = new Date();
        const zero = (n:number)=> n < 10 ? '0' + n : n;
        const music = {
            ...history,
            playTime: `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(date.getDate())}`
        };

        // 根据id去重
        state.history = [...state.history, music].filter(item=> !map.has(item.id) && map.set(item.id, 1));
    },
    // 更新当前播放歌曲的索引
    updateCurrentMusicIndex(state: IMusicState, music: IMusicItem) {
        state.playlist.map((item, index)=> {
            if (music.id === item.id) {
                state.currentMusicIndex = index;
            }
        });
    },
    // 切换下一首
    nextMusic(state: IMusicState) {
        // 当前的index
        const currentIndex = state.currentMusicIndex;
        // 获取下一首歌
        const next = state.playlist[currentIndex + 1];

        state.currentMusicIndex = next ? currentIndex + 1 : 0;
    },
    // 切换上一首
    preMusic(state: IMusicState) {
        // 当前的index
        const currentIndex = state.currentMusicIndex;
        // 获取上一首歌
        const next = state.playlist[currentIndex - 1];

        state.currentMusicIndex = next ? currentIndex - 1 : state.playlist.length - 1;
    },
    // 随机播放
    randomSong(state: IMusicState) {
        // 当前的index
        const currentIndex = state.currentMusicIndex;
        // 排除只有一首歌的情况
        if (state.playlist.length === 1) return;
        // 在剩下的歌曲里面随便取一首歌
        const restIndex = [...state.playlist.keys()].filter(index=> index !== currentIndex);

        state.currentMusicIndex = restIndex[Math.floor(Math.random() * restIndex.length)];
    },
    // 更新音量
    updateVolume(state: IMusicState, volume: number) {
        state.volume = volume;
    },
    // 更新当前那一行歌词
    updateLyric(state: IMusicState, lyricLine: string) {
        state.lyricLine = lyricLine;
    },
    // 更新当前那一行歌词的index
    updateLyricIndex(state: IMusicState, lyricIndex: number) {
        state.lyricIndex = lyricIndex;
    },
    // 是否全屏模式
    updateFullSreen(state: IMusicState, fullSreen: boolean) {
        state.fullSreen = fullSreen;
    },
    // 是否暂停播放
    updatePause(state: IMusicState, pause: boolean) {
        state.pause = pause;
    },
    // 更新全部歌词
    updateAllLyric(state: IMusicState, allLyric: string) {
        state.allLyric = allLyric;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

