<script setup lang="ts">
import JcForm from '@/components/jc-form'
import loginFormConfig from './config/login-form.config'
import { useRoute } from 'vue-router'
import { useGlobalActions } from '@/store'
import type { LoginForm } from './types'

const route = useRoute()

const { login } = useGlobalActions()

async function onSubmit(data: LoginForm) {
	await login(data, route.query.redirect as string | undefined)
}
</script>

<template>
	<div class="login-container">
		<div class="left">
			<div class="hero">
				<h2>登录进入博客管理系统</h2>
				<p>山林不向四季起誓，荣枯随缘</p>
			</div>
		</div>
		<div class="right">
			<div class="login-wrap">
				<JcForm
					@submit="onSubmit"
					v-bind="loginFormConfig"></JcForm>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.login-container {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	--m-gap: 150px;
	.left,
	.right {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.left {
		.hero {
			color: var(--text-color-1);
			position: relative;
			margin-left: auto;
			margin-right: var(--m-gap);
			font-family: 'hanyiqingzhouxing';
			&::before {
				content: '';
				position: absolute;
				top: 10%;
				left: 0;
				width: 320px;
				height: 100px;
				background: linear-gradient(to right, var(--primary-color), #c471ed, #f64f59);
				z-index: -1;
				filter: blur(70px);
			}
			h2 {
				font-size: 40px;
			}
			p {
				margin-top: 20px;
				font-size: 20px;
				color: var(--text-color);
			}
		}
	}
	.right {
		:deep(.el-form-item__label) {
			display: none;
		}
		:deep(.el-input__inner) {
			height: 40px;
			line-height: 40px;
		}
		.login-wrap {
			width: 100%;
			margin-left: var(--m-gap);
			margin-right: auto;
		}
	}
}
</style>
