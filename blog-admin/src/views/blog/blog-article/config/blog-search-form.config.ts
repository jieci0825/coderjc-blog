import type { JcFormProps } from '@/components/jc-form'

const tagSearchFormConfig: JcFormProps = {
	formItems: [
		{
			label: '标题',
			field: 'title',
			type: 'text',
			placeholder: '请输入标题查询'
		}
	],
	labelWidth: 60,
	colLayout: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 },
	footerConfig: {
		resetText: '重置',
		submitText: '查询'
	},
	inline: true
}

export default tagSearchFormConfig
