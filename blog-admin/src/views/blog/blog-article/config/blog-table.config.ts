import type { JcTableConfig } from '@/components/jc-table'

const tagTableConfig: JcTableConfig = {
	columns: [
		{ label: '博客封面', property: 'previewUrl', width: 120, slotName: 'preview' },
		{ label: '创作时间', property: 'date', width: 220 },
		{ label: '作者', property: 'author', width: 100, showOverflowTooltip: true },
		{ label: '博客分类', property: 'categoryName', width: 120, showOverflowTooltip: true },
		{ label: '博客标题', property: 'title', width: 240, showOverflowTooltip: true },
		{ label: '博客标签', property: 'tags', minWidth: 260, slotName: 'tags' },
		{ label: '状态', property: 'status', width: 100, slotName: 'status' },
		{ label: '操作', property: 'operate', width: 200, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default tagTableConfig
