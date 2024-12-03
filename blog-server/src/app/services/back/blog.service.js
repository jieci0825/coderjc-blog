const { sequelize } = require('@/core/db')
const { Blog } = require('@model/blog.model')
const { BlogTag } = require('@model/blog-tag.model')
const { BlogTagUnite } = require('@model/blog-tag.unite.model')
const { Op } = require('sequelize')
const blogCategoryService = require('./blog-category.service')
const { toCamelCaseForObj, formatDateTime } = require('@/utils')
const { User } = require('@/app/models/user.model')
const { BlogCategory } = require('@model/blog-category.model')
const { NotFound } = require('@/core/error-type')
const frontBehaviorService = require('@ser-front/behavior.service')
const { LikeType } = require('@/enums')
const frontCommentService = require('@ser-front/comment.service')

/**
 * 创建博客
 * @params {object} data
 */
async function createBlog(data) {
	const insertData = {
		date: new Date(),
		preview_url: data.previewUrl,
		title: data.title,
		description: data.description,
		html_content: data.htmlContent,
		md_content: data.mdContent,
		status: data.status,
		author_id: data.authorId,
		category_id: data.categoryId || null
	}

	const result = await sequelize.transaction(async t => {
		const blog = await Blog.create(insertData, { transaction: t })
		const tagInsertData = data.tagIds.map(tagId => {
			return { tag_id: tagId, blog_id: blog.id }
		})
		// 批量插入博客标签关联表
		await BlogTagUnite.bulkCreate(tagInsertData, { transaction: t })
		// 更新分类的博客数量
		if (insertData.category_id) {
			const category = await BlogCategory.findByPk(insertData.category_id)
			await category.increment('blog_nums', { by: 1, transaction: t })
		}
	})

	return result
}

/**
 * 获取博客列表
 * @params {object} data
 */
async function getBlogList(data, mode = 'back') {
	const where = {}
	if (data.title) where.title = { [Op.substring]: data.title }
	if (data.categoryId) where.category_id = +data.categoryId

	if (mode === 'front') {
		where.status = 1
	}

	// 获取所有的分类
	const allBlogCategory = await blogCategoryService.getBlogCategoryList()
	const blogCategoryList = allBlogCategory.map(item => {
		return { id: item.id, categoryName: item.category_name }
	})
	const { rows, count } = await Blog.findAndCountAll({
		where,
		offset: data.page,
		limit: data.pageSize,
		order: [['date', 'DESC']],
		attributes: { exclude: ['html_content', 'createdAt', 'updatedAt', 'deletedAt'] }
	})

	// 提取本次查询博客列表的作者id并查询作者昵称
	const authorIds = [...new Set(rows.map(item => item.author_id))]
	const authorList = await User.findAll({ where: { id: authorIds } })
	const authorMap = authorList.map(item => {
		return { id: item.id, authorName: item.nickname }
	})

	// 获取本次查询博客列表素有的标签id并查询标签信息
	const blogIds = rows.map(item => item.id)
	const BlogTagIds = await BlogTagUnite.findAll({ where: { blog_id: blogIds } })
	const tagIds = [...new Set(BlogTagIds.map(item => item.tag_id))]
	const tagList = await BlogTag.findAll({ where: { id: tagIds } })

	const blogList = []

	for (const row of rows) {
		const item = row.dataValues
		// 分类
		const category = blogCategoryList.find(item => item.id === row.category_id)
		item.categoryName = category ? category.categoryName : '未分类'
		// 标签
		const BlogTagIds = await BlogTagUnite.findAll({ where: { blog_id: item.id } })
		const tagIds = BlogTagIds.map(item => item.tag_id)
		item.tags = tagList.filter(item => tagIds.includes(item.id))
		// 作者
		const authorInfo = authorMap.find(item => item.id === row.author_id)
		item.author = authorInfo ? authorInfo.authorName : ''
		// 格式化
		item.date = formatDateTime(item.date)
		blogList.push(toCamelCaseForObj(item))
		// 获取博客的评论数量
		item.commentNums = await frontCommentService.getCommentCount({ subject_id: item.id, subject_type: LikeType.BLOG })
	}

	return {
		list: blogList,
		total: count
	}
}

/**
 * 获取博客详情
 */
async function getBlogDetail(id, userId) {
	const blogDetail = await Blog.findOne({ where: { id } })
	// 博客访问量+1
	blogDetail.increment('look_nums')
	// 是否点赞
	blogDetail.dataValues.isLike = userId
		? await frontBehaviorService.getLikeStatus({ subjectId: id, subjectType: LikeType.BLOG, userId })
		: false
	// 标签
	const BlogTagIds = await BlogTagUnite.findAll({ where: { blog_id: blogDetail.id } })
	const tagIds = BlogTagIds.map(item => item.tag_id)
	const tagList = await BlogTag.findAll({ where: { id: tagIds } })
	blogDetail.dataValues.tags = tagList
	// 分类
	const category = await BlogCategory.findOne({ where: { id: blogDetail.category_id } })
	blogDetail.dataValues.categoryName = category ? category.dataValues.category_name : '未分类'
	return blogDetail
}

/**
 * 编辑博客
 * @params {object} data
 */
async function editBlog(data) {
	const blog = await Blog.findByPk(data.id)
	if (!blog) throw new NotFound('博客不存在')

	const updateData = {
		preview_url: data.previewUrl,
		title: data.title,
		description: data.description,
		html_content: data.htmlContent,
		md_content: data.mdContent,
		status: data.status,
		category_id: data.categoryId || null
	}
	const result = await sequelize.transaction(async t => {
		await Blog.update(updateData, { where: { id: data.id }, transaction: t })
		const tagInsertData = data.tagIds.map(tagId => {
			return { tag_id: tagId, blog_id: data.id }
		})
		// 删除之前的标签关联在添加新的标签关联
		await BlogTagUnite.destroy({ where: { blog_id: data.id }, force: true, transaction: t })
		await BlogTagUnite.bulkCreate(tagInsertData, { transaction: t })

		const newCategoryId = data.categoryId
		const oldCategoryId = blog.category_id

		// 新旧分类id不一样时，进行后续操作
		if (newCategoryId === oldCategoryId) return

		// 如果旧的分类存在，则将旧的分类的博客数量减1
		if (oldCategoryId) {
			const category = await BlogCategory.findByPk(oldCategoryId)
			category && (await category.decrement('blog_nums', { by: 1, transaction: t }))
		}

		// 将新的分类的博客数量加1
		const newCategory = await BlogCategory.findByPk(newCategoryId)
		newCategory && (await newCategory.increment('blog_nums', { by: 1, transaction: t }))
	})

	return result
}

/**
 * 删除博客
 */
async function deleteBlog(id) {
	const result = await sequelize.transaction(async t => {
		// 博客的分类数量减1
		const blog = await Blog.findOne({ where: { id } })
		if (!blog) throw new NotFound('博客不存在')
		const categoryId = blog.category_id
		if (categoryId) {
			const category = await BlogCategory.findOne({ where: { id: categoryId } })
			category && (await category.decrement('blog_nums', { by: 1, transaction: t }))
		}
		// 删除之前的标签关联
		await BlogTagUnite.destroy({ where: { blog_id: id }, force: true, transaction: t })
		await Blog.destroy({ where: { id }, force: true, transaction: t })
	})
	return result
}

module.exports = {
	createBlog,
	getBlogList,
	getBlogDetail,
	editBlog,
	deleteBlog
}
