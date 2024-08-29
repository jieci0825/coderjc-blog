export type InsertFnType = (url: string, name: string) => void

export interface EditorProps {
	data?: string
}

export interface EditorEmits {
	(e: 'uploadFile', file: File, callback: InsertFnType): void
}
