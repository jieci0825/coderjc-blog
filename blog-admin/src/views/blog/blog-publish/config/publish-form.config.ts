import { isEmpty, setAtIndex } from '@/utils'
import type { BlogCategoryItem } from '@/apis/modules/blog-category/type'
import type { JcFormProps, JcFormItem } from '@/components/jc-form'
import { blogTagApi } from '@/apis'
import { reactive } from 'vue'

const publishFormConfig: JcFormProps = reactive({
	formItems: [
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
				autosize: { minRows: 3, maxRows: 5 }
			}
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
		}
	],
	labelWidth: 100,
	rules: {},
	footerConfig: { resetText: '取消', submitText: '发布' },
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
})

export default function (categoryList: BlogCategoryItem[]) {
	setAtIndex<JcFormItem>(publishFormConfig.formItems, {
		field: 'field',
		value: categoryList,
		target: 'categoryId',
		prop: 'options'
	})
	return publishFormConfig
}
