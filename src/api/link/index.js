const request = require('request');

// 判断url是否可以访问，防止抛出错误
export const testUrl = async url=> {
    return new Promise(resolve=> {
        request(url, (err, response, body)=> {
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