<script lang="jsx">
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();

        return {
            titleBars: computed(()=> store.state.config.titleBars)
        }
    },
    render() {
        return (
            <div class="title-bar">
                {
                    this.titleBars.map(titleBar=> {
                        return <div onclick={titleBar.event} class="title-bar__item"><i class={`el-icon-${titleBar.icon}`}/></div>
                    })
                }
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.title-bar {
    display: flex;
    justify-content: flex-end;
    height: 30px;
    -webkit-app-region: drag;
    background-color: transparent;
    .border_bottom(#e7e7e7);
}
.title-bar__item {
    .flex-center;
    width: 50px;
    height: 30px;
    font-size: 15px;
    opacity: 0.6;
    &:hover {
        opacity: 1;
    }
    -webkit-app-region: no-drag;
}
</style>