<template>
    <div 
        class="layout-container"
        :class="customClass"
        :style="{
            background: background || '#f5f5f5'
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        background: String,
        customClass: String
    },
}
</script>

<style lang="less" scoped>
.layout-container {
    width: 100%;
    height: 100%;
}
</style>