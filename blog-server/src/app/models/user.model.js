const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@/core/db')
const bcrypt = require('bcryptjs')

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			comment: '用户id'
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			comment: '邮箱'
		},
		account: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			comment: '账号'
		},
		nickname: {
			type: DataTypes.STRING,
			comment: '昵称'
		},
		password: {
			type: DataTypes.STRING,
			set(val) {
				const salt = bcrypt.genSaltSync(10)
				// 获取加密后的密码
				const pwd = bcrypt.hashSync(val, salt)
				this.setDataValue('password', pwd)
			},
			allowNull: false,
			comment: '密码'
		},
		avatar_url: {
			type: DataTypes.STRING,
			comment: '头像地址'
		},
		sign: {
			type: DataTypes.STRING,
			comment: '个性签名'
		},
		description: {
			type: DataTypes.STRING,
			comment: '个人简介'
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
			comment: '状态 1启用 0停用'
		},
		role_id: {
			type: DataTypes.INTEGER,
			comment: '角色id'
		}
	},
	{ sequelize, tableName: 'users' }
)

module.exports = { User }
