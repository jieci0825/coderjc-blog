const schedule = require('node-schedule')
const { Captcha } = require('@model/captcha.model')

/**
 * 创建验证码
 * @param {object} data
 */
async function createCaptcha(data) {
	const insertData = {
		captcha: data.captcha,
		date: new Date(),
		expires_in: global.config.captchaExpiresIn,
		type: data.type,
		is_valid: true,
		account: data.account,
		email: data.email
	}

	const result = await Captcha.create(insertData)
	schedule.scheduleJob(new Date(Date.now() + global.config.captchaExpiresIn), function () {
		// 将验证码是否有效设置为无效
		Captcha.update({ is_valid: false }, { where: { id: result.id } })
	})
	return result
}

module.exports = { createCaptcha }
