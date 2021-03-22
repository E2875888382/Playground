<template>
    <div class="play-controller_sub">
        <div class="controller__quality">
            <span class="quality__content disable-select">标准</span>
        </div>
        <div class="controller__volume">
            <span class="iconfont" :class="[volume ? 'icon-shengyin' : 'icon-jingyin']"></span>
            <div class="volume__inner">
                <el-slider v-model="volume" :show-tooltip="false"></el-slider>
            </div>
        </div>
        <div class="controller__list" @click="togglePlayList">
            <span class="iconfont icon-bofangduilie"></span>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent } from 'vue'
import { useStore } from 'vuex';
export default defineComponent({
    emits: ['togglePlayList'],
    setup(props, context) {
        const volume = ref(20);
        const store = useStore();

        watch(volume, (newVal, oldVal)=> {
            if (newVal !== oldVal) {
                store.commit('music/updateVolume', newVal);
            }
        });

        return {
            volume,
            togglePlayList: ()=> context.emit('togglePlayList')
        }
    }
})
</script>

<style lang="less" scoped>
@playSideBarHeight: 90px;
.play-controller_sub {
    flex-grow: 1;
    .flex-center;
    justify-content: flex-end;
    height: @playSideBarHeight;
    .controller__quality {
        .flex-center;
        width: 80px;
        height: 100%;
        .quality__content {
            width: 40px;
            height: 20px;
            border: 1px solid #313132;
            border-radius: 4px;
            font-size: 15px;
            text-align: center;
            line-height: 19px;
        }
    }
    .controller__list {
        .flex-center;
        justify-content: flex-start;
        height: 100%;
        width: 52px;
        cursor: pointer;
    }
    .icon-bofangduilie {
        font-size: 22px;
    }
}
.controller__volume {
    .flex-center;
    justify-content: flex-start;
    width: 132px;
    .icon-shengyin {
        font-size: 25px;
    }
    .icon-jingyin {
        font-size: 26px;
    }
    .volume__inner {
        margin-left: 6px;
        width: 75px;
    }
    &:deep(.el-slider__button) {
        width: 8px;
        height: 8px;
        border-color: #ff4e4e;
        background-color: #ff4e4e;
    }
    &:deep(.el-slider__button-wrapper) {
        top: -15.5px;
    }
    &:deep(.el-slider__runway) {
        height: 3.75px;
    }
    &:deep(.el-slider__bar) {
        height: 3.75px;
        background-color: #ff4e4e;
    }
}
</style>