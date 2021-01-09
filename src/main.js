import { createApp } from 'vue';
import App from './App.vue';
import { ElAvatar, ElIcon, ElInput } from 'element-plus';
import router from './routers';
import store from './store';
import { webFrame } from 'electron';

const app = createApp(App);

// 根据分辨率调整缩放
webFrame.setZoomFactor(0.8);
app.use(router);
app.use(ElAvatar);
app.use(ElIcon);
app.use(ElInput);
app.use(store);
app.mount('#app');
