import type { JcFormProps } from '@/components/jc-form'

const replaceEmailFormConfig: JcFormProps = {
	formItems: [
		{
			label: '账号',
			field: 'account',
			type: 'text',
			disabled: true
		},
		{
			label: '旧邮箱',
			field: 'oldEmail',
			type: 'text',
			disabled: true
		},
		{
			label: '验证码',
			field: 'captcha',
			type: 'text',
			placeholder: '输入验证码，需填写旧邮箱',
			appendSlot: 'codeAppend'
		},
		{
			label: '新邮箱',
			field: 'newEmail',
			type: 'text',
			placeholder: '输入新邮箱'
		}
	],
	rules: {
		account: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		oldEmail: [
			{ required: true, message: '该项不能为空', trigger: 'blur' },
			{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
		],
		newEmail: [
			{ required: true, message: '该项不能为空', trigger: 'blur' },
			{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
		],
		captcha: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
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

export default replaceEmailFormConfig
