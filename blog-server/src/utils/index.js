const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const CryptoJS = require('crypto-js')

/**
 * md5加密方法
 * @param {string} password 传入需要加密的密码
 */
function md5password(password) {
	const md5 = crypto.createHash('md5')
	return md5.update(password).digest('hex')
}

/**
 * 生成随机字符串长度
 * @param {Number} 长度 默认值：6
 * @returns {string}
 */
const generateRandomString = (len = 6) => {
	if (len <= 11) {
		return Math.random()
			.toString(36)
			.substring(2, 2 + len)
			.padEnd(len, '0')
	} else {
		return generateRandomString(11) + generateRandomString(len - 11)
	}
}

/**
 * 生成一个随机整数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
const generateRandomInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 格式化时间
 * @param {Date|string} time 需要格式化的时间
 * @param {string} str 格式化字符串 `YYYY-MM-DD HH:mm:ss`
 * @returns {string}
 */
const formatDateTime = (time = new Date(), str = 'YYYY-MM-DD HH:mm:ss') => {
	return dayjs(time).format(str)
}

/**
 * 检测一个值是否属存在于当前枚举对象
 * @param {*} value 检测的值
 * @returns {Boolean}
 */
function isThisType(value) {
	for (const key in this) {
		if (this[key] === value) {
			return true
		}
	}
	return false
}

/**
 * 创建一个枚举对象
 * @param {object} enums
 * @returns {object} 返回一个模拟的枚举对象
 */
function createEnums(enums) {
	// 让 isThisType 属性不可遍历
	Object.defineProperty(enums, 'isThisType', {
		value: isThisType,
		enumerable: false
	})
	return Object.freeze(enums)
}

/**
 * 生成 token
 * @param {object} info 保存的信息
 * @param {string} secretKey 密钥
 * @param {*} expiresIn 有效时间
 * @returns {string}
 */
function generateToken(info, secretKey, expiresIn) {
	const token = jwt.sign(info, secretKey, { expiresIn, algorithm: 'RS256' })
	return token
}

/**
 * 生成刷新 token
 * @param {object} info 保存的信息
 * @param {string} secretKey 密钥
 * @param {*} expiresIn 有效时间
 * @returns {string}
 */
function generateRefreshToken(info, secretKey, expiresIn) {
	const token = jwt.sign(info, secretKey, { expiresIn })
	return token
}

/**
 * 生成前台路由前缀
 * @param {string} prefix 前缀
 * @returns {string}
 */
function genFrontPrefix(prefix) {
	return `/api/front/${prefix}`
}

/**
 * 生成后台路由前缀
 * @param {string} prefix 前缀
 * @returns {string}
 */
function genBackPrefix(prefix) {
	return `/api/back/${prefix}`
}

/**
 * 转为驼峰命名法
 * @param {string} key
 */
