/**
 * debounce  防抖函数
 * @param {function} fn 需要执行的函数
 * @param {number} delay 延迟的时间 | 默认300ms
 * @param {object} options 配置对象
 * @param {boolean} options.immediate 立即执行一次
 * @returns
 */
export function debounce(fn: Function, delay = 300, options = { immediate: false }) {
	const { immediate } = options

	// 是否执行
	let isInvoke = false

	let timer: any = null
	function _debounce(this: any, ...args: any) {
		if (timer) clearTimeout(timer)

		// 判断是否需要立即执行
		if (immediate && !isInvoke) {
			fn.apply(this, args)
			isInvoke = true
		} else {
			timer = setTimeout(() => {
				// 绑定 this 和 接收参数
				fn.apply(this, args)
				isInvoke = false
			}, delay)
		}
	}

	// 取消
	_debounce.cancel = function () {
		timer && clearTimeout(timer)
		isInvoke = false
		timer = null
	}

	return _debounce
}
