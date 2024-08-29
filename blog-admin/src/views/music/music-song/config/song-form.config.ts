import { setAtIndex } from '@/utils'
import { reactive } from 'vue'
import type { JcFormProps, JcFormItem } from '@/components/jc-form'
import type { FriendChainCategoryItem } from '@/apis/modules/friend-chain/type'

const publishFormConfig: JcFormProps = reactive({
	formItems: [
		{
			label: '歌曲名称',
			field: 'songName',
			type: 'text',
			placeholder: '请输入歌曲名称'
		},
		{
			label: '歌手',
			field: 'singer',
			type: 'text',
			placeholder: '请输入歌手'
		},
		{
			label: '选择分类',
			field: 'musicCategoryId',
			type: 'select',
			formatProps: {
				label: 'categoryName',
				value: 'id'
			},
			options: []
		},
		{
			label: '歌曲封面',
			field: 'songCover',
			model: 'one',
			type: 'file'
		},
		{
			label: '歌曲URL',
			field: 'songUrl',
			type: 'text',
			placeholder: '请输入歌曲URL'
		},
		{
			label: '歌词',
			field: 'lyric',
			type: 'textarea',
			placeholder: '请输入歌词',
			otherElConfig: {
				showWordLimit: true,
				maxlength: 99999,
				minlength: 1,
				autosize: { minRows: 6, maxRows: 8 }
			}
		}
	],
	labelWidth: 120,
	rules: {
		songName: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		lyric: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		songCover: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		singer: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		songUrl: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		musicCategoryId: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	footerConfig: { resetText: '重置', submitText: '确认' },
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
})

export default function (categoryList: FriendChainCategoryItem[]) {
	setAtIndex<JcFormItem>(publishFormConfig.formItems, {
		field: 'field',
		value: categoryList,
		target: 'musicCategoryId',
		prop: 'options'
	})
	return publishFormConfig
}
