 <template>
    <Layout :flex="true">
        <div class="books-bookshelf">
            <el-card class="bookshelf-item" v-for="(book, index) in bookshelf" :key="index">
                <img class="bookshelf-item__cover" :src="book.cover">
            </el-card>
        </div>
        <div class="books-content" :class="customClass">
            <div class="booksContent__main">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </div> 
    </Layout>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Layout from '../../components/Layout';
export default {
    components: {
        Layout
    },
    setup() {
        const readModes = {
            default: 'booksChaptersDetail',
            eyecare: 'booksChaptersDetail_eyecare',
            dark: 'booksChaptersDetail_dark'
        };
        const store = useStore();
        const route = useRoute();
        const customClass = computed(()=> {
            return route.name === 'booksChaptersDetail' ? readModes[store.state.config.readMode] : '';
        });

        return {
            bookshelf: computed(()=> store.state.user.bookshelf),
            customClass
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
    .overfloScroll;
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
    position: relative;
    flex-grow: 1;
    height: 100%;
    .overfloScroll;
    .booksContent__main {
        height: 100%;
        width: 90%;
        margin: 0 auto;
    }
}
</style>