const { Music } = require('@model/music.model')

/**
 * 根据分类id获取音乐列表
 */
async function getMusicListByCategoryId(categoryId) {
	const musicList = await Music.findAll({ where: { music_category_id: categoryId } })
	return musicList
}

module.exports = {
	getMusicListByCategoryId
}
