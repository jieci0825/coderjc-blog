import COS from 'cos-js-sdk-v5'
import type { IOptions } from './types'
import { globalApi } from '@/apis'
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

async function getInsCos() {
	const credential = await globalApi.reqGetUploadCredential()
	return insCos(credential.data.Credentials)
}

async function uploadFile(file: File): Promise<any> {
	if (!file) return
	const cos = await getInsCos()
	const fileKey = `${COS_FILE_PREFIX}/${formatTimestamp()}-${randomStr()}${formatFileType(file.type)}`
	const resp: any = await handleFileInUploading(cos, file, fileKey)
	const data: any = {
		filename: file.name,
		key: fileKey,
		location: resp.Location,
		mimetype: file.type,
		size: file.size,
		url: `${COS_ACCESS_BASEURL}/${fileKey}`
	}
	await globalApi.reqCreateFileRecord(data)
	return data
}

export { insCos, getInsCos, uploadFile }
