import { ECommentSubjectType } from '@/typings'
import type { JcFormProps } from '@/components/jc-form'

const commentSearchFormConfig: JcFormProps = {
	formItems: [
		{
			label: '评论内容',
			field: 'content',
			type: 'text',
			placeholder: '请输入评论内容查询'
		},
		{
			label: '评论人',
			field: 'nickname',
			type: 'text',
			placeholder: '请输入评论人名称查询'
		},
		{
			label: '评论主体',
			field: 'subjectType',
			type: 'select',
			placeholder: '请选择评论主体',
			defaultValue: 0,
			options: [
				{ label: '全部', value: ECommentSubjectType.ALL },
				{ label: '博客评论', value: ECommentSubjectType.BLOG_COMMENT },
				{ label: '站点留言', value: ECommentSubjectType.SITE_MESSAGE }
			]
		}
	],
	labelWidth: 80,
	colLayout: { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 },
	footerConfig: {
		resetText: '重置',
		submitText: '查询'
	},
	inline: true
}

export default commentSearchFormConfig
