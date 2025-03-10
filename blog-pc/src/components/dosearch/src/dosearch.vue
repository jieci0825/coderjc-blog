<script setup lang="ts">
import { useBlogGetters, useBlogActions } from '@/store'
import { ref, nextTick, watch } from 'vue'
import { KeyEnum, type IFooterTips } from './dosearch.type'
import { useEventListener } from '@/hooks'
import { debounce } from '@/utils'
import { useRouter} from 'vue-router'
import type { BlogItem } from '@/apis/modules/blog/type'

const visibleModel = defineModel<boolean>('visible', { required: true, default: false })

const keyword = ref('')

const { queryBlogListState } = useBlogGetters()
const { getQueryBlogList, clearQueryBlogList } = useBlogActions()

const formatHtmlQueryBlogList = ref<BlogItem[]>([])

watch(
	() => queryBlogListState.value,
	() => {
		formatHtmlQueryBlogList.value = _formatHtmlQueryBlogListFn(queryBlogListState.value)
	}
)

function _formatHtmlQueryBlogListFn(list: BlogItem[]) {
	return list.map(item => {
		const index = item.title.indexOf(keyword.value)
		if (index === -1) return item
		const before = item.title.substring(0, index)
		const after = item.title.substring(index + keyword.value.length)
		item.title = `${before}<span class="highlight-keyword">${keyword.value}</span>${after}`
		return item
	})
}

// 选中索引
const selectIndex = ref(0)
// 选中项
const selectItem = ref<BlogItem | null>(null)
// 是否处于输入状态
const isComposing = ref(false)
// 引用内容区域dom
const refContent = ref<HTMLElement>()
// 搜索输入框dom
const searchInputRef = ref<HTMLInputElement | null>(null)

// 改变选择项
const changeSelectItem = (value: KeyEnum) => {
	// 上下选择
	//  - 当超出范围时，根据边界情况重置为0或最大值
	if (value === KeyEnum.TOP) {
		if (selectIndex.value <= 0) {
			selectIndex.value = formatHtmlQueryBlogList.value.length - 1
		} else {
			selectIndex.value--
		}
	} else if (value === KeyEnum.BOTTOM) {
		if (selectIndex.value >= formatHtmlQueryBlogList.value.length - 1) {
			selectIndex.value = 0
		} else {
			selectIndex.value++
		}
	}
	// 更新选中项
	selectItem.value = formatHtmlQueryBlogList.value[selectIndex.value]

	// 选中项改变同时改变滚动位置
	setContentScrollTop()
}

// 改变内容区域滚动条位置
const setContentScrollTop = (top: number = 0) => {
	if (!refContent.value) return

	// 如果没有传递指定的值则自动检测合适的值
	const contentRect = refContent.value.getBoundingClientRect()

	// 获取当前容器可视高度和实际内容高度
	const contentHeight = refContent.value.clientHeight
	const contentScrollHeight = refContent.value.scrollHeight
	// 存储之前的卷去的头部距离
	top = refContent.value.scrollTop
	// 如果内容高度小于或者等于可视高度不做处理
	if (contentScrollHeight <= contentHeight) return
	// 找到激活的元素
	nextTick(() => {
		if (!refContent.value) return

		const activeDom = refContent.value.querySelector('.item.active')

		if (!activeDom) return

		// 检测是否处于可视范围之内
		const activeDomRect = activeDom.getBoundingClientRect()

		// 当前激活的dom项如果 bottom 大于容器的 bottom
		//  - 则表示当前激活项处于不可见的状态，且在底部，需要内容区域上下滚动一下
		if (activeDomRect.bottom > contentRect.bottom) {
			// 当前激活项的bottom - 内容区域的 bottom + 当前已经卷去的头部高度top
			//  - 加上一点适当的距离，美化一下，解决当前项进入可视区域时贴近底部的问题
			top = activeDomRect.bottom - contentRect.bottom + top + 8
		}
		// 反之则相反
		else if (activeDomRect.top < contentRect.top) {
			top = activeDomRect.top - contentRect.top + top - 8
		}

		refContent.value.scrollTo({
			behavior: 'smooth',
			top
		})
	})
}

// 监听键盘事件
const onKeypad = (e: KeyboardEvent) => {
	const keyName = e.code
	if (keyName === KeyEnum.BOTTOM) {
		e.preventDefault()
		changeSelectItem(KeyEnum.BOTTOM)
	} else if (keyName === KeyEnum.TOP) {
		e.preventDefault()
		changeSelectItem(KeyEnum.TOP)
	} else if (keyName === KeyEnum.ESC) {
		if (isComposing.value) return
		destroy()
	} else if (keyName === KeyEnum.ENTER) {
		// 检测是否处于输入状态，如果是输入状态按下回车则不触发
		if (isComposing.value) return
		handleConfirm()
	}
}

const $router = useRouter()

// 确认结果
const handleConfirm = () => {
	if (!selectItem.value) return
	// window.open(`/blog-detail/${selectItem.value.id}`, '_blank')
    $router.push(`/blog-detail/${selectItem.value.id}`)
	// 关闭搜索界面
	destroy()
}

