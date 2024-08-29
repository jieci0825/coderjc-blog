<script setup lang="ts">
import { inject, computed, ref, onMounted, nextTick, watch } from 'vue'
import { HomeKey } from '../types'
import { useRefs } from '@/hooks/use-refs'
import { echarts, formatDateTime } from '@/utils'
import { useEventListener } from '@/hooks'
import { logApi } from '@/apis'
import type { AccessLogDataParams, AccessDeviceCount } from '@/apis/modules/log/type'

const homeInject = inject(HomeKey, undefined)

const siteHomeInfo = computed(() => {
	return homeInject?.siteHomeInfo.value
})

const today = formatDateTime(new Date(), 'YYYY-MM-DD')

// 今日访问设备数据
const accessDeviceData = ref<AccessDeviceCount>()
const reqGetTodayDevice = async () => {
	const condition: AccessLogDataParams = { order: 'DESC', page: 1, pageSize: 10, date: today }
	const resp = await logApi.reqGetAccessLogData(condition)
	accessDeviceData.value = resp.data.deviceCount
}
reqGetTodayDevice()

const { refs, setRef } = useRefs()

let pieChart: any = null

useEventListener(window, 'resize', () => {
	pieChart?.resize()
})

onMounted(async () => {
	await nextTick()
	pieChart = echarts.init(refs.pieChartRef)
})

watch(
	() => accessDeviceData.value,
	() => {
		pieChart.setOption(getOptions(accessDeviceData.value!))
	}
)

function getOptions(accessDeviceData: AccessDeviceCount) {
	const _data = accessDeviceData

	const other = _data?.total - _data?.windowCount + _data?.androidCount + _data?.macOSCount + _data?.iPhoneCount || 0

	const option = {
		title: {
			text: `${today} 访问设备信息`,
			left: 'center'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '10%',
			orient: 'horizontal',
			left: 'center'
		},
		series: [
			{
				name: '访问设备数量',
				type: 'pie',
				radius: '50%',
				data: [
					{ value: _data?.windowCount, name: 'Windows' },
					{ value: _data?.androidCount, name: 'Android' },
					{ value: _data?.macOSCount, name: 'Mac OS' },
					{ value: _data?.iPhoneCount, name: 'iPhone' },
					{ value: other, name: 'other' }
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	}
	return option
}
</script>

<template>
	<div class="home-aside">
		<div class="aside-top border">
			<p class="text">
				<span>本站已运行</span>
				<span class="active">{{ siteHomeInfo?.runDays }}</span>
				<span>天</span>
			</p>
		</div>
		<div class="aside-bottom border">
			<div
				class="pie-wrapper"
				:ref="setRef('pieChartRef')"></div>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-aside {
	flex-shrink: 0;
	margin-left: auto;
	width: 300px;
	height: 100%;
	.border {
		border-radius: var(--base-b-r);
		border: 1px solid var(--border-color);
	}
	.aside-top {
		height: 110px;
		padding: 20px 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		.text {
			width: 100%;
			padding: 20px;
			border-radius: var(--base-b-r);
			background-color: var(--el-color-primary-light-9);
			color: var(--el-color-primary);
			font-weight: bold;
			text-align: center;
			transition: var(--bg-color-transition);
			.active {
				font-size: 25px;
			}
		}
	}
	.aside-bottom {
		width: 100%;
		margin-top: 20px;
		padding: 20px 0;
		.pie-wrapper {
			width: 100%;
			height: 400px;
		}
	}
}
</style>
