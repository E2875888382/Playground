<template>
    <div class="books-index">
        <div class="books-index__main">
            <el-carousel :interval="4000" height="200px">
                <el-carousel-item v-for="carouselItem in booksCarousel" :key="carouselItem._id">
                    <img class="carousel-item__img" :src="carouselItem.img" alt="">
                </el-carousel-item>
            </el-carousel>
            <el-card class="ranking-box">
                <div class="ranking-box__title">
                    <el-divider><i class="el-icon-s-data"></i>追书最热榜 Top100</el-divider>
                    <div class="ranking-box__link_more" @click="jump('ranking')">
                        <span>更多</span><i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div class="ranking-item" v-for="item in booksRanking" :key="item._id">
                    <a href="" class="ranking-item__cover">
                        <img :src="`http://statics.zhuishushenqi.com${item.cover}`" alt="">
                    </a>
                    <div class="ranking-item__ifo">
                        <h4 class="ranking-item__title">{{item.title}}</h4>
                        <p class="ranking-item__author">{{item.author}}</p>
                        <p class="ranking-item__desc">{{item.shortIntro}}</p>
                        <p class="ranking-item__popularity">
                            <span class="popularity__num">{{item.latelyFollower}}</span><span>人气</span>
                            <el-divider direction="vertical"></el-divider>
                            <span class="popularity__num">{{item.retentionRatio}}%</span><span>读者留存</span>
                        </p>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="side-bar">
            <el-card style="margin-bottom:15px">
                <div class="side-bar__title_male">
                    <el-divider><i class="el-icon-male"></i>男生</el-divider>
                    <div class="title_male__link_more" @click="jump('cats')">
                        <span>更多</span><i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div class="side-bar__class_male">
                    <div 
                        class="side-bar__classItem" 
                        shadow="hover" 
                        v-for="(booksClass, index) in booksClasses.male" 
                        :key="index"
                    >
                        <p class="classItem__name">{{booksClass.name}}</p>
                        <p class="classItem__count">{{booksClass.bookCount}}</p>
                    </div>
                </div>
            </el-card>
            <el-card style="margin-bottom:15px">
                <div class="side-bar__title_female">
                    <el-divider><i class="el-icon-female"></i>女生</el-divider>
                    <div class="title_female__link_more" @click="jump('cats')">
                        <span>更多</span><i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div class="side-bar__class_female">
                    <div 
                        class="side-bar__classItem" 
                        shadow="hover" 
                        v-for="(booksClass, index) in booksClasses.female" 
                        :key="index"
                    >
                        <p class="classItem__name">{{booksClass.name}}</p>
                        <p class="classItem__count">{{booksClass.bookCount}}</p>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const {booksIndexClass, booksIndexRank, booksIndexCarousel} = inject('api').books;
        const booksClasses = ref({});
        const booksRanking = ref({});
        const booksCarousel = ref([]);
        const router = useRouter();
        const store = useStore();
        const getClasses = async()=> {
            booksClasses.value = await booksIndexClass();
            console.log('首页分类：', booksClasses.value);
        };
        const getRanking = async()=> {
            const res = await booksIndexRank();

            booksRanking.value = res.ranking.books.slice(0, 10);
            console.log('首页前10排行榜：', booksRanking.value);
        };
        const getCarousel = async()=> {
            const res = await booksIndexCarousel();

            booksCarousel.value = res.data;
            console.log('首页轮播图：', booksCarousel.value);
        };
        const jump = path=> {
            router.push(`/books/${path}`);
            store.commit('config/updateTabsPath', {tabsIndex: 2, path: `/books/${path}`});
        };

        onMounted(()=> {
            getClasses();
            getRanking();
            getCarousel();
        })
        return {
            jump,
            getClasses,
            getRanking,
            getCarousel,
            booksCarousel,
            booksRanking,
            booksClasses
        }
    }
}
</script>

<style lang="less" scoped>
@sideBarWidth: 280px;
@bookClassesHeight: 60px;
i {
    margin-right: 5px;
    color: red;
}
.el-icon-arrow-right {
    color: #333;
}
.books-index {
    display: flex;
    width: 100%;
    padding: 20px 0;
}
.books-index__main {
    flex-grow: 1;
    .el-carousel {
        border-radius: 5px;
    }
}
.carousel-item__img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.side-bar {
    width: @sideBarWidth;
    margin-left: 20px;
    &:deep(.el-card__body) {
        padding: 0 0 10px 0;
    }
}
.side-bar__class_male, .side-bar__class_female {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    width: @sideBarWidth;
    background: #FFF;
    &::after {
        content: '';
        flex: 0 0 50%;
    }
    .side-bar__classItem {
        width: 50%;
        height: @bookClassesHeight;
        cursor: pointer;
        .classItem__name {
            margin: 0;
            text-align: center;
            line-height: calc(@bookClassesHeight / 2);
        }
        .classItem__count {
            margin: 0;
            text-align: center;
            line-height: calc(@bookClassesHeight / 2);
        }
    }
}
.ranking-box {
    margin-top: 15px;
    &:deep(.el-card__body) {
        padding: 0 20px;
    }
}
.ranking-box__title,
.side-bar__title_male,
.side-bar__title_female {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.side-bar__title_male,
.side-bar__title_female {
    padding: 0 10px 0 20px;
    .title_male__link_more,
    .title_female__link_more {
        flex-basis: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1px 0 0 10px;
        font-size: 12px;
        cursor: pointer;
    }
}
.ranking-box__link_more {
    flex-basis: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1px 0 0 15px;
    font-size: 12px;
    cursor: pointer;
}
.ranking-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 122px;
    margin-bottom: 20px;
    cursor: pointer;
}
.ranking-item__cover {
    img {
        width: 90px;
        height: 120px;
        border: 1px solid #ebebeb;
        box-shadow: 2px 4px 6px #bbb;
    }
}
.ranking-item__ifo {
    flex-grow: 1;
    height: 122px;
    padding: 0 10px;
}
.ranking-item__title {
    margin: 0;
    font-size: 14px;
    line-height: 25px;
}
.ranking-item__author {
    margin: 0;
    font-size: 12px;
    line-height: 22px;
}
.ranking-item__desc {
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
.ranking-item__popularity {
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