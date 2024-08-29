<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
	<div class="not-found-container">
		<div class="top">
			<img src="https://cos.coderjc.cn/my-resource/404.svg" />
		</div>
		<div class="bottom">
			<h2>404</h2>
			<span>抱歉，您访问的页面不存在~🛰️</span>
			<div style="margin-top: 20px">
				<el-button
					type="primary"
					plain
					round
					@click="router.push('/')">
					<span>take me home</span>
				</el-button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.not-found-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	height: 100%;
	font-family: '阿里妈妈东方大楷 Regular';
	color: var(--el-text-color-primary);
	span {
		font-family: '阿里妈妈东方大楷 Regular';
	}
	.top {
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 400px;
			height: 300px;
		}
	}
	.bottom {
		text-align: center;
		margin-top: 30px;
		h2 {
			font-size: 50px;
			margin-bottom: 10px;
		}
		span {
			font-size: 20px;
		}
	}
}
</style>
