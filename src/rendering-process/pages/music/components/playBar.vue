<template>
    <div class="play-sidebar">
        <Des />
        <Controller />
        <Volume @togglePlayList="togglePlayList"/>
    </div>
</template>

<script>
import Volume from './playBarVolume';
import Controller from './playBarController';
import Des from './playBarDes';
export default {
    components: {
        Volume,
        Controller,
        Des
    },
    emits: ['togglePlayList'],
    setup(props, context) {
        return {
            togglePlayList: ()=> context.emit('togglePlayList')
        }
    }
}
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