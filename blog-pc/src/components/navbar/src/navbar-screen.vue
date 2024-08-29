<script setup lang="ts">
import type { NavScreenEmits, NavScreenProps } from './nav-screen.type'

const prosp = withDefaults(defineProps<NavScreenProps>(), { visible: false })
const emits = defineEmits<NavScreenEmits>()
</script>

<template>
	<Transition name="fade-in">
		<div
			class="nav-screen"
			v-if="prosp.visible">
			<div class="container">
				<div class="menu">
					<div
						@click="emits('jumpPage', item.path)"
						class="menu-item"
						v-for="item in prosp.navMenuList"
						:key="item.path">
						<a href="javascript:void(0);">{{ item.label }}</a>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style scoped lang="less">
.nav-screen {
	position: fixed;
	top: var(--header-height);
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	background-color: var(--bg-color);
	z-index: 9999;
	padding: 0 10px;
	display: flex;
	.container {
		margin: 0 auto;
		max-width: 288px;
		padding: 24px 0 96px;
		overflow: hidden;
		.menu {
			width: 80vw;
			max-width: inherit;
			.menu-item {
				display: flex;
				align-items: center;
				padding: 12px 0 8px;
				font-weight: 600;
				line-height: 24px;
				color: var(--el-text-color-primary);
				font-size: 16px;
				border-bottom: 1px solid var(--border-color);
				a {
					text-decoration: none;
				}
				&:hover {
					color: var(--primary-color);
				}
			}
		}
	}
}
</style>
