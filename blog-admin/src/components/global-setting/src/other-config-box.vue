<script setup lang="ts">
import { useGlobalActions, useGlobalGetters } from '@/store'

const routerAnimation = [
	{ name: '淡入淡出', value: 'fade' },
	{ name: '滑动', value: 'slide' },
	{ name: '卷帘门', value: 'fade-in' },
	{ name: '滑动+淡入淡出', value: 'slide-fade' }
]

const { getCollapse, getAccordion, getRouteAnimation, getAsideWidth, getColorWeakness, getGrayMode } =
	useGlobalGetters()
const { toggleCollapse, toggleAccordion, toggleColorWeakness, toggleGrayMode, setRouteAnimation, setMenuWidth } =
	useGlobalActions()
</script>

<template>
	<div class="other-config-box">
		<div class="config-item">
			<div class="label">折叠菜单</div>
			<div class="content">
				<el-switch
					@change="toggleCollapse"
					:model-value="getCollapse"
					inline-prompt
					active-text="开启"
					inactive-text="关闭" />
			</div>
		</div>
		<div class="config-item">
			<div class="label">菜单手风琴</div>
			<div class="content">
				<el-switch
					@change="toggleAccordion"
					:model-value="getAccordion"
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
			<div class="label">菜单宽度</div>
			<div class="content">
				<el-input-number
					:model-value="getAsideWidth"
					:min="200"
					:max="300"
					@change="setMenuWidth" />
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
		.label {
			width: 100px;
			font-size: 16px;
		}
	}
}
</style>
