const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class SiteData extends Model {}

SiteData.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'id'
		},
		date: {
			type: DataTypes.DATEONLY, // DATEONLY 不带时间的日期
			allowNull: false,
			comment: '日期'
		},
		site_day_visits: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
			comment: '站点每日访问量'
		}
	},
	{ sequelize, tableName: 'site_datas' }
)

module.exports = { SiteData }
