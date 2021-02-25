<template>
    <div class="home" v-if="ready">
        <Banners :list="data.banners"/>
        <RecommendPlayList :list="data.playlist"/>
        <PrivateContent :list="data.privateContent"/>
        <NewSong :list="data.newSong"/>
        <Mv :list="data.mv"/>
        <Dj :list="data.dj"/>
    </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import Banners from '../components/home/Banners';
import RecommendPlayList from '../components/home/RecommendPlayList';
import PrivateContent from '../components/home/PrivateContent';
import NewSong from '../components/home/NewSong';
import Mv from '../components/home/Mv';
import Dj from '../components/home/Dj';
export default {
    components: {
        Banners,
        RecommendPlayList,
        PrivateContent,
        NewSong,
        Mv,
        Dj
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