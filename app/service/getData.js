/**
 * 获取原数据
 */
const axios = require("axios");
const processDataCtrl = require("./processData");
const {query} = require('../../utils/query');
const {
  LATEST_TIME
} = require('../../utils/sql');

// 获取资源列表
const getList = (page) => {
	return new Promise((resolve, reject) => {
        // https://ns.vbsbear.com/forum/?page=1&search=&tag=&sort=&column=9
        const url = 'https://ns.vbsbear.com/forum/';
        const params = {
            page: page,
            search: '',
            tag: '',
            sort: 'new',
            column: 9
        };
        axios.get(url, {params: params}).then(res => {
			if (res.status === 200) {
				resolve(res.data);
			} else {
				resolve(false);
			}
        });
	});
};

// 获取资源详情
const getDetail = (detailPath) => {
	return new Promise((resolve, reject) => {
        // https://ns.vbsbear.com/p/5621
        if(!detailPath) {
            resolve(false);
        }
        const url = `https://ns.vbsbear.com${detailPath}`;
        axios.get(url).then(async res => {
			if (res.status === 200) {
                let content = res.data||'';
                content = await processDataCtrl.extractDetail(content);
				resolve(content);
			} else {
				resolve(false);
			}
        });
	});
};

// 获取详情数据
const getDetailContent = (list) => {
	return new Promise((resolve, reject) => {
        const promiseArr = list.map((item) => {
            return getDetail(item.href);
        });
        Promise.all(promiseArr).then((result) => {
            for(let i=0; i<list.length; i++) {
                list[i].content = result[i]||'';
            }
            // resolve(list);
            // TODO---爬取每页时延迟10s，放低频率
            setTimeout(()=>{
                resolve(list);
            }, 10000);

        }).catch((error) => {
            reject(error);
        });
	});
};

const getDataService = {
	async work() {
        let page = 1;
        // let page = 2;
        let res = [];
        let stop = false;
        let latestTime = await query(LATEST_TIME());
        latestTime = latestTime[0]?latestTime[0].publish_time:'1949';
        while (!stop) {
            const html = await getList(page);
            const list = await processDataCtrl.extractList(html);
            let resItem = [];
            // 获取数据库中已有数据的最新时间
            stop = true;
            for(let i=0; i<list.length; i++) {
                // if(new Date(list[i].publish_time) >= new Date(latestTime)) {
                if(new Date(list[i].publish_time) > new Date(latestTime)) {
                    stop = false;
                    resItem.push(list[i]);
                }
            }
            if(resItem.length !== list.length) {
                stop = true;
            }
            resItem = await getDetailContent(resItem);
            res = [...res, ...resItem];
            console.log(`读取完成第${page}页数据...`)
            page++;
            // TODO
            // if(page>99) {
            //     stop = true;
            // }
        }
    	return res;
	},
};

module.exports = getDataService;
