<template>
    <el-card style="margin-bottom:15px">
        <p class="side-bar__title_search"><i class="el-icon-search"></i>大家都在搜</p>
        <p 
            class="side-bar__hotWords" 
            v-for="(item, index) in list" 
            :key="index"
        >
            {{item.word}}
        </p>
    </el-card>
</template>

<script>
export default {
    props: {
        list: Array
    }
}
</script>

<style lang="less" scoped>
.side-bar__title_search {
    position: relative;
    padding: 0 20px;
    font-weight: bold;
    font-size: 21px;
    .border_bottom(#DCDFE6);
    &::after {
        bottom: -11px;
        left: 50%;
        width: 90%;
        transform: translateX(-50%);
    }
}
.el-icon-search {
    color: #333;
}
.side-bar__hotWords {
    padding: 0 20px;
    font-size: 14px;
}
</style>