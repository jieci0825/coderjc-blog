// 切换字体美化
export function switchFontBeautify(isStart: boolean) {
	const body = document.body
	if (isStart) {
		body.classList.remove('reset-font')
	} else {
		body.classList.add('reset-font')
	}
}
