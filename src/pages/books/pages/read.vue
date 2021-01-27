<template>
    <div class="book-read">
        <div class="book-read__content" :style="{'fontSize': fontSize + 'px'}" @click="openDrawer" v-html="chapterContent" ref="contentRef"></div>
        <transition name="fade_down">
            <div class="book-read__drawer_top" v-show="showTopDrawer">
                <i class="el-icon-arrow-left" @click="back"></i>
                <span class="book-read__title">{{bookMsg.title}}</span>
                <el-dropdown size="medium">
                    <span><i class="el-icon-more" ></i></span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item icon="el-icon-s-home" @click="back('index')">首页</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-info" @click="back(`booksDetail/index/${bookMsg._id}`)">详情</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                </el-dropdown>
            </div>
        </transition>
        <transition name="fade_up">
            <div class="book-read__drawer_bottom" v-show="showBottomDrawer">
                <div class="bookshelf__btn">加入书架</div>
                <div class="fontsize__btn">
                    <span>字体大小</span>
                    <el-slider v-model="fontSize" :min="18" :max="30"></el-slider>
                    <div class="color__box">
                        <el-button class="color__btn" plain @click="changeMode('default')">默认</el-button>
                        <el-button class="color__btn" plain @click="changeMode('dark')">黑夜</el-button>
                        <el-button class="color__btn" plain @click="changeMode('eyecare')">护眼</el-button>
                    </div>
                </div>
                <div class="chapters__nav">
                    <span @click="changeChapter(-1)">上一章</span>
                    <span class="chapters__nav_mid" @click="openChaptersDrawer">目录</span>
                    <span @click="changeChapter(1)">下一章</span>
                </div>
            </div>
        </transition>
        <transition name="fade_right">
            <div class="book-read__drawer_left" v-show="showChaptersDrawer">
                <p 
                    class="book-read__chapters-item" 
                    v-for="(item, index) in bookChapters" :key="item._id"
                    :class="{ 'chapter_active': index === currentChapter}"
                    @click="selectChapter(item.link, index)"
                >
                    {{item.title}}
                </p>
            </div>
        </transition>
    </div>
</template>

<script>
import { computed, onActivated, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
    setup() {
        const fontSize = ref(22);
        const contentRef = ref(null);
        const router = useRouter();
        const route = useRoute();
        const showTopDrawer = ref(false);
        const showBottomDrawer = ref(false);
        const showChaptersDrawer = ref(false);
        const store = useStore();
        const bookChapters = ref([]);
        const bookMsg = ref({});
        const chapterContent = ref(''); // 章节正文
        const currentChapter = ref(0);
        const { booksDetail } = inject('api').booksDetail;
        const { booksChaptersContent } = inject('api').booksChapters;
        const book = computed(()=> store.state.book.book);
        const back = path=> path.length > 0 ? router.push(`/books/${path}`) : router.back(-1);
        const openDrawer = ()=> {
            if (showChaptersDrawer.value === true) {
                showTopDrawer.value = false;
                showBottomDrawer.value = false;
            } else {
                showTopDrawer.value = !showTopDrawer.value;
                showBottomDrawer.value = !showBottomDrawer.value;
            }
            showChaptersDrawer.value = false;
        };
        const openChaptersDrawer = ()=> {
            showTopDrawer.value = false;
            showBottomDrawer.value = false;
            showChaptersDrawer.value = true;
        };
        const selectChapter = async (chapterlink, index)=> {
            const res = await booksChaptersContent(chapterlink);

            currentChapter.value = index;
            chapterContent.value = (`<p class="book-read__content-title">${res?.chapter?.title}</p>` + res?.chapter?.cpContent) || '';
            contentRef.value.scrollTop = '0';
        };
        const changeChapter = (dir)=> {
            if (dir === -1 && currentChapter.value >= 1) {
                currentChapter.value--;
                selectChapter(bookChapters.value[currentChapter.value].link, currentChapter.value);
            } else if (dir === 1 && currentChapter.value < bookChapters.value.length - 1) {
                currentChapter.value++;
                selectChapter(bookChapters.value[currentChapter.value].link, currentChapter.value);
            }
        };
        const changeMode = mode=> {
            store.commit('config/updateReadMode', mode);
        };

        onActivated(async ()=> {
            showTopDrawer.value = false;
            showBottomDrawer.value = false;
            showChaptersDrawer.value = false;
            const {booksId, chapters} = book.value;

            currentChapter.value = +route.params.chapterIndex;
            bookChapters.value = chapters;
            bookMsg.value = await booksDetail(booksId);
            selectChapter(bookChapters.value[currentChapter.value].link, currentChapter.value);
            console.log('书籍信息:', {
                detail: bookMsg.value,
                chapters: bookChapters.value,
                chapterIndex: currentChapter.value
            });
        });
        return {
            book,
            bookMsg,
            bookChapters,
            showTopDrawer,
            showBottomDrawer,
            showChaptersDrawer,
            openDrawer,
            openChaptersDrawer,
            selectChapter,
            chapterContent,
            currentChapter,
            back,
            changeChapter,
            contentRef,
            fontSize,
            changeMode
        }
    }
}
</script>

