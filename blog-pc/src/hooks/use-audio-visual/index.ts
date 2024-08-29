import { watch } from 'vue'
import { BLOG_GLOBAL_CONFIG } from '@/constants'
import { useMusicGetters } from '@/store'
import { getLocalCache } from '@/utils'
import { EMusicPlayerStyle, type MusicEffectType } from '@/components/player'

export function useAudioVisual(wrapEL: HTMLElement, audioEl: HTMLAudioElement, cvs: HTMLCanvasElement) {
	let isInit = false
	let analyser: any // 分析器
	let dataArray: any // 数据数组

	const ctx = cvs.getContext('2d')!
	audioBindEvent()

	const { getMusicEffect } = useMusicGetters()
	watch(
		() => getMusicEffect.value,
		newValue => {
			if (newValue === 'none') {
				closeMusicEffect()
			}
		},
		{ immediate: true }
	)

	let width = 0

	let cw = 0
	let ch = 0

	function setCanvasSize() {
		if (!wrapEL || !cvs) return
		const _cw = Math.floor(wrapEL.clientWidth / devicePixelRatio)
		const _ch = Math.floor(wrapEL.clientHeight / devicePixelRatio)
		if (_cw === cw || _ch === ch) return
		cvs.width = _cw
		cvs.height = _ch
		width = _cw
		cw = _cw
		ch = _ch
	}

	// 清空画布
	function clearCanvas() {
		ctx.clearRect(0, 0, cvs.width, cvs.height)
	}

	// 音乐动效映射
	const musicEffectMap: { [key in MusicEffectType]: Function } = {
		[EMusicPlayerStyle.FERVENT_BAR]: drawFerventBar,
		[EMusicPlayerStyle.PLAIN_BAR]: drawPlainBar,
		[EMusicPlayerStyle.NONE]: closeMusicEffect
	}

	// 关闭音乐动效
	function closeMusicEffect() {
		clearCanvas()
	}

	// 绘制-将分析的波形绘制到 canvas
	function draw() {
		requestAnimationFrame(draw)
		clearCanvas()
		if (!isInit) return
		setCanvasSize()

		// 获取分析器节点分析的数据存入数组中
		//  - 通过 getByteFrequencyData 方法实现将当前一段音频源的频率数据装到数组里面
		analyser.getByteFrequencyData(dataArray)

		const drawFunc = musicEffectMap[getMusicEffect.value]
		drawFunc && drawFunc()
	}

	// 绘制热烈的光柱
	function drawFerventBar() {
		const len = dataArray.length / 3
		const barWidth = cvs.width / len - width * 0.007
		ctx.fillStyle = getLocalCache(BLOG_GLOBAL_CONFIG).primaryColor
		for (let i = 0; i < len; i++) {
			const data = dataArray[i]
			const barHeight = ((data / 255) * cvs.height) / 2
			const y = cvs.height - barHeight + 5

			const xRight = i * barWidth + width / 2
			ctx.beginPath()
			ctx.ellipse(xRight, y, barWidth, barHeight, 0, 0, Math.PI * 2)
			ctx.fill()

			const xLeft = width / 2 - (i + 1) * barWidth
			ctx.beginPath()
			ctx.ellipse(xLeft, y, barWidth, barHeight, 0, 0, Math.PI * 2, true)
			ctx.fill()
		}
	}

	// 绘制朴素的光柱
	function drawPlainBar() {
		// 数据的长度
		//  - 一些音频人耳听不见的频率，所以需要过滤掉 长度缩小
		const len = dataArray.length / 3
		// 柱子的宽度
		//  - 绘制对称图形，所以需要除以 2
		const barWidth = cvs.width / len / 2
		// 柱子的间隔
		//  - 进一步缩减宽度，为了让柱子更细，为原宽度的 40%，所以间隔还要柱子宽度的 60%
		const barGap = barWidth * 0.6
		// 设置画笔颜色
		ctx.fillStyle = getLocalCache(BLOG_GLOBAL_CONFIG).primaryColor
		for (let i = 0; i < len; i++) {
			const data = dataArray[i] // 8bit - 0~255 <256
			// 柱子的高度
			const barHeight = (data / 255) * cvs.height
			// 计算柱子的 x 坐标
			//  - 右侧的x坐标还需要加上画布宽度的一半
			const xRight = i * barWidth + width / 2
			// 计算柱子的 y 坐标
			const y = cvs.height - barHeight
			// 绘制柱子
			ctx.fillRect(xRight, y, barWidth - barGap, barHeight)

			// 计算左侧的x坐标
			//  +1 防止中间的重叠
			const xLeft = width / 2 - (i + 1) * barWidth
			// 绘制柱子
			ctx.fillRect(xLeft, y, barWidth - barGap, barHeight)
		}
	}

	// 监听音频播放
	function onAudioPlay() {
		if (isInit) return

		// 创建音频上下文
		const audioCtx = new AudioContext()
		// 创建音频源节点
		const source = audioCtx.createMediaElementSource(audioEl)
		// 创建分析器节点
		analyser = audioCtx.createAnalyser()
		// 设置分析器属性-让分析器分析音频的频率数据
		analyser.fftSize = 512 // 2的n次方 - 数值越大结果越细腻
		// 创建数组，用于接收分析器节点的分析数据
		//  - 傅里叶图对称，所以只需要一半的数据
		//  - analyser.frequencyBinCount 就是处理好的数据长度，为一半
		dataArray = new Uint8Array(analyser.frequencyBinCount)
		// 将音频源的输出连接到分析器(分析器进行分析音频的波形-最后绘制波形到 canvas)
		source.connect(analyser)
		// 将分析器的输出连接到音频上下文的输出设备
		analyser.connect(audioCtx.destination)
		isInit = true
		draw()
	}

	function audioBindEvent() {
		audioEl.addEventListener('play', onAudioPlay)
	}

	function audioOffEvent() {
		audioEl.removeEventListener('play', onAudioPlay)
	}

	return {
		audioOffEvent
	}
}
