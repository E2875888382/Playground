<template>
    <div class="books-comments">
        <div class="books-comments__nav">
            <i class="el-icon-back" @click="back"></i>
            <i class="el-icon-s-home" @click="back('index')"></i>
        </div>
        <div class="books-comments__content" v-infinite-scroll="getComments">
            <div class="comments-item" v-for="comment in comments" :key="comment._id">
                <el-avatar class="comments-item__avatar" :src="`http://statics.zhuishushenqi.com${comment.author.avatar}`"></el-avatar>
                <div class="comments-item__ifo">
                    <p class="comments-item__nickname">{{comment.author.nickname}}</p>
                    <p class="comments-item__title">{{comment.title}}</p>
                    <el-rate v-model="comment.rating" disabled text-color="#ff9900" disabled-void-color="#ff9900" disabled-void-icon-class="el-icon-star-off"></el-rate>
                    <p class="comments-item__content">{{comment.content}}</p>
                    <p class="comments-item__love">
                        <span>{{timeFormat(comment.updated)}}</span>
                        <span>{{comment.likeCount}}人觉得有用</span>
                    </p>
                </div>
            </div>
            <p v-if="loadEnd" class="books-comments__loadEnd">没有更多了</p>
        </div>
         <el-backtop target=".books-comments__content"></el-backtop>
    </div>
</template>

<script>
import { inject, onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const comments = ref([]);
        const page = ref(0);
        const loadEnd = ref(false);
        const {booksComment} = inject('api').booksDetail;
        const back = path=> path.length > 0 ? router.push(`/books/${path}`) : router.back(-1);
        const timeFormat = time=> {
            const timeNum = (Date.now() - (+new Date(time))) / 1000;
            const timeList = [
                { diff: 60 * 60 * 24 * 30 * 12, str: '年前'},
                { diff: 60 * 60 * 24 * 30, str: '月前' },
                { diff: 60 * 60 * 24, str: '天前' },
                { diff: 60 * 60, str: '小时前' },
                { diff: 60, str: '分钟前' },
                { diff: 0, str: '刚刚' }
            ];

            for (const {diff, str} of timeList) {
                if (timeNum > diff) {
                    return (diff === 0 ? '' : Math.floor(timeNum / diff)) + str;
                }
            }
        };
        const getComments = async ()=> {
            if (loadEnd.value === true) {
                console.log('全部加载完了');
                return ;
            }
            const res  = await booksComment(route.params.booksId, page.value, 20);

            page.value++;
            if (res.total && comments.value.length >= res.total) loadEnd.value = true;
            comments.value = [...comments.value, ...(res?.reviews || [])];
            console.log('全部评论：', comments.value);
            console.log('当前分页:', page.value);
        };

        onActivated(async ()=> {
            page.value = 0;
            loadEnd.value = false;
            getComments();
        })
        return {
            back,
            timeFormat,
            comments,
            getComments,
            page,
            loadEnd
        }
    }
}
</script>

<style lang="less" scoped>
.el-icon-back,
.el-icon-s-home {
    flex-basis: 40px;
    text-align: center;
    line-height: 50px;
    color: #bbb;
    cursor: pointer;
}
.books-comments__nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #DCDFE6;
    }
}
.books-comments {
    width: 100%;
    height: 100%;
}
.books-comments__content {
    width: 100%;
    height: calc(100% - 90px);
    padding: 20px 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    .comments-item {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 185px;
        margin-bottom: 18px;
        font-size: 12px;
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
    &:deep(.el-icon-star-off) {
        font-size: 14px;
        line-height: 20px;
    }
}
.books-comments__loadEnd {
    margin: 0;
    text-align: center;
    color: #999;
    font-size: 14px;
}
</style>