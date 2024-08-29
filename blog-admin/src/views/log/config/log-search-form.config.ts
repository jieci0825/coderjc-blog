import { formatDateTime } from '@/utils'
import type { JcFormProps } from '@/components/jc-form'

const logSearchFormConfig: JcFormProps = {
	formItems: [
		{
			label: '日期',
			field: 'date',
			type: 'date-select',
			placeholder: '选择查询日志的日期',
			defaultValue: formatDateTime(new Date(), 'YYYY-MM-DD')
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

export default logSearchFormConfig
