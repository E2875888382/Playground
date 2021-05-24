<template>
    <div class="books-detail">
        <nav-bar @back="back(from)"/>
        <div class="books-ifo">
            <img class="books-ifo__cover" :src="getStaticsImg(booksIfo.cover)" alt="" v-if="booksIfo.cover">
            <div class="books-ifo__detail">
                <h3 class="books-ifo__title" v-cloak>{{booksIfo.title}}</h3>
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
            <el-button class="books-ifo__button" @click="addToBookshelf(booksIfo)">加入书架</el-button>
            <el-button class="books-ifo__button" type="danger" @click="booksIfo.allowFree && back(`booksChapters/${booksIfo._id}`)">开始阅读</el-button>
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
            <span class="books-ifo__dir_right" @click="back(`booksChapters/${booksIfo._id}`)">
                {{booksIfo.lastChapter}}
                <i class="el-icon-arrow-right"></i>
            </span>
        </div>
        <el-divider></el-divider>
        <p class="books-ifo__comments__title">
            <span>热门书评</span>
            <span class="title_more" @click="back(`booksComments/${booksIfo._id}`)">更多<i class="el-icon-arrow-right"></i></span>
        </p>
        <div class="books-ifo__comments">
            <comments-list :comments="comments.reviews" />
        </div>
        <p class="books-ifo__recommend__title">
            <span>你可能感兴趣</span>
            <span class="title_more" @click="back(`booksRecommend/${booksIfo._id}`)">更多<i class="el-icon-arrow-right"></i></span>
        </p>
        <div class="books-ifo__recommend" v-if="recommends.books">
            <div class="recommend-item" v-for="item in recommends.books.slice(0, 4)" :key="item._id">
                <img class="recommend-item__cover" :src="getStaticsImg(item.cover)" alt="">
                <p class="recommend-item__title">{{item.title}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, onActivated, ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import navBar from '../components/navBar';
import commentsList from '../components/commentsList';
import { useStore } from 'vuex';
export default {
    components: {
        'nav-bar': navBar,
        'comments-list': commentsList
    },
    setup() {
        const router = useRouter();
        const comments = ref({});
        const booksIfo = ref({});
        const recommends = ref({});
        const route = useRoute();
        const store = useStore();
        const from = ref('');
        const { booksDetail, booksComment, booksRecommend } = inject('api').booksDetail;
        const back = (path)=> path === '-1' ? router.back(-1) : router.push(`/books/${path}`);
        const getBooksDetail = async booksId=> {
            booksIfo.value = await booksDetail(booksId);
            comments.value = await booksComment(booksId);
            recommends.value = await booksRecommend(booksId);
        };
        const getStaticsImg = inject('getStaticsImg');
        const addToBookshelf = booksIfo=> {
            store.commit('user/updateBookshelf', {
                booksId: booksIfo._id,
                cover: getStaticsImg(booksIfo.cover)
            });
        };

        onActivated(()=> {
            from.value = route.params.from;
            getBooksDetail(route.params.booksId);
        })
        onBeforeRouteUpdate((to, from)=> {
            if (to.params.booksId !== from.params.booksId) {
                from.value = to.params.from;
                getBooksDetail(to.params.booksId);
            }
        })
        return {
            booksIfo,
            comments,
            numFormat: inject('wordFormat'),
            wordFormat: inject('hotFormat'),
            timeFormat: inject('timeFormat'),
            back,
            from,
            recommends,
            getStaticsImg,
            addToBookshelf
        }
    }
}
</script>

<style lang="less" scoped>
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
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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
        cursor: pointer;
    }
}
.books-ifo__comments {
    width: 100%;
    margin-bottom: 15px;
}
.books-ifo__recommend__title,
.books-ifo__comments__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title_more {
    font-size: 13px;
    color: #b93321;
    cursor: pointer;
}
.books-ifo__recommend {
    display: flex;
    justify-content: space-evenly;
    padding: 20px 0;
    .recommend-item {
        flex-basis: 25%;
        .flex-center;
        flex-direction: column;
        &__cover {
            width: 110px;
            height: 140px;
            border-radius: 4px;
            border: 1px solid #EBEEF5;
            background-color: #FFF;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }
        &__title {
            font-size: 14px;
        }
    }
}
</style>