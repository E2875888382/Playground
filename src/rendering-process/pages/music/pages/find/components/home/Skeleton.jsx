import { defineComponent } from 'vue';

export default defineComponent({
    render() {
        return (
            <section style="padding: 20px">
                <el-skeleton-item variant="image" style="height: 255px;flex: 0 0 100%"/>
                <section style="display: flex;justify-content: space-between;padding:10px 0;">
                    {new Array(5).fill(0).map(()=> <el-skeleton-item variant="image" style="height: 210px;flex: 0 0 19%"/>)}
                </section>
                <section style="display: flex;justify-content: space-between;padding:10px 0;">
                    {new Array(5).fill(0).map(()=> <el-skeleton-item variant="image" style="height: 210px;flex: 0 0 19%"/>)}
                </section>
                <section style="display: flex;justify-content: space-between;padding:10px 0;">
                    {new Array(3).fill(0).map(()=> <el-skeleton-item variant="rect" style="height: 210px;flex: 0 0 32%"/>)}
                </section>
            </section>
        )
    }
})
