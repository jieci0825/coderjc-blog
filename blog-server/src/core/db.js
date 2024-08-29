const Sequelize = require('sequelize')
const { database } = require('@/config/global.config')
const { toCamelCaseForObj } = require('@/utils')
const { dbName, host, port, user, password } = database

const sequelize = new Sequelize(dbName, user, password, {
	dialect: 'mysql', // 选择链接数据库的类型, 需要安装 mysql2 这个驱动包
	host,
	port,
	logging: false, // 显示每次操作的原始sql命令在终端输出
	timezone: '+08:00', // 设置时区
	define: {
		timestamps: true, // 设置为 false 不会生成 createAT 和 updateAt 两个字段
		paranoid: true // 可以生成记录删除时间的字段,  delete (软删除-硬删除)
	}
})

// 使用 JSON 序列化移除字段
Sequelize.Model.prototype.toJSON = function () {
	const data = { ...toCamelCaseForObj(this.dataValues) }
	delete data.createdAt
	delete data.updatedAt
	delete data.deletedAt
	return data
}

module.exports = { sequelize }
