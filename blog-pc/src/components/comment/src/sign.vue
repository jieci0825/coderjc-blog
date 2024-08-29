<script setup lang="ts">
import { useGlobalGetters, useUserGetters } from '@/store'
import { inject } from 'vue'
import { CommentKey } from './constants'
import { SignProps } from './comment'

const commentInject = inject(CommentKey, undefined)
const props = defineProps<SignProps>()

const { getCurUserInfo } = useUserGetters()
const { getAuthorInfo } = useGlobalGetters()
</script>

<template>
	<div class="sign-wrap">
		<div
			v-if="props.userId === getAuthorInfo?.id"
			class="site-main sign">
			{{ commentInject?.signText }}
		</div>
		<div
			class="me sign"
			v-if="props.userId === getCurUserInfo?.id">
			我
		</div>
	</div>
</template>

<style scoped lang="less">
.sign-wrap {
	display: inline-flex;
	align-items: center;
	.sign {
		margin-left: 5px;
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--el-color-primary-light-8);
		color: var(--primary-color);
		padding: 2px 4px;
		border-radius: 2px;
		transition: var(--bg-color-transition);
	}
}
</style>
