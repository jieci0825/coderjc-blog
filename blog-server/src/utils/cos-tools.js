const tencentcloud = require('tencentcloud-sdk-nodejs-sts')
const StsClient = tencentcloud.sts.v20180813.Client

const { CosAction, CosConfig } = require('@/config/credential.config')

/**
 * 组装策略配置
 * @param {string} 类型
 * @returns
 */
const packagePolicy = type => {
	const policy = {
		version: '2.0',
		statement: []
	}

	const statementItem = {
		action: [],
		effect: 'allow',
		resource: ['*']
	}

	statementItem.action.push(...CosAction[type])

	policy.statement.push(statementItem)

	return JSON.stringify(policy)
}

// 配置对象
const clientConfig = {
	credential: {
		secretId: CosConfig.SECRETID,
		secretKey: CosConfig.SECRETKEY
	},
	region: CosConfig.REGION,
	profile: {
		httpProfile: {
			endpoint: 'sts.tencentcloudapi.com'
		}
	}
}

// 实例化要请求产品的client对象, clientProfile是可选的
const client = new StsClient(clientConfig)

/**
 * 获取临时凭证
 * @param {object} params 参数
 * @returns
 */
function getCredential(params) {
	return new Promise((resolve, reject) => {
		client.GetFederationToken(params).then(
			data => {
				resolve(data)
			},
			err => {
				reject(err)
			}
		)
	})
}

/**
 * 处理上传中的文件
 * @param {Object} cos cos实例
 * @param {Object} file 文件对象
 * @param {String} fileKey 上传保存在存储中的key
 * @param {Function} callback 回调函数，传入两个参数 `file` 和 `taskId`, file 表示本函数处理的上传文件对象，taskId 表示本次执行任务id
 * @returns
 */
function handleFileInUploading(cos, filePath, fileKey, fileType, taskIdCB, progressCB) {
	let _taskId = ''
	return new Promise((resolve, reject) => {
		cos.uploadFile(
			{
				Bucket: CosConfig.BUCKET /* 填写自己的 bucket，必须字段 */,
				Region: CosConfig.REGION /* 存储桶所在地域，必须字段 */,
				Key: fileKey,
				// Body: file,
				FilePath: filePath,
				SliceSize: 1024 * 1024 * 20, // 大于 20m 使用分块上传
				onTaskReady: function (taskId) {
					_taskId = taskId
					taskIdCB && taskIdCB({ file, taskId })
				},
				Headers: {
					'Content-Type': fileType,
					'Content-Disposition': 'inline'
				},
				onProgress: function (progressData) {
					const data = JSON.parse(JSON.stringify(progressData))
					data.taskId = _taskId
					progressCB && progressCB(data)
				}
			},
			function (err, data) {
				if (err) {
					reject(JSON.parse(JSON.stringify(err)))
				} else {
					resolve(data)
				}
			}
		)
	})
}

module.exports = { packagePolicy, getCredential, handleFileInUploading }
