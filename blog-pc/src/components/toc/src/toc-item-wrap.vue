<script setup lang="ts">
import { computed, inject } from 'vue'
import type { TocItemWrapProps } from './toc.type'
import { TocKey } from './constants'

defineOptions({ name: 'TocItemWrap' })

const tocInject = inject(TocKey, undefined)
const props = defineProps<TocItemWrapProps>()

const currentRetract = computed(() => {
	return props.tocItem.level
})

const handleClick = (evt: MouseEvent) => {
	tocInject?.clickEvent(props.tocItem, evt)
}
</script>

<template>
	<div :class="['toc-item-wrap', tocInject?.isMarker ? 'padding' : '']">
		<div
			@click="handleClick"
			:class="{ 'toc-item': true, 'active': props.tocItem.isActive }"
			:style="{ paddingLeft: ` ${currentRetract}em` }">
			<span
				v-if="tocInject?.iconfontName"
				:class="['iconfont', tocInject.iconfontName]"></span>
			<a
				v-if="tocInject?.isAnchor"
				:href="`#${props.tocItem.id}`"
				>{{ props.tocItem.label }}</a
			>
			<span v-else>{{ props.tocItem.label }}</span>

			<span
				class="count"
				v-if="props.tocItem.count"
				>({{ props.tocItem.count }})</span
			>
		</div>
		<template v-if="props.tocItem.children">
			<TocItemWrap
				:toc-item="toc"
				v-for="toc in props.tocItem.children"
				:key="toc.label"></TocItemWrap>
		</template>
	</div>
</template>

<style scoped lang="less">
.toc-item-wrap {
	width: 100%;
	.padding {
		padding: 0 15px;
	}
	.toc-item {
		line-height: 24px;
		font-size: 15px;
		width: 100%;
		color: var(--el-text-color-regular);
		align-items: center;
		.one-omit();
		cursor: pointer;
		--gap: 8px;
		font-weight: 400;
		transition: color 0.25s ease-in, font-weight 0.1s;
		&:hover {
			color: var(--primary-color);
		}
		&.active {
			color: var(--primary-color);
		}
		a {
			text-decoration: none;
		}
		.iconfont {
			margin-right: var(--gap);
			font-size: 16px;
		}
		.count {
			margin-left: var(--gap);
			font-size: 14px;
		}
	}
}
</style>
