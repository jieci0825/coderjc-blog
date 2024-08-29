const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('blog/tag') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { createBlogTags, getBlogTagList, editBlogTag, deleteBlogTag } = require('@con-back/blog-tag.controller')
const { parsePageInfo } = require('@/middleware/parse.middleware')

// 创建标签
router.post('/', verifyToken, verifySuperAdmin, createBlogTags)

// 获取标签列表
router.get('/', verifyToken, parsePageInfo, getBlogTagList)

// 编辑标签
router.put('/', verifyToken, verifySuperAdmin, editBlogTag)

// 删除标签
router.delete('/:id', verifyToken, verifySuperAdmin, deleteBlogTag)

module.exports = router
