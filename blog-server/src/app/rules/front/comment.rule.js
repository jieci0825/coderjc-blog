const { Rule } = require('@/validator')

const publishParentCommentRules = {
	content: new Rule().isString().required(),
	imageIds: new Rule().isString(),
	subjectId: new Rule().isNumber().required(),
	subjectType: new Rule().enum([100, 200]).required()
}

const getParentCommentRules = {
	subjectId: new Rule().required(),
	subjectType: new Rule().enum(['100', '200']).required(),
	page: new Rule().isNumber().required(),
	pageSize: new Rule().isNumber().min(1).max(20).required(),
	sort: new Rule().enum(['hot', 'latest']).required()
}

const publishChildCommentRules = {
	parentId: new Rule().isNumber().required([0]),
	replyId: new Rule().isNumber().required(),
	content: new Rule().isString().required(),
	imageIds: new Rule().isString()
}

const getChildCommentRules = {
	page: new Rule().isNumber().required(),
	pageSize: new Rule().isNumber().min(1).max(20).required(),
	sort: new Rule().enum(['hot', 'latest']).required(),
	parentId: new Rule().isString().required([0])
}

module.exports = {
	publishParentCommentRules,
	getParentCommentRules,
	publishChildCommentRules,
	getChildCommentRules
}
