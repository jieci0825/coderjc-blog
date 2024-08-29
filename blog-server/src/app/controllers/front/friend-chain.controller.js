const { DataSuccess } = require('@/core/error-type')
const friendChainService = require('@ser-front/friend-chain.service')

/**
 * 获取友链列表
 */
async function getFriendChainList(ctx) {
	const result = await friendChainService.getFriendChainList()
	throw new DataSuccess(result)
}

module.exports = {
	getFriendChainList
}
