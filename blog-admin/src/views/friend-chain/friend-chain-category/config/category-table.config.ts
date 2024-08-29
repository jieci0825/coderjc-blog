import type { JcTableConfig } from '@/components/jc-table'

const categoryTableConfig: JcTableConfig = {
	columns: [
		{ label: '分类名称', property: 'categoryName', width: 200 },
		{ label: '操作', property: 'operate', width: 200, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default categoryTableConfig
