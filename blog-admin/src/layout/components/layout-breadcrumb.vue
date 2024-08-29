<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAncestorNodes } from '@/utils'
import { useUserGetters } from '@/store'

const route = useRoute()

const { getUserMenuList } = useUserGetters()

const ancestors = computed(() => {
	const result = getAncestorNodes(getUserMenuList.value, route.meta.name, 'menuName')
	return result ? result.reverse() : []
})
</script>

<template>
	<div class="breadcrumb-box">
		<el-breadcrumb :separator-icon="ArrowRight">
			<el-breadcrumb-item
				:to="{ path: item.menuPath }"
				v-for="item in ancestors"
				:key="item.menuName">
				<div class="item-wrap">
					<span :class="['iconfont', item.menuIcon]"></span>
					<span>{{ item.menuTitle }}</span>
				</div>
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<style scoped lang="less">
.breadcrumb-box {
	margin-left: 20px;
	padding-right: 30px;
	cursor: pointer;
	.item-wrap {
		display: flex;
		align-items: center;
		font-size: 16px;
		line-height: 1;
		.iconfont {
			font-size: inherit;
			margin-right: 5px;
		}
	}
}
</style>
