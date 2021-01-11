 <template>
    <div class="books-container">
        <div class="books-bookshelf">
            <el-card class="bookshelf-item" v-for="(book, index) in bookshelf" :key="index">
                <img class="bookshelf-item__cover" :src="book.cover">
            </el-card>
        </div>
        <div class="books-content">
            <div class="booksContent__main">
                <books-index />
            </div>
        </div>
    </div>
</template>

<script>
import booksIndex from './index';
export default {
    components: {
        'books-index': booksIndex
    },
    setup() {
        return {
            bookshelf: [
                {
                    cover: 'http://img.1391.com/api/v1/bookcenter/cover/1/84550/84550_5ff41218ce414b53aae2a58867dd0a22.jpg/'
                },
                {
                    cover: 'http://img.1391.com/api/v1/bookcenter/cover/1/46975/46975_590362a3ff5c4f038ed9df52d09d116f.jpg/'
                },
                {
                    cover: 'http://img.1391.com/api/v1/bookcenter/cover/1/84550/84550_5ff41218ce414b53aae2a58867dd0a22.jpg/'
                },
                {
                    cover: 'http://img.1391.com/api/v1/bookcenter/cover/1/84550/84550_5ff41218ce414b53aae2a58867dd0a22.jpg/'
                },
                {
                    cover: 'http://img.1391.com/api/v1/bookcenter/cover/1/84550/84550_5ff41218ce414b53aae2a58867dd0a22.jpg/'
                }
            ]
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
        min-height: 100%;
        width: 800px;
        padding: 0 30px;
        margin: 0 auto;
    }
}
</style>