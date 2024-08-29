const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { toCamelCaseForObj, formatDateTime } = require('.')
const { queryIpAddress } = require('./ip-tools')

// 日志文件目录
const logDir = path.resolve(__dirname, '../logs')

// 读取日志文件
function readLogFile(fileName, deviceCount, offset, limit) {
	return new Promise((resolve, reject) => {
		const filePath = path.resolve(logDir, fileName)
		const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' })
		const rl = readline.createInterface({ input: readStream })

		const logs = []

		rl.on('line', async lineData => {
			if (!lineData) return
			deviceCount.total++

			const logInfo = JSON.parse(lineData)

			// * 处理 request 出现 \u0016\u0003\ 等字符的情况
			if (logInfo.request) {
				const regx = new RegExp(
					/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u0009|\u000a|\u000b|\u000c|\u000d|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f|\u007F/
				)

				logInfo.request = regx.test(logInfo.request) ? '' : logInfo.request
			}

			const userAgent = logInfo.http_user_agent

			if (userAgent) {
				if (isDeviceType(userAgent, 'Windows')) {
					deviceCount.windowCount++
				} else if (isDeviceType(userAgent, 'iPhone')) {
					deviceCount.iPhoneCount++
				} else if (isDeviceType(userAgent, 'Android')) {
					deviceCount.androidCount++
				} else if (isDeviceType(userAgent, 'Mac OS')) {
					deviceCount.macOSCount++
				}
			}

			if (logs.length < limit && deviceCount.total > offset) {
				// 根据 ip 获取归属地
				const address = await queryIpAddress(logInfo.remote_addr)
				logInfo.ipAddressInfo = address ? formatIpAddress(address) : null
				// 格式化时间
				logInfo.datetime = formatDateTime(new Date(logInfo.datetime))
				logs.push(toCamelCaseForObj(logInfo))
			}
		})

		rl.on('close', () => {
			resolve(logs)
		})
	})
}

function formatIpAddress(ipAddress) {
	if (!ipAddress) return
	const regions = ipAddress.region.split('|')

	function isExist(value) {
		return value && value !== '0'
	}

	const country = isExist(regions[0]) ? regions[0] : '未知'
	const province = isExist(regions[2]) ? regions[2] : '未知'
	const city = isExist(regions[3]) ? regions[3] : '未知'
	const ispName = isExist(regions[4]) ? regions[4] : '未知'

	const ipAddressInfo = {
		country,
		province,
		city,
		ispName,
		fullAddress: `${country}-${province}-${city}-${ispName}`
	}
	return ipAddressInfo
}

function isDeviceType(userAgent, deviceType) {
	return userAgent.indexOf(deviceType) !== -1
}

async function getAccessLog(date, { order = 'DESC', page = 1, pageSize = 10 }) {
	if (!date) throw new Error('日期不能为空')

	// 访问设备统计
	const deviceCount = { total: 0, windowCount: 0, androidCount: 0, iPhoneCount: 0, macOSCount: 0 }
	const offset = (page - 1) * pageSize
	// ! 做测试使用，始终返回固定的日志数据
	// const logFileName = `${date}.access.log`
	const logFileName = `2024-08-06.access.log`

	// 检测日志文件是否存在
	if (!fs.existsSync(path.resolve(logDir, logFileName))) {
		return {
			logList: [],
			deviceCount
		}
	}

	// 日志列表
	const logList = await readLogFile(logFileName, deviceCount, offset, pageSize)

	return {
		logList,
		deviceCount
	}
}

module.exports = {
	getAccessLog
}
