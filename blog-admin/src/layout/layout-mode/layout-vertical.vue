<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import LayoutHeader from '../components/layout-header.vue'
import LayoutAside from '../components/layout-aside.vue'
import LayoutCollapse from '../components/layout-collapse.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useGlobalGetters } from '@/store'

const { getCollapse, getRefresh, getRouteAnimation, getAsideWidth } = useGlobalGetters()

const asideWidth = computed(() => {
	return getCollapse.value ? '84px' : `${getAsideWidth.value}px`
})

const refresh = ref(true)
watch(
	() => getRefresh.value,
	() => {
		refresh.value = false
		nextTick(() => {
			refresh.value = true
		})
	}
)
</script>

<template>
	<el-container class="layout-container">
		<el-aside
			:width="asideWidth"
			class="layout-aside">
			<LayoutAside></LayoutAside>
		</el-aside>
		<el-container>
			<el-header class="layout-header">
				<LayoutHeader>
					<template #collapse>
						<LayoutCollapse></LayoutCollapse>
					</template>
				</LayoutHeader>
			</el-header>
			<el-config-provider :locale="zhCn">
				<el-main class="layout-main">
					<router-view
						v-if="refresh"
						v-slot="{ Component }">
						<Transition
							:name="getRouteAnimation"
							mode="out-in">
							<keep-alive include="BlogPublish">
								<Component :is="Component" />
							</keep-alive>
						</Transition>
					</router-view>
				</el-main>
			</el-config-provider>
		</el-container>
	</el-container>
</template>

<style scoped lang="less">
.layout-container {
	height: 100vh;
	background-color: var(--bg-color-1);
	position: relative;
	.layout-aside {
		padding: 10px;
		padding-top: 0;
		display: flex;
		flex-direction: column;
		height: 100vh;
		box-shadow: 2px 0 12px #1d23290d;
		border-right: none;
		z-index: 1;
		transition: width 0.3s;
		background-color: var(--aside-bg-color);
	}

	.layout-header {
		padding: 0;
		height: 100px;
		border-bottom: 1px solid var(--border-color);
	}

	.layout-main {
		margin: 10px;
		overflow: hidden;
		padding: 0;
		.main-wrapper {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	}
}
</style>
