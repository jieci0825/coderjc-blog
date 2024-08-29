<script setup lang="ts">
import { ArrowDown, User, SwitchButton } from '@element-plus/icons-vue'
import { useGlobalActions, useUserGetters } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const { getUserInfo } = useUserGetters()
const { logout } = useGlobalActions()
</script>

<template>
	<div class="layout-user-box">
		<div class="avatar">
			<img :src="getUserInfo?.avatarUrl" />
		</div>
		<el-dropdown>
			<div class="content">
				<span class="nickname">{{ getUserInfo?.nickname }}</span>
				<el-icon :size="18">
					<ArrowDown />
				</el-icon>
			</div>
			<template #dropdown>
				<el-dropdown-item
					@click="router.push('/my-center')"
					:icon="User"
					>个人中心</el-dropdown-item
				>
				<el-dropdown-item
					@click="logout"
					:icon="SwitchButton"
					>退出登录</el-dropdown-item
				>
			</template>
		</el-dropdown>
	</div>
</template>

<style scoped lang="less">
.layout-user-box {
	flex-shrink: 0;
	margin-left: 25px;
	display: flex;
	align-items: center;
	cursor: pointer;
	.content {
		display: flex;
		align-items: center;
		font-weight: 600;
		color: var(--primary-color);
		.nickname {
			margin-right: 5px;
		}
	}
	.avatar {
		width: 38px;
		height: 38px;
		border: 50%;
		overflow: hidden;
		transition: all 0.25s linear;
		border-radius: 50%;
		margin-right: 10px;
		border: 1px solid var(--border-color);
		&:hover {
			transform: rotate(360deg);
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
</style>
