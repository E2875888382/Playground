<template>
    <div class="app-container">
        <side-bar />
        <div class="tabs-container">
            <title-bar />
            <div class="tabs-content" :style="tabsContentStyle">
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
import SideBar from '../components/SideBar';
import TitleBar from '../components/TitleBar';
import api from '../api/manager';
import { useRoute, useRouter } from 'vue-router';
import { computed, provide } from 'vue';
import { ElLoading, ElMessage  } from 'element-plus';
import { timeFormat } from '../assets/js/utils';
import { useStore } from 'vuex';
export default {
    components: {
        'side-bar': SideBar,
        'title-bar': TitleBar
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const route = useRoute();
        const backgroundImg = computed(()=> store.state.config.backgroundImg);
        const tabsContentStyle = computed(()=> {
            return {
                background: backgroundImg.value,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: `calc(100% - ${['webview','preview'].includes(route.name) ? '30px' : '78px'})`
            }
        })

        provide('message', options=> ElMessage(options));
        provide('loading', options=> ElLoading.service(options));
        provide('api', api);
        provide('toBooksDetail', (booksId, from='')=> router.push({name: 'booksDetail', params: {booksId, from}}));
        provide('getStaticsImg', src=> `http://statics.zhuishushenqi.com${src}`);
        provide('timeFormat', timeFormat);
        return {
            backgroundImg,
            tabsContentStyle
        }
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
</style>