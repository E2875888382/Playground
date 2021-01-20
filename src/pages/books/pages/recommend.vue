<template>
    <div class="books-recommend">
        <nav-bar @back="back" />
        <div v-if="recommends.books" class="books-recommends__content">
            <books-list from="-1" :list="recommends.books" />
        </div>
        <el-empty description=" " v-else></el-empty>
    </div>
</template>

<script>
import { inject, onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import navBar from '../components/navBar';
import booksList from '../components/booksList';
export default {
    components: {
        'nav-bar': navBar,
        'books-list': booksList
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const recommends = ref({});
        const { booksRecommend } = inject('api').booksDetail;
        const back = ()=> router.back(-1);

        onActivated(async ()=> {
            recommends.value = await booksRecommend(route.params.booksId);
        })
        return {
            back,
            recommends
        }
    }
}
</script>

<style lang="less" scoped>
.books-recommends__content {
    height: calc(100% - 150px);
    width: 100%;
    margin-top: 10px;
    .overfloScroll;
}
</style>