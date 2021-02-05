<template>
    <el-card style="margin-bottom:15px">
        <div class="side-bar__title">
            <el-divider><i :class="icon"></i>{{title}}</el-divider>
            <div class="title__link_more" @click="jump('cats')">
                <span>更多</span><i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="side-bar__class">
            <div 
                class="side-bar__classItem" 
                shadow="hover" 
                v-for="(booksClass, index) in classes" 
                :key="index"
                @click="toClassDetail(booksClass.name, gender)"
            >
                <p class="classItem__name">{{booksClass.name}}</p>
                <p class="classItem__count">{{booksClass.bookCount}}</p>
            </div>
        </div>
    </el-card>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
export default {
    props: {
        gender: String,
        title: String,
        classes: Array,
        icon: String
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const toClassDetail = (major, gender)=> router.push({name: 'booksCatsDetail', params: {major,gender}});
        const jump = path=> {
            router.push(`/books/${path}`);
            store.commit('config/updateTabsPath', {tabsIndex: 2, path: `/books/${path}`});
        };

        return {
            toClassDetail,
            jump
        }
    }
}
</script>

<style lang="less" scoped>
@sideBarWidth: 280px;
@bookClassesHeight: 60px;
i {
    margin-right: 5px;
    color: red;
}
.el-icon-arrow-right {
    color: #333;
}
.side-bar__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 20px;
    .title__link_more {
        flex-basis: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1px 0 0 10px;
        font-size: 12px;
        cursor: pointer;
    }
}
.side-bar__class {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    width: @sideBarWidth;
    background: #FFF;
    &::after {
        content: '';
        flex: 0 0 50%;
    }
    .side-bar__classItem {
        width: 50%;
        height: @bookClassesHeight;
        cursor: pointer;
        font-size: 14px;
        .classItem__name {
            margin: 0;
            text-align: center;
            line-height: calc(@bookClassesHeight / 2);
        }
        .classItem__count {
            margin: 0;
            text-align: center;
            line-height: calc(@bookClassesHeight / 2);
        }
        &:hover {
            .classItem__name {
                color: #d82626;
            }
        }
    }
}
</style>