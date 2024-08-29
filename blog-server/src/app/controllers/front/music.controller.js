const { DataSuccess } = require('@/core/error-type')
const musicService = require('@ser-front/music.service')

/**
 * 根据分类id获取音乐列表
 */
async function getMusicListByCategoryId(ctx) {
	const { categoryId } = ctx.request.query
	const result = await musicService.getMusicListByCategoryId(categoryId)
	throw new DataSuccess(result)
}

module.exports = {
	getMusicListByCategoryId
}
