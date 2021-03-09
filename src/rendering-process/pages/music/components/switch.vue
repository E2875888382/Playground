<template>
    <div class="switch-container" :style="{width: 130 * list.length +'px'}">
        <div
            v-for="(item, index) in list" :key="index" 
            :class="['switch-item', {'switch-item_active': activeId === index}]" 
            @click="changeTab(index)"
        >
            {{item}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array,
        activeId: Number
    },
    setup(props, context) {
        const changeTab = index=> {
            context.emit('update:activeId', index);
        };

        return {
            changeTab
        }
    }
}
</script>

<style lang="less" scoped>
.switch-container {
    .flex-center;
    margin: 20px auto;
    border: 1px solid #ddd;
    border-radius: 30px;
    background-color: #fff;
}
.switch-item {
    height: 36px;
    width: 130px;
    border-radius: 30px;
    text-align: center;
    line-height: 36px;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        background-color: #f5f7faad;
    }
}
.switch-item_active {
    color: #fffffff2;
    background-color: #c0c4cc;
    &:hover {
        background-color: #c0c4cc;
    }
}
</style>