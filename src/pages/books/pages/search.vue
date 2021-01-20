<template>
    <div class="books-search">
        <el-autocomplete
            v-model="searchInput"
            placeholder="搜索书名"
            prefix-icon="el-icon-search"
        />
    </div>
</template>

<script>
import { inject, onActivated, ref } from 'vue';
export default {
    setup() {
        const { searchHotwords } = inject('api').booksSearch;
        const hotwords = ref({});

        onActivated(async()=> {
           hotwords.value = await searchHotwords();

           console.log('热搜:', hotwords.value);
        })
        return {
            searchInput: ref(''),
            hotwords
        }
    }
}
</script>

<style lang="less" scoped>
.books-search {
    padding: 40px 0;
    &:deep(.el-autocomplete) {
        width: 100%;
    }
}

</style>