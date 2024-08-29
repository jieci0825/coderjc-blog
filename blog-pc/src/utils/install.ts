import type { App, Plugin, Component, AppContext } from 'vue'

export type SFCWithInstall<T> = T &
  Plugin & {
    install(app: App): void
  } & {
    name: string // 确保有 name 属性
  }

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

// 给组件实例挂载一个install方法，让外部使用 app.use 方法注册时就会调用此方法注册为全局组件
//  - 保证泛型 T 是一个组件类型
export const withInstall = <T extends Component>(comp: T) => {
  const _comp = comp as SFCWithInstall<T>

  _comp.install = function (app: App) {
    // 注册全局组件
    app.component((comp as SFCWithInstall<T>).name, comp)
  }

  return _comp
}

// 挂载一个方法
export const withInstallFunction = <T>(fn: T, name: string) => {
  const _fn = fn as SFCWithInstall<T>

  _fn.install = function (app: App) {
    app.config.globalProperties[name] = fn
  }

  return _fn as SFCInstallWithContext<T>
}
