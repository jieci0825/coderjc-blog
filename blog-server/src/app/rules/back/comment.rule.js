const { Rule } = require('@/validator')

const getParentCommentListRules = {
	subjectType: new Rule().enum(['0', '100', '200']),
	content: new Rule().isString(),
	page: new Rule().isNumber().required(),
	pageSize: new Rule().isNumber().min(1).max(20).required(),
	nickname: new Rule().isString()
}

const getCommentDetailRules = {
	id: new Rule().isString().required(),
	type: new Rule().enum(['parent', 'child']).required()
}

const getChildCommentListRules = {
	content: new Rule().isString(),
	page: new Rule().isNumber().required(),
	pageSize: new Rule().isNumber().min(1).max(20).required(),
	nickname: new Rule().isString(),
	parentId: new Rule().isString().required()
}

module.exports = {
	getParentCommentListRules,
	getCommentDetailRules,
	getChildCommentListRules
}
