 <template>
    <div class="pictures-container" v-infinite-scroll="loadMore">
        <el-image 
            v-for="(img, index) in imgs"
            :key="img.id"
            :src="img.img_1024_768" fit="cover"
            class="pictures__item"
            @click="preview(index)"
        />
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const router = useRouter();
        const store = useStore();
        const page = ref(0);
        const { getPictures } = inject('api').pictures;
        const imgs = computed(()=> store.state.pictures.pictures);
        const init = async ()=> {
            const res = await getPictures(page.value);

            store.commit('pictures/updatePictures', res.data);
            page.value++;
        };
        const loadMore = async ()=> {
            const res = await getPictures(page.value);
            // computed is read only
            const currentImgs = Array.from(imgs.value);

            store.commit('pictures/updatePictures', [...currentImgs, ...res.data]);
            page.value++;
        };
        const preview = index=> {
            router.push({name:'preview', params:{currentIndex:index}});
        };
        init();

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
    .overflowScroll;
    .pictures__item {
        flex-grow: 1;
        height: 180px;
        padding: 5px;
        box-sizing: border-box;
    }
}
</style>