<style lang="less" scoped>
.fontsize__btn {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 40px;
    span {
        margin-right: 20px;
        font-size: 18px;
        color: #a8a8aa;
    }
    .el-slider {
        display: inline-block;
        width: 400px;
    }
    .color__box {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 60px;
        margin: 0 20px;
    }
    .color__btn {
        flex-basis: 25%;
        font-size: 16px;
        color: #a8a8aa;
        background-color: transparent;
    }
}
.el-icon-arrow-left,
.el-icon-more {
    color: #FFF;
    font-size: 25px;
    cursor: pointer;
}
.book-read {
    width: 100%;
    height: 100%;
}
.book-read__content {
    width: 100%;
    height: calc(100% - 40px);
    padding: 20px 0;
    font-size: 22px;
    line-height: 1.8;
    white-space: pre-line;
    color: #5c5d58;
    user-select: none;
    .overfloScroll;
    &:deep(.book-read__content-title) {
        font-size: 30px;
        font-weight: bold;
    }
}
.book-read__drawer_top {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    padding: 0 40px;
    background-color: #323334e6;
    line-height: 60px;
    opacity: 1;
}
.book-read__title {
    flex-grow: 1;
    text-align: center;
    font-size: 18px;
    color: #FFF;
}
.book-read__drawer_bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 20px;
    background-color: #323334e6;
    opacity: 1;
}
.bookshelf__btn {
    position: absolute;
    right: 0;
    top: -140px;
    width: 140px;
    height: 50px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: #323334e6;
    color: #FFF;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
.book-read__drawer_left {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background-color: #FFF;
    opacity: 1;
    .overfloScroll;
}
.book-read__chapters-item {
    height: 75px;
    margin: 0;
    padding-left: 20px;
    line-height: 75px;
    font-size: 16px;
    color:#999;
    border-bottom: 1px solid #ebeef5;
    cursor: pointer;
}
.chapter_active {
    color: #b93321;
}
.chapters__nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    padding: 0 40px;
    color: #a8a8a8;
    font-size: 23px;
    cursor: pointer;
    &_mid {
        height: 80px;
        line-height: 80px;
        flex-grow: 1;
        text-align: center;
    }
}
.fade_down-enter-active {
    animation: fadeIn1 .2s ease;
}
.fade_down-leave-active {
    animation: fadeIn1 .2s ease reverse;
}
.fade_up-enter-active {
    animation: fadeIn2 .2s ease;
}
.fade_up-leave-active {
    animation: fadeIn2 .2s ease reverse;
}
.fade_right-enter-active {
    animation: fadeIn3 .2s ease;
}
.fade_right-leave-active {
    animation: fadeIn3 .2s ease reverse;
}
@keyframes fadeIn1 {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes fadeIn2 {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes fadeIn3 {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>