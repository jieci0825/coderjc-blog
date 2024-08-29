const { Rule } = require('@/validator')

const editTagRules = {
	id: new Rule().isNumber().required().min(1),
	tagName: new Rule().isString().required()
}

module.exports = {
	editTagRules
}
