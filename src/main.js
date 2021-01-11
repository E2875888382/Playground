import { createApp } from 'vue';
import App from './App.vue';
import { ElAvatar, ElIcon, ElInput, ElCard, ElCarousel, ElCarouselItem, ElDivider } from 'element-plus';
import router from './routers';
import store from './store';
import { webFrame } from 'electron';

const app = createApp(App);

// 根据分辨率调整缩放
webFrame.setZoomFactor(0.8);
app
.use(router)
.use(ElAvatar)
.use(ElIcon)
.use(ElInput)
.use(ElCard)
.use(ElCarousel)
.use(ElCarouselItem)
.use(ElDivider)
.use(store);
app.mount('#app');
