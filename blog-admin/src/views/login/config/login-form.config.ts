import type { JcFormProps } from '@/components/jc-form'

const loginFormConfig: JcFormProps = {
	formItems: [
		{ label: '账号', field: 'account', type: 'text', placeholder: '请输入账号' },
		{ label: '密码', type: 'password', field: 'password', placeholder: '请输入密码' }
	],
	rules: {
		account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
		password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
	},
	formItemStyle: { width: '350px' },
	labelPosition: 'top',
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
	footerConfig: { resetText: '清空', submitText: '登录' }
}

export default loginFormConfig
