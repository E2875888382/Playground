import { defineComponent } from 'vue';

export default defineComponent({
    render() {
        return (
            <section style="padding: 20px">
                <header style="display: flex;justify-items: space-between;">
                    <el-skeleton-item variant="image" style="width: 240px; height: 240px;flex: 0 0 240px"/>
                    <section style="height: 240px; flex-grow: 1;padding:20px;box-sizing:border-box">
                        {
                            new Array(10).fill(0).map(()=> <el-skeleton-item variant="p"/>)
                        }
                    </section>
                </header>
                <section style="padding:10px 0;box-sizing:border-box">
                    {
                        new Array(18).fill(0).map(()=> <el-skeleton-item variant="p" style="width: 100%" />)
                    }
                </section>
            </section>
        )
    }
})
