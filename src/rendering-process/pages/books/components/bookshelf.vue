<template>
    <transition name="slide_right">
        <div class="books-bookshelf" v-show="showBookshelf">
            <el-card class="bookshelf-item" v-for="book in bookshelf" :key="book.booksId">
                <img 
                    class="bookshelf-item__cover" 
                    :src="book.cover"
                    @click="toBooksDetail(book.booksId, 'index')"
                    @contextmenu="handleBookMenu(book)"
                />
            </el-card>
        </div>
    </transition>
    <div class="bookshelf-button" @click="handleShowBookshelf">
        <i class="el-icon-d-arrow-right"/>
    </div>
</template>
<script>
import { computed, onMounted, inject, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const menu = inject('menu');
        const showBookshelf = ref(false);
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
        const handleShowBookshelf = ()=> {
            showBookshelf.value = !showBookshelf.value;
        };

        onMounted(()=> {
            store.commit('user/getBookshelfStorage');
        })
        return {
            bookshelf: computed(()=> store.state.user.bookshelf),
            toBooksDetail: inject('toBooksDetail'),
            handleBookMenu,
            handleShowBookshelf,
            showBookshelf
        }
    }
}
</script>

<style lang="less" scoped>
@booksshelfWidth: 312px;
@bookshelfItemWdith: 120px;
@bookshelfItemHeight: 160px;
.bookshelf-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 80px;
    bottom: 0;
    top: 0;
    width: 30px;
    background-color: #f0efee;
    cursor: pointer;
    z-index: 5;
}
.books-bookshelf {
    position: absolute;
    left: 110px;
    top: 0;
    z-index: 5;
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
.el-icon-d-arrow-right {
    font-size: 30px;
}
.slide_right-enter-active {
    animation: slide .2s ease;
}
.slide_right-leave-active {
    animation: slide .2s ease reverse;
}
@keyframes slide {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>