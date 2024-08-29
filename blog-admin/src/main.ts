import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'

import router from './routers'
import { registerApp } from '@/global'
import { createPinia } from 'pinia'
import { useInit } from '@/hooks'

const pinia = createPinia()

const app = createApp(App)

registerApp(app)
app.use(pinia)
useInit()
app.use(router)
app.mount('#app')
