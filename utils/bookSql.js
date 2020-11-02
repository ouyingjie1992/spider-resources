// 封装一些基本sql语句

// 查询数据库表
const QUERY_TABLE = (tabelName, condition, val) => `SELECT ${val?val:'*'} FROM ${tabelName} WHERE(${condition?condition:'1=1'})`;

// 插入数据
const INSERT_TABLE = (tableName, {key, val}) => `INSERT INTO ${tableName}(${key}) VALUES ${val}`;

// 更新数据
const UPDATE_TABLE = (tableName, condition, setContent) => `UPDATE ${tableName} SET ${setContent} WHERE(${condition})`;

// 删除数据
// const DELETE_TABLE = (tabelName, {primaryKey, primaryVal}) => `DELETE FROM ${tabelName} WHERE(${primaryKey}=${primaryVal})`;
// 删除数据-逻辑删除
const DELETE_TABLE = (tabelName, {primaryKey, primaryVal}) => `UPATE ${tableName} SET isvalid=1 WHERE(${primaryKey}=${primaryVal})`;

// 查询书架数据
const BOOK_LIST = () => `SELECT id, name, href, lastest_chapter FROM book_list WHERE isvalid=0`;

module.exports = {
    QUERY_TABLE,
    INSERT_TABLE,
    UPDATE_TABLE,
    DELETE_TABLE,
    BOOK_LIST
};