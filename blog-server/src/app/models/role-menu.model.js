const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class RoleMenu extends Model {}

RoleMenu.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '角色菜单id'
		},
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '角色id'
		},
		menu_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '菜单id'
		}
	},
	{ sequelize, tableName: 'roles_menus' }
)

module.exports = { RoleMenu }
