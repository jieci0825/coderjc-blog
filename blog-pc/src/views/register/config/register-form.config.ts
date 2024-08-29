import type { JcFormProps } from '@/components/jc-form'

const accountReg = /^[a-zA-Z0-9]{6,12}$/
const pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,16}$/
export default function (formData: any) {
	const registerFormConfig: JcFormProps = {
		formItems: [
			{ label: '', field: 'account', type: 'text', placeholder: '账号需6-12位且为字母或数字' },
			{ label: '', field: 'email', type: 'text', placeholder: '输入接收验证码的邮箱' },
			{ label: '', field: 'captcha', type: 'text', placeholder: '需先写填写邮箱和账号', appendSlot: 'codeAppend' },
			{ label: '', field: 'password', type: 'password', placeholder: '密码需8-16位且包含字母和数字' },
			{ label: '', field: 'repassword', type: 'password', placeholder: '请再次输入您的密码' }
		],
		rules: {
			account: [
				{ required: true, message: '账号不能为空', trigger: 'blur' },
				{ pattern: accountReg, message: '账号需6-12位且为字母或数字', trigger: ['blur', 'change'] }
			],
			email: [
				{ required: true, message: '邮箱不能为空', trigger: 'blur' },
				{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
			],
			captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
			password: [
				{ required: true, message: '密码不能为空', trigger: 'blur' },
				{ pattern: pwdReg, message: '密码需8-16位且包含字母和数字', trigger: ['blur', 'change'] }
			],
			repassword: [
				{ required: true, message: '确认密码不能为空', trigger: 'blur' },
				{ validator: equalToPassword, trigger: ['blur', 'change'] }
			]
		},
		labelWidth: 0,
		hideRequiredAsterisk: true,
		colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
	}
	function equalToPassword(_: any, value: any, callback: any) {
		if (value !== formData.value.password) {
			callback(new Error('两次输入的密码不一致'))
		} else {
			callback()
		}
	}

	return registerFormConfig
}
