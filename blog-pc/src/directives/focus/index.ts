// 自动获取焦点指令
//  - 如果当前元素不是 input 元素，则自动查找当前元素下的第一个 input 元素
export default {
	mounted: (el: HTMLInputElement) => el.focus()
}
