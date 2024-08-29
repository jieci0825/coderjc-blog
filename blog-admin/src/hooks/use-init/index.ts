import { useGlobalActions } from '@/store'
import { useTheme } from '../use-theme'

export const useInit = async () => {
	const { loadLocal } = useGlobalActions()
	loadLocal()
	const { setPrimaryColor, switchTheme } = useTheme()
	switchTheme()
	setPrimaryColor()
}
