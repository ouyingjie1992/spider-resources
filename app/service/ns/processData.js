/**
 * 批量读取json文件
 */
const cheerio = require('cheerio');

// 格式化时间：[10月11日 08:40][昨天 08:40][今天 08:40]
const initTime = (time) => {
    let hours = '';// 时分
    let date = '';// 年月日
    let index = 0;
    let res = '';

    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDay = now.getDate();

    if(time.indexOf('今天') !== -1) {
        index = time.indexOf('今天')+2;
        date = `${nowYear}/${nowMonth}/${nowDay}`;
    } else if(time.indexOf('昨天') !== -1) {
        index = time.indexOf('昨天')+2;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        date = `${yesterday.getFullYear()}/${yesterday.getMonth() + 1}/${yesterday.getDate()}`;
    } else if(time.indexOf('前天') !== -1) {
        index = time.indexOf('前天')+2;
        const beforeday = new Date();
        beforeday.setDate(beforeday.getDate() - 2);
        date = `${beforeday.getFullYear()}/${beforeday.getMonth() + 1}/${beforeday.getDate()}`;
    } else {
        // 默认都是今年的数据
        index = time.indexOf('日');
        let tempDate = time.substring(0, index);
        date = tempDate.replace(/月/g, '/');
        date = `${nowYear}/${date}`;
    }
    hours = time.substring(index+1);
    // res = new Date(`${date}${hours}`);
    res = `${date}${hours}`;
    return res;
};

const extractService = {
    // 提取资源列表数据
    async extractList(html) {
        const resultData = [];
        $ = cheerio.load(html, {decodeEntities: false});
        $('ul.fly-list li').each((index, ele)=>{
            const $item = $(ele).find('h2 a').eq(1);
            let publish_time = $(ele).find('.fly-list-info >span').eq(0).html();
            publish_time = initTime(publish_time);
            const author = $(ele).find('cite').html();
            const resData = {
                title: $item.html(),
                href: $item.attr('href'),
                publish_time: publish_time,
                author: author
            };
            resultData.push(resData);
        });
        return resultData;
    },
    
    // 提取资源详情页数据
    async extractDetail(html) {
        $ = cheerio.load(html, {decodeEntities: false});
        const resultData = $('#descriptionP').html();
        return resultData;
    }
}

module.exports = extractService;