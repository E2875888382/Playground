interface IUserState {
    cookie: string;
    nickname: string;
    avatar: string;
    bookshelf: Array<IBookshelfItem>;
    playList: Array<any>;
}
interface IBookshelfItem {
    cover: string
}

const state = {
    cookie: '',
    nickname: '未登录',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    bookshelf: [
        {
            cover: 'http://img.1391.com/api/v1/bookcenter/cover/1/84550/84550_5ff41218ce414b53aae2a58867dd0a22.jpg/'
        },
        {
            cover: 'http://img.1391.com/api/v1/bookcenter/cover/1/46975/46975_590362a3ff5c4f038ed9df52d09d116f.jpg/'
        },
        {
            cover: 'http://img.1391.com/api/v1/bookcenter/cover/1/3387088/3387088_368c1a79dccf420d8a343009fd954d29.jpg/'
        }
    ],
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
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

