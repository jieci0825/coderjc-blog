import type { JcFormProps } from '@/components/jc-form'

const loginFormConfig: JcFormProps = {
	formItems: [
		{ label: '', field: 'account', type: 'text', placeholder: '账号/邮箱', labelSlot: 'accountLabel' },
		{
			label: '',
			type: 'password',
			field: 'password',
			placeholder: '请输入密码',
			labelSlot: 'passwordLabel',
			formItemStyle: {
				margin: 0
			}
		}
	],
	rules: {
		account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
		password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
	},
	labelWidth: 0,
	hideRequiredAsterisk: true,
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
	footerConfig: { resetText: '清空', submitText: '登录' }
}

export default loginFormConfig
