<script setup lang="ts">
import { computed, ref } from 'vue'
import { getLocalCache, isEmpty, removeLocalCache, setLocalCache } from '@/utils'
import type { GetVerifyCodeProps, GetVerifyCodeEmits } from './get-verify-code'

defineOptions({ name: 'GetVerifyCode' })

const props = withDefaults(defineProps<GetVerifyCodeProps>(), {
	prefix: '',
	countDown: 30
})
const emits = defineEmits<GetVerifyCodeEmits>()

const BLOG_ADMIN_COUNT_DOWN = `${props.prefix ? props.prefix.toUpperCase() + '_' : ''}BLOG_ADMIN_COUNT_DOWN`

function getInitState(): boolean {
	return isEmpty(getLocalCache(BLOG_ADMIN_COUNT_DOWN)) ? true : false
}

function getCountDown(): number {
	return isEmpty(getLocalCache(BLOG_ADMIN_COUNT_DOWN)) ? props.countDown : getLocalCache(BLOG_ADMIN_COUNT_DOWN)
}

const isState = ref(getInitState())
const count = ref(getCountDown())

const isDisabled = computed(() => {
	return !props.isClick || !isState.value
})

const handleClick = () => {
	isState.value = false
	startCountDown()
	emits('click')
}

let timer: any = undefined
// 设置倒计时
function startCountDown() {
	timer = setInterval(() => {
		count.value--
		if (count.value <= 0) {
			isState.value = true
			count.value = props.countDown
			clearInterval(timer)
			removeLocalCache(BLOG_ADMIN_COUNT_DOWN)
			return
		}
		emits('countDown')
		setLocalCache(BLOG_ADMIN_COUNT_DOWN, `${count.value}`)
	}, 1000)
}
if (!isState.value) {
	startCountDown()
}
</script>

<template>
	<el-button
		@click="handleClick"
		v-bind="$attrs"
		:disabled="isDisabled"
		>{{ isState ? '获取验证码' : `${count} s` }}</el-button
	>
</template>

<style scoped lang="less"></style>
