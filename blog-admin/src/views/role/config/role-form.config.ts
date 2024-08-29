import type { JcFormProps } from '@/components/jc-form'

const roleFormConfig: JcFormProps = {
	formItems: [
		{
			label: '角色名称',
			field: 'roleName',
			type: 'text',
			placeholder: '角色名称'
		},
		{
			label: '角色昵称',
			field: 'roleNickname',
			type: 'text',
			placeholder: '角色昵称'
		},
		{
			label: '角色描述',
			field: 'roleDesc',
			type: 'text',
			placeholder: '角色描述',
			otherElConfig: {
				showWordLimit: true,
				maxlength: 100,
				minlength: 0,
				autosize: { minRows: 2, maxRows: 6 }
			}
		}
	],
	rules: {
		roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
		roleNickname: [{ required: true, message: '请输入角色昵称', trigger: 'blur' }],
		roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
	},
	labelWidth: 100,
	colLayout: {
		xs: 24,
		sm: 24,
		md: 24,
		lg: 24,
		xl: 24
	},
	inline: false
}

export default roleFormConfig
