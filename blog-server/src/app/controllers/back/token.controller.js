const bcrypt = require('bcryptjs')
const tokenService = require('@ser-back/token.service')
const { User } = require('@/app/models/user.model')
const { tokenRules, getCaptchaRules } = require('@/app/rules/back/token.rule')
const { DataSuccess, ParamsError, AuthFailed } = require('@/core/error-type')
const { generateToken, decrypt, genNumberCode } = require('@/utils')
const { Validator } = require('@/validator')
const { Captcha } = require('@model/captcha.model')
const { CaptchaType } = require('@/enums')
const { sendMail } = require('@/utils/email')
const { Op } = require('sequelize')

/**
 * 颁发令牌
 */
async function token(ctx) {
	const { data } = new Validator().validate(ctx, tokenRules)

	const userInfo = await User.findOne({ where: { account: data.account, status: 1, role_id: { [Op.ne]: null } } })
	if (!userInfo) throw new ParamsError('当前账号不存在')

	const { id, account, password, role_id } = userInfo.dataValues

	const originalPassword = decrypt(data.password)

	// 校验密码
	const correct = bcrypt.compareSync(originalPassword, password)
	if (!correct) {
		throw new AuthFailed('密码错误')
	}

	const tokenData = { id, account, roleId: role_id }
	const { TokenConfig } = global.config
	const token = generateToken(tokenData, TokenConfig.PRIVATE_KEY, TokenConfig.EXPIRESIN)
	throw new DataSuccess({ token })
}

/**
 * 获取验证码
 */
async function getCaptcha(cxt) {
	const { data } = new Validator().validate(cxt, getCaptchaRules)
	const captcha = await genNumberCode(Captcha)
	const insertData = {
		captcha,
		type: CaptchaType.EMAIL,
		account: data.account,
		email: data.email
	}
	await tokenService.createCaptcha(insertData)

	sendMail(data.email, captcha)

	throw new DataSuccess(null, '验证码已发送')
}

/**
 * 验证令牌
 */
async function verify(ctx) {
	throw new DataSuccess(ctx.decode)
}

module.exports = {
	token,
	verify,
	getCaptcha
}
