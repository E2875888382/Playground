<template>
    <Layout customClass="set-container">
        <el-tabs tab-position="left" >
            <el-tab-pane label="关于">
                <div class="pane-container">
                    <el-avatar :src="logo" shape="circle" :size="100"/>
                    <p>Playground V1.0.0</p>
                    <el-button>检测版本</el-button>
                    <p class="copyright">Copyright ©2021 - 2022 Elric . All Rights Reserved .</p>
                </div>
            </el-tab-pane>
            <el-tab-pane label="账号设置">
                <div class="pane-container">
                    <el-avatar :src="avatar" shape="circle" :size="100"/>
                    <p>{{nickname}}</p>
                    <el-button @click="logout">退出登录</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </Layout>
</template>

<script lang="ts">
import Layout from '../../components/Layout.vue';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
    components: {
        Layout
    },
    setup() {
        const store = useStore();
        const logo = require('../../assets/img/icon.png');

        return {
            logo,
            avatar: computed(()=> store.state.user.avatar),
            nickname: computed(()=> store.state.user.nickname),
            logout: ()=> {
                store.commit('user/updateAvatar', 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
                store.commit('user/updateNickName', '未登录');
                store.commit('user/updateCookie', '');
            }
        }
    }
})
</script>

<style lang="less" scoped>
.set-container {
    .flex-center;
}
.el-tabs {
    width: 90%;
    height: 90%;
    &:deep(.el-tabs__content) {
        height: 100%;
    }
    &:deep(.el-tab-pane) {
        height: 100%;
    }
}
.pane-container {
    position: relative;
    .flex-center;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.el-avatar {
    margin: 120px 0 20px 0;
}
.copyright {
    position: absolute;
    bottom: 0;
    color: #999;
}
</style>