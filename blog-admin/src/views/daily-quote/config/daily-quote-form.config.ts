import type { JcFormProps } from '@/components/jc-form'

const dailyQuoteFormConfig: JcFormProps = {
	formItems: [
		{ label: '内容', field: 'content', type: 'text', placeholder: '输入内容' },
		{ label: '作者', field: 'author', type: 'text', placeholder: '请输入作者' }
	],
	rules: {
		content: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		author: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	labelWidth: 80,
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
	inline: false
}

export default dailyQuoteFormConfig
