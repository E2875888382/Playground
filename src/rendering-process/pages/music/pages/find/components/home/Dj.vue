<template>
    <div class="dj-container">
        <p class="title"><span>主播电台</span><i class="el-icon-arrow-right"></i></p>
        <div class="dj-content">
            <transition-group name="dj-list">
                <div class="dj-item" v-for="item in list.slice(0, 6)" :key="item.id">
                    <div class="dj-item__img">
                        <el-image class="dj-item__imgContent" :src="item.picUrl + '?param=200y200'" alt="" fit="fit">
                            <template #placeholder>
                                <div class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </template>
                        </el-image>
                        <p class="dj-item__desc">{{item.name}}</p>
                    </div>
                    <p class="dj-item__rcmdtext">{{item.rcmdtext}}</p>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    },
    setup() {
    }
}
</script>

<style lang="less" scoped>
.title {
    font-size: 25px;
    span {
        font-weight: bolder;
    }
}
.dj-content {
    display: flex;
    flex-wrap: nowrap;
    max-width: 1200px;
    overflow: hidden;
}
.dj-item {
    flex: 1 1 25%;
    margin-right: 20px;
    cursor: pointer;
    &:nth-of-type(5) {
        margin-right: 0;
    }
    &:nth-of-type(6) {
        display: none;
    }
    transition: all .5s ease;
}
.dj-item__img {
    position: relative;
}
.dj-item__imgContent {
    border-radius: 5px;
}
.dj-item__rcmdtext {
    line-height: 25px;
    .font-overflow;
}
.dj-item__desc {
    position: absolute;
    bottom: 0;
    left: 8px;
    color: #fff;
}
@media screen and (min-width: 1400px) {
    .dj-item {
        &:nth-of-type(5) {
            margin-right: 20px;
        }
        &:nth-of-type(6) {
            display: block;
            margin-right: 0;
        }
    }
}
</style>