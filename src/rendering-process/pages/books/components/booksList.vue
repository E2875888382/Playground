<template>
    <div class="books-list__container">
        <div class="books-list__item" v-for="item in list" :key="item._id" @click="toBooksDetail(item._id, from)">
            <el-image class="item__cover" :src="getStaticsImg(item.cover)" alt="" lazy/>
            <div class="item__ifo">
                <h4 class="item__title">{{item.title}}</h4>
                <p class="item__author">{{item.author}}</p>
                <p class="item__desc">{{item.shortIntro}}</p>
                <p class="item__popularity">
                    <span class="popularity__num">{{item.latelyFollower}}</span><span>人气</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="popularity__num">{{item.retentionRatio}}%</span><span>读者留存</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'
export default {
    props: {
        list: Array,
        from: String
    },
    setup() {
        return {
            toBooksDetail: inject('toBooksDetail'),
            getStaticsImg: inject('getStaticsImg')
        }
    }
}
</script>

<style lang="less" scoped>
.books-list__item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 122px;
    margin-bottom: 20px;
    cursor: pointer;
}
.item__cover {
    flex-shrink: 0;
    width: 90px;
    height: 120px;
    border: 1px solid #ebebeb;
    box-shadow: 2px 4px 6px #bbb;
}
.item__ifo {
    flex-grow: 1;
    height: 122px;
    padding: 0 10px;
}
.item__title {
    margin: 0;
    font-size: 14px;
    line-height: 25px;
}
.item__author {
    margin: 0;
    font-size: 12px;
    line-height: 22px;
}
.item__desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px;
    margin: 3px 0;
    overflow: hidden;
    color: #999;
    text-overflow: ellipsis;
    font-size: 13px;
    line-height: 20px;
}
.item__popularity {
    height: 20px;
    color: #999;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;
    .popularity__num {
        margin-right: 3px;
        color: #d82626;
    }
}
</style>