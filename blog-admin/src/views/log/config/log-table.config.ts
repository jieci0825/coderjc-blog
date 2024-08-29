import type { JcTableConfig } from '@/components/jc-table'

const logTableConfig: JcTableConfig = {
	columns: [
		{ label: '访问时间', property: 'datetime', width: 220 },
		{ label: '访问IP', property: 'remoteAddr', width: 170 },
		{ label: 'IP归属地', property: 'ipAddress', width: 240, slotName: 'ipAddress', showOverflowTooltip: true },
		{ label: '主机', property: 'host', width: 220, showOverflowTooltip: true },
		{ label: '请求方法', property: 'requestMethod', width: 100 },
		{ label: '请求路径', property: 'requestUrl', width: 200, showOverflowTooltip: true },
		{ label: '协议', property: 'serverProtocol', width: 120 },
		{ label: '状态码', property: 'status', width: 100 },
		{ label: '路径参数', property: 'args', width: 200, showOverflowTooltip: true }
	],
	border: true
}

export default logTableConfig
