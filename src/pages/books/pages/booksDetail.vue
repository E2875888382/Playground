<template>
    <div class="books-detail">
        <div class="books-detail__nav">
            <i class="el-icon-back" @click="back(from)"></i>
            <i class="el-icon-s-home" @click="back('index')"></i>
        </div>
        <div class="books-ifo">
            <img class="books-ifo__cover" :src="`http://statics.zhuishushenqi.com${booksIfo.cover}`" alt="" v-if="booksIfo.cover">
            <div class="books-ifo__detail">
                <h3 class="books-ifo__title">{{booksIfo.title}}</h3>
                <p class="books-ifo__author">
                    <span>{{booksIfo.author}}</span>
                    <el-divider direction="vertical"></el-divider>
                    {{booksIfo.cat}}
                    <el-divider direction="vertical"></el-divider>
                    {{numFormat(booksIfo.wordCount)}}字
                </p>
                <p class="books-ifo__finished">{{booksIfo._gg ? '完结' : `${timeFormat(booksIfo.updated)}更新`}}</p>
            </div>
        </div>
        <div class="books-ifo__buttons">
            <el-button class="books-ifo__button">加入书架</el-button>
            <el-button class="books-ifo__button" type="danger">开始阅读</el-button>
        </div>
        <p class="books-ifo__vip" v-if="!booksIfo.allowFree">开通vip，免费阅读此书</p>
        <el-divider></el-divider>
        <div class="books-ifo__numbers">
            <div class="books-ifo__number">
                <p class="books-ifo__number_top">追人气</p>
                <p class="books-ifo__number_bottom">{{wordFormat(booksIfo.latelyFollower)}}</p>
            </div>
            <div class="books-ifo__number">
                <p class="books-ifo__number_top">读者留存率</p>
                <p class="books-ifo__number_bottom">{{booksIfo.retentionRatio}}%</p>
            </div>
            <div class="books-ifo__number">
                <p class="books-ifo__number_top">日更字数/天</p>
                <p class="books-ifo__number_bottom">{{booksIfo.serializeWordCount}}</p>
            </div>
        </div>
        <el-divider></el-divider>
        <p class="books-ifo__longIntro">{{booksIfo.longIntro}}</p>
        <el-divider></el-divider>
        <div class="books-ifo__dir">
            <span class="books-ifo__dir_left">目录</span>
            <span class="books-ifo__dir_right">
                {{booksIfo.lastChapter}}
                <i class="el-icon-arrow-right"></i>
            </span>
        </div>
        <el-divider></el-divider>
        <div class="books-ifo__comments">
            <p>热门书评</p>
            <div class="comments-item" v-for="comment in comments.reviews" :key="comment._id">
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
        </div>
    </div>
</template>

<script>
import { inject, onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter();
        const comments = ref({});
        const booksIfo = ref({});
        const route = useRoute();
        const from = ref('');
        const { booksDetail, booksComment } = inject('api').booksDetail;
        const back = (path)=> router.push(`/books/${path}`);
        const getBooksDetail = async booksId=> {
            booksIfo.value = await booksDetail(booksId);
            comments.value = await booksComment(booksId);
            console.log('书籍信息:', booksIfo.value);
            console.log('5条短评:', comments.value);
        };
        const numFormat = num=> num > 9999 ? `${Math.round(Math.floor(num/1000)/10)}万` : num;
        const wordFormat = num=> num > 9999 ? `${Math.round(174920/1000)/10}万` : num;
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

        onActivated(()=> {
            from.value = route.params.from;
            getBooksDetail(route.params.booksId);
        })
        return {
            booksIfo,
            comments,
            numFormat,
            wordFormat,
            timeFormat,
            back,
            from
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
.books-detail__nav {
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
.books-detail {
    width: 100%;
}
.books-ifo {
    display: flex;
    height: 140px;
    padding: 28px;
}
.books-ifo__cover {
    width: 110px;
    height: 140px;
    margin-right: 30px;
}
.books-ifo__detail {
    .books-ifo__title {
        margin: 0 0 10px 0;
        font-size: 18px;
        line-height: 20px;
    }
    .books-ifo__author {
        margin: 0 0 10px 0;
        font-size: 16px;
        line-height: 32px;
        span {
            color: #b93321;
        }
    }
    .books-ifo__finished {
        margin: 0 0 10px 0;
        font-size: 16px;
        line-height: 32px;
    }
}
.books-ifo__buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100px;
}
.books-ifo__button {
    flex: 0 1 40%;
    height: 60px;
}
.books-ifo__vip {
    text-align: center;
    color: #ff9a57;
}
.books-ifo__numbers {
    display: flex;
    justify-content: space-evenly;
    height: 60px;
    .books-ifo__number {
        flex: 0 1 30%;
        height: 60px;
        text-align: center;
        line-height: 30px;
        &_top {
            margin: 0;
            color: #999;
            font-size: 14px;
        }
        &_bottom {
            margin: 0;
            font-size: 16px;
        }
    }
}
.books-ifo__longIntro {
    padding: 0 10px;
    line-height: 24px;
    font-size: 14px;
}
.books-ifo__dir {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    &_left {
        font-size: 14px;
    }
    &_right {
        font-size: 13px;
        color: #999;
    }
}
.books-ifo__comments {
    width: 100%;
    padding: 0 10px;
    margin-bottom: 40px;
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
</style>