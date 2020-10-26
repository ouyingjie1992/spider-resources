/**
 * 获取原数据
 */
const axios = require("axios");
const processDataCtrl = require("./processData");
const {query} = require('../../../utils/query');
const {
    BOOK_LIST
} = require('../../../utils/bookSql');

// 获取更新内容
const getUpdateList = (book) => {
	return new Promise(async (resolve, reject) => {
        const lastestChapter = book.lastest_chapter;
        const href = book.href;
        const list = await getList(href);
        if(!list) {
            resolve(false);
        }
        const res = [];
        for(let i=0; i<list.length; i++) {
            if(list[i].title === lastestChapter) {
                break;
            }
            // 最终集合为章节正序排
            res.unshift(list[i]);
        }

        // TODO
        // res.splice(22, res.length-1);
        for(let i=0; i<res.length; i++) {
            // 接口防刷，并发可能会被拦截，若被拦截则2s后重试。重试机制最多5次。失败则按status:defect处理，待后续补全缺损数据流程处理。
            let content = false;
            let n = 0;
            console.log(`开始读取《${book.name}》章节数据(${i+1})`);
            while(!content && n<5) {
                content = await getDetail(res[i].href);
                n++;
            }
            content = content||'defect';
            console.log(`读取完成《${book.name}》章节数据(${i+1})`);
            res[i].content = content;
            res[i].book_id = book.id;
        }
        resolve(res);
	});
};
// 获取目录列表
const getList = (detailPath) => {
	return new Promise((resolve, reject) => {
        // http://www.xbiquge.la/26/26874/
        const url = `http://www.xbiquge.la${detailPath}`;
        // 防刷：延迟2s发请求
        setTimeout(() => {
            axios.get(url).then(async res => {
                if (res.status === 200) {
                    let content = res.data||'';
                    content = await processDataCtrl.extractList(content);
                    resolve(content);
                } else {
                    resolve(false);
                }
            }).catch(error => {
                if(error.response) {
                    //请求已发出，但服务器使用状态代码进行响应
                    //落在2xx的范围之外
                    // console.log(error.response.data);
                    console.log(error.response.status);
                    // console.log(error.response.headers);
                } else {
                    //在设置触发错误的请求时发生了错误
                    console.log('Error', error.message);
                }
                resolve(false);
            });
        }, 2000);
    });
};

// 获取章节内容
const getDetail = (detailPath) => {
	return new Promise((resolve, reject) => {
        // http://www.xbiquge.la/26/26874/13244872.html
        if(!detailPath) {
            resolve(false);
        }
        const url = `http://www.xbiquge.la${detailPath}`;
        // 防刷：延迟2s发请求
        setTimeout(() => {
            axios.get(url).then(async res => {
                if (res.status === 200) {
                    let content = res.data||'';
                    content = await processDataCtrl.extractDetail(content);
                    resolve(content);
                } else {
                    resolve(false);
                }
            }).catch(error => {
                if(error.response) {
                    //请求已发出，但服务器使用状态代码进行响应
                    //落在2xx的范围之外
                    // console.log(error.response.data);
                    console.log(error.response.status);
                    // console.log(error.response.headers);
                } else {
                    //在设置触发错误的请求时发生了错误
                    console.log('Error', error.message);
                }
                resolve(false);
            });
        }, 2000);
	});
};

// 获取详情数据
const getData = (list) => {
	return new Promise(async (resolve, reject) => {
        for(let i=0; i<list.length; i++) {
            // 接口防刷，并发可能会被拦截，若被拦截则2s后重试。重试机制最多5次。失败则按status:defect处理，待后续补全缺损数据流程处理。
            let content = false;
            let n = 0;
            while(!content && n<5) {
                console.log(`开始读取第${i+1}本书数据`);
                content = await getUpdateList(list[i]);
                console.log(`读取完成第${i+1}本书数据`);
                n++;
            }
            // content = content||'defect';
            list[i].updateList = content||[];
        }
        resolve(list);
	});
};

const getDataService = {
	async work() {
        let res = [];
        // 读取书架中待更新的图书信息
        let bookList = await query(BOOK_LIST());
        // 获取最新数据
        res = await getData(bookList);
    	return res;
	},
};

module.exports = getDataService;
