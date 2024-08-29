import type { JcTableConfig } from '@/components/jc-table'

const songTableConfig: JcTableConfig = {
	columns: [
		{ label: '歌曲封面', property: 'songCover', width: 100, slotName: 'songCover' },
		{ label: '歌曲名称', property: 'songName', width: 200, showOverflowTooltip: true },
		{ label: '歌手', property: 'singer', width: 200, showOverflowTooltip: true },
		{ label: '歌曲分类', property: 'categoryName', width: 120 },
		{ label: '歌曲URL', property: 'songUrl', minWidth: 220, showOverflowTooltip: true },
		{ label: '操作', property: 'operate', width: 280, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default songTableConfig
