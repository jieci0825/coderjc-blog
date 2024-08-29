export interface ColumnsItem {
	property: string
	label: string
	slotName?: string
	showOverflowTooltip?: boolean
	width?: string | number
	minWidth?: string | number
	[key: string]: any
}

export interface JcTableConfig {
	columns: ColumnsItem[]
	width?: string
	align?: 'left' | 'center' | 'right'
	height?: string | number
	[key: string]: any
}

export interface JcTableProps extends JcTableConfig {
	tableData: any[]
}
