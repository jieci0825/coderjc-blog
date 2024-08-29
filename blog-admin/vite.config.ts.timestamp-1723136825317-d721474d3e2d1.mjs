// vite.config.ts
import vue from "file:///D:/01_%E5%89%8D%E7%AB%AF/04_%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/01_%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/blog-admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/01_%E5%89%8D%E7%AB%AF/04_%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/01_%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/blog-admin/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/01_%E5%89%8D%E7%AB%AF/04_%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/01_%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/blog-admin/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///D:/01_%E5%89%8D%E7%AB%AF/04_%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/01_%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/blog-admin/node_modules/vite/dist/node/index.js";
import { resolve } from "node:path";
import { ElementPlusResolver } from "file:///D:/01_%E5%89%8D%E7%AB%AF/04_%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/01_%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/blog-admin/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_dirname = "D:\\01_\u524D\u7AEF\\04_\u4E2A\u4EBA\u9879\u76EE\\01_\u4E2A\u4EBA\u535A\u5BA2\\blog-admin";
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    server: {
      host: "0.0.0.0"
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
        resolvers: [ElementPlusResolver({ importStyle: "sass" })]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(
            // 配置 element-plus 采用 sass 样式配色系统
            { importStyle: "sass" }
          )
        ]
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwwMV9cdTUyNERcdTdBRUZcXFxcMDRfXHU0RTJBXHU0RUJBXHU5ODc5XHU3NkVFXFxcXDAxX1x1NEUyQVx1NEVCQVx1NTM1QVx1NUJBMlxcXFxibG9nLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwwMV9cdTUyNERcdTdBRUZcXFxcMDRfXHU0RTJBXHU0RUJBXHU5ODc5XHU3NkVFXFxcXDAxX1x1NEUyQVx1NEVCQVx1NTM1QVx1NUJBMlxcXFxibG9nLWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8wMV8lRTUlODklOEQlRTclQUIlQUYvMDRfJUU0JUI4JUFBJUU0JUJBJUJBJUU5JUExJUI5JUU3JTlCJUFFLzAxXyVFNCVCOCVBQSVFNCVCQSVCQSVFNSU4RCU5QSVFNSVBRSVBMi9ibG9nLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcblx0cmV0dXJuIHtcblx0XHRzZXJ2ZXI6IHtcblx0XHRcdGhvc3Q6ICcwLjAuMC4wJ1xuXHRcdH0sXG5cdFx0Y3NzOiB7XG5cdFx0XHRwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG5cdFx0XHRcdHNjc3M6IHtcblx0XHRcdFx0XHQvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTgxRUFcdTVCOUFcdTRFNDlcdTc2ODRcdTY4MzdcdTVGMEZcdTY1ODdcdTRFRjZcdThGREJcdTg4NENcdTg5ODZcdTc2RDZcblx0XHRcdFx0XHRhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL3N0eWxlcy9lbGVtZW50L2luZGV4LnNjc3NcIiBhcyAqO2Bcblx0XHRcdFx0fSxcblx0XHRcdFx0bGVzczoge1xuXHRcdFx0XHRcdGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCAnQC9zdHlsZXMvbWl4aXMubGVzcyc7IEBpbXBvcnQgJ0Avc3R5bGVzL3Zhci5sZXNzJztgXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdHBsdWdpbnM6IFtcblx0XHRcdHZ1ZSgpLFxuXHRcdFx0QXV0b0ltcG9ydCh7XG5cdFx0XHRcdHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogJ3Nhc3MnIH0pXVxuXHRcdFx0fSksXG5cdFx0XHRDb21wb25lbnRzKHtcblx0XHRcdFx0cmVzb2x2ZXJzOiBbXG5cdFx0XHRcdFx0RWxlbWVudFBsdXNSZXNvbHZlcihcblx0XHRcdFx0XHRcdC8vIFx1OTE0RFx1N0Y2RSBlbGVtZW50LXBsdXMgXHU5MUM3XHU3NTI4IHNhc3MgXHU2ODM3XHU1RjBGXHU5MTREXHU4MjcyXHU3Q0ZCXHU3RURGXG5cdFx0XHRcdFx0XHR7IGltcG9ydFN0eWxlOiAnc2FzcycgfVxuXHRcdFx0XHRcdClcblx0XHRcdFx0XVxuXHRcdFx0fSlcblx0XHRdLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGFsaWFzOiB7XG5cdFx0XHRcdCdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxWCxPQUFPLFNBQVM7QUFDclksT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsMkJBQTJCO0FBTHBDLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDbEQsU0FBTztBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1A7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNKLHFCQUFxQjtBQUFBLFFBQ3BCLE1BQU07QUFBQTtBQUFBLFVBRUwsZ0JBQWdCO0FBQUEsUUFDakI7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNMLGdCQUFnQjtBQUFBLFFBQ2pCO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUNWLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLE9BQU8sQ0FBQyxDQUFDO0FBQUEsTUFDekQsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1YsV0FBVztBQUFBLFVBQ1Y7QUFBQTtBQUFBLFlBRUMsRUFBRSxhQUFhLE9BQU87QUFBQSxVQUN2QjtBQUFBLFFBQ0Q7QUFBQSxNQUNELENBQUM7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUixPQUFPO0FBQUEsUUFDTixLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ2hDO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
