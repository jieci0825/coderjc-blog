const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class BlogCategory extends Model {}

BlogCategory.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'id'
		},
		category_name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '分类名称'
		},
		blog_nums: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
			comment: '博客数量'
		}
	},
	{ sequelize, tableName: 'blog_categorys' }
)

module.exports = { BlogCategory }
