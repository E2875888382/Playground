<template>
    <div class="play-controller">
        <div class="play-controller__btns">
            <span class="iconfont" @click="changeMode" :class="'icon-'+ playModes[playModeIndex]"></span>
            <span class="iconfont icon-1_music83"></span>
            <span 
                class="iconfont playIcon" 
                :class="[ pause ? 'icon-1_music94' : 'icon-bofangzhong' ]" 
                @click="handlePause"
            ></span>
            <span class="iconfont icon-1_music82"></span>
            <span class="disable-select" :class="{'lyric_active':showLyric}" @click="toggleLyric">词</span>
        </div>
        <div class="play-controller__progress">
            <span class="progress__rate disable-select">{{getTime(playSecond*1000)}}</span>
            <div class="progress__container">
                <el-slider 
                    v-model="playPercent" 
                    :show-tooltip="false"
                    @change="handleSliderChange"
                ></el-slider>
                <div class="progress__buffer" :style="{width: bufferedPercent + '%'}"></div>
            </div>
            <span class="progress__time disable-select">{{getTime(music.dt)}}</span>
        </div>
        <audio 
            ref="musicAudio"
            :volume="volume"
            @ended="handleEnded"
            @timeupdate="handleUpdateTime"
            preload="auto"
        />
    </div>
</template>

<script>
import { computed, inject, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { ipcRenderer } from 'electron';
import Lyric from '../../../assets/js/Lyric';
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
        const store = useStore();
        // 歌词 object
        const lyricObj = ref({});
        // 展示歌词
        const showLyric = ref(false);
        // 歌词
        const lyric = ref({});
        // 播放时间 (s)
        const playSecond = ref(0);
        // 是否暂停
        const pause = computed(()=> store.state.music.pause);
        // 音量
        const volume = computed(()=> +store.state.music.volume / 100);
        const { getSongUrl, getSongLyric } = inject('api').music.find;
        // audio ref
        const musicAudio = ref(null);
        // 播放百分比
        const playPercent = ref(0);
        // 缓冲百分比
        const bufferedPercent = ref(0);
        // 播放模式
        const playModes = ['suijibofang', 'danquxunhuan', 'liebiaoxunhuan', 'shunxubofang'];
        // 播放模式 index
        const playModeIndex = ref(0);
        // 更换播放模式
        const changeMode = ()=> {
            playModeIndex.value >= 3 ? playModeIndex.value = 0 : playModeIndex.value += 1 ;
        };
        // 暂停播放
        const handlePause = ()=> {
            if (musicAudio.value.paused) {
                musicAudio.value.play();
                store.commit('music/updatePause', false);
                // 由暂停状态重新播放，同步歌词位置
                lyricObj.value.seek && lyricObj.value.seek(playSecond.value * 1000);
                return;
            }
            musicAudio.value.pause();
            store.commit('music/updatePause', true);
            // 暂停，定住歌词
            lyricObj.value.stop && lyricObj.value.stop();
        };
        // 播放完毕
        const handleEnded = ()=> {
            musicAudio.value.pause();
            store.commit('music/updatePause', true);
            // 播放完毕，定住歌词
            lyricObj.value.stop && lyricObj.value.stop();
        };
        // 更新播放信息
        const handleUpdateTime = e=> {
            const current = e.target.currentTime;
            const total = props.music.dt / 1000;
            const timeRanges = musicAudio.value.buffered;
            // 已缓冲的时间（s）
            const buffered = timeRanges.length > 0 ? timeRanges.end(timeRanges.length - 1) : 0;

            // 缓冲百分比
            bufferedPercent.value = (buffered / total) * 100;
            // 当前播放时间（s）
            playSecond.value = current;
            // 当前播放百分比
            playPercent.value = (current / total) * 100;
        };
        // 进度条滑动
        const handleSliderChange = percent=> {
            const seekSecond = props.music.dt * percent / (100 * 1000);

            musicAudio.value.currentTime = seekSecond;
            playSecond.value = seekSecond;
            playPercent.value = percent;
            // 快进歌词到相应位置
            lyricObj.value.seek && lyricObj.value.seek(playSecond.value * 1000);
            if (pause.value && lyricObj.value.stop) {
                // 暂停情况下定住歌词
                lyricObj.value.stop();
            }
        };
        const toggleLyric = ()=> {
            showLyric.value = !showLyric.value;
            ipcRenderer.send(showLyric.value ? 'openLyric' : 'closeLyric');
        };

        watchEffect(async ()=> {
            if (props.music && props.music.id && musicAudio.value) {
                const src = await getSongUrl(props.music.id);
                const lyricRes = await getSongLyric(props.music.id);

                // 设置下方的小标题
                document.title = props.music.name + ' - ' + props.music.ar.map(item=> item.name).join('/');
                // 获取歌词
                let lyric = '';

                if (lyricRes.nolyric) {
                    lyric = '[00:00.000] 暂无歌词';
                } else {
                    lyric = (lyricRes.lrc && lyricRes.lrc.lyric) || '[00:00.000] 纯音乐';
                }
                // 加载音乐资源
                musicAudio.value.src = (src.data[0] && src.data[0].url) || '';
                store.commit('music/updatePause', false);
                store.commit('music/updateAllLyric', lyric);

                // 重置歌词对象
                lyricObj.value.stop && lyricObj.value.stop();
                lyricObj.value = new Lyric(lyric, ({txt, lineNum})=> {
                    store.commit('music/updateLyric', txt);
                    store.commit('music/updateLyricIndex', lineNum);
                });
                // 开始滚动歌词
                lyricObj.value.play();
                // 歌词进度置为0
                lyricObj.value.seek(0);
                // 开始播放audio
                musicAudio.value.play();
            }
        })

        return {
            showLyric,
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
            getTime: inject('msFormat'),
            handleSliderChange,
            lyric,
            bufferedPercent,
            toggleLyric
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
            position: relative;
            width: 487px;
            margin: 0 20px;
        }
        .progress__buffer {
            position: absolute;
            top: 0;
            height: 6px;
            border-radius: 4px;
            background-color: #90939978;
        }
        &:deep(.el-slider__button) {
            width: 10px;
            height: 10px;
            border-color: #ff4e4e;
            background-color: #ff4e4e;
        }
        &:deep(.el-slider__bar) {
            background-color: #ff4e4e;
            z-index: 1;
        }
        &:deep(.el-slider__runway) {
            margin: 0;
        }
    }
}
.lyric_active {
    color: #ff4e4e;
}
</style>