import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	return {
		server: {
			host: '0.0.0.0'
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 自动导入自定义的样式文件进行覆盖
					additionalData: `@use "@/styles/element/index.scss" as *;`
				},
				less: {
					additionalData: `@import '@/styles/mixis.less'; @import '@/styles/var.less';`
				}
			}
		},
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
			}),
			Components({
				resolvers: [
					ElementPlusResolver(
						// 配置 element-plus 采用 sass 样式配色系统
						{ importStyle: 'sass' }
					)
				]
			})
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		}
	}
})
