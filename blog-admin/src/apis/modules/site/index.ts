import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { SiteHomeInfo, SiteVisitData, SiteOtherStatisticData } from './type'

const PREFIX = '/site'

/**
 * 获取站点首页信息
 */
export function reqGetSiteHomeInfo() {
	return request.get<IBaseType<SiteHomeInfo>>({ url: `${PREFIX}/home-info` })
}

/**
 * 获取站点访问数据
 */
export function reqGetSiteVisitData() {
	return request.get<IBaseType<SiteVisitData>>({ url: `${PREFIX}/visits` })
}

/**
 * 获取站点其他统计数据
 */
export function reqGetSiteOtherStatisticData() {
	return request.get<IBaseType<SiteOtherStatisticData>>({ url: `${PREFIX}/other-statistics` })
}
