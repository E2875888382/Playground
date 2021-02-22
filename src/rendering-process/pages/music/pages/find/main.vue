<template>
    <div class="find-container">
        <el-affix :offset="30" :z-index="5">
            <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item v-for="item in tabs" :key="item.index" :index="item.index">
                    <span>{{item.title}}</span>
                </el-menu-item>
            </el-menu>
        </el-affix>
        <keep-alive>
            <component :is="component" />
        </keep-alive>
    </div>
</template>

<script>
import { ref } from 'vue';
import Home from './pages/home';
import PlayList from './pages/playList';
export default {
    components: {
        'Home': Home,
        'PlayList': PlayList
    },
    setup() {
        const component = ref('Home');
        const tabs = [
                {
                    title: '个性推荐',
                    index: '1',
                    component: 'Home'
                },
                {
                    title: '歌单',
                    index: '2',
                    component: 'PlayList'
                },
                {
                    title: '主播电台',
                    index: '3',
                    component: 'Home'
                },
                {
                    title: '排行榜',
                    index: '4',
                    component: 'PlayList'
                },
                {
                    title: '歌手',
                    index: '5',
                    component: 'Home'
                },
                {
                    title: '最新音乐',
                    index: '6',
                    component: 'PlayList'
                }
            ];
        const handleSelect = index=> {
            component.value = tabs[index - 1].component;
        };

        return {
            handleSelect,
            component,
            tabs
        }
    }
}
</script>

<style lang="less" scoped>
.find-container {
    &:deep(.el-affix) {
        width: 100% !important;
    }
    .el-menu.el-menu--horizontal {
        padding: 10px 10px;
        background-color: #fff;
        border: none;
    }
    .el-menu-item {
        span {
            display: inline-block;
            height: 60px;
            font-size: 20px;
            line-height: 60px;
            color: #333;
            opacity: 0.8;
            &:hover {
                opacity: 1;
            }
        }
    }
    .el-menu-item.is-active {
        span {
            transform: scale(1.2);
            color: #0c0c0c;
            opacity: 1;
            font-weight: bolder;
        }
        border-bottom: 2px solid red;
    }
}
</style>