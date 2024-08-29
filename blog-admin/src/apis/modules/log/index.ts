import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { AccessLogDataResp, AccessLogDataParams } from './type.ts'

const PREFIX = '/log'

/**
 * 获取访问日志数据
 */
export function reqGetAccessLogData(data: AccessLogDataParams) {
	return request.post<IBaseType<AccessLogDataResp>>({ url: `${PREFIX}/access`, data })
}
