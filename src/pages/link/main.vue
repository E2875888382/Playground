 <template>
    <div class="webview-container">
        <div class="webview-nav">
            <i class="el-icon-back webview-nav__item" :class="{'disable': !canBack}" @click="navBack"></i>
            <i class="el-icon-right webview-nav__item" :class="{'disable': !canForward}" @click="navForward"></i>
            <i class="el-icon-refresh-right webview-nav__item" @click="navReload" title="刷新"></i>
            <i class="el-icon-house webview-nav__item" @click="navHome" title="回到主页"></i>
            <el-input 
                v-model="urlInput" 
                class="webview-nav__input"
                @change="urlInputChange"
            >
            </el-input>
            <i class="el-icon-star-off webview-nav__item" title="收藏" @click="navStar"></i>
            <i class="el-icon-monitor webview-nav__item" @click="navOpenInBrowser" title="用默认浏览器打开"></i>
            <i class="el-icon-copy-document webview-nav__item" @click="navCopyLink" title="复制链接地址"></i>
        </div>
        <div class="webview-content">
            <webview 
                ref="webviewDom" 
                :src="url" 
                class="webview" 
                :enableremotemodule="true" 
                v-on:[eventNewWindow]="handleNewWindow"
                v-on:[eventLoadFail]="handleLoadFail"
                v-on:[eventStartLoad]="handleStartLoad"
                v-on:[eventFinishLoad]="handleFinishLoad"
                v-on:[eventDomReady]="handleDomReady"
                v-show="!netError"
            ></webview>
            <div class="netError" v-show="netError">
                <i class="el-icon-link netError__icon"></i>
                <h4 class="netError__tips">无法访问此网站</h4>
                <span class="netError__code">ERR_CONNECTION_REFUSED</span>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, onActivated, ref, computed } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { shell, clipboard } from 'electron';
import { useStore } from 'vuex';
export default {
    setup() {
        NProgress.configure({ showSpinner: false, parent: '.tabs-content' });
        const Message = inject('message');
        const canBack = ref(false);
        const canForward = ref(false);
        const netError = ref(false);
        const { testUrl } = inject('api').webview;
        const url = ref('');
        const urlInput = ref('');
        const webviewDom = ref(null);
        const route = useRoute();
        const store = useStore();
        const backgroundImg = computed(()=> store.state.config.browserBackgroundImg);
        // 刷新nav状态
        const refreshNav = ()=> {
            canBack.value = webviewDom.value.canGoBack();
            canForward.value = webviewDom.value.canGoForward();
        };
        // input输入新url
        const urlInputChange = async e=> {
            NProgress.start();
            netError.value = false;
            // 预请求url，防止输入错误url导致抛出错误
            const res = await testUrl(e);

            if (res.code === 200) {
                url.value = e;
            } else {
                console.log('链接无法访问:', res);
                netError.value = true;
            }
            NProgress.done();
            refreshNav();
        };
        // 打开新url
        const handleNewWindow = async e=> {
            if (e.preventDefault) e.preventDefault();
            url.value = e.url;
            urlInput.value = e.url;
        };
        // 开始加载
        const handleStartLoad = ()=> {
            NProgress.start();
        };
        // 加载完成
        const handleFinishLoad = ()=> {
            NProgress.done();
            refreshNav();
        };
        // 监听加载出错
        const handleLoadFail = e=> {
            console.log('加载页面出错:', e);
            netError.value = true;
        };
        // webview dom ready
        const handleDomReady = ()=> {
            // webview 缩放
            webviewDom.value.setZoomFactor(0.7);
            backgroundImg.value && webviewDom.value.insertCSS(`
                body {
                    background: linear-gradient(0deg,#f5f5f5b3,#f5f5f5b3),
                    url(${backgroundImg.value}) !important;
                    background-size: cover !important;
                    background-repeat: no-repeat !important;
                }
            `);
        };
        // nav方法
        const navBack = ()=> {
            if (webviewDom.value.canGoBack()) {
                webviewDom.value.goBack();
                refreshNav();
            }
        };
        const navForward = ()=> {
            if (webviewDom.value.canGoForward()) {
                webviewDom.value.goForward();
                refreshNav();
            }
        };
        const navReload = ()=> {
            webviewDom.value.reload();
        };
        const navHome = ()=> {
            netError.value = false;
            url.value = 'https://www.baidu.com';
            urlInput.value = 'https://www.baidu.com';
        };
        const navOpenInBrowser = ()=> {
            shell.openExternal(url.value);
        };
        const navCopyLink = ()=> {
            clipboard.writeText(url.value);
            Message({
                message: '已复制',
                type: 'success',
                offset: 200,
                duration: 1000
            });
        };
        const navStar = ()=> {
            Message({
                message: '已收藏',
                type: 'success',
                offset: 200,
                duration: 1000
            });
        }

        onActivated(()=> {
            canBack.value = false;
            canForward.value = false;
            netError.value = false;
            const paramsUrl = route.params.url || 'https://www.baidu.com';

            url.value = paramsUrl;
            urlInput.value = paramsUrl;
        });
        onBeforeRouteLeave(()=> {
            NProgress.done();
        });
        return {
            netError,
            url,
            webviewDom,
            urlInput,
            urlInputChange,
            eventNewWindow: 'new-window',
            eventLoadFail: 'did-fail-load',
            eventStartLoad: 'did-start-loading',
            eventFinishLoad: 'did-finish-load',
            eventDomReady: 'dom-ready',
            handleNewWindow,
            handleLoadFail,
            handleStartLoad,
            handleFinishLoad,
            handleDomReady,
            navBack,
            navForward,
            navReload,
            navHome,
            navOpenInBrowser,
            navCopyLink,
            navStar,
            canBack,
            canForward
        }
    },
}
</script>

<style lang="less" scoped>
@booksmarksWidth: 312px;
@navbarHeight: 50px;
.netError {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    color: #909399a6;
}
.netError__icon {
    font-size: 100px;
}
.netError__tips {
    font-size: 30px;
    letter-spacing: 3px;
}
.netError__code {
    font-size: 18px;
}
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
    background-color: #f5f7fa;
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
.disable {
    color: #909399a6;
}
</style>