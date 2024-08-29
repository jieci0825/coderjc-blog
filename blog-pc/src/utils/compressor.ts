import Compressor from 'compressorjs'

// 压缩配置函数
function compressorOptions(file: File): Promise<Blob> {
	return new Promise((resolve, reject) => {
		new Compressor(file, {
			quality: 0.6, // 压缩质量
			// width: 1980, // 图片输出的宽度
			convertSize: 1 * 1024, // 图片超过 1m 则转换为 jpeg
			minWidth: 320, // 输出图像的最小宽度
			maxWidth: 2560, // 输出图像的最大宽度
			checkOrientation: false, // 是否读取图片的 exif 朝向值
			retainExif: true, // 保留图片的 exif 信息
			success: result => {
				resolve(result)
			},
			error: err => {
				reject(err)
			}
		})
	})
}

// 遍历压缩
export async function compressor(files: File | File[]): Promise<Blob[]> {
	if (!Array.isArray(files)) {
		files = [files]
	}
	// 将文件转为压缩后的blob数据
	const compressedFiles = await Promise.all(
		files.map(file => {
			return compressorOptions(file)
		})
	)
	return compressedFiles
}
