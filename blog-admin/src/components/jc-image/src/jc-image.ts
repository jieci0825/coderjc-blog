export interface JcImageProps {
	src: string | any
	width?: number
	height?: number
	radius?: number
	fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
	lazy?: boolean
	previewList?: string[]
}
