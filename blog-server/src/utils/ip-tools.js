const path = require('path')
// 导入包
const Searcher = require('./ip')
// 指定ip2region数据文件路径
const dbPath = path.resolve(process.cwd(), './assets/ip2region.xdb')

async function queryIpAddress(ip) {
	try {
		// 同步读取buffer
		const buffer = Searcher.loadContentFromFile(dbPath)
		// 创建searcher对象
		const searcher = Searcher.newWithBuffer(buffer)
		// 查询 await 或 promise均可
		const data = await searcher.search(ip)
		return data
	} catch (e) {
		throw new Error(e)
	}
}

module.exports = {
	queryIpAddress
}
