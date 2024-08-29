<script setup lang="ts">
import { globalApi } from '@/apis'
import { DailyQuoteItem } from '@/apis/modules/global/type'
import { useEventListener } from '@/hooks'
import { debounce } from '@/utils'
import { ref } from 'vue'

const dailyQuoteInfo = ref<DailyQuoteItem>({
	id: 0,
	content: '欲买桂花同载酒，终不似，少年游。',
	author: '—— 刘过'
})

const anaRef = ref<HTMLDivElement | null>(null)

useEventListener(anaRef, 'contextmenu', (event: MouseEvent) => {
	event.preventDefault()
	const target = anaRef.value!
	navigator.clipboard
		.writeText(target.textContent!)
		.then(() => {
			ElMessage.success('复制成功')
		})
		.catch(() => {
			ElMessage.success('复制失败')
		})
})

const getDailyQuote = async () => {
	const resp = await globalApi.reqGetDailyQuote()
	dailyQuoteInfo.value = resp.data
}

const dGetDailyQuote = debounce(getDailyQuote, 300)

useEventListener(anaRef, 'click', () => {
	dGetDailyQuote()
})
</script>

<template>
	<div class="home-footer">
		<div
			class="daily-quote"
			ref="anaRef">
			<div
				class="daily-quote-text"
				title="点击左键切换，右键复制">
				「 {{ dailyQuoteInfo.content }} 」
			</div>
			<div class="daily-quote-author">
				{{ dailyQuoteInfo.author }}
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-footer {
	margin-top: auto;
	border-top: 1px solid var(--border-color);
	flex-shrink: 0;
	padding: 20px 0;
	text-align: center;
	color: var(--el-color-info);
	line-height: 20px;
	font-size: 14px;
	cursor: default;
}
</style>
