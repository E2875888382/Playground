<template>
    <div class="search-container">
        <div class="search-input">

        </div>
        <span class="title">{{title}}</span>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
    setup() {
        const store = useStore();
        const route = useRoute();

        return {
            title: computed(()=> store.state.config.title[route.name])
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