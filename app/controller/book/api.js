
const getDataByBaseCtrl = require("../../service/book/getDataByBase");
const apiCode = require("../../config/apiCode");

// 获取书籍列表
async function book() {
    let res = await getDataByBaseCtrl.book();
    return {
        data: res,
        total: res.length
    };
};

// 获取书籍章节内容
async function chapterList(bookId) {
    if(bookId === '') {
        return {
            code: apiCode.paramsError,
            data: '书籍id不可为空'
        };
    }
    let res = await getDataByBaseCtrl.chapterList(bookId);
    if(res.length === 0) {
        return {
            code: apiCode.nullData,
            data: '暂无数据'
        };
    }
    return {
        code: apiCode.success,
        data: res,
        total: res.length
    };
};


// 获取书籍章节详情内容
async function chapterDetails(chapterId) {
    if(chapterId === '') {
        return {
            code: apiCode.paramsError,
            data: '章节id不可为空'
        };
    }
    let res = await getDataByBaseCtrl.chapterDetails(chapterId);
    if(res.length === 0) {
        return {
            code: apiCode.nullData,
            data: '暂无数据'
        };
    }
    return {
        code: apiCode.success,
        data: res[0]
    };
};

module.exports = {
    book,
    chapterList,
    chapterDetails
};