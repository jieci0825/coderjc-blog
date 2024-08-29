<script setup lang="ts">
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import Editor from '@toast-ui/editor'
import { ref, onMounted, onDeactivated, onUnmounted } from 'vue'
import { debounce } from '@/utils'
import { BuiltinLanguage, BuiltinTheme, createHighlighter } from 'shiki'
import type { EditorEmits, EditorProps, InsertFnType } from './editor-type'

defineOptions({ name: 'Editor' })

let editor: any
const editorRef = ref()

const props = defineProps<EditorProps>()
const emits = defineEmits<EditorEmits>()

const imageHook = () => {
	editor.removeHook('addImageBlobHook')

	editor.addHook('addImageBlobHook', (file: File, callback: InsertFnType) => {
		emits('uploadFile', file, callback)
	})
}

const langs: BuiltinLanguage[] = [
	'sql',
	'javascript',
	'css',
	'vue',
	'vue-html',
	'typescript',
	'java',
	'python',
	'bash',
	'bat',
	'tsx',
	'scss',
	'less',
	'ruby',
	'rust',
	'regexp',
	'nginx',
	'php',
	'json',
	'jsonc',
	'ini'
]

const themes: BuiltinTheme[] = ['night-owl']

let highlighter: any = undefined
async function createHighlighterInstance() {
	highlighter = await createHighlighter({ themes, langs })
}
createHighlighterInstance()

async function highlight() {
	const container = document.querySelector('.markdown-body')
	const preList = Array.from(container!.querySelectorAll('pre'))

	if (!preList.length) return

	for (const pre of preList) {
		const code = pre.querySelector('code') as HTMLElement
		const lang = code.getAttribute('data-language')
		const formatCode = highlighter.codeToHtml(code.textContent!, {
			lang: lang || 'javascript',
			theme: 'night-owl'
		})
		pre.innerHTML = ''
		pre.innerHTML = formatCode
	}
}

const onChange = () => {
	highlight()
}

const _dOnChange = debounce(onChange, 300)

onDeactivated(() => {
	_dOnChange?.cancel()
})

onUnmounted(() => {
	_dOnChange?.cancel()
})

onMounted(() => {
	editor = new Editor({
		el: editorRef.value,
		language: 'zh-CN',
		height: '100%',
		initialEditType: 'markdown',
		previewStyle: 'vertical',
		placeholder: '请输入内容...',
		events: {
			change: _dOnChange.bind(this)
		},
		codeBlock: {
			indent: 2 // 这里设置代码块的前面缩进为 2 个空格
		}
	})

	imageHook()

	if (props.data) {
		setHtml(props.data)
	}
})

function getHtml() {
	return editor.getHTML()
}

function setHtml(val: string) {
	editor.setHTML(val)
}

function clear() {
	editor.setHTML('<p><br></p>')
}

defineExpose({
	getHtml,
	clear,
	setHtml
})
</script>

<template>
	<div class="editor-wrapper">
		<div
			class="markdown-editor markdown-body"
			ref="editorRef"></div>
	</div>
</template>

<style scoped lang="less">
.editor-wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
