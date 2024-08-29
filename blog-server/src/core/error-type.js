// 异常基类
class ErrorTypeModule extends Error {
	constructor(status, errorCode, msg, data = null) {
		super()
		this.statusCode = status
		this.errorCode = errorCode
		this.msg = msg
		this.data = data
	}
}

class DataSuccess extends ErrorTypeModule {
	constructor(data, msg = 'ok', errorCode = 0) {
		super()
		this.statusCode = 200
		this.errorCode = errorCode
		this.msg = msg
		this.data = data
	}
}

class Success extends ErrorTypeModule {
	constructor(msg) {
		super()
		this.statusCode = 201
		this.errorCode = 0
		this.msg = msg || 'ok'
	}
}

class ParamsError extends ErrorTypeModule {
	constructor(msg, errorCode) {
		super()
		this.statusCode = 400
		this.errorCode = errorCode || '10000'
		this.msg = msg || '参数错误'
	}
}

class NotFound extends ErrorTypeModule {
	constructor(msg, errorCode) {
		super()
		this.statusCode = 404
		this.errorCode = errorCode || '10001'
		this.msg = msg || '资源不存在'
	}
}

class AuthFailed extends ErrorTypeModule {
	constructor(msg, errorCode) {
		super()
		this.statusCode = 401
		this.errorCode = errorCode || '10002'
		this.msg = msg || '授权失败'
	}
}

class Forbidden extends ErrorTypeModule {
	constructor(msg, errorCode) {
		super()
		this.statusCode = 403
		this.errorCode = errorCode || '10003'
		this.msg = msg || '禁止访问'
	}
}

class Collide extends ErrorTypeModule {
	constructor(msg, errorCode) {
		super()
		this.statusCode = 409
		this.errorCode = errorCode || '10004'
		this.msg = msg || '请求冲突'
	}
}

class UnknownError extends ErrorTypeModule {
	constructor(msg, errorCode) {
		super()
		this.statusCode = 500
		this.errorCode = errorCode || '20000'
		this.msg = msg || '未知错误'
	}
}

module.exports = {
	DataSuccess,
	Success,
	ErrorTypeModule,
	ParamsError,
	NotFound,
	AuthFailed,
	Forbidden,
	Collide,
	UnknownError
}
