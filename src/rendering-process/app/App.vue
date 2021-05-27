<template>
    <div class="app-container">
        <SideBar v-if="!isLyric"/>
        <div class="tabs-container">
            <TitleBar v-if="!isLyric"/>
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
import SideBar from 'commonComponents/SideBar';
import TitleBar from 'commonComponents/TitleBar';
import { useRoute } from 'vue-router';
import { computed, provide } from 'vue';
import { useStore } from 'vuex';
import provides from './provide';
export default {
    components: {
        SideBar,
        TitleBar,
    },
    setup() {
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

        for (const key in provides) {
            provide(key, provides[key]);
        }
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