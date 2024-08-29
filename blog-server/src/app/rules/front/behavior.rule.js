const { Rule } = require('@/validator')

const createLikeRules = {
	subjectId: new Rule().isNumber().min(1).required(),
	subjectType: new Rule().enum([100, 200, 300]).required()
}

const closeLikeRules = { ...createLikeRules }

module.exports = {
	createLikeRules,
	closeLikeRules
}
