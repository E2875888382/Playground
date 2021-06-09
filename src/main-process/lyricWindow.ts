/**
 * @description 创建歌词窗口
 */
import { BrowserWindow, screen } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

// 调试时使用localhost，打包时使用协议
// const lyricUrl = 'http://localhost:8080/#/lyric';
const lyricUrl = 'app://./index.html/#/lyric';

export default async function() {
    const { x, y, width, height } = screen.getPrimaryDisplay().workArea;

    global.lyricWindow = new BrowserWindow({
        width: width,
        height: 60,
        show: false,
        frame: false,
        x: x,
        y: y + height / 2 + 200,
        fullscreenable: false,
        minimizable: false,
        maximizable: false,
        alwaysOnTop: true,
        skipTaskbar: true, 
        transparent: true,
        closable: false,
        autoHideMenuBar: true,
        parent: global.mainWindow,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            backgroundThrottling: false,
            devTools: false
        }
    });
    createProtocol('app');
    global.lyricWindow.loadURL(lyricUrl);
}