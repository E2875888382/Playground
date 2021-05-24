export const bodyParser = (data: news.newContent)=> {
    const {body, img, link, video} = data;
    const imgMap: news.map = {};
    const videoMap: news.map = {};
    const linkMap: news.map = {};

    for (const item of img) imgMap[item.ref] = item;
    if (video) for (const item of video) videoMap[item.ref] = item;
    for (const item of link) linkMap[item.ref] = item;
    return body
        .replace(/<!--IMG(.*?)-->/g, match=> {
            return `<p align="center"><img src="${imgMap[match].src}" width="100%"/></p>`;
        })
        .replace(/<!--link(.*?)-->/g, match=> {
            const {title, href} = linkMap[match];

            return `<a data-src="${href}">${title}</a>`;
        })
        .replace(/<!--VIDEO(.*?)-->/g, match=> {
            return `<video controls src="${videoMap[match].url_m3u8}" poster="${videoMap[match].cover}" width="100%" />`;
        });
}