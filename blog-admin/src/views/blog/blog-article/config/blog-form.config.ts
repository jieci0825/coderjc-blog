import { isEmpty, setAtIndex } from '@/utils'
import type { BlogCategoryItem } from '@/apis/modules/blog-category/type'
import type { JcFormProps, JcFormItem } from '@/components/jc-form'
import { blogTagApi } from '@/apis'
import { reactive } from 'vue'
import { BlogTagItem } from '@/apis/modules/blog-tag/type'
import { EBlogStatus } from '@/typings'

const publishFormConfig: JcFormProps = reactive({
	formItems: [
		{
			label: '博客标题',
			field: 'title',
			type: 'text',
			placeholder: '请输入博客标题'
		},
		{
			label: '状态',
			field: 'status',
			type: 'radio',
			options: [
				{ label: '草稿', value: EBlogStatus.DRAFT },
				{ label: '发布', value: EBlogStatus.PUBLISH },
				{ label: '隐藏', value: EBlogStatus.HIDE }
			]
		},
		{
			label: '添加标签',
			field: 'tagIds',
			type: 'select',
			placeholder: '请通过搜索添加标签',
			otherElConfig: {
				multiple: true,
				filterable: true,
				remote: true,
				reserveKeyword: false,
				remoteMethod: async (query: string) => {
					if (isEmpty(query)) return
					const resp = await blogTagApi.reqGetBlogTagList({ page: 1, pageSize: 20, tagName: query })
					setAtIndex<JcFormItem>(publishFormConfig.formItems, {
						field: 'field',
						value: resp.data.list,
						target: 'tagIds',
						prop: 'options'
					})
				}
			},
			headerSlot: 'tagHeader',
			formatProps: {
				label: 'tagName',
				value: 'id'
			},
			options: []
		},
		{
			label: '选择分类',
			field: 'categoryId',
			type: 'select',
			otherElConfig: {},
			formatProps: {
				label: 'categoryName',
				value: 'id'
			},
			options: []
		},
		{
			label: '博客内容',
			field: 'htmlContent',
			type: 'custom',
			col: 24,
			slotName: 'htmlContent'
		},
		{
			label: '博客封面',
			field: 'previewUrl',
			model: 'one',
			type: 'file'
		},
		{
			label: '博客描述',
			field: 'description',
			type: 'textarea',
			placeholder: '请输入博客描述',
			otherElConfig: {
				showWordLimit: true,
				maxlength: 200,
				minlength: 0,
				autosize: { minRows: 6, maxRows: 6 }
			}
		}
	],
	labelWidth: 100,
	rules: {
		title: [{ required: true, message: '请输入博客标题', trigger: 'blur' }],
		tagIds: [{ required: true, message: '请输入博客标题', trigger: 'blur' }],
		categoryId: [{ required: true, message: '请输入博客标题', trigger: 'blur' }]
	},
	footerConfig: { resetText: '重置', submitText: '确认' },
	colLayout: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
})

export default function (categoryList: BlogCategoryItem[], tagList: BlogTagItem[]) {
	setAtIndex<JcFormItem>(publishFormConfig.formItems, {
		field: 'field',
		value: categoryList,
		target: 'categoryId',
		prop: 'options'
	})
	setAtIndex<JcFormItem>(publishFormConfig.formItems, {
		field: 'field',
		value: tagList,
		target: 'tagIds',
		prop: 'options'
	})
	return publishFormConfig
}
