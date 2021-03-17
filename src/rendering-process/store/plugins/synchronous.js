export default store=> {
    store.subscribe(mutation => {
        // 通过localStorage将mainWindow的歌词传递给lyricWindow
        if (mutation.type === 'music/updateLyric') {
            localStorage.setItem('lyric', mutation.payload);
        }
    });
    // lyricWindow监听storage变化，同步到自己的vuex
    window.addEventListener('storage', ()=> {
        if (localStorage.lyric) {
            store.commit('music/updateLyric', localStorage.getItem('lyric'));
        }
    })
};