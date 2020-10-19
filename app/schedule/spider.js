
const spiderCtrl = require("../controller/spider");

const work = async () => {
    // 爬取数据
    let res = await spiderCtrl.work();
    console.log(`数据爬取成功,更新数据${res.total}条`);
    return res;
};

module.exports = work;