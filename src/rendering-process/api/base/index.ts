/**
 * @description node的request模块请求
 */
import { ElMessage } from 'element-plus';
import request from 'request';

const paramsParse = (params:IParams)=> {
    let res = '?';

    for (const [key, val] of Object.entries(params)) {
        res += `${key}=${val}&`;
    }
    return res.slice(0, res.length - 1);
};
const cookie = localStorage.getItem('cookie');

// apiName 方便接口错误调试
export const get = ({ url: baseUrl, params = {}, apiName= ''}:IGetParams)=> {
    const url = baseUrl + paramsParse(params);
    const options = {
        url: url,
        headers: {
            'Cookie': cookie
        }
    };

    return new Promise(resolve=> {
        request(options, (err:any, response:any, body:any)=> {
            if (!err && response.statusCode == 200) { 
                resolve(JSON.parse(body));
            } else {
                // 调用失败消息提示
                ElMessage({
                    showClose: true,
                    type: 'error',
                    message: `${apiName}接口请求失败`,
                    duration: 2000,
                    offset: 200,
                    center: true
                });
                resolve({
                    code: 500,
                    err: err
                })
            }
        })
    });
}

// apiName 方便接口错误调试
export const post = ({ url, data, apiName= ''}:IPostParams)=> {
    return new Promise(resolve=> {
        request({
            methods: 'post',
            url: url,
            json: true,
            headers: {
                "content-type": "application/json",
                'Cookie': cookie
            },
            body: JSON.stringify(data)
        }, (err:any, response:any, body:any)=> {
            if (!err && response.statusCode == 200) { 
                resolve(JSON.parse(body));
            } else {
                // 调用失败消息提示
                ElMessage({
                    showClose: true,
                    type: 'error',
                    message: `${apiName}接口请求失败`,
                    duration: 2000,
                    offset: 200,
                    center: true
                });
                resolve({
                    code: 500,
                    err: err
                })
            }
        })
    });
}
