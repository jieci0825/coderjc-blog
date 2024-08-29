<script setup lang="ts">
import type { LayoutLogoProps } from '../types'

const props = withDefaults(defineProps<LayoutLogoProps>(), {
	showText: true
})
</script>

<template>
	<div class="logo-box">
		<div class="logo">
			<JcLogo />
		</div>
		<transition name="el-fade-in">
			<span
				class="text transition-box"
				v-show="props.showText"
				>劫辞の博客</span
			>
		</transition>
	</div>
</template>

<style scoped lang="less">
.logo-box {
	user-select: none;
	width: 100%;
	height: 60%;
	border-radius: 4px;
	display: flex;
	align-items: center;
	font-size: 24px;
	cursor: pointer;
	.logo {
		width: 1.4em;
		height: 1.4em;
		svg {
			width: 100%;
			height: 100%;
			fill: var(--el-color-primary);
		}
	}
	.text {
		white-space: nowrap;
		overflow: hidden;
		font-family: 'hanyiqingzhouxing';
		font-weight: 500;
		margin-left: 10px;
		color: var(--el-color-primary);
	}
}
</style>
