<template>
    <div class="playlist-drawer" v-if="show">
        <Switch :list="['播放列表', '历史记录']" v-model:activeId="activeId"/>
        <el-table 
            :data="playlist" 
            stripe 
            style="width: 100%" 
            v-show="!activeId" 
            height="calc(100% - 75px)" 
            empty-text=" "
            @row-contextmenu="openMenu"
        >
            <el-table-column :label="'总'+ playlist.length +'首'" class-name="music__title">
                <template #default="scope">
                    <i class="iconfont icon-Playerplay activeIcon" v-if="scope.$index === currentMusicIndex"></i>
                    <span class="black" :class="{'active': scope.$index === currentMusicIndex}">{{scope.row.name}}</span>
                    <span class="light" v-if="scope.row.alia.length">{{' ('+ scope.row.alia.join('/') + ') '}}</span>
                    <span v-if="scope.row.mv" class="icon-mv">MV<i class="iconfont icon-Playerplay"></i></span>
                </template>
            </el-table-column>
            <el-table-column label=" " width="140">
                <template #default="scope" >
                    <span :class="{'active': scope.$index === currentMusicIndex}">{{getAuthors(scope.row.ar)}}</span>
                </template>
            </el-table-column>
            <el-table-column label=" " width="100">
                <template #default="scope">
                    {{getTime(scope.row.dt)}}
                </template>
            </el-table-column>
        </el-table>
        <el-table 
            :data="history" 
            stripe 
            style="width: 100%" 
            v-show="activeId" 
            height="calc(100% - 75px)" 
            empty-text=" "
            @row-contextmenu="openHistoryMenu"
        >
            <el-table-column :label="'总'+ history.length +'首'" class-name="music__title">
                <template #default="scope">
                    <span class="black">{{scope.row.name}}</span>
                    <span class="light" v-if="scope.row.alia.length">{{' ('+ scope.row.alia.join('/') + ') '}}</span>
                    <span v-if="scope.row.mv" class="icon-mv">MV<i class="iconfont icon-Playerplay"></i></span>
                </template>
            </el-table-column>
            <el-table-column label=" " width="140">
                <template #default="scope">
                    {{getAuthors(scope.row.ar)}}
                </template>
            </el-table-column>
            <el-table-column label=" " width="130">
                <template #default="scope">
                    {{scope.row.playTime}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue';
import { useStore } from 'vuex';
import Switch from '../components/switch';
export default {
    components: {
        Switch
    },
    props: {
        show: Boolean
    },
    setup() {
        const menu = inject('menu');
        const activeId = ref(0);
        const store = useStore();
        const playlist = computed(()=> store.state.music.playlist);
        const history = computed(()=> store.state.music.history);
        const currentMusicIndex = computed(()=> store.state.music.currentMusicIndex);
        const zero = n=> n < 10 ? '0' + n : n;
        const getTime = dt=> {
            const source = Math.floor(dt / 1000);
            const m = Math.floor(source / 60);
            const s = source % 60;

            return `${zero(m)}:${zero(s)}`;
        };
        const openMenu = row=> {
            menu([
                {
                    label: '播放',
                    click() {
                        store.commit('music/updateCurrentMusicIndex', row);
                        store.commit('music/addToHistory', row);
                    }
                },
                {
                    label: '删除',
                    click() {
                        store.commit('music/deleteFromPlayList', row.id);
                    }
                }
            ])
        };
        const openHistoryMenu = row=> {
            menu([
                {
                    label: '播放',
                    click() {
                        store.commit('music/updateCurrentMusicIndex', row);
                        store.commit('music/addToHistory', row);
                    }
                },
                {
                    label: '删除',
                    click() {
                        store.commit('music/deleteFromHistory', row.id);
                    }
                }
            ])
        };

        return {
            activeId,
            playlist,
            history,
            getTime,
            zero,
            openMenu,
            openHistoryMenu,
            currentMusicIndex,
            getAuthors: arr=> arr.map(item=> item.name).join('/')
        }
    }
}
</script>

<style lang="less" scoped>
.playlist-drawer {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 525px;
    box-shadow: -2px 0px 4px #ddd;
    background-color: #fff;
    z-index: 6;
}
.light {
    color: #c0c4cc9c;
}
.black {
    color: #333;
}
.active {
    color: #ff0000a1;
}
.activeIcon {
    position: absolute;
    left: 10px;
    color: red;
}
.music__title {
    position: relative;
    padding-left: 15px;
}
.el-table .cell {
    font-weight: 400;
    font-size: 16px;
    color: #606266d6;
    .font-overflow;
    -webkit-line-clamp: 1;
}
.el-table__body-wrapper {
    .customScroll;
}
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
</style>