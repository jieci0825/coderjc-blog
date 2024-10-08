import type { App } from 'vue'
import registerComponents from './register-components'
import registerDirectives from './register-directives'

// 注册服务
export function registerApp(app: App) {
	registerComponents(app)
	registerDirectives(app)
}
