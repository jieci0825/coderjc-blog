export interface MusicCategoryItem {
	id: number
	categoryName: string
	categoryIcon: string
}

export interface GetMusicListByCategoryIdParams {
	categoryId: number
}

export interface CreateMusicParams {
	songName: string
	singer: string
	lyric: string
	songUrl: string
	songCover: string
	musicCategoryName: string
}

export interface MusicItem extends CreateMusicParams {
	id: number
}
