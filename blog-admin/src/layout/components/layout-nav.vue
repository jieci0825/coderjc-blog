<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, type RouteLocationNormalizedLoadedGeneric, type RouteRecordNormalized } from 'vue-router'
import { getLocalCache, isBoolean, setLocalCache } from '@/utils'
import { BLOG_ADMIN_HEADER_NAV_LIST, DEFAULT_INDEX_ROUTE_NAME } from '@/constants'
import type { NavItem } from '../types'
import type { TabsPaneContext } from 'element-plus'

const route = useRoute()
const router = useRouter()

const curNav = ref('')
const navList = ref<NavItem[]>(getLocalCache(BLOG_ADMIN_HEADER_NAV_LIST) || [])

const defaultRoute = computed(() => router.getRoutes().find(it => it.name === DEFAULT_INDEX_ROUTE_NAME))
defaultRoute.value && addNavItem(defaultRoute.value)

watch(
	() => route,
	newValue => {
		curNav.value = newValue.path
		addNavItem(newValue)
	},
	{ immediate: true, deep: true }
)

const removeNavItem = (path: string) => {
	const index = navList.value.findIndex(it => it.path === path)
	if (index === -1) return

	navList.value.splice(index, 1)

	if (navList.value.length <= 1) {
		goTo(defaultRoute.value?.path || '/')
	}
	// 当前删除的 nav 是激活的 nav 时，就需要跳到前面一个 nav
	else if (curNav.value === path) {
		goTo(navList.value[index - 1].path)
	}
	setLocalNavList()
}

const handleClick = (pane: TabsPaneContext) => {
	router.push(pane.paneName as string)
}

function addNavItem(value: RouteLocationNormalizedLoadedGeneric | RouteRecordNormalized) {
	const item = navList.value.find(it => it.path === value.path)
	if (item) return
	navList.value.push({
		path: value.path,
		icon: value.meta.icon as string,
		title: value.meta.title as string,
		closable: isBoolean(value.meta.closable) ? !!value.meta.closable : true
	})
	setLocalNavList()
}

function setLocalNavList() {
	setLocalCache(BLOG_ADMIN_HEADER_NAV_LIST, navList.value)
}

function goTo(path: string) {
	router.push(path)
}
</script>

<template>
	<div class="nav-box">
		<el-tabs
			v-model="curNav"
			class="demo-tabs"
			type="card"
			scrollable
			@tab-click="handleClick"
			@tab-remove="removeNavItem">
			<el-tab-pane
				:name="nav.path"
				:closable="nav.closable"
				v-for="nav in navList"
				:key="nav.path">
				<template #label>
					<div class="nav-item">
						<span :class="['iconfont', nav.icon]"></span>
						<span>{{ nav.title }}</span>
					</div>
				</template>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style scoped lang="less">
.nav-box {
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	.nav-item {
		font-weight: 600;
		.iconfont {
			margin-right: 3px;
			font-size: 14px;
		}
	}
}
</style>