// 搜索框内容改变事件
const onInput = () => {
	getQueryBlogList({
		page: 1,
		pageSize: 30,
		title: keyword.value
	})
}

const _dOnInput = debounce(onInput, 100)

const onComposingStart = () => {
	isComposing.value = true
}

const onComposingEnd = () => {
	isComposing.value = false
}

useEventListener(document, 'keydown', onKeypad)
useEventListener(searchInputRef, 'compositionstart', onComposingStart)
useEventListener(searchInputRef, 'compositionend', onComposingEnd)

function destroy() {
	keyword.value = ''
	clearQueryBlogList()
	visibleModel.value = false
}

// 点击搜索列表项
const handleClickItem = (item: BlogItem) => {
	selectItem.value = item
	handleConfirm()
}

// 初始化页脚展示信息
const footerTips = ref<IFooterTips[]>([
	{ text: '回车确认', icon: 'icon-enter-key' },
	{ text: '向下选择', icon: 'icon-down-key' },
	{ text: '向上选择', icon: 'icon-up-key' },
	{ text: '关闭搜索', icon: 'icon-esc-key' }
])
</script>

<template>
	<Transition name="fade">
		<div
			class="dosearch-mock"
			v-if="visibleModel">
			<div class="container">
				<div class="search-wrap">
					<span class="iconfont icon-search"></span>
					<div class="input-wrap">
						<input
							v-focus
							ref="searchInputRef"
							v-model="keyword"
							@input="_dOnInput"
							type="text"
							placeholder="查找本站 Blog..."
							class="input" />
					</div>
					<span
						class="iconfont icon-close close-btn"
						@click="destroy"></span>
				</div>
				<div
					class="content-wrap"
					ref="refContent">
					<div
						v-if="formatHtmlQueryBlogList.length"
						@click="handleClickItem(item)"
						class="item"
						:class="{ active: selectItem === item }"
						v-for="item in formatHtmlQueryBlogList"
						:key="item.id">
						<div
							class="text"
							v-html="item.title"></div>
					</div>
					<div v-else>
						<div class="tip-wrap">
							<span v-if="keyword">没有找到相关内容哦</span>
							<span v-else>请输入关键词尝试搜索一下吧</span>
						</div>
					</div>
				</div>
				<div class="footer-wrap">
					<div class="tips-box">
						<div
							class="tip-item"
							v-for="(item, index) in footerTips"
							:key="index">
							<span :class="['iconfont', item.icon]"></span>
							<span class="text">{{ item.text }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style scoped lang="less">
.dosearch-mock {
	position: fixed;
	inset: 0;
	z-index: 9999;
	background-color: var(--mask-color);
	display: flex;
	align-items: center;
	justify-content: center;
	.container {
		width: 620px;
		height: 500px;
		background-color: var(--bg-color);
		overflow: hidden;
		border-radius: var(--base-b-r);
		display: flex;
		flex-direction: column;
		@media (max-width: @size-sm) {
			width: 100%;
			height: 100%;
			border-radius: 0;
		}
		.search-wrap {
			flex-shrink: 0;
			height: 65px;
			border-bottom: 1px solid var(--border-color);
			padding: 0 12px;
			display: flex;
			align-items: center;
			color: var(--el-text-color-placeholder);
			.input-wrap {
				flex: 1;
				margin: 0 12px;
				.input {
					width: 100%;
					height: 100%;
					border: none;
					outline: none;
					background-color: transparent;
					color: var(--el-text-color-primary);
					font-size: 16px;
					&::placeholder {
						color: var(--el-text-color-placeholder);
					}
				}
			}
			.close-btn {
				cursor: pointer;
				&:hover {
					color: var(--primary-color);
				}
			}
		}
		.content-wrap {
			flex: 1;
			padding: 8px;
			overflow: hidden auto;
			.item {
				color: var(--el-text-color-primary);
				border-radius: var(--base-b-r);
				width: 100%;
				transition: all 0.25s;
				.text {
					font-size: 18px;
					.one-omit();
				}
				&.active {
					background-color: #f4f4f5;
					color: var(--primary-color);
				}
				&:hover {
					background-color: #f4f4f5;
				}
				.text {
					padding: 8px;
					cursor: default;
				}
			}
		}
		.footer-wrap {
			margin-top: auto;
			height: 40px;
			flex-shrink: 0;
			border-top: 1px solid var(--border-color);
			padding: 0 12px;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			@media (max-width: @size-xs) {
				display: none;
			}
			.tips-box {
				display: flex;
				user-select: none;
				.tip-item {
					margin-right: 15px;
					.iconfont {
						font-size: 16px;
						font-weight: bold;
						color: var(--el-text-color-placeholder);
					}
					.text {
						margin-left: 5px;
						font-size: 13px;
						color: var(--el-text-color-regular);
					}
				}
			}
		}
		.tip-wrap {
			width: 100%;
			display: flex;
			margin-top: 50px;
			align-items: center;
			justify-content: center;
			font-size: 20px;
			color: var(--el-text-color-placeholder);
			span {
				border-bottom: 1px solid var(--el-text-color-placeholder);
			}
		}
	}
}
</style>
