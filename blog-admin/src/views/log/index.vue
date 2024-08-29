<script setup lang="ts">
import { logApi } from '@/apis'
import logSearchFormConfig from './config/log-search-form.config'
import logTableConfig from './config/log-table.config'
import { IPageContent } from '@/hooks'

const usePageContent: IPageContent = {
	request: logApi.reqGetAccessLogData,
	formatRespData: resp => {
		return { list: resp.data.logList, total: resp.data.deviceCount.total }
	}
}
</script>

<template>
	<div class="log-container container">
		<PageContent
			:use-page-content="usePageContent"
			:form-config="logSearchFormConfig"
			:tableConfig="logTableConfig"
			:paginator-config="{}">
			<template #ipAddress="{ row }">
				<span>{{ row.ipAddressInfo.fullAddress }}</span>
			</template>
		</PageContent>
	</div>
</template>

<style scoped lang="less"></style>
