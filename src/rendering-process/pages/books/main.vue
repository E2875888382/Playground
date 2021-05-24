<template>
    <Layout :flex="true">
        <Bookshelf />
        <div class="books-content" :class="customClass">
            <div class="booksContent__main">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </Layout>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Layout from 'commonComponents/Layout';
import Bookshelf from './components/bookshelf';
export default {
    components: {
        Layout,
        Bookshelf
    },
    setup() {
        const readModes = {
            default: 'booksChaptersDetail',
            eyecare: 'booksChaptersDetail_eyecare',
            dark: 'booksChaptersDetail_dark'
        };
        const store = useStore();
        const route = useRoute();
        const customClass = computed(()=> {
            return route.name === 'booksChaptersDetail' ? readModes[store.state.config.readMode] : '';
        });

        return {
            customClass
        }
    }
}
</script>

<style lang="less" scoped>
.books-content {
    position: relative;
    flex-grow: 1;
    height: 100%;
    .overflowScroll;
    .booksContent__main {
        height: 100%;
        width: 90%;
        margin: 0 auto;
    }
}
</style>