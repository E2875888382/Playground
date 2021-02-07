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

// 格式化书籍总字数
export const wordFormat = num=> num > 9999 ? `${Math.round(Math.floor(num / 1000) / 10)}万` : num;

// 格式化书籍总人气
export const hotFormat = num=> num > 9999 ? `${Math.round(num / 1000) / 10}万` : num;