<template>
    <div class="books-comments">
        <nav-bar @back="back" />
        <div class="books-comments__content" v-infinite-scroll="getComments">
            <comments-list :comments="comments" />
            <p v-if="loadEnd" class="books-comments__loadEnd">没有更多了</p>
        </div>
         <el-backtop target=".books-comments__content"></el-backtop>
    </div>
</template>

<script>
import { inject, onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import navBar from '../components/navBar';
import commentsList from '../components/commentsList';
export default {
    components: {
        'nav-bar': navBar,
        'comments-list': commentsList
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const comments = ref([]);
        const page = ref(0);
        const loadEnd = ref(false);
        const {booksComment} = inject('api').booksDetail;
        const back = path=> path ? router.push(`/books/${path}`) : router.back(-1);
        const getComments = async ()=> {
            if (loadEnd.value === true) return ;
            const res  = await booksComment(route.params.booksId, page.value, 20);

            page.value++;
            // 根据total判断是否全部加载完
            if (res.total && comments.value.length >= res.total) loadEnd.value = true;
            comments.value = [...comments.value, ...(res?.reviews || [])];
        };

        onActivated(async ()=> {
            comments.value = [];
            page.value = 0;
            loadEnd.value = false;
            getComments();
        })
        return {
            back,
            comments,
            getComments,
            page,
            loadEnd
        }
    }
}
</script>

<style lang="less" scoped>
.books-comments {
    width: 100%;
    height: 100%;
}
.books-comments__content {
    width: 100%;
    height: calc(100% - 90px);
    padding: 20px 0;
    .overfloScroll;
}
.books-comments__loadEnd {
    margin: 0;
    text-align: center;
    color: #999;
    font-size: 14px;
}
</style>