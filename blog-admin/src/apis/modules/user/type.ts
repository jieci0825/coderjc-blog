import { IPageParams } from '../types'

export interface UserItem {
	id: number
	account: string
	nickname: string
	avatarUrl?: string
	description?: string
	sign?: string
	roleId?: number
	roleNickname?: string | undefined
	email: string
	status: 0 | 1
}

export interface EditLoginUserInfoParams {
	nickname?: string
	avatarUrl?: string
	description?: string
	sign?: string
}

export interface GetUserListParams extends IPageParams {
	nickname: string
}

export interface ModifyUserPasswordParams {
	email: string
	captcha: string
	account: string
	oldPassword: string
	newPassword: string
}

export interface ReplaceBindEmailParams {
	captcha: string
	account: string
	newEmail: string
	oldEmail: string
}
