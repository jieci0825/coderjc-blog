const { CommentParent } = require('@/app/models/comment-parent.model')
const { CommentChild } = require('@/app/models/comment-child.model')
const { User } = require('@model/user.model')
const { Op } = require('sequelize')
const { CommentType } = require('@/enums')
const { sequelize } = require('@/core/db')
const frontCommentService = require('@ser-front/comment.service')
const { formatDateTime } = require('@/utils')

/**
 * 获取父级评论列表
 */
async function getParentCommentList(condition) {
	const where = {}

	if (condition.nickname) {
		const userList = await User.findAll({
			where: {
				nickname: {
					[Op.substring]: condition.nickname
				}
			}
		})
		const userIds = userList.map(item => item.id)
		where.user_id = userIds
	}

	if (+condition.subjectType) {
		where.subject_type = +condition.subjectType
	}

	if (condition.content) {
		where.content = {
			[Op.substring]: condition.content
		}
	}

	const { rows, count } = await CommentParent.findAndCountAll({
		where,
		order: [['id', 'desc']],
		offset: condition.page,
		limit: condition.pageSize
	})

	const userInfoList = await getCurCommentListUserInfoList(rows)

	for (const row of rows) {
		// 获取子级评论数量
		const childCommentNums = await CommentChild.count({ where: { parent_id: row.id } })
		row.dataValues.childCommentNums = childCommentNums || 0
		// 时间格式化
		row.dataValues.datetime = formatDateTime(row.createdAt)
		// 用户信息
		const userInfo = userInfoList.find(item => item.id === row.user_id)
		row.dataValues.userInfo = userInfo || {}

		delete row.dataValues.user_id
	}

	return { list: rows, total: count }
}

/**
 * 获取评论详情
 */
async function getCommentDetail(condition) {
	let comment = null

	if (condition.type === CommentType.PARENT) {
		comment = await CommentParent.findByPk(condition.id)
	} else if (condition.type === CommentType.CHILD) {
		comment = await CommentChild.findByPk(condition.id)
	}

	if (comment) {
		comment = comment.toJSON()
		comment.userInfo = await User.findOne({
			where: { id: comment.userId },
			attributes: { exclude: ['password'] }
		})
		comment.imageList = await frontCommentService.getImageUrl(comment.imageIds)

		delete comment.replyId
		delete comment.imageIds
		delete comment.userId
	}

	return comment
}

/**
 * 获取子级评论列表
 */
async function getChildCommentList(condition) {
	const where = {
		parent_id: +condition.parentId
	}

	if (condition.content) {
		where.content = {
			[Op.substring]: condition.content
		}
	}

	if (condition.nickname) {
		const userList = await User.findAll({
			where: {
				nickname: {
					[Op.substring]: condition.nickname
				}
			}
		})
		const userIds = userList.map(item => item.id)
		where.user_id = userIds
	}

	const { rows, count } = await CommentChild.findAndCountAll({
		where,
		order: [['id', 'desc']],
		offset: condition.page,
		limit: condition.pageSize
	})

	const userInfoList = await getCurCommentListUserInfoList(rows)

	for (const row of rows) {
		row.dataValues.datetime = formatDateTime(row.createdAt)

		// 用户信息
		const userInfo = userInfoList.find(item => item.id === row.user_id)
		row.dataValues.userInfo = userInfo || {}

		delete row.dataValues.user_id
	}

	return { list: rows, total: count }
}

/**
 * 删除评论
 */
async function deleteComment(condition) {
	const result = await sequelize.transaction(async t => {
		const id = +condition.id
		if (condition.type === CommentType.PARENT) {
			// 删除父级评论以及其子级评论
			await CommentParent.destroy({ where: { id }, transaction: t })
			await CommentChild.destroy({ where: { parent_id: id }, transaction: t })
		} else if (condition.type === CommentType.CHILD) {
			// 删除子评论和将其回复本条评论的其他子评论的回复 reply_id 设置为 0
			await CommentChild.destroy({ where: { id }, transaction: t })
			await CommentChild.update({ reply_id: 0 }, { where: { reply_id: id }, transaction: t })
		}
	})

	return result
}

/**
 * 获取本次查询评论列表的用户信息列表
 */
async function getCurCommentListUserInfoList(rows) {
	const userIds = [...new Set(rows.map(row => row.user_id))]
	const _userInfoList = await User.findAll({
		where: { id: userIds },
		attributes: ['id', 'nickname', 'avatar_url', 'sign']
	})
	const userInfoList = _userInfoList.map(item => item.toJSON())
	return userInfoList
}

module.exports = {
	getParentCommentList,
	getCommentDetail,
	getChildCommentList,
	deleteComment
}
