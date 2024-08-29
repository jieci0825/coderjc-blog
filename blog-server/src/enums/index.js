const { createEnums } = require('@/utils')

// 登录类型
const LoginType = createEnums({
	USER_ACCOUNT: 1, // 账户
	USER_MOBILE: 2, // 手机
	USER_EMAIL: 3 // 邮箱
})

// 验证码类型
const CaptchaType = createEnums({
	EMAIL: 100 // 邮箱
})

// 账号主体类型
const ACCOUNT_TYPE = createEnums({
	EMAIL: 'email', // 邮箱
	SYSTEM_ACCOUNT: 'system_account' // 系统账号
})

// 排行类型
const RankType = createEnums({
	HOT: 'hot', // 热门
	LATEST: 'latest' // 最新
})

// 点赞类型
const LikeType = createEnums({
	BLOG: 100, // 博客
	PARENT_COMMENT: 200, // 父级评论
	CHILD_COMMENT: 300 // 子级评论
})

// 评论类型
const CommentType = createEnums({
	PARENT: 'parent', // 父级评论
	CHILD: 'child' // 子级评论
})

module.exports = {
	LoginType,
	CaptchaType,
	ACCOUNT_TYPE,
	RankType,
	LikeType,
	CommentType
}
