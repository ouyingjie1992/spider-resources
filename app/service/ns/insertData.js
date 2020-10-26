/**
 * 写入数据库
 */
const {query} = require('../../../utils/query');
const {
  INSERT_TABLE
} = require('../../../utils/nsSql');

// 写入资源数据
const insert = async (data) => {
    const keyArr = ['title', 'author', 'publish_time', 'href', 'content'];
    const key = keyArr.join(',');
    for(let i=0; i<data.length; i++) {
        const valArr = [];
        for(let j=0; j<keyArr.length; j++) {
            valArr.push(`"${data[i][keyArr[j]]}"`);
        }
        await query(INSERT_TABLE('ns_resources_list', {'key': key, 'val': `(${valArr.join(',')})`}));
    }
    return data;
};

const getDataService = {
	async work(res) {
        const list = insert(res);
    	return list;
	},
};

module.exports = getDataService;