function toCamelCase(key) {
	const splits = key.split('_')
	if (splits.length === 1) {
		return key
	}
	return splits
		.map((word, index) =>
			index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join('')
}

/**
 * 给一个对象里面的所有属性名转为驼峰命名法
 * @param {object} obj
 */
function toCamelCaseForObj(obj) {
	for (const key in obj) {
		const oldKey = key
		const newKey = toCamelCase(key)
		if (oldKey !== newKey) {
			obj[toCamelCase(key)] = obj[key]
			delete obj[key]
		}
	}
	return obj
}

/**
 * 判断某个对象上是否具有某个属性
 * @param {object} obj 对象
 * @param {string} prop 属性名
 */
function hasOwnProp(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * 将数据转为树形结构
 * @param {array} data 数据
 * @param {number} pid 父级id
 * @param {object} options 配置项
 * @param {string} options.parentField 父级id字段名
 * @param {string} options.childrenField 子级字段名
 * @param {array|null} options.childEmpty 子级为空时返回的值
 * @returns {array}
 */
function toTree(data, pid = 0, options) {
	const defaultOptions = {}
	Object.assign(
		defaultOptions,
		{
			parentField: 'parentId',
			childrenField: 'children',
			childEmpty: []
		},
		options
	)

	function getTree(list, pid) {
		const tree = []
		for (const item of list) {
			// console.log(item[defaultOptions.parentField], pid)
			if (item[defaultOptions.parentField] === pid) {
				const node = {
					...item,
					[defaultOptions.childrenField]: getTree(list, item.id)
				}
				tree.push(node)
			}
		}
		return tree.length ? tree : defaultOptions.childEmpty
	}

	return getTree(data, pid)
}

/**
 * 对树形数据进行排序
 * @param {array} treeData 属性数据
 * @param {string} sortField
 * @returns
 */
function sortTree(treeData, sortField) {
	const sortData = JSON.parse(JSON.stringify(treeData))

	function deepSort(list) {
		list.sort((a, b) => {
			if (a.children && a.children.length > 0) {
				deepSort(a.children)
			}
			return a[sortField] - b[sortField]
		})
	}
	deepSort(sortData)

	return sortData
}

/**
 * 解密
 * @param {string} encryptedMessage 加密的字符串
 * @returns {string} 解密后的字符串
 */
function decrypt(encryptedMessage) {
	const bytes = CryptoJS.AES.decrypt(encryptedMessage, global.config.aesKey)
	return bytes.toString(CryptoJS.enc.Utf8)
}

const _generateNumberCode = (len = 6) => {
	let captcha = ''
	for (let i = 0; i < len; i++) {
		captcha += Math.floor(Math.random() * 10) // 生成 0 到 9 之间的随机数字
	}
	return captcha
}

/**
 * 生成数字验证码
 */
const genNumberCode = async (model, len = 6) => {
	let result = ''
	async function _deep() {
		const captcha = _generateNumberCode(len)
		const info = await model.findOne({ where: { captcha } })
		if (info) {
			await _deep()
		} else {
			result = captcha
		}
	}
	await _deep()
	return result
}

/**
 * 获取两个日期区间之间的所有日期
 * @param {string} startDate 开始日期
 * @param {string} endDate 结束日期
 * @returns {array}
 */
function getDatesBetween(startDate, endDate) {
	const dates = []
	let currentDate = dayjs(startDate)
	const endDateObj = dayjs(endDate)

	while (currentDate.isBefore(endDateObj) || currentDate.isSame(endDateObj)) {
		dates.push(currentDate.format('YYYY-MM-DD'))
		currentDate = currentDate.add(1, 'day')
	}

	return dates
}

/**
 * 根据当前日期获取不同的历史日期区间
 */
function getHistoryDateRange(date) {
	const _dayjs = dayjs(date)

	// 获取昨天的日期
	const yesterday = _dayjs.subtract(1, 'day').format('YYYY-MM-DD')

	// 获取最近三天的日期
	const lastThreeDays = []
	for (let i = 0; i < 3; i++) {
		lastThreeDays.push(_dayjs.subtract(i, 'day').format('YYYY-MM-DD'))
	}

	// 获取最近一周的日期
	const lastWeek = []
	for (let i = 0; i < 7; i++) {
		lastWeek.push(_dayjs.subtract(i, 'day').format('YYYY-MM-DD'))
	}

	// 获取最近30天的日期
	const lastThirtyDays = []
	for (let i = 0; i < 30; i++) {
		lastThirtyDays.push(_dayjs.subtract(i, 'day').format('YYYY-MM-DD'))
	}

	return {
		yesterday: [yesterday],
		lastThreeDays,
		lastWeek,
		lastThirtyDays
	}
}

/**
 * 计算两个日期之间的天数差
 * @param {string} startDate 开始日期
 * @param {string} endDate 结束日期
 * @returns {number} 天数差
 */
function getDaysDiff(startDate, endDate) {
	return dayjs(endDate).diff(dayjs(startDate), 'day')
}

module.exports = {
	formatDateTime,
	generateRandomString,
	generateRandomInteger,
	md5password,
	createEnums,
	generateToken,
	generateRefreshToken,
	genBackPrefix,
	genFrontPrefix,
	toCamelCase,
	toCamelCaseForObj,
	hasOwnProp,
	toTree,
	sortTree,
	decrypt,
	genNumberCode,
	getDatesBetween,
	getHistoryDateRange,
	getDaysDiff
}
