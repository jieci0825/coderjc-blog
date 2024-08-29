const { Collide } = require('@/core/error-type')
const { generateRandomString, generateRandomInteger, decrypt } = require('@/utils')
const { User } = require('@model/user.model')

/**
 * 注册
 */
async function register(data) {
	const isAccount = await User.findOne({ where: { account: data.account } })
	if (isAccount) throw new Collide('当前账号已经存在')

	const isEmail = await User.findOne({ where: { email: data.email } })
	if (isEmail) throw new Collide('当前邮箱已被绑定')

	const insertData = {
		email: data.email,
		account: data.account,
		password: decrypt(data.password),
		nickname: generateRandomString(8),
		avatar_url: global.config.defaultAvatars[generateRandomInteger(0, global.config.defaultAvatars.length - 1)],
		sign: '',
		description: '',
		status: 1
	}
	await User.create(insertData)
}

module.exports = {
	register
}
