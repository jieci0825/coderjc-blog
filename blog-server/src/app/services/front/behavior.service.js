const { sequelize } = require('@/core/db')
const { ParamsError } = require('@/core/error-type')
const { LikeType } = require('@/enums')
const { Blog } = require('@model/blog.model')
const { CommentParent } = require('@model/comment-parent.model')
const { CommentChild } = require('@model/comment-child.model')
const { Like } = require('@model/like.model')

/**
 * 点赞
 */
async function createLike(data, userId) {
	const insertData = {
		subject_id: data.subjectId,
		subject_type: data.subjectType,
		user_id: userId
	}

	// 点赞的无法重复点赞
	const isLike = await getLikeStatus({ ...data, userId })
	if (isLike) return

	const result = await sequelize.transaction(async t => {
		const subject = await getLikeSubject(data)
		if (!subject) return

		await subject.increment('like_nums', { by: 1, transaction: t })
		await Like.create(insertData, { transaction: t })
	})
	return result
}

/**
 * 取消点赞
 */
async function cancelLike(data, userId) {
	// 未点赞的无法取消点赞
	const isLike = await getLikeStatus({ ...data, userId })
	if (!isLike) return

	const result = await sequelize.transaction(async t => {
		const subject = await getLikeSubject(data)
		if (!subject) return

		await subject.decrement('like_nums', { by: 1, transaction: t })
		const where = {
			subject_id: data.subjectId,
			subject_type: data.subjectType,
			user_id: userId
		}
		await Like.destroy({ where, force: true, transaction: t })
	})
	return result
}

/**
 * 获取点赞主体
 */
async function getLikeSubject(data) {
	const type = data.subjectType

	let subject = null
	switch (type) {
		case LikeType.BLOG:
			subject = await Blog.findOne({ where: { id: data.subjectId } })
			break
		case LikeType.PARENT_COMMENT:
			subject = await CommentParent.findOne({ where: { id: data.subjectId } })
			break
		case LikeType.CHILD_COMMENT:
			subject = await CommentChild.findOne({ where: { id: data.subjectId } })
			break
		default:
			throw new ParamsError('点赞类型错误')
	}
	return subject
}

/**
 * 获取点赞状态
 * @param {object} data
 * @param {number} data.subjectId
 * @param {number} data.subjectType
 * @param {number} data.userId
 */
async function getLikeStatus(data) {
	const where = {
		subject_id: data.subjectId,
		subject_type: data.subjectType,
		user_id: data.userId
	}
	const result = await Like.findOne({ where })
	return !!result
}

module.exports = {
	createLike,
	getLikeStatus,
	cancelLike
}
