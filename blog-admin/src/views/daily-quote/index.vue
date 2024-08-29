<script setup lang="ts">
import dailyQuoteTableConfig from './config/daily-quote-table.config'
import dailyQuoteSearchFormConfig from './config/daily-quote-search-form.config'
import dailyQuoteFormConfig from './config/daily-quote-form.config'
import { dailyQuoteApi } from '@/apis'
import { ref } from 'vue'
import { ActionType } from './types'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import type { DailyQuoteItem } from '@/apis/modules/daily-quote/type'

const dialogTitle = ref('')
const curAction = ref<ActionType>(ActionType.EDIT)
const dialogVisable = ref(false)
const dailyQuoteInfo = ref<DailyQuoteItem>()

const modeTitleMap = {
	[ActionType.CREATE]: '创建每日一言',
	[ActionType.EDIT]: '编辑每日一言'
}
// 表单配置
function setInfo(row: DailyQuoteItem | null, mode: ActionType, isVisable: boolean = true) {
	dailyQuoteInfo.value = row ? { ...row } : ({} as DailyQuoteItem)
	curAction.value = mode
	dialogTitle.value = modeTitleMap[mode]
	dialogVisable.value = isVisable
}

// 编辑用户信息
const handleTableEdit = (row: DailyQuoteItem) => {
	setInfo(row, ActionType.EDIT)
}
// 删除用户
const handleTableDelete = async (row: DailyQuoteItem) => {
	await openDeleteMessageBox()
	const resp = await dailyQuoteApi.reqDeleteDailyQuote(row.id)
	ElMessage.success(resp.msg)
	refs.dailyQuotePageContentRef?.search()
}

const { refs, setRef } = useRefs()

// 处理表单提交
const handleSubmit = async (data: DailyQuoteItem) => {
	let resp: any = undefined
	// 分发请求
	if (curAction.value === ActionType.EDIT) {
		resp = await dailyQuoteApi.reqEditDailyQuote(data)
	} else if (curAction.value === ActionType.CREATE) {
		resp = await dailyQuoteApi.reqCreateDailyQuote(data)
	}
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refs.dailyQuotePageContentRef?.search()
}

// 创建用户
const handleCreateUser = () => {
	setInfo(null, ActionType.CREATE)
}
</script>

<template>
	<div class="user-contaier container">
		<PageContent
			@actCreate="handleCreateUser"
			@handleTableEdit="handleTableEdit"
			@handleTableDelete="handleTableDelete"
			:ref="setRef('dailyQuotePageContentRef')"
			:use-page-content="{ request: dailyQuoteApi.reqGetDailyQuoteList }"
			:form-config="dailyQuoteSearchFormConfig"
			:tableConfig="dailyQuoteTableConfig"
			:paginator-config="{}">
		</PageContent>

		<!-- 抽屉 -->
		<JcDialog
			v-model="dialogVisable"
			:title="dialogTitle"
			size="500px">
			<JcForm
				@submit="handleSubmit"
				v-model="dailyQuoteInfo"
				v-bind="dailyQuoteFormConfig"></JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less">
.user-container {
	width: 100%;
}
</style>
