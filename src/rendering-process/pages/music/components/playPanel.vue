<template>
    <transition name="playPanel">
        <div class="playPanel-container" v-show="show">

        </div>
    </transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const show = computed(()=> store.state.music.fullSreen);

        return {
            show
        }
    }
}
</script>

<style lang="less" scoped>
.playPanel-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
    background: #fff;
    transform-origin: left bottom;
    transition: all 1s ease-out;
}
.playPanel-enter-active,
.playPanel-leave-active {
    transition: all 1s ease-out;
}
.playPanel-enter-form,
.playPanel-leave-to {
    opacity: 0;
    transform: scale(0.16, 0.08);
}
</style>