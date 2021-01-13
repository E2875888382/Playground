<template>
    <div class="books-ranking">
        <el-tabs :stretch="true">
            <el-tab-pane label="出版" name="epub"></el-tab-pane>
            <el-tab-pane label="男频" name="male"></el-tab-pane>
            <el-tab-pane label="女频" name="female"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    setup() {
    }
}
</script>

<style lang="less" scoped>
.books-ranking {
    width: 800px;
    min-height: 730px;
}
.el-tabs {
    &:deep(.el-tabs__item) {
        height: 60px;
        line-height: 60px;
    }
}

</style>