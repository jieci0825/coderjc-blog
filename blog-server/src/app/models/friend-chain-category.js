const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')

class FriendChainCategory extends Model {}

FriendChainCategory.init(
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
		}
	},
	{ sequelize, tableName: 'friend_chain_categorys' }
)

module.exports = { FriendChainCategory }
