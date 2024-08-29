export interface LogItem {
	datetime?: string
	host?: string
	request?: string
	status?: string
	args?: string
	remoteAddr?: string
	remotePort?: string
	httpReferer?: string
	requestMethod?: string
	httpUserAgent?: string
}

export interface AccessDeviceCount {
	total: number
	windowCount: number
	iPhoneCount: number
	androidCount: number
	macOSCount: number
}

export interface AccessLogDataParams {
	order: 'DESC' | 'ASC'
	page: number
	pageSize: number
	date: string
}

export interface AccessLogDataResp {
	logList: LogItem[]
	deviceCount: AccessDeviceCount
}
