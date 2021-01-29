<template>
    <div class="books-search">
        <el-autocomplete
            v-model="searchInput"
            placeholder="搜索书名"
            prefix-icon="el-icon-search"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
            clearable
        >
            <template #default="{ item }">
                <div class="hotword">
                    <span class="hotword__index" v-if="item.index >= 0">{{item.index + 1}}.</span>
                    <span :class="['hotword__title', {'hotword__title_hot':item.hot}]">
                        {{item.word ? item.word : item}}
                        <span class="hotword__times">{{item.times}}</span>
                    </span>
                    <span class="hotword__flag_new" v-if="item.isNew" >新</span>
                    <span class="hotword__rank_up" v-if="item.soaring > 0">
                        <i class="el-icon-top"></i>
                        {{item.soaring}}
                    </span>
                    <span class="hotword__rank_down" v-else-if="item.soaring < 0">
                        <i class="el-icon-bottom"></i>
                        {{-item.soaring}}
                    </span>
                </div>
            </template>
            <template #append>
                <el-button type="primary" plain @click="handleSearch">搜索</el-button>
            </template>
        </el-autocomplete>
        <p v-if="searchResult.books">共搜索到{{searchResult.books.length}}条结果</p>
        <div class="search-content">
            <books-list :list="searchResult.books" from="booksSearch"/>
        </div>
        <el-backtop target=".search-content"></el-backtop>
    </div>
</template>

<script>
import { computed, inject, onActivated, ref } from 'vue';
import booksList from '../components/booksList';
export default {
    components: {
        'books-list': booksList
    },
    setup() {
        const searchResult = ref({});
        const searchInput = ref('');
        const { searchHotwords, autoComplete, searchByTitle } = inject('api').booksSearch;
        const hotwords = ref({});
        const hotwordsTopTen = computed(()=> {
            return hotwords.value?.searchHotWords.map((item, index)=> {
                return {
                    ...item,
                    hot: index < 3,
                    index: index
                }
            });
        });
        const handleSelect = item=> {
            searchInput.value = item.word || item;
            handleSearch();
        };
        const querySearch = async (queryString, cb) => {
            const res = queryString ? (await autoComplete(queryString)).keywords : hotwordsTopTen.value;

            cb(res);
        };
        const handleSearch = async ()=> {
            searchResult.value = await searchByTitle(searchInput.value);
        };

        onActivated(async()=> {
           hotwords.value = await searchHotwords();
        })
        return {
            searchInput: searchInput,
            hotwords,
            querySearch,
            handleSearch,
            handleSelect,
            searchResult
        }
    }
}
</script>

<style lang="less" scoped>
.books-search {
    height: 100%;
    box-sizing: border-box;
    padding: 40px 0;
    &:deep(.el-autocomplete) {
        width: 100%;
    }
}
.search-content {
    height: calc(100% - 67px);
    width: 100%;
    margin-top: 20px;
    .overfloScroll;
}
.el-icon-top {
    color: #f56c6c;
}
.el-icon-bottom {
    color: #5daf34;
}
.hotword {
    display: flex;
    align-items: center;
    &__index {
        margin-right: 15px;
        font-size: 15px;
        color: #82848a;
    }
    &__title {
        flex-grow: 1;
    }
    &__title_hot {
        color: #f56c6c;
    }
    &__times {
        font-size: 12px;
        color: #999;
    }
    &__flag_new {
        height: 20px;
        width: 20px;
        border-radius: 3px;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        background-color: gold;
        color: #FFF;
    }
}
</style>