const { Rule } = require('@/validator')

const createBlogCategoryRules = {
	categoryName: new Rule().isString().required([''])
}

const editBlogCategoryRules = {
	...createBlogCategoryRules,
	id: new Rule().isNumber().min(1).required()
}

module.exports = {
	createBlogCategoryRules,
	editBlogCategoryRules
}
