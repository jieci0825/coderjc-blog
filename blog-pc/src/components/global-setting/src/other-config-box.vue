<script setup lang="ts">
import { useGlobalActions, useGlobalGetters } from '@/store'

const routerAnimation = [
	{ name: '淡入淡出', value: 'fade' },
	{ name: '滑动', value: 'slide' },
	{ name: '卷帘门', value: 'fade-in' },
	{ name: '滑动+淡入淡出', value: 'slide-fade' }
]

const { getGrayMode, getColorWeakness, getRouteAnimation, getFontBeautify } = useGlobalGetters()
const { toggleGrayMode, toggleColorWeakness, setRouteAnimation, toggleFontBeautify } = useGlobalActions()
</script>

<template>
	<div class="other-config-box">
		<div class="config-item">
			<div class="label">字体美化</div>
			<div class="content">
				<el-switch
					@change="toggleFontBeautify"
					:model-value="getFontBeautify"
					inline-prompt
					active-text="开启"
					inactive-text="关闭" />
			</div>
		</div>
		<div class="config-item">
			<div class="label">路由动画</div>
			<div class="content">
				<el-select
					@change="setRouteAnimation"
					:model-value="getRouteAnimation"
					placeholder="选择路由动画"
					style="width: 180px">
					<el-option
						v-for="item in routerAnimation"
						:key="item.value"
						:label="item.name"
						:value="item.value" />
				</el-select>
			</div>
		</div>
		<div class="config-item">
			<div class="label">灰色模式</div>
			<div class="content">
				<el-switch
					@change="toggleGrayMode"
					:model-value="getGrayMode"
					inline-prompt
					active-text="开启"
					inactive-text="关闭" />
			</div>
		</div>
		<div class="config-item">
			<div class="label">色弱模式</div>
			<div class="content">
				<el-switch
					@change="toggleColorWeakness"
					:model-value="getColorWeakness"
					inline-prompt
					active-text="开启"
					inactive-text="关闭" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.other-config-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 20px;
	margin-bottom: 10px;
	.config-item {
		width: calc((100% - 20px) / 2);
		display: flex;
		align-items: center;
		@media (max-width: @size-sm) {
			width: calc((100% - 20px));
		}
		.label {
			width: 100px;
			font-size: 16px;
		}
	}
}
</style>
