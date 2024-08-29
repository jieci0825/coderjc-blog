export interface NavbarProps {}

export interface NavbarMenuItem {
	label: string
	path: string
}

export interface NavbarEmits {
	(event: 'openDosearch'): void
}
