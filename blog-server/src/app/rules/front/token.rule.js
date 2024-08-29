const { Rule } = require('@/validator')

const getTokenRules = {
	account: new Rule().isString().required(),
	password: new Rule().isString().required()
}

module.exports = {
	getTokenRules
}
