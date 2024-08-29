import { setAtIndex } from '@/utils'
import { reactive } from 'vue'
import type { JcFormProps, JcFormItem } from '@/components/jc-form'
import type { FriendChainCategoryItem } from '@/apis/modules/friend-chain/type'

const publishFormConfig: JcFormProps = reactive({
	formItems: [
		{
			label: '链接名称',
			field: 'linkName',
			type: 'text',
			placeholder: '请输入链接名称'
		},
		{
			label: '选择分类',
			field: 'linkCategoryId',
			type: 'select',
			formatProps: {
				label: 'categoryName',
				value: 'id'
			},
			options: []
		},
		{
			label: '预览图',
			field: 'previewFile',
			model: 'one',
			type: 'file'
		},
		{
			label: '链接预览图',
			field: 'linkPreview',
			type: 'text',
			placeholder: '请输入链接预览图地址'
		},
		{
			label: '链接地址',
			field: 'linkUrl',
			type: 'text',
			placeholder: '请输入链接跳转地址'
		},
		{
			label: '链接描述',
			field: 'linkDesc',
			type: 'textarea',
			placeholder: '请输入链接描述',
			otherElConfig: {
				showWordLimit: true,
				maxlength: 200,
				minlength: 0,
				autosize: { minRows: 2, maxRows: 4 }
			}
		}
	],
	labelWidth: 120,
	rules: {
		linkName: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		linkDesc: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		linkUrl: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		linkCategoryId: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	footerConfig: { resetText: '重置', submitText: '确认' },
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
})

export default function (categoryList: FriendChainCategoryItem[]) {
	setAtIndex<JcFormItem>(publishFormConfig.formItems, {
		field: 'field',
		value: categoryList,
		target: 'linkCategoryId',
		prop: 'options'
	})
	return publishFormConfig
}
