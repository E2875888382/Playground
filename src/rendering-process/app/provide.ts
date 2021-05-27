import { ElLoading, ElMessage } from 'element-plus';
import api from '../api/manager';
import { remote } from 'electron';
import { 
    timeFormat,
    wordFormat,
    hotFormat,
    numFormat,
    zeroNum,
    msFormat
} from '../assets/js/utils';
import store from '../store/index';
import router from '../routers/index';

// 存放 provide 的全局方法或变量 
export default {
    api, // api
    timeFormat, // 格式化相对日期
    wordFormat, // 格式化书籍字数
    hotFormat, // 格式化书籍人气
    numFormat, // 通用格式
    zeroNum, // 补零
    msFormat, // ms 格式化为 m : s
    // 消息提醒
    message(options: any) {
        ElMessage(options);
    },
    // loading
    loading(options: any) {
        ElLoading.service(options);
    },
    // 获取静态图片资源
    getStaticsImg(src: string) {
        return process.env.VUE_APP_BOOKS_STATICS_URL + src;
    },
    // 右键菜单
    menu(config: Array<any>) {

        const menu = remote.Menu.buildFromTemplate(config);

        remote.Menu.setApplicationMenu(menu);
        menu.popup();
    },
    // 加入书架
    addToBookshelf(id: string | number, cover: string) {
        store.commit('user/updateBookshelf', {
            booksId: id,
            cover: process.env.VUE_APP_BOOKS_STATICS_URL + cover
        });
    },
    // 跳转书籍详情页
    toBooksDetail(booksId: string | number, from = '') {
        router.push({name: 'booksDetail', params: {booksId, from}});
    }
}