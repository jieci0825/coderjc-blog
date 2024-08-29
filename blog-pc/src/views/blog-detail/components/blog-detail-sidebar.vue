<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import type { BlogDetailSidebarProps, TitleNode } from '../types'
import Toc, { TocItem } from '@/components/toc'

const props = defineProps<BlogDetailSidebarProps>()

const titleTree = ref<TitleNode[]>([])

const tocList = computed(() => {
	function _deep(list: TitleNode[]) {
		const _result = list.map(item => {
			const toc: TocItem = {
				label: item.title,
				id: item.raw.id,
				children: null
			}

			if (item.children?.length) {
				toc.children = _deep(item.children)
			}

			return toc
		})
		return _result
	}
	return _deep(titleTree.value)
})

watch(
	() => props.titleList,
	newVal => {
		if (!newVal || newVal.length === 0) return
		// 两种方案，一种转为树结构，一种提取标题计算 level

		// 提取标题计算 level 很容易也平滑：但是这里为了复用一个组件，所以还是转为树结构
		getTitleTree(newVal)
	}
)

function getTitleTree(headings: Element[]) {
	headings = Array.from(headings)
	// 得出本次标题数组里面等级最大的，作为父节点等级
	const maxLevel = Math.min(...headings.map(item => parseInt(item.tagName[1])))

	const tree: TitleNode[] = []

	// 上一个节点
	let preNode: TitleNode | null = null
	// 一个节点应该包含 titleLevel children raw parent
	for (const item of headings) {
		const titleLevel = parseInt(item.tagName[1])
		const node: TitleNode = {
			titleLevel,
			title: item.textContent!,
			children: [],
			raw: item,
			// 如果当前节点的等级等于本次列表里面的最高等级，则它没有父节点，包括第一个就算不是最高等级的节点，它也没有父节点
			parent: titleLevel === maxLevel ? null : preNode
		}

		// 上一个节点为空则直接加入，如果当前节点等于最高等级节点也直接加入
		if (!preNode || titleLevel === maxLevel) {
			tree.push(node)
			preNode = node
			continue
		}

		// 当前节点的 titleLevel 大于上一个节点的 titleLevel 时候，则表示属于它的子级
		if (titleLevel > preNode.titleLevel) {
			preNode.children.push(node)
			preNode = node
			continue
		}

		// 如果当前节点 titleLevel 和上一个节点的 titleLevel 一样，则表示这是兄弟节点
		if (titleLevel === preNode.titleLevel) {
			preNode.parent?.children.push(node)
			// 如果相等则表示当前节点的父节点就不是上一个节点，而是上一个节点的父节点
			node.parent = preNode.parent
			preNode = node
			continue
		}

		// 如果当前节点的 titleLevel 小于上一个节点的 titleLevel 的时候，则表示不是它的子级
		//  - 此时需要通过上一个节点的 parent 属性进行向上的链式查找。像作用域一样
		//  - 直到在这个链条中找到一个节点的 titleLevel 比当前节点 titleLevel 小的或者相等的
		if (titleLevel < preNode.titleLevel) {
			// 得当上一个节点的父节点
			let parent = preNode.parent
			while (parent) {
				// 如果找到的这个父节点比当前节点的 titleLevel 小，则表示当前节点也是这个父节点的子级
				//  - 比如下面这种情况，就会进入这个条件
				/* 
					h2
					- h3
					--- h5	
					-- h4
					- h3
					- h3
				*/
				if (parent.titleLevel < titleLevel) {
					parent.children.push(node)
					// 同时此时也表示上一个节点不能作为当前节点的父节点，需要同步修改
					node.parent = parent
					break
				}
				// 如果找到的这个父节点和当前节点的 titleLevel 一样，则这个父节点和当前节点是同级，这个父节点的父节点就是当前节点的父级
				else if (parent.titleLevel === titleLevel) {
					parent.parent?.children.push(node)
					// 同时此时也表示上一个节点不能作为当前节点的父节点，需要同步修改
					node.parent = parent.parent
					break
				}
				// 不满足前面两个条件，则继续向上查找父节点
				parent = parent.parent
			}
		}

		// 本次循环完成，当前节点更新为上一个节点
		preNode = node
	}

	titleTree.value = tree
}
</script>

<template>
	<div class="sidebar">
		<div class="sticky">
			<div class="item-wrap">
				<Toc
					scroll-target=".main-area"
					:isMarker="true"
					:is-anchor="true"
					title="页面导航"
					:toc-list="tocList"></Toc>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.sidebar {
	flex-shrink: 0;
	width: 300px;
	margin-right: auto;
	margin-left: 20px;
	@media (max-width: @size-md) {
		display: none;
	}
	.sticky {
		position: sticky;
		top: 20px;
	}
	.item-wrap {
		padding: 15px 0;
		height: auto;
		border-radius: var(--base-b-r);
		border: 1px solid var(--border-color);
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
