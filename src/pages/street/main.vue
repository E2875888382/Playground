<template>
    <div class="bbs-container">
        <div class="bbs-newsList" v-infinite-scroll="getList">
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
            <div class="newsContent__main" @click="handleUrl" v-html="newsContent" v-if="newsContent"></div>
            <el-empty description=" " v-else></el-empty>
        </div>
        <el-backtop target=".bbs-newsContent"></el-backtop>
    </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const {newsList, newsDetail} = inject('api').street;
        const store = useStore();
        const list = ref([]);
        const active = ref('');
        const newsContent = ref('');
        const newsRef = ref(null);
        const page = ref(1);
        const router = useRouter();
        const getList = async()=> {
            const res = await newsList(page.value);

            list.value = [...list.value, ...res.data];
            page.value++;
        };
        const bodyParser = data=> {
            const {body, img, link, video} = data;
            const imgMap = {};
            const videoMap = {};
            const linkMap = {};

            for (const item of img) imgMap[item.ref] = item;
            if (video) for (const item of video) videoMap[item.ref] = item;
            for (const item of link) linkMap[item.ref] = item;
            return body
                .replace(/<!--IMG(.*?)-->/g, match=> {
                    return `<p align="center"><img src="${imgMap[match].src}" width="100%"/></p>`;
                })
                .replace(/<!--link(.*?)-->/g, match=> {
                    const {title, href} = linkMap[match];

                    return `<a data-src="${href}">${title}</a>`;
                })
                .replace(/<!--VIDEO(.*?)-->/g, match=> {
                    return `<video controls src="${videoMap[match].url_m3u8}" poster="${videoMap[match].cover}" width="100%" />`;
                });
        };
        const handleClick = async (news)=> {
            active.value = news.docid;
            store.commit('config/updateTitle', {tabs: 'bbs', title: news.title});
            const res = await newsDetail(news.docid);
            const parsedData = bodyParser(res.data);

            newsContent.value = parsedData;
            newsRef.value.scrollTop = '0'; // 回弹顶部
        };
        const handleUrl = e=> {
            const src = e.target.innerHTML;
            const urlExec = /data-src="(.*)"/g.exec(src);
            const url = Array.isArray(urlExec) && urlExec[1];

            url && router.push({name: 'webview', params: {url}});
        };

        onMounted(getList);
        return {
            list,
            active,
            getList,
            handleClick,
            newsContent,
            newsRef,
            page,
            handleUrl
        }
    }
}
</script>

<style lang="less">
@newsFontSize: 20px;
@newsLineHeight: 1.8;
strong {
    font-size: @newsFontSize;
    line-height: @newsLineHeight;
}
a {
    color: -webkit-link;
    cursor: pointer;
}
.newsContent__main {
    p {
        font-size: @newsFontSize;
        line-height: @newsLineHeight;
    }
    a {
        pointer-events: none;
    }
    b {
        pointer-events: none;
    }
}
</style>

<style lang="less" scoped>
@newsListWidth: 312px;
.el-empty {
    height: 100%;
}
.bbs-container {
    display: flex;
    width: 100%;
    height: 100%;
}
.bbs-newsList {
    flex-shrink: 0;
    width: @newsListWidth;
    height: 100%;
    background-color: #f0efee;
    .overfloScroll;
}
.newsList__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 15px;
    cursor: pointer;
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
    .overfloScroll;
    .newsContent__main {
        width: 80%;
        padding: 0 60px;
        margin: 0 auto;
    }
}
</style>