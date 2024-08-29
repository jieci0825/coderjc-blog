const { Rule } = require('@/validator')

const createDailyQuoteRules = {
	content: new Rule().isString().required(['']),
	author: new Rule().and('content')
}

const editDailyQuoteRules = {
	...createDailyQuoteRules,
	id: new Rule().isNumber().isInteger().isNumber(1)
}

module.exports = {
	createDailyQuoteRules,
	editDailyQuoteRules
}
