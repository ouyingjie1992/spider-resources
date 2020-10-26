
const getDataCtrl = require("../../service/book/getData");
const insertDataCtrl = require("../../service/book/insertData");

async function work(filePath) {
    let res = await getDataCtrl.work();
    // 处理数据-存储数据
    res = await insertDataCtrl.work(res);
    return {
        data: res,
        total: res.length
    };
};

module.exports = {
    work
};