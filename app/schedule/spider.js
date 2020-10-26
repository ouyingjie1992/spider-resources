
const nsSpiderCtrl = require("../controller/ns/spider");
const bookSpiderCtrl = require("../controller/book/spider");

// 爬取ns数据
const nsPromise = () => {
    return new Promise(async (resolve, reject) => {
        let nsRes = await nsSpiderCtrl.work();
        console.log(`ns数据爬取成功,更新数据${nsRes.total}条`);
        resolve(nsRes);
    });
};

// 爬取book数据
const bookPromise = () => {
    return new Promise(async (resolve, reject) => {
        let bookRes = await bookSpiderCtrl.work();
        let chapter_total = 0;
        for(let i=0; i<bookRes.data.length; i++) {
            chapter_total += bookRes.data[i].updateList.length||0;
        }
        console.log(`book数据爬取成功,更新书籍数据${bookRes.total}条,更新章节数据共${chapter_total}条`);
        resolve(bookRes);
    });
};

const work = () => {
    return new Promise((resolve, reject) => {
        Promise.all([nsPromise(), bookPromise()]).then((result) => {
            resolve({
                nsRes: result[0],
                bookRes: result[1]
            });
        }).catch((error) => {
            reject(error);
        });
    });
};

module.exports = work;