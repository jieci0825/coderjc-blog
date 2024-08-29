import { ref } from 'vue'

const loadingSkeleton = ref(true)

export default function closeSkeleton() {
	// setTimeout(() => {
	// }, 3000)
	loadingSkeleton.value = false
}
export function useSkeleton() {
	return { closeSkeleton, loadingSkeleton }
}
