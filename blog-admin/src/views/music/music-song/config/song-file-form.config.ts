import type { JcFormProps } from '@/components/jc-form'

const songFileFormConfig: JcFormProps = {
	formItems: [
		{
			label: '上传歌曲文件',
			field: 'songFile',
			model: 'one',
			type: 'file',
			fileConfig: {
				accept: 'audio/mpeg',
				fileSize: 20 * 1024 * 1024 // 20M
			}
		}
	],
	rules: {
		songFile: [{ required: true, message: '该项不能为空', trigger: 'blur' }]
	},
	labelWidth: 140,
	colLayout: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
}

export default songFileFormConfig
