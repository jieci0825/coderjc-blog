const { Rule } = require('@/validator')

const getBlogRankRules = {
	type: new Rule().enum(['hot', 'latest'])
}

const getBlogListRules = {
	title: new Rule().isString(),
	page: new Rule().required().isNumber(),
	pageSize: new Rule().required().isNumber()
}

module.exports = {
	getBlogRankRules,
	getBlogListRules
}
