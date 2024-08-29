const { Rule } = require('@/validator')

const createMusicCategoryRules = {
	categoryName: new Rule().isString().required(['']),
	categoryIcon: new Rule().isString().required([''])
}

const editMusicCategoryRules = {
	id: new Rule().isNumber().min(1).required([0]),
	categoryName: new Rule().isString().required(['']),
	categoryIcon: new Rule().isString().required([''])
}

const createMusicRules = {
	songName: new Rule().isString().required(['']),
	singer: new Rule().and('songName'),
	lyric: new Rule().and('songName'),
	songUrl: new Rule().and('songName'),
	songCover: new Rule().and('songName'),
	musicCategoryId: new Rule().isNumber().min(1).required([0])
}

const editMusicRules = {
	...createMusicRules,
	id: new Rule().and('musicCategoryId')
}

module.exports = {
	createMusicCategoryRules,
	editMusicCategoryRules,
	createMusicRules,
	editMusicRules
}
