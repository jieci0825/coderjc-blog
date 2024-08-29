const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class BlogTagUnite extends Model {}

BlogTagUnite.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'id'
		},
		tag_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '标签名称'
		},
		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '博客id'
		}
	},
	{ sequelize, tableName: 'blogs_tags_unite' }
)

module.exports = { BlogTagUnite }
