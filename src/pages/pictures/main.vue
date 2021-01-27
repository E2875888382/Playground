 <template>
    <div class="pictures-container" v-infinite-scroll="loadMore">
        <el-image 
            v-for="(img, index) in imgs"
            :key="index"
            :src="img" fit="cover"
            class="pictures__item"
            @click="preview(index)"
        />
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const router = useRouter();
        const store = useStore();
        const imgs = computed(()=> store.state.pictures.pictures);
        const loadMore = ()=> {
            // computed is read only
            const currentImgs = Array.from(imgs.value);

            store.commit('pictures/updatePictures', [...currentImgs, ...currentImgs]);
        };
        const preview = index=> {
            router.push({name:'preview', params:{currentIndex:index}});
        };

        return {
            imgs,
            loadMore,
            preview
        }
    }
}
</script>

<style lang="less" scoped>
.pictures-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 5px;
    .overfloScroll;
    .pictures__item {
        flex-grow: 1;
        height: 180px;
        margin: 5px;
    }
}
</style>