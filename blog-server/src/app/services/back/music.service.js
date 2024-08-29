const { Collide } = require('@/core/error-type')
const { MusicCategory } = require('@model/music-category.model')
const { Music } = require('@model/music.model')
const { Op } = require('sequelize')

/**
 * 添加歌曲分类
 */
async function createMusicCategory(data) {
	const category = await MusicCategory.findOne({ where: { category_name: data.categoryName } })
	if (category) {
		throw new Collide('歌曲分类已存在')
	}
	const insertData = { category_name: data.categoryName, category_icon: data.categoryIcon }
	await MusicCategory.create(insertData)
}

/**
 * 获取歌曲分类列表
 */
async function getMusicCategoryList() {
	const categoryList = await MusicCategory.findAll()
	return categoryList
}

/**
 * 编辑歌曲分类
 */
async function editMusicCategory(data) {
	const category = await MusicCategory.findOne({ where: { category_name: data.categoryName } })
	if (category) {
		throw new Collide('歌曲分类已存在')
	}
	const updateData = { category_name: data.categoryName, category_icon: data.categoryIcon }
	await MusicCategory.update(updateData, { where: { id: data.id } })
}

/**
 * 删除歌曲分类
 */
async function deleteMusicCategory(id) {
	await MusicCategory.destroy({ where: { id } })
}

/**
 * 添加歌曲
 */
async function createMusic(data) {
	const song = await Music.findOne({ where: { song_name: data.songName } })
	if (song) {
		throw new Collide('歌曲名称已存在')
	}
	const inserData = {
		song_name: data.songName,
		singer: data.singer,
		lyric: data.lyric,
		song_url: data.songUrl,
		song_cover: data.songCover,
		music_category_id: data.musicCategoryId
	}
	await Music.create(inserData)
}

/**
 * 获取歌曲列表
 */
async function getMusicList(data) {
	const where = {}
	if (data.songName) {
		where.song_name = { [Op.substring]: data.songName }
	}
	const { rows, count } = await Music.findAndCountAll({
		where,
		offset: data.page,
		limit: data.pageSize,
		order: [['id', 'DESC']]
	})
	const categoryId = rows.map(item => item.music_category_id)
	const categoryList = await MusicCategory.findAll({ where: { id: categoryId } })
	for (const row of rows) {
		const category = categoryList.find(category => category.id === row.music_category_id)
		row.dataValues.category_name = category.category_name
	}
	return { list: rows, total: count }
}

/**
 * 编辑歌曲
 */
async function editMusic(data) {
	const updateData = {
		song_name: data.songName,
		singer: data.singer,
		lyric: data.lyric,
		song_url: data.songUrl,
		song_cover: data.songCover,
		music_category_id: data.musicCategoryId
	}
	await Music.update(updateData, { where: { id: data.id } })
}

/**
 * 删除歌曲
 */
async function deleteMusic(id) {
	await Music.destroy({ where: { id } })
}

module.exports = {
	createMusicCategory,
	getMusicCategoryList,
	editMusicCategory,
	deleteMusicCategory,
	createMusic,
	getMusicList,
	editMusic,
	deleteMusic
}
