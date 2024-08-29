import { NavbarMenuItem } from './navbar.type'

export interface NavScreenProps {
	visible: boolean
	navMenuList: NavbarMenuItem[]
}

export interface NavScreenEmits {
	(e: 'jumpPage', path: string): void
}
