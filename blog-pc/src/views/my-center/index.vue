<script setup lang="ts">
import BoxWrap from './components/box-wrap.vue'
import JcUpload from '@/components/jc-upload/src/jc-upload.vue'
import modifyPasswordFormConfig from './config/modify-password-form'
import replaceEmailFormConfig from './config/replace-email-form'
import GetVerifyCode from '@/components/get-verify-code'
import { computed, onMounted, ref } from 'vue'
import { globalApi, userApi } from '@/apis'
import { uploadFile } from '@/cos'
import { useGlobalActions, useUserActions, useUserGetters } from '@/store'
import { useEventListener } from '@/hooks'
import { debounce, encrypt } from '@/utils'
import type { BoxItem } from './types'
import type { UserItem, ModifyUserPasswordParams, ReplaceBindEmailParams } from '@/apis/modules/user/type'

const { getCurUserInfo } = useUserGetters()
const { reqGetLoginUserInfo } = useUserActions()
reqGetLoginUserInfo()

// 修改头像
const avatarVisable = ref(false)
const avatarData = ref()
let curAvatarUrl = ''
const handleAvatar = () => {
	avatarVisable.value = true
	curAvatarUrl = getCurUserInfo.value?.avatarUrl!
}
const confirmUpdateAvatar = async () => {
	if (!avatarData.value) return
	const resp = await uploadFile(avatarData.value)
	const data = Object.assign({}, getCurUserInfo.value, { avatarUrl: resp.url })
	await reqEditUserInfo(data)
	avatarVisable.value = false
}

// 修改密码
const passwordVisable = ref(false)
const modifyPasswordData = ref({
	account: getCurUserInfo.value?.account || '',
	email: getCurUserInfo.value?.email || '',
	captcha: '',
	oldPassword: '',
	newPassword: ''
})
// 是否可以获取修改密码的验证码
const isGetCaptchaPassword = computed(() => {
	return !!modifyPasswordData.value.email && !!modifyPasswordData.value.account
})
const openModifyPasswordPanel = () => {
	modifyPasswordData.value.email = getCurUserInfo.value?.email || ''
	passwordVisable.value = true
}
const { logout } = useGlobalActions()
const confirmModifyPassword = async (data: ModifyUserPasswordParams) => {
	const payload = { ...data, oldPassword: encrypt(data.oldPassword), newPassword: encrypt(data.newPassword) }
	const resp = await userApi.reqModifyUserPassword(payload)
	ElMessage.success(resp.msg)
	passwordVisable.value = false
	logout()
}

// 换绑邮箱
const emailVisable = ref(false)
const replaceEmailData = ref()
// 是否可以获取换绑邮箱的验证码
const isGettCaptchaReplaceEmail = computed(() => {
	return !!replaceEmailData.value.oldEmail && !!replaceEmailData.value.account
})
const openReplaceEmailPanel = () => {
	replaceEmailData.value = {
		account: getCurUserInfo.value?.account || '',
		oldEmail: getCurUserInfo.value?.email || '',
		newEmail: '',
		captcha: ''
	}
	emailVisable.value = true
}
const confirmReplaceEmail = async (data: ReplaceBindEmailParams) => {
	const resp = await userApi.reqReplaceBindEmail(data)
	ElMessage.success(resp.msg)
	emailVisable.value = false
	reqGetLoginUserInfo()
}

// 保存
const handleSave = async (content: string, raw: BoxItem) => {
	const data = Object.assign({}, getCurUserInfo.value, { [raw.key]: content })
	await reqEditUserInfo(data)
}

// 发送编辑个人信息请求
async function reqEditUserInfo(data: UserItem) {
	const resp = await userApi.reqEditLoginUserInfo(data)
	ElMessage.success(resp.msg)
	reqGetLoginUserInfo()
}

