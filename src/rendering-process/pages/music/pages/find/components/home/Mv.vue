<template>
    <div class="mv-container">
        <p class="title"><span>推荐MV</span><i class="el-icon-arrow-right"></i></p>
        <div class="mv-content">
            <transition-group name="mv-list">
                <div class="mv-item" v-for="item in list.slice(0, 4)" :key="item.id">
                    <div class="mv-item__img">
                        <el-image class="mv-item__imgContent" :src="item.picUrl" alt="" fit="fit">
                            <template #placeholder>
                                <div class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </template>
                        </el-image>
                        <span class="mv-item__num">
                            <i class="iconfont icon-bofang"></i>
                            {{format(item.playCount, 100000)}}
                        </span>
                    </div>
                    <p class="mv-item__desc">{{item.name}}</p>
                    <p class="mv-item__author">{{getArtists(item.artists)}}</p>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';
export default {
    props: {
        list: Array
    },
    setup() {
        return {
            format: inject('numFormat'),
            getArtists: arr=> {
                let artists = '';

                arr.forEach((el, index) => {
                    artists += el.name + (index < arr.length - 1 ? '／' : '');
                });
                return artists;
            }
        }
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
.mv-content {
    display: flex;
    flex-wrap: nowrap;
    max-width: 1200px;
    overflow: hidden;
}
.mv-item__img {
    position: relative;
}
.mv-item__imgContent {
    border-radius: 5px;
}
.mv-item__num {
    position: absolute;
    top: 3px;
    right: 8px;
    color: #fff;
    font-size: 15px;
    i {
        padding-right: 3px;
    }
}
.mv-item__desc,
.mv-item__author {
    margin: 10px 0 7px 0;
    .font-overflow;
    -webkit-line-clamp: 1;
}
.mv-item__author {
    margin-top: 7px;
    font-size: 14px;
    color: #0c0c0c;
    font-weight: lighter;
}
.mv-item {
    flex: 1 1 25%;
    margin-right: 20px;
    cursor: pointer;
    &:nth-of-type(3) {
        margin-right: 0;
    }
    &:nth-of-type(4) {
        display: none;
    }
    transition: all .5s ease;
}
@media screen and (min-width: 1400px) {
    .mv-item {
        &:nth-of-type(3) {
            margin-right: 20px;
        }
        &:nth-of-type(4) {
            display: block;
            margin-right: 0;
        }
    }
}
</style>