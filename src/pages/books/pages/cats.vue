<template>
    <div class="books-cats">
        <nav-bar title="全部分类" @back="back" />
        <div class="cats-box" v-for="(value, key) in cats" :key="key">
            <p class="cats_main">{{key}}</p>
            <div class="cats-container">
                <div class="cats-item" v-for="(item, index) in value" :key="index" @click="toDetail(item)">
                    <p class="cats-item__name">{{item.name}}</p>
                    <p class="cats-item__count">{{item.bookCount}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import navBar from '../components/navBar';
export default {
    components: {
        'nav-bar': navBar
    },
    setup() {
        const router = useRouter();
        const cats = ref({});
        const {booksIndexClass} = inject('api').books;
        const back = ()=> router.push('/books/index');
        const getCats = async()=> {
            const {male, female, press} = await booksIndexClass();

            cats.value = {
                '男生': addType('male', male),
                '女生': addType('female', female),
                '出版': addType('press', press)
            };
        };
        const addType = (type, arr)=> {
            return arr.map(item=> {
                return {
                    ...item, 
                    type: type
                }
            })
        };
        const toDetail = item=> {
            router.push({name: 'booksCatsDetail', params: {
                major: item.name,
                gender: item.type
            }});
        };

        onMounted(getCats);
        return {
            getCats,
            cats,
            toDetail,
            back
        }
    }
}
</script>

<style lang="less" scoped>
.books-cats {
    width: 100%;
    padding-bottom: 24px;
}
.cats-box {
    width: 100%;
}
.cats_main {
    height: 40px;
    margin: 24px 0;
    line-height: 40px;
    font-size: 16px;
    color: #c0c4cc;
}
.cats-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border-top: 1px solid #ebeef5;
    &::after {
        content: '';
        flex: 0 0 190px;
    }
}
.cats-item {
    .flex-center;
    flex: 0 0 190px;
    flex-direction: column;
    height: 70px;
    cursor: pointer;
    border-bottom: 1px solid #ebeef5;
    &:hover {
        .cats-item__name {
            color: #409EFF;
        }
    }
    &__name {
        height: 30px;
        margin: 0;
        line-height: 30px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }
    &__count {
        height: 20px;
        margin: 0;
        line-height: 20px;
        font-size: 12px;
        color: #c0c4cc;
        text-align: center;
    }
}
</style>