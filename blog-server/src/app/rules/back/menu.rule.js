const { Rule } = require('@/validator')

const createMenuRule = {
	menuName: new Rule()
		.isString()
		.required()
		.min(1)
		.pattern(/^[a-zA-Z\/\-]+$/),
	menuTitle: new Rule().isString().required().min(1),
	menuPath: new Rule()
		.isString()
		.required()
		.min(1)
		.pattern(/^[a-zA-Z\/\-]+$/), // 大小写 / -
	menuIcon: new Rule().isString().pattern(/^[a-zA-Z\/\-]+$/),
	menuSort: new Rule().isNumber().required().isInteger(),
	menuPid: new Rule().isNumber().required().isInteger().min(0),
	menuStatus: new Rule().isNumber().required().enum([0, 1])
}

const editMenuRule = { ...createMenuRule, id: new Rule().isNumber().required().min(1) }

module.exports = {
	createMenuRule,
	editMenuRule
}
