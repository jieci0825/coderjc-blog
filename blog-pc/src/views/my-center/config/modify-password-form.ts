import type { JcFormProps } from '@/components/jc-form'

const modifyPasswordFormConfig: JcFormProps = {
	formItems: [
		{
			label: '账号',
			field: 'account',
			type: 'text',
			disabled: true
		},
		{
			label: '邮箱',
			field: 'email',
			type: 'text',
			disabled: true
		},
		{
			label: '验证码',
			field: 'captcha',
			type: 'text',
			placeholder: '输入验证码，需要先写填写邮箱',
			appendSlot: 'codeAppend'
		},
		{
			label: '旧密码',
			field: 'oldPassword',
			type: 'password',
			placeholder: '输入旧密码'
		},
		{
			label: '新密码',
			field: 'newPassword',
			type: 'password',
			placeholder: '输入新密码'
		}
	],
	rules: {
		account: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		email: [
			{ required: true, message: '该项不能为空', trigger: 'blur' },
			{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
		],
		captcha: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		oldPassword: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		newPassword: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	labelWidth: 100,
	colLayout: {
		xs: 24,
		sm: 24,
		md: 24,
		lg: 24,
		xl: 24
	}
}

export default modifyPasswordFormConfig
