<template>
    <div class="app-container">
        <side-bar />
        <div class="tabs-container">
            <title-bar />
            <div class="tabs-content">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar';
import TitleBar from './components/TitleBar';
export default {
    components: {
        'side-bar': SideBar,
        'title-bar': TitleBar
    }
}
</script>

<style lang="less">
#app, .app-container, html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    &::-webkit-scrollbar {
        display: none;
    }
}
.app-container {
    display: flex;
}
.tabs-container {
    flex-grow: 1;
    height: 100%;
    background-color: #f5f5f5;
}
.tabs-content {
    height: calc(100% - 78px);
}
</style>