<template>
    <div class="books-ranking">
        <div class="books-ranking__tabs">
            <i class="el-icon-back" @click="back"></i>
            <div class="tabs-item" :class="{'tabs-item_active':mainClass === 'epub'}" @click="handleMainClassChange('epub')">出版</div>
            <div class="tabs-item" :class="{'tabs-item_active':mainClass === 'male'}" @click="handleMainClassChange('male')">男频</div>
            <div class="tabs-item" :class="{'tabs-item_active':mainClass === 'female'}" @click="handleMainClassChange('female')">女频</div>
            <i class="el-icon-s-home" @click="back"></i>
        </div>
        <el-tabs tab-position="left" v-show="mainClass === 'epub'" @tab-click="handleSubClassChange" v-model="epubSubTab">
            <el-tab-pane 
                v-for="item in rankingClasses.epub" :key="item._id"
                :label="item.title" :name="item._id + ''" 
            >
                <div class="sub-tab__content">
                    <books-list from="ranking" :list="getContent('epub', item.title)"/>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-tabs tab-position="left" v-show="mainClass === 'male'" @tab-click="handleSubClassChange" v-model="maleSubTab">
            <el-tab-pane 
                v-for="item in rankingClasses.male" :key="item._id"
                :label="item.title" :name="item._id + ''" 
            >
                <div class="sub-tab__content">
                    <books-list from="ranking" :list="getContent('male', item.title)"/>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-tabs tab-position="left" v-show="mainClass === 'female'" @tab-click="handleSubClassChange" v-model="femaleSubTab">
            <el-tab-pane 
                v-for="item in rankingClasses.female" :key="item._id"
                :label="item.title" :name="item._id + ''" 
            >
                <div class="sub-tab__content">
                    <books-list from="ranking" :list="getContent('female', item.title)"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import booksList from '../components/booksList';
export default {
    components: {
        'books-list': booksList
    },
    setup() {
        const router = useRouter();
        const cache = ref({});
        const epubSubTab = ref('');
        const maleSubTab = ref('');
        const femaleSubTab = ref('');
        const mainClass = ref('epub');
        const rankingClasses = ref({});
        const {booksRankingClass, booksRankingDetail} = inject('api').booksRanking;
        const handleMainClassChange = tab=> { mainClass.value = tab; };
        const back = ()=> router.push('/books/index');
        const updateCache = async(type, id)=> {
            const res = await booksRankingDetail(id);

            cache.value[type] = {
                ...cache.value[type], 
                ...{
                    [res.ranking.title]: res.ranking.books
                }
            }
            console.log('更新排行榜内容缓存：', cache.value);
        }
        const handleSubClassChange = async(tab)=> {
            // 如果缓存过了就不调用接口
            if (cache.value?.[mainClass.value]?.[tab.props.label]) {
                console.log('数据已经缓存过了，不用调接口');
                return;
            }
            updateCache(mainClass.value, tab.props.name);
        };
        const getClasses = async()=> {
            rankingClasses.value = await booksRankingClass();

            // 顺便把每个大类的第一个tab的数据加载了
            epubSubTab.value = rankingClasses.value['epub'][0]._id + '';
            maleSubTab.value = rankingClasses.value['male'][0]._id + '';
            femaleSubTab.value = rankingClasses.value['female'][0]._id + '';
            updateCache('epub', epubSubTab.value);
            updateCache('male', maleSubTab.value);
            updateCache('female', femaleSubTab.value);
        };
        const getContent = (mainClass, subClass)=> cache.value?.[mainClass]?.[subClass];

        onMounted(()=> {
            getClasses();
        })
        return {
            cache,
            epubSubTab,
            maleSubTab,
            femaleSubTab,
            getClasses,
            handleMainClassChange,
            handleSubClassChange,
            rankingClasses,
            mainClass,
            getContent,
            back,
            toBooksDetail: inject('toBooksDetail'),
            getStaticsImg: inject('getStaticsImg')
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
.books-ranking {
    position: relative;
    width: 100%;
    height: 100%;
    &:deep(.el-tabs__item) {
        width: 160px;
    }
    &:deep(.el-tabs) {
        height: calc(100% - 70px);
    }
    &:deep(.el-tabs__content) {
        height: 100%;
        .overfloScroll;
    }
}
.books-ranking__tabs {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 1px;
    margin-bottom: 10px;
    background-color: @bgc_common;
    .border_bottom(#DCDFE6);
    .tabs-item {
        position: relative;
        flex-grow: 1;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        &:hover {
            color: #409EFF;
        }
    }
    .tabs-item_active {
        color: #409EFF;
        .border_bottom(#409EFF);
        &::after {
            z-index: 1;
        }
    }
}
</style>