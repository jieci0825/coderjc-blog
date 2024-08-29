import type { JcTableConfig } from '@/components/jc-table'

const userTableConfig: JcTableConfig = {
	columns: [
		{ label: '用户头像', property: 'avatarUrl', width: 100, slotName: 'avatarUrl' },
		{ label: '邮箱', property: 'email', width: 200, showOverflowTooltip: true },
		{ label: '登录账号', property: 'account', width: 150, showOverflowTooltip: true },
		{ label: '用户昵称', property: 'nickname', width: 120 },
		{ label: '个性签名', property: 'sign', width: 200, showOverflowTooltip: true },
		{ label: '个人简介', property: 'description', width: 200, showOverflowTooltip: true },
		{ label: '用户角色', property: 'roleNickname', width: 150, slotName: 'roleNickname' },
		{ label: '状态', property: 'status', width: 100, slotName: 'status' },
		{ label: '操作', property: 'operate', width: 300, fixed: 'right', slotName: 'operate' }
	],
	border: true
}

export default userTableConfig
