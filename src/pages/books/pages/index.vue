<template>
    <div class="books-index">
        <div class="books-index__main">
            <!-- 轮播图 -->
            <el-carousel :interval="4000" height="200px">
                <el-carousel-item v-for="carouselItem in booksCarousel.data" :key="carouselItem._id">
                    <el-image class="carousel-item__img" :src="carouselItem.img" alt="" fit="fit">
                        <template #placeholder>
                            <div class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </template>
                    </el-image>
                </el-carousel-item>
            </el-carousel>
            <!-- 排行榜 -->
            <el-card class="ranking-box">
                <div class="ranking-box__title">
                    <el-divider><i class="el-icon-s-data"></i>追书最热榜 Top100</el-divider>
                    <div class="ranking-box__link_more" @click="jump('ranking')">
                        <span>更多</span><i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <books-list from="index" :list="booksRanking"/>
            </el-card>
        </div>
        <!-- 侧边栏 -->
        <div class="side-bar">
            <el-input prefix-icon="el-icon-search" placeholder="搜索书名" v-model="searchInput" @focus="toSearch" />
            <el-card style="margin-bottom:15px">
                <p class="side-bar__title_search"><i class="el-icon-search"></i>大家都在搜</p>
                <p 
                    class="side-bar__hotWords"
                    v-for="(item, index) in searchHotWords.newHotWords" 
                    :key="index"
                >
                    {{item.word}}
                </p>
            </el-card>
            <class-card icon="el-icon-male" gender="male" title="男生" :classes="booksClasses.male" />
            <class-card icon="el-icon-female" gender="female" title="女生" :classes="booksClasses.female" />
            <class-card icon="el-icon-notebook-2" gender="press" title="出版" :classes="booksClasses.press" />
        </div>
    </div>
</template>

<script>
import { onMounted, ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import classCard from '../components/classCard';
import booksList from '../components/booksList';
export default {
    components: {
        'class-card': classCard,
        'books-list': booksList
    },
    setup() {
        const { booksIndexClass, booksIndexRank, booksIndexCarousel } = inject('api').books;
        const { hotWords } = inject('api').booksSearch;
        const booksClasses = ref({});
        const booksRanking = ref([]);
        const booksCarousel = ref({});
        const searchHotWords = ref({});
        const router = useRouter();
        const store = useStore();
        const jump = path=> {
            router.push(`/books/${path}`);
            store.commit('config/updateTabsPath', {tabsIndex: 2, path: `/books/${path}`});
        };
        const toSearch = ()=> router.push('/books/booksSearch');

        onMounted(async()=> {
            booksClasses.value = await booksIndexClass();
            booksCarousel.value = await booksIndexCarousel();
            searchHotWords.value = await hotWords();
            booksRanking.value = (await booksIndexRank())?.ranking?.books.slice(0, 10) || [];
        })
        return {
            jump,
            booksCarousel,
            booksRanking,
            booksClasses,
            searchHotWords,
            searchInput: ref(''),
            toSearch
        }
    }
}
</script>

<style lang="less" scoped>
@sideBarWidth: 280px;
i {
    margin-right: 5px;
    color: red;
}
.el-input {
    margin-bottom: 15px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-icon-arrow-right,
.el-icon-search {
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
}
.side-bar {
    width: @sideBarWidth;
    margin-left: 20px;
    &:deep(.el-card__body) {
        padding: 0 0 10px 0;
    }
}
.side-bar__title_search {
    position: relative;
    padding: 0 20px;
    font-weight: bold;
    font-size: 21px;
    .border_bottom(#DCDFE6);
    &::after {
        bottom: -11px;
        left: 50%;
        width: 90%;
        transform: translateX(-50%);
    }
}
.side-bar__hotWords {
    padding: 0 20px;
    font-size: 14px;
}
.ranking-box {
    margin-top: 15px;
    &:deep(.el-card__body) {
        padding: 0 20px;
    }
}
.ranking-box__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
</style>