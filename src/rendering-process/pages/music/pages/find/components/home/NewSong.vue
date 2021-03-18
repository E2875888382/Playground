<template>
    <div class="newSong-container">
        <p class="title"><span>最新音乐</span><i class="el-icon-arrow-right"></i></p>
        <div class="newSong-content">
            <div class="newSong-item" v-for="item in list.slice(0, 12)" :key="item.id">
                <div class="newSong-item__img">
                    <el-image class="newSong-item__imgContent" :src="item.picUrl + '?param=60y60'" alt="" fit="fit">
                        <template #placeholder>
                            <div class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </template>
                    </el-image>
                    <div class="newSong-item__icon">
                        <i class="iconfont icon-Playerplay"></i>
                    </div>
                </div>
                <div class="newSong-item__content">
                    <p class="newSong-item__des">{{item.name}}</p>
                    <p class="newSong-item__des">
                        <span v-if="item.song.mvid" class="newSong-item__tag">
                            MV<i class="iconfont icon-Playerplay"></i>
                        </span>
                        <span class="newSong-item__artists">{{getArtists(item.song.artists)}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    },
    setup() {
        return {
            getArtists: arr=> {
                let artists = '';

                arr.forEach((el, index) => {
                    artists += el.name + (index < arr.length - 1 ? '／' : '');
                });
                return artists;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.title {
    font-size: 25px;
    span {
        font-weight: bolder;
    }
}
.newSong-content {
    display: flex;
    flex-wrap: wrap;
}
.newSong-item {
    display: flex;
    flex: 33.33%;
    flex-grow: 0;
    height: 60px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
        .newSong-item__content {
            background-color: #90939938;
        }
    }
}
.newSong-item__img {
    flex-shrink: 0;
    position: relative;
    width: 60px;
    height: 60px;
}
.newSong-item__content {
    flex-grow: 1;
    padding: 0 8px;
    margin-right: 8px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.newSong-item__imgContent {
    border-radius: 5px;
}
.newSong-item__icon {
    .flex-center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28px;
    height: 28px;
    background-color: #fff;
    border-radius: 50%;
    .icon-Playerplay {
        color: red;
        font-size: 24px;
    }
}
.newSong-item__des {
    display: flex;
    align-items: center;
    margin: 0;
    line-height: 30px;
    font-size: 16px;
    letter-spacing: 1px;
    .font-overflow;
    -webkit-line-clamp: 1;
}
.newSong-item__artists {
    color: #999999b5;
    font-size: 15px;
}
.newSong-item__tag {
    padding: 0 4px;
    margin-right: 5px;
    font-size: 12px;
    line-height: 18px;
    color: red;
    border: 1px solid red;
    border-radius: 4px;
    .icon-Playerplay {
        font-size: 12px;
        line-height: 18px;
    }
}
</style>