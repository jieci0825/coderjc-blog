import { computed, ref } from 'vue'
import { setLocalCache, getLocalCache } from '@/utils'
import { BLOG_ADMIN_PRIMARY_COLOR, BLOG_ADMIN_THEME } from '@/constants'
import type { ThemeType, ColorType } from './type'

const NAME_PREFIX = '--el-color'
const DARK = 'dark'
const DEFAULT_PRIMARY_COLOR = '#637dff'

const theme = ref(getLocalCache(BLOG_ADMIN_THEME) || '')
const isDark = computed(() => theme.value === DARK)
const curPrimaryColor = ref(getLocalCache(BLOG_ADMIN_PRIMARY_COLOR) || DEFAULT_PRIMARY_COLOR)

export const useTheme = () => {
	const switchTheme = (_theme?: ThemeType, isanimation: boolean = false) => {
		theme.value = _theme || getLocalCache(BLOG_ADMIN_THEME)
		// 开启动画且支持该 api
		if (isanimation && (document as any).startViewTransition) {
			switchThemeAnimation()
		} else {
			switchClass()
		}
		setLocalCache(BLOG_ADMIN_THEME, theme.value)
		setPrimaryColor()
	}

	const setPrimaryColor = (color?: string) => {
		curPrimaryColor.value = color || getLocalCache(BLOG_ADMIN_PRIMARY_COLOR) || DEFAULT_PRIMARY_COLOR
		setLocalCache(BLOG_ADMIN_PRIMARY_COLOR, curPrimaryColor.value!)

		genSecondaryColor(curPrimaryColor.value!, 'primary')
	}

	return {
		isDark,
		switchTheme,
		setPrimaryColor,
		curPrimaryColor
	}
}

function switchClass() {
	const container = document.documentElement
	if (theme.value === DARK) {
		container.classList.add(DARK)
	} else {
		container.classList.remove(DARK)
	}
}

// 切换主题时，添加动画效果
function switchThemeAnimation() {
	const removeEvent = () => document.removeEventListener('click', handle)

	const handle = (e: MouseEvent) => {
		const transition = (document as any).startViewTransition(() => {
			switchClass()
		})

		const x = e.clientX
		const y = e.clientY

		// 根据三角函数求出半径
		const maxX = Math.max(x, window.innerWidth - x)
		const maxY = Math.max(y, window.innerHeight - y)
		const radius = Math.hypot(maxX, maxY)

		const clipPath = [`circle(0% at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]

		transition.ready.then(() => {
			document.documentElement.animate(
				{
					// 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
					clipPath: isDark.value ? clipPath.reverse() : clipPath
				},
				{
					duration: 300,
					pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
				}
			)
			removeEvent()
		})
	}

	document.addEventListener('click', handle)

	return {
		removeEvent
	}
}

const nums = [3, 5, 7, 8, 9]
const container = document.documentElement
// 根据主色生成辅色
function genSecondaryColor(color: string, type: ColorType) {
	if (!isHex(color)) return ElMessage.error('请输入正确的 hex 颜色值')

	container.style.setProperty(`${NAME_PREFIX}-${type}`, color)

	for (let i = 0; i < nums.length; i++) {
		const n = nums[i]
		const colorValue = isDark.value ? genDark(color, n / 10) : genLight(color, n / 10)
		container.style.setProperty(`${NAME_PREFIX}-${type}-light-${n}`, colorValue)
	}

	container.style.setProperty(`${NAME_PREFIX}-${type}-dark-2`, genDark(color, 0.2))
}

// 生成浅色系的辅色
function genLight(color: string, level: number): any {
	const rgb = hexToRgb(color)

	for (let i = 0; i < rgb.length; i++) {
		rgb[i] = Math.round(rgb[i] * (1 - level) + level * 255)
	}

	return rgbToHex(rgb[0], rgb[1], rgb[2])
}

// 生成深色系的辅色
function genDark(color: string, level: number): any {
	const rgb = hexToRgb(color)

	for (let i = 0; i < rgb.length; i++) {
		// * 将 255 换成 20.5，即可实现色系偏暗
		rgb[i] = Math.round(rgb[i] * (1 - level) + level * 20.5)
	}

	return rgbToHex(rgb[0], rgb[1], rgb[2])
}

// 是否是 hex
function isHex(color: string) {
	const reg = /^#?[0-9A-Fa-f]{6}$/
	return reg.test(color)
}

// hex 转 rgb
function hexToRgb(str: string) {
	const rgb: Array<number> = []

	str = str.replace('#', '')

	// 匹配任意两个字符，返回两个字符组成的数组
	const hexs = str.match(/../g)

	// 使用 16 进制为基底，转换为 10 进制
	for (let i = 0; i < 3; i++) {
		rgb.push(parseInt(hexs![i], 16))
	}

	return rgb
}

// rgb 转 hex
function rgbToHex(r: any, g: any, b: any) {
	const reg = /^\d{1,3}$/
	if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return

	// 不足两位，使用 0 补足
	const hexs = [padZero(r.toString(16)), padZero(g.toString(16)), padZero(b.toString(16))]

	return `#${hexs.join('')}`
}

// 补零
function padZero(value: number | string, pad: number = 2) {
	return value.toString().padStart(pad, '0')
}
