const { File } = require('@/app/models/file.model')

/**
 * 创建文件记录
 */
async function createFileRecord(data) {
	const insertData = []
	if (Array.isArray(data)) {
		data.forEach(item => {
			insertData.push(genInsertData(item))
		})
	} else {
		insertData.push(genInsertData(data))
	}

	function genInsertData(data) {
		return { filename: data.filename, size: data.size, key: data.key, location: data.location, mimetype: data.mimetype }
	}

	const result = await File.bulkCreate(insertData)
	const list = result.map(item => item.toJSON().id)
	return list
}

module.exports = {
	createFileRecord
}
