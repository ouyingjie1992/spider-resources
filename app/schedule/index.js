const schedule = require('node-schedule');
const spider = require('./spider');

const runFn = () => {
    // 爬取数据
    console.log('爬虫开始运行');
    spider().then((res) => {
        console.log('爬虫运行结束');
    });
};

// 可以按照cron的格式设置
const runSchedule = () => {
    // 每天上午10点执行一次
    schedule.scheduleJob('0 0 10 * * *', () => {
        console.log('定时任务执行一次');
        runFn();
    });
    // schedule.scheduleJob('0 57 13 * * *', () => {
    //     console.log('定时任务开始');
    //     runFn();
    // });
};

module.exports = runSchedule;