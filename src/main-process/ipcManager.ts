/**
 * @description 主进程的事件处理
 */
import { ipcMain, Menu, Tray, app } from 'electron';

const fs = require('fs');
const request = require('request');
const path = require('path');
const icon = path.join(__dirname, '../public/icon.png');

export const initIpcManager = (win: any, lyric: any)=> {

    // 弹出歌词
    ipcMain.on('openLyric', ()=> lyric.show());

    // 关闭歌词
    ipcMain.on('closeLyric', ()=> lyric.hide());

    // 根据url下载图片
    ipcMain.on('saveImg', (event, filePath, imgSrc) => {
        const writeStream = fs.createWriteStream(filePath);

        request(imgSrc).pipe(writeStream);
        writeStream.on('finish', ()=> {
            event.sender.send('saveImg-reply', '保存成功');
        })
        writeStream.on('error', (err: any)=> {
            event.sender.send('saveImg-reply', '保存失败', err);
        })
    });

    // 最小化
    ipcMain.on('min', () => win.minimize());

    // 最大化
    ipcMain.on('max', () => {
        if (win.isMaximized()) {
            win.unmaximize();
            return;
        }
        win.maximize();
    });

    // 打开控制台
    ipcMain.on('developer', () => win.webContents.openDevTools());

    // 最小化到托盘
    ipcMain.on('close', () => {
        const trayMenu = [
            {
                label: '退出',
                click: () => app.quit()
            }
        ];
        // 图标的上下文菜单
        const contextMenu = Menu.buildFromTemplate(trayMenu);
        const appTray = new Tray(icon);

        win.hide();
        appTray.setContextMenu(contextMenu);
        // 单击托盘小图标显示应用
        appTray.on('click', function () {
            // 显示主程序
            win.show();
            // 关闭托盘显示
            appTray.destroy();
        });
    });
};