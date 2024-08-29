import { IPageParams } from '../types'

export interface FriendChainCategoryItem {
	id: number
	categoryName: string
}

export interface CreateFriendChainCategoryParams {
	categoryName: string
}

export interface EditFriendChainCategoryParams extends CreateFriendChainCategoryParams {
	id: number
}

export interface GetFriendChainLinkListParams extends IPageParams {
	linkName: string
}

export interface CreateFriendChainLinkParams {
	linkName: string
	linkPreview: string
	linkDesc: string
	linkUrl: string
	linkCategoryId: number
	linkCategoryName: string
}

export interface FriendChainLinkItem extends CreateFriendChainLinkParams {
	id: number
}
