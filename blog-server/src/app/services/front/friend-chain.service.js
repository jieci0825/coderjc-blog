const { FriendChain } = require('@model/friend-chain.model')
const { FriendChainCategory } = require('@model/friend-chain-category')

/**
 * 获取友链列表
 */
async function getFriendChainList() {
	const categoryList = await FriendChainCategory.findAll()
	const linkList = await FriendChain.findAll()
	const list = []
	for (const category of categoryList) {
		const links = linkList.filter(link => link.link_category_id === category.id)
		list.push({ id: category.id, categoryName: category.category_name, linkList: links })
	}
	return list
}

module.exports = {
	getFriendChainList
}
