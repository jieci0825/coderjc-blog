<script setup lang="ts">
import type { BlogSkeletonProps } from '../types'

const props = withDefaults(defineProps<BlogSkeletonProps>(), {
	loading: true
})
</script>

<template>
	<div style="width: 300px">
		<el-skeleton
			style="width: 100%"
			:loading="props.loading"
			animated>
			<template #template>
				<!-- author -->
				<div
					style="display: flex; width: 100%; padding: 15px; border-radius: 4px; border: 1px solid var(--border-color)">
					<div style="flex: 1; margin-right: 10px">
						<el-skeleton-item
							variant="text"
							style="margin-bottom: 10px; width: 60px; height: 25px" />
						<el-skeleton-item
							variant="text"
							style="margin-bottom: 10px; height: 20px" />
						<el-skeleton-item
							variant="text"
							style="width: 100%" />
					</div>
					<el-skeleton-item
						variant="image"
						style="width: 50px; height: 50px; border-radius: 50%" />
				</div>

				<!-- category -->
				<div
					style="
						width: 100%;
						margin-top: 20px;
						padding: 15px;
						border-radius: 4px;
						border: 1px solid var(--border-color);
					">
					<!-- title -->
					<div
						style="
							height: 25px;
							padding-bottom: 8px;
							margin-bottom: 10px;
							border-bottom: 1px solid var(--border-color);
						">
						<el-skeleton-item
							variant="text"
							style="margin-bottom: 10px; height: 20px; width: 120px" />
					</div>
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 5px; height: 15px; width: 80%" />
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 5px; height: 15px; width: 80%" />
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 5px; height: 15px; width: 80%" />
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 5px; height: 15px; width: 80%" />
					<el-skeleton-item
						variant="text"
						style="height: 15px; width: 80%" />
				</div>

				<!-- hot blog -->
				<div
					style="
						width: 100%;
						margin-top: 20px;
						padding: 15px;
						border-radius: 4px;
						border: 1px solid var(--border-color);
					">
					<!-- title -->
					<div
						style="
							height: 25px;
							padding-bottom: 8px;
							margin-bottom: 10px;
							border-bottom: 1px solid var(--border-color);
						">
						<el-skeleton-item
							variant="text"
							style="margin-bottom: 10px; height: 20px; width: 120px" />
					</div>
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 5px; height: 15px; width: 80%" />
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 5px; height: 15px; width: 80%" />
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 5px; height: 15px; width: 80%" />
					<el-skeleton-item
						variant="text"
						style="margin-bottom: 5px; height: 15px; width: 80%" />
					<el-skeleton-item
						variant="text"
						style="height: 15px; width: 80%" />
				</div>
			</template>
		</el-skeleton>
	</div>
</template>

<style scoped></style>
