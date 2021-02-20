<template>
    <div class="home">
        <el-carousel :interval="4000" type="card" height="255px" :autoplay="false">
            <el-carousel-item v-for="item in data.banners" :key="item.imageUrl">
                <el-image class="carousel-item__img" :src="item.imageUrl" alt="" fit="fit">
                    <template #placeholder>
                        <div class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </template>
                </el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
export default {
    setup() {
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
            })
        })
        return {
            data
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    padding-top: 80px;
    &:deep(.el-image__inner) {
        border-radius: 10px;
    }
}
.carousel-item__img {
    height: 100%;
}
</style>