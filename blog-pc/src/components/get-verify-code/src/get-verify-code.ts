export interface GetVerifyCodeProps {
	prefix?: string
	isClick: boolean
	countDown?: number
}

export interface GetVerifyCodeEmits {
	(e: 'click'): void
	(e: 'countDown'): void
}
