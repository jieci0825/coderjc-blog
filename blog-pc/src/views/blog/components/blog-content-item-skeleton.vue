<script setup lang="ts">
import type { BlogSkeletonProps } from '../types'

const props = withDefaults(defineProps<BlogSkeletonProps>(), {
	loading: true
})
</script>

<template>
	<div style="width: 100%; margin-bottom: 30px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color)">
		<el-skeleton
			style="width: 100%"
			:loading="props.loading"
			animated>
			<template #template>
				<div style="display: flex; width: 100%; justify-content: center; margin: 10px 0 20px 0">
					<el-skeleton-item style="width: 240px; margin: 0 auto; height: 30px"></el-skeleton-item>
				</div>
				<div style="display: flex; width: 100%; justify-content: center; margin: 10px 0 20px 0">
					<el-skeleton-item
						variant="text"
						style="width: 50%; margin: 0 auto"></el-skeleton-item>
				</div>
				<div style="display: flex; width: 100%">
					<div style="flex: 1; margin-right: 16px">
						<el-skeleton-item
							variant="text"
							style="margin-bottom: 10px" />
						<el-skeleton-item
							variant="text"
							style="" />
						<el-skeleton-item
							variant="h1"
							style="width: 120px; margin: 10px 0" />
						<div style="display: flex">
							<el-skeleton-item
								variant="h3"
								style="width: 50px; margin-right: 10px" />
							<el-skeleton-item
								variant="h3"
								style="width: 50px; margin-right: 10px" />
							<el-skeleton-item
								variant="h3"
								style="width: 50px; margin-right: 10px" />
							<el-skeleton-item
								variant="h3"
								style="width: 50px; margin-right: 10px" />
						</div>
					</div>
					<el-skeleton-item
						variant="image"
						style="width: 150px; height: 100px; border-radius: 4px" />
				</div>
			</template>
		</el-skeleton>
	</div>
</template>

<style scoped></style>
