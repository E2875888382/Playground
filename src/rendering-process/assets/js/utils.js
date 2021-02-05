// 计算相对时间
export const timeFormat = time=> {
    const timeNum = (Date.now() - (+new Date(time))) / 1000;
    const timeList = [
        { diff: 60 * 60 * 24 * 30 * 12, str: '年前'},
        { diff: 60 * 60 * 24 * 30, str: '月前' },
        { diff: 60 * 60 * 24, str: '天前' },
        { diff: 60 * 60, str: '小时前' },
        { diff: 60, str: '分钟前' },
        { diff: 0, str: '刚刚' }
    ];

    for (const {diff, str} of timeList) {
        if (timeNum > diff) {
            return (diff === 0 ? '' : Math.floor(timeNum / diff)) + str;
        }
    }
};