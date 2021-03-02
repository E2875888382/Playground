<template>
    <Layout :flex="true" customClass="music-layout">
        <div class="music-content">
            <SideBar />
            <div class="music-page">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </div>
        <PlayBar />
    </Layout>
</template>

<script>
import Layout from '../../components/Layout';
import SideBar from './components/sideBar';
import PlayBar from './components/playBar';
export default {
    components: {
        Layout,
        SideBar,
        PlayBar
    }
}
</script>

<style lang="less" scoped>
.music-content {
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: calc(100% - 90px);
    background-color: #fff;
}
.music-layout {
    flex-wrap: wrap;
}
.music-page {
    height: 100%;
    flex-grow: 1;
    background-color: #fff;
    .customScroll;
}
</style>