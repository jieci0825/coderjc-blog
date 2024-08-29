export default function (el: HTMLElement) {
	const oDiv = el // 当前元素
	const minTop = oDiv.getAttribute('drag-min-top')
	const ifMoveSizeArea = 20
	const positions = ['fixed', 'absolute']
	oDiv.addEventListener('mousedown', e => {
		let target = oDiv
		while (!positions.includes(window.getComputedStyle(target).position) && target !== document.body) {
			target = target.parentElement!
		}

		document.onselectstart = () => {
			return false
		}
		if (!target.getAttribute('init_x')) {
			target.setAttribute('init_x', `${target.offsetLeft}`)
			target.setAttribute('init_y', `${target.offsetTop}`)
		}

		const initX = parseInt(target.getAttribute('init_x')!)
		const initY = parseInt(target.getAttribute('init_y')!)

		// 鼠标按下，计算当前元素距离可视区的距离
		const disX = e.clientX - target.offsetLeft
		const disY = e.clientY - target.offsetTop

		document.onmousemove = e => {
			// 通过事件委托，计算移动的距离
			// 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
			const l = e.clientX - disX
			const t = e.clientY - disY
			const { marginTop: mt, marginLeft: ml, width, height } = window.getComputedStyle(target)

			const result = checkTransformPorp(window.getComputedStyle(target).transform)
			let translateX = 0 // 初始化 translateX
			let translateY = 0 // 初始化 translateY
			if (result) {
				translateX = result.translateX
				translateY = result.translateY
			}

			const w = parseInt(width)
			const h = parseInt(height)

			// 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
			let moveLeft = l - parseInt(ml)
			let moveTop = Number(+t < +minTop! ? minTop : t) - parseInt(mt)

			// 进行移动的边界判断
			if (moveLeft + translateX < 0) {
				moveLeft = 0 - translateX
			}
			if (moveTop + translateY < 0) {
				moveTop = 0 - translateY
			}
			if (moveLeft + w + translateX > document.documentElement.clientWidth) {
				moveLeft = document.documentElement.clientWidth - w - translateX
			}
			if (moveTop + h + translateY > document.documentElement.clientHeight) {
				moveTop = document.documentElement.clientHeight - h - translateY
			}

			target.style.left = moveLeft + 'px'
			target.style.top = moveTop + 'px'

			if (Math.abs(l - initX) > ifMoveSizeArea || Math.abs(t - initY) > ifMoveSizeArea) {
				target.setAttribute('dragged', '')
			} else {
				target.removeAttribute('dragged')
			}
		}

		document.onmouseup = () => {
			document.onmousemove = null
			document.onmouseup = null
			document.onselectstart = null
		}
		// return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
		return false
	})
}

// 检测是否存在translateX和translateY，并返回其值
function checkTransformPorp(transformValue: string): false | { translateX: number; translateY: number } {
	if (transformValue === 'none') return false
	if (transformValue.includes('matrix') || transformValue.includes('translateX')) {
		const translateXMatch = transformValue.match(/translateX\(([^)]+)\)/)
		const translateYMatch = transformValue.match(/translateY\(([^)]+)\)/)
		if (translateXMatch || translateYMatch) {
			return {
				translateX: translateXMatch ? +translateXMatch[1] : 0,
				translateY: translateYMatch ? +translateYMatch[1] : 0
			}
		} else if (transformValue.includes('matrix')) {
			// 如果 transform 是以 matrix 表示的，提取矩阵中的 translateX 值
			const matrixMatch = transformValue.match(/matrix\(([^)]+)\)/)
			if (!matrixMatch) return false
			const matrixValues = matrixMatch[1].split(', ')
			return {
				translateX: +matrixValues[4], // 第五个值是 translateX
				translateY: +matrixValues[5] // 第六个值是 translateY
			}
		} else {
			return false
		}
	} else {
		return false
	}
}
