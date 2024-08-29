import type { MenuItem } from '@/apis/modules/menu/type'
import type { RoleItem } from '@/apis/modules/role/type'

export enum ActionType {
	CREATE = 'CREATE',
	EDIT = 'EDIT',
	ASSIGN = 'ASSIGN'
}

export interface RoleAssignProps {
	curRoleInfo: RoleItem
	allMenuList: MenuItem[]
}

export interface RoleAssignEmits {
	(e: 'submit', menuIds: number[]): void
}