const myInfoList: BoxItem[] = [
	{
		label: '头像',
		key: 'avatarUrl',
		contentField: 'avatarUrl',
		slotOpt: { defalutSlot: 'avatar' },
		operateCallback: handleAvatar,
		operateText: { editText: '更换头像' }
	},
	{ label: '昵称', key: 'nickname', contentField: 'nickname' },
	{ label: '个性签名', key: 'sign', contentField: 'sign' },
	{ label: '个人简介', key: 'description', contentField: 'description' }
]
const accountInfoList: BoxItem[] = [
	{ label: '账号', key: 'account', contentField: 'account', isOperate: false },
	{ label: '邮箱', key: 'email', contentField: 'email', slotOpt: { operateSlot: 'emailOperate' } },
	{
		label: '密码',
		key: 'password',
		slotOpt: { defalutSlot: 'password' },
		operateCallback: openModifyPasswordPanel,
		operateText: { editText: '修改密码' }
	}
]

const getVerifyCode = async () => {
	const { email, account } = modifyPasswordData.value
	if (!email) return ElMessage.error('请输入邮箱')
	if (!account) return ElMessage.error('请输入账号')

	const resp = await globalApi.reqGetCaptcha({ email, account })
	ElMessage.success(resp.msg)
}

const isLableTop = ref(false)
const labelPosition = computed(() => (isLableTop.value ? 'top' : 'right'))

const dOnResize = debounce(() => {
	if (document.body.clientWidth <= 640) {
		isLableTop.value = true
	} else {
		isLableTop.value = false
	}
}, 300)

onMounted(() => {
	dOnResize()
})

useEventListener(window, 'resize', dOnResize)
</script>

<template>
	<div :class="['my-center-container', isLableTop ? 'xs' : '']">
		<div class="my-center-wrapper">
			<div class="header"></div>
			<div class="main">
				<BoxWrap
					:list="myInfoList"
					@save="handleSave">
					<template #avatar>
						<div class="avatar-box">
							<el-image
								:preview-src-list="[getCurUserInfo?.avatarUrl]"
								:src="getCurUserInfo?.avatarUrl"
								style="width: 100%; height: 100%"
								fit="cover" />
						</div>
					</template>
				</BoxWrap>
				<BoxWrap
					:list="accountInfoList"
					@save="handleSave">
					<template #password>
						<span>**********</span>
					</template>
					<template #emailOperate>
						<el-button @click="openReplaceEmailPanel">换绑邮箱</el-button>
					</template>
				</BoxWrap>
			</div>
		</div>

		<!-- 更换头像 -->
		<JcDialog
			v-model="avatarVisable"
			width="300"
			title="更换头像">
			<div class="avatar-content">
				<JcUpload
					v-model="avatarData"
					:initPreviewImage="curAvatarUrl"
					model="one"></JcUpload>
				<el-button
					type="primary"
					@click="confirmUpdateAvatar"
					>确认</el-button
				>
			</div>
		</JcDialog>
		<!-- 修改密码 -->
		<JcDialog
			v-model="passwordVisable"
			width="500"
			title="修改密码">
			<JcForm
				@submit="confirmModifyPassword"
				v-model="modifyPasswordData"
				v-bind="modifyPasswordFormConfig"
				:label-position="labelPosition">
				<template #codeAppend>
					<GetVerifyCode
						@click="getVerifyCode"
						:is-click="isGetCaptchaPassword"
						style="width: 110px"
						prefix="pwd" />
				</template>
			</JcForm>
		</JcDialog>
		<!-- 换绑邮箱 -->
		<JcDialog
			v-model="emailVisable"
			width="500"
			title="换绑邮箱">
			<JcForm
				@submit="confirmReplaceEmail"
				v-model="replaceEmailData"
				v-bind="replaceEmailFormConfig"
				:label-position="labelPosition">
				<template #codeAppend>
					<GetVerifyCode
						:is-click="isGettCaptchaReplaceEmail"
						@click="getVerifyCode"
						style="width: 110px"
						prefix="email" />
				</template>
			</JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less">
.my-center-container {
	width: 100%;
	gap: 20px;
	padding: 20px;
	.my-center-wrapper {
		max-width: 800px;
		margin: 0 auto;
		.main {
			margin: auto;
			.avatar-box {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;
				border: 1px solid var(--border-color);
			}
		}
	}
	.avatar-content {
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&.xs {
		:deep(.el-overlay-dialog) {
			overflow: hidden auto;
		}
		:deep(.el-dialog) {
			width: 100vw !important;
			margin: 0;
			border-radius: 0;
			height: 100%;
		}
	}
}
</style>
