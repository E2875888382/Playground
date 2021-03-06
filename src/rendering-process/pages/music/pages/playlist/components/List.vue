<template>
    <div class="list-container">
        <el-table :data="list" stripe style="width: 99%" @row-contextmenu="openMenu">
            <el-table-column label="音乐标题" class-name="music__title" header-align="center" sortable sort-by="name">
                <template #default="scope">
                    <span class="light music__index">{{zero(scope.$index + 1)}}</span>
                    <i class="iconfont icon-1_music89 icon__like"></i>
                    <i class="iconfont icon-xiazai1 icon__download"></i>
                    <span class="black">{{scope.row.name}}</span>
                    <span v-if="scope.row.mv" class="icon-mv">MV<i class="iconfont icon-Playerplay"></i></span>
                </template>
            </el-table-column>
            <el-table-column label="歌手" width="180" sortable sort-by="ar">
                <template #default="scope">
                    {{getAuthors(scope.row.ar)}}
                </template>
            </el-table-column>
            <el-table-column prop="al.name" label="专辑" width="180" sortable sort-by="al.name"/>
            <el-table-column label="时长" width="80" sortable sort-by="dt">
                <template #default="scope">
                    {{getTime(scope.row.dt)}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    props: {
        list: Array
    },
    setup() {
        const store = useStore();
        const getAuthors = arr=> {
            return arr.map(item=> item.name).join('/');
        };
        const zero = n=> n < 10 ? '0' + n : n;
        const getTime = dt=> {
            const source = Math.floor(dt / 1000);
            const m = Math.floor(source / 60);
            const s = source % 60;

            return `${zero(m)}:${zero(s)}`;
        };
        const openMenu = row=> {
            store.commit('music/addToPlaylist', row);
        };

        return {
            getAuthors,
            getTime,
            zero,
            openMenu
        }
    }
}
</script>

<style lang="less" scoped>
.light {
    color: #c0c4cc9c;
}
.black {
    color: #333;
}
.list-container {
    max-width: 100%;
    padding-left: 15px;
}
.el-table .cell {
    font-weight: 400;
    font-size: 16px;
    color: #606266d6;
    .font-overflow;
    -webkit-line-clamp: 1;
}
.music__title {
    padding-left: 15px;
    .icon-mv {
        padding-left: 2px;
        margin-left: 5px;
        font-size: 12px;
        line-height: 15px;
        color: red;
        border: 1px solid red;
        border-radius: 4px;
        .icon-Playerplay {
            font-size: 12px;
            line-height: 18px;
        }
    }
}
.music__index {
    margin-right: 20px;
}
.icon__like,
.icon__download {
    margin-right: 10px;
    font-size: 20px;
}
</style>