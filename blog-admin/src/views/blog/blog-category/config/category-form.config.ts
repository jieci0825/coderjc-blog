import type { JcFormProps } from '@/components/jc-form'

const categoryFormConfig: JcFormProps = {
	formItems: [
		{
			label: '分类名称',
			field: 'categoryName',
			type: 'text',
			placeholder: '请输入分类名称'
		}
	],
	rules: {
		categoryName: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	labelWidth: 100,
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
}

export default categoryFormConfig
