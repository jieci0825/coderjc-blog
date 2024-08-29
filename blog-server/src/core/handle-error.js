const { ErrorTypeModule } = require('./error-type')

// 异常处理
const handleError = async (ctx, next) => {
	try {
		await next()
	} catch (error) {
		if (global.config.environment === 'development' && !(error instanceof ErrorTypeModule)) {
			throw error
		}

		if (error instanceof ErrorTypeModule) {
			// 处理已知错误
			ctx.status = error.statusCode
			const info = {
				errorCode: error.errorCode,
				msg: error.msg,
				requestUrl: `${ctx.request.method} ${ctx.request.url}`
			}

			error.data && (info.data = error.data)

			ctx.body = info
		}
		// 处理未知错误
		else {
			console.log('kag-error: ', error)
			ctx.status = 500
			ctx.body = {
				msg: '未知错误',
				errorCode: 20000,
				requestUrl: `${ctx.request.method} ${ctx.request.url}`
			}
		}
	}
}

module.exports = { handleError }
