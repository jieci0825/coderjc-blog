<script setup lang="ts">
import JcOneUpload from './jc-one-upload.vue'
import { provide } from 'vue'
import { JcUploadKey } from './constants'
import type { JcUploadProps } from './jc-upload'

defineOptions({ name: 'JcUpload' })

const modelValue = defineModel()
const props = withDefaults(defineProps<JcUploadProps>(), {
	model: 'one',
	oneStyle: () => {
		return {}
	},
	accept: 'image/jpeg, image/png, image/webp, image/jpg, image/gif',
	fileSize: 1024 * 1024 * 3,
	oneTip: '建议上传 3m 以内的图片',
	initPreviewImage: ''
})

function setModelValue(payload: File | File[] | null) {
	modelValue.value = payload
}

provide(JcUploadKey, {
	...props,
	setModelValue
})
</script>

<template>
	<div class="jc-upload-wrapper">
		<JcOneUpload v-if="props.model === 'one'"></JcOneUpload>
	</div>
</template>

<style scoped lang="less">
.jc-upload-wrapper {
	width: fit-content;
}
</style>
