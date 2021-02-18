<template>
    <div class="play-sidebar">
        <div class="play-current"></div>
        <div class="play-controller">
            <div class="play-controller__btns">
                <span class="iconfont icon-suijibofang"></span>
                <span class="iconfont icon-1_music83"></span>
                <span class="iconfont icon-1_music94"></span>
                <span class="iconfont icon-1_music82"></span>
                <span>词</span>
            </div>
            <div class="play-controller__progress"></div>
        </div>
        <div class="play-controller_sub"></div>
    </div>
</template>

<script>
export default {

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
    height: @playSideBarHeight;
}
.play-controller {
    width: 630px;
    height: @playSideBarHeight;
    &__btns {
        .flex-center;
        height: 60px;
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
        height: 30px;
    }
}
.play-controller_sub {
    flex-grow: 1;
    height: @playSideBarHeight;
}
</style>