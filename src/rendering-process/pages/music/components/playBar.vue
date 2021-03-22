<template>
    <div class="play-sidebar">
        <Des :music="currentMusic"/>
        <Controller :music="currentMusic"/>
        <Volume @togglePlayList="togglePlayList"/>
    </div>
</template>

<script lang="ts">
import Volume from './playBarVolume.vue';
import Controller from './playBarController.vue';
import Des from './playBarDes.vue';
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue';
export default defineComponent({
    components: {
        Volume,
        Controller,
        Des
    },
    emits: ['togglePlayList'],
    setup(props, context) {
        const store = useStore();
        const currentMusic = computed(()=> {
            const index = store.state.music.currentMusicIndex;

            return store.state.music.playlist[index];
        });

        return {
            currentMusic,
            togglePlayList: ()=> context.emit('togglePlayList')
        }
    }
})
</script>

<style lang="less" scoped>
@playSideBarHeight: 90px;
.play-sidebar {
    display: flex;
    width: 100%;
    height: @playSideBarHeight;
    box-shadow: 0 -1px 0 #ddd;
    background-color: #f6f6f8;
}
</style>