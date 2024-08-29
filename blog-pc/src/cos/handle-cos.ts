import CosConfig from './config'

/**
 * 处理上传中的文件
 * @param {Object} cos cos实例
 * @param {Object} file 文件对象
 * @param {String} fileKey 上传保存在存储中的key
 * @param {Function} taskIdCB 回调函数，会传入两个参数 `file` 和 `taskId`, file 表示本函数处理的上传文件对象，taskId 表示本次执行任务id
 * @param {Function} progressCB 回调函数，会传入一个参数 `data`data 表示上传进度数据
 * @returns
 */
export function handleFileInUploading(
	cos: any,
	file: File,
	fileKey: string,
	taskIdCB?: Function,
	progressCB?: Function
) {
	let _taskId = ''
	return new Promise((resolve, reject) => {
		cos.uploadFile(
			{
				Bucket: CosConfig.BUCKET /* 填写自己的 bucket，必须字段 */,
				Region: CosConfig.REGION /* 存储桶所在地域，必须字段 */,
				Key: fileKey,
				Body: file,
				SliceSize: 1024 * 1024 * 20, // 大于 20m 使用分块上传
				onTaskReady: function (taskId: string) {
					// 取消上传cos.cancelTask(taskId)、停止上传cos.pauseTask(taskId)、重新开始上传cos.restartTask(taskId)
					_taskId = taskId
					taskIdCB && taskIdCB({ file, taskId })
				},
				Headers: {
					'Content-Type': file.type,
					'Content-Disposition': 'inline'
				},
				onProgress: function (progressData: any) {
					// - progressData.loaded 已经上传的文件部分大小，以字节（Bytes）为单位
					// - progressData.total 整个文件的大小，以字节（Bytes）为单位
					// - progressData.speed 文件的上传速度，以字节/秒（Bytes/s）为单位
					// - progressData.percent 文件的上传百分比，以小数形式呈现，例如，上传50%即为0.5
					const data = JSON.parse(JSON.stringify(progressData))
					data.taskId = _taskId
					progressCB && progressCB(data)
				}
			},
			function (err: any, data: any) {
				if (err) {
					reject(JSON.parse(JSON.stringify(err)))
				} else {
					resolve(data)
				}
			}
		)
	})
}

/**
 *
 * @param {Object} cos COS 下载实例
 * @param {String} key COS 存储中对象的 key
 * @param {Function} progressCB 下载进度回调函数
 */
export function handFileDownload(cos: any, key: string, progressCB: Function) {
	return new Promise((resolve, reject) => {
		cos.getObjectUrl(
			{
				Bucket: CosConfig.BUCKET,
				Region: CosConfig.REGION,
				Key: key,
				Headers: {
					'x-cos-traffic-limit': 83886080 // 限速值设置范围为819200 - 838860800，单位默认为 bit/s，即800Kb/s - 800Mb/s，如果超出该范围将返回400错误。
				},
				onProgress: function (progressData: any) {
					const data = JSON.parse(JSON.stringify(progressData))
					progressCB && progressCB(data)
				}
			},
			function (err: any, data: any) {
				if (err) {
					reject(JSON.parse(JSON.stringify(err)))
				} else {
					resolve(data)
				}
			}
		)
	})
}
