// 封装一些基本sql语句

// 查询数据库表
const QUERY_TABLE = (tabelName) => `SELECT * FROM ${tabelName}`;

// 插入数据
const INSERT_TABLE = (tableName, {key, val}) => `INSERT INTO ${tableName}(${key}) VALUES ${val}`;

// 更新数据
const UPDATE_TABLE = (tableName, {primaryKey, primaryVal}, {key, val}) => `UPATE ${tableName} SET ${key}=${val} WHERE(${primaryKey}=${primaryVal})`;

// 删除数据
// const DELETE_TABLE = (tabelName, {primaryKey, primaryVal}) => `DELETE FROM ${tabelName} WHERE(${primaryKey}=${primaryVal})`;
// 删除数据-逻辑删除
const DELETE_TABLE = (tabelName, {primaryKey, primaryVal}) => `UPATE ${tableName} SET isvalid=1 WHERE(${primaryKey}=${primaryVal})`;

// 获取资源表中数据最新时间（publish_time）
const LATEST_TIME = () => `SELECT publish_time FROM ns_resources_list WHERE isvalid=0 AND publish_time IS NOT NULL AND publish_time <> '' ORDER BY publish_time DESC LIMIT 1`;

module.exports = {
    QUERY_TABLE,
    INSERT_TABLE,
    UPDATE_TABLE,
    DELETE_TABLE,
    LATEST_TIME
};