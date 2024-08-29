const Router = require('koa-router')
const { genBackPrefix } = require('@/utils')
const router = new Router({ prefix: genBackPrefix('file') })
const { verifyToken, verifySuperAdmin } = require('@/middleware/auth.middleware')
const { getCredential, createFileRecord } = require('@con-back/file.controller')

// 获取临时凭证
router.post('/credential', verifyToken, verifySuperAdmin, getCredential)

// 添加文件记录
router.post('/record', verifyToken, verifySuperAdmin, createFileRecord)

module.exports = router
