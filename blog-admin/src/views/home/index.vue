<script setup lang="ts">
import HomeHeader from './components/home-header.vue'
import HomeOverview from './components/home-overview.vue'
import HomeAside from './components/home-aside.vue'
import { useUserGetters } from '@/store'
import { provide, ref } from 'vue'
import { HomeKey } from './types'
import { siteApi } from '@/apis'

const { getUserInfo } = useUserGetters()

// 站点首页信息
const siteHomeInfo = ref()
const reqGetSiteHomeInfo = async () => {
	const resp = await siteApi.reqGetSiteHomeInfo()
	siteHomeInfo.value = resp.data
}
reqGetSiteHomeInfo()

// 站点访问数据
const siteVisitData = ref()
const reqGetSiteVisitData = async () => {
	const resp = await siteApi.reqGetSiteVisitData()
	siteVisitData.value = resp.data
}
reqGetSiteVisitData()

// 其他统计数据
const siteOtherStatisticData = ref()
const reqGetSiteOtherStatisticData = async () => {
	const resp = await siteApi.reqGetSiteOtherStatisticData()
	siteOtherStatisticData.value = resp.data
}
reqGetSiteOtherStatisticData()

provide(HomeKey, {
	curUserInfo: getUserInfo,
	siteHomeInfo,
	siteVisitData,
	siteOtherStatisticData
})
</script>

<template>
	<div class="home-contaianer container">
		<div class="home-content">
			<HomeHeader />
			<HomeOverview />
		</div>
		<HomeAside />
	</div>
</template>

<style scoped lang="less">
.home-contaianer {
	width: 100%;
	display: flex;
	gap: 20px;
	.home-content {
		flex: 1;
		overflow: auto;
	}
}
</style>
