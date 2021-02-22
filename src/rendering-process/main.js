import { createApp } from 'vue';
import App from './app/App.vue';
import { 
    ElAvatar, 
    ElIcon, 
    ElInput, 
    ElCard, 
    ElCarousel, 
    ElCarouselItem, 
    ElDivider, 
    ElTabs, 
    ElTabPane,
    ElTag,
    ElInfiniteScroll,
    ElImage,
    ElButton,
    ElRate,
    ElEmpty,
    ElBacktop,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElSlider,
    ElAutocomplete,
    ElDialog,
    ElMenu,
    ElMenuItem,
    ElAffix
} from 'element-plus';
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
.use(ElTabs)
.use(ElTabPane)
.use(ElTag)
.use(ElInfiniteScroll)
.use(ElImage)
.use(ElButton)
.use(ElRate)
.use(ElEmpty)
.use(ElBacktop)
.use(ElDropdownItem)
.use(ElDropdownMenu)
.use(ElDropdown)
.use(ElSlider)
.use(ElAutocomplete)
.use(ElDialog)
.use(ElMenu)
.use(ElMenuItem)
.use(ElAffix)
.use(store);
app.mount('#app');
