import type { JcFormProps } from '@/components/jc-form'

const tagFormConfig: JcFormProps = {
	formItems: [
		{
			label: '标签名称',
			field: 'tagName',
			type: 'text',
			placeholder: '请输入标签名称'
		}
	],
	rules: {
		tagName: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	labelWidth: 100,
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
}

export default tagFormConfig
