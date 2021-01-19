<template>
    <div class="books-chapters">
        <div class="books-chapters__nav">
            <i class="el-icon-back" @click="back"></i>
            <i class="el-icon-s-home" @click="back('index')"></i>
        </div>
        <div v-if="showContent && haveSource" class="books-chapters__content">
            <div class="books-chapters__header">
                <p class="books-chapters__title">目录<span class="books-chapters__length">共{{chapters.chapters.length}}章</span></p>
                <span class="books-chapters__btn" @click="reverse">倒序</span>
            </div>
            <p 
                class="books-chapters__item" 
                v-for="(item,index) in chaptersItems" :key="item._id"
                @click="back(`booksChaptersDetail/${index}`)"
            >
                {{item.title}}
            </p>
        </div>
        <el-empty description="该书籍暂无版权" v-if="showContent && !haveSource"></el-empty>
        <el-backtop target=".books-chapters__content" v-if="showContent && haveSource"></el-backtop>
    </div>
</template>

<script>
import { computed, inject, onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const loading = inject('loading');
        const showContent = ref(false);
        const chapters = ref({});
        const chaptersItems = ref([]);
        const {booksSource, booksChapters} = inject('api').booksChapters;
        const back = path=> path.length > 0 ? router.push(`/books/${path}`) : router.back(-1);
        const haveSource = computed(()=> chapters.value?.chapters?.length > 1);
        const reverse = ()=> chaptersItems.value.reverse();

        onActivated(async ()=> {
            store.commit('book/resetBook');
            showContent.value = false;
            const loadingObj = loading({
                target: '.books-chapters',
                background: 'transparent',
                spinner: 'el-icon-loading'
            });
            const source = await booksSource(route.params.booksId);

            if (Array.isArray(source)) {
                chapters.value = await booksChapters(source[0]._id);
                chaptersItems.value = chapters.value?.chapters;
                console.log(chaptersItems.value);
                store.commit('book/updateBook', {
                    booksId: route.params.booksId,
                    chapters: chaptersItems.value
                });
            }
            loadingObj.close();
            showContent.value = true;
        })
        return {
            back,
            chapters,
            showContent,
            haveSource,
            reverse,
            chaptersItems
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
.el-empty {
    height: calc(100% - 50px);
}
.books-chapters__nav {
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
.books-chapters {
    width: 100%;
    height: 100%;
    &:deep(.el-icon-loading) {
        font-size: 50px;
        color: #c0c4cc;
    }
}
.books-chapters__content {
    height: calc(100% - 55px);
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
}
.books-chapters__header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 20px;
    font-size: 16px;
    line-height: 32px;
    border-bottom: 1px solid #ebeef5;
}
.books-chapters__title {
    margin: 0;
}
.books-chapters__length {
    margin-left: 15px;
    font-size: 14px;
    line-height: 32px;
    color: #999;
}
.books-chapters__item {
    height: 75px;
    margin: 0;
    padding-left: 20px;
    line-height: 75px;
    font-size: 16px;
    color:#999;
    border-bottom: 1px solid #ebeef5;
    cursor: pointer;
}
.books-chapters__btn {
    cursor: pointer;
    &:hover {
        color: #409EFF;
    }
}
</style>