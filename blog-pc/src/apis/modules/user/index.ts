import request from '@/apis/request'
import type {
	RegisterParams,
	UserItem,
	ReplaceBindEmailParams,
	ModifyUserPasswordParams,
	EditLoginUserInfoParams
} from './type.ts'
import type { IBaseType } from '../types'

/**
 * 获取登录用户的信息
 */
export function reqGetLoginUserInfo() {
	return request.get<IBaseType<UserItem>>({ url: '/user' })
}

/**
 * 注册
 */
export function reqRegister(data: RegisterParams) {
	return request.post<IBaseType<string>>({ url: '/user/register', data })
}

/**
 * 换绑邮箱
 */
export function reqReplaceBindEmail(data: ReplaceBindEmailParams) {
	return request.put<IBaseType<string>>({ url: `/user/replace-email`, data })
}

/**
 * 修改用户密码
 */
export function reqModifyUserPassword(data: ModifyUserPasswordParams) {
	return request.put<IBaseType<string>>({ url: `/user/modify-password`, data })
}

/**
 * 编辑当前登录用户个人信息
 */
export function reqEditLoginUserInfo(data: EditLoginUserInfoParams) {
	return request.put<IBaseType<string>>({ url: `/user/my`, data })
}
