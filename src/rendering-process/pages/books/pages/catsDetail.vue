<template>
    <div class="books-catsDetail">
        <nav-bar :title="title" @back="back('cats')" />
        <div class="books-catsDetail__container">
            <div class="books-catsDetail__type">
                <el-tag 
                    v-for="(value, key) in types" :key="key" 
                    :type="currentType === key ? 'danger' : ''" 
                    effect="plain" 
                    class="books-catsDetail__tags"
                    @click="changeType(key)"
                >
                    {{value}}
                </el-tag>
            </div>
            <el-divider></el-divider>
            <div class="books-catsDetail__mins">
                <el-tag 
                    v-for="(min, index) in currentCat" :key="index" 
                    :type="currentMins === min ? 'danger' : ''" 
                    effect="plain"
                    class="books-catsDetail__tags"
                    @click="changeMins(min)"
                >
                    {{min}}
                </el-tag>
            </div>
            <el-divider></el-divider>
            <div class="books-catsDetail__content" v-infinite-scroll="loadMore">
                <books-list :from="`catsDetail/${title}/${genderTitle}`" :list="cache"/>
            </div>
        </div>
        <el-backtop target=".books-catsDetail__content"></el-backtop>
    </div>
</template>

<script>
import { computed, inject, onActivated, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import navBar from '../components/navBar';
import booksList from '../components/booksList';
export default {
    components: {
        'nav-bar': navBar,
        'books-list': booksList
    },
    setup() {
        const loadEnd = ref(false); // 没有更多了
        const page = ref(0);
        const cache = ref([]);
        const currentType = ref('热门');
        const currentMins = ref('全部');
        const { booksCats, booksCatsDetail } = inject('api').booksCats;
        const allCats = ref({});
        const title = ref('');
        const genderTitle = ref('');
        const router = useRouter();
        const route = useRoute();
        const back = path=> router.push(`/books/${path}`);
        const arr2Map = arr=> {
            let map = {};

            for (const {major, mins} of arr) {
                map[major] = ['全部', ...mins];
            }
            return map;
        };
        const getCats = async()=> {
            const {female, male, press} = await booksCats();
            const map = {female:arr2Map(female), male:arr2Map(male), press:arr2Map(press)};

            allCats.value = map;
        };
        const getCatsDetail = async()=> {
            const res = await booksCatsDetail({
                gender: genderTitle.value,
                major: title.value,
                type: currentType.value,
                minor: currentMins.value === '全部' ? '' : currentMins.value,
                start: page.value
            });

            if (res?.books.length === 0) {
                loadEnd.value = true;
            }
            if (page.value === 0) {
                // 切换过tag, 直接替换
                cache.value = res?.books;
            } else {
                // 同一个tag下加载，增量更新
                cache.value = [...Array.from(cache.value), ...res?.books];
            }
            page.value++;
        };
        const changeType = (key)=> {
            if (currentType.value !== key) {
                 // 切换不同tag，重置分页
                page.value = 0;
                currentType.value = key;
                loadEnd.value = false;
                getCatsDetail();
            }
        };
        const changeMins = (min)=> {
            if (currentMins.value !== min) {
                // 切换不同tag，重置分页
                page.value = 0;
                currentMins.value = min;
                loadEnd.value = false;
                getCatsDetail();
            }
        };
        const loadMore = ()=> {
            getCatsDetail();
        };

        onMounted(()=> {
            getCats();
            currentType.value = 'hot';
            currentMins.value = '全部';
        });
        onActivated(()=> {
            // 重置变量
            page.value = 0;
            loadEnd.value = false;
            cache.value = [];
            const {major, gender} = route.params;

            title.value = major;
            genderTitle.value = gender;
            getCatsDetail();
        });
        return {
            page,
            cache,
            back,
            title,
            allCats,
            genderTitle,
            getCatsDetail,
            currentCat: computed(()=> allCats.value?.[genderTitle.value]?.[title.value]),
            types: {
                hot: '热门',
                new: '新书',
                reputation: '好评',
                over: '完结',
                monthly: '包月'
            },
            currentType,
            currentMins,
            changeType,
            changeMins,
            loadMore,
            loadEnd
        }
    }
}
</script>

<style lang="less" scoped>
.books-catsDetail {
    width: 100%;
    height: 100%;
}
.books-catsDetail__container {
    height: calc(100% - 60px);
}
.books-catsDetail__type,
.books-catsDetail__mins {
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
}
.el-divider--horizontal {
    margin: 0;
}
.books-catsDetail__tags {
    width: 100px;
    margin: 0 10px;
    text-align: center;
    cursor: pointer;
}
.books-catsDetail__content {
    height: calc(100% - 150px);
    width: 100%;
    margin-top: 10px;
    .overfloScroll;
}
</style>