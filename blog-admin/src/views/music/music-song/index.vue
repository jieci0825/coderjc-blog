<script setup lang="ts">
import songTableConfig from './config/song-table.config'
import songSearchFormConfig from './config/song-search-form.config'
import songFormFn from './config/song-form.config'
import songFileFormConfig from './config/song-file-form.config'
import { musicApi } from '@/apis'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { Plus, Upload, Edit, Delete, Service } from '@element-plus/icons-vue'
import { openDeleteMessageBox } from '@/utils'
import { uploadFile } from '@/cos'
import { ActionType } from './types'
import { COS_FILE_MUSIC_PREFIX } from '@/constants'
import { useMusicActions } from '@/store'
import type { MusicItem, MusicCategoryItem } from '@/apis/modules/music/type'

const { setCurPlaySong, setCurPlaySongList, setPlayerVisible } = useMusicActions()

const songFormConfig = ref({})

// 分类列表
const categoryList = ref<MusicCategoryItem[]>([])
const getCategoryList = async () => {
	const resp = await musicApi.reqGetMusicCategoryList()
	categoryList.value = resp.data
}
getCategoryList()

const curInfo = ref<MusicItem>()

const diaglogTitle = ref('')
const dialogVisable = ref(false)
const curAction = ref<ActionType>(ActionType.CREATE)
const modeTitleMap = {
	[ActionType.CREATE]: '创建歌曲',
	[ActionType.EDIT]: '编辑歌曲'
}

const openEditDialog = async (row: MusicItem) => {
	setInfo(row, ActionType.EDIT)
}

const openCreateDialog = async () => {
	setInfo(null, ActionType.CREATE)
}

function setInfo(row: MusicItem | null, mode: ActionType, isVisable: boolean = true) {
	songFormConfig.value = songFormFn(categoryList.value)
	curInfo.value = row ? { ...row } : ({} as MusicItem)
	curAction.value = mode
	diaglogTitle.value = modeTitleMap[mode]
	dialogVisable.value = isVisable
}

const handleTableDelete = async (row: MusicItem) => {
	await openDeleteMessageBox()
	const resp = await musicApi.reqDeleteMusic(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

const handleSubmit = async (payload: any) => {
	const data = { ...payload, lyric: JSON.stringify(payload.lyric) }
	// 处理文件
	if (data.songCover && typeof data.songCover !== 'string') {
		const result = await uploadFile(data.songCover as unknown as File)
		data.songCover = result.url
	}
	let resp: any = null
	if (curAction.value === ActionType.EDIT) {
		resp = await musicApi.reqEditMusic(data)
	} else {
		resp = await musicApi.reqCreateMusic(data)
	}
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refreshData()
}

function refreshData() {
	refs.musicPageContentRef?.fetchData()
}

const usePageContent = {
	request: musicApi.reqGetMusicList
}

const uploadDialogVisable = ref(false)
const handleUploadSubmit = async (payload: any) => {
	const file = payload.songFile
	if (!file || typeof file === 'string') {
		return
	}
	const resp = await uploadFile(file, { prefix: COS_FILE_MUSIC_PREFIX })
	uploadDialogVisable.value = false
	navigator.clipboard
		.writeText(resp.url)
		.then(() => {
			ElMessage.success('歌曲URL已复制到剪贴板')
		})
		.catch(() => {
			ElMessage.success('复制失败')
		})
}

const opnePlaySongDiaglog = (row: MusicItem) => {
	setCurPlaySong(row)
	setCurPlaySongList(refs.musicPageContentRef.data)
	setPlayerVisible(true)
}
</script>

<template>
	<div class="music-song-container container">
		<PageContent
			:ref="setRef('musicPageContentRef')"
			:use-page-content="usePageContent"
			:form-config="songSearchFormConfig"
			:tableConfig="songTableConfig">
			<!-- actions -->
			<template #actions>
				<el-button
					@click="openCreateDialog"
					type="primary"
					plain>
					<el-icon :size="14"> <Plus /> </el-icon>新增
				</el-button>
				<el-button
					@click="uploadDialogVisable = true"
					type="warning"
					plain>
					<el-icon :size="14"> <Upload /> </el-icon>上传歌曲文件
				</el-button>
			</template>
			<!-- 封面 -->
			<template #songCover="{ row }">
				<el-image
					:src="row.songCover"
					:preview-src-list="[row.songCover]"
					style="width: 50px; height: 50px; border-radius: 50%"
					fit="cover"></el-image>
			</template>
			<!-- operate -->
			<template #operate="{ row }">
				<el-button
					@click="opnePlaySongDiaglog(row)"
					:icon="Service"
					type="primary"
					plain
					size="small"
					>开始听歌</el-button
				>
				<el-button
					@click="openEditDialog(row)"
					:icon="Edit"
					type="primary"
					plain
					size="small"
					>编辑</el-button
				>
				<el-button
					@click="handleTableDelete(row)"
					:icon="Delete"
					type="danger"
					plain
					size="small"
					>删除</el-button
				>
			</template>
		</PageContent>

		<!-- 新建/编辑 -->
		<JcDialog
			v-model="dialogVisable"
			:title="diaglogTitle"
			width="50%">
			<JcForm
				@submit="handleSubmit"
				v-model="curInfo"
				v-bind="songFormConfig">
			</JcForm>
		</JcDialog>

		<!-- 上传歌曲 -->
		<JcDialog
			v-model="uploadDialogVisable"
			width="400px"
			title="上传歌曲文件">
			<JcForm
				@submit="handleUploadSubmit"
				v-bind="songFileFormConfig">
			</JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less">
.friend-chain-song-contaianer {
	width: 100%;
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
}
</style>
