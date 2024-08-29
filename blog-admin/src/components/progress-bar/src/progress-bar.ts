export interface ProgressBarProps {
	progress: number
	mode?: 'horizontal' | 'vertical'
}

export interface ProgressBarEmits {
	(event: 'changeProgress', progress: number): void
}
