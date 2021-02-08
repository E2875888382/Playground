const state = {
    nickname: '',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    // avatar: 'https://uploadfiles.nowcoder.com/images/20210104/643027554_1609752867755/F839B9255BD6DD31876B9BC2475B0D1E',
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
    ]
};
const mutations = {
    updateNickName(state, nickname) {
        state.nickname = nickname;
    },
    updateAvatar(state, avatar) {
        state.avatar = avatar;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}

