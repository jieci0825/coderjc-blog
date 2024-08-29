import { reactive } from 'vue'

export const useRefs = () => {
	const refs = reactive<{ [key: string]: any }>({})
	const setRef = <T = any>(key: string) => {
		return (el: T) => {
			refs[key] = el
		}
	}
	return { refs, setRef }
}
