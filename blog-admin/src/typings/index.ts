export type ExtractFields<T extends { field: string }[]> = {
	[K in T[number]['field']]: any
}

export enum EBlogStatus {
	HIDE = 0, // 隐藏
	PUBLISH = 1, // 发布
	DRAFT = 2 // 草稿
}
export type BlogStatus = (typeof EBlogStatus)[keyof typeof EBlogStatus]

export enum EComment {
	PARENT = 'parent', // 父级评论
	CHILD = 'child' // 子级评论
}
export type CommentType = (typeof EComment)[keyof typeof EComment]

export enum ECommentSubjectType {
	BLOG_COMMENT = 100, // 博客评论
	SITE_MESSAGE = 200, // 站点留言
	ALL = 0 // 全部
}
export type CommentSubjectType = (typeof ECommentSubjectType)[keyof typeof ECommentSubjectType]
