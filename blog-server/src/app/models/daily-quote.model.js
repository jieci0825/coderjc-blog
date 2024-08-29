const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class DailyQuote extends Model {}

DailyQuote.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '每日一言id'
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '每日一言内容'
		},
		author: {
			type: DataTypes.STRING,
			comment: '每日一言作者'
		}
	},
	{ sequelize, tableName: 'daily_quotes' }
)

module.exports = { DailyQuote }
