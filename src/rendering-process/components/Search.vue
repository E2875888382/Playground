<!--
    @description 头部搜索组件
-->
<template>
    <div class="search-container">
        <div class="search-input">
            <el-input 
                class="search-input__content" 
                v-model="input" 
                prefix-icon="el-icon-search"
                placeholder="搜索"
                size="small"
                clearable
            />
        </div>
        <span class="title">{{title}}</span>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const input = ref('');

        return {
            title: computed(()=> store.state.config.title[route.name]),
            input: input
        }
    }
}
</script>

<style lang="less" scoped>
@searchContainerWidth: 312px;
.search-container {
    display: flex;
}
.search-input {
    flex-shrink: 0;
    height: 78px;
    width: @searchContainerWidth;
    background-color: #eeeae8;
}
.search-input__content {
    -webkit-app-region: no-drag;
    width: 238px;
    margin: 33px 10px 0 15px;
    &:deep(.el-input__inner) {
        color: #333;
        background-color:#dbd9d8bf;
        &:focus {
            background: #FFF;
        }
    }
}
.title {
    max-width: 600px;
    flex-grow: 0;
    flex-shrink: 1;
    padding: 6px 10px 0 39px;
    font-size: 23px;
    line-height: 78px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>