<template>
    <el-carousel :interval="4000" type="card" height="255px" :initial-index="2">
        <el-carousel-item v-for="item in banners" :key="item.imageUrl">
            <div class="carousel-item">
                <el-image class="carousel-item__img" :src="item.imageUrl" alt="" fit="fit">
                    <template #placeholder>
                        <div class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </template>
                </el-image>
                <span class="carousel-item__title" :style="{backgroundColor: item.titleColor}">
                    {{item.typeTitle}}
                </span>
            </div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    props: {
        banners: Array
    }
}
</script>

<style lang="less" scoped>
.carousel-item {
    width: 100%;
    height: 100%;
    position: relative;
    &:deep(.el-image__inner) {
        border-radius: 10px;
    }
}
.carousel-item__title {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 0 15px;
    font-size: 15px;
    line-height: 30px;
    color: #fff;
    opacity: 0.75;
}
.carousel-item__img {
    height: 100%;
}
</style>