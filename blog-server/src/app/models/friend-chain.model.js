const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class FriendChain extends Model {}

FriendChain.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: 'id'
		},
		link_name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '链接名称'
		},
		link_desc: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '链接描述'
		},
		link_url: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '链接地址'
		},
		link_preview: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '链接预览图'
		},
		link_category_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '链接分类id'
		}
	},
	{ sequelize, tableName: 'friend_chain' }
)

module.exports = { FriendChain }
