const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getTokenRules } = require('@/app/rules/front/token.rule')
const { DataSuccess, ParamsError, AuthFailed } = require('@/core/error-type')
const { decrypt, generateToken, generateRefreshToken, genNumberCode } = require('@/utils')
const { Validator } = require('@/validator')
const { User } = require('@model/user.model')
const { Captcha } = require('@model/captcha.model')
const backTokenService = require('@ser-back/token.service')
const { getCaptchaRules } = require('@/app/rules/back/token.rule')
const { CaptchaType } = require('@/enums')
const { sendMail } = require('@/utils/email')
const schedule = require('node-schedule')

/**
 * 获取 token
 */
async function getToken(ctx) {
	const { data } = new Validator().validate(ctx, getTokenRules)

	const where = { status: 1 }
	// 确定账号的类型，邮箱、系统账号
	const isEmail = new RegExp('^[^s@]+@[^s@]+.[^s@]+$').test(data.account)
	if (isEmail) {
		where.email = data.account
	} else {
		where.account = data.account
	}

	const userInfo = await User.findOne({ where })
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
	const accessToken = generateToken(
		{ ...tokenData, name: TokenConfig.ACCESS_TOKEN_NAME },
		TokenConfig.PRIVATE_KEY,
		TokenConfig.EXPIRESIN
	)
	const refreshToken = generateRefreshToken(
		{ ...tokenData, name: TokenConfig.REFRESH_TOKEN_NAME },
		TokenConfig.REFRESH_KEY,
		TokenConfig.REFRESH_EXPIRESIN
	)
	throw new DataSuccess({ accessToken, refreshToken })
}

/**
 * 刷新 token
 */
async function refresh(ctx) {
	const rt = ctx.request.headers['refresh-authorization']
	if (!rt) {
		throw new ParamsError('refresh-authorization 参数错误')
	}
	const token = rt.replace('Bearer ', '')

	const { REFRESH_TOKEN_EXPIRED_ERROR_CODE } = global.config.TokenConfig

	// 开始解析token
	try {
		const { TokenConfig } = global.config
		const decode = jwt.verify(token, TokenConfig.REFRESH_KEY)
		delete decode.iat
		delete decode.exp
		// 解析成功则重新下发刷新令牌和刷新令牌
		const accessToken = generateToken(
			{ ...decode, name: TokenConfig.ACCESS_TOKEN_NAME },
			TokenConfig.PRIVATE_KEY,
			TokenConfig.EXPIRESIN
		)
		const refreshToken = generateRefreshToken(decode, TokenConfig.REFRESH_KEY, TokenConfig.REFRESH_EXPIRESIN)

		throw new DataSuccess({
			accessToken: 'Bearer ' + accessToken,
			refreshToken: 'Bearer ' + refreshToken
		})
	} catch (error) {
		// token 过期 TokenExpiredError
		// token 无效 JsonWebTokenError
		if (error.name === 'TokenExpiredError') {
			throw new AuthFailed('登录凭证已过期，请重新登录', REFRESH_TOKEN_EXPIRED_ERROR_CODE)
		} else if (error.name === 'JsonWebTokenError') {
			throw new AuthFailed('登录凭证无效，请重新登录', REFRESH_TOKEN_EXPIRED_ERROR_CODE)
		} else {
			throw error
		}
	}
}

const sendEmailMessageMap = {}
/**
 * 获取验证码
 */
async function getCaptcha(cxt) {
	const { data } = new Validator().validate(cxt, getCaptchaRules)

	if (sendEmailMessageMap[data.email]) {
		throw new ParamsError(`请勿频繁发送验证码，每${global.config.getCaptchaInterval / 1000}秒获取一次`)
	}

	const captcha = await genNumberCode(Captcha)
	const insertData = {
		captcha,
		type: CaptchaType.EMAIL,
		account: data.account || '',
		email: data.email
	}
	await backTokenService.createCaptcha(insertData)

	sendMail(data.email, captcha)

	_limitEmailFrequency(data.email)

	throw new DataSuccess(null, '验证码已发送')
}

/**
 * 限制邮件接收频率
 * @param {*} email
 */
function _limitEmailFrequency(email) {
	sendEmailMessageMap[email] = true

	// 当前时间加上 10 秒
	const date = new Date(Date.now() + global.config.getCaptchaInterval)
	// 进行任务调度
	schedule.scheduleJob(date, function () {
		sendEmailMessageMap[email] = false
	})
}

module.exports = {
	getToken,
	refresh,
	getCaptcha
}
