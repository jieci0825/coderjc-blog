<script setup lang="ts">
import type { BlogSkeletonProps } from '../types'

const props = withDefaults(defineProps<BlogSkeletonProps>(), {
	loading: true
})
</script>

<template>
	<div style="width: 100%; margin-bottom: 10px; padding: 10px; border-bottom: 1px solid var(--border-color)">
		<el-skeleton
			style="width: 100%"
			:loading="props.loading"
			animated>
			<template #template>
				<div style="display: flex; width: 100%; justify-content: center; margin: 10px 0 10px 0">
					<el-skeleton-item style="width: 240px; margin: 0 auto; height: 30px"></el-skeleton-item>
				</div>
				<div style="display: flex; width: 100%; justify-content: center; margin: 10px 0 10px 0">
					<el-skeleton-item
						variant="text"
						style="width: 50%; margin: 0 auto"></el-skeleton-item>
				</div>
				<div style="width: 100%">
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 3px" />
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 10px" />
				</div>
				<el-skeleton-item
					variant="image"
					style="width: 100%; height: 0; padding-bottom: 56%; border-radius: var(--base-b-r); overflow: hidden" />
			</template>
		</el-skeleton>
	</div>
</template>

<style scoped></style>
