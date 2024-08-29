const Rule = require('.')
const { checkDataType, usePositiveInteger } = require('../helpers')

/**
 * 字符串验证规则
 * @class
 */
class StringRule extends Rule {
	constructor(rules) {
		super()
		this.rules = rules
	}

	/**
	 * 字符串最小长度
	 * @param {number} count 传入一个正整数
	 */
	min(count) {
		usePositiveInteger(count, 'min 方法需要接收一个正整数类型的参数')
		const validator = (value, field, raw) => {
			if (value.length < count) {
				return false
			}
			return true
		}
		this.rules.push({ validator, message: `字符长度不得小于 ${count}` })
		return this
	}

	/**
	 * 字符串最大长度
	 * @param {number} count 传入一个正整数
	 */
	max(count) {
		usePositiveInteger(count, 'max 方法需要接收一个正整数类型的参数')
		const validator = (value, field, raw) => {
			if (value.length > count) {
				return false
			}
			return true
		}
		this.rules.push({ validator, message: `字符长度不得大于 ${count}` })
		return this
	}

	/**
	 * 正则校验
	 * @param {RegExp} regExp 传入一个正则表达式
	 */
	pattern(regExp) {
		if (!checkDataType(regExp, 'regexp')) {
			throw new TypeError('pattern 方法需要接收一个正则表达式类型的参数')
		}
		const validator = (value, field, raw) => {
			if (!regExp.test(value)) {
				return false
			}
			return true
		}
		this.rules.push({ validator, message: `不符合预设的格式` })
		return this
	}
}

module.exports = StringRule
