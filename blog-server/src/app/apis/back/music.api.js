const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('music') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const {
	createMusicCategory,
	getMusicCategoryList,
	editMusicCategory,
	deleteMusicCategory,
	createMusic,
	getMusicList,
	editMusic,
	deleteMusic
} = require('@con-back/music.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 添加歌曲分类
router.post('/category', verifyToken, verifySuperAdmin, createMusicCategory)

// 获取歌曲分类列表
router.get('/category', verifyToken, verifySuperAdmin, getMusicCategoryList)

// 编辑歌曲分类
router.put('/category', verifyToken, verifySuperAdmin, editMusicCategory)

// 删除歌曲分类
router.delete('/category/:id', verifyToken, verifySuperAdmin, deleteMusicCategory)

// 添加歌曲
router.post('/song', verifyToken, verifySuperAdmin, createMusic)

// 获取歌曲列表
router.get('/song', verifyToken, verifySuperAdmin, parsePageInfo, getMusicList)

// 编辑歌曲
router.put('/song', verifyToken, verifySuperAdmin, editMusic)

// 删除歌曲
router.delete('/song/:id', verifyToken, verifySuperAdmin, deleteMusic)

module.exports = router
