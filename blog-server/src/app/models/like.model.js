const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class Like extends Model {}

Like.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '角色id'
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '用户id'
		},
		subject_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '点赞的主体id'
		},
		subject_type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '主体类型 100: 博客文章点赞, 200: 父级评论点赞, 300: 子级评论点赞'
		}
	},
	{ sequelize, tableName: 'likes' }
)

module.exports = { Like }
