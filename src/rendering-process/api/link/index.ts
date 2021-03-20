const request = require('request');

// 判断url是否可以访问，防止抛出错误
export const testUrl = async (url:string)=> {
    return new Promise(resolve=> {
        request(url, (err:any, response:any, body:any)=> {
            if (!err && response.statusCode == 200) { 
                resolve({
                    code: 200,
                    body: body
                });
            } else {
                resolve({
                    code: 500,
                    err: err
                })
            }
        })
    });
};