const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class CommentChild extends Model {}

CommentChild.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '父级评论的id'
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '评论内容'
		},
		like_nums: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			comment: '点赞数'
		},
		image_ids: {
			type: DataTypes.STRING,
			comment: '评论图片id'
		},
		parent_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '父级评论的id'
		},
		reply_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '回复的评论id'
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '评论的用户id'
		}
	},
	{ sequelize, tableName: 'comment_childs' }
)

module.exports = { CommentChild }
