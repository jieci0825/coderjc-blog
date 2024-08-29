const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('@/core/db')

class Captcha extends Model {}

Captcha.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true, // 设置为主键
			autoIncrement: true // id 自增
		},
		captcha: {
			type: DataTypes.STRING,
			comment: '验证码'
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			comment: '颁发时间'
		},
		expires_in: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '有效时间 单位ms'
		},
		type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: '验证码类型 100(邮箱)'
		},
		is_valid: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
			comment: '是否有效 true(有效) false(无效)  过期或者被使用都会变为无效'
		},
		account: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '验证码所属的账号'
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '接收此条验证码的邮箱'
		}
	},
	{ sequelize, tableName: 'Captchas' }
)

module.exports = { Captcha }
