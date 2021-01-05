<template>
    <div class="app-container">
        <side-bar />
        <div class="tabs-container">
            <title-bar />
            <router-view />
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
}
.app-container {
    display: flex;
}
.tabs-container {
    flex-grow: 1;
    height: calc(100% - 30px);
}
</style>