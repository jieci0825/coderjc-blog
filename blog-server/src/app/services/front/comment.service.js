const { RankType, LikeType } = require('@/enums')
const { formatDateTime } = require('@/utils')
const { CommentParent } = require('@model/comment-parent.model')
const { CommentChild } = require('@model/comment-child.model')
const { File } = require('@model/file.model')
const { User } = require('@model/user.model')
const behaviorService = require('@ser-front/behavior.service')

/**
 * 发布父级评论
 */
async function publishParentComment(data, userId) {
	const insertData = {
		content: data.content,
		image_ids: data.imageIds,
		subject_id: data.subjectId,
		subject_type: data.subjectType,
		user_id: userId
	}
	const result = await CommentParent.create(insertData)
	const userInfoList = await User.findOne({
		where: { id: userId },
		attributes: ['id', 'nickname', 'avatar_url', 'sign']
	})
	await formatParentComment(result, [userInfoList.toJSON()], [], userId)
	return result
}

/**
 * 获取父级评论
 */
async function getParentComment(data, userId) {
	const where = {
		subject_id: data.subjectId,
		subject_type: data.subjectType
	}

	const orderField = data.sort === RankType.HOT ? 'like_nums' : 'createdAt'
	const order = [orderField, 'DESC']

	const { rows } = await CommentParent.findAndCountAll({
		where,
		order: [order],
		offset: data.page,
		limit: data.pageSize
	})

	const totalCommentCount = await getCommentCount(where)

	// 提取本次查询的评论所有的用户id
	const userIds = [...new Set(rows.map(row => row.user_id))]
	const _userInfoList = await User.findAll({
		where: { id: userIds },
		attributes: ['id', 'nickname', 'avatar_url', 'sign']
	})
	const userInfoList = _userInfoList.map(item => item.toJSON())

	for (const row of rows) {
		await formatParentComment(row, userInfoList, ['user_id', 'image_ids', 'subject_id', 'subject_type'], userId)
	}

	return {
		list: rows,
		total: totalCommentCount
	}
}

/**
 * 发布子级评论
 */
async function publishChildComment(data, userId) {
	const insertData = {
		content: data.content,
		image_ids: data.imageIds,
		parent_id: data.parentId,
		reply_id: data.replyId,
		user_id: userId
	}
	const result = await CommentChild.create(insertData)

	// 获取用户信息
	const userIds = [userId]
	let CommentInfo = null
	if (result.reply_id === 0) {
		CommentInfo = await CommentParent.findOne({ where: { id: result.parent_id } })
		result.dataValues._parentUserId = CommentInfo.user_id
	} else {
		CommentInfo = await CommentChild.findOne({ where: { id: result.reply_id } })
		result.dataValues._childUserId = CommentInfo.user_id
	}
	userIds.push(CommentInfo.user_id)

	const _userInfoList = await User.findAll({
		where: { id: [...new Set(userIds)] },
		attributes: ['id', 'nickname', 'avatar_url', 'sign']
	})

	await formatChildrenComment(
		result,
		_userInfoList.map(item => item.toJSON()),
		[],
		userId
	)

	return result
}

/**
 * 获取子级评论
 */
async function getChildComment(data, userId) {
	const where = { parent_id: data.parentId }

	const orderField = data.sort === RankType.HOT ? 'like_nums' : 'createdAt'
	const order = [orderField, 'DESC']
	const { rows } = await CommentChild.findAndCountAll({
		where,
		order: [order],
		offset: data.page,
		limit: data.pageSize
	})
	// 提取本次查询的评论所有的用户id
	const userIds = rows.map(row => row.user_id)
	// 提取回复评论的用户id
	for (const item of rows) {
		let data = null
		// 如果 reply_id 为 0，则表示是回复的父级评论，而不是回复其他子级评论
		if (item.reply_id === 0) {
			// 同时将父级评论的user_id 也保存起来
			data = await CommentParent.findOne({ where: { id: item.parent_id } })
			item.dataValues._parentUserId = data.user_id
		} else {
			// 同时将子级评论的user_id 也保存起来
			data = await CommentChild.findOne({ where: { id: item.reply_id } })
			item.dataValues._childUserId = data.user_id
		}
		userIds.push(data.user_id)
	}

	const _userInfoList = await User.findAll({
		where: { id: [...new Set(userIds)] },
		attributes: ['id', 'nickname', 'avatar_url', 'sign']
	})
	const userInfoList = _userInfoList.map(item => item.toJSON())

	for (const row of rows) {
		await formatChildrenComment(row, userInfoList, ['user_id', 'image_ids'], userId)
	}

	return rows
}

