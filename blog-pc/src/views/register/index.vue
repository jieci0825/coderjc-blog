<script setup lang="ts">
import JcForm from '@/components/jc-form'
import GetVerifyCode from '@/components/get-verify-code'
import registerFormFn from './config/register-form.config'
import { computed, ref } from 'vue'
import { DArrowLeft } from '@element-plus/icons-vue'
import { useRefs } from '@/hooks'
import { useRouter, useRoute } from 'vue-router'
import { encrypt } from '@/utils'
import { globalApi, userApi } from '@/apis'
import type { RegisterForm } from './types'

const registerFormData = ref<RegisterForm>({ account: '', password: '', email: '', captcha: '', repassword: '' })

const registerFormConfig = registerFormFn(registerFormData)

const { refs, setRef } = useRefs()

const route = useRoute()
const router = useRouter()
const handleBack = () => {
	router.push({ path: '/login', query: route.query })
}

const handleRegister = async () => {
	const validate = refs.reigsterFormRef.jcFormRef.validate
	try {
		await validate()
		const data = {
			account: registerFormData.value.account,
			email: registerFormData.value.email,
			captcha: registerFormData.value.captcha,
			password: encrypt(registerFormData.value.password)
		}
		const resp = await userApi.reqRegister(data)
		ElMessage.success(resp.msg)
		handleBack()
	} catch (error) {}
}

const isGetCaptchaRegister = computed(() => {
	return !!registerFormData.value.email
})

const getVerifyCode = async () => {
	const { email, account } = registerFormData.value
	if (!email) return ElMessage.error('请输入邮箱')
	if (!account) return ElMessage.error('请输入账号')

	const resp = await globalApi.reqGetCaptcha({ email, account })
	ElMessage.success(resp.msg)
}
</script>

<template>
	<div class="register-container">
		<div class="register-wrapper">
			<div class="content">
				<div class="header">
					<div class="logo">
						<JcLogo />
					</div>
					<div class="text">
						<div class="title">您好-旅行者</div>
						<div class="description">如果您愿意，可以在这里留下您的痕迹</div>
					</div>
				</div>
				<div class="main">
					<JcForm
						@submit="handleRegister"
						v-model="registerFormData"
						v-bind="registerFormConfig"
						:ref="setRef('reigsterFormRef')"
						size="large">
						<template #codeAppend>
							<GetVerifyCode
								@click="getVerifyCode"
								:is-click="isGetCaptchaRegister"
								style="width: 110px"
								prefix="register" />
						</template>
						<template #footer>
							<div class="main-footer">
								<div class="btn-wrap">
									<el-button
										type="primary"
										@click="handleRegister"
										>注册</el-button
									>
								</div>
							</div>
						</template>
					</JcForm>
				</div>
			</div>
			<div class="nav">
				<div class="close nav-item">
					<el-link
						@click="handleBack"
						type="primary">
						<el-icon :size="16"><DArrowLeft /></el-icon>
						<span>返回登录</span>
					</el-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.register-container {
	width: 100vw;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	.register-wrapper {
		width: 450px;
		border-radius: var(--base-b-r);
		box-shadow: var(--base-box-shadow-1);
		display: flex;
		flex-direction: column;
		align-items: center;
		@media (max-width: @size-xs) {
			box-shadow: none;
			width: 100vw;
			height: 100%;
			margin-top: 0;
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
