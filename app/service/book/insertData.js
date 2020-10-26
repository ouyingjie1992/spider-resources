/**
 * 写入数据库
 */
const {query} = require('../../../utils/query');
const {
    UPDATE_TABLE,
    INSERT_TABLE
} = require('../../../utils/bookSql');

// 更新书单数据
const updateBook = async (data) => {
    let res = {};
    for(let i=0; i<data.length; i++) {
        const item = data[i];
        if(item.updateList.length > 0) {
            // 有更新
            res = await insertChapter(item);
        }
    }
    return data;
};
// 写入章节数据
const insertChapter = async (book) => {
    const data = book.updateList;
    const keyArr = ['title', 'href', 'content', 'book_id'];
    const key = keyArr.join(',');
    let val = '';
    const maxLength = data.length;
    const maxInsert = 100; //每次最大insert量
    for(let i=0; i<data.length; i++) {
        let valItem = '';
        for(let j=0; j<keyArr.length; j++) {
            valItem += `"${data[i][keyArr[j]]}"`;
            if(j !== keyArr.length-1) {
                valItem += ',';
            }
        }
        val += `(${valItem})`;

        // 每一百条数据插入一次
        if((i+1)>=maxInsert && (i+1)%maxInsert === 0) {
            await query(INSERT_TABLE('chapter_list', {'key': key, 'val': val})).then(async () => {
                console.log(`《${book.name}》章节数据写入成功:${i-maxInsert+2}~${i+1}`);
                await query(UPDATE_TABLE('book_list', `id=${book.id}`, `status=2,lastest_chapter="${data[i].title}"`));
            }).catch(error => {
                console.log('Error', error.message);
            });
            val = '';
        } else {
            if(i !== data.length-1) {
                val += ',';
            }
        }
    }
    if(val !== '') {
        await query(INSERT_TABLE('chapter_list', {'key': key, 'val': val})).then(async () => {
            console.log(`《${book.name}》章节数据写入成功:${parseInt(maxLength/maxInsert)*maxInsert+1}~${maxLength}`);
            await query(UPDATE_TABLE('book_list', `id=${book.id}`, `status=2,lastest_chapter="${data[maxLength-1].title}"`));
        }).catch(error => {
            console.log('Error', error.message);
        });
    }
    return data;
};

const getDataService = {
	async work(res) {
        const list = await updateBook(res);
    	return list;
	},
};

module.exports = getDataService;
