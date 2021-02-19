<template>
    <div class="music-sidebar">
        <div class="sidebar-find">
            <div 
                v-for="item in musicFindMenu" :key="item.id"
                :class="['sidebar-find__item', {'sidebar-find__item_active': activeIndex === item.id}]" 
                @click="handleChoose(item.id)"
            >
                <span>{{item.title}}</span>
            </div>
        </div>
        <div class="sidebar-mine">
            <h4 class="sidebar-mine__title">我的音乐</h4>
            <div 
                v-for="item in musicMineMenu" :key="item.id"
                :class="['sidebar-mine__item', {'sidebar-mine__item_active': activeIndex === item.id}]"
                @click="handleChoose(item.id)"
            >
                <span class="iconfont" :class="item.icon"></span>{{item.title}}
            </div>
        </div>
        <div class="sidebar-playlist_create">
            <h4 
                class="sidebar-playlist_create__title" 
                :class="{'title-icon_active': showPlayListCreate}"
                @click="showPlayListCreate = !showPlayListCreate"
            >
                创建的歌单
            </h4>
            <div v-if="showPlayListCreate">
                <div
                    v-for="item in playListCreate" :key="item.id"
                    :class="['sidebar-playlist_create__item', {'sidebar-playlist_create__item_active': activeIndex === item.id}]"
                    @click="handleChoose(item.id)"
                >
                    <span class="iconfont icon-bofangduilie"></span>
                    <span class="playlist__title">{{item.title}}</span>
                </div>
            </div>
        </div>
        <div class="sidebar-playlist_star">
            <h4 
                class="sidebar-playlist_star__title" 
                :class="{'title-icon_active': showPlayListStar}"
                @click="showPlayListStar = !showPlayListStar"
            >
                收藏的歌单
            </h4>
            <div v-if="showPlayListStar">
                <div 
                    v-for="item in playListStar" :key="item.id"
                    :class="['sidebar-playlist_star__item', {'sidebar-playlist_star__item_active': activeIndex === item.id}]"
                    @click="handleChoose(item.id)"
                >
                    <span class="iconfont icon-bofangduilie"></span>
                    <span class="playlist__title">{{item.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        const musicFindMenu = [
            {
                id: 'find-0',
                title: '发现音乐'
            },
            {
                id: 'find-1',
                title: '视频'
            },
            {
                id: 'find-2',
                title: '朋友'
            },
            {
                id: 'find-3',
                title: '私人FM'
            }
        ];
        const musicMineMenu = [
            {
                id: 'mine-0',
                title: '本地音乐',
                icon: 'icon-yinle'
            },
            {
                id: 'mine-1',
                title: '下载管理',
                icon: 'icon-xiazai1'
            },
            {
                id: 'mine-2',
                title: '我的音乐云盘',
                icon: 'icon-yunpan'
            },
            {
                id: 'mine-3',
                title: '我的收藏',
                icon: 'icon-wodeshoucang'
            }
        ]
        const activeIndex = ref('find-0');
        const showPlayListCreate = ref(false);
        const showPlayListStar = ref(false);
        const playListCreate = ref([
            {
                id: 'create-0',
                title: '英文歌'
            },
            {
                id: 'create-1',
                title: 'ElricTang的2020年度歌单'
            }
        ]);
        const playListStar = ref([
            {
                id: 'star-0',
                title: '今天从《贝多芬的悲伤》听起|私人雷达'
            },
            {
                id: 'star-1',
                title: '六月的雨，仙剑的梦'
            },
            {
                id: 'star-2',
                title: '精选百首经典纯音乐·看书学习小憩独处放松'
            },
            {
                id: 'star-3',
                title: '怀旧 | 闲暇细数90后的回忆杀'
            },
            {
                id: 'star-4',
                title: '100首经典英文歌曲排行榜'
            },
            {
                id: 'star-5',
                title: '百首良曲|刷（抄）作业必备燃曲'
            }
        ]);

        return {
            musicFindMenu,
            musicMineMenu,
            activeIndex,
            playListCreate,
            playListStar,
            showPlayListCreate,
            showPlayListStar,
            handleChoose: index=> {
                activeIndex.value = index;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.music-sidebar {
    width: 220px;
    height: 100%;
    border-right: 1px solid #ddd;
    padding: 0 20px 0 14px;
    overflow-y: scroll;
    &:hover {
        &::-webkit-scrollbar-thumb {
            background-color: #dcdfe6;
        }
    }
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track{
        background-color: transparent;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: transparent;
    }
}
.sidebar-find {
    padding-top: 15px;
    .sidebar-find__item {
        height: 45px;
        padding-left: 6px;
        margin-bottom: 2px;
        border-radius: 4px;
        font-size: 19px;
        line-height: 45px;
        cursor: pointer;
        &:hover {
            background-color: #f6f6f7;
        }
    }
    .sidebar-find__item_active {
        span {
            display: inline-block;
            height: 45px;
            padding-left: 6px;
            transform: scale(1.1);
            font-weight: bold;
        }
        background-color: #f6f6f7;
    }
}
.sidebar-mine {
    &__title {
        padding-left: 6px;
        font-size: 16px;
        color: #999999;
        font-weight: lighter;
        letter-spacing: .5px;
    }
    &__item {
        .flex-center;
        justify-content: flex-start;
        height: 45px;
        padding-left: 6px;
        margin-bottom: 2px;
        border-radius: 4px;
        font-size: 17px;
        line-height: 45px;
        font-weight: 400;
        letter-spacing: 1px;
        cursor: pointer;
        color: #333;
        &:hover {
            background-color: #f6f6f7;
        }
        .iconfont {
            margin-right: 7px;
            font-size: 20px;
            line-height: 45px;
        }
    }
    &__item_active {
        background-color: #f6f6f7;
    }
}
.sidebar-playlist_create,
.sidebar-playlist_star {
    user-select: none;
    &__title {
        position: relative;
        padding-left: 6px;
        font-size: 16px;
        color: #999999;
        font-weight: lighter;
        letter-spacing: .5px;
        cursor: pointer;
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 100px;
            width: 0;
            border: 4px solid transparent;
            border-left: 6px solid #dcdfe6;
            transform: translateY(-50%);
        }
        &:hover {
            &::after {
                border-left: 6px solid #909399;
            }
        }
    }
    &__item {
        .flex-center;
        justify-content: flex-start;
        height: 45px;
        max-width: 200px;
        padding-left: 6px;
        margin-bottom: 2px;
        border-radius: 4px;
        font-size: 17px;
        line-height: 45px;
        font-weight: 400;
        letter-spacing: 1px;
        cursor: pointer;
        color: #333;
        &:hover {
            background-color: #f6f6f7;
        }
        .iconfont {
            margin-right: 7px;
            font-size: 20px;
            line-height: 45px;
        }
    }
    &__item_active {
        background-color: #f6f6f7;
    }
}
.playlist__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
.title-icon_active {
    &::after {
        transform: translateY(-25%);
        border: 4px solid transparent;
        border-top: 6px solid #dcdfe6;
    }
    &:hover {
        &::after {
            border-left: 4px solid transparent;
            border-top: 6px solid #909399;
        }
    }
}
</style>