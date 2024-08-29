import { setAtIndex } from '@/utils'
import type { JcFormProps, JcFormItem } from '@/components/jc-form'
import type { MenuItem } from '@/apis/modules/menu/type'

const menuCreateEditFormConfig: JcFormProps = {
	formItems: [
		{ label: '菜单标题', type: 'text', field: 'menuTitle' },
		{ label: '菜单名称', type: 'text', field: 'menuName' },
		{ label: '菜单父级', type: 'select', field: 'menuPid', formatProps: { label: 'menuTitle', value: 'id' } },
		{ label: '菜单路径', type: 'text', field: 'menuPath' },
		{ label: '菜单icon', type: 'text', field: 'menuIcon' },
		{ label: '菜单排序', type: 'text', field: 'menuSort', isNumber: true },
		{
			label: '菜单状态',
			type: 'radio',
			field: 'menuStatus',
			options: [
				{ label: '显示', value: 1 },
				{ label: '隐藏', value: 0 }
			]
		}
	],
	rules: {
		menuTitle: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		menuName: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		menuParent: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		menuPid: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		menuPath: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		menuIcon: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		menuSort: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
		menuStatus: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
}

export default function (flatMenuList: MenuItem[]) {
	setAtIndex<JcFormItem>(menuCreateEditFormConfig.formItems, {
		field: 'field',
		value: flatMenuList,
		target: 'menuPid',
		prop: 'options'
	})
	return menuCreateEditFormConfig
}
