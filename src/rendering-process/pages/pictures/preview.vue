<template>
    <Layout customClass="pictures-preview">
        <div class="preview-box" tabindex="0" @keydown="handleKeyDown">
            <div class="preview-arrow_left" @click="switchImg(true)" :class="{'preview-arrow_active':index}">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="preview-img" @mousewheel="handleMouseWheel" title="滑动滚轮缩放">
                <el-image 
                    :src="currentImg.img_1024_768" 
                    class="preview-img__content" 
                    @contextmenu="handleContextMenu" 
                    :style="{
                        transform: `scale(${scaleLevel})`
                    }"
                />
            </div>
            <div class="preview-arrow_right" @click="switchImg(false)" :class="{'preview-arrow_active':index < imgs.length-1}">
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="preview-imgList">
            <el-image 
                class="preview-imgList__item" 
                v-for="(img, index) in imgs" 
                :key="img.id" :src="img.img_1024_768" 
                @click="pickImg(index)"
            />
        </div>
        <div class="preview-nav" @click="back">返回</div>
    </Layout>
</template>

<script>
import Layout from '../../components/Layout';
import { computed, inject, onActivated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { remote, ipcRenderer } from 'electron';
export default {
    components: {
        Layout
    },
    setup() {
        const Message = inject('message');
        const scaleLevel = ref(1);
        const index = ref(0);
        const currentImg = ref({});
        const route = useRoute();
        const store = useStore();
        const router = useRouter();
        const imgs = computed(()=> store.state.pictures.pictures);
        const switchImg = back=> {
            const len = imgs.value.length;

            if (back) {
                (index.value - 1 >= 0) && (index.value = index.value - 1);
            } else {
                (index.value + 1 < len) && (index.value = index.value + 1);
            }
            currentImg.value = imgs.value[index.value];
        };
        const handleMouseWheel = e=> {
            const scale = e.wheelDelta / 120;

            if (scale > 0) {
                (scaleLevel.value < 1.5) && (scaleLevel.value += 0.1);
            } else {
                (scaleLevel.value > 0.5) && (scaleLevel.value -= 0.1);
            }
        };
        const pickImg = ind=> {
            index.value = ind;
            currentImg.value = imgs.value[index.value];
        };
        const handleKeyDown = e=> {
            const key = e.key;

            if (key === 'ArrowLeft') switchImg(true);
            if (key === 'ArrowRight') switchImg(false);
        };
        const back = ()=> router.push({name: 'pictures'});
        // 保存到本地
        const save = format=> {
            const { dialog } = remote;
            const imgSrc = currentImg.value[format];

            dialog.showSaveDialog({
                title: '保存到本地',
                filters: [
                    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
                ],
                defaultPath: `${currentImg.value.utag}.jpg`
            }).then(res=> {
                ipcRenderer.send('saveImg', res.filePath, imgSrc);
                ipcRenderer.on('saveImg-reply', (event, message, err)=> {
                    Message({
                        message: message,
                        type: err ? 'warning':'success',
                        offset: 200,
                        duration: 1000
                    });
                });
            }).catch(err=> {
                console.log('保存对话框错误:', err);
            })
        };
        const { Menu } = remote;
        const menu = Menu.buildFromTemplate([
            {
                label: '设置为壁纸',
                click() {
                    store.commit('config/updateBackground', `linear-gradient(0deg,#f5f5f5b3,#f5f5f5b3), url('${currentImg.value.img_1024_768}')`);
                }
            },
            {
                label: '设置为浏览器壁纸',
                click() {
                    store.commit('config/updateBrowserBackground', currentImg.value.img_1024_768);
                }
            },
            {
                label: '保存',
                submenu: [
                    {
                        label: '1024_768',
                        click() {
                            save('img_1024_768')
                        }
                    },
                    {
                        label: '1280_800',
                        click() {
                            save('img_1280_800')
                        }
                    },
                    {
                        label: '1280_1024',
                        click() {
                            save('img_1280_1024')
                        }
                    },
                    {
                        label: '1366_768',
                        click() {
                            save('img_1366_768')
                        }
                    },
                    {
                        label: '1440_900',
                        click() {
                            save('img_1440_900')
                        }
                    },
                    {
                        label: '1600_900',
                        click() {
                            save('img_1600_900')
                        }
                    }
                ]
            }
        ]);
        Menu.setApplicationMenu(menu);
        const handleContextMenu = ()=> {
            menu.popup();
        };

        onActivated(()=> {
            index.value = route.params?.currentIndex || 0;
            currentImg.value = imgs.value[index.value];
        });
        return {
            currentImg,
            index,
            imgs,
            switchImg,
            handleMouseWheel,
            pickImg,
            scaleLevel,
            handleKeyDown,
            back,
            handleContextMenu
        }
    }
}
</script>

<style lang="less" scoped>
.pictures-preview {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding-top: 10px;
}
.preview-box {
    display: flex;
    width: 100%;
    height: calc(100% - 230px);
    &:focus {
        outline: none;
    }
}
.preview-nav {
    position: absolute;
    top: 14px;
    left: 0;
    height: 50px;
    width: 100px;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
    background-color: #323334e6;
    color: #FFF;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
.preview-imgList {
    flex-grow: 1;
    display: flex;
    align-items: center;
    height: 200px;
    width: 1150px;
    max-width: 85%;
    margin: 0 auto;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        height: 10px;
    }
    &::-webkit-scrollbar-track{
        background-color: #f5f7fa3b;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;  
        background-color:#909399a8;
    }
    &__item {
        flex-shrink: 0;
        height: 140px;
        width: 200px;
        margin: 0 10px;
        cursor: pointer;
    }
}
.preview-img {
    .flex-center;
    overflow: hidden;
    height: 100%;
    flex-grow: 1;
    background-color: #ffffffad;
    cursor: pointer;
    &__content {
        object-fit: contain;
        transition: transform .1s ease;
    }
}
.preview-arrow_left,
.preview-arrow_right {
    .flex-center;
    flex-basis: 140px;
    height: 100%;
    font-size: 100px;
    cursor: pointer;
    color: #9093998a;
}
.preview-arrow_active {
    color: #606266;
}
</style>