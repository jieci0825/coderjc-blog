export interface Point {
	x: number
	y: number
}

export interface Branch {
	startPoint: Point // 起始坐标
	length: number // 长度
	angle: number // 角度
}

export interface PlumProps {
	len?: number
	minDepth?: number
	angle?: number
	branchColor?: {
		dark: string
		light: string
	}
	maxCount?: number
	lineWidth?: number
}
