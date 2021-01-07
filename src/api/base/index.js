 /**
 * @description node的request模块请求
 */
const request = require('request');
const paramsParse = params=> {
    let res = '?';

    for (const [key, val] of Object.entries(params)) {
        res += `${key}=${val}&`;
    }
    return res.slice(0, res.length - 1);
};

export const get = ({ url: baseUrl, params })=> {
    const url = baseUrl + paramsParse(params);

    return new Promise(resolve=> {
        request(url, (err, response, body)=> {
            if (!err && response.statusCode == 200) { 
                resolve(JSON.parse(body));
            } else {
                resolve({
                    code: 500,
                    err: err
                })
            }
        })
    });
}

export const post = ({ url, data })=> {
    return new Promise(resolve=> {
        request({
            methods: 'post',
            url: url,
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        }, (err, response, body)=> {
            if (!err && response.statusCode == 200) { 
                resolve(JSON.parse(body));
            } else {
                resolve({
                    code: 500,
                    err: err
                })
            }
        })
    });
}
