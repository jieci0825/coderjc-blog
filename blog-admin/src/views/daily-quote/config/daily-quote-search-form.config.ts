import type { JcFormProps } from '@/components/jc-form'

const dailyQuoteSearchFormConfig: JcFormProps = {
	formItems: [
		{
			label: '内容',
			field: 'content',
			type: 'text',
			placeholder: '请输入每日一言内容查询'
		}
	],
	labelWidth: 80,
	colLayout: {
		xs: 24,
		sm: 12,
		md: 12,
		lg: 8,
		xl: 8
	},
	footerConfig: {
		resetText: '重置',
		submitText: '查询'
	},
	inline: true
}

export default dailyQuoteSearchFormConfig
