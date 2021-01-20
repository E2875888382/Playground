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
import api from './api/manager';
import { useRouter } from 'vue-router';
import { provide } from 'vue';
import { ElLoading } from 'element-plus';
import { timeFormat } from './assets/js/utils';
export default {
    components: {
        'side-bar': SideBar,
        'title-bar': TitleBar
    },
    setup() {
        const router = useRouter();

        provide('loading', options=> ElLoading.service(options));
        provide('api', api);
        provide('toBooksDetail', (booksId, from='')=> router.push({name: 'booksDetail', params: {booksId, from}}));
        provide('getStaticsImg', src=> `http://statics.zhuishushenqi.com${src}`);
        provide('timeFormat', timeFormat);
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