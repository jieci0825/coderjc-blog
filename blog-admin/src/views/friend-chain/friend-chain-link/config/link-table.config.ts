import type { JcTableConfig } from '@/components/jc-table'

const linkTableConfig: JcTableConfig = {
	columns: [
		{ label: '预览图', property: 'linkPreview', width: 100, slotName: 'linkPreview' },
		{ label: '链接名称', property: 'linkName', width: 200 },
		{ label: '链接描述', property: 'linkDesc', width: 200, showOverflowTooltip: true },
		{ label: '链接分类', property: 'linkCategoryName', width: 120 },
		{ label: '链接地址', property: 'linkUrl', minWidth: 220, showOverflowTooltip: true },
		{ label: '操作', property: 'operate', width: 200, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default linkTableConfig
