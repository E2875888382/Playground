<template>
    <div class="recommend-container">
        <p class="title"><span>推荐歌单</span><i class="el-icon-arrow-right"></i></p>
        <div class="list-box">
            <div class="list-item">
                <div class="list-item_content">
                    <el-image class="list-item__img list-item__img_daily" :src="list[9].picUrl" alt="" fit="fit" :lazy="true"/>
                    <i class="iconfont icon-rili"></i>
                    <span class="list-item__date">{{date}}</span>
                    <div class="list-item__icon">
                        <i class="iconfont icon-Playerplay"></i>
                    </div>
                    <p class="list-item__tips">根据您的音乐口味生成每日更新</p>
                </div>
                <p class="list-item__name">每日推荐</p>
            </div>
            <div class="list-item" v-for="item in list.slice(0, 9)" :key="item.id" @click="toPlaylist(item.id)">
                <div class="list-item_content">
                    <el-image class="list-item__img" :src="item.picUrl" alt="" fit="fit" :lazy="true">
                        <template #placeholder>
                            <div class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </template>
                    </el-image>
                    <div class="list-item__icon">
                        <i class="iconfont icon-Playerplay"></i>
                    </div>
                </div>
                <p class="list-item__name">{{item.name}}</p>
                <span class="list-item__num"><i class="iconfont icon-bofang"></i>{{format(item.playCount, 100000)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
export default {
    props: {
        list: Array
    },
    setup() {
        const router = useRouter();
        const toPlaylist = id=> router.push(`/music/playlist/${id}`);

        return {
            toPlaylist,
            date: new Date().getDate(),
            format: inject('numFormat')
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
.list-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.list-item {
    position: relative;
    width: 19%;
    .el-image {
        border-radius: 5px;
    }
    cursor: pointer;
    &:hover {
        .list-item__icon {
            opacity: 1;
            animation: iconShow 4s ease-in forwards;
        }
        .list-item__tips {
            transform: translateY(0);
        }
    }
    overflow: hidden;
}
@keyframes iconShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.list-item__name {
    margin: 5px 0 20px 0;
    .font-overflow;
    line-height: 28px;
}
.list-item__num {
    position: absolute;
    top: 3px;
    right: 8px;
    color: #fff;
    font-size: 15px;
    i {
        padding-right: 3px;
    }
}
.list-item_content {
    position: relative;
    
}
.list-item__img_daily {
    filter: blur(3px);
}
.icon-rili {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 100px;
    transform: translate(-50%, -50%);
    color: #fff;
}
.list-item__date {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 35px;
    transform: translate(-50%, -50%);
    padding-top: 22px;
    color: #fff;
}
.list-item__icon {
    .flex-center;
    position: absolute;
    bottom: 15px;
    right: 10px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    .icon-Playerplay {
        color: red;
        font-size: 30px;
    }
    opacity: 0;
}
.list-item__tips {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 10px;
    font-size: 15px;
    line-height: 2;
    color: #fff;
    background-color: #333;
    transform: translateY(-100%);
    opacity: 0.8;
    transition: all .7s ease;
}
</style>