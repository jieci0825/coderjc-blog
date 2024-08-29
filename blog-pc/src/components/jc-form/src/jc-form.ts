import type { JcUploadConfig } from '@/components/jc-upload/src/jc-upload'

export type FormItemType =
	| 'text'
	| 'textarea'
	| 'password'
	| 'button'
	| 'checkbox'
	| 'file'
	| 'number'
	| 'radio'
	| 'select'
	| 'custom'
	| 'date-select'

interface FormatProps {
	label?: string
	value?: any
}

export interface JcFormItem {
	label: string
	field: string
	type: FormItemType
	isNumber?: boolean
	multiple?: boolean
	disabled?: boolean
	placeholder?: string
	options?: any
	defaultValue?: any // 默认值
	col?: number // 占几列 - 最大为 24 列
	slotName?: string // 如果这个表单项内容需要使用插槽，则配置对应的插槽名
	otherElConfig?: any // 其他配置项
	model?: 'one' | 'more' // type 为 file 时可用
	fileConfig?: JcUploadConfig // 文件上传配置
	formatProps?: FormatProps // 用于格式化 label 和 value 字段名
	formItemStyle?: object
	prependSlot?: string
	appendSlot?: string
	headerSlot?: string
	labelSlot?: string
}

interface RowConfig {
	gutter?: number
	justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
	align?: 'top' | 'middle' | 'bottom'
}

interface ColLayout {
	xs: number // <768px 响应式栅格数或者栅格属性对象
	sm: number // ≥768px 响应式栅格数或者栅格属性对象
	md: number // ≥992px 响应式栅格数或者栅格属性对象
	lg: number // ≥1200px 响应式栅格数或者栅格属性对象
	xl: number // ≥1920px 响应式栅格数或者栅格属性对象
}

interface FooterConfig {
	submitText?: string
	resetText?: string
}

export interface JcFormProps {
	formData?: {}
	formItems: JcFormItem[]
	rules?: object
	labelWidth?: string | number
	colLayout?: ColLayout
	rowConfig?: RowConfig
	formItemStyle?: object // 应用给 formItem 组件的样式
	isFooter?: boolean
	footerConfig?: FooterConfig
	[key: string]: any
}

export interface JcFormEmits {
	(e: 'submit', data?: any): void
	(e: 'reset'): void
}
