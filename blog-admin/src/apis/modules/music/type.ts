import { IPageParams } from '../types'

export interface MusicCategoryItem {
	id: number
	categoryName: string
	categoryIcon: string
}

export interface CreateMusicCategoryParams {
	categoryName: string
	categoryIcon: string
}

export interface EditMusicCategoryParams extends CreateMusicCategoryParams {
	id: number
}

export interface GetMusicListParams extends IPageParams {
	songName: string
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
