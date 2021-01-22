import { ipcMain, Menu, Tray, app } from 'electron';

const path = require('path');
const icon = path.join(__dirname, '../src/assets/img/icon.png');

export const initIpcManager = (win)=> {
    // 监听自定义titleBar事件
    ipcMain.on('min', () => win.unmaximize());
    ipcMain.on('max', () => win.maximize());
    ipcMain.on('developer', () => win.webContents.openDevTools());
    // 点击关闭最小化到托盘
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