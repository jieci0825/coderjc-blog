const {
	createMusicCategoryRules,
	editMusicCategoryRules,
	createMusicRules,
	editMusicRules
} = require('@/app/rules/back/music.rule')
const { Success, DataSuccess } = require('@/core/error-type')
const { Validator } = require('@/validator')
const musicSerivice = require('@ser-back/music.service')

/**
 * 创建歌曲分类
 */
async function createMusicCategory(ctx) {
	const { data } = new Validator().validate(ctx, createMusicCategoryRules)
	await musicSerivice.createMusicCategory(data)
	throw new Success('创建歌曲分类成功')
}

/**
 * 获取歌曲分类列表
 */
async function getMusicCategoryList(ctx) {
	const result = await musicSerivice.getMusicCategoryList()
	throw new DataSuccess(result)
}

/**
 * 编辑歌曲分类
 */
async function editMusicCategory(ctx) {
	const { data } = new Validator().validate(ctx, editMusicCategoryRules)
	await musicSerivice.editMusicCategory(data)
	throw new Success('编辑歌曲分类成功')
}

/**
 * 删除歌曲分类
 */
async function deleteMusicCategory(ctx) {
	const { id } = ctx.params
	await musicSerivice.deleteMusicCategory(id)
	throw new Success('删除歌曲分类成功')
}

/**
 * 创建歌曲
 */
async function createMusic(ctx) {
	const { data } = new Validator().validate(ctx, createMusicRules)
	await musicSerivice.createMusic(data)
	throw new Success('创建歌曲成功')
}

/**
 * 获取歌曲列表
 */
async function getMusicList(ctx) {
	const { data } = new Validator().validate(ctx)
	const result = await musicSerivice.getMusicList(data)
	throw new DataSuccess(result)
}

/**
 * 编辑歌曲
 */
async function editMusic(ctx) {
	const { data } = new Validator().validate(ctx, editMusicRules)
	await musicSerivice.editMusic(data)
	throw new Success('编辑歌曲成功')
}

/**
 * 删除歌曲
 */
async function deleteMusic(ctx) {
	const { id } = ctx.params
	await musicSerivice.deleteMusic(id)
	throw new Success('删除歌曲成功')
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
