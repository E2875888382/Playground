<template>
    <div class="home" v-if="ready">
        <Banners :banners="data.banners"/>
        <RecommendPlayList :list="data.playlist"/>
    </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import Banners from '../components/home/Banners';
import RecommendPlayList from '../components/home/RecommendPlayList';
export default {
    components: {
        Banners,
        RecommendPlayList
    },
    setup() {
        const ready = ref(false);
        const data = ref({});
        const { find: {
            getBanner,
            getPrivateContent,
            getNewSong,
            getRecommendPlaylist,
            getPersonalizedMV,
            getDjHot
        }} = inject('api').music;

        onMounted(async ()=> {
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
                ready.value = true;
                console.log('发现页数据：', data.value);
            })
        })
        return {
            data,
            ready
        }
    }
}
</script>

<style lang="less" scoped>

</style>