const Rule = require('.')
const { checkDataType } = require('../helpers')

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
	 * 数字最小值
	 * @param {number} count 传入一个数字
	 */
	min(count) {
		if (!checkDataType(count, 'number')) {
			throw new TypeError('min 方法需要接收一个数字类型的参数')
		}
		const validator = (value, field, raw) => {
			if (value < count) {
				return false
			}
			return true
		}
		this.rules.push({ validator, message: `数值不得小于 ${count}` })
		return this
	}

	/**
	 * 数字最大值
	 * @param {number} count 传入一个数字
	 */
	max(count) {
		if (!checkDataType(count, 'number')) {
			throw new TypeError('max 方法需要接收一个数字类型的参数')
		}
		const validator = (value, field, raw) => {
			if (value > count) {
				return false
			}
			return true
		}
		this.rules.push({ validator, message: `数值不得大于 ${count}` })
		return this
	}

	/**
	 * 限制当前数字类型只能为正整数
	 */
	isInteger() {
		const validator = (value, field, raw) => {
			return Number.isInteger(value)
		}
		this.rules.push({ validator, message: `必须是一个整数` })
		return this
	}
}

module.exports = StringRule
