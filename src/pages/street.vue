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
        <div class="bbs-newsContent" ref="newsRef">
            <div class="newsContent__main" v-html="newsContent" ></div>
        </div>
    </div>
</template>

<script>
import { newsList, newsDetail } from '../api/street';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const list = ref([]);
        const active = ref('');
        const newsContent = ref({});
        const newsRef = ref(null);
        const getList = async()=> {
            const res = await newsList();

            list.value = res.data;
            console.log('newslist:', res);
        };
        const bodyParser = data=> {
            const {body, img, link} = data;
            const imgMap = {};
            // const videoMap = {};
            const linkMap = {};

            for (const item of img) {
                imgMap[item.ref] = item;
            }
            // for (const item of video) {
            //     videoMap[item.ref] = item;
            // }
            for (const item of link) {
                linkMap[item.ref] = item;
            }
            return body
                .replace(/<!--IMG(.*?)-->/g, match=> {
                    return `<p align="center"><img src="${imgMap[match].src}" height="${imgMap[match].pixel / 700}" width="700px"/></p>`;
                })
                .replace(/<!--link(.*?)-->/g, match=> {
                    const {title, href} = linkMap[match];

                    return `<a src="${href}" onclick="window.open('${href}')">${title}</a>`
                })
                // .replace(/<!--VIDEO(.*?)-->/g, match=> {
                //     return `<video controls src="${videoMap[match].m3u8_url}" poster="${videoMap[match].cover}" width="400" height="300"/>`;
                // });
        };
        const handleClick = async (news)=> {
            active.value = news.docid;
            store.commit('config/updateTitle', {tabs: 'bbs', title: news.title});
            const res = await newsDetail(news.docid);
            const parsedData = bodyParser(res.data);

            newsContent.value = parsedData;
            newsRef.value.scrollTop = '0'; // 回弹顶部
        };

        onMounted(getList);
        return {
            list,
            active,
            getList,
            handleClick,
            newsContent,
            newsRef
        }
    }
}
</script>

<style>
strong {
    font-size: 18px;
}
a {
    color: -webkit-link;
    cursor: pointer;
}
</style>

<style lang="less" scoped>
@newsListWidth: 312px;
.bbs-container {
    display: flex;
    width: 100%;
    height: 100%;
}
.bbs-newsList {
    flex-shrink: 0;
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
.bbs-newsContent {
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0;
    }
    .newsContent__main {
        width: 730px;
        padding: 0 60px;
        margin: 0 auto;
    }
}
</style>