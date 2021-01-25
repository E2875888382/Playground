 <template>
    <div class="webview-container">
        <div class="webview-nav">
            <i class="el-icon-back webview-nav__item"></i>
            <i class="el-icon-right webview-nav__item"></i>
            <i class="el-icon-refresh-right webview-nav__item"></i>
            <i class="el-icon-house webview-nav__item"></i>
            <el-input 
                v-model="urlInput" 
                class="webview-nav__input"
                @change="urlInputChange"
            >
            </el-input>
            <i class="el-icon-star-off webview-nav__item"></i>
        </div>
        <div class="webview-content">
            <webview 
                ref="webviewDom" :src="url" class="webview" :enableremotemodule="true" 
                v-on:[eventNewWindow]="handleNewWindow"
                v-on:[eventLoadFail]="handleLoadFail"
            ></webview>
        </div>
    </div>
</template>

<script>
import { onActivated, ref } from 'vue';
import { useRoute } from 'vue-router';
export default {
    setup() {
        const url = ref('');
        const urlInput = ref('');
        const webviewDom = ref(null);
        const route = useRoute();
        const urlInputChange = e=> {
            url.value = e;
        };

        onActivated(()=> {
            const paramsUrl = route.params.url || 'https://www.baidu.com';

            url.value = paramsUrl;
            urlInput.value = paramsUrl;
        });
        return {
            url,
            webviewDom,
            urlInput,
            urlInputChange,
            eventNewWindow: 'new-window',
            handleNewWindow: e=> {
                if (e.preventDefault) e.preventDefault();
                url.value = e.url;
                urlInput.value = e.url;
            },
            eventLoadFail: 'did-fail-load',
            handleLoadFail: e=> {
                // 加载页面出错
                console.log('加载页面出错:', e);
            }
        }
    },
}
</script>

<style lang="less" scoped>
@booksmarksWidth: 312px;
@navbarHeight: 50px;
.webview-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
}
.webview-content {
    flex-grow: 1;
    height: calc(100% - @navbarHeight);
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0;
    }
}
.webview-nav {
    display: flex;
    align-items: center;
    height: @navbarHeight;
    width: 100%;
}
.webview-nav__item {
    display: flex;
    justify-content: center;
    flex-basis: 60px;
    cursor: pointer;
    font-size: 23px;
}
.webview-nav__input {
    &:deep(.el-input__inner) {
        border-radius: 20px;
    }
}
.webview {
    display: inline-flex;
    width: 100%;
    height: 100%;
}
</style>