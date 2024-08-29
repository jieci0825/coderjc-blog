export interface ReqCreateRole {
	roleName: string
	roleDesc: string
	roleNickname: string
}

export interface RoleItem extends ReqCreateRole {
	id: number
}

export interface ReqAssignPermission {
	roleId: number
	menuIds: number[]
}
