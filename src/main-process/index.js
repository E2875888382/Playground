'use strict'

import { app, protocol, BrowserWindow, BrowserView, ipcMain, Menu, Tray} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';
const icon = path.join(__dirname, '../src/assets/img/icon.png');
let appTray = null;
let webview = null;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1000,
        height: 650,
        minWidth: 1000,
        minHeight: 650,
        autoHideMenuBar: true,
        frame: false,
        icon: icon,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    // 监听自定义titleBar事件
    ipcMain.on('min', () => win.unmaximize());
    ipcMain.on('max', () => win.maximize());
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

        appTray = new Tray(icon);
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
    ipcMain.on('developer', () => win.webContents.openDevTools());

    webview = new BrowserView();

    win.setBrowserView(webview);
    webview.setAutoResize({width: true, height: true});

    function hideWebview() {
        webview.setBounds({
            width: 0,
            height: 0,
            x: 315,
            y: 63
        });
        webview.setAutoResize({width: false, height: false});
    }
    hideWebview();
    ipcMain.on('openWebview', (event, url)=> {
        webview.setBounds({
            width: 946,
            height: 730,
            x: 64,
            y: 64
        });
        webview.setAutoResize({width: true, height: true});
        url && webview.webContents.loadURL(url);
    });
    ipcMain.on('hideWebview', ()=> hideWebview());
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('web-contents-created', (e, webContents) => {
    // 拦截app内所有的打开网页事件
    webContents.on('new-window', (event, url) => {
        event.preventDefault();
        webview.webContents.loadURL('https://github.com');
        // 告诉当前页面要跳转到webview页,并传入地址
        event.sender.send('new-window', url);
    });
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
