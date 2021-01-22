 <template>
    <div class="webview-container">
        <div class="webview-bookmarks"></div>
        <div class="webview-content">
            <webview ref="webviewDom" :src="url" class="webview"></webview>
        </div>
    </div>
</template>

<script>
import { onActivated, ref } from 'vue';
import { useRoute } from 'vue-router';
export default {
    setup() {
        const webviewDom = ref(null);
        const route = useRoute();
        const url = ref('https://www.baidu.com');

        onActivated(()=> {
            url.value = route.params.url;
            webviewDom.value && webviewDom.value.addEventListener('new-window', e=> {
                url.value = e.url;
            });
        });
        return {
            url,
            webviewDom
        }
    },
}
</script>

<style lang="less" scoped>
@booksmarksWidth: 312px;
.webview-container {
    display: flex;
    width: 100%;
    height: 100%;
}
.webview-content {
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0;
    }
}
.webview {
    display: inline-flex;
    width: 100%;
    height: 100%;
}
</style>