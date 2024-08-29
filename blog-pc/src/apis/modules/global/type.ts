export interface AuthorInfo {
	id: number
	nickname: string
	avatarUrl: string
	description: string
	sign: string
}

export interface GetCaptchaParams {
	account: string
	email: string
}

export interface LoginParams {
	account: string
	password: string
}

export interface LoginParamsResp {
	accessToken: string
	refreshToken: string
}

export interface SiteHomeInfo {
	title: string
	slogan: string
	publish: string
	runDays: number
}

export interface GetCredentialResp {
	ExpiredTime: number
	Expiration: string
	Credentials: {
		Token: string
		TmpSecretId: string
		TmpSecretKey: string
	}
	RequestId: string
}

export interface CreateFileRecordParams {
	filename: string
	key: string
	location: string
	size: string
	mimetype: string
}

export interface DailyQuoteItem {
	id: number
	author: string
	content: string
}
