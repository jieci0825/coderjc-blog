import { onMounted, onBeforeUnmount, type Ref, isRef, watch, unref } from 'vue'

export function useEventListener(
	target: EventTarget | Ref<EventTarget | null> | string,
	eventName: string,
	listener: (e: any) => void,
	options?: boolean | AddEventListenerOptions
) {
	onMounted(() => {
		if (isRef(target)) {
			watch(
				() => target.value,
				(newValue, oldValue) => {
					oldValue?.removeEventListener(eventName, listener, options)
					newValue?.addEventListener(eventName, listener, options)
				},
				{
					immediate: true
				}
			)
		} else if (typeof target === 'string') {
			document.querySelector(target)?.addEventListener(eventName, listener, options)
		} else {
			target.addEventListener(eventName, listener, options)
		}
	})

	onBeforeUnmount(() => {
		if (typeof target === 'string') {
			document.querySelector(target)?.removeEventListener(eventName, listener, options)
		} else {
			unref(target)?.removeEventListener(eventName, listener, options)
		}
	})
}
