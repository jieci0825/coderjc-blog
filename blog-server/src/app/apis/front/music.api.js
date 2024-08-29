const Router = require('koa-router')
const { genFrontPrefix } = require('@/utils')
const router = new Router({ prefix: genFrontPrefix('music') })
const { getMusicCategoryList } = require('@con-back/music.controller')
const { getMusicListByCategoryId } = require('@con-front/music.controller')

// 获取音乐分类列表
router.get('/category', getMusicCategoryList)

// 根据分类id获取音乐列表
router.get('/', getMusicListByCategoryId)

module.exports = router
