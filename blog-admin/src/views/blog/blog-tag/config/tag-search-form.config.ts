import type { JcFormProps } from '@/components/jc-form'

const tagSearchFormConfig: JcFormProps = {
	formItems: [
		{
			label: '标签名称',
			field: 'tagName',
			type: 'text',
			placeholder: '请输入标签名称'
		}
	],
	labelWidth: 80,
	colLayout: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 },
	footerConfig: {
		resetText: '重置',
		submitText: '查询'
	},
	inline: true
}

export default tagSearchFormConfig
