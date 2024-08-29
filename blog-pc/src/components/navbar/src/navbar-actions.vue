<script setup lang="ts">
import GlobalSetting from '@/components/global-setting'
import { ref } from 'vue'
import { Setting, Sunny, Moon } from '@element-plus/icons-vue'
import { useTheme } from '@/hooks/use-theme'
import { useGlobalActions, useMusicActions } from '@/store'

const size = 22
const settingVisible = ref(false)

const { isDark, switchTheme } = useTheme()
const { toggleTheme } = useGlobalActions()
const { setPlayerVisible } = useMusicActions()

const handleTheme = () => {
	const _theme = isDark.value ? 'light' : 'dark'
	switchTheme(_theme, true)
	toggleTheme(_theme)
}
</script>

<template>
	<div class="actions">
		<!-- theme -->
		<div
			class="action-item"
			title="主题">
			<el-icon :size="size + 4">
				<Sunny
					@click="handleTheme"
					v-if="!isDark" />
				<Moon
					@click="handleTheme"
					v-else />
			</el-icon>
		</div>

		<!-- setting -->
		<div
			class="action-item"
			title="设置">
			<el-icon
				:size="size"
				@click="settingVisible = true">
				<Setting />
			</el-icon>
		</div>

		<!-- music -->
		<div
			@click="setPlayerVisible()"
			class="action-item"
			title="听歌">
			<span class="iconfont icon-listen-music"></span>
		</div>
	</div>

	<!-- 设置面板 -->
	<JcDialog
		v-model="settingVisible"
		width="640px"
		title="全局设置">
		<GlobalSetting></GlobalSetting>
	</JcDialog>
</template>

<style scoped lang="less">
.actions {
	height: 40%;
	display: flex;
	align-items: center;
	gap: 10px;
	.action-item {
		display: flex;
		align-items: center;
		color: var(--el-text-color-primary);
		.iconfont {
			margin-left: 5px;
			font-size: 20px;
		}
	}
}
</style>
