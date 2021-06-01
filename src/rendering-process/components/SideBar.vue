<template>
    <div class="side-bar">
        <div class="side-bar__avatar">
            <Login>
                <el-avatar :src="avatar" shape="square" class="avatar-content"/>
            </Login>
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
    </div>
</template>

<script>
import Login from './Login';
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    components: {
        Login
    },
    setup() {
        const store = useStore();
        return {
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