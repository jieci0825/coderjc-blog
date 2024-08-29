export interface MenuItem {
	id: number
	menuName: string
	menuTitle: string
	menuPath: string
	menuIcon: string
	menuSort: number
	menuPid: number
	menuStatus: number
	children: MenuItem[] | null
}

export interface ReqGetMenuListParams {
	type: 'tree' | 'flat'
}
