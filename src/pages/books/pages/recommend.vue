<template>
    <div class="books-recommend">
        <div class="books-recommend__nav">
            <i class="el-icon-back" @click="back"></i>
            <i class="el-icon-s-home" @click="back('index')"></i>
        </div>
        <div v-if="recommends.books" class="books-recommends__content">
            <div 
                class="books-recommends__item" 
                v-for="el in recommends.books" :key="el._id" 
                @click="toBooksDetail(el._id, '-1')"
            >
                <a href="" class="item-cover">
                    <img :src="`http://statics.zhuishushenqi.com${el.cover}`" alt="">
                </a>
                <div class="item-ifo">
                    <h4 class="item__title">{{el.title}}</h4>
                    <p class="item__author">{{el.author}}</p>
                    <p class="item__desc">{{el.shortIntro}}</p>
                    <p class="item__popularity">
                        <span class="popularity__num">{{el.latelyFollower}}</span><span>人气</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="popularity__num">{{el.retentionRatio}}%</span><span>读者留存</span>
                    </p>
                </div>
            </div>
        </div>
        <el-empty description=" " v-else></el-empty>
    </div>
</template>

<script>
import { inject, onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const booksId = ref('');
        const recommends = ref({});
        const { booksRecommend } = inject('api').booksDetail;
        const back = path=> path.length > 0 ? router.push(`/books/${path}`) : router.back(-1);

        onActivated(async ()=> {
            booksId.value = route.params.booksId;
            recommends.value = await booksRecommend(booksId.value);
            console.log('同类书籍推荐', recommends.value);
        })
        return {
            back,
            booksId,
            recommends,
            toBooksDetail: inject('toBooksDetail')
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
.books-recommend__nav {
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
.books-recommends__content {
    height: calc(100% - 150px);
    width: 100%;
    margin-top: 10px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
}
.books-recommends__item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 122px;
    margin-bottom: 20px;
    cursor: pointer;
    .item-cover {
        img {
            width: 90px;
            height: 120px;
            border: 1px solid #ebebeb;
            box-shadow: 2px 4px 6px #bbb;
        }
    }
    .item-ifo {
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
}
</style>