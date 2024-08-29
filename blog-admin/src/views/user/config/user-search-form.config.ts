import type { JcFormProps } from '@/components/jc-form'

const userSearchFormConfig: JcFormProps = {
	formItems: [
		{
			label: '用户昵称',
			field: 'nickname',
			type: 'text',
			placeholder: '请输入昵称查询'
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

export default userSearchFormConfig
