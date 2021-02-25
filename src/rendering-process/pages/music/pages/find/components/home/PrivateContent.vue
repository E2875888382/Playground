<template>
    <div>
        <p class="title"><span>独家放送</span><i class="el-icon-arrow-right"></i></p>
        <div class="privateContent-container">
            <div class="privateContent-item" v-for="item in list" :key="item.id">
                <div class="privateContent-item__content">
                    <el-image class="privateContent-item__img" :src="item.sPicUrl" alt="" fit="fit">
                        <template #placeholder>
                            <div class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </template>
                    </el-image>
                    <div class="privateContent-item__icon">
                        <i class="iconfont icon-Playerplay"></i>
                    </div>
                </div>
                <p class="privateContent-item__name">{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    }
}
</script>

<style lang="less" scoped>
.title {
    font-size: 25px;
    span {
        font-weight: bolder;
    }
}
.privateContent-container {
    display: flex;
    justify-content: space-between;
}
.privateContent-item {
    flex-basis: 32%;
    .el-image {
        border-radius: 5px;
    }
    cursor: pointer;
}
.privateContent-item__name {
    margin: 5px 0 20px 0;
    .font-overflow;
    line-height: 28px;
    font-size: 18px;
    font-weight: 350;
    color: #333;
}
.privateContent-item__content {
    position: relative;
}
.privateContent-item__icon {
    .flex-center;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 28px;
    height: 28px;
    border: 1px solid #ddd;
    background-color: #60626682;
    border-radius: 50%;
    .icon-Playerplay {
        color: #fff;
        font-size: 24px;
    }
}
</style>