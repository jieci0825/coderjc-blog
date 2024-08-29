const { Menu } = require('@/app/models/menu.model')
const { RoleMenu } = require('@/app/models/role-menu.model')
const { Role } = require('@/app/models/role.model')
const { toTree, toCamelCaseForObj, sortTree } = require('@/utils')
const { User } = require('@/app/models/user.model')
const { sequelize } = require('@/core/db')
const { Collide, Forbidden } = require('@/core/error-type')
const { Op } = require('sequelize')

/**
 * 创建角色
 * @param {object} data
 */
async function createRole(data) {
	const roleInfo = await Role.findOne({
		where: {
			[Op.or]: [{ role_name: data.roleName }, { role_nickname: data.roleNickname }]
		}
	})
	if (roleInfo) {
		throw new Collide('当前角色已经存在')
	}

	const insertData = {
		role_name: data.roleName,
		role_desc: data.roleDesc,
		role_nickname: data.roleNickname
	}

	await Role.create(insertData)
}

/**
 * 获取角色列表
 */
async function getRoleList() {
	const roleList = await Role.findAll()
	for (const role of roleList) {
		role.dataValues.isSuperAdmin = role.role_name === global.config.adminName
	}
	return roleList
}

/**
 * 删除角色
 * @param {number} id
 */
async function deleteRole(id) {
	const roleInfo = await Role.findByPk(id)
	if (roleInfo.role_name === global.config.adminName) {
		throw new Forbidden('超级管理员不能被删除')
	}

	const result = await sequelize.transaction(async t => {
		// 将绑定了此角色的用户角色字段置为空
		await User.update({ role_id: null }, { where: { role_id: id }, transaction: t })
		// 删除分配给该角色的菜单
		await RoleMenu.destroy({ where: { role_id: id }, force: true, transaction: t })
		// 删除角色
		await Role.destroy({ where: { id }, force: true, transaction: t })
	})
	return result
}

/**
 * 给角色分配权限
 * @param {object} data
 */
async function assignPermission(data) {
	const menuPermissionInsertData = data.menuIds.map(menuId => {
		return { role_id: data.roleId, menu_id: menuId }
	})

	// 所有的菜单id和需要分配的角色id
	const result = await sequelize.transaction(async t => {
		// 删除之前分配当前角色id的权限记录
		await RoleMenu.destroy({ where: { role_id: data.roleId }, force: true, transaction: t })
		// 在将当前分配给角色的菜单权限插入记录中
		await RoleMenu.bulkCreate(menuPermissionInsertData, { transaction: t })
	})
	return result
}

/**
 * 编辑角色信息
 * @param {object} data
 */
async function editRole(data) {
	const roleInfo = await Role.findByPk(data.id)
	if (!roleInfo) {
		throw new Forbidden('角色不存在')
	}

	const editData = {
		role_name: data.roleName,
		role_desc: data.roleDesc
	}
	await Role.update(editData, { where: { id: data.id } })
}

/**
 * 根据角色id获取菜单列表
 * @param {number} roleId
 */
async function getMenuListByRoleId(roleId) {
	const roleMenuList = await RoleMenu.findAll({ where: { role_id: roleId } })
	const menuIds = roleMenuList.map(item => item.menu_id)
	const menuList = await Menu.findAll({
		where: { id: { [Op.in]: menuIds } },
		attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
	})
	const treeMenu = toTree(
		menuList.map(item => toCamelCaseForObj(item.dataValues)),
		0,
		{ childEmpty: null, parentField: 'menuPid' }
	)
	return treeMenu ? sortTree(treeMenu, 'menuSort') : []
}

module.exports = {
	createRole,
	getRoleList,
	deleteRole,
	assignPermission,
	editRole,
	getMenuListByRoleId
}
