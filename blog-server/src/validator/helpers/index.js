/**
 * 获取数据的型
 * @param {any} value
 * @returns {'string'|'number'|'boolean'|'object'|'array'|'function'|'undefined'|'null'|'symbol'|'bigint'}
 */
function getDataType(value) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

/**
 * 检查数据类型
 * @param {any} value 检测的数据
 * @param {'string'|'number'|'boolean'|'object'|'array'|'function'|'undefined'|'null'|'symbol'|'bigint'|'regexp'} type 期望的类型
 * @returns {boolean} 符合期望类型返回 true 反之则是 false
 */
function checkDataType(value, type) {
	return getDataType(value) === type
}

/**
 * 是否是正整数，包含0
 * @param {number} value
 */
function isPositiveInteger(value) {
	return value >= 0 && Number.isInteger(value)
}

/**
 * 正整数拦截
 */
function usePositiveInteger(value, msg = '必须为正整数') {
	if (!isPositiveInteger(value)) {
		throw new TypeError(msg)
	}
}

/**
 * 是否是一个 Rule 配置
 */
function isRule(value) {
	const Rule = require('../rules')
	return value instanceof Rule
}

/**
 * 是否为空
 */
function isEmpty(value) {
	return value === undefined || value === null || value === ''
}

module.exports = {
	checkDataType,
	getDataType,
	isPositiveInteger,
	usePositiveInteger,
	isRule,
	isEmpty
}
