const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class MusicCategory extends Model {}

MusicCategory.init(
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
		category_icon: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '分类icon'
		}
	},
	{ sequelize, tableName: 'music_categorys' }
)

module.exports = { MusicCategory }
