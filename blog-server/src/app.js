require('module-alias/register')
const Koa = require('koa')
const { registerApp } = require('@/core/create-app')
const { port } = require('@/config/global.config')

const app = new Koa()

registerApp(app)

app.listen(port, () => {
	console.log(`koa-api-gen 启动成功 http://localhost:${port}`)
})