/**
 * 格式化父级评论
 */
async function formatParentComment(row, userInfoList, deleteField = [], userId) {
	row.dataValues.datetime = formatDateTime(row.createdAt)
	// 将评论图片id改为实际的图片url
	row.dataValues.imageList = await getImageUrl(row.image_ids)
	// 获取用户信息
	const userInfo = userInfoList.find(item => item.id === row.user_id)
	row.dataValues.userInfo = userInfo || {}
	// 获取子级评论数量
	const childCommentNums = await CommentChild.count({ where: { parent_id: row.id } })
	row.dataValues.childCommentNums = childCommentNums || 0
	row.dataValues.parentId = 0
	row.dataValues.replyUserInfo = null
	// 确认是否点赞
	row.dataValues.isLike = userId
		? await behaviorService.getLikeStatus({
				subjectId: row.id,
				subjectType: LikeType.PARENT_COMMENT,
				userId: userId
		  })
		: false
	row.dataValues.children = []
	deleteField.forEach(field => delete row.dataValues[field])
}

/**
 * 格式化子级评论
 */
async function formatChildrenComment(row, userInfoList, deleteField = [], userId) {
	row.dataValues.datetime = formatDateTime(row.createdAt)
	// 将评论图片id改为实际的图片url
	const imageList = await getImageUrl(row.image_ids)
	row.dataValues.imageList = imageList
	// 获取用户信息
	const userInfo = userInfoList.find(item => item.id === row.user_id)
	row.dataValues.userInfo = userInfo || {}
	// 获取回复评论的用户信息
	const replyUserInfo = userInfoList.find(item => {
		if (row.reply_id === 0) {
			// reply_id 为 0 使用父级评论的用户id获取回复用户信息
			return item.id === row.dataValues._parentUserId
		} else {
			// 不为 0 则使用子级评论的用户id获取回复用户信息
			return item.id === row.dataValues._childUserId
		}
	})
	row.dataValues.replyUserInfo = replyUserInfo || {}
	row.dataValues.childCommentNums = 0
	// 确认是否点赞
	row.dataValues.isLike = userId
		? await behaviorService.getLikeStatus({
				subjectId: row.id,
				subjectType: LikeType.CHILD_COMMENT,
				userId: userId
		  })
		: false
	deleteField.forEach(field => delete row.dataValues[field])
}

/**
 * 根据图片id获取图片url
 */
async function getImageUrl(imageIds) {
	const imageList = []
	if (imageIds) {
		for (const imageId of imageIds.split(',')) {
			const image = await File.findByPk(imageId)
			if (image) {
				imageList.push({ id: imageId, url: `${global.config.cosPrefix}/${image.dataValues.key}` })
			}
		}
	}
	return imageList
}

/**
 * 获取所有的评论数量
 */
async function getCommentCount(where) {
	const parentComment = await CommentParent.findAll({ where })
	if (!parentComment || parentComment.length === 0) return 0
	const parentCommentIds = parentComment.map(item => item.id)
	const childCount = await CommentChild.count({ where: { parent_id: parentCommentIds } })
	return childCount + parentComment.length
}

module.exports = {
	publishParentComment,
	getParentComment,
	publishChildComment,
	getChildComment,
	getCommentCount,
	getImageUrl
}
