const { ParamsError } = require('@/core/error-type')
const { isRule, checkDataType } = require('../helpers')

// 每个字段收集一个错误信息之后就截止，不再继续校验
function _executeRule(propName, rules, data, ruleOptions, errors) {
	for (const rule of rules) {
		let result = undefined
		const { validator, syncRule, message } = rule
		if (syncRule) {
			const key = syncRule()
			if (!ruleOptions[key] || !isRule(ruleOptions[key])) {
				throw new Error(`syncRule: ${key} 的同步规则不可用`)
			}
			result = _executeRule(propName, ruleOptions[key].rules, data, ruleOptions, errors)
		} else {
			result = validator(data[propName], propName, data)
		}
		// 结果为字符串时的处理方案
		if (checkDataType(result, 'string') && result !== '') {
			errors[propName] = [result]
			return {
				propName,
				message: result
			}
		} else {
			if (result === false) {
				errors[propName] = [message]
				return {
					propName,
					message
				}
			}
		}
	}
}

const queryMethods = ['GET', 'DELETE']

/**
 * 验证器类
 * @class
 */
class Validator {
	constructor() {
		this.rules = {}
	}

	_getValidateData(ctx, data) {
		let result = data
		if (!result) {
			result = queryMethods.includes(ctx.method)
				? Object.keys(ctx.request.query).length
					? ctx.request.query
					: ctx.params
				: ctx.request.body
		}
		return result
	}

	/**
	 * 执行校验的方法
	 * @method
	 * @param {object} ctx koa 上下文
	 * @param {object} ruleOptions 校验规则
	 * @param {object} data 校验的数据，若不传递，则会根据当前请求的方法读取 query 或者 body
	 * @returns {{data:object, errors:object|null}}
	 */
	validate(ctx, ruleOptions, data = null) {
		const validateData = this._getValidateData(ctx, data)

		if (ruleOptions) {
			const errors = {}

			for (const ruleKey in ruleOptions) {
				const rules = isRule(ruleOptions[ruleKey]) ? ruleOptions[ruleKey].rules : undefined
				if (!rules) continue
				_executeRule(ruleKey, rules, validateData, ruleOptions, errors)
			}

			if (Object.keys(errors).length > 0) {
				throw new ParamsError(errors)
			}
		}

		return {
			data: validateData
		}
	}
}

module.exports = Validator
