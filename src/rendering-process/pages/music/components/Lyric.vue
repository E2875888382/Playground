<template>
    <div class="lyric-container">
        <p class="lyric-content">{{lyricLine}}</p>
    </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const lyricLine = computed(()=> store.state.music.lyricLine);

        watch(lyricLine, (newVal, oldVal)=> {
            console.log(newVal, oldVal);
        })
        return {
            lyricLine
        }
    }
}
</script>

<style lang="less">
.app-container,
.tabs-container,
.tabs-content,
.lyric-content
{
    background: transparent !important;
    background-color: transparent;
}
</style>
<style lang="less" scoped>
@primary-color: #c62f2f;
.lyric-content {
    height: 75px;
    margin: 0;
    font-size: 40px;
    color: #fff;
    text-shadow: 1px 1px 5px @primary-color, 1px -1px 3px @primary-color;
    text-align: center;
    font-family: "Microsoft JhengHei", "明黑", Arial, Helvetica;
    line-height: 75px;
    white-space: nowrap;
    -webkit-app-region: drag;
}
</style>