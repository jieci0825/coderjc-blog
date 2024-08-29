import type { JcFormProps } from '@/components/jc-form'

const songSearchFormConfig: JcFormProps = {
	formItems: [
		{
			label: '歌曲名称',
			field: 'songName',
			type: 'text',
			placeholder: '请输入歌曲名称查询'
		}
	],
	labelWidth: 80,
	colLayout: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 },
	footerConfig: { resetText: '重置', submitText: '查询' },
	inline: true
}

export default songSearchFormConfig
