<script setup lang="ts">
import JcMenuItem from './jc-menu-item.vue'
import ResizeObserver from 'resize-observer-polyfill'
import { JcMenuProps } from './jc-menu'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, useAttrs } from 'vue'
import { getAncestorNodes } from '@/utils'
import { useGlobalGetters, useUserGetters } from '@/store'
import { getCurrentInstance } from 'vue'
import { More } from '@element-plus/icons-vue'

defineOptions({ name: 'JcMenu' })
const route = useRoute()
const props = withDefaults(defineProps<JcMenuProps>(), {
	menuList: () => [],
	isCollapse: false
})

const currentPath = computed(() => route.path)

const { getUserMenuList } = useUserGetters()
const { getAccordion } = useGlobalGetters()

const ancestors = computed(() => {
	const result = getAncestorNodes(getUserMenuList.value, route.meta.name, 'menuName')
	return result ? result : []
})

const attrs = useAttrs()

// 更多按钮图标大小和外边距
const moreBtnSize = 20
const moreBtnMargin = 10
const moreWidth = moreBtnSize + moreBtnMargin
// 是否开启省略
const ellipsis = ref(attrs?.mode === 'horizontal')
// 记录初始状态每个菜单列表下的子菜单宽度
const menuChildWidth = ref<number[]>([])
// 从哪个位置开始隐藏
const hideIdx = ref(-1)
// 用于直接显示的菜单列表
const showMenuList = computed(() => {
	if (hideIdx.value === -1) return props.menuList
	return props.menuList.slice(0, hideIdx.value)
})
// 用于隐藏的菜单列表
const hideMenuList = computed(() => {
	if (hideIdx.value === -1) return []
	return props.menuList.slice(hideIdx.value, props.menuList.length - 1)
})

function handleEllipsis() {
	// 获取当前根元素
	const instance = getCurrentInstance()
	const menuEL = instance?.vnode.el as HTMLElement
	if (!menuEL) return
	setMenuChildWidth(menuEL)

	const resizeObserver = new ResizeObserver(() => {
		setHideIndex(menuEL)
	})
	resizeObserver.observe(menuEL)
}

// 设置初始状态每个菜单列表的子菜单宽度
function setMenuChildWidth(menuEL: HTMLElement) {
	// 获取所有的子元素
	const menuChidlrens = menuEL.children
	// 开始遍历宽度，将子菜单的宽度进行累加
	for (let i = 0; i < menuChidlrens.length - 1; i++) {
		const child = menuChidlrens[i] as HTMLElement
		menuChildWidth.value.push(child.clientWidth)
	}
}

// 设置 hideIdx
function setHideIndex(menuEL: HTMLElement) {
	// 根元素宽度
	const menuELWidth = menuEL.clientWidth
	let sumWidth = moreWidth
	// 遍历所有子菜单宽度
	for (let i = 0; i < menuChildWidth.value.length - 1; i++) {
		// 将子菜单的宽度进行累加
		const childMenuWidth = menuChildWidth.value[i]
		sumWidth += childMenuWidth
		// 如果计算时，加到某一个子菜单大于当前根元素的宽度，则表示这个元素和其之后的元素都需要隐藏
		if (sumWidth > menuELWidth) {
			hideIdx.value = i
			return
		}
	}
	// 如果走到这还没发现需要隐藏的菜单 idx，则表示不需要隐藏
	hideIdx.value = -1
}

onMounted(() => {
	if (ellipsis.value) {
		handleEllipsis()
	}
})
</script>

<template>
	<el-menu
		v-bind="attrs"
		:unique-opened="getAccordion"
		:collapse="props.isCollapse"
		:default-active="`${route.meta.id}`"
		active-text-color="var(--primary-color)"
		background-color="var(--aside-bg-color)">
		<JcMenuItem
			:menu-list="showMenuList"
			:ancestors="ancestors"
			:current-path="currentPath"></JcMenuItem>
		<el-sub-menu
			index="more-index"
			:class="['el-tooltip__trigger']"
			v-if="hideMenuList.length">
			<template #title>
				<el-icon :size="18">
					<More />
				</el-icon>
				<span class="text"></span>
			</template>
			<JcMenuItem
				:menu-list="hideMenuList"
				:ancestors="ancestors"
				:current-path="currentPath"></JcMenuItem>
		</el-sub-menu>
	</el-menu>
</template>

<style scoped lang="less">
.el-tooltip__trigger {
	:deep(.el-sub-menu__icon-arrow) {
		display: none;
	}
}
</style>
