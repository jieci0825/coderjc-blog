<script setup lang="ts">
import { roleApi } from '@/apis'
import { computed, ref } from 'vue'
import type { MenuItem } from '@/apis/modules/menu/type'
import type { RoleAssignEmits, RoleAssignProps } from '../types'
import { useRefs } from '@/hooks/use-refs'

const props = defineProps<RoleAssignProps>()
const emits = defineEmits<RoleAssignEmits>()

// 根据角色 id 获取对应的菜单列表
const roleMenuList = ref<MenuItem[]>([])
const getMenuListByRoleId = async () => {
	const resp = await roleApi.reqGetMenuListByRoleId(props.curRoleInfo.id)
	roleMenuList.value = resp.data
}
getMenuListByRoleId()

// 默认选中的key
const defaultCheckedKeys = computed(() => {
	const keys: number[] = []
	function deep(curList: MenuItem[], diffList: MenuItem[]) {
		curList.forEach(cur => {
			const diffItem = diffList.find(diff => diff.id === cur.id)
			if (diffItem) {
				keys.push(cur.id)
			}
			if (cur.children?.length) {
				deep(cur.children, diffItem?.children || [])
			}
		})
	}
	deep(roleMenuList.value, props.allMenuList)
	return keys
})

const { refs, setRef } = useRefs()

const handleSubmit = () => {
	const checkedKeys = refs.treeRef.getCheckedKeys()
	emits('submit', checkedKeys || [])
}
</script>

<template>
	<div class="role-assign-container">
		<el-tree
			:ref="setRef('treeRef')"
			:default-expand-all="true"
			:default-checked-keys="defaultCheckedKeys"
			:data="allMenuList"
			:props="{ label: 'menuTitle', children: 'children' }"
			show-checkbox
			node-key="id" />
		<div class="actions">
			<el-button
				@click="handleSubmit"
				type="primary"
				>确定</el-button
			>
		</div>
	</div>
</template>

<style scoped lang="less">
.role-assign-container {
	width: 100%;
	.actions {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
