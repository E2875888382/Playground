<template>
    <div class="bbs-container">
        <div class="bbs-newsList">
            <div 
                class="newsList__item" 
                :class="{'newsList__item_active': news.docid === active}"
                v-for="news in list"
                :key="news.docid"
                @click="handleClick(news)"
            >
                <el-avatar class="news__img" :src="news.imgsrc" shape="square"/>
                <p class="news__title">{{news.title}}</p>
            </div>
        </div>
        <div class="bbs-newsContent"></div>
    </div>
</template>

<script>
import { newsList } from '../api/street';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const list = ref([]);
        const active = ref('');
        const getList = async()=> {
            const res = await newsList();

            list.value = res.data;
        };
        const handleClick = (news)=> {
            active.value = news.docid;
            store.commit('config/updateTitle', {tabs: 'bbs', title: news.title});
        };

        onMounted(getList);
        return {
            list,
            active,
            getList,
            handleClick
        }
    }
}
</script>

<style lang="less" scoped>
@newsListWidth: 312px;
.bbs-container {
    width: 100%;
    height: 100%;
}
.bbs-newsList {
    width: @newsListWidth;
    height: 100%;
    overflow: auto;
    background-color: #f0efee;
    &::-webkit-scrollbar {
        width: 0;
    }
}
.newsList__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 15px;
    &_active {
        background-color: #c9c9ca;
    }
}
.news__img {
    width: 45px;
    height: 45px;
    border-radius: 2px;
}
.news__title {
    width: 225px;
    font-size: 18px;
    line-height: 27px;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    color: #333333c4;
}
</style>