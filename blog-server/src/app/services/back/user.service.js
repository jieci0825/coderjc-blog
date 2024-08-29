const bcrypt = require('bcryptjs')
const { Role } = require('@/app/models/role.model')
const { User } = require('@/app/models/user.model')
const { Collide, AuthFailed } = require('@/core/error-type')
const { Op } = require('sequelize')
const roleService = require('@ser-back/role.service')
const { decrypt } = require('@/utils')

/**
 * 创建用户
 * @param {object} data
 */
async function createUser(data) {
	const isAccount = await User.findOne({ where: { account: data.account } })
	if (isAccount) throw new Collide('当前账号已经存在')

	const isEmail = await User.findOne({ where: { email: data.email } })
	if (isEmail) throw new Collide('当前邮箱已被绑定')

	const insertData = {
		email: data.email,
		account: data.account,
		password: data.password,
		nickname: data.nickname,
		avatar_url: data.avatarUrl,
		sign: data.sign,
		description: data.description,
		status: 1
	}

	await User.create(insertData)
}

/**
 * 获取用户信息
 * @param {number} id 用户id
 */
async function getUserInfo(id) {
	const userInfo = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
	return userInfo
}

/**
 * 获取用户列表
 * @param {object} condition
 */
async function getUserList(condition) {
	const where = {}
	if (condition.nickname) {
		where.nickname = { [Op.like]: `%${condition.nickname}%` }
	}

	const ROLE_INFO_AS = 'roleInfo'

	// 建立模型之间的关联
	if (User.associations[ROLE_INFO_AS]) {
		delete User.associations[ROLE_INFO_AS]
	}
	User.belongsTo(Role, { foreignKey: 'role_id', as: ROLE_INFO_AS })

	const { count, rows } = await User.findAndCountAll({
		where,
		offset: condition.page,
		limit: condition.pageSize,
		include: [
			{
				model: Role,
				as: ROLE_INFO_AS,
				attributes: ['role_nickname']
			}
		]
	})

	for (const row of rows) {
		const item = row.dataValues
		item.roleNickname = item[ROLE_INFO_AS] ? item[ROLE_INFO_AS].role_nickname : undefined
		delete item[ROLE_INFO_AS]
	}

	return { list: rows, total: count }
}

/**
 * 注销用户
 * @param {number} userId 用户id
 */
async function logoffUser(userId) {
	await User.update({ status: 0 }, { where: { id: userId } })
}

/**
 * 分配角色
 * @param {object} data
 */
async function assignRole(data) {
	await User.update({ role_id: data.roleId }, { where: { id: data.userId } })
}

/**
 * 获取登录用户的菜单列表
 */
async function getLoginUserMenuList(userId) {
	const userInfo = await User.findByPk(userId)
	const result = await roleService.getMenuListByRoleId(userInfo.role_id)
	return result
}

/**
 * 编辑用户信息
 * @param {object} data
 */
async function editUser(data) {
	const userInfo = await User.findOne({ where: { id: data.id } })
	if (!userInfo) throw new Collide('当前用户不存在')

	const updateData = {
		email: data.email,
		account: data.account,
		nickname: data.nickname,
		avatar_url: data.avatarUrl,
		sign: data.sign,
		description: data.description,
		status: data.status
	}

	await User.update(updateData, { where: { id: data.id } })
}

/**
 * 修改当前登录用户的个人信息
 * @param {object} data
 */
async function editMyInfo(data) {
	const updateData = {
		nickname: data.nickname,
		avatar_url: data.avatarUrl,
		sign: data.sign,
		description: data.description
	}
	await User.update(updateData, { where: { id: data.userId } })
}

/**
 * 修改用户密码
 * @param {object} data
 */
async function modifyUserPassword(data) {
	const userInfo = await User.findOne({ where: { id: data.userId, status: 1 } })
	if (!userInfo) throw new Collide('当前用户不存在')

	const originalPassword = decrypt(data.oldPassword)

	const correct = bcrypt.compareSync(originalPassword, userInfo.password)
	if (!correct) throw new AuthFailed('旧密码错误')

	await User.update({ password: decrypt(data.newPassword) }, { where: { id: data.userId } })
}

/**
 * 换绑邮箱
 * @param {object} data
 */
async function replaceBindEmail(data) {
	const userInfo = await User.findOne({ where: { id: data.userId, status: 1 } })
	if (!userInfo) throw new Collide('当前用户不存在')

	const isEmail = await User.findOne({ where: { email: data.newEmail } })
	if (isEmail) throw new Collide('当前邮箱已被绑定')
	if (userInfo.email !== data.oldEmail) throw new Collide('旧邮箱不匹配')

	await User.update({ email: data.newEmail }, { where: { id: data.userId } })
}

module.exports = {
	createUser,
	getUserInfo,
	getUserList,
	logoffUser,
	assignRole,
	getLoginUserMenuList,
	editUser,
	editMyInfo,
	modifyUserPassword,
	replaceBindEmail
}
