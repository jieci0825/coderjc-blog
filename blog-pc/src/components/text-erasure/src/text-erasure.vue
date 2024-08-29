<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { TextErasureProps } from './text-erasure'

const props = withDefaults(defineProps<TextErasureProps>(), {
	text: '展示文本',
	space: 50,
	setp: 0.6
})

const containerStyle = computed(() => {
	return {
		fontSize: props.size ? `${props.size}px` : '',
		color: props.color ? props.color : ''
	}
})

const erasureProgress = ref(0)

let timer: any = null

watch(
	() => props.text,
	newVal => {
		if (newVal) {
			erasureProgress.value = 0
			timer && clearInterval(timer)
			nextTick(() => {
				timer = setInterval(() => {
					erasureProgress.value = erasureProgress.value + props.setp
					if (erasureProgress.value >= 100) {
						erasureProgress.value = 100
						clearInterval(timer)
					}
				}, 1000 / 60)
			})
		}
	},
	{
		immediate: true
	}
)
</script>

<template>
	<div
		class="text-erasure"
		:style="containerStyle">
		<p class="content">{{ props.text }}</p>
		<p class="erasure">
			<span :style="{ '--progress': `${erasureProgress}%`, '--space': `${space}px` }">{{ props.text }}</span>
		</p>
	</div>
</template>

<style scoped lang="less">
.text-erasure {
	position: relative;
	p {
		color: inherit;
		font-size: inherit;
		line-height: 1.3;
	}
	.erasure {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		span {
			color: transparent;
			background: linear-gradient(
				to right,
				transparent var(--progress),
				var(--bg-color) calc(var(--progress) + var(--space))
			);
		}
	}
}
</style>
