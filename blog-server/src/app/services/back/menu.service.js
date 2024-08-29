const { Menu } = require('@/app/models/menu.model')
const { Collide } = require('@/core/error-type')
const { toTree, toCamelCaseForObj, sortTree } = require('@/utils')

/**
 * 创建菜单
 * @param {object} data
 */
async function createMenu(data) {
	const menuInfo = await Menu.findOne({ where: { menu_name: data.menuName } })
	if (menuInfo) throw new Collide('菜单名称已存在')

	const insertData = {
		menu_name: data.menuName,
		menu_title: data.menuTitle,
		menu_path: data.menuPath,
		menu_icon: data.menuIcon,
		menu_sort: data.menuSort,
		menu_pid: data.menuPid,
		menu_status: data.menuStatus
	}

	await Menu.create(insertData)
}

/**
 * 编辑菜单
 * @param {object} data
 */
async function editMenu(data) {
	const editData = {
		menu_name: data.menuName,
		menu_title: data.menuTitle,
		menu_path: data.menuPath,
		menu_icon: data.menuIcon,
		menu_sort: data.menuSort,
		menu_pid: data.menuPid,
		menu_status: data.menuStatus
	}

	await Menu.update(editData, { where: { id: data.id } })
}

/**
 * 获取菜单列表
 * @param {object} condition 查询条件
 */
async function getMenuList(condition) {
	const menuList = await Menu.findAll({
		attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
	})
	let result = menuList.map(item => toCamelCaseForObj(item.dataValues))
	if (condition.type === 'tree') {
		const tree = toTree(result, 0, { childEmpty: null, parentField: 'menuPid' })
		result = sortTree(tree, 'menuSort')
	}
	return result
}

/**
 * 删除菜单
 * @param {number} id 菜单id
 */
async function deleteMenu(id) {
	await Menu.destroy({ where: { id }, force: true })
}

module.exports = {
	createMenu,
	editMenu,
	getMenuList,
	deleteMenu
}
