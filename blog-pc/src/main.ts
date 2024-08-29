import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'

import routers from './routers'
import { registerApp } from '@/global'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)

registerApp(app)
app.use(pinia)
app.use(routers)
app.mount('#app')
