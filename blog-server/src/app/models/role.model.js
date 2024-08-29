const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class Role extends Model {}

Role.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '角色id'
		},
		role_name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '角色名称'
		},
		role_nickname: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '角色昵称'
		},
		role_desc: {
			type: DataTypes.STRING,
			comment: '角色描述'
		}
	},
	{ sequelize, tableName: 'roles' }
)

module.exports = { Role }
