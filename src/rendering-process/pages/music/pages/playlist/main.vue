<template>
    <el-skeleton :loading="loading" animated>
        <template #default>
            <div class="playlist-container">
                <div class="playlist-header">
                    <el-image class="playlist__cover" :src="data.playlist.coverImgUrl + '?param=230y230'" alt="" fit="fit">
                        <template #placeholder>
                            <div class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </template>
                    </el-image>
                    <div class="playlist__des">
                        <h2 class="align-center playlist__name">
                            <el-tag type="danger" effect="plain">歌单</el-tag>
                            <span class="playlist__nameContent">{{data.playlist.name}}</span>
                        </h2>
                        <div class="playlist__creator">
                            <el-avatar :size="30" :src="data.playlist.creator.avatarUrl" />
                            <span class="playlist__creatorName">{{data.playlist.creator.nickname}}</span>
                            <span class="playlist__createTime">{{getDate(data.playlist.createTime)}}创建</span>
                        </div>
                        <div class="playlist__btns">
                            <el-button type="danger" round @click="handlePlayAll">
                                <i class="iconfont icon-Playerplay"></i> 
                                <span>播放全部</span>
                                <i class="el-icon-plus" @click.stop="handleAddAll"></i> 
                            </el-button>
                            <el-button round :disabled="!data.playlist.subscribed">
                                <i class="el-icon-folder-add"></i>
                                收藏({{numFormat(data.playlist.subscribedCount)}})
                            </el-button>
                            <el-button round @click="handleShare">
                                <i class="el-icon-share"></i>
                                分享({{numFormat(data.playlist.shareCount)}})
                            </el-button>
                            <el-button round @click="handleDownloadAll">
                                <i class="iconfont icon-xiazai1"></i>
                                下载全部
                            </el-button>
                        </div>
                        <p class="playlist__tags" v-if="data.playlist.tags.length">标签 : {{joinArr(data.playlist.tags)}}</p>
                        <p class="playlist__count">
                            <span>歌曲 : {{numFormat(data.playlist.trackCount)}}</span>
                            <span>播放 : {{numFormat(data.playlist.playCount)}}</span>
                        </p>
                        <p class="playlist__description" v-if="data.playlist.description">简介 : {{data.playlist.description}}</p>
                    </div>
                </div>
                <div style="position:relative">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="歌曲列表" name="first">
                            <List :list="songsFilter" />
                        </el-tab-pane>
                        <el-tab-pane :label="`评论(${data.playlist.commentCount})`" name="second">
                            <Comments />
                        </el-tab-pane>
                        <el-tab-pane label="收藏者" name="third">
                            <Collectors />
                        </el-tab-pane>
                    </el-tabs>
                    <el-input
                        v-show="activeName === 'first'"
                        placeholder="搜索歌单音乐"
                        suffix-icon="el-icon-search"
                        v-model="search"
                        :clearable="true"
                        @input="searchMusic"
                    />
                </div>
            </div>
        </template>
        <template #template>
            <Skeleton />
        </template>
    </el-skeleton>
</template>

