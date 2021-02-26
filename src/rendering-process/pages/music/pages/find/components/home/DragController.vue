<template>
    <div class="dragController-container">
        <span class="title">现在可以根据个人喜好，自由调整首页栏目顺序啦~</span>
        <el-button plain @click="dialogVisible = !dialogVisible">调整栏目顺序</el-button>
        <el-dialog
            :center="true"
            v-model="dialogVisible"
            width="480px"
            custom-class="dragController-dialog"
            :close-on-click-modal="false"
            top="40px"
        >
            <template #title>
                <h4 class="dragController__title">调整栏目顺序</h4>
            </template>
            <p class="dragController__tips"><i class="el-icon-info"></i> 想调整首页栏目的顺序？按住右边的按钮拖动即可</p>
            <transition-group name="flip-list">
                <div 
                    class="flip-item" 
                    v-for="(item, index) in list_inner" :key="item.title"
                    draggable="true"
                    @dragstart="dragStart(item, index, $event)"
                    @dragenter.prevent="dragEnter(item, index, $event)"
                    @dragover.prevent="dragOver"
                >
                    <span>{{item.title}}</span>
                    <i class="el-icon-s-operation"></i>
                </div>
            </transition-group>
            <p class="reset__btn" @click="reset"><span>恢复默认排序</span></p>
            <template #footer>
                <div class="dragController-dialog__footer">
                    <el-button type="danger" round @click="sortComponents">确定</el-button>
                    <el-button round @click="dialogVisible = !dialogVisible">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    props: {
        list: Array
    },
    setup(props, context) {
        const oldEl = ref({
            item: {},
            index: 0
        });
        const list_inner = ref(props.list.slice());
        const dialogVisible = ref(false);
        const sortComponents = ()=> {
            dialogVisible.value = !dialogVisible.value;
            context.emit('sort', list_inner.value);
        };
        const reset = ()=> {
            list_inner.value = [
                {
                    title: '推荐歌单',
                    component: 'RecommendPlayList',
                    data: 'playlist'
                },
                {
                    title: '独家放送',
                    component: 'PrivateContent',
                    data: 'privateContent'
                },
                {
                    title: '最新音乐',
                    component: 'NewSong',
                    data: 'newSong'
                },
                {
                    title: '推荐MV',
                    component: 'Mv',
                    data: 'mv'
                },
                {
                    title: '主播电台',
                    component: 'Dj',
                    data: 'dj'
                }
            ];
        };
        const dragStart = (item, index, event)=> {
            oldEl.value.item = item;
            oldEl.value.index = index;
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
        };
        const dragEnter = (enterItem, enterItemIndex, event)=> {
            const {item, index} = oldEl.value;

            if (item.title !== enterItem.title) {
                const copy = [...list_inner.value];

                [copy[index], copy[enterItemIndex]] = [copy[enterItemIndex], copy[index]];
                list_inner.value = [...copy];
                oldEl.value.item = enterItem;
                oldEl.value.index = enterItemIndex;
            }
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
        };
        const dragOver = event=> {
            event.dataTransfer.dropEffect = 'move';
        };

        return {
            dialogVisible,
            sortComponents,
            reset,
            list_inner,
            oldEl,
            dragStart,
            dragEnter,
            dragOver
        }
    }
}
</script>

<style lang="less" scoped>
.dragController-container {
    .flex-center;
    flex-direction: column;
    padding: 20px 0 80px 0;
}
.title {
    margin-bottom: 15px;
    color: #999;
    font-size: 18px;
    font-weight: 300;
}
.dragController__title {
    font-size: 20px;
}
.dragController__tips {
    color: #999;
    font-size: 15px;
    font-weight: 300;
}
.dragController-container {
    &:deep(.el-dialog__body) {
        padding-top: 0;
    }
    &:deep(.dragController-dialog) {
        border-radius: 10px;
    }
}
.dragController-dialog__footer {
    padding-bottom: 20px;
    .el-button {
        padding: 12px 35px;
        font-size: 18px;
    }
}
.flip-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    margin: 0 20px;
    border-bottom: 1px solid #ebeef5d6;
    font-size: 20px;
    cursor: move;
}
.reset__btn {
    margin-top: 20px;
    font-size: 14px;
    color: #999;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
}
.flip-list-move {
    transition: transform 1s;
}
</style>