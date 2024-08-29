import { debounce } from '../src/utils'

function setFontSize(doc, win, designWidth) {
	var html = doc.documentElement
	function refreshRem() {
		var clientWidth = html.clientWidth
		if (clientWidth >= designWidth) {
			html.style.fontSize = '100px'
		} else {
			html.style.fontSize = 100 * (clientWidth / designWidth) + 'px'
		}
	}
	refreshRem()
}

function setViewportHeight() {
	const vh = window.innerHeight
	document.body.style.height = `${vh}px`
}

function onChange() {
	setViewportHeight()
	// setFontSize(document, window, 750)
}

onChange()

window.addEventListener('resize', debounce(onChange, 100))
window.addEventListener('orientationchange', debounce(onChange, 100))
