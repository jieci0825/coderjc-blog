import type { UserItem } from '@/apis/modules/user/type'

export interface BoxItem {
	label: string
	contentField?: keyof UserItem
	key: string
	slotOpt?: {
		defalutSlot?: string
		operateSlot?: string
	}
	isOperate?: boolean
	operateText?: {
		editText?: string
		saveText?: string
		cancelText?: string
	}
	operateCallback?: Function
}

export interface BoxItemNode extends BoxItem {
	raw: BoxItem
	isEdit: boolean
}

export interface BoxWrapProps {
	list: BoxItem[]
}

export interface BoxWrapEmits {
	(e: 'edit', raw: BoxItem): void
	(e: 'save', content: any, raw: BoxItem): void
	(e: 'cancel', raw: BoxItem): void
}
