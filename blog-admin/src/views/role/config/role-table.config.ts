import type { JcTableConfig } from '@/components/jc-table'

const roleTableConfig: JcTableConfig = {
	columns: [
		{ label: '角色名称', property: 'roleName', width: 150 },
		{ label: '角色昵称', property: 'roleNickname', width: 150 },
		{ label: '角色描述', property: 'roleDesc', width: 220, showOverflowTooltip: true },
		{ label: '操作', property: 'operate', width: 280, fixed: 'right', slotName: 'operate' }
	],
	align: 'center',
	border: true
}

export default roleTableConfig
