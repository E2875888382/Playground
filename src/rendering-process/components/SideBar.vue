<template>
    <div class="side-bar">
        <div class="side-bar__avatar">
            <el-avatar :src="avatar" shape="square" class="avatar-content" @click="showLoginDialog"/>
        </div>
        <div class="side-bar__tabs">
            <router-link
                exact 
                :to="tab.path" 
                v-for="(tab, index) in tabs"
                :key="index"
                :class="['iconfont', `${tab.icon}`, 'tabs__item']"
            >
            </router-link>
        </div>
        <div class="side-bar__options">
            <router-link exact to="/set" class="iconfont icon-shezhi options__item"></router-link>
        </div>
        <el-dialog
            title="Playground"
            v-model="dialogVisible"
            width="350px"
            custom-class="login-dialog"
            :close-on-click-modal="false"
            :destroy-on-close="true"
        >
            <div class="login-dialog__content">
                <el-image :src="loginCode"/>
            </div>
            <template #footer>
                <p class="login-dialog__footer">请使用网易云扫一扫以登录</p>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const loginStatus = computed(()=> store.state.user.cookie.length > 0);
        const loginCode = ref('');
        const { getQrCode, getQrCodeImg, checkQrCodeStatus, getLoginStatus, getSubcount } = inject('api').login;
        const { getUserPlaylist } = inject('api').music.user;
        const dialogVisible = ref(false);
        const store = useStore();
        const Message = inject('message');
        // 生成二维码
        const createQrcode = async()=> {
            const qrcode = await getQrCode();
            const key = qrcode.data?.unikey;
            const img = await getQrCodeImg(key);

            loginCode.value = img.data?.qrimg || '';
            const timer = setInterval(async ()=> {
                const statusRes = await checkQrCodeStatus(key);

                if (statusRes.code === 800) {
                    clearInterval(timer);
                    createQrcode();
                    Message({
                        message: '二维码已过期，请重新扫码',
                        type: 'info',
                        offset: 200,
                        duration: 1000
                    });
                } else if (statusRes.code === 803) {
                    clearInterval(timer);
                    // 将cookie写入请求头
                    store.commit('user/updateCookie', statusRes.cookie);
                    const res = await getLoginStatus();

                    if (res.data?.code === 200) {
                        Message({
                            message: '登录成功',
                            type: 'success',
                            offset: 200,
                            duration: 1000
                        });
                        dialogVisible.value = false;
                        const { profile, account } = res.data;
                        console.log('登录状态：', res);
                        store.commit('user/updateAvatar', profile.avatarUrl);
                        store.commit('user/updateNickName', profile.nickname);
                        const subcount = await getSubcount();
                        const playList = await getUserPlaylist(account.id);

                        store.commit('user/updatePlayList', playList.playlist);
                        console.log('用户歌单：', subcount, playList);
                    }
                }
            }, 3000);
        };
        const showLoginDialog = ()=> {
            if (loginStatus.value) return;
            createQrcode();
            dialogVisible.value = true;
        };

        return {
            loginCode: loginCode,
            dialogVisible,
            showLoginDialog,
            avatar: computed(()=> store.state.user.avatar),
            tabs: computed(()=> store.state.config.tabs)
        }
    }
}
</script>

<style lang="less" scoped>
@tabs-item-size: 30px;
.side-bar {
    -webkit-app-region: drag;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    height: 100%;
    background-color: #26292d;
    &:deep(.login-dialog) {
        background-color: #f5f5f5;
        height: 500px;
    }
    &:deep(.el-dialog__header) {
        .el-dialog__headerbtn {
            top: 10px;
            right: 12px;
        }
        .el-dialog__title {
            color: #909399;
        }
        padding: 10px 12px 20px;
    }
}
.login-dialog__content {
    .flex-center;
    align-items: flex-end;
    height: 253px;
    .el-image {
        width: 240px;
        height: 240px;
    }
}
.login-dialog__footer {
    text-align: center;
    font-size: 18px;
    color: #606266c7;
}
.side-bar__avatar {
    -webkit-app-region: no-drag;
    .flex-center;
    width: 80px;
    height: 80px;
    .avatar-content {
        cursor: pointer;
    }
}
.side-bar__tabs {
    flex-grow: 1;
    width: 80px;
    .tabs__item {
        .flex-center;
        -webkit-app-region: no-drag;
        width: @tabs-item-size;
        height: @tabs-item-size;
        padding: 20px 25px;
        text-decoration: none;
        font-size: @tabs-item-size;
        color: #FFF;
        opacity: 0.3;
        &:hover {
            opacity: 0.6;
        }
        &:nth-of-type(1) {
            font-size: 23px;
        }
        &:nth-of-type(3) {
            font-size: 33px;
        }
    }
    .router-link-active, .active-tab{
        opacity: 0.6;
        color: #1ae61a;
    }
}
.side-bar__options {
    width: 80px;
    .options__item {
        .flex-center;
        -webkit-app-region: no-drag;
        width: @tabs-item-size;
        height: @tabs-item-size;
        padding: 20px 25px;
        font-size: @tabs-item-size;
        color: #FFF;
        text-decoration: none;
        opacity: 0.3;
        &:hover {
            opacity: 0.6;
        }
    }
    .router-link-active, .active-tab{
        opacity: 0.6;
        color: #1ae61a;
    }
}
</style>