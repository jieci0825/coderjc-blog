const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('blog/category') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const {
	createBlogCategory,
	getBlogCategoryList,
	editBlogCategory,
	deleteBlogCategory
} = require('@con-back/blog-category.controller')

// 创建博客分类
router.post('/', verifyToken, verifySuperAdmin, createBlogCategory)

// 获取博客分类列表
router.get('/', verifyToken, getBlogCategoryList)

// 编辑博客分类
router.put('/', verifyToken, verifySuperAdmin, editBlogCategory)

// 删除博客分类
router.delete('/:id', verifyToken, verifySuperAdmin, deleteBlogCategory)

module.exports = router
