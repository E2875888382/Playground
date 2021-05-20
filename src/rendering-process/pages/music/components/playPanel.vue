<template>
    <transition name="playPanel">
        <div class="playPanel-container" v-if="state.show">
            <div class="playPanel__content">
                <section class="des-box">
                    <div class="des__avatar" :class="[state.pause? 'des__avatar_pause':'des__avatar_play']">
                        <el-avatar 
                            :size="270" 
                            :src="state.currentMusic.al ? state.currentMusic.al.picUrl + '?param=270y270' : staticPic"
                        ></el-avatar>
                    </div>
                    <div class="des__content">
                        <h1 class="music__name">{{state.currentMusic.name}}</h1>
                        <p>
                            <span class="music__des">专辑：{{state.currentMusic.al.name}}</span>
                            <span class="music__des">歌手：{{getAuthors(state.currentMusic.ar)}}</span>
                        </p>
                        <div class="lyric-box__wrapper">
                            <div class="lyric-box" ref="lyricBox">
                                <p 
                                    class="lyric-line" 
                                    :class="{'lyric-line_active' : currentIndex === index}" 
                                    v-for="(lyricLine, index) in state.AllLyric" :key="index"
                                >{{lyricLine}}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="comments-box"></section>
            </div>
        </div>
    </transition>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const lyricBox = ref(null);
        const store = useStore();
        const state = reactive({
            show: computed(()=> store.state.music.fullSreen),
            pause: computed(()=> store.state.music.pause),
            AllLyric: computed(()=> store.state.music.allLyric.replace(/\[.*?\]/g, '').split('\n')),
            currentMusic: computed(()=> {
                const index = store.state.music.currentMusicIndex;

                return store.state.music.playlist[index];
            })
        });
        const currentIndex = computed(()=> store.state.music.lyricIndex);

        watch(currentIndex, (newVal)=> {
            lyricBox.value && (lyricBox.value.scrollTop = 32 * (newVal - 1));
        })
        return {
            state,
            lyricBox,
            currentIndex,
            staticPic: require('commonImgs/defaultMusic.jpg'),
            getAuthors: arr=> arr.map(item=> item.name).join('/')
        }
    }
}
</script>

<style lang="less" scoped>
.playPanel-container {
    .customScroll;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
    background: #fff;
    transform-origin: left bottom;
    animation: panelShow .2s linear 0s ;
}
.playPanel-enter-active,
.playPanel-leave-active {
    transition: all .2s ease-out;
}
.playPanel-enter-form,
.playPanel-leave-to {
    opacity: 0;
    transform: scale(0.16, 0.08);
}
.playPanel__content {
    width: 1200px;
    margin: 0 auto;
}
.des-box {
    display: flex;
    justify-content: space-between;
}
.des__avatar {
    position: relative;
    .flex-center;
    width: 400px;
    height: 400px;
    margin: 80px 0 20px 60px;
    border-radius: 50%;
    background: url('../../../assets/img/record.png') no-repeat;
    background-size: cover;
    border: 8px solid #e4e7ed;
    .el-avatar {
        box-shadow: 0 0 0 8px rgba(0, 0, 0, .9);
        animation: rotateRecord 20s linear 0s infinite;
    }
    &::before {
        position: absolute;
        top: -91px;
        left: 50%;
        content: '';
        width: 154px;
        height: 180px;
        margin-left: -22px;
        filter: drop-shadow(0 4px 2px rgba(0, 0, 0, .5));
        background: url('../../../assets/img/record_dec.png') no-repeat;
        background-size: cover;
        z-index: 1;
        transform-origin: 10px 0;
        transform: rotate(-5deg);
        transition: all .4s ease-out;
    }
    &_play {
        .el-avatar {
            animation-play-state: running;
        }
    }
    &_pause {
        .el-avatar {
            animation-play-state: paused;
        }
        &::before {
            transform: rotate(-34deg);
        }
    }
}
.des__content {
    width: 585px;
    height: 620px;
}
.music__name {
    margin: 34px 0 20px 0;
    font-size: 30px;
    font-weight: 500;
}
.music__des {
    margin-right: 98px;
    color: #999;
    font-size: 16px;
}
.lyric-box__wrapper {
    position: relative;
    &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-image: linear-gradient(#ffffff5e, #ffffff);
    }
    &::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-image: linear-gradient(#ffffff, #ffffff5e);
    }
}
.lyric-box {
    .customScroll;
    height: 445px;
}
.lyric-line {
    color: #606266c4;
    font-size: 18px;
    &_active {
        font-size: 20px;
        font-weight: bold;
        color: #333;
    }
}
</style>

<style lang="less">
@keyframes rotateRecord {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes panelShow {
    0% {
        opacity: 0;
        transform: scale(0.16, 0.08);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>