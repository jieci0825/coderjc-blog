<script setup lang="ts">
import JcForm from '@/components/jc-form'
import loginFormConfig from './config/login-form.config'
import { ref } from 'vue'
import { useGlobalActions, useGlobalGetters } from '@/store'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useRefs } from '@/hooks'
import { useRoute, useRouter } from 'vue-router'
import { encrypt } from '@/utils'
import type { LoginParams } from '@/apis/modules/global/type'

const { getSiteHomeInfo } = useGlobalGetters()
const { login } = useGlobalActions()

const loginFormData = ref<LoginParams>({ account: '', password: '' })

const { refs, setRef } = useRefs()

const route = useRoute()
const router = useRouter()
const handleBack = () => {
	router.push({ path: (route.query.redirect as string) || '/' })
}
const goToRegister = () => {
	router.push({ path: '/register', query: route.query })
}

const handleLogin = async () => {
	const validate = refs.loginFormRef.jcFormRef.validate
	try {
		await validate()
		const data = {
			account: loginFormData.value.account,
			password: encrypt(loginFormData.value.password)
		}
		await login(data)
		handleBack()
	} catch (error) {}
}
</script>

<template>
	<div class="login-container">
		<div class="login-wrapper">
			<div class="content">
				<div class="header">
					<div class="logo">
						<JcLogo />
					</div>
					<div class="text">
						<div class="title">{{ getSiteHomeInfo?.title }}</div>
						<div class="description">花径不曾缘客扫，蓬门今始为君开</div>
					</div>
				</div>
				<div class="main">
					<JcForm
						@submit="handleLogin"
						v-model="loginFormData"
						v-bind="loginFormConfig"
						:ref="setRef('loginFormRef')"
						size="large">
						<template #footer>
							<div class="main-footer">
								<div class="forget">
									<el-link type="primary">
										<span>忘记密码?</span>
									</el-link>
								</div>
								<div class="btn-wrap">
									<el-button
										type="primary"
										@click="handleLogin"
										>登录</el-button
									>
								</div>
							</div>
						</template>
					</JcForm>
				</div>
				<el-divider> 其他方式登录 </el-divider>
				<div class="footer">
					<div class="footer-item">
						<div class="icon">
							<span class="iconfont icon-more"></span>
						</div>
						<div class="text">敬请期待</div>
					</div>
				</div>
			</div>
			<div class="nav">
				<div class="close nav-item">
					<el-link
						@click="handleBack"
						type="primary">
						<el-icon :size="16"><DArrowLeft /></el-icon>
						<span>返回</span>
					</el-link>
				</div>
				<div class="to-register nav-item">
					<el-link
						type="primary"
						@click="goToRegister">
						<span>注册</span>
						<el-icon :size="16"><DArrowRight /></el-icon>
					</el-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.login-container {
	width: 100vw;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	.login-wrapper {
		width: 450px;
		height: 460px;
		border-radius: var(--base-b-r);
		box-shadow: var(--base-box-shadow-1);
		display: flex;
		flex-direction: column;
		align-items: center;
		@media (max-width: @size-xs) {
			box-shadow: none;
			width: 100vw;
			height: 100%;
			padding-top: 30px;
		}
		.nav {
			flex-shrink: 0;
			margin-top: auto;
			width: 100%;
			display: flex;
			padding: 10px;
			align-items: center;
			.close {
				span {
					font-size: 16px;
				}
			}
			.to-register {
				margin-left: auto;
			}
		}
		.content {
			flex: 1;
			padding: 20px;
			padding-bottom: 0;
			.header {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 10px;
				@media (max-width: @size-xs) {
					flex-direction: column;
				}
				.logo {
					width: 50px;
					height: 50px;
				}
				.text {
					@media (max-width: @size-xs) {
						text-align: center;
					}
					.title {
						font-size: 26px;
						font-weight: 600;
						color: var(--primary-color);
					}
					.description {
						font-size: 16px;
						color: var(--el-color-primary-light-3);
					}
				}
			}
			.main {
				margin-top: 30px;
				.main-footer {
					width: 100%;
					.forget {
						padding: 10px 0;
						line-height: 1;
						font-size: 16px;
						width: 100%;
						text-align: right;
						color: var(--el-color-primary-light-3);
					}
					.btn-wrap {
						display: flex;
						align-items: center;
						justify-content: space-between;
						:deep(.el-button) {
							width: 100%;
							font-size: 18px;
						}
					}
				}
			}
			.footer {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 20px;
				.footer-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: var(--el-text-color-placeholder);
					.icon {
						width: 40px;
						height: 40px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28px;
						border-radius: 50%;
						.iconfont {
							font-size: inherit;
						}
					}
					.text {
						font-size: 14px;
					}
				}
			}
		}
	}
	:deep(.el-form-item) {
		.el-form-item__label {
			padding: 0;
		}
	}
}
</style>
