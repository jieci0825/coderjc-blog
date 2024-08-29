const path = require('path')
const Router = require('koa-router')
const requireDirectory = require('require-directory')
const { sequelize } = require('./db')
const { createSiteData } = require('@/utils/schedule')

class InitModule {
	static initMain(app) {
		InitModule.app = app
		InitModule.rootPath = process.cwd()

		InitModule.initLoadRouters()
		InitModule.initConfig()
		InitModule.initTableModels()
	}

	// 挂载全局配置
	static initConfig() {
		const configPath = path.resolve(InitModule.rootPath, 'src/config/global.config')
		global.config = require(configPath)
	}

	// 加载全部路由
	static initLoadRouters() {
		function loadRouteModule(obj) {
			if (obj instanceof Router) {
				InitModule.app.use(obj.routes())
				InitModule.app.use(obj.allowedMethods())
			}
		}

		const routerPath = path.resolve(InitModule.rootPath, 'src/app/apis')
		requireDirectory(module, routerPath, {
			visit: loadRouteModule
		})
	}

	// 初始化数据表模型
	static async initTableModels() {
		const modelPath = path.resolve(InitModule.rootPath, 'src/app/models')
		requireDirectory(module, modelPath)
		await sequelize.sync()
		await createSiteData()
	}
}

module.exports = InitModule
