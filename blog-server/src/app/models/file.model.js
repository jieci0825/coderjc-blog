const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class File extends Model {}

File.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '文件记录id'
		},
		key: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文件key'
		},
		filename: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文件名称'
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '文件大小'
		},
		location: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: '原始cos访问地址'
		},
		mimetype: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文件类型'
		}
	},
	{ sequelize, tableName: 'files' }
)

module.exports = { File }
