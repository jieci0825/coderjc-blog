import type { JcTableConfig } from '@/components/jc-table'

const menuTableConfig: JcTableConfig = {
	columns: [
		{ label: '菜单标题', property: 'menuTitle', width: 200 },
		{ label: '菜单名称', property: 'menuName', width: 300 },
		{ label: '菜单路径', property: 'menuPath', width: 300 },
		{ label: '菜单icon', property: 'menuIcon', width: 100, slotName: 'menuIcon' },
		{ label: '菜单排序', property: 'menuSort', width: 100, slotName: 'menuSort' },
		{ label: '菜单状态', property: 'menuStatus', width: 100, slotName: 'menuStatus' },
		{ label: '操作', property: 'operate', width: 200, slotName: 'operate', fixed: 'right' }
	],
	border: true,
	rowKey: 'id'
}

export default menuTableConfig
