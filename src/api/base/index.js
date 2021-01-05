const { net } = require('electron').remote;

export default ()=> {
    const request = net.request({
        url: 'https://v1.alapi.cn/api/new/toutiao?start=1'
    });

    return new Promise((resolve, reject)=> {
        request.on('response', response=> {
            if (response.statusCode !== 200) {
                reject(response.statusCode);
            }
            response.on('data', chunk=> {
                resolve({
                    headers: response.headers,
                    data: JSON.parse(chunk.toString())
                })
            })
            response.on('end', () => {
                console.log('No more data in response.')
            })
        })
        request.end()
    })
}
