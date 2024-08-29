<script setup lang="ts">
import { useRouter } from 'vue-router'
import { JcMenuItemProps } from './jc-menu-item'
import type { MenuItem } from '@/apis/modules/menu/type'

defineOptions({ name: 'JcMenuItem' })
const router = useRouter()
const props = withDefaults(defineProps<JcMenuItemProps>(), {
	menuList: () => []
})

const handleClick = (item: MenuItem) => {
	router.push(item.menuPath)
}
</script>

<template>
	<template
		v-for="item in props.menuList"
		:key="item.id">
		<el-sub-menu
			:class="{ 'is-active': props.ancestors.some(anc => anc.menuPath === item.menuPath) }"
			:index="`${item.id}`"
			v-if="item.children">
			<template #title>
				<el-icon :size="18">
					<span :class="['iconfont', item.menuIcon]"></span>
				</el-icon>
				<span class="text">{{ item.menuTitle }}</span>
			</template>
			<JcMenuItem
				:ancestors="props.ancestors"
				:menuList="item.children"
				:current-path="props.currentPath" />
		</el-sub-menu>
		<el-menu-item
			@click="handleClick(item)"
			:index="`${item.id}`"
			:class="{ 'is-active': props.currentPath === item.menuPath }"
			v-else-if="!item.children && item.menuStatus === 1">
			<el-icon :size="18">
				<span :class="['iconfont', item.menuIcon]"></span>
			</el-icon>
			<template #title>
				<span class="text">{{ item.menuTitle }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<style scoped lang="less">
.text {
	margin-left: 5px;
}
.iconfont {
	font-size: 18px;
}
</style>
