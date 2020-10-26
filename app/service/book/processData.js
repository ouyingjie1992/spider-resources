/**
 * 批量读取json文件
 */
const cheerio = require('cheerio');


const extractService = {
    // 提取资源列表数据
    async extractList(html) {
        const resultData = [];
        $ = cheerio.load(html, {decodeEntities: false});
        $('#list dd a').each((index, ele)=>{
            const $item = $(ele);
            const resData = {
                title: $item.html(),
                href: $item.attr('href')
            };
            // 按章节倒序排
            resultData.unshift(resData);
        });
        return resultData;
    },
    
    // 提取资源详情页数据
    async extractDetail(html) {
        $ = cheerio.load(html, {decodeEntities: false});
        $('#content p').remove();
        $('#content script').remove();
        const resultData = $('#content').html();
        return resultData;
    }
}

module.exports = extractService;