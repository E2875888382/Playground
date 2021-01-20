<template>
    <div class="navBar-container">
        <i class="el-icon-back" @click="back"></i>
        <span class="navBar__title">{{title}}</span>
        <i class="el-icon-s-home" @click="home"></i>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    emits: ['back'],
    setup(props, context) {
        const router = useRouter();

        return {
            back: ()=> context.emit('back'),
            home: ()=> router.push('/books/index')
        }
    }
}
</script>

<style lang="less" scoped>
.navBar-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #DCDFE6;
    }
}
.el-icon-back,
.el-icon-s-home {
    flex-basis: 40px;
    text-align: center;
    line-height: 50px;
    color: #bbb;
    cursor: pointer;
}
.navBar__title {
    flex-grow: 1;
    text-align: center;
    font-weight: bold;
}
</style>