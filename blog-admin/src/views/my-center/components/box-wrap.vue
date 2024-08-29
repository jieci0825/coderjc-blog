<script setup lang="ts">
import { ref } from 'vue'
import { useUserGetters } from '@/store'
import type { BoxItemNode, BoxWrapEmits, BoxWrapProps } from '../types'

const props = defineProps<BoxWrapProps>()
const emits = defineEmits<BoxWrapEmits>()

const { getUserInfo } = useUserGetters()

const renderList = ref<BoxItemNode[]>([])
for (const item of props.list) {
	renderList.value.push(Object.assign({}, item, { isEdit: false, raw: item }))
}

const curEditContent = ref('')

const handleEdit = (row: BoxItemNode) => {
	if (row.operateCallback) {
		row.operateCallback(row.raw)
	} else {
		row.isEdit = true
		setCurEditContent((getUserInfo.value![row.contentField!] as string) || '')
	}
}
const handleSave = (row: BoxItemNode) => {
	emits('save', curEditContent.value, row.raw)
	row.isEdit = false
}
const handleCancel = (row: BoxItemNode) => {
	row.isEdit = false
	setCurEditContent('')
}

function setCurEditContent(val: string) {
	curEditContent.value = val
}
</script>

<template>
	<div class="box">
		<div
			class="box-item"
			v-for="(item, idx) in renderList"
			:key="idx">
			<div class="label">{{ item.label }}</div>
			<div
				class="content"
				v-if="!item.isEdit">
				<template v-if="item.slotOpt?.defalutSlot">
					<slot
						:name="item.slotOpt.defalutSlot"
						:row="item">
						<p>{{ item.contentField ? getUserInfo?getUserInfo[item.contentField] :undefined : false || '这个人很懒，什么都没留下' }}</p>
					</slot>
				</template>
				<template v-else>
					<p>{{ item.contentField ? getUserInfo?getUserInfo[item.contentField] :undefined : false || '这个人很懒，什么都没留下' }}</p>
				</template>
			</div>
			<div
				class="content edit"
				v-else>
				<el-input
					spellcheck="false"
					v-model="curEditContent"
					:placeholder="`请输入您的${item.label}`" />
			</div>
			<div
				class="operate"
				v-if="item.isOperate !== false">
				<template v-if="item.slotOpt?.operateSlot">
					<slot
						:name="item.slotOpt.operateSlot"
						:row="item">
					</slot>
				</template>
				<template v-else>
					<template v-if="!item.isEdit">
						<el-button @click="handleEdit(item)">{{ item.operateText?.editText || '编辑' }}</el-button>
					</template>
					<template v-else>
						<el-button @click="handleCancel(item)">{{ item.operateText?.cancelText || '取消' }}</el-button>
						<el-button @click="handleSave(item)">{{ item.operateText?.saveText || '保存' }}</el-button>
					</template>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.box {
	padding: 20px 0;
	border-bottom: 1px solid var(--border-color);
	.box-item {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
		.label {
			width: 100px;
			font-weight: 600;
		}
		.content {
			flex: 1;
		}
		.operate {
			margin-left: 10px;
		}
	}
}
</style>
