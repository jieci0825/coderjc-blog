<script setup lang="ts">
import { useTheme } from '@/hooks'

const primaryColor = [
	{ name: '水龙吟', hex: '#84a729' },
	{ name: '苍苍', hex: '#526efa' },
	{ name: '霁青', hex: '#63bbd0' },
	{ name: '天水碧', hex: '#16baaa' },
	{ name: '琥珀', hex: '#ff7400' },
	{ name: '鹤顶', hex: '#d50021' }
]

const { curPrimaryColor, setPrimaryColor } = useTheme()
</script>

<template>
	<div class="primary-box">
		<div
			v-for="item in primaryColor"
			@click="setPrimaryColor(item.hex)"
			:key="item.hex"
			:style="{ '--c': item.hex }"
			class="primary-box-item">
			<div class="preview"></div>
			<div class="info">
				<span class="color-name">{{ item.name }}</span>
				<span class="color-value">{{ item.hex }}</span>
			</div>
			<div
				class="select"
				v-if="item.hex === curPrimaryColor">
				<JcLogo></JcLogo>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.primary-box {
	margin-bottom: 30px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 20px;
	.primary-box-item {
		width: calc((100% - 20px) / 2);
		height: 60px;
		padding: 5px 10px 5px 5px;
		border-radius: 8px;
		cursor: pointer;
		border: 2px dashed var(--c);
		display: flex;
		align-items: center;
		.preview {
			width: 8px;
			height: 100%;
			background-color: var(--c);
			border-radius: 8px;
		}
		.info {
			flex: 1;
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			color: var(--c);
			font-size: 16px;
			.color-name {
				font-weight: bold;
			}
			.color-value {
				margin-top: 5px;
			}
		}
		.select {
			svg {
				width: 30px;
				height: 30px;
				fill: var(--c);
				margin-left: 10px;
			}
		}
	}
}
</style>
