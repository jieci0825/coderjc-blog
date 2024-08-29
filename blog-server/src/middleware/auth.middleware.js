const jwt = require('jsonwebtoken')
const { AuthFailed, Forbidden } = require('@/core/error-type')
const { Role } = require('@/app/models/role.model')
const { Captcha } = require('@model/captcha.model')
const { Validator } = require('@/validator')

const TOKEN_EXPIRED_ERROR_CODE = 9999
const JSON_WEBTOKEN_ERROR_CODE = 8888

/**
 * 校验 token
 */
const verifyToken = async (ctx, next) => {
	const authorization = ctx.request.headers.authorization || ctx.request.headers.Authorization
	if (!authorization) {
		throw new Forbidden('请携带 Token')
	}
	const token = authorization.replace('Bearer ', '')
	const { TokenConfig } = global.config
	try {
		const decode = jwt.verify(token, TokenConfig.PUBLIC_KEY, { algorithms: ['RS256'] })
		ctx.decode = decode
		await next()
	} catch (error) {
		if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
			throw new AuthFailed('无效的 Token', TOKEN_EXPIRED_ERROR_CODE)
		} else {
			throw error
		}
	}
}

// * 后期可增加其他扩展，进一步校验权限
/**
 * 检测是否超级管理员
 */
const verifySuperAdmin = async (ctx, next) => {
	const { roleId } = ctx.decode
	const roleInfo = await Role.findByPk(roleId)
	if (!roleInfo) {
		throw new Forbidden('权限不足')
	}
	if (roleInfo.role_name !== global.config.adminName) {
		throw new Forbidden('仅超级管理员可处理')
	}
	await next()
}

/**
 * 检验验证码
 */
const verifyCaptcha = async (ctx, next) => {
	const { data } = new Validator().validate(ctx)
	const { captcha, email, oldEmail } = data
	const codeInfo = await Captcha.findOne({ where: { email: email || oldEmail, captcha } })
	if (!codeInfo) {
		throw new AuthFailed('验证码错误或者不存在')
	}
	const endTime = new Date(codeInfo.date).getTime() + codeInfo.expires_in
	const curTime = new Date().getTime()
	if (!codeInfo.is_valid || endTime - curTime <= 0) {
		throw new AuthFailed('无效的验证码')
	}

	// 验证码通过之后将验证码置为无效
	await codeInfo.update({ is_valid: false })

	await next()
}

/**
 * 校验前台 token
 */
const verifyFrontToken = async (ctx, next) => {
	const authorization = ctx.request.headers.authorization || ctx.request.headers.Authorization

	// 如果没有携带 token 则抛出错误
	if (!authorization) {
		throw new Forbidden('请先进行登录')
	}
	const token = authorization.replace('Bearer ', '')

	// 开始解析token
	try {
		const { TokenConfig } = global.config
		const decode = jwt.verify(token, TokenConfig.PRIVATE_KEY)
		ctx.decode = decode
		await next()
	} catch (error) {
		// token 过期 - TokenExpiredError
		// token 无效 - JsonWebTokenError
		if (error.name === 'TokenExpiredError') {
			throw new AuthFailed('登录凭证已过期，请重新登录', TOKEN_EXPIRED_ERROR_CODE)
		} else if (error.name === 'JsonWebTokenError') {
			throw new AuthFailed('登录凭证无效，请重新登录', JSON_WEBTOKEN_ERROR_CODE)
		} else {
			throw error
		}
	}
}

/**
 * 刷新 token
 */
const refresh = async (ctx, next) => {
	const { grantType, refreshToken: rt } = ctx.request.body
	if (grantType !== 'refresh_token') {
		throw new ParamsError('刷新 token 类型错误')
	}
	const token = rt.replace('Bearer ', '')

	// 开始解析token
	try {
		const decode = jwt.verify(token, refreshToken.key)
		const user = { id: decode.id, account: decode.account }
		ctx.user = user
		// 解析成功则重新下发刷新令牌和刷新令牌
		const access_token = generateToken(user, accessToken.key, accessToken.expiresIn)
		const refresh_token = generateToken(user, refreshToken.key, refreshToken.expiresIn)

		throw new DataSuccess({
			accessToken: 'Bearer ' + access_token,
			refreshToken: 'Bearer ' + refresh_token
		})
	} catch (error) {
		// token 过期 TokenExpiredError
		// token 无效 JsonWebTokenError
		if (error.name === 'TokenExpiredError') {
			throw new AuthFailed('刷新令牌 token 过期')
		} else if (error.name === 'JsonWebTokenError') {
			throw new AuthFailed('无效的刷新令牌 token')
		} else {
			throw error
		}
	}
}

/**
 * 可选择的校验token
 */
const verifyFrontTokenChoosable = async (ctx, next) => {
	try {
		const authorization = ctx.request.headers.authorization || ctx.request.headers.Authorization

		// 如果没有携带 token 则直接放行，携带则校验
		if (!authorization) {
			ctx.decode = {}
			await next()
		} else {
			await verifyFrontToken(ctx, next)
		}
	} catch (error) {
		throw error
	}
}

module.exports = {
	verifyToken,
	verifySuperAdmin,
	verifyCaptcha,
	verifyFrontToken,
	refresh,
	verifyFrontTokenChoosable
}
