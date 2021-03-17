<template>
    <div class="app-container">
        <side-bar v-if="!isLyric"/>
        <div class="tabs-container">
            <title-bar v-if="!isLyric"/>
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
import { ElLoading, ElMessage } from 'element-plus';
import { timeFormat, wordFormat, hotFormat, numFormat } from '../assets/js/utils';
import { useStore } from 'vuex';
import { remote } from 'electron';
export default {
    components: {
        'side-bar': SideBar,
        'title-bar': TitleBar
    },
    setup() {
        const { Menu } = remote;
        const router = useRouter();
        const store = useStore();
        const route = useRoute();
        const backgroundImg = computed(()=> store.state.config.backgroundImg);
        const tabsContentStyle = computed(()=> {
            return {
                background: backgroundImg.value,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: `calc(100% - ${route.meta.needSearch ? '78px' : '30px'})`
            }
        });
        // 歌词窗口下将其他公共组件隐藏
        const isLyric = computed(()=> route.name === 'lyric');

        // 全局消息提醒
        provide('message', options=> ElMessage(options));
        // 全局loading
        provide('loading', options=> ElLoading.service(options));
        // 全局api
        provide('api', api);
        // 跳转书籍详情页
        provide('toBooksDetail', (booksId, from='')=> router.push({name: 'booksDetail', params: {booksId, from}}));
        // 获取静态图片资源
        provide('getStaticsImg', src=> `http://statics.zhuishushenqi.com${src}`);
        // 格式化相对日期
        provide('timeFormat', timeFormat);
        // 格式化书籍字数
        provide('wordFormat', wordFormat);
        // 格式化书籍人气
        provide('hotFormat', hotFormat);
        // 通用格式
        provide('numFormat', numFormat);
        // menu
        provide('menu', config=> {
            const menu = Menu.buildFromTemplate(config);

            Menu.setApplicationMenu(menu);
            menu.popup();
        });

        return {
            backgroundImg,
            tabsContentStyle,
            isLyric
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
    background-color: @bgc_common;
}
</style>