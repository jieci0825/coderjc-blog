const { Rule } = require('@/validator')

const createFriendChainCategoryRules = {
	categoryName: new Rule().isString().required([''])
}

const editFriendChainCategoryRules = {
	id: new Rule().isNumber().min(1).required([0]),
	categoryName: new Rule().isString().required([''])
}

const createFriendChainLinkRules = {
	linkName: new Rule().isString().required(['']),
	linkDesc: new Rule().and('linkName'),
	linkUrl: new Rule().and('linkName'),
	linkPreview: new Rule().and('linkName'),
	linkCategoryId: new Rule().isNumber().min(1).required([0])
}

const editFriendChainLinkRules = {
	...createFriendChainLinkRules,
	id: new Rule().and('linkCategoryId')
}

module.exports = {
	createFriendChainCategoryRules,
	editFriendChainCategoryRules,
	createFriendChainLinkRules,
	editFriendChainLinkRules
}
