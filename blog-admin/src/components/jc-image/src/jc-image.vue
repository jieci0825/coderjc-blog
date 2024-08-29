<script setup lang="ts">
import { computed } from 'vue'
import { JcImageProps } from './jc-image'

defineOptions({ name: 'JcImage' })
const props = withDefaults(defineProps<JcImageProps>(), {
	width: 100,
	height: 100,
	radius: 4,
	fit: 'cover',
	lazy: true,
	previewList: () => []
})

const previewList = computed(() => {
	return props.previewList && props.previewList.length ? props.previewList : [props.src]
})

const style = computed(() => {
	return {
		width: props.width + 'px',
		height: props.height + 'px',
		borderRadius: props.radius + 'px'
	}
})
</script>

<template>
	<div
		class="jc-image-wrapper"
		:style="style">
		<el-image
			v-bind="$attrs"
			:src="props.src"
			:fit="props.fit"
			:lazy="props.lazy"
			:preview-src-list="previewList"
			style="width: 100%; height: 100%"></el-image>
	</div>
</template>

<style scoped lang="less">
.jc-image-wrapper {
	overflow: hidden;
	border: 1px solid var(--border-color);
}
</style>
