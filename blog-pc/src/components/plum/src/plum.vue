<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useTheme } from '@/hooks'
import type { Point, Branch, PlumProps } from './plum'

const props = withDefaults(defineProps<PlumProps>(), {
	len: 7,
	angle: 0.5,
	minDepth: 5, // 最小深度，让分支的生成不会过少，有个下限保底
	branchColor: () => ({ light: '#00000040', dark: '#fafafa60' }),
	maxCount: 20000,
	lineWidth: 2
})

const elRef = ref<HTMLCanvasElement>()
const ctx = computed(() => elRef.value!.getContext('2d'))

const { isDark } = useTheme()

// 等待任务列表
const pendingTask: Function[] = []

let setpCount = 0
/**
 * 每一步
 * @param b 起始分支点
 * @param depth 深度
 */
function setp(b: Branch, depth: number) {
	setpCount++
	if (setpCount >= props.maxCount) return

	const end = getEndPoint(b)
	drawBranch(b)

	// 从上一个点来作为下一个的起始点，画下一个分枝，每次画两个分枝出去，两个分枝可能会存在重叠(导致看起来就是一个分枝)
	if (depth < props.minDepth || Math.random() > 0.5) {
		pendingTask.push(() => {
			setp(
				{
					startPoint: end,
					length: b.length,
					angle: b.angle - props.angle * Math.random()
				},
				depth + 1
			) //  - 左枝
		})
	}
	if (depth < props.minDepth || Math.random() < 0.5) {
		pendingTask.push(() => {
			setp(
				{
					startPoint: end,
					length: b.length,
					angle: b.angle + props.angle * Math.random()
				},
				depth + 1
			) //  - 右枝
		})
	}
}

// 一帧
function frame() {
	const tasks = [...pendingTask] // 浅拷贝
	pendingTask.length = 0 // 取出之后清空等待执行的任务数组
	tasks.forEach(task => task()) // 执行任务
}

let framesCount = 0
const intervalFrame = 6
function startFrame() {
	requestAnimationFrame(() => {
		framesCount++
		// 设置间隔多少帧进行一次，控制绘画速度
		if (framesCount % intervalFrame === 0) frame()
		startFrame()
	})
}
startFrame()

function lineTo(startPoint: Point, endPoint: Point) {
	const _ctx = ctx.value!
	_ctx.strokeStyle = isDark.value ? props.branchColor.dark : props.branchColor.light
	_ctx.lineWidth = props.lineWidth
	_ctx.beginPath()
	_ctx.moveTo(startPoint.x, startPoint.y) // 起始坐标
	_ctx.lineTo(endPoint.x, endPoint.y) // 结束坐标
	_ctx.stroke()
}

function getEndPoint(b: Branch): Point {
	return {
		x: b.startPoint.x + b.length * Math.cos(b.angle),
		y: b.startPoint.y + b.length * Math.sin(b.angle)
	}
}

function drawBranch(branch: Branch) {
	lineTo(branch.startPoint, getEndPoint(branch))
}

function setCanvasSize() {
	const w = window.innerWidth
	const h = window.innerHeight
	const drp = devicePixelRatio
	const el = elRef.value!
	const wDrp = w * drp
	const hDrp = h * drp
	el.width = wDrp
	el.height = hDrp
	el.style.width = w + 'px'
	el.style.height = h + 'px'

	return { wDrp, hDrp }
}

function getRandomDecimal(): number {
	return +(Math.random() * 0.8 + 0.2).toFixed(2)
}

function genInitBranchs(x: number, y: number) {
	const branchs: Branch[] = []
	const leftBranch = {
		startPoint: { x: 0, y: y * getRandomDecimal() },
		length: props.len,
		angle: -Math.PI / 2
	}
	const rightBranch = {
		startPoint: { x, y: y * getRandomDecimal() },
		length: props.len,
		angle: -Math.PI / 2
	}
	branchs.push(leftBranch, rightBranch)
	branchs.forEach(branch => {
		setp(branch, 0)
	})
}

// 初始化
function init() {
	setpCount = 0
	ctx.value!.reset()
	nextTick(() => {
		const { wDrp, hDrp } = setCanvasSize()
		genInitBranchs(wDrp, hDrp)
	})
}

watch(isDark, () => {
	init()
})

onMounted(() => {
	init()
})
</script>

<template>
	<div class="canvas-wrap">
		<canvas ref="elRef"></canvas>
	</div>
</template>

<style lang="less">
.canvas-wrap {
	position: fixed;
	inset: 0;
	z-index: -1;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
	canvas {
		opacity: 0.4;
	}
}
</style>
