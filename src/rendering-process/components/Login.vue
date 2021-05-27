<template>
    <div>
        <div class="login__wrapper" @click="showLoginDialog">
            <slot></slot>
        </div>
        <el-dialog
            title="Playground"
            v-model="dialogVisible"
            width="350px"
            custom-class="login-dialog"
            :close-on-click-modal="false"
            :destroy-on-close="true"
        >
            <div class="login-dialog__content">
                <el-image :src="loginCode"/>
            </div>
            <template #footer>
                <p class="login-dialog__footer">请使用网易云扫一扫以登录</p>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { computed, inject, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const loginStatus = computed(()=> store.state.user.cookie.length > 0);
        const dialogVisible = ref(false); // 二维码对话框
        const loginCode = ref(''); // base64格式二维码 
        const Message = inject('message');
        const { getQrCode, getQrCodeImg, checkQrCodeStatus } = inject('api').login;

        // 生成二维码
        async function createQrcode() {
            const qrcode = await getQrCode();
            const key = qrcode.data?.unikey;
            const img = await getQrCodeImg(key);

            loginCode.value = img.data?.qrimg || '';
            const timer = setInterval(async ()=> {
                const statusRes = await checkQrCodeStatus(key);

                if (statusRes.code === 800) {
                    clearInterval(timer);
                    createQrcode(); // 二维码过期时重新生成
                    Message({
                        message: '二维码已过期，请重新扫码',
                        type: 'info',
                        offset: 200,
                        duration: 1000
                    });
                } else if (statusRes.code === 803) {
                    clearInterval(timer);
                    // 将cookie写入请求头
                    store.commit('user/updateCookie', statusRes.cookie);
                    getLoginMsg();
                }
            }, 3000);
        }
        // 弹出二维码对话框
        function showLoginDialog() {
            if (loginStatus.value) return;
            createQrcode();
            dialogVisible.value = true;
        }
        // 获取登录信息
        function getLoginMsg() {
            store.dispatch('user/getLoginMsg').then(()=> {
                dialogVisible.value = false;
            });
        }
        onMounted(()=> {
            const cookie = localStorage.getItem('cookie');

            if (cookie) {
                store.commit('user/updateCookie', cookie);
                getLoginMsg();
            }
        });
        return {
            loginCode,
            showLoginDialog,
            dialogVisible
        }
    }
}
</script>

<style lang="less" scoped>
.login-dialog__content {
    .flex-center;
    align-items: flex-end;
    height: 253px;
    .el-image {
        width: 240px;
        height: 240px;
    }
}
.login-dialog__footer {
    text-align: center;
    font-size: 18px;
    color: #606266c7;
}
</style>