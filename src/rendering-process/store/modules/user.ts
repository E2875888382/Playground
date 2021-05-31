import { getLoginStatus } from 'api/login';
import { getUserPlaylist } from 'api/music/user';
import { ElMessage } from 'element-plus';

const state = {
    cookie: '',
    nickname: '未登录',
    avatar: require('commonImgs/user_default.png'),
    bookshelf: [],
    playList: []
};
const mutations = {
    updateNickName(state: IUserState, nickname:string) {
        state.nickname = nickname;
    },
    updateAvatar(state: IUserState, avatar:string) {
        state.avatar = avatar;
    },
    updateCookie(state: IUserState, cookie:string) {
        state.cookie = cookie;
        localStorage.setItem('cookie', cookie);
    },
    updatePlayList(state: IUserState, playList:Array<any>) {
        state.playList = playList;
    },
    updateBookshelf(state: IUserState, book: IBookshelfItem) {
        if (!state.bookshelf.map(book=> book.booksId).includes(book.booksId)) {
            state.bookshelf = [...state.bookshelf, book];
        }
    },
    deleteFromBookshelf(state: IUserState, booksId: string | number) {
        state.bookshelf = state.bookshelf.filter(book=> book.booksId !== booksId);
    },
    getBookshelfStorage(state: IUserState) {
        state.bookshelf = localStorage['bookshelf'] ? JSON.parse(localStorage['bookshelf']) : [];
    }
};
const actions = {
    // 获取登录信息
    async getLoginMsg(context:any) {
        const res:any = await getLoginStatus();

        if (res.data?.code === 200 && res.data.profile && res.data.account) {
            ElMessage({
                message: '登录成功',
                type: 'success',
                offset: 200,
                duration: 1000
            });
            const { profile, account } = res.data;

            context.commit('updateAvatar', profile.avatarUrl);
            context.commit('updateNickName', profile.nickname);
            // 获取用户歌单
            const playList:any = await getUserPlaylist(account.id);

            context.commit('updatePlayList', playList.playlist);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

