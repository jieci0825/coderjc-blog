const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class BlogTag extends Model {}

BlogTag.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'id'
		},
		tag_name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '标签名称'
		}
	},
	{ sequelize, tableName: 'blog_tags' }
)

module.exports = { BlogTag }
