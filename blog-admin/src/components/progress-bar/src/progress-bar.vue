<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { useEventListener } from '@/hooks'
import type { ProgressBarEmits, ProgressBarProps } from './progress-bar'

defineOptions({ name: 'ProgressBar' })

const props = withDefaults(defineProps<ProgressBarProps>(), {
	mode: 'horizontal'
})
const emits = defineEmits<ProgressBarEmits>()

const { refs, setRef } = useRefs()

const p = ref(0)

watch(
	() => props.progress,
	newValue => {
		p.value = newValue
	},
	{
		immediate: true
	}
)

const isDragging = ref(false)

const startDrag = () => {
	isDragging.value = true
}

const onMove = (e: MouseEvent) => {
	if (e.target === refs.progressBarRef || e.target === refs.progressInnerRef) {
		showDragBall()
	}
	if (!isDragging.value) return
	// 获取进度条容器距离视口左侧的距离和宽度
	const { left, width, top, height } = refs.progressBarRef.getBoundingClientRect()
	// 获取当前鼠标的x坐标
	let x = e.clientX
	let y = e.clientY

	const progress = props.mode === 'horizontal' ? horizontal(x, left, width) : vertical(y, top, height)
	p.value = progress
}

// 水平
function horizontal(x: number, left: number, width: number): number {
	if (x < left) {
		x = left
	} else if (x > left + width) {
		x = left + width
	}
	// 计算进度
	const progress = processProgressEdgeCase(Math.round(((x - left) / width) * 100))
	return progress
}

// 垂直
function vertical(y: number, top: number, height: number): number {
	if (y < top) {
		y = top
	} else if (y > top + height) {
		y = top + height
	}
	// 计算进度
	const progress = processProgressEdgeCase(Math.round(((y - top) / height) * 100))
	return progress
}

function processProgressEdgeCase(progress: number) {
	if (progress < 0) {
		progress = 0
	} else if (progress > 100) {
		progress = 100
	} else {
		progress = progress
	}
	return progress
}

const onLeave = () => {
	// 离开时如果不处于拖拽状态则隐藏拖动球
	if (!isDragging.value) {
		hideDragBall()
	}
}

const onBarDown = (e: MouseEvent) => {
	isDragging.value = true
	onMove(e)
}

useEventListener(window, 'mousemove', (e: MouseEvent) => {
	onMove(e)
})

const stopDrag = () => {
	if (isDragging.value) {
		isDragging.value = false
		hideDragBall()
		emits('changeProgress', p.value)
	}
}

useEventListener(window, 'mouseup', () => {
	stopDrag()
})

function showDragBall() {
	refs.progressDotRef.style.display = 'block'
}

function hideDragBall() {
	refs.progressDotRef.style.display = 'none'
}
</script>

<template>
	<div :class="['progress-box', `${mode}`]">
		<div
			@mouseleave="onLeave"
			@mousedown.stop="onBarDown"
			:ref="setRef('progressBarRef')"
			class="progress-bar">
			<div
				:style="{ '--p': `${p}%` }"
				:ref="setRef('progressInnerRef')"
				class="progress-inner">
				<!-- 拖动球 -->
				<div
					@mousedown.stop="startDrag"
					:ref="setRef('progressDotRef')"
					class="progress-dot"></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.progress-box {
	width: 100%;
	padding: 8px 5px;
	&.vertical {
		height: 100%;
		padding: 5px 8px;
		.progress-bar {
			width: 5px;
			height: 100%;
			margin: 10px auto;
			.progress-inner {
				width: 100%;
				height: var(--p);
				.progress-dot {
					left: 50%;
					top: calc(100% - 6px);
					transform: translateX(-50%);
				}
			}
		}
	}
	.progress-bar {
		height: 5px;
		flex: 1;
		margin: 0 10px;
		border-radius: 5px;
		background-color: var(--progress-bg-color);
		.progress-inner {
			position: relative;
			border-radius: inherit;
			height: 100%;
			width: var(--p);
			background-color: var(--primary-color);
			.progress-dot {
				// display: none;
				position: absolute;
				z-index: 10;
				top: 50%;
				right: -6px;
				transform: translateY(-50%);
				width: 12px;
				height: 12px;
				border-radius: 50%;
				background-color: var(--primary-color);
				cursor: pointer;
			}
		}
	}
}
</style>
