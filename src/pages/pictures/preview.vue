<template>
    <div class="pictures-preview">
        <div class="preview-box">
            <div class="preview-arrow_left"><i class="el-icon-arrow-left"></i></div>
            <el-image class="preview-img" :src="currentImg" />
            <div class="preview-arrow_right"><i class="el-icon-arrow-right"></i></div>
        </div>
        <div class="preview-imgList">
            <el-image class="preview-imgList__item" v-for="(img, index) in imgs" :key="index" :src="img"></el-image>
        </div>
    </div>
</template>

<script>
import { computed, onActivated, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
export default {
    setup() {
        const index = ref(0);
        const currentImg = ref('');
        const route = useRoute();
        const store = useStore();
        const imgs = computed(()=> store.state.pictures.pictures);

        onActivated(()=> {
            index.value = route.params.currentIndex;
            currentImg.value = imgs.value[index.value];
            console.log(currentImg.value);
        });
        return {
            currentImg,
            index,
            imgs
        }
    }
}
</script>

<style lang="less" scoped>
.pictures-preview {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 10px;
}
.preview-box {
    display: flex;
    width: 100%;
    height: calc(100% - 230px);
}
.preview-imgList {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 220px;
    width: 1150px;
    margin: 0 auto;
    overflow-x: scroll;
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;  
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
        background-color:red;
    }
    &__item {
        flex-shrink: 0;
        height: 140px;
        width: 200px;
        margin: 0 10px;
    }
}
.preview-img {
    width: 80%;
    height: 100%;
}
.preview-arrow_left,
.preview-arrow_right {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 20%;
    height: 100%;
    font-size: 100px;
    cursor: pointer;
}
</style>