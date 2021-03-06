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
            <PlayList :show="showPlayList" />
        </div>
        <PlayBar @togglePlayList="showPlayList = !showPlayList"/>
    </Layout>
</template>

<script>
import Layout from '../../components/Layout';
import SideBar from './components/sideBar';
import PlayBar from './components/playBar';
import PlayList from './components/playList';
import { ref } from 'vue';
export default {
    components: {
        Layout,
        SideBar,
        PlayBar,
        PlayList
    },
    setup() {
        const showPlayList = ref(false);

        return {
            showPlayList
        }
    }
}
</script>

<style lang="less" scoped>
.music-content {
    position: relative;
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