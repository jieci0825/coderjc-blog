import type { JcTableConfig } from '@/components/jc-table'

const dailyQuoteTableConfig: JcTableConfig = {
	columns: [
		{ label: '内容', property: 'content', minWidth: 300, showOverflowTooltip: true },
		{ label: '作者', property: 'author', width: 200 },
		{ label: '操作', property: 'operate', width: 200, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default dailyQuoteTableConfig
