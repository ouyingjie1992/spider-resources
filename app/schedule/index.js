const schedule = require('node-schedule');
const spider = require('./spider.js');

const runFn = () => {
    // 爬取数据
    spider();
};

// 可以按照cron的格式设置
const runSchedule = () => {
    // 每天上午10点执行一次
    schedule.scheduleJob('0 0 10 * * *', () => {
        runFn();
        console.log('定时任务执行一次');
    });
    // schedule.scheduleJob('0 28 17 * * *', () => {
    //     runFn();
    //     console.log('定时任务执行一次');
    // });
};

module.exports = runSchedule;