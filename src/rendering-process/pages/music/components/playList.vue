<template>
    <div class="playlist-drawer" v-if="show">
        <div v-for="(item, index) in playlist" :key="index">
            {{item.name}}
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    props: {
        show: Boolean
    },
    setup() {
        const store = useStore();
        const playlist = computed(()=> store.state.music.playlist);

        return {
            playlist
        }
    }
}
</script>

<style lang="less" scoped>
.playlist-drawer {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 525px;
    background-color: #fff;
    z-index: 6;
}
</style>