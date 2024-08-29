import { ActionType } from '../types'
import { addAtIndex } from '@/utils'
import type { JcFormProps } from '@/components/jc-form'

const userFormConfig: JcFormProps = {
	formItems: [
		{
			label: '邮箱',
			field: 'email',
			type: 'text',
			placeholder: '邮箱'
		},
		{
			label: '登录账号',
			field: 'account',
			type: 'text',
			placeholder: '用户账号'
		},
		{
			label: '用户昵称',
			field: 'nickname',
			type: 'text',
			placeholder: '用户昵称'
		},
		{
			label: '用户头像',
			field: 'avatarUrl',
			type: 'file',
			model: 'one',
			placeholder: '用户头像'
		},
		{
			label: '个性签名',
			field: 'sign',
			type: 'textarea',
			placeholder: '个性签名',
			otherElConfig: {
				showWordLimit: true,
				maxlength: 100,
				minlength: 0,
				autosize: { minRows: 2, maxRows: 6 }
			}
		},
		{
			label: '个人简介',
			field: 'description',
			type: 'textarea',
			placeholder: '个人简介',
			otherElConfig: {
				showWordLimit: true,
				maxlength: 200,
				minlength: 0,
				autosize: { minRows: 3, maxRows: 6 }
			}
		},
		{
			label: '用户状态',
			field: 'status',
			type: 'radio',
			placeholder: '状态',
			options: [
				{ label: '启用', value: 1 },
				{ label: '禁用', value: 0 }
			]
		}
	],
	rules: {
		email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
		account: [
			{ required: true, message: '请输入用户账号', trigger: 'blur' },
			{ min: 6, max: 12, message: '用户账号长度在 6 到 12 个字符', trigger: 'blur' }
		],
		nickname: [
			{ required: true, message: '请输入用户昵称', trigger: 'blur' },
			{ min: 2, max: 10, message: '用户昵称长度在 2 到 10 个字符', trigger: 'blur' }
		],
		password: [
			{ required: true, message: '请输入用户密码', trigger: 'blur' },
			{ min: 6, max: 16, message: '用户昵称长度在 6 到 16 个字符', trigger: 'blur' }
		]
	},
	labelWidth: 100,
	colLayout: {
		xs: 24,
		sm: 24,
		md: 24,
		lg: 24,
		xl: 24
	},
	inline: false
}

export default function (mode: ActionType) {
	if (mode === ActionType.CREATE) {
		return {
			...userFormConfig,
			formItems: addAtIndex(userFormConfig.formItems, 1, {
				label: '登录密码',
				field: 'password',
				type: 'password',
				placeholder: '用户密码'
			})
		}
	} else if (mode === ActionType.EDIT) {
		return userFormConfig
	}
}
