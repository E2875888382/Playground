<template>
    <div class="play-current">
        <el-avatar shape="square" :size="60" src="https://uploadfiles.nowcoder.com/images/20200114/63_1578972234238_58E69059733E46A4DAB01D279927E109?x-oss-process=image/resize,m_mfit,w_100,h_100"></el-avatar>
        <div class="play-current__des">
            <p class="des__title">青花<span class="iconfont icon-1_music89"></span></p>
            <p class="des__author">周传雄</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@playSideBarHeight: 90px;
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
</style>