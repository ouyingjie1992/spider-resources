/**
 * 获取原数据
 */
const {query} = require('../../../utils/query');
const {
    QUERY_TABLE
} = require('../../../utils/bookSql');

const getDataByBaseService = {
    // 获取书籍数据
	async book() {
        let bookList = await query(QUERY_TABLE('book_list'));
    	return bookList;
	},
    // 获取书籍章节数据
	async chapterList(bookId) {
        let list = await query(QUERY_TABLE('chapter_list', `book_id=${bookId}`, 'id, title'));
    	return list;
	},
    // 获取书籍章节详情数据
	async chapterDetails(chapterId) {
        let details = await query(QUERY_TABLE('chapter_list', `id=${chapterId}`));
    	return details;
	},
};

module.exports = getDataByBaseService;
