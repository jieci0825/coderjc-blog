import type { JcTableConfig } from '@/components/jc-table'

const commentTableConfig: JcTableConfig = {
	columns: [
		{ label: '发布时间', property: 'datetime', width: 240 },
		{ label: '发布人', property: 'nickname', width: 140, showOverflowTooltip: true, slotName: 'nickname' },
		{ label: '评论主体', property: 'subjectType', width: 120, slotName: 'subjectType' },
		{ label: '评论内容', property: 'content', minWidth: 350, showOverflowTooltip: true },
		{ label: '点赞数量', property: 'likeNums', width: 100 },
		{ label: '操作', property: 'operate', width: 300, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default commentTableConfig
