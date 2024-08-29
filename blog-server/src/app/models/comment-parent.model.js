const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class CommentParent extends Model {}

CommentParent.init(
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
		subject_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '评论的主体id'
		},
		subject_type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '评论的主体类型 100: 博客评论, 200: 站点留言'
		},
		image_ids: {
			type: DataTypes.STRING,
			comment: '评论图片id 以逗号隔开，记录的id是文件记录表中的id'
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '评论的用户id'
		}
	},
	{ sequelize, tableName: 'comment_parents' }
)

module.exports = { CommentParent }
