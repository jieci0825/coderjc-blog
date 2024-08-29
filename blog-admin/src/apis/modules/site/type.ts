export interface SiteHomeInfo {
	title: string
	slogan: string
	publish: string
	runDays: number
}

export interface SiteVisitData {
	total: number
	yesterday: number
	lastThreeDays: number
	lastWeek: number
	lastThirtyDays: number
}

export interface SiteOtherStatisticData {
	totalUser: number
	totalLike: number
	totalComment: number
}
