const { checkDataType } = require('../helpers')

/**
 * 规则类
 * @class
 */
class Rule {
	constructor() {
		// 存储单个字段的校验规则
		this.rules = []
	}

	/**
	 * @typedef {Object} TypeRules
	 * @property {Function} string 类型为 string 时的校验器
	 * @property {Function} number 类型为 number 时的校验器
	 * @property {Function} boolean 类型为 boolean 时的校验器
	 * @property {Function} object 类型为 object 时的校验器
	 * @property {Function} array 类型为 array 时的校验器
	 */
	/**
	 * 联合类型
	 * @param {('string' | 'number' | 'boolean' | 'object' | 'array')[]} types 类型数组
	 * @param {TypeRules} typeRules 类型规则，分别预设好不同类型时需要执行校验器函数
	 */
	unionType(types, typeRules) {
		const validatorMap = {
			string: this.isString,
			number: this.isNumber
		}
	}

	/**
	 * 是否等于某个值，严格判断
	 * @param {any} diffValue 需要比较的值
	 * @param {boolean} isProp 是否是当前校验对象对象的属性，默认 false
	 */
	toBe(diffValue, isProp = false) {
		if (isProp && !checkDataType(diffValue, 'string')) {
			throw new TypeError('isProp 为 true 时， diffValue 必须是一个字符串，且存在的属性名')
		}

		const validator = (value, field, raw) => {
			if (isProp) {
				// 如果当前属性名不存在与当前对象中，则直接返回 false
				if (!Object.prototype.hasOwnProperty.call(raw, diffValue)) {
					return false
				}
				if (raw[diffValue] === value) {
					return true
				}
				return false
			}
			if (value === diffValue) {
				return true
			}
			return false
		}
		this.rules.push({ validator, message: `该值必须是 ${diffValue}` })
		return this
	}

	/**
	 * 必填项校验
	 * @param {any} extendEmpty 扩展空值判定范围，默认 [null, undefined]
	 */
	required(extendEmpty = []) {
		const scope = [null, undefined, ...extendEmpty]
		const validator = (value, field, raw) => {
			if (scope.includes(value)) {
				return false
			}
			return true
		}
		this.rules.push({ validator, message: '不能为空' })
		return this
	}

	/**
	 * 同步某一项校验规则
	 * @param {string} key 需要同步规则的 key
	 */
	and(key) {
		if (!checkDataType(key, 'string')) {
			throw new TypeError('and 方法参数必须是一个字符串')
		}
		const syncRule = () => {
			return key
		}
		this.rules.push({ syncRule, message: `and 方法无法同步 '${key}' 的规则` })
		return this
	}

	/**
	 * 枚举值
	 * @param {any[]} enumValues 枚举值数组
	 */
	enum(enumValues) {
		if (!checkDataType(enumValues, 'array')) {
			throw new TypeError('enum 方法参数必须是一个数组')
		}

		const validator = (value, field, raw) => {
			if (enumValues.includes(value)) {
				return true
			}
			return false
		}
		this.rules.push({ validator, message: `该值必须是 ${enumValues.join(', ')}` })
		return this
	}

	/**
	 * 使用自定义校验器
	 * * @param {Function} func 自定义校验器函数
	 */
	validator(func) {
		this.rules.push({ validator: func, message: '' })
		return this
	}

	/**
	 * 是否是字符串类型
	 * @param {object} options
	 * @type {string} options.message 校验失败时的提示信息
	 */
	isString(options = {}) {
		options = Object.assign({ message: '必须是一个字符串类型' }, options)
		const validator = (value, field, raw) => {
			if (checkDataType(value, 'string')) {
				return true
			}
			return false
		}
		this.rules.push({ validator, message: options.message })
		const StringRule = require('./string-rule')
		return new StringRule(this.rules)
	}

	/**
	 * 是否是数字类型
	 * @param {object} options
	 * @type {string} options.message 校验失败时的提示信息
	 */
	isNumber(options = {}) {
		options = Object.assign({ message: '必须是一个数字类型' }, options)
		const validator = (value, field, raw) => {
			if (checkDataType(value, 'number')) {
				return true
			}
			return false
		}
		this.rules.push({ validator, message: options.message })
		const NumberRule = require('./number-rule')
		return new NumberRule(this.rules)
	}

	isArray(options = {}) {
		options = Object.assign({ message: '必须是一个数组类型' }, options)
		const validator = (value, field, raw) => {
			if (checkDataType(value, 'array')) {
				return true
			}
			return false
		}
		this.rules.push({ validator, message: options.message })
		const ArrayRule = require('./array-rule')
		return new ArrayRule(this.rules)
	}
}

module.exports = Rule
