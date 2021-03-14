<template>
    <div class="play-controller">
        <div class="play-controller__btns">
            <span class="iconfont" @click="changeMode" :class="'icon-'+ playModes[playModeIndex]"></span>
            <span class="iconfont icon-1_music83"></span>
            <span class="iconfont playIcon" :class="[ pause ? 'icon-1_music94' : 'icon-bofangzhong' ]" @click="handlePause"></span>
            <span class="iconfont icon-1_music82"></span>
            <span class="disable-select">词</span>
        </div>
        <div class="play-controller__progress">
            <span class="progress__rate disable-select">{{getTime(playSecond*1000)}}</span>
            <div class="progress__container">
                <el-slider 
                    v-model="playPercent" 
                    :show-tooltip="false"
                    @change="handleSliderChange"
                ></el-slider>
            </div>
            <span class="progress__time disable-select">{{getTime(music.dt)}}</span>
        </div>
        <audio 
            ref="musicAudio"
            :volume="volume"
            @ended="handleEnded"
            @timeupdate="handleUpdateTime"
        />
    </div>
</template>

<script>
import { computed, inject, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
export default {
    props: {
        music: {
            type: Object,
            default: ()=> {
                return {
                    dt: 0
                }
            }
        }
    },
    setup(props) {
        const playSecond = ref(0);
        const pause = ref(true);
        const store = useStore();
        const volume = computed(()=> +store.state.music.volume / 100);
        const { getSongUrl } = inject('api').music.find;
        const musicAudio = ref(null);
        const playPercent = ref(0);
        const playModes = ['suijibofang', 'danquxunhuan', 'liebiaoxunhuan', 'shunxubofang'];
        const playModeIndex = ref(0);
        const changeMode = ()=> {
            playModeIndex.value >= 3 ? playModeIndex.value = 0 : playModeIndex.value += 1 ;
        };
        const handlePause = ()=> {
            if (musicAudio.value.paused) {
                musicAudio.value.play();
                pause.value = false;
                return;
            }
            musicAudio.value.pause();
            pause.value = true;
        };
        const handleEnded = ()=> {
            musicAudio.value.pause();
            pause.value = true;
        };
        const handleUpdateTime = e=> {
            const current = e.target.currentTime;
            const total = props.music.dt / 1000;

            playSecond.value = current;
            playPercent.value = (current / total) * 100;
        };
        const zero = n=> n < 10 ? '0' + n : n;
        const getTime = dt=> {
            const source = Math.floor(dt / 1000);
            const m = Math.floor(source / 60);
            const s = source % 60;

            return `${zero(m)}:${zero(s)}`;
        };
        const handleSliderChange = percent=> {
            const seekSecond = props.music.dt * percent / (100 * 1000);

            musicAudio.value.currentTime = seekSecond;
            playSecond.value = seekSecond;
            playPercent.value = percent;
        };

        watchEffect(async ()=> {
            if (props.music && props.music.id && musicAudio.value) {
                const src = await getSongUrl(props.music.id);

                musicAudio.value.src = (src.data[0] && src.data[0].url) || '';
                musicAudio.value.play();
                pause.value = false;
            }
        })

        return {
            playSecond,
            pause,
            volume,
            musicAudio,
            playPercent,
            playModeIndex,
            changeMode,
            playModes,
            handlePause,
            handleEnded,
            handleUpdateTime,
            getTime,
            handleSliderChange
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
            &:nth-last-of-type(1) {
                font-size: 18px;
            }
        }
        .playIcon {
            width: 85px;
            font-size: 40px;
        }
        .playIcon.icon-bofangzhong {
            font-size: 37px;
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