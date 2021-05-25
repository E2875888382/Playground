<template>
    <div class="books-index">
        <section class="books-index__main">
            <!-- 轮播图 -->
            <el-carousel :interval="4000" height="200px">
                <el-carousel-item v-for="carouselItem in booksIndex.carousel" :key="carouselItem._id">
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
                <header class="ranking-box__title">
                    <el-divider><i class="el-icon-s-data"></i>追书最热榜 Top100</el-divider>
                    <div class="ranking-box__link_more" @click="jump('ranking')">
                        <span>更多</span><i class="el-icon-arrow-right"></i>
                    </div>
                </header>
                <BooksList from="index" :list="booksIndex.ranking"/>
            </el-card>
        </section>
        <!-- 侧边栏 -->
        <section class="side-bar">
            <el-input prefix-icon="el-icon-search" placeholder="搜索书名" v-model="searchInput" @focus="toSearch" />
            <Hotwords :list="booksIndex.hotwords.newHotWords"/>
            <ClassCard icon="el-icon-male" gender="male" title="男生" :classes="booksIndex.classes.male"/>
            <ClassCard icon="el-icon-female" gender="female" title="女生" :classes="booksIndex.classes.female"/>
            <ClassCard icon="el-icon-notebook-2" gender="press" title="出版" :classes="booksIndex.classes.press"/>
        </section>
    </div>
</template>

<script>
import { onMounted, ref, inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ClassCard from '../components/classCard';
import BooksList from '../components/booksList';
import Hotwords from '../components/Hotwords';
export default {
    components: {
        ClassCard,
        BooksList,
        Hotwords
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const { booksIndexClass, booksIndexRank, booksIndexCarousel } = inject('api').books;
        const { hotWords } = inject('api').booksSearch;
        const booksIndex = reactive({
            classes: {},
            ranking: [],
            carousel: [],
            hotwords: {}
        });
        const jump = path=> {
            router.push(`/books/${path}`);
            store.commit('config/updateTabsPath', {tabsIndex: 3, path: `/books/${path}`});
        };
        const toSearch = ()=> router.push('/books/booksSearch');

        onMounted(async()=> {
            Promise.all([booksIndexClass(), booksIndexCarousel(), hotWords(), booksIndexRank()])
            .then(([classes, carousel, hotwords, rank])=> {
                booksIndex.classes = classes;
                booksIndex.carousel = carousel.data;
                booksIndex.hotwords = hotwords;
                booksIndex.ranking = rank?.ranking?.books.slice(0, 10) || [];
            })
        })
        return {
            jump,
            booksIndex,
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