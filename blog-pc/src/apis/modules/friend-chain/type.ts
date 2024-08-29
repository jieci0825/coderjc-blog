export interface LinkItem {
	id: number
	linkName: string
	linkDesc: string
	linkUrl: string
	linkPreview: string
}

export interface FriendChainItem {
	id: number
	categoryName: string
	linkList: LinkItem[]
}
