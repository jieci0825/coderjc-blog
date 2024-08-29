import type { MenuItem } from '@/apis/modules/menu/type'

export interface JcMenuItemProps {
	menuList: MenuItem[]
	currentPath: string
	ancestors: MenuItem[]
}
