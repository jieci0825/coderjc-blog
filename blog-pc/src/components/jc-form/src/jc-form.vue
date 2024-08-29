<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { JcFormEmits, JcFormProps } from './jc-form'
import type { FormInstance } from 'element-plus'

defineOptions({ name: 'JcForm' })

const $attrs = useAttrs()
const emits = defineEmits<JcFormEmits>()
const props = withDefaults(defineProps<JcFormProps>(), {
	rules: () => ({}),
	rowConfig: () => {
		return { gutter: 10 }
	},
	colLayout: () => {
		return { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 }
	},
	isFooter: true,
	labelWidth: 100,
	footerConfig: () => {
		return { resetText: '重置', submitText: '提交' }
	}
})

type ExtractFields<T extends JcFormProps['formItems']> = {
	[K in T[number]['field']]: any
}
type FormFields = ExtractFields<typeof props.formItems>

// 内部表单数据
const innerFormData = ref<FormFields>({})
// 外部传递的表单数据
const modelValue = defineModel({ type: Object })
// 使用内部表单数据
const isInnerFormData = computed(() => {
	return modelValue.value ? false : true
})
// 根据条件选择真正需要使用的表单数据
const formData = isInnerFormData.value ? innerFormData : modelValue

// 初始化表单数据
function initFormData() {
	// 当外界传递了表单数据的时候以外界的为准
	if (!isInnerFormData.value) return
	props.formItems.forEach(item => {
		formData.value[item.field] = item.defaultValue ?? ''
	})
}
initFormData()

const totalProps = computed(() => {
	return { ...$attrs, ...props }
})

// 组件实例
const jcFormRef = ref<FormInstance | undefined>(undefined)

// 提交
const handleSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	try {
		await formEl.validate()
		emits('submit', formData.value)
	} catch (error) {}
}
// 重置
const handleReset = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()

	emits('reset')
}

defineExpose({
	jcFormRef
})
</script>

<template>
	<div class="jc-form-container">
		<el-form
			@submit.native.prevent="handleSubmit(jcFormRef)"
			v-bind="totalProps"
			:model="formData"
			ref="jcFormRef">
			<el-row
				v-bind="props.rowConfig"
				:style="{ width: '100%' }">
				<!-- 单独配置的 col 规则大于整体布局规则 -->
				<el-col
					v-for="(item, index) in props.formItems"
					v-bind="item.col ? { span: item.col } : props.colLayout"
					:key="index">
					<el-form-item
						:prop="item.field"
						:style="item.formItemStyle || props.formItemStyle"
						:label="item.label">
						<template
							v-if="item.labelSlot"
							#label>
							<slot :name="item.labelSlot"></slot>
						</template>
						<!-- 文本框 | 密码框 -->
						<template v-if="item.type === 'text' || item.type === 'password'">
							<template v-if="item.isNumber">
								<el-input
									v-model.number="formData[item.field]"
									:disabled="item.disabled"
									:type="item.type"
									:show-password="item.type === 'password'"
									:placeholder="item.placeholder"
									auto-complete="new-password"
									spellcheck="false"
									autocomplete="off">
								</el-input>
							</template>
							<template v-else>
								<el-input
									v-model="formData[item.field]"
									:disabled="item.disabled"
									:type="item.type"
									:show-password="item.type === 'password'"
									:placeholder="item.placeholder"
									spellcheck="false"
									auto-complete="new-password"
									autocomplete="off">
									<template
										v-if="item.prependSlot"
										#prepend>
										<slot :name="item.prependSlot"></slot>
									</template>
									<template
										v-if="item.appendSlot"
										#append>
										<slot :name="item.appendSlot"></slot>
									</template>
								</el-input>
							</template>
						</template>
						<!-- 下拉选择 -->
						<template v-else-if="item.type === 'select'">
							<el-select
								v-model="formData[item.field]"
								v-bind="item.otherElConfig"
								:disabled="item.disabled"
								:placeholder="item.placeholder">
								<template
									v-if="item.headerSlot"
									#header>
									<slot :name="item.headerSlot"></slot>
								</template>
								<el-option
									v-for="it in item.options"
									:key="it.id"
									:label="it[item.formatProps?.label || 'label']"
									:value="it[item.formatProps?.value || 'value']" />
							</el-select>
						</template>
						<!-- 单选 -->
						<template v-else-if="item.type === 'radio'">
							<el-radio-group v-model="formData[item.field]">
								<el-radio
									v-for="(it, index) in item.options"
									:key="index"
									:value="it[item.formatProps?.value || 'value']"
									>{{ it[item.formatProps?.label || 'label'] }}</el-radio
								>
							</el-radio-group>
						</template>
						<!-- 文本域 -->
						<template v-else-if="item.type === 'textarea'">
							<el-input
								v-model="formData[item.field]"
								v-bind="item.otherElConfig"
								:placeholder="item.placeholder"
								:type="item.type" />
						</template>
						<!-- 文件上传 -->
						<template v-else-if="item.type === 'file'">
							<JcUpload
								v-model="formData[item.field]"
								v-bind="item.fileConfig"
								:init-preview-image="formData[item.field]"
								:model="item.model"></JcUpload>
						</template>
						<!-- 选择日期 -->
						<template v-else-if="item.type === 'date-select'">
							<el-date-picker
								v-model="formData[item.field]"
								v-bind="item.otherElConfig"
								:type="item?.otherElConfig?.type || 'date'"
								:placeholder="item.placeholder" />
						</template>
						<!-- 自定义 -->
						<template v-else-if="item.type === 'custom'">
							<slot :name="item.slotName"></slot>
						</template>
					</el-form-item>
				</el-col>
				<el-col v-bind="props.colLayout">
					<el-form-item class="form-footer">
						<slot name="footer">
							<el-button @click="handleReset(jcFormRef)">{{ props.footerConfig.resetText }}</el-button>
							<el-button
								type="primary"
								@click="handleSubmit(jcFormRef)"
								>{{ props.footerConfig.submitText }}</el-button
							>
						</slot>
						<button
							type="submit"
							style="display: none"></button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<style scoped lang="less">
.jc-form-container {
	width: 100%;
	.form-footer {
		display: flex;
		width: 100%;
	}
}
</style>
