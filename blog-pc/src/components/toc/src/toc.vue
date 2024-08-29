<script setup lang="ts">
import { ref, provide, computed, watch } from 'vue'
import type { TocItem, TocNode, TocProps, TocEmits } from './toc.type'
import TocItemWrap from './toc-item-wrap.vue'
import { TocKey } from './constants'
import { useEventListener } from '@/hooks'
import { debounce } from '@/utils'

const props = withDefaults(defineProps<TocProps>(), {
	title: 'On this page',
	isMarker: false,
	isAnchor: false,
	scrollTarget: 'body'
})
const emits = defineEmits<TocEmits>()

// 范围
const range = 200
const tocItem = 24
const marker = 15
// 当前激活锚点的索引
const currentAnchorIndex = ref(0)
// 当前锚点索引id - 决定 tocItem 激活项
const currentAnchorId = ref('')
// 所有生成目录的dom
const tocDoms = computed(() => {
	const doms: HTMLElement[] = []
	const addItemDom = (list: TocItem[]) => {
		for (const item of list) {
			const dom = document.getElementById(item.id as unknown as string)
			if (dom) {
				doms.push(dom)
			}
			if (item.children?.length) {
				addItemDom(item.children)
			}
		}
	}
	addItemDom(props.tocList)
	return doms
})
// 是否存在激活的锚点
const hasActiveAnchor = computed(() => tocDoms.value.map(item => item.id).includes(currentAnchorId.value))
// 加工后的目录列表
const _tocList = computed(() => {
	function _deep(data: TocItem[], level: number) {
		const result = data.map(toc => {
			const isActive = (toc.id as unknown as string) === currentAnchorId.value
			const tocNode: TocNode = {
				...toc,
				level,
				isLeaf: !toc.children?.length,
				raw: toc,
				children: null,
				isActive
			}

			if (toc.children?.length) {
				tocNode.children = _deep(toc.children, level + 1)
			}

			return tocNode
		})
		return result
	}

	const result = _deep(props.tocList, 0)

	return result
})

// 监听-为了完成进入页面选中第一个标题
watch(
	() => tocDoms.value,
	newVal => {
		// 数组有值且当前路劲上不存在锚点信息
		if (newVal.length && !window.location.hash) {
			setCurrentAnchorId()
		}
	}
)

// 设置 id 和 index
function setIdAndIndex(id: string, index: number) {
	currentAnchorId.value = id
	currentAnchorIndex.value = index
}

// 设置当前锚点 id
function setCurrentAnchorId() {
	// 清空上一次的结果
	currentAnchorId.value = ''

	for (let i = 0; i < tocDoms.value.length; i++) {
		const element = tocDoms.value[i]
		const rect = element.getBoundingClientRect()
		// 当前 dom 在规定的区间之内
		// 取 50 是因为导航栏的高度占一部分
		if (rect.top <= range && rect.top > 50) {
			setIdAndIndex(element.id, i)
			return
		}
		// 当前 dom 的 top 大于设定的范围，即在范围之下
		//  - 如果当前 dom 超出范围，则表示当前dom不在范围且后续的也不需要在检测了
		else if (rect.top > range) {
			// 如果此时当前的 currentAnchorId 还没有值，则手动赋值为当前
			setIdAndIndex(element.id, i)
			return
		}
		// 当前 dom 的 top 小于 range，在范围之上
		else {
			// 这里直接先让当前项激活，如果后面有激活的就会被在后面的循环中，前面两个判定条件重新赋值
			setIdAndIndex(element.id, i)
		}
	}
}

const handleClick = (toc: TocNode, evt: MouseEvent) => {
	emits('click', toc.raw, evt)
}

// 锚点距离顶部距离
const anchorTop = computed(() => {
	const centerVal = (tocItem - marker) / 2
	return currentAnchorIndex.value * tocItem + centerVal
})

const handleScroll = () => {
	setCurrentAnchorId()
}

const _dHandleScroll = debounce(handleScroll, 100)
useEventListener(props.scrollTarget, 'scroll', _dHandleScroll)

provide(TocKey, {
	clickEvent: handleClick,
	iconfontName: props.iconfontName,
	isAnchor: props.isAnchor,
	isMarker: props.isMarker,
	curAnchorId: currentAnchorId
})
</script>

<template>
	<div class="toc">
		<div :class="['toc-title', props.isMarker ? 'padding' : '']">{{ props.title }}</div>
		<div class="toc-content-wrap">
			<div class="toc-content">
				<TocItemWrap
					v-for="toc in _tocList"
					:toc-item="toc"
					:is-marker="props.isMarker"
					:key="toc.label"></TocItemWrap>
			</div>
			<div
				class="marker"
				:style="{ top: anchorTop + 'px' }"
				v-if="props.isMarker && hasActiveAnchor"></div>
		</div>
	</div>
</template>

<style scoped lang="less">
.toc {
	width: 100%;
	position: relative;
	.padding {
		padding: 0 15px;
	}

	.toc-title {
		font-weight: 600;
		margin-bottom: 10px;
		color: var(--el-text-color-primary);
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 5px;
		font-size: 18px;
	}

	.toc-content-wrap {
		width: 100%;
		position: relative;
		.toc-content {
			width: 100%;
		}
		.marker {
			position: absolute;
			width: 3px;
			height: 15px;
			border-radius: 4px;
			background-color: var(--primary-color);
			top: 0;
			left: 0;
			transition: top 0.25s ease-in-out;
		}
	}
}
</style>
