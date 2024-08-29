const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class Blog extends Model {}

Blog.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'id'
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			comment: '发布日期'
		},
		preview_url: {
			type: DataTypes.STRING,
			comment: '预览图'
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '标题'
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '描述'
		},
		html_content: {
			type: DataTypes.TEXT('long'),
			allowNull: false,
			comment: 'html 格式的内容'
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
			comment: '状态 1: 发布 0: 隐藏 2: 草稿'
		},
		look_nums: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
			comment: '浏览量'
		},
		like_nums: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
			comment: '点赞量'
		},
		category_id: {
			type: DataTypes.INTEGER,
			comment: '分类id'
		},
		author_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '作者id'
		}
	},
	{ sequelize, tableName: 'blogs' }
)

module.exports = { Blog }
