 <template>
    <div class="webview-container">
        <div class="webview-bookmarks"></div>
        <div class="webview-content"></div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { onBeforeRouteLeave } from 'vue-router';
export default {
    setup() {
        onBeforeRouteLeave(()=> ipcRenderer.send('hideWebview'))
    },
    beforeRouteEnter (to, from, next) {
        ipcRenderer.send('openWebview', to.params.url);
        next();
    }
}
</script>

<style 
Webview lang="less" scoped>
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
</style>