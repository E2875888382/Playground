 <template>
    <div class="books-container">
        <div class="books-bookshelf">
            <el-card class="bookshelf-item" v-for="(book, index) in bookshelf" :key="index">
                <img class="bookshelf-item__cover" :src="book.cover">
            </el-card>
        </div>
        <div class="books-content">
            <div class="booksContent__main">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();

        return {
            bookshelf: computed(()=> store.state.user.bookshelf)
        }
    }
}
</script>

<style lang="less" scoped>
@booksshelfWidth: 312px;
@bookshelfItemWdith: 120px;
@bookshelfItemHeight: 160px;
.books-container {
    display: flex;
    width: 100%;
    height: 100%;
}
.books-bookshelf {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: flex-start;
    flex-shrink: 0;
    width: @booksshelfWidth;
    height: 100%;
    overflow: auto;
    background-color: #f0efee;
    &::-webkit-scrollbar {
        width: 0;
    }
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
.books-content {
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0;
    }
    .booksContent__main {
        height: 100%;
        width: 90%;
        margin: 0 auto;
    }
}
</style>