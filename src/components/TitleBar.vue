<template>
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
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();

        return {
            titleBars: computed(()=> store.state.config.titleBars)
        }
    }
}
</script>

<style lang="less" scoped>
@titleBarHight: 30px;
.title-bar {
    display: flex;
    flex-direction: row-reverse;
    -webkit-app-region: drag;
    width: 100%;
    height: @titleBarHight;
    background-color: transparent;
}
.title-bar__item {
    -webkit-app-region: no-drag;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: @titleBarHight;
    font-size: 15px;
    opacity: 0.6;
    &:hover {
        opacity: 1;
    }
}
</style>