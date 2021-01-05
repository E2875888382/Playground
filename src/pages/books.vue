 <template>
    <div class="books-container">
        <button @click="request">测试请求</button>
    </div>
</template>

<script>
import api from '../api/base';
export default {
    methods: {
        async request() {
            const res = await api();

            console.log(res);
        }
    }
}
</script>

<style lang="less" scoped>
.books-container {
    width: 100%;
    height: 100%;
}
</style>