import { onMounted, onBeforeUnmount, type Ref, isRef, watch, unref } from 'vue'

export function useEventListener(
    target: EventTarget | Ref<EventTarget | HTMLElement | null> | string,
    eventName: string,
    listener: (e: any) => void,
    options?: boolean | AddEventListenerOptions
) {
    let dom: any = target

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
            dom = document.querySelector(target)
            dom?.addEventListener(eventName, listener, options)
        } else {
            dom.addEventListener(eventName, listener, options)
        }
    })

    onBeforeUnmount(() => {
        if (typeof target === 'string') {
            dom?.removeEventListener(eventName, listener, options)
        } else {
            unref(dom)?.removeEventListener(eventName, listener, options)
        }
    })

    return {
        dom: dom
    }
}
