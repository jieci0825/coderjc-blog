const { Rule } = require('@/validator')

const createBlogRules = {
	title: new Rule().isString().required(),
	previewUrl: new Rule().isString(),
	description: new Rule().isString().min(0).max(200),
	htmlContent: new Rule().isString().required(),
	mdContent: new Rule().isString().required(),
	status: new Rule().enum([0, 1, 2]).required(),
	tagIds: new Rule().isArray()
}

const editBlogRules = {
	...createBlogRules,
	id: new Rule().isNumber().min(1).required()
}

const getBlogListRules = {
	page: new Rule().isNumber().min(0).required(),
	pageSize: new Rule().isNumber().min(1).required(),
	title: new Rule().isString()
}

module.exports = {
	createBlogRules,
	getBlogListRules,
	editBlogRules
}
