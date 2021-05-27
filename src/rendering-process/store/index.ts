import { createStore } from 'vuex';
import syncPlugins from './plugins/synchronous';

// 动态导入modules中的模块，导出模块名与文件名同名
const modulesFile = require.context('./modules', true, /\.ts$/);
const modules:any = {};

for (const path of modulesFile.keys()) {
    // 获取路径中的文件名作为模块名
    const moduleName = path.replace(/^\.\/(.*)\.[a-z]+$/, '$1');

    modules[moduleName] = modulesFile(path).default;
}

export default createStore({
    modules,
    plugins: [syncPlugins]
})