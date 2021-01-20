<template>
    <div>
        <div class="comments-item" v-for="comment in comments" :key="comment._id">
            <el-avatar class="comments-item__avatar" :src="getStaticsImg(comment.author.avatar)"></el-avatar>
            <div class="comments-item__ifo">
                <p class="comments-item__nickname">{{comment.author.nickname}}</p>
                <p class="comments-item__title">{{comment.title}}</p>
                <el-rate 
                    v-model="comment.rating" 
                    disabled text-color="#ff9900" 
                    disabled-void-color="#ff9900" 
                    disabled-void-icon-class="el-icon-star-off"
                ></el-rate>
                <p class="comments-item__content">{{comment.content}}</p>
                <p class="comments-item__love">
                    <span>{{timeFormat(comment.updated)}}</span>
                    <span>{{comment.likeCount}}人觉得有用</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'
export default {
    props: {
        comments: Array
    },
    setup() {
        return {
            timeFormat: inject('timeFormat'),
            getStaticsImg: inject('getStaticsImg')
        }
    }
}
</script>

<style lang="less" scoped>
.comments-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 185px;
    margin-bottom: 18px;
    font-size: 12px;
    &:deep(.el-icon-star-off) {
        font-size: 14px;
        line-height: 20px;
    }
    &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 1px;
        background-color: #ebebeb;
    }
    &__nickname {
        margin: 0;
        line-height: 21px;
        font-size: 12px;
        color: #a58d5e;
    }
    &__title {
        font-weight: bold;
    }
    &__avatar {
        margin: 0;
        flex-shrink: 0;
        width: 50px;
        height: 50px;
        margin-right: 15px;
    }
    &__ifo {
        flex-shrink: 1;
        flex-grow: 1;
    }
    &__content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin: 10px 0 0 0;
        overflow: hidden;
        font-size: 14px;
        line-height: 24px;
        color: #999;
    }
    &__love {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 24px;
        color: #999;
    }
}
</style>