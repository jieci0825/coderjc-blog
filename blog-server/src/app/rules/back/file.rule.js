const { Rule } = require('@/validator')

const getCredentialRules = {
	type: new Rule().required(['']).enum(['DOWNLOAD', 'UPLOAD']),
	duration: new Rule().isNumber().isNumber().isInteger().min(10).max(3600)
}

module.exports = {
	getCredentialRules
}
