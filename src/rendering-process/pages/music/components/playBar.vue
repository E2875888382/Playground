<template>
    <div class="play-sidebar">
        <div class="play-current">
            <el-avatar shape="square" :size="60" src="https://uploadfiles.nowcoder.com/images/20200114/63_1578972234238_58E69059733E46A4DAB01D279927E109?x-oss-process=image/resize,m_mfit,w_100,h_100"></el-avatar>
            <div class="play-current__des">
                <p class="des__title">青花<span class="iconfont icon-1_music89"></span></p>
                <p class="des__author">周传雄</p>
            </div>
        </div>
        <div class="play-controller">
            <div class="play-controller__btns">
                <span class="iconfont icon-suijibofang"></span>
                <span class="iconfont icon-1_music83"></span>
                <span class="iconfont icon-1_music94"></span>
                <span class="iconfont icon-1_music82"></span>
                <span>词</span>
            </div>
            <div class="play-controller__progress">
                <span class="progress__rate">00.03</span>
                <div class="progress__container">
                    <div class="progress__content"></div>
                </div>
                <span class="progress__time">04.23</span>
            </div>
        </div>
        <div class="play-controller_sub">
            <div class="controller__quality">
                <span class="quality__content">标准</span>
            </div>
            <div class="controller__volume">
                <span class="iconfont icon-yinliang"></span>
                <div class="volume__container">
                    <div class="volume__content"></div>
                </div>
            </div>
            <div class="controller__list" @click="togglePlayList">
                <span class="iconfont icon-bofangliebiao"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
.play-current {
    flex-grow: 1;
    .flex-center;
    justify-content: flex-start;
    height: @playSideBarHeight;
    padding-left: 15px;
    &__des {
        height: 60px;
    }
    .des__title,
    .des__author {
        .flex-center;
        justify-content: flex-start;
        margin: 0 0 0 15px;
        line-height: 30px;
        font-size: 18px;
    }
    .iconfont {
        padding-left: 8px;
        font-size: 25px;
        cursor: pointer;
    }
}
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
            position: relative;
            width: 487px;
            height: 3.75px;
            margin: 0 5px;
            background-color: #c2c2c4;
        }
        .progress__content {
            position: absolute;
            top: 0;
            left: 0;
            max-width: 487px;
            width: 10%;
            height: 100%;
            background-color: #ff4e4e;
        }
    }
}
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
    .controller__volume {
        .flex-center;
        justify-content: flex-start;
        width: 132px;
        .volume__container {
            position: relative;
            width: 70px;
            height: 3.75px;
            background-color: #eeeef0;
        }
        .volume__content {
            position: absolute;
            top: 0;
            left: 0;
            width: 10%;
            height: 100%;
            max-width: 80px;
            background-color: #ff4e4e;
        }
        .icon-yinliang {
            padding-right: 7px;
            font-size: 26px;
        }
    }
    .controller__list {
        .flex-center;
        justify-content: flex-start;
        height: 100%;
        width: 52px;
        cursor: pointer;
    }
    .icon-bofangliebiao {
        font-size: 22px;
    }
}
</style>