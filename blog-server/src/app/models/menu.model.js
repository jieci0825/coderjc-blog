const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')
const { md5password } = require('@/utils')

class Menu extends Model {}

Menu.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '角色id'
		},
		menu_name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '菜单名'
		},
		menu_title: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '菜单标题'
		},
		menu_path: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '菜单路径'
		},
		menu_icon: {
			type: DataTypes.STRING,
			comment: '菜单图标'
		},
		menu_sort: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '菜单排序'
		},
		menu_pid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			comment: '父级菜单id 0 表示一级菜单'
		},
		menu_status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
			comment: '菜单状态 1显示 0隐藏'
		}
	},
	{ sequelize, tableName: 'menus' }
)

module.exports = { Menu }
