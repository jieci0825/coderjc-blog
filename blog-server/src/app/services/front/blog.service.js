const { sequelize } = require('@/core/db')
const { RankType } = require('@/enums')
const { formatDateTime } = require('@/utils')
const { Blog } = require('@model/blog.model')

/**
 * 获取博客排行榜
 */
async function getBlogRank(data) {
	const orderField = data.type === RankType.HOT ? 'look_nums' : 'date'
	const order = [orderField, 'DESC']
	const where = { status: 1 }
	const result = await Blog.findAll({ where, order: [order], limit: 10, attributes: { exclude: ['html_content'] } })
	for (const item of result) {
		item.dataValues.date = formatDateTime(item.dataValues.date)
	}
	return result
}

module.exports = {
	getBlogRank
}
