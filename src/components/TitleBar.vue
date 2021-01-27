<template>
    <div class="title-bar-container" :style="containerHeight">
        <Search v-show="showSearch"/>
        <div class="title-bar">
            <div 
                class="title-bar__item"
                v-for="(titleBar, index) in titleBars"
                :key="index"
                @click="titleBar.event"
            >
                <i :class="[`el-icon-${titleBar.icon}`]"/>
            </div>
        </div>
    </div>
</template>

<script>
import Search from './Search';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
    components: {
        Search
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const showSearch = computed(()=> {
            return !['webview', 'preview'].includes(route.name);
        });
        const containerHeight = computed(()=> {
            return showSearch.value ? {height: '78px'} : {}
        });

        return {
            showSearch,
            containerHeight,
            titleBars: computed(()=> store.state.config.titleBars)
        }
    }
}
</script>

<style lang="less" scoped>
.title-bar-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    -webkit-app-region: drag;
    width: 100%;
    background-color: transparent;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #e7e7e7;
    }
}
.title-bar {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    height: 30px;
    width: 200px;
}
.title-bar__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
    font-size: 15px;
    opacity: 0.6;
    &:hover {
        opacity: 1;
    }
    -webkit-app-region: no-drag;
}
</style>