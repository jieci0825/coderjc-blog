const { getCredentialRules } = require('@/app/rules/back/file.rule')
const { Validator } = require('@/validator')
const cosTools = require('@/utils/cos-tools')
const { DataSuccess } = require('@/core/error-type')
const fileService = require('@ser-back/file.service')

/**
 * 获取临时凭证
 */
async function getCredential(ctx) {
	const { data } = new Validator().validate(ctx, getCredentialRules)

	// 获取策略
	const policy = cosTools.packagePolicy(data.type)

	// 获取临时凭证参数
	const params = {
		Name: 'coderjc', // 自定义调用方英文名称
		Policy: policy,
		DurationSeconds: data.duration
	}

	// 获取临时凭证
	const credential = await cosTools.getCredential(params)

	throw new DataSuccess(credential)
}

/**
 * 创建文件记录
 */
async function createFileRecord(ctx) {
	const { data } = new Validator().validate(ctx)
	// 创建文件记录
	await fileService.createFileRecord(data)
	throw new DataSuccess('创建文件记录成功')
}

module.exports = {
	getCredential,
	createFileRecord
}
