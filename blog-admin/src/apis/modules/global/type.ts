export interface LoginParams {
	account: string
	password: string
}

export interface LoginParamsResp {
	token: string
}

export interface GetCaptchaParams {
	account: string
	email: string
}
