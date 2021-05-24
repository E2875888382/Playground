<template>
    <div class="books-bookshelf">
        <el-card class="bookshelf-item" v-for="book in bookshelf" :key="book.booksId">
            <img 
                class="bookshelf-item__cover" 
                :src="book.cover" 
                @click="toBooksDetail(book.booksId, 'index')"
                @contextmenu="handleBookMenu(book)"
            >
        </el-card>
    </div>
</template>

<script>
import { computed, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const menu = inject('menu');
        const handleBookMenu = book=> {
            menu([
                {
                    label: '取消收藏',
                    click() {
                        store.commit('user/deleteFromBookshelf', book.booksId);
                    }
                }
            ])
        };

        onMounted(()=> {
            store.commit('user/getBookshelfStorage');
        })
        return {
            bookshelf: computed(()=> store.state.user.bookshelf),
            toBooksDetail: inject('toBooksDetail'),
            handleBookMenu
        }
    }
}
</script>

<style lang="less" scoped>
@booksshelfWidth: 312px;
@bookshelfItemWdith: 120px;
@bookshelfItemHeight: 160px;
.books-bookshelf {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: flex-start;
    flex-shrink: 0;
    width: @booksshelfWidth;
    height: 100%;
    background-color: #f0efee;
    .overflowScroll;
    &::after {
        content: '';
        flex: 0 0 @bookshelfItemWdith;
    }
}
.bookshelf-item {
    width: @bookshelfItemWdith;
    height: @bookshelfItemHeight;
    margin-top: 20px;
    padding: 0;
    cursor: pointer;
    &:deep(.el-card__body) {
        height: @bookshelfItemHeight;
        width: @bookshelfItemWdith;
        padding: 0;
    }
    &__cover {
        height: @bookshelfItemHeight;
        width: @bookshelfItemWdith;
    }
}
</style>