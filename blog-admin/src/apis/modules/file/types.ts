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

export interface createFileRecordParams {
	filename: string
	key: string
	location: string
	size: string
	mimetype: string
}
