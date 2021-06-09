/**
 * @description 创建主窗口
 */
import { BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { initIpcManager } from './ipcManager';
import createLyricWindow from './lyricWindow';

const path = require('path');
const icon = path.join(__dirname, '../public/icon.png');

export default async function() {
    global.mainWindow = new BrowserWindow({
        width: 1080,
        height: 650,
        minWidth: 1080,
        minHeight: 650,
        autoHideMenuBar: true,
        frame: false,
        icon: icon,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            webviewTag: true
        }
    });

    createLyricWindow();
    initIpcManager(global.mainWindow, global.lyricWindow);
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await global.mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    } else {
        createProtocol('app')
        global.mainWindow.loadURL('app://./index.html')
    }
}