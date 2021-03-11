<template>
    <div class="play-controller">
        <div class="play-controller__btns">
            <span class="iconfont" @click="changeMode" :class="'icon-'+ playModes[playModeIndex]"></span>
            <span class="iconfont icon-1_music83"></span>
            <span class="iconfont icon-1_music94"></span>
            <span class="iconfont icon-1_music82"></span>
            <span class="disable-select">词</span>
        </div>
        <div class="play-controller__progress">
            <span class="progress__rate disable-select">00.03</span>
            <div class="progress__container">
                <el-slider v-model="playPercent" :show-tooltip="false"></el-slider>
            </div>
            <span class="progress__time disable-select">04.23</span>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
export default {
    props: {
        music: Object
    },
    setup(props) {
        const playPercent = ref(20);
        const playModes = ['suijibofang', 'danquxunhuan', 'liebiaoxunhuan', 'shunxubofang'];
        const playModeIndex = ref(0);
        const changeMode = ()=> {
            playModeIndex.value >= 3 ? playModeIndex.value = 0 : playModeIndex.value += 1 ;
        };

        watchEffect(()=> {
            console.log('播放这首歌：', props.music);
        })

        return {
            playPercent,
            playModeIndex,
            changeMode,
            playModes
        }
    }
}
</script>

<style lang="less" scoped>
@playSideBarHeight: 90px;
.play-controller {
    width: 600px;
    height: @playSideBarHeight;
    &__btns {
        .flex-center;
        height: 55px;
        span {
            .flex-center;
            height: 100%;
            width: 60px;
            font-size: 25px;
            cursor: pointer;
            &:nth-of-type(3) {
                width: 85px;
                font-size: 40px;
            }
            &:nth-last-of-type(1) {
                font-size: 18px;
            }
        }
    }
    &__progress {
        .flex-center;
        height: 35px;
        .progress__rate,
        .progress__time {
            font-size: 12px;
            letter-spacing: 1px;
            color: #939395;
        }
        .progress__container {
            width: 487px;
            margin: 0 20px;
        }
        &:deep(.el-slider__button) {
            width: 10px;
            height: 10px;
            border-color: #ff4e4e;
            background-color: #ff4e4e;
        }
        &:deep(.el-slider__bar) {
            background-color: #ff4e4e;
        }
        &:deep(.el-slider__runway) {
            margin: 0;
        }
    }
}
</style>