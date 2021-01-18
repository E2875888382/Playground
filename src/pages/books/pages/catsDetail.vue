<template>
    <div class="books-catsDetail">
        <div class="books-catsDetail__nav">
            <i class="el-icon-back" @click="back('cats')"></i>
            <span class="books-catsDetail__title">{{title}}</span>
            <i class="el-icon-s-home" @click="back('index')"></i>
        </div>
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
                <div class="books-catsDetail__item" v-for="el in cache" :key="el._id" @click="toBooksDetail(el._id, `catsDetail/${title}/${genderTitle}`)">
                    <el-image class="item-cover" :src="`http://statics.zhuishushenqi.com${el.cover}`" alt="" lazy/>
                    <div class="item-ifo">
                        <h4 class="item__title">{{el.title}}</h4>
                        <p class="item__author">{{el.author}}</p>
                        <p class="item__desc">{{el.shortIntro}}</p>
                        <p class="item__popularity">
                            <span class="popularity__num">{{el.latelyFollower}}</span><span>人气</span>
                            <el-divider direction="vertical"></el-divider>
                            <span class="popularity__num">{{el.retentionRatio}}%</span><span>读者留存</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <el-backtop target=".books-catsDetail__content"></el-backtop>
    </div>
</template>

<script>
import { computed, inject, onActivated, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const loadEnd = ref(false); // 没有更多了
        const page = ref(0);
        const cache = ref({});
        const currentType = ref('热门');
        const currentMins = ref('全部');
        const {booksCats, booksCatsDetail} = inject('api').booksCats;
        const allCats = ref({});
        const title = ref('');
        const genderTitle = ref('');
        const router = useRouter();
        const route = useRoute();
        const back = (path)=> router.push(`/books/${path}`);
        const arr2Map = (arr)=> {
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
            console.log(cache.value);
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
            loadEnd,
            toBooksDetail: inject('toBooksDetail')
        }
    }
}
</script>

<style lang="less" scoped>
.el-icon-back,
.el-icon-s-home {
    flex-basis: 40px;
    text-align: center;
    line-height: 50px;
    color: #bbb;
    cursor: pointer;
}
.books-catsDetail {
    width: 100%;
    height: 100%;
}
.books-catsDetail__container {
    height: calc(100% - 60px);
}
.books-catsDetail__nav {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #DCDFE6;
    }
}
.books-catsDetail__title {
    flex-grow: 1;
    text-align: center;
    font-weight: bold;
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
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
}
.books-catsDetail__item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 122px;
    margin-bottom: 20px;
    cursor: pointer;
    .item-cover {
        flex-shrink: 0;
        width: 90px;
        height: 120px;
        border: 1px solid #ebebeb;
        box-shadow: 2px 4px 6px #bbb;
    }
    .item-ifo {
        flex-grow: 1;
        height: 122px;
        padding: 0 10px;
    }
    .item__title {
        margin: 0;
        font-size: 14px;
        line-height: 25px;
    }
    .item__author {
        margin: 0;
        font-size: 12px;
        line-height: 22px;
    }
    .item__desc {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 40px;
        margin: 3px 0;
        overflow: hidden;
        color: #999;
        text-overflow: ellipsis;
        font-size: 13px;
        line-height: 20px;
    }
    .item__popularity {
        height: 20px;
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 12px;
        line-height: 20px;
        .popularity__num {
            margin-right: 3px;
            color: #d82626;
        }
    }
}
</style>