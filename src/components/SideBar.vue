<template>
    <div class="side-bar">
        <div class="side-bar__avatar">
            <el-avatar :src="avatar" shape="square"/>
        </div>
        <div class="side-bar__tabs">
            <router-link
                exact 
                :to="tab.path" 
                v-for="(tab, index) in tabs"
                :key="index"
                :class="[`el-icon-${tab.icon}`, 'tabs__item']"
            >
            </router-link>
        </div>
        <div class="side-bar__options">
            <i class="el-icon-setting options__item"></i>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
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
.flex-box-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.side-bar {
    -webkit-app-region: drag;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    height: 100%;
    background-color: #26292d;
}
.side-bar__avatar {
    -webkit-app-region: no-drag;
    .flex-box-center();
    width: 80px;
    height: 80px;
}
.side-bar__tabs {
    flex-grow: 1;
    width: 80px;
    .tabs__item {
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
    }
    .router-link-active, .active-tab{
        opacity: 0.6;
        color: #1ae61a;
    }
}
.side-bar__options {
    width: 80px;
    .options__item {
        -webkit-app-region: no-drag;
        width: @tabs-item-size;
        height: @tabs-item-size;
        padding: 20px 25px;
        font-size: @tabs-item-size;
        color: #FFF;
        opacity: 0.3;
        &:hover {
            opacity: 0.5;
        }
    }
}
</style>