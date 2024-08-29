import COS from 'cos-js-sdk-v5'
import type { IOptions } from './types'
import { fileApi } from '@/apis'
import { handleFileInUploading } from './handle-cos'
import { COS_ACCESS_BASEURL, COS_FILE_PREFIX } from '@/constants'
import { formatFileType, formatTimestamp, randomStr } from '@/utils'

// 初始化实例
function insCos(options: IOptions) {
	const cos = new COS({
		FileParallelLimit: 3, //同一个实例下上传的文件并发数，默认值3
		SecretId: options.TmpSecretId,
		SecretKey: options.TmpSecretKey,
		SecurityToken: options.Token
	})
	return cos
}

async function getInsCos(duration: number = 20) {
	const credential = await fileApi.reqGetUploadCredential(duration)
	return insCos(credential.data.Credentials)
}

interface uploadFileOptions {
	prefix?: string
}
async function uploadFile(file: File, options?: uploadFileOptions): Promise<any> {
	if (!file) return

	const config: uploadFileOptions = Object.assign({}, { prefix: COS_FILE_PREFIX }, options)

	const cos = await getInsCos()
	const fileKey = `${config.prefix}/${formatTimestamp()}-${randomStr()}${formatFileType(file.type)}`
	const resp: any = await handleFileInUploading(cos, file, fileKey)
	const data: any = {
		filename: file.name,
		key: fileKey,
		location: resp.Location,
		mimetype: file.type,
		size: file.size,
		url: `${COS_ACCESS_BASEURL}/${fileKey}`
	}
	await fileApi.reqCreateFileRecord(data)
	return data
}

export { insCos, getInsCos, uploadFile }