<script>
import { computed, inject, onActivated, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import List from './components/List';
import Comments from './components/Comments';
import Collectors from './components/Collectors';
import { remote } from 'electron';
import Skeleton from './components/Skeleton';
import { useStore } from 'vuex';
export default {
    components: {
        List,
        Comments,
        Collectors,
        Skeleton
    },
    setup() {
        const loading = ref(true);
        const search = ref('');
        const activeName = ref('first');
        const songs = ref([]);
        const data = ref({});
        const route = useRoute();
        const store = useStore();
        const { getPlaylist, getSongDetail } = inject('api').music.find;
        const joinArr = arr=> arr.join('／');
        const getPlaylistDetail = async id=> {
            loading.value = true;
            const res = await getPlaylist(id);

            if (res && res.code === 200) loading.value = false;
            data.value = res;
            const songsRes = await getSongDetail(res.playlist.trackIds.map(item=> item.id));

            songs.value = songsRes?.songs;
        };
        const getDate = time=> {
            const date = new Date(time);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return `${year}-${month[1] ? month : '0' + month}-${day[1] ? day : '0' + day}`;
        };
        const handleAddAll = ()=> {
            store.commit('music/updatePlaylist', songsFilter.value);
        };
        const handlePlayAll = ()=> {
            store.commit('music/updatePlaylist', songsFilter.value);
        };
        const handleShare = ()=> {
            const {playlist:{description, name, coverImgUrl}} = data.value;
            let baseUrl = `https://music.163.com/#/playlist?id=${route.params.id}`;
            let shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=';

            shareUrl += baseUrl;
            shareUrl += '&showcount=1&desc=♪我发现一个不错的歌单-' + (description || name);
            shareUrl += '&summary=分享摘要&title=♪我发现一个不错的歌单-' + name;
            shareUrl += '&site=https://music.163.com/&pics=' + coverImgUrl;

            remote.shell.openExternal(shareUrl);
        };
        const handleDownloadAll = ()=> {
            console.log('下载全部');
        };
        const numFormat = n=> {
            return +n > 10000 ? Math.floor(n / 10000) + '万' : n;
        };
        const searchMusic = val=> {
            search.value = val;
        };
        const songsFilter = computed(()=> {
            return songs.value.filter(item=> item.name.includes(search.value));
        });


        onActivated(()=> {
            getPlaylistDetail(route.params.id);
        })

        // 后续keep-alive下相同路径不同params不会触发Activated
        onBeforeRouteUpdate((to, from)=> {
            if (to.name === from.name && to.name === 'musicPlaylist' && to.params.id !== from.params.id) {
                getPlaylistDetail(to.params.id);
            }
        })
        return {
            loading,
            searchMusic,
            search,
            joinArr,
            data,
            activeName,
            getDate,
            handleAddAll,
            handlePlayAll,
            handleDownloadAll,
            handleShare,
            numFormat,
            songs,
            songsFilter
        }
    }
}
</script>

<style lang="less" scoped>
.playlist-container {
    max-width: 100%;
}
.align-center {
    display: flex;
    align-items: center;
}
.playlist-header {
    display: flex;
    padding: 37px;
}
.playlist__name {
    margin: 0 0 10px 0;
    .playlist__nameContent {
        padding-left: 12px;
        font-size: 28px;
    }
}
.playlist__cover {
    flex-shrink: 0;
    height: 230px;
    border-radius: 5px;
    border: 1px solid #ebeef5;
}
.playlist__des {
    flex-grow: 1;
    padding: 0 20px;
    .el-tag {
        height: 25px;
        padding: 0 5px;
        font-size: 16px;
        line-height: 25px;
        font-weight: normal;
    }
}
.playlist__creator {
    .align-center;
    margin-bottom: 10px;
    line-height: 40px;
}
.playlist__creatorName {
    margin-left: 10px;
}
.playlist__createTime {
    margin-left: 10px;
    font-size: 15px;
    color: #606266;
}
.playlist__btns {
    margin-bottom: 16px;
    .el-button {
        padding: 7px 20px;
        border-radius: 70px;
        font-size: 18px;
        line-height: 24px;
        &:nth-of-type(1) {
            padding: 7px 5px 7px 15px;
            span {
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    top: -7px;
                    right: -8px;
                    height: 36px;
                    width: 1px;
                    background-color: #ddd;
                    opacity: 0.3;
                }
            }
        }
        i {
            padding-right: 5px;
        }
        .el-icon-plus {
            margin-left: 15px;
            z-index: 5;
        }
    }
}
.playlist__count {
    color: #333;
    span {
        margin-right: 20px;
    }
}
.el-tabs {
    max-width: 100%;
    &:deep(.el-tabs__header) {
        padding-left: 40px;
    }
    &:deep(.el-tabs__nav-wrap::after) {
        display: none;
    }
    &:deep(.el-tabs__item.is-active) {
        font-weight: bold;
        color: #333;
    }
    &:deep(.el-tabs__item) {
        &:hover {
            color: #333;
        }
        font-size: 18px;
    }
    &:deep(.el-tabs__active-bar) {
        height: 4px;
        background-color: red;
    }
}
.playlist__tags,
.playlist__description,
.playlist__count {
    margin: 5px 0;
    font-weight: 345;
}
.playlist__description {
    .font-overflow;
    -webkit-line-clamp: 1;
}
.el-input {
    position: absolute;
    top: 5px;
    right: 20px;
    width: 238px;
    &:deep(.el-input__inner) {
        height: 30px;
        border: none;
        border-radius: 50px;
        line-height: 30px;
        color: #333;
        background-color:#f5f5f594;
        &:focus {
            background: #FFF;
        }
    }
    &:deep(.el-input__suffix) {
        .flex-center;
    }
}
</style>