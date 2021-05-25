<template>
    <el-skeleton :loading="loading" animated>
        <template #default>
            <div class="home">
                <Banners :list="data.banners"/>
                <transition-group name="component-list">
                    <component 
                        v-for="component in componentsList" :key="component.title" 
                        :is="component.component" :list="data[component.data]"
                    />
                </transition-group>
                <DragController :list="componentsList" @sort="handleSort"/>
            </div>
        </template>
        <template #template>
            <Skeleton />
        </template>
    </el-skeleton>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import Banners from '../components/home/Banners';
import RecommendPlayList from '../components/home/RecommendPlayList';
import PrivateContent from '../components/home/PrivateContent';
import NewSong from '../components/home/NewSong';
import Mv from '../components/home/Mv';
import Dj from '../components/home/Dj';
import DragController from '../components/home/DragController';
import Skeleton from '../components/home/Skeleton';
export default {
    components: {
        Banners,
        RecommendPlayList,
        PrivateContent,
        NewSong,
        Mv,
        Dj,
        DragController,
        Skeleton
    },
    setup() {
        const loading = ref(true);
        const data = ref({});
        const componentsList = ref([
            {
                title: '推荐歌单',
                component: 'RecommendPlayList',
                data: 'playlist'
            },
            {
                title: '独家放送',
                component: 'PrivateContent',
                data: 'privateContent'
            },
            {
                title: '最新音乐',
                component: 'NewSong',
                data: 'newSong'
            },
            {
                title: '推荐MV',
                component: 'Mv',
                data: 'mv'
            },
            {
                title: '主播电台',
                component: 'Dj',
                data: 'dj'
            }
        ]);
        const { find: {
            getBanner,
            getPrivateContent,
            getNewSong,
            getRecommendPlaylist,
            getPersonalizedMV,
            getDjHot
        }} = inject('api').music;
        const handleSort = list=> {
            componentsList.value = list;
        };

        onMounted(async ()=> {
            loading.value = true;
            Promise.all([
                getBanner(),
                getPrivateContent(),
                getNewSong(),
                getRecommendPlaylist(),
                getPersonalizedMV(),
                getDjHot()
            ])
            .then(([
                { banners },
                { result: privateContent },
                { result: newSong },
                { result: playlist },
                { result: mv },
                { djRadios: dj }
            ])=> {
                data.value = {
                    banners,
                    privateContent,
                    newSong,
                    playlist,
                    mv,
                    dj
                };
                loading.value = false;
            })
        })
        return {
            data,
            loading,
            componentsList,
            handleSort
        }
    }
}
</script>

<style lang="less" scoped>
.component-list-move {
    transition: transform 1s;
}
</style